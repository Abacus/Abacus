(function( window ) {
  
  var Abacus = window.Abacus || {};
  
  // doTween( ... )
  // recursively tween values
  function doTween( 
    lastValue, nextValue, isTweenable, keys, target, tween, index ) 
  {
    if (isTweenable === true) {
      return tween(lastValue, nextValue, index);
    }
    
    var i = keys.length / 2,
        halfKeys = keys.length / 2,
        key;
    while (i--) {
      key = keys[i];
      target[key] = doTween(
        lastValue[key],
        nextValue[key],
        isTweenable[key],
        keys[halfKeys+i],
        target[key],
        tween,
        index);
    }
    return target;
  }
  
  function calculateIsTweenable(values, isTweenable) {
    for (var key in values) {
      if (typeof values[key] == 'number') {
        isTweenable[key] = true;
      } else {
        calculateIsTweenable(values[key], isTweenable[key]);
      }
    }
  }
  
  function cacheIsTweenable(values) {
    var isTweenable = {}, key, parsedKey;
    for (key in values) {
      parsedKey = parseInt(key, 10);
      if (!isNaN(parsedKey)) {
        key = parsedKey;
      }
      
      if (typeof values[key] == 'number') {
        isTweenable[key] = true;
      } else {
        isTweenable[key] = cacheIsTweenable(values[key]);
      }
    }
    return isTweenable;
  }
  
  function cacheKeys(values, keys) {
    var key, _key;
    for (key in values) {
      try {
        _key = parseInt(key, 10);
        if (!isNaN(_key)) {
          key = _key;
        }
      } catch (e) {}
      keys.push(key);
    }
    
    for (key in values) {
      keys.push(cacheKeys(values[key], []));
    }
    
    return keys;
  }
  
  // Frame constructor
  // contains new target value and how to get there
  function Frame( options ) {
    Abacus.extend(this, options);
    
    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }
    
    this.isTweenable = cacheIsTweenable(this.value);
    
    this.keys = cacheKeys(this.value, []);
  }
  
  // Layer constructor
  // groups of frames
  function Layer( options ) {
    options = options || {};
    
    Abacus.extend(this, options);
    
    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }
    
    if (!this.frames) {
      this.frames = [];
    }
    
    // stored index value to avoid constantly looking up the correct frame
    this.frameIndex = -1;
  }
  Layer.prototype = {
    // Layer.addFrame(frame)
    // insert animationFrame object according to frame.index. returns Layer
    addFrame: function( frame ) {
      var frameAdded = false,
          framesLength = this.frames.length,
          i = 0;
      
      if ( !(frame instanceof Frame) ) {
        frame = Abacus.animationFrame(frame);
      }
    
      for ( ; i < framesLength; i++ ) {
        if ( this.frames[i].index > frame.index ) {
          this.frames.splice(i, 0, frame);
          frameAdded = true;
          break;
        }
      }
    
      if (!frameAdded) {
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
        if (frames[i].index == index) {
          return frames[i];
        }
      }
      
      return null;
    },
    // Layer.removeFrame( index || animationFrame )
    // remove an animationFrame either by its index value or by the frame itself
    removeFrame: function( index ) {
      var frames = this.frames,
          framesLength = frames.length,
          i = 0;
      
      if ( index instanceof Frame ) {
        // access the index value from the frame
        index = index.index;
      }
      
      for ( ; i < framesLength; i++ ) {
        if (frames[i].index == index) {
          frames.splice(i, 1);
          break;
        }
      }
    },
    // Layer.step( ... )
    // updates target and returns true if there are no further frames
    step: function( animation, target, timerData ) {
      var sinceStart = timerData.sinceStart / 1000,
          frameIndex = this.frameIndex,
          lastFrame = this.frames[frameIndex],
          nextFrame = this.frames[frameIndex+1];
        
      // at end of layer?
      if (nextFrame === undefined) {
        return false;
      }
      
      if (lastFrame && lastFrame.index / animation.rate > sinceStart) {
        return true;
      }
      
      // increment to the next usable frame
      if (nextFrame.index / animation.rate <= sinceStart) {
        for ( frameIndex++; frameIndex < this.frames.length; frameIndex++ ) {
          // special case for first frame
          if (frameIndex === 0 && nextFrame.beforeTween) {
            nextFrame.beforeTween();
          }
          
          lastFrame = this.frames[frameIndex];
          nextFrame = this.frames[frameIndex+1];
          
          if (nextFrame && nextFrame.beforeTween) {
            nextFrame.beforeTween();
          }
          
          if (lastFrame && lastFrame.afterTween) {
            lastFrame.afterTween();
          }
          
          if (this.frames[frameIndex+1] && 
            this.frames[frameIndex+1].index / animation.rate > sinceStart ||
            !this.frames[frameIndex+1]) 
          {
            break;
          }
        }
        
        this.frameIndex = frameIndex;
        
        // at end of layer?
        if (nextFrame === undefined) {
          return false;
        }
      }
      
      if (lastFrame && nextFrame) {
        doTween(
          lastFrame.value, 
          nextFrame.value, 
          nextFrame.isTweenable, 
          nextFrame.keys,
          target,
          (nextFrame.tween || this.tween || animation.tween).type,
          (sinceStart - lastFrame.index / animation.rate) * 
            animation.rate / 
            (nextFrame.index - lastFrame.index));
      }
      
      // this layer is not complete
      return true;
    }
  };
  
  // new Animation()
  // groups of animated layers
  function Animation( options ) {
    Abacus.extend(this, options);
    
    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }
    
    if (!this.layers) {
      this.layers = [];
    }
  }
  Animation.prototype = {
    // Animation.start
    // start the animation
    start: function( target ) {
      var animation = this;
      function timerCallback( timerData ) {
        var layers = animation.layers, 
            allComplete = true;
      
        for (var idx = 0; idx < layers.length; idx++) {
          allComplete = layers[idx].step(animation, target, timerData) && allComplete;
        }
      
        if (!allComplete) {
          this.pause(); // timer is this function's context
        }
      }
    
      if (!this.timer) {
        this.timer = Abacus.timer({
          callback: timerCallback
        });
      }
    
      this.timer.start();
    },
    // Animation.stop
    // stop the animation (by stopping its timer)
    stop: function() {
      if (this.timer) {
        this.timer.pause();
      }
    },
    // Animation.addLayer
    // add new layer. returns Animation
    addLayer: function( layer ) {
      var index = this.layers.length;
      this.layers.push(layer);
      layer.index = index;
    
      return this;
    },
    // Animation.layer( number || {} )
    // get layer or shortcut add and get layer
    layer: function( idx ) {
      var layer;
      if (idx === undefined) {
        layer = Abacus.animationLayer();
        this.addLayer(layer);
        
        return layer;
      } else if (typeof idx == 'number') {
        return this.layers[idx];
      } else if (typeof idx == 'object') {
        var layerOptions = idx;
      
        if (layerOptions.index !== undefined) {
          if (layerOptions.index < this.layers.length) {
            layer = this.layers[layerOptions.index];
            Abacus.extend(layer, layerOptions);
          
            return layer;
          } else {
            // error, layer must already exist for index to be specified
            throw {
              type: 'ArgumentException',
              message: 'layer with given index (' + layerOptions.index + ') must exist before calling layer(...) with object',
              argument: idx
            };
          }
        } else {
          // shortcut for Abacus.animationLayer
          layer = Abacus.animationLayer(layerOptions);
          this.addLayer(layer);
        
          return layer;
        }
      } else {
        // throw an error ...
        throw {
          type: 'ArgumentException',
          message: 'layer must be called with undefined, an integer, or an object',
          argument: idx
        };
      }
    }
  };
  
  Abacus.animation = function( options ) {
    // options
    //   rate - indices per second
    //   timer - Abacus.timer
    //   tween - tween function or 'tweenName'
    
    return new Animation(options);
  };
  Abacus.animationLayer = function( options ) {
    // options
    //   tween - tween function
    
    return new Layer(options);
  };
  Abacus.animationFrame = function( options ) {
    // options
    //   index - integer
    //   value - array or object, can be nested
    //   tween - function(start, stop, t){} or 'tweenName'
    //   beforeTween - function(frame){}
    //   afterTween - function(frame){}
    
    return new Frame(options);
  };
  
  // Re-expose Abacus object
  window.Abacus = Abacus;
  
})( this ); 