(function( window, Abacus ) {

  function Store(){};

  Abacus.store = {
  
    get: function( key ){
      return localStorage.getItem( key );
    },
    set: function( key, value ){
      localStorage.setItem( key, value );
    }
  
  }


})( this, this.Abacus );
