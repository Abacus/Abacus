(function ( window, Abacus ) {
  Abacus.event = {
    _callbacks: {},
    bind: function ( name, callback ) {
      if ( !this._callbacks[ name ]  ) {
        this._callbacks[ name ] = [];
      }
      this._callbacks[ name ].push ( callback  ) ;
      return this;
    },
    unbind: function ( name, callback ) {
      if ( !name ) {
        // If no name is passed, unbind all callbacks
        this._callbacks = {};
      } else if ( !callback ) {
        // If a name is passed, but no callback,
        // unbind all callbacks for that name
        this._callbacks[ name ] = [];
      } else {
        var callbacks = _callbacks[ name ];
        for (var i = 0, c = callbacks.length; i < c; i++ ) {
          if ( callbacks[ i ] && callback === callbacks[ i ][ 0 ] ) {
            callbacks[ i ] = null;
            break;
          }
        }
      }
      return this;
    },
    trigger: function ( name ) {
      if ( this._callbacks[ name ] ) {
        this._callbacks[ name ].forEach(function( element, index, array ) {
          element();
        });
      }
      return this;
    }
  };
})( this, this.Abacus  );