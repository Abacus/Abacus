(function( window, Abacus ) {
  
  var abacusCache = {};

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