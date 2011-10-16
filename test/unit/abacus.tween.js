module('Tween Module');
test('Test that the Abacus.tween exists', 1, function() {
  ok( Abacus.tween, 'Abacus.tween exists' );
});

test('Tween instances have step method', 1, function() {
  var tween = Abacus.tween();
  equal( typeof tween.get, 'function', 'the tween instance has a get method' );
});

test('Linear Tween is correct', 3, function() {
  var tween = Abacus.tween({
    type: "linear",
    start: 6,
    stop: 8
  });

  equal( tween.get( 0 ), 6, 'get(0) is correct' );
  equal( tween.get( 1 ), 8, 'get(1) is correct' );
  equal( tween.get( .5 ), 7, 'get(.5) is correct' );
});


