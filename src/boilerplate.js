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
				// Call all the calbacks
        for( var i=_timerCallbacks.length-1; i>=0; --i ) {
          _timerCallbacks[ i ]();
        }
      };

  var Abacus = {
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

      function stop() {
        var idx = _timerCallbacks.indexOf( _loop );
        _timerCallbacks.splice( idx, 1 );
      }

      function _loop(){
        var now = Date.now();
        importantStuff.delta = now - _lastTick;
        _lastTick = now;
				
        // Check to see if the timer is paused
        if ( pauseFlag || ( _until && _lastTick - _lastStart > _until ) ) {
          stop();
          if( options.complete ){
            options.complete();
          }
        }

        // If there is a callback pass the importantStuff to it
        if( options.callback ) {
          options.callback( importantStuff );
        }

      }

      return {
        start: function( until ) {
          _lastStart = Date.now();
          _until = until;
          _lastTick = _lastStart;
          pauseFlag = false;

          if( _timerCallbacks.length === 0 ) {
            requestAnimFrame(_timerLoop);
          }
          _timerCallbacks.push( _loop );

        },
        pause: function() {
          pauseFlag = true;
        }
      };
    }
  }
  window.Abacus = Abacus;
})( window );
