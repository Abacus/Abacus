document.addEventListener( 'DOMContentLoaded', function( e ) {

  var timer = Abacus.timer({
    callback: function( timerData ) {
      console.log( "Timer A:", timerData.delta );
    }
  });

  timer.start();

  setTimeout( function() {
    timer.pause();

    var timer2 = Abacus.timer({
      callback: function( timerData ) {
        console.log( "Timer B:", timerData.delta );
      }
    });
    timer2.start( 400 );

  }, 400 );

}, false );

module("Abacus.timer");

asyncTest("timer.start(0) calls once", function() {
  var timesCalled = 0,
    timer = Abacus.timer({
      callback: function( timerData ) {
        timesCalled++;
        if (timesCalled > 1) {
          ok(false, "called second time");
        } else {  
          ok("callback called");
          timer.pause();
          start();
        }
      }
    });
  
  timer.start(0);
});
