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

  var __timerCallbacks = [],
      __timerLoop = function() {
        if ( __timerCallbacks.length > 0 ) {
          requestAnimFrame(__timerLoop);
        }
        for( var i=__timerCallbacks.length-1; i>=0; --i ) {
          __timerCallbacks[ i ]();
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
        var idx = __timerCallbacks.indexOf( _loop );
        __timerCallbacks.splice( idx, 1 );
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

          if( __timerCallbacks.length === 0 ) {
            requestAnimFrame(__timerLoop);
          }
          __timerCallbacks.push( _loop );

        },
        pause: function() {
          pauseFlag = true;
        }
      };
    }
  }
  window.Abacus = Abacus;
})( window );
