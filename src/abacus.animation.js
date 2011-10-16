(function( window ) {
  
  var Abacus = window.Abacus || {};
  
  // groups of layers
  function Animation( options ) {
    Abacus.extend(this, options);
    
    if (!this.layers) {
      this.layers = [];
    }
  }
  Animation.prototype.start = function( target ) {
    var animation = this;
    function timerCallback( timerData ) {
      var layers = animation.layers, 
          allComplete = true;
      
      for (var idx = 0; idx < layers.length; idx++) {
        allComplete = layers[idx].step(timerData, target) && allComplete;
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
  };
  Animation.prototype.stop = function() {
    if (this.timer) {
      this.timer.stop();
    }
  };
  Animation.prototype.addLayer = function ( layer ) {
    var index = this.layers.length;
    this.layers.push(layer);
    layer.index = index;
    
    return this;
  };
  Animation.prototype.layer = function( idx ) {
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
  };
  
  // groups of frames
  function Layer( options ) {
    
  }
  
  // contains new target value and how to get there
  function Frame( options ) {
    
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