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
    timer2 = Abacus.timer({
    callback: function( timerData ) {
      totalTime += timerData.delta;
    }
  });
  timer2.start( 400 );
  
  setTimeout( function() {
    ok(totalTime <= 400, "total time is less than 400");
    start();
  }, 500);

}, false );

asyncTest("timer.start(0) calls once", function() {
  var timesCalled = 0,
    timer = Abacus.timer({
      callback: function( timerData ) {
        timesCalled++;
        
        ok(timesCalled <= 1, "called time " + timesCalled);
        if (timesCalled > 1) {
          timer.pause();
        }
        
        setTimeout(function() {
          start();
        }, 100);
      }
    });
  
  timer.start(0);
});

asyncTest("timers do not get called twice in one frame", function() {
  Abacus.timer({
    callback: function( timerData ) {
      var timesCalled = 0;
      
      // call in setTimeout to make sure timer count is 0
      setTimeout(function() {
        Abacus.timer({
          callback: function( timerData ) {
            ok(timesCalled++ <= 1, "called time " + timesCalled);
          }
        }).start(0);
        
        setTimeout(function() {
          start();
        }, 100);
      }, 100);
    }
  }).start(0);
});
