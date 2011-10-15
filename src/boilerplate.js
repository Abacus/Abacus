(function( window ){
	var requestAnimFrame = (function(){
		// thanks paul irish
		return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame  || 
		window.mozRequestAnimationFrame     || 
		window.oRequestAnimationFrame       || 
		window.msRequestAnimationFrame      || 
		function( callback, element ){
			window.setTimeout( callback, 1000 / 60 );	
		}
	})(),

  gamecore = {
		noop: function(){},

    timer: function( options ){
			if( !options ) {
			  var options = {
					callback: this.noop,
				  element: window.document.documentElement
				}
			}

      var _lastTick,
				  importantStuff = {
				    delta: Date.now() - _lastTick
				  };

				function _loop(){
				  importantStuff.delta = Date.now() - _lastTick;
					requestAnimFrame(_loop, options.element);
				  options.callback( importantStuff );
					_lastTick = Date.now();
				}
				_loop();
		}
	}
  window.gc = gamecore;
})( window );


