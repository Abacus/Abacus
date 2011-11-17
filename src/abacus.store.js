(function( window, Abacus ) {

  Abacus.store = function ( options ) {
  
    this.get = function( key ){
      return localStorage.getItem( value );
    }

    this.set = function( key, value ){
      localStorage.setItem( key, value );
    };
  
  }

})( this, this.Abacus );
