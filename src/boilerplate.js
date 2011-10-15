(function( window ) {

  var requestAnimFrame = (function(){
    // thanks paul irish
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( callback, element ) {
      window.setTimeout( callback, 1000 / 60 );
    };
  })();

  var Abacus = window.Abacus || {},
			// An array of callbacks to call in our rAF
			callbackQueue = [],
      // the function we call on each tick of the rAF
      timerLoop = function() {
        // If there are callbacks, then run the loop again
        if ( callbackQueue.length > 0 ) {
          requestAnimFrame(timerLoop);
        }

        timerLoop.running = callbackQueue.length > 0;

        // Iterate and execute all callbacks in the queue
        for ( var i = callbackQueue.length-1; i >= 0; --i ) {
          callbackQueue[ i ]();
        }
      },
			noop = function() {};


	Abacus.timer = function( options ) {
    // options is expected to have optional
    // callback and element properties

    var _lastTick = 0,
        _lastStart = 0,
        _until = 0,
				isPaused = false,
        importantStuff = {
          delta: 0,

          // how many times callback is called
          ticks: 0
        },

    stop = function() {
      var idx = callbackQueue.indexOf( loop );
      callbackQueue.splice( idx, 1 );
    },

    loop = function() {
      var now = Date.now();
      importantStuff.delta = now - _lastTick;
      _lastTick = now;

      // Check to see if the timer is paused, or run over until time but ran
      // at least once
      if ( isPaused ||
        ( _until != undefined && _lastTick - _lastStart > _until ) &&
        importantStuff.ticks !== 0 )
      {
        stop();

        if( options.complete ){
          options.complete( importantStuff );
        }
      } else {

        // If there is a callback pass the importantStuff to it
        if( options.callback ) {
          options.callback( importantStuff );
        }

        // zero index, add after call
        importantStuff.ticks++;
      }

    };

    return {
      start: function( until ) {
        _lastStart = Date.now();
        _until = until;
        _lastTick = _lastStart;
        isPaused = false;

        if( !timerLoop.running ) {
          requestAnimFrame(timerLoop);
          timerLoop.running = true;
        }
        callbackQueue.push( loop );

      },
      pause: function() {
        isPaused = true;
      }
    }
  };

  window.Abacus = Abacus;
})( window );
