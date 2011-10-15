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
