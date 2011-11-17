(function( window, Abacus ) {

  var players = [];

  function Player( options ){
  
    var _player = Abacus.extend( options, {
    
      id: Abacus.guid()

    
    });

    players.push( _player )

    return _player;

  }
  
  Abacus.addPlayer = function( options ){
    
    options = options || {};

    return new Player( options );

  }

  

})( this, this.Abacus );

/*

Abacus.

*/
