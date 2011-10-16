(function( window ) {

  var types = {
    // index - value between 0 and 1 inclusive
    'linear': function( start, stop, index ) {
      return ( stop - start ) * index + start;
    }
  };

  function Tween( options ) {

    options = options || {};

    var tweenFunction;

    this.index = options.index || 0;
    this.start = options.start || 0;
    this.stop = options.stop || 0;

    function chooseTweenFunction( tween ) {
      if ( tween ) {
        var tweenParamType = typeof( tween );
        if ( tweenParamType === 'string' ) {
          tweenFunction = types[ tween ] || function() {};
        }
        else if ( tweenParamType === 'function' ) {
          tweenFunction = tween;
        }
        else {
          tweenFunction = function(){};
        }
      }
      else {
        tweenFunction = function(){};
      }
    } //chooseTweenFunction

    this.get = function( preferredIndex ) {
      this.index = preferredIndex || this.index;
      return tweenFunction( this.start, this.stop, this.index );
    }; //step

    Object.defineProperty( this, 'type', {
      get: function() {
        return tweenFunction;
      },
      set: function( val ) {
        chooseTweenFunction( val );
      }
    });

    chooseTweenFunction( options.type );

  } //Tween

  window.Abacus.tween = function( options ) {
    return new Tween( options );
  };

})( this );
