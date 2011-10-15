document.addEventListener( 'DOMContentLoaded', function( e ) {

  var timer = gc.timer({
    callback: function( timerData ) {
      console.log( "Timer A:", timerData.delta );
    }
  });

  timer.start();

  setTimeout( function() {
    timer.pause();

    var timer2 = gc.timer({
      callback: function( timerData ) {
        console.log( "Timer B:", timerData.delta );
      }
    });
    timer2.start( 400 );

  }, 400 );

}, false );
