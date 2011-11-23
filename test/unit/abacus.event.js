module('Event');
test('Test that Abacus.event APIs exist', 4, function() {
  ok( Abacus.event, 'Abacus.event exists' );
  ok( Abacus.event.bind, 'Abacus.event.bind exists' );
  ok( Abacus.event.unbind, 'Abacus.event.unbind exists' );
  ok( Abacus.event.trigger, 'Abacus.event.trigger exists' );
});