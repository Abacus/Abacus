(function( window ) {

  // Animation constructor (internal)
  // Mapped from calls to Abacus.animation( options )
  // groups of animated layers
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
          this.pause();
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
      return this;
    },

    // Animation.addLayer
    // add new layer. returns Animation
    addLayer: function ( layer ) {
      var index = this.layers.length;

      this.layers.push(layer);
      layer.index = index;

      return this;
    },

    // Animation.layer( number || {} )
    // get layer or shortcut add and get layer
    layer: function( idx ) {

      var layer, options;

      // if idx is null or undefined
      if ( idx == null ) {
        // Create a new layer
        layer = Abacus.animation.layer();

        // Add to current layers
        this.addLayer(layer);

        return layer;
      }

      if ( this.layers[ idx ] ) {
        return this.layers[ idx ];
      }

      if ( typeof idx == 'object' ) {

        options = idx;

        if ( options.index != null &&
              options.index < this.layers.length ) {

          layer = this.layers[ options.index ];

          Abacus.extend( layer, options );

          return layer;
        } else {
          // shortcut for Abacus.animation.layer
          layer = Abacus.animation.layer( options );

          this.addLayer(layer);

          return layer;
        }
      }
    }
  };

  // groups of frames
  function Layer( options ) {
    options = options || {};

    Abacus.extend(this, options);

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
    // Layer.addFrame(frame)
    // insert animation.frame object according to frame.index. returns Layer
    addFrame: function( frame ) {
      var frameAdded = false,
          framesLength = this.frames.length,
          i = 0;

      if ( !(frame instanceof Frame) ) {
        frame = Abacus.animation.frame( frame );
      }

      for ( ; i < framesLength; i++ ) {
        if ( this.frames[i].index > frame.index ) {
          this.frames.splice( i, 0, frame );
          frameAdded = true;
          break;
        }
      }

      if ( !frameAdded ) {
        this.frames.push( frame );
      }

      return this;
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

          if ( frameIndex == 0 && nextFrame.beforeTween ) {
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
          nextFrame.isTweenable,
          target,
          ( nextFrame.tween || this.tween || animation.tween ).type,
          ( sinceStart - lastFrame.index / animation.rate ) *
            animation.rate / ( nextFrame.index - lastFrame.index )
				);
      }

      // this layer is not complete
      return true;
    }
  };

  // doTween( ... )
  // recursively tween values
  function doTween( lastValue, nextValue, isTweenable, target, tween, index ) {
    if ( isTweenable === true ) {
      return tween( lastValue, nextValue, index );
    }

		var key;

    for ( key in nextValue ) {
      target[ key ] = doTween(
        lastValue[ key ],
        nextValue[ key ],
        isTweenable[ key ],
        target[ key ],
        tween,
        index
			);
    }
    return target;
  };

  // contains new target value and how to get there
  function Frame( options ) {
    Abacus.extend( this, options );

    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }

    this.isTweenable = Abacus.clone( this.value );
    calculateIsTweenable( this.value, this.isTweenable );
  }

  function calculateIsTweenable( values, isTweenable ) {
		var key;

    for ( key in values ) {
      if ( typeof values[ key ] === 'number' ) {
        isTweenable[ key ] = true;
      } else {
        calculateIsTweenable( values[ key ], isTweenable[ key ] );
      }
    }
  }

  Abacus.animation = function( options ) {
    return new Animation( options );
  };

  Abacus.animation.layer = function( options ) {
    return new Layer( options );
  };

  Abacus.animation.frame = function( options ) {
    return new Frame( options );
  };

})( this );