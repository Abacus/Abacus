(function( window, Abacus ) {

  // Local cache for Abacus
  var abacusCache = {};

  // Abacus store API for storing arbitrary objects
  // Store defaults to using localStorage
  // Overwrite these methods to introduce your own persistance layer
  // TODO: introduce strategy for different Abacus entities to persist
  // at different endpoints
  Abacus.store = {
    create: function( id, value ){
      abacusCache[ id ] = value;
      window.localStorage.setItem( 'Abacus', JSON.stringify( abacusCache ) );
      return this;
    },
    read: function( id ){
      var abacusCache = JSON.parse( window.localStorage.getItem( 'Abacus') );      
      return abacusCache[ id ];
    },
    update: function( id, value ){
      Abacus.extend( abacusCache[ id ], value );
      window.localStorage.setItem( 'Abacus', JSON.stringify( abacusCache ) );      
      return this;
    },
    destroy: function( id ){
      delete abacusCache[ id ];
      window.localStorage.setItem( 'Abacus', JSON.stringify( abacusCache ) );
      return this;
    },
    readAll: function() {
      return JSON.parse( window.localStorage.getItem( 'Abacus') );      
    }
  };
})( this, this.Abacus );