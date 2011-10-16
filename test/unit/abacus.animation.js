module('Animation');

test('animation defined functions exists', 3, function() {
  ok(Abacus.animation, 'animation exists');
  ok(Abacus.animationLayer, 'animationLayer exists');
  ok(Abacus.animationFrame, 'animationFrame exists');
});

test('layer.step updates values', 2, function() {
  var position = [0, 0],
      layer = Abacus.animationLayer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: [0, 0]
      }).addFrame({
        index: 10,
        value: [1, 1]
      });
  
  layer.step({rate: 5}, position, {sinceStart: 1});
  
  equal(position[0], 0.5);
  equal(position[1], 0.5);
});

test('layer.step moves to correct frame', 1, function() {
  var obj = {'a': 0},
      layer = Abacus.animationLayer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: {'a': 0}
      }).addFrame({
        index: 5,
        value: {'a': 1}
      }).addFrame({
        index: 10,
        value: {'a': 2}
      });
  
  layer.step({rate: 5}, obj, {sinceStart: 1.5});
  
  equal(obj.a, 1.5);
});

test('layer.step returns false after completion', function() {
  var layer = Abacus.animationLayer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: []
      }).addFrame({
        index: 10,
        value: []
      });
  
  ok(!layer.step({rate: 5}, [], {sinceStart: 3}));
  ok(!layer.step({rate: 5}, [], {sinceStart: 4}));
});

test('layer.step calls beforeTween and afterTween', 2, function() {
  var layer = Abacus.animationLayer({
    tween: 'linear'
  }).addFrame({
    index: 10,
    value: [],
    beforeTween: function() {
      ok(true, 'before');
    },
    afterTween: function() {
      ok(true, 'and after');
    }
  });
  
  layer.step({rate: 5}, [], {sinceStart: 3});
  layer.step({rate: 5}, [], {sinceStart: 4});
});
