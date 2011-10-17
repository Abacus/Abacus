module('Timer');
test('Test that the Abacus.timer exists', 1, function() {
  ok( Abacus.timer, 'Abacus.timer exists' );
});

test('Timer instances have start and pause proto methods', 4, function() {

  var timer = Abacus.timer();

  equal( typeof timer.start, 'function', 'the timer instance has a start method' );
  equal( typeof timer.pause, 'function', 'the timer instance has a pause method' );

  ok( !timer.hasOwnProperty('start'), 'start is a proto method' );
  ok( !timer.hasOwnProperty('pause'), 'pause is a proto method' );

});

test('Timer instances have stop and loop own methods', 4, function() {

  var timer = Abacus.timer();

  equal( typeof timer.stop, 'function', 'the timer instance has a stop method' );
  equal( typeof timer.loop, 'function', 'the timer instance has a loop method' );

  ok( timer.hasOwnProperty('stop'), 'stop is an own property method' );
  ok( timer.hasOwnProperty('loop'), 'loop is an own property method' );

});

test('Timer instances have an id property', 1, function() {

  var timer = Abacus.timer();

  equal( typeof timer.id, 'string', 'the timer instance has an id property' );
});

test('Timer instances have a timing property', 3, function() {

  var timer = Abacus.timer();
  equal( typeof timer.timing, 'object', 'the timer instance has a timing property' );
  equal( typeof timer.timing.delta, 'number', 'the timing property has a delta property' );
  equal( typeof timer.timing.ticks, 'number', 'the timing property has a ticks property' );
});

asyncTest('Context inside of timer callbacks is timer instance itself', 12, function(){

  Abacus.timer({
    callback: function( timerData ) {

      console.log( this );

      equal( typeof this.start, 'function', 'the this instance has a start method' );
      equal( typeof this.pause, 'function', 'the this instance has a pause method' );

      ok( !this.hasOwnProperty('start'), 'start is a proto method' );
      ok( !this.hasOwnProperty('pause'), 'pause is a proto method' );

      equal( typeof this.stop, 'function', 'the this instance has a stop method' );
      equal( typeof this.loop, 'function', 'the this instance has a loop method' );

      ok( this.hasOwnProperty('stop'), 'stop is an own property method' );
      ok( this.hasOwnProperty('loop'), 'loop is an own property method' );

      equal( typeof this.id, 'string', 'the this instance has an id property' );

      equal( typeof this.timing, 'object', 'the this instance has a timing property' );
      equal( typeof this.timing.delta, 'number', 'the timing property has a delta property' );
      equal( typeof this.timing.ticks, 'number', 'the timing property has a ticks property' );

      start();
    }
  }).start(0);
});

asyncTest('the timer runs for the correct period of time', 1, function(){
  var totalTime = 0,
    amountOfTime = 400,
    timer2 = Abacus.timer({
    callback: function( timerData ) {
      totalTime += timerData.delta;
    }
  });
  timer2.start( amountOfTime );

  setTimeout( function() {
    ok(totalTime <= amountOfTime, 'total time is less than the set amount of time');
    start();
  }, 500);

}, false );

asyncTest('timer.start(0) calls once', 1, function() {
  var timesCalled = 0,
    timer = Abacus.timer({
      callback: function( timerData ) {
        timesCalled++;

        ok(timesCalled <= 1, 'called ' + timesCalled + ' time');
        if (timesCalled > 1) {
          timer.pause();
        }
      }
    });

  timer.start(0);

  setTimeout(function() {
    start();
  }, 100);
});

/**
 * Test to make sure the timer loop is not running twice
 */
asyncTest('timers do not get called twice in one frame', 1, function() {
  Abacus.timer({
    callback: function( timerData ) {
      var timesCalled = 0;

      // call in setTimeout to make sure timer count is 0
      setTimeout(function() {
        Abacus.timer({
          callback: function( timerData ) {
            ok(timesCalled++ <= 1, 'called ' + timesCalled + ' time');
          }
        }).start(0);

        setTimeout(function() {
          start();
        }, 100);
      }, 100);
    }
  }).start(0);
});

asyncTest('timer.complete callback after completion', 2, function() {
  var completed = false;

  Abacus.timer({
    callback: function() {
      ok(!completed, 'options.callback is called');
    },
    complete: function() {
      completed = true;
      ok(true, 'options.complete is called');
    }
  }).start(0);

  setTimeout(start, 100);
});

asyncTest('timerData.tick increments with 0-index', 5, function() {
  var tick = -1,
    timer = Abacus.timer({
      callback: function(timerData) {
        tick++;
        equal(tick, timerData.ticks, 'tick count is correct');
        if (tick >= 4) {
          timer.pause();
          start();
        }
      }
    });
  timer.start();
});

asyncTest('timerData.sinceStart is time since start', 5, function() {
  var startTime = Date.now(),
      timer = Abacus.timer({
        callback: function( timerData ) {
          ok(Math.abs(timerData.sinceStart - (Date.now() - startTime)) < 2, "" + timerData.sinceStart + " ~= " + (Date.now() - startTime));
          if (timerData.ticks == 4) {
            this.stop();
            start();
          }
        }
      });
  timer.start();
});
