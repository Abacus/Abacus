(function( window, Abacus ) {

  var players = [];

  function Player( options ){
  
    this.addAcheivement = function( key, value ){
      Abacus.store( key, value );
    }

  }
  
  function addPlayer( options ){
    return new Player( options );
  }

  

})( this, this.Abacus );

/*

Abacus.

*/
