(function( window, Abacus ) {
  // Setup a players cache
  // Eventually this should pull from something like
  // Abacus.store.players
  Abacus.players = [];

  // Express the Achievement function which will be used by
  // player.addAchievement to add an achievement to a player
  function Achievement( options ) {
    // Return the achievement
    // wich is an extension of arbitrary options passed in and
    // the props we need to manage achievements
    return Abacus.extend( options, {

      id: Abacus.guid(),
      date: Date.now()

    });
  }

  // Express the Player function which is used by addPlayer
  // to add a player to Abacus
  function Player( options ) {
    // Create a temporary variable to hold the player
    // wich is an extension of arbitrary options passed in and
    // the props we need to manage players
    var player = Abacus.extend( options, {
      id: Abacus.guid(),
      achievements: [],
      addAchievement: function( options ) {

        options = options || {};
        
        // Create a new achievement
        var achievement = new Achievement( options );

        // Add the achievement to the current player
        this.achievements.push( achievement );
        // Return the current player
        return this;
      }
    });

    // Push the player onto Abacus.players
    Abacus.players.push( player );

    // Return the player
    return player;
  }

  // Nice sugar to create a new player
  Abacus.player = {
    add: function( options ) {
      options = options || {};
      return new Player( options );
    }
  };
})( this, this.Abacus );