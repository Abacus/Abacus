module('Entity');

test('Abacus.entity() exists and is a function', 2, function() {
  ok( Abacus.entity, 'Abacus.entity exists' );
	equal( typeof Abacus.entity, 'function', 'Abacus.entity is a function' );
});

test('Abacus.entity() creates entities', 4, function() {

  var attributes = { name: 'player', type: 'enemy', id: 'asd' },
			player = Abacus.entity(attributes);

	ok( player, 'Abacus.entity({}) does not return null/undefined' );

	Object.keys( attributes ).forEach(function( key ) {
		equal( player.get( key ), attributes[ key ], 'Instance has correct value per key' );
	});
});

test('Abacus.entity constructs a player correctly', 18, function() {
  var player = Abacus.entity({ name: 'player' });

  equal( typeof player.attributes.achievements, 'object', 'achievements exists on player and is an object' );
  equal( typeof player.get, 'function', 'get exists on player and is a function' );
  equal( typeof player.has, 'function', 'has exists on player and is a function' );
  equal( typeof player.set, 'function', 'set exists on player and is a function' );
  equal( typeof player.toJSON, 'function', 'toJSON exists on player and is a function' );
  equal( typeof player.unset, 'function', 'unset exists on player and is a function' );
  equal( player.attributes.id.length, 36, 'id exists on player and is 36 characters long' );
  ok( player.attributes.name, 'the name property was properly merged onto the player object' );

  equal( player.get('name'), 'player', 'Test get method to return correct value' );
  equal( player.get('id').length, 36, 'test that get id returns a 36 char string' );
  equal( player.has('name'), true, 'check that has method returns true for prop that is expected to exist' );
  equal( player.set('foo', 'bar').get('foo'), 'bar', 'check that setting foo as bar and then getting foo returns bar' );
  equal( player.has('foo'), true, 'check that has foo is true' );
  equal( player.get('foo'), 'bar', 'check that get foo returns bar' );
  equal( player.unset('foo').has('foo'), false, 'check that unset foo and then has foo is false' );
  equal( player.has('foo'), false, 'check that has foo is false' );
  equal( typeof player.toJSON(), 'string', 'check that toJSON returns a string' );

	deepEqual( JSON.parse( player.toJSON() ), player.attributes, 'JSON roundstrip' );
});