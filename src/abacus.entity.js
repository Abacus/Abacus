(function( window, Abacus ) {
  // Setup a players cache
  // Eventually this should pull from something like
  // Abacus.store.players

  // Express the Achievement function which will be used by
  // player.addAchievement to add an achievement to a player
  function Achievement( options ) {
    // Return the achievement
    // wich is an extension of arbitrary options passed in and
    // the props we need to manage achievements
    return Abacus.extend({

      id: Abacus.guid(),
      date: Date.now()

    }, options);
  }

  // Express the Player function which is used by addPlayer
  // to add a player to Abacus
  function Entity() {};
  Entity.prototype = {
    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute : 'id',
    addAchievement: function( options ) {

      options = options || {};
      
      // Create a new achievement
      var achievement = new Achievement( options );

      // Add the achievement to the current entity
      this.attributes.achievements.push( achievement );
      // Return the current entity
      return this;
    },
    // Serialize the entity
    toJSON : function() {
      return JSON.stringify( this.attributes );
    },
    // Get the value of an entity's property.
    get : function( prop ) {
      return this.attributes[prop];
    },
    // Returns `true` if the property contains a value that is not null
    // or undefined.
    has : function( prop ) {
      return this.attributes[prop] != null;
    },
    // Set a property on an entity's attributes
    set : function( prop ) {
      this.attributes[prop] = prop;
      return this;
    },
    // Remove a property from the entity
    unset : function( prop ) {
      delete this.attributes[prop];
      return this;
    }
  }

  // Nice sugar to create a new player
  Abacus.entity = {
    entities: [],
    create: function( options ) {
      options = options || {};
      var entity = new Entity();
      
      entity.attributes = Abacus.extend({
        id: Abacus.guid(),
        cid: '',
        type: 'player',
        achievements: [],
      }, options);
      
      return entity;
    },
    get: function( id ) {
      
    },
    set: function( id ) {
      
    },
    delete: function( id ) {
      
    }    
  };
})( this, this.Abacus );

