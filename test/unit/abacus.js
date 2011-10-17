module('Core');
test('Test that the Abacus object exists', 1, function() {
  ok( Abacus, 'Abacus exists' );
});

test('Abacus.guid()', 2, function() {
  equal( typeof Abacus.guid, 'function', 'Abacus.guid exists and is a function' );
  equal( Abacus.guid().length, 36, 'Abacus.guid() returns a 36 charachter string' )
});

test('Abacus.clone( obj )', 6, function() {
  var orig = {
        foo: 'bar',
        inner: {
          prop: false,
          array: [ 1, 2, 3, 4, 5 ]
        }
      },
      cloned = Abacus.clone( orig );

  ok( cloned.hasOwnProperty('foo'), 'cloned.hasOwnProperty("foo")' );
  ok( cloned.hasOwnProperty('inner'), 'cloned.hasOwnProperty("inner")' );
  ok( cloned.inner.hasOwnProperty('prop'), 'cloned.inner.hasOwnProperty("prop")' );
  ok( cloned.inner.hasOwnProperty('array'), 'cloned.inner.hasOwnProperty("array")' );

  // Change a value of the original `inner.array`
  cloned.inner.array[0] = 'a';

  notEqual( orig.inner.array[0], cloned.inner.array[0],
    '(notEqual) Changing an array property value of the cloned object doesn\'t effect the original' );

  cloned.foo = 'qux';

  notEqual( orig.foo, cloned.foo,
    '(notEqual) Changing a property value of the cloned object doesn\'t effect the original' );

});

test('Abacus.extend( ... )', 12, function() {

  var obj1 = {
        'key11': 'value',
        'key12': 9001,
        'key13': function() { return true; }
      },
      obj2 = {
        'key21': 'String',
        'key22': 9002,
        'key23': function() { return false; }
      },
      prop, dest;

  dest = Abacus.extend( {}, obj1 );

  for ( prop in obj1 ) {
    equal( dest.hasOwnProperty( prop ), true, '{dest} has property: ' + prop );
  }

  equal( typeof dest[ 'key13' ], 'function', 'dest[key13] is a function' );

  dest = {};

  Abacus.extend( dest, obj1, obj2 );

  for ( prop in obj1 ) {
    equal( dest.hasOwnProperty( prop ), true, '{dest} has property: ' + prop + ', when extending 2 objects' );
  }

  for ( prop in obj2 ) {
    equal( dest.hasOwnProperty( prop ), true, '{dest} has property: ' + prop + ', when extending 2 objects' );
  }

  equal( typeof dest[ 'key13' ], 'function', 'dest[key13] is a function' );
  equal( typeof dest[ 'key23' ], 'function', 'dest[key23] is a function' );
});

test('Abacus.noop()', 2, function() {
  equal( typeof Abacus.noop, 'function', 'Abacus.noop is a function' );
  equal( Abacus.noop(), undefined, 'Abacus.noop() returns undefined' );
});

test('Abacus.identity( arg )', 2, function() {
  equal( typeof Abacus.identity, 'function', 'Abacus.identity is a function' );
  equal( Abacus.identity( Abacus.noop ), Abacus.noop, 'Abacus.identity(Abacus.noop) returns Abacus.noop' );
});

test('Abacus.prefix (ua vendor prefix)', 1, function() {
  equal( typeof Abacus.prefix, 'string', 'Abacus.prefix is a string' );
});
