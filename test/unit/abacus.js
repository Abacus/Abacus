module('Abacus Core');
test('Test that the Abacus object exists', 1, function() {
  ok( Abacus, 'Abacus exists' );
});

test('Test that abacus.guid exists and returns a 36 carachter string', 2, function() {
  equal( typeof Abacus.guid, 'function', 'Abacus.guid exists and is a function' );
  equal( Abacus.guid().length, 36, 'Abacus.guid() returns a 36 charachter string' )
});
