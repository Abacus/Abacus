(function( window, Abacus ) {

  // Abacus store API for storing arbitrary objects
  // Store defaults to using localStorage
  // Overwrite these methods to introduce your own persistance layer
  // TODO: introduce strategy for different Abacus entities to persist
  // at different endpoints
  Abacus.store = {
    storageId: 'Abacus',
    _cache: {},
    save: function() {
      // Make sure the cache is up to date
      this._cache = JSON.parse( window.localStorage.getItem( this.storageId ) ) || {};

      // If this is an entity
      if ( this.get ) {
        // Put the entity in the cache
        this._cache[ this.get('id') ] = this.attributes;
        
      // Otherwise, we are being called from Abacus.store.save()
      } else {
        // Loop over all the entities and put them in the _cache
        for( var i in Abacus.entity.entities ) {
          this._cache[ Abacus.entity.entities[ i ].get('id') ] = Abacus.entity.entities[ i ].attributes;
        }
        
      }

      // Serialize the _cache and put it in local storage
      window.localStorage.setItem( this.storageId, JSON.stringify( this._cache ) );

    },
    read: function() {
      // Make sure the cache is up to date
      this._cache = JSON.parse( window.localStorage.getItem( this.storageId ) ) || {};

      // If this is an entity
      if ( this.get ) {
        // Return the entity's state
        return this._cache[ this.get('id') ]

      // Otherwise, we are being called from Abacus.store.read()
      } else {
        // Return the entire _cache
        return this._cache;
      }
    },
    destroy: function() {

      // If this is an entity
      if ( this.get ) {
        // Delete the current entity from the cache
        delete this._cache[ this._id() ];

      // Otherwise, we are being called from Abacus.store.save()
      } else {
        // Empty the cache
        this._cache = {};
      }

      window.localStorage.removeItem( this.storageId );
    }
  };

})( this, this.Abacus );