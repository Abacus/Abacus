module("Timer Module");
test("Test that the Abacus.timer exists", function() {
  ok( Abacus.timer, 'Abacus.timer exists' );
});

test("Test that the timer exists, and that it can stop start", function() {
  
  var timer = Abacus.timer();

  equals( 'function', (typeof timer.start), "the timer instance has a start method" );
  equals( 'function', (typeof timer.pause), "the timer instance has a pause method" );

});

asyncTest("the timer runs for the correct period of time", 1, function(){
  var totalTime = 0,
    amountOfTime = 400,
    timer2 = Abacus.timer({
    callback: function( timerData ) {
      totalTime += timerData.delta;
    }
  });
  timer2.start( amountOfTime );
  
  setTimeout( function() {
    ok(totalTime <= amountOfTime, "total time is less than the set amount of time");
    start();
  }, 500);

}, false );

asyncTest("timer.start(0) calls once", 1, function() {
  var timesCalled = 0,
    timer = Abacus.timer({
      callback: function( timerData ) {
        timesCalled++;
        
        ok(timesCalled <= 1, "called " + timesCalled + " time");
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
asyncTest("timers do not get called twice in one frame", 1, function() {
  Abacus.timer({
    callback: function( timerData ) {
      var timesCalled = 0;
      
      // call in setTimeout to make sure timer count is 0
      setTimeout(function() {
        Abacus.timer({
          callback: function( timerData ) {
            ok(timesCalled++ <= 1, "called " + timesCalled + " time");
          }
        }).start(0);
        
        setTimeout(function() {
          start();
        }, 100);
      }, 100);
    }
  }).start(0);
});

asyncTest("timer.complete callback after completion", 2, function() {
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

asyncTest("timerData.tick increments with 0-index", 5, function() {
  var tick = -1,
    timer = Abacus.timer({
      callback: function(timerData) {
        tick++;
        equals(tick, timerData.ticks, 'tick count is correct');
        if (tick >= 4) {
          timer.pause();
          start();
        }
      }
    });
  timer.start();
});
