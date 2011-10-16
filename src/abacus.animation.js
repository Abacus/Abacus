(function( window ) {
  
  var Abacus = window.Abacus || {};
  
  // new Animation()
  // groups of animated layers
  function Animation( options ) {
    Abacus.extend(this, options);
    
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
          allComplete = layers[idx].step(timerData, target, animation) && allComplete;
        }
      
        if (allComplete) {
          this.stop(); // timer is this function's context
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
        this.timer.stop();
      }
    },
    addLayer: function ( layer ) {
      var index = this.layers.length;
      this.layers.push(layer);
      layer.index = index;
    
      return this;
    },
    layer: function( idx ) {
      if (idx == undefined) {
        return Abacus.animationLayer();
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
    Abacus.extend(this, options);
    
    if (!this.frames) {
      this.frames = [];
    }
    
    // stored index value to avoid constantly looking up the correct frame
    this.frameIndex = 0;
  }
  Layer.prototype = {
    // Layer.addFrame(frame)
    // insert animationFrame object according to frame.index
    addFrame: function( frame ) {
      var frameAdded = false,
          framesLength = this.frames.length,
          i = 0;
    
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
    },
    step: function( timerData, target, animation ) {
      var frameIndex = this.frameIndex,
          lastFrame = this.frames[frameIndex],
          nextFrame = this.frames[frameIndex+1];
        
      // at end of layer?
      if (nextFrame == undefined) {
        return false;
      }
    
      // increment to the next usable frame
      if (nextFrame.index * animation.rate <= timerData.sinceStart) {
        for ( frameIndex++; frameIndex < this.frames.length; frameIndex++ ) {
          if (this.frames[frameIndex+1].index * animation.rate > timerData.sinceStart) {
            lastFrame = this.frames[frameIndex];
            nextFrame = this.frames[frameIndex+1];
            break;
          }
        }
      
        // at end of layer?
        if (nextFrame == undefined) {
          return false;
        }
      }
    
      // get and set the new value
      doTween(
        lastFrame.value, 
        nextFrame.value, 
        nextFrame.isTweenable, 
        target,
        nextFrame.tween || this.tween || animation.tween,
        (timerData.sinceStart - lastFrame.index / animation.rate) * 
          animation.rate / 
          (nextFrame.index - lastFrame.index));
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
        index, 
        tween, 
        target[key]);
    }
    return target;
  };
  
  // contains new target value and how to get there
  function Frame( options ) {
    Abacus.extend(this, options);
    
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