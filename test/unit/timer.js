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
        
        if (timesCalled > 1) {
          ok(false, "called second time");
          timer.pause();
        } else {  
          ok("called once");
          start();
        }
      }
    });
  
  timer.start(0);
});

