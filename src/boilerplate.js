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

  Abacus = {
		noop: function(){},

    timer: function( options ){
			// Options is expected to have optional
			// callback and element properties

      var _lastTick = 0,
          _lastStart = 0,
          _until = 0,
          pauseFlag = false,
				  importantStuff = {
				    delta: 0
				  };

      function _loop(){
        var now = Date.now();
        importantStuff.delta = now - _lastTick;
        _lastTick = now;
				
				// If there is a callback pass the importantStuff to it
				if( options.callback ) {
          options.callback( importantStuff );
				}

				// Check to see if the timer is paused before calling RAF
        if ( !pauseFlag && ( !_until || ( _until && _lastTick - _lastStart < _until ) ) ) {
          requestAnimFrame(_loop, options.element);
        }
      }

      return {
        start: function( until ) {
          _lastStart = Date.now();
          _until = until;
          _lastTick = _lastStart;
          pauseFlag = false;
          requestAnimFrame(_loop, options.element);
        },
        pause: function() {
          pauseFlag = true;
        }
      };
		}
	}
  window.Abacus = Abacus;
})( window );


