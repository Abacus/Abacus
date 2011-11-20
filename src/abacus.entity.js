(function( window, Abacus ) {
  
  var entities = {};
  
  // Express the Entity function
  function Entity() {}
  // Setup the Entity prototype with methods for opperating
  // on entity instances
  Entity.prototype = {
    attributes: {
      id: Abacus.guid(),
      cid: '',
      type: 'player',
      achievements: []
    },
    addAchievement: function( options ) {
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
    toJSON: function() {
      return JSON.stringify( this.attributes );
    },
    // Get the value of an entity's property.
    get: function( prop ) {
      return this.attributes[prop];
    },
    // Returns `true` if the property contains a value that is not null
    // or undefined.
    has: function( prop ) {
      return this.attributes[prop] != null;
    },
    // Set a property on an entity's attributes
    set: function( prop, value ) {
      this.attributes[ prop ] = value;
      return this;
    },
    // Remove a property from the entity
    unset: function( prop ) {
      delete this.attributes[prop];
      return this;
    }
  };

  // Nice sugar to create a new player
  Abacus.entity = {
    create: function( options ) {
      options = options || {};
      var entity = new Entity();
      Abacus.extend( new Entity().attributes, options )
      entities[ entity.get('id') ] = entity;
      
      return entity;
    },
    get: function( id ) {
      return entities[ id ];
    }
  };
})( this, this.Abacus );