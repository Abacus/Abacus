(function ( window, Abacus ) {
  // Use Abacus.event to dispatch events globally
  // or mix Abacus.event in with Abacus.extend({}, Abacus.event)
  // to use the event system locally on a given oject
  Abacus.event = {
    // Local scoped cache of callbacks
    _callbacks: {},
    
    // Bind a callback to a name for the current scope
    bind: function ( name, callback ) {
      if ( !this._callbacks[ name ]  ) {
        this._callbacks[ name ] = [];
      }
      this._callbacks[ name ].push ( callback  ) ;
      return this;
    },
    
    // Unbind events from the current scope
    // three signatures supported:
    // .unbind(), .unbind( name ), .unbind( name, callback )
    unbind: function ( name, callback ) {
      // If no name is passed, unbind all callbacks
      if ( !name ) {
        this._callbacks = {};

      // If a name is passed, but no callback,
      // unbind all callbacks for that name
      } else if ( !callback ) {
        this._callbacks[ name ] = [];

      // Otherwise run through all the callbacks for that name
      // and unbind the right one
      } else {
        var callbacks = this._callbacks[ name ];
        for (var i = 0, c = callbacks.length; i < c; i++ ) {
          if ( callbacks[ i ] && callback === callbacks[ i ] ) {
            delete callbacks[ i ];
            break;
          }
        }
      }
      return this;
    },
    
    // Trigger an event on the current scope
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