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
  })();

  // An array of callbacks to call in our rAF
  var _timerCallbacks = [],
	    // the function we call on each tick of the rAF
      _timerLoop = function() {
				// If there are callbacks, then run the loop again
        if ( _timerCallbacks.length > 0 ) {
          requestAnimFrame(_timerLoop);
        }
        _timerLoop.running = _timerCallbacks.length > 0;
				
				// Call all the calbacks
        for( var i=_timerCallbacks.length-1; i>=0; --i ) {
          _timerCallbacks[ i ]();
        }
      };

  var Abacus = (function(){
    var noop = function(){},

    timer = function( options ){
				// Options is expected to have optional
				// callback and element properties

			_lastTick = 0,
			_lastStart = 0,
			_until = 0,
			pauseFlag = false,
			importantStuff = {
				delta: 0
			},

			stop = function() {
				var idx = _timerCallbacks.indexOf( _loop );
				_timerCallbacks.splice( idx, 1 );
			},

			_loop = function() {
				var now = Date.now();
				importantStuff.delta = now - _lastTick;
				_lastTick = now;
				
				// Check to see if the timer is paused
        if ( pauseFlag || ( _until != undefined && _lastTick - _lastStart > _until ) ) {
          stop();
  				if( options.complete ){
						options.complete();
					}
          
          // return early so callback is not called again
          return;
        }

				// If there is a callback pass the importantStuff to it
				if( options.callback ) {
					options.callback( importantStuff );
				}

			};

			return {
				start: function( until ) {
					_lastStart = Date.now();
					_until = until;
					_lastTick = _lastStart;
					pauseFlag = false;

          if( !_timerLoop.running ) {
            requestAnimFrame(_timerLoop);
            _timerLoop.running = true;
          }
          _timerCallbacks.push( _loop );

				},
				pause: function() {
					pauseFlag = true;
				}
			}
		};
    return {
		  timer: timer
		}
	})()
  window.Abacus = Abacus;
})( window );
