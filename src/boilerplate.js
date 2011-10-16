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

        var queueLength = callbackQueue.length,
        i = queueLength - 1;

        // If there are callbacks, then run the loop again
        if ( queueLength ) {
          requestAnimFrame( timerLoop );
        }

        timerLoop.running = !!queueLength;

        // Iterate and execute all callbacks in the queue
        for ( ; i >= 0; --i ) {
          callbackQueue[ i ]();
        }
      },
      noop = function() {};


	// Wrap new Timer() construction in Abacus.timer() API
  Abacus.timer = function( options ) {
    // options is expected to have optional
    // callback and element properties

		return new Timer( options );
	};

	// Timer constructor
	function Timer( options ) {
    var loop, stop,
      lastTick = 0,
      lastStart = 0,
      _until = 0,
      isPaused = false,
      importantStuff = {
        delta: 0,

        // how many times callback is called
        ticks: 0
      };


    loop = function() {
      var now = Date.now();
      importantStuff.delta = now - lastTick;
      lastTick = now;

      // Check to see if the timer is paused, or run over until time but ran
      // at least once
      if ( isPaused ||
            ( _until != null && lastTick - lastStart > _until ) &&
            importantStuff.ticks !== 0 ) {

        stop();

        if ( options.complete ) {
          options.complete( importantStuff );
        }
      } else {

        // If there is a callback pass the importantStuff to it
        if ( options.callback ) {
          options.callback( importantStuff );
        }

        // zero index, add after call
        importantStuff.ticks++;
      }

    };

    stop = function() {
      callbackQueue.splice( callbackQueue.indexOf( loop || noop ), 1 );
    };


    return {
      start: function( until ) {
        lastStart = Date.now();
        _until = until;
        lastTick = lastStart;
        isPaused = false;

        if ( !timerLoop.running ) {
          requestAnimFrame( timerLoop );
          timerLoop.running = true;
        }
        callbackQueue.push( loop );
      },
      pause: function() {
        isPaused = true;
      }
    };
  };

  window.Abacus = Abacus;

})( this );
