(function( window, Abacus ) {

  // doTween( ... )
  // recursively tween values
  function doTween( lastValue, nextValue, tweenable, keys, target, tween, index ) {
    if ( tweenable === true ) {
      return tween( lastValue, nextValue, index );
    }

    var i = keys.length / 2,
        halfKeys = keys.length / 2,
        key;
    while ( i-- ) {
      key = keys[ i ];
      target[ key ] = doTween(
        lastValue[ key ],
        nextValue[ key ],
        tweenable[ key ],
        keys[ halfKeys+i ],
        target[ key ],
        tween,
        index
      );
    }
    return target;
  }

  function cacheTweenable( values ) {
    var tweenable = {},
				key, parsedKey;

    for ( key in values ) {
      parsedKey = parseInt( key, 10 );
      if ( !isNaN( parsedKey ) ) {
        key = parsedKey;
      }

      if ( typeof values[ key ] == 'number' ) {
        tweenable[ key ] = true;
      } else {
        tweenable[ key ] = cacheTweenable( values[ key ] );
      }
    }

    return tweenable;
  }

  function cacheKeys(values, keys) {
    var key, _key;
    for ( key in values ) {
      _key = parseInt( key, 10 );
      if ( !isNaN(_key) ) {
        key = _key;
      }

      keys.push( key );
    }

    for ( key in values ) {
      keys.push( cacheKeys( values[ key ], [] ) );
    }

    return keys;
  }

  // Frame constructor (internal)
  // contains new target value and how to get there
  function Frame( options ) {
    Abacus.extend( this, options );

    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }

    this.tweenable = cacheTweenable( this.value );

    this.keys = cacheKeys( this.value, [] );
  }

  // Layer constructor (internal)
  // Returns Layer
  function Layer( options ) {
    options = options || {};

    Abacus.extend( this, options );

    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }

    if ( !this.frames ) {
      this.frames = [];
    }

    // stored index value to avoid constantly looking up the correct frame
    this.frameIndex = -1;
  }

  Layer.prototype = {

    // Layer.reset
    // reset internal values to the start of the layer
    reset: function() {
      this.frameIndex = -1;
    },

    // Layer.addFrame(frame)
    // insert animation.frame object according to frame.index. returns Layer
    addFrame: function( frame ) {
      var frameAdded = false,
          framesLength = this.frames.length,
          i = 0;

      if ( !(frame instanceof Frame) ) {
        frame = Abacus.animation.frame(frame);
      }

      for ( ; i < framesLength; i++ ) {
        if ( this.frames[i].index > frame.index ) {
          this.frames.splice( i, 0, frame );
          frameAdded = true;
          break;
        }
      }

      if ( !frameAdded ) {
        this.frames.push(frame);
      }

      return this;
    },

    // Layer.getFrame( index )
    // return the frame with the given index value
    getFrame: function( index ) {
      var frames = this.frames,
          framesLength = frames.length,
          i = 0;

      for ( ; i < framesLength; i++ ) {
        if ( frames[i].index === index ) {
          return frames[i];
        }
      }

      return null;
    },

    // Layer.removeFrame( index || animation.frame )
    // remove an animation.frame either by its index value or by the frame itself
    removeFrame: function( index ) {
      var frames = this.frames,
          framesLength = frames.length,
          i = 0;

      if ( index instanceof Frame ) {
        // access the index value from the frame
        index = index.index;
      }

      for ( ; i < framesLength; i++ ) {
        if ( frames[i].index === index ) {
          frames.splice( i, 1 );
          break;
        }
      }
    },

    // Layer.step( ... )
    // updates target and returns true if there are no further frames
    step: function( animation, target, timerData ) {
      var sinceStart = timerData.sinceStart / 1000,
          frameIndex = this.frameIndex,
          lastFrame = this.frames[ frameIndex ],
          nextFrame = this.frames[ frameIndex + 1 ],
          framePlus;

      // at end of layer?
      if ( nextFrame == null ) {
        return false;
      }

      if ( lastFrame && lastFrame.index / animation.rate > sinceStart ) {
        return true;
      }

      // increment to the next usable frame
      if ( nextFrame.index / animation.rate <= sinceStart ) {
        for ( frameIndex++; frameIndex < this.frames.length; frameIndex++ ) {

          framePlus = frameIndex + 1;

          // special case for first frame
          if ( frameIndex === 0 && nextFrame.beforeTween ) {
            nextFrame.beforeTween();
          }

          lastFrame = this.frames[ frameIndex ];
          nextFrame = this.frames[ framePlus ];

          if ( nextFrame && nextFrame.beforeTween ) {
            nextFrame.beforeTween();
          }

          if ( lastFrame && lastFrame.afterTween ) {
            lastFrame.afterTween();
          }

          if ( this.frames[ framePlus ] &&
            this.frames[ framePlus ].index / animation.rate > sinceStart ||
            !this.frames[ framePlus ] )
          {
            break;
          }
        }

        this.frameIndex = frameIndex;

        // at end of layer?
        if ( nextFrame == null ) {
          return false;
        }
      }

      if ( lastFrame && nextFrame ) {
        doTween(
          lastFrame.value,
          nextFrame.value,
          nextFrame.tweenable,
          nextFrame.keys,
          target,
          ( nextFrame.tween || this.tween || animation.tween ).type,
          ( sinceStart - lastFrame.index / animation.rate ) *
            animation.rate /
            ( nextFrame.index - lastFrame.index )
        );
      }

      // this layer is not complete
      return true;
    }
  };

  // Animation constructor (internal)
  // Mapped from calls to Abacus.animation( options )
  function Animation( options ) {
    Abacus.extend(this, options);

    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }

    if ( !this.layers ) {
      this.layers = [];
    }
  }

  Animation.prototype = {

    // Animation.start()
    // Returns Animation
    start: function( target ) {
      var animation = this;

      // timerCallback context |this| is Timer instance
      function timerCallback( timerData ) {

        var layers = animation.layers,
            allComplete = true,
            idx;

        for ( idx = 0; idx < layers.length; idx++ ) {
          allComplete = layers[ idx ].step( animation, target, timerData ) && allComplete;
        }

        if ( !allComplete ) {
          // stop the timer and reset values to the beginning
          animation.stop();
        }
      }

      if ( !this.timer ) {
        this.timer = Abacus.timer({
          callback: timerCallback
        });
      }

      this.timer.start();

      return this;
    },

    // Animation.stop()
    // Returns Animation
    stop: function() {
      if ( this.timer ) {
        this.timer.pause();
      }

      this.reset();

      return this;
    },

    // Animation.reset()
    // Returns Animation
    reset: function() {
      this.layers.forEach(function(layer) {
        layer.reset();
      });

      return this;
    },

    // Animation.addLayer
    // Add new layer. Returns Animation
    addLayer: function( layer ) {
      var index = this.layers.length;

      this.layers.push(layer);
      layer.index = index;

      return this;
    },

    // Animation.layer( number || {} )
    // get layer or shortcut add and get layer
    layer: function( idx ) {

      var layer, options;

      if ( idx == null ) {
        // Create a new layer
        layer = Abacus.animation.layer();

        // Add to current layers
        this.addLayer(layer);

        return layer;
      }

      if ( this.layers[ idx ] ) {
        return this.layers[idx];
      }

      if ( typeof idx == 'object' ) {

        options = idx;

        if ( options.index != null ) {
          if ( options.index < this.layers.length ) {
            layer = this.layers[ options.index ];
            Abacus.extend( layer, options );

            return layer;
          } else {
            // error, layer must already exist for index to be specified
            throw {
              type: 'ArgumentException',
              message: 'layer with given index (' + options.index + ') must exist before calling layer(...) with object',
              argument: options
            };
          }
        } else {
          // shortcut for Abacus.animation.layer
          layer = Abacus.animation.layer( options );

          this.addLayer(layer);

          return layer;
        }
      }

      throw {
        type: 'ArgumentException',
        message: 'layer must be called with undefined, an integer, or an object',
        argument: idx
      };
    }
  };

  Abacus.animation = function( options ) {
    return new Animation(options);
  };

  Abacus.animation.layer = function( options ) {
    return new Layer(options);
  };

  Abacus.animation.frame = function( options ) {
    return new Frame(options);
  };

})( this, this.Abacus );