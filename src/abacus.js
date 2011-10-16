(function( window ) {

  // Declare initial Abacus object
  // this file should always load first
  var Abacus = {},

  // Localize references to commonly used methods
  slice = [].slice;

  // Declare global Abacus methods

  // Abacus.guid()
  // [Source http://www.broofa.com/2008/09/javascript-uuid-function/]
  // Returns RFC 4122-compliant UUID
  Abacus.guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    }).toUpperCase();
  };

  // Abacus.clone()
  // Returns deep copy of obj
  Abacus.clone = function( obj ) {

    if ( Array.isArray( obj ) ) {
      return slice.call( obj, 0 );
    }

    // Create a new object whose prototype is a new, empty object,
    // Using the second propertiesObject argument to copy the source properties
    return Object.create({}, (function( src ) {

      // Store reference to non-inherited properties,
      // Initialize
      var ownPropertyNames = Object.getOwnPropertyNames( src ),
        properties = {};

      ownPropertyNames.forEach(function( name ) {

        var descriptor = Object.getOwnPropertyDescriptor( src, name ),
          tmp;

        // Recurse on properties whose value is an object or array
        if ( typeof src[ name ] === "object" ) {
          descriptor.value = Abacus.clone( src[ name ] );
        }

        properties[ name ] = descriptor;

      });

      return properties;

    })( obj ));
  };

  // Abacus.extend( dest, [ ... ] )
  // Returns extended destination object
  Abacus.extend = function( dest /* ... */ ) {
    var copy, prop,
        sources = slice.call( arguments, 1 ),
        sourcesLen = sources.length,
        i = 0;

    for ( ; i < sourcesLen; i++ ) {
      copy = Abacus.clone( sources[ i ] );

      for ( prop in copy ) {
        dest[ prop ] = copy[ prop ];
      }
    }

    return dest;
  };

  // Abacus.noop
  // No operation function expression literal
  Abacus.noop = function() {};

  // Abacus.identity( arg )
  // Returns the same value that was used as its argument
  Abacus.identity = function( arg ) {
    return arg;
  };

  // Abacus.prefix
  // This user agent's vendor prefix
  Abacus.prefix = (function( window ) {
    return [ "webkit", "moz", "ms", "o" ].filter(function( val ) {
      return val + "RequestAnimationFrame" in window;
    })[ 0 ] || "";
  })( window );


  // Expose global Abacus object
  window.Abacus = Abacus;

})( this );
