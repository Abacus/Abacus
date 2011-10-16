(function( window ) {
  
  var Abacus = window.Abacus || {};
  
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
      if (idx == undefined) {
        var layer = Abacus.animationLayer();
        this.addLayer(layer);
        
        return layer;
      } else if (typeof idx == 'number') {
        return this.layers[idx];
      } else if (typeof idx == 'object') {
        var layerOptions = idx;
      
        if (layerOptions.index != undefined) {
          if (layerOptions.index < this.layers.length) {
            var layer = this.layers[layerOptions.index];
            Abacus.extend(layer, layerOptions);
          
            return layer;
          } else {
            // ERROR: error, layer must already exist for index to be specified
          }
        } else {
          // shortcut for Abacus.animationLayer
          var layer = Abacus.animationLayer(layerOptions);
          this.addLayer(layer);
        
          return layer;
        }
      } else {
        // ERROR: throw an error ...
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
      if (nextFrame == undefined) {
        return false;
      }
      
      if (lastFrame && lastFrame.index / animation.rate > sinceStart) {
        return true;
      }
      
      // increment to the next usable frame
      if (nextFrame.index / animation.rate <= sinceStart) {
        for ( frameIndex++; frameIndex < this.frames.length; frameIndex++ ) {
          if (frameIndex == 0 && nextFrame.beforeTween) {
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
        if (nextFrame == undefined) {
          return false;
        }
      }
      
      if (lastFrame && nextFrame) {
        doTween(
          lastFrame.value, 
          nextFrame.value, 
          nextFrame.isTweenable, 
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
  
  // doTween( ... )
  // recursively tween values
  function doTween( 
    lastValue, nextValue, isTweenable, target, tween, index ) 
  {
    if (isTweenable === true) {
      return tween(lastValue, nextValue, index);
    }
    
    for (var key in nextValue) {
      target[key] = doTween(
        lastValue[key], 
        nextValue[key], 
        isTweenable[key], 
        target[key],
        tween,
        index);
    }
    return target;
  };
  
  // contains new target value and how to get there
  function Frame( options ) {
    Abacus.extend(this, options);
    
    if ( this.tween ) {
      this.tween = Abacus.tween({
        type: this.tween
      });
    }
    
    this.isTweenable = Abacus.clone(this.value);
    calculateIsTweenable(this.value, this.isTweenable);
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
  
  Abacus.animation = function( options ) {
    return new Animation(options);
  };
  Abacus.animationLayer = function( options ) {
    return new Layer(options);
  };
  Abacus.animationFrame = function( options ) {
    return new Frame(options);
  };
  
  // Re-expose Abacus object
  window.Abacus = Abacus;
  
})( this ); 