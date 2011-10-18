module('Animation');

test('animation defined functions exists', 3, function() {
  ok( Abacus.animation, 'animation exists' );
  ok( Abacus.animation.layer, 'animation.layer exists' );
  ok( Abacus.animation.frame, 'animation.frame exists' );
});

test('layer.step updates values', 2, function() {
  var position = [0, 0],
      layer = Abacus.animation.layer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: [0, 0]
      }).addFrame({
        index: 10,
        value: [1, 1]
      });

  layer.step({rate: 5}, position, {sinceStart: 1000});

  equal(position[0], 0.5);
  equal(position[1], 0.5);
});

test('layer.step moves to correct frame', 1, function() {
  var obj = {'a': 0},
      layer = Abacus.animation.layer({
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

  layer.step({rate: 5}, obj, {sinceStart: 1500});

  equal(obj.a, 1.5);
});

test('layer.step returns false after completion', function() {
  var layer = Abacus.animation.layer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: []
      }).addFrame({
        index: 10,
        value: []
      });

  ok(!layer.step({rate: 5}, [], {sinceStart: 3000}));
  ok(!layer.step({rate: 5}, [], {sinceStart: 4000}));
});

test('layer.step calls beforeTween and afterTween', 2, function() {
  var layer = Abacus.animation.layer({
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

  layer.step({rate: 5}, [], {sinceStart: 3000});
  layer.step({rate: 5}, [], {sinceStart: 4000});
});

asyncTest('animation stops timer after completion', 3, function() {
  var timePlayed = 0,
      animation = Abacus.animation({
        rate: 60,
        tween: 'linear'
      });

  animation.layer().addFrame({
    index: 0,
    value: []
  }).addFrame({
    index: 10,
    value: [],
    afterTween: function() {
      timePlayed = animation.timer.timing.sinceStart;
    }
  });

  animation.start([]);

  setTimeout(function() {
    ok(timePlayed > 1000/6, 'timePlayed (' + timePlayed + ') > ' + Math.floor(1000/6));
    equal(animation.layers[0].frameIndex, 1, 'reached end of frames');
    ok(animation.timer.isPaused);
    if (!animation.timer.isPaused) {
      animation.timer.pause();
    }
    start();
  }, 300);
});

test('layer works with typed arrays', 7, function() {
  ok(window.Float32Array, 'browser supports Float32Array');
  
  var floatArray = new Float32Array([0,0]),
      layer = Abacus.animationLayer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: [0, 0]
      }).addFrame({
        index: 10,
        value: [1, 1]
      });
  
  layer.step({rate: 5}, floatArray, {sinceStart: 1000});
  
  ok(floatArray instanceof Float32Array);
  equal(floatArray[0], 0.5);
  equal(floatArray[1], 0.5);
  
  layer = Abacus.animationLayer({
    tween: 'linear'
  }).addFrame({
    index: 0,
    value: new Float32Array([0, 0])
  }).addFrame({
    index: 10,
    value: new Float32Array([1, 1])
  });
  
  layer.step({rate: 5}, floatArray, {sinceStart: 1000});
  
  ok(floatArray instanceof Float32Array);
  equal(floatArray[0], 0.5);
  equal(floatArray[1], 0.5);
});
