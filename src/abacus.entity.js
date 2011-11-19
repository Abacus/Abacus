(function( window, Abacus ) {
  // Express the Player function which is used by addPlayer
  // to add a player to Abacus
  function Entity() {}
  Entity.prototype = {
    addAchievement : function( options ) {
      options = options || {};

      // Create a new achievement
      var achievement = Abacus.extend({

        id: Abacus.guid(),
        date: Date.now()

      }, options);

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
    set : function( prop, value ) {
      this.attributes[ prop ] = value;
      return this;
    },
    // Remove a property from the entity
    unset : function( prop ) {
      delete this.attributes[prop];
      return this;
    }
  };

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
        achievements: []
      }, options);
      
      this.entities.push( entity );
      
      return entity;
    },
    get: function( id ) {
      // TODO
    },
    set: function( id ) {
      // TODO
    },
    destroy: function( id ) {
      // TODO
    }    
  };
})( this, this.Abacus );

