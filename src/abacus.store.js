(function( window, Abacus ) {

  // Abacus store API for storing arbitrary objects
  // Store defaults to using localStorage
  // Overwrite these methods to introduce your own persistance layer
  // TODO: introduce strategy for different Abacus entities to persist
  // at different endpoints
  Abacus.store = function( id, value) {
    this._id = 'Abacus';
    this._cache = JSON.parse( window.localStorage.getItem( ( this.get ? this.get('id') : this._id ) ) ) || {};
    
    console.log( this._cache )
    
    // If there is an id and a value
    // then we are setting
    if ( id && value ) {
      this._cache[ id ] = value;

    // If there is just an id then we are getting
    } else if ( id ){      
      return this._cache[ id ];

    // Otherwise, we are reading all props
    } else {
      return JSON.parse( window.localStorage.getItem( ( this.get ? this.get('id') : this._id ) ) );

    }

    window.localStorage.setItem( ( this.get ? this.get('id') : this._id ), JSON.stringify( this._cache ) );
    return this;
  };
  
  // Define a destroy method
  Abacus.store.destroy = function( id ) {
    delete this._cache[ id ];
  };

})( this, this.Abacus );