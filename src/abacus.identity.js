(function( window, Abacus ) {

  var players = [];

  function Player( options ){
  
    var _player = Abacus.extend( options, {
      id: Abacus.guid(),
      achievements: [],
      addAchievement: function( options ){

        options = options || {};
        
        var _achievement = new Achievement( options );

        this.achievements.push( _achievement )
        return this;
      }
    });

    players.push( _player )

    return _player;

  }

  function Achievement( options ){
  
    var _achievement = Abacus.extend( options, {

      id: Abacus.guid(),
      date: Date.now()

    });
 
    return _achievement;
  }
  
  Abacus.addPlayer = function( options ){
    
    options = options || {};
    
    return new Player( options );

  }

  

})( this, this.Abacus );
