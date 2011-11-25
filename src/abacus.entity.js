(function( window, Abacus ) {

  var entities = {};

  // Express the Entity function
  function Entity( options ) {

    var hooks;

    // If no options.type, default to player
    options.type = options.type || 'player';

    // If no options.id, provide default
    options.id = options.id || Abacus.guid();

    hooks = Entity.hooks[ options.type ] || {};

    // Extend a reasonable set of defaults with
    // any hooks that may exist, with the
    // options argument onto fresh target object
    this.attributes = Abacus.extend({}, hooks, options );
  }

  // Setup the Entity prototype with methods for opperating
  // on entity instances
  Entity.prototype = {
    // Serialize the entity
    toJSON: function() {
      return JSON.stringify( this.attributes );
    },
    // Get the value of an entity's property.
    get: function( prop ) {
      return this.attributes[ prop ];
    },
    // Returns `true` if the property contains a value that is not null
    // or undefined.
    has: function( prop ) {
      // Use native syntax or raw speed
      return typeof this.attributes[ prop ] !== 'undefined';
    },
    // Set a property on an entity's attributes
    set: function( prop, value ) {

      // Check arg type and set accordingly
      if ( typeof prop === 'object' ) {
        // Directly extend `this.attributes` if `prop` arg is an
        // object argument of key/vals
        Abacus.extend( this.attributes, prop );
      } else {
        this.attributes[ prop ] = value;
      }

      return this;
    },
    // Remove a property from the entity
    unset: function( prop ) {
      delete this.attributes[prop];
      return this;
    }
  };

  // Special methods and data to extend specific types
  Entity.hooks = {
    // type: { methods }
    player: {
      achievements: []
    }
  };

  Abacus.entity = function( options ) {
    // Ensure that id duplication is prohibited
    if ( options.id && entities[ options.id ] ) {
      throw new Error( 'Cannot create entity; id in use: ' + options.id );
    }

    // Create new Entity instance
    var entity = new Entity( options );

    // Cache entity reference in memory
    entities[ options.id ] = entity;

    // Return new entity
    return entity;
  };

  // Allow for custom hooks
  Abacus.entity.hooks = Entity.hooks;

  // Attach static functions

  // Returns instances from cache by id
  Abacus.entity.get = function( id ) {
    return id ? entities[ id ] : entities;
  };

  // Removes all instances from cache
  Abacus.entity.flush = function() {
    entities = [];
  };
  
  Abacus.entity.entities = entities;

})( this, this.Abacus );