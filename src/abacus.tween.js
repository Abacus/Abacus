(function( window ) {

  var types = {
    // index - value between 0 and 1 inclusive
    'linear': function( start, stop, index ) {
      return ( stop - start ) * index + start;
    }
  };

  function tweenFn( tween ) {
    var type;

    if ( tween ) {

      type = typeof tween;

      // If tween is a string, return correct tweening method
      // from stored tweening methods by type name
      if ( type === 'string' ) {
        return types[ tween ] || Abacus.noop;
      }

      // If type is a function, return as is
      if ( type === 'function' ) {
        return tween;
      }
    }
    return Abacus.noop;
  }


  function Tween( options ) {

    options = options || {};

    this.index = options.index || 0;
    this.start = options.start || 0;
    this.stop = options.stop || 0;

    var tweening = tweenFn( options.type );

    this.get = function( preferredIndex ) {
      this.index = preferredIndex || this.index;
      return tweening( this.start, this.stop, this.index );
    }; //step

    Object.defineProperty( this, 'type', {
      get: function() {
        return tweening;
      },
      set: function( val ) {
        tweenFn( val );
      }
    });
  } //Tween

  window.Abacus.tween = function( options ) {
    return new Tween( options );
  };

})( this );
