module("Timer Module");
test("Test that the Abacus.timer exists", function() {
  ok( Abacus.timer, 'Abacus.timer exists' );
});

test("Test that the timer exists, and that it can stop start", function() {
  
	var timer = Abacus.timer();

  equals( 'function', (typeof timer.start), "the timer instance has a start method" );
  equals( 'function', (typeof timer.pause), "the timer instance has a pause method" );

});

test("the timer runs for the correct period of time", function(){
	
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


})
