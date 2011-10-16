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
      noop = function() {},
      guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        }).toUpperCase();
      };

  // Timer constructor (Internal)
  function Timer( options ) {
    // options is expected to have optional
    // callback and element properties

    this.key = guid();
    this.lastTick = 0;
    this.lastStart = 0;
    this._until = 0;
    this.isPaused = false;
    this.importantStuff = {
      delta: 0,

      // how many times callback is called
      ticks: 0
    };

    // Define own property loop() function closure
    this.loop = function() {
      var now = Date.now();

      this.importantStuff.delta = now - this.lastTick;
      this.lastTick = now;

      // Check to see if the timer is paused, or run over until time but ran
      // at least once
      if ( this.isPaused ||
            ( this._until != null && this.lastTick - this.lastStart > this._until ) &&
            this.importantStuff.ticks !== 0 ) {

        this.stop();

        if ( options.complete ) {
          options.complete( this.importantStuff );
        }
      } else {

        // If there is a callback pass the importantStuff to it
        if ( options.callback ) {
          options.callback( this.importantStuff );
        }

        // zero index, add after call
        this.importantStuff.ticks++;
      }

    }.bind( this );


    // Define own property stop() function closure
    this.stop = function() {

      callbackQueue.splice( callbackQueue.indexOf( this.loop || noop ), 1 );

    }.bind( this );

    return this;
  }

  Timer.prototype = {
    start: function( until ) {
      this.lastStart = Date.now();
      this._until = until;
      this.lastTick = this.lastStart;
      this.isPaused = false;

      callbackQueue.push( this.loop );

      if ( !timerLoop.running ) {
        requestAnimFrame( timerLoop );
      }
    },
    pause: function() {
      this.isPaused = true;
    }
  };

  // Wrap new Timer() construction in Abacus.timer() API
  Abacus.timer = function( options ) {
    return new Timer( options );
  };



  window.Abacus = Abacus;

})( this );
