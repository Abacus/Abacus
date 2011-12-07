module('Animation');

test('animation defined functions exists', 3, function() {
  ok( Abacus.animation, 'animation exists' );
  ok( Abacus.animation.layer, 'animation.layer exists' );
  ok( Abacus.animation.frame, 'animation.frame exists' );
});

test('animation methods', 5, function() {
  var animation = Abacus.animation({});
  
  ok( animation.reset, 'animation.reset exists' );
  ok( animation.start, 'animation.start exists' );
  ok( animation.stop, 'animation.stop exists' );
  ok( animation.addLayer, 'animation.addLayer exists' );
  ok( animation.layer, 'animation.layer exists' );
});

test('layer methods', 5, function() {
  var layer = Abacus.animation.layer();
  
  ok( layer.reset, 'layer.reset exists' );
  ok( layer.step, 'layer.step exists' );
  ok( layer.addFrame, 'layer.addFrame exists' );
  ok( layer.removeFrame, 'layer.removeFrame exists' );
  ok( layer.getFrame, 'layer.getFrame exists' );
});

test('animation() fails', 1, function() {
  raises(function() {
    Abacus.animation();
  }, 'animation() cannot be called without options object');
});

test('layer.removeFrame', 8, function() {
  var obj = {'x': 0, 'y': 0},
      layer = Abacus.animation.layer({
        tween: 'linear'
      }),
      fourthFrame = Abacus.animation.frame({
        index: 40,
        value: {'x': 8, 'y': 8}
      });
  
  layer.addFrame({
    index: 0,
    value: {'x': 0, 'y': 0}
  });
  
  layer.addFrame({
    index: 10,
    value: {'x': 1, 'y': 1}
  });
  
  layer.addFrame({
    index: 20,
    value: {'x': 4, 'y': 4}
  });
  
  layer.addFrame( fourthFrame );
  
  layer.step( {rate: 5}, obj, {sinceStart: 1000} );
  
  equal( obj.x, 0.5, 'x value in between first two frames' );
  equal( obj.y, 0.5, 'y value in between first two frames' );
  
  layer.removeFrame( 10 );
  
  layer.step( {rate: 5}, obj, {sinceStart: 1000} );
  
  equal( obj.x, 1, 'x value in between first and third frames (after removal of second frame)' );
  equal( obj.y, 1, 'y value in between first and third frames (after removal of second frame)' );
  
  layer.step( {rate: 5}, obj, {sinceStart: 8000} );
  
  equal( obj.x, 8, 'x value at end of fourth frame' );
  equal( obj.y, 8, 'y value at end of fourth frame' );
  
  layer.removeFrame( fourthFrame );
  
  layer.reset();
  layer.step( {rate: 5}, obj, {sinceStart: 8000} );
  
  equal( obj.x, 4, 'x value at end of third frame (after removal of third)' );
  equal( obj.y, 4, 'y value at end of third frame (after removal of third)' );
});

test('layer sets values after hitting end of last frame', 2, function(){
  var obj = {'x': 0, 'y': 0},
      layer = Abacus.animation.layer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: {'x': 1, 'y': 1}
      });

  layer.step({rate: 5}, obj, {sinceStart: 1000});

  equal( obj.x, 1 );
  equal( obj.y, 1 );
});

test('layer does not set values before first frame (aka non-zero index )', 2, function(){
  var obj = {'x': 0, 'y': 0},
      layer = Abacus.animation.layer({
        tween: 'linear'
      }).addFrame({
        index: 10,
        value: {'x': 1, 'y': 1}
      });

  layer.step({rate: 5}, obj, {sinceStart: 1000});

  notEqual( obj.x, 1 );
  notEqual( obj.y, 1 );
});

asyncTest('animation.stop stops animation', 6, function(){
  var obj = {'x': 0, 'y': 0},
      animation = Abacus.animation({
        rate: 50,
        tween: 'linear'
      }).addLayer(Abacus.animation.layer().addFrame({
        index: 0,
        value: {'x': 0, 'y': 0}
      }).addFrame({
        index: 10,
        value: {'x': 1, 'y': 1}
      })),
      x,
      y;

  animation.start( obj );

  setTimeout(function(){
    animation.stop();

    // not equal to the start of the animation
    notEqual( obj.x, 0 );
    notEqual( obj.y, 0 );

    x = obj.x;
    y = obj.y;

    setTimeout(function(){
      // not equal to the end of the animation
      notEqual( obj.x, 1 );
      notEqual( obj.y, 1 );

      equal( obj.x, x );
      equal( obj.y, y );

      start();
    }, 200);
  }, 100);
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

  equal( position[0], 0.5 );
  equal( position[1], 0.5 );
});

test('layer.step moves to correct frame', 2, function() {
  var obj = { 'x': 0, 'y': 0 },
      layer = Abacus.animation.layer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: {'x': 0, 'y': 0}
      }).addFrame({
        index: 5,
        value: {'x': 1, 'y': 1}
      }).addFrame({
        index: 10,
        value: {'x': 3, 'y': 2}
      });

  layer.step({ rate: 5 }, obj, { sinceStart: 1500 });

  equal( obj.x, 2 );
  equal( obj.y, 1.5 );
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

  ok( !layer.step({ rate: 5 }, [], { sinceStart: 3000 }) );
  ok( !layer.step({ rate: 5 }, [], { sinceStart: 4000 }) );
});

test('layer.step calls beforeTween and afterTween', 2, function() {
  var layer = Abacus.animation.layer({
    tween: 'linear'
  }).addFrame({
    index: 10,
    value: [],
    beforeTween: function() {
      ok( true, 'before' );
    },
    afterTween: function() {
      ok( true, 'and after' );
    }
  });

  layer.step({ rate: 5 }, [], { sinceStart: 3000 });
  layer.step({ rate: 5 }, [], { sinceStart: 4000 });
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
    ok( timePlayed > 1000/6, 'timePlayed (' + timePlayed + ') > ' + Math.floor(1000/6) );
    equal( animation.layers[0].frameIndex, -1, 'auto-reset to start of animatio' );
    ok( animation.timer.isPaused );
    if ( !animation.timer.isPaused ) {
      animation.timer.pause();
    }
    start();
  }, 300);
});

test('deep object animation', 2, function() {
  var obj = {
        x: 0,
        ary: [ 0, 0, 0 ],
        deep: {
          ary: [{x: 0, y: 0}, {x: 0, y: 0}]
        }
      },
      layer = Abacus.animation.layer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: {
          x: 0,
          ary: [ 0, 0, 0 ],
          deep: {
            ary: [{}, {
                x: 0, 
                y: 0
              }]
          }
        }
      }).addFrame({
        index: 10,
        value: {
          x: 6,
          ary: [ 1, 2, 3 ],
          deep: {
            ary: [{}, {
                x: 4, 
                y: 5
              }]
          }
        }
      });

  layer.step({ rate: 5 }, obj, { sinceStart: 2000 });

  equal( obj.x, 6 );

  deepEqual( obj, {
    x: 6,
    ary: [ 1, 2, 3 ],
    deep: {
      ary: [{
          x: 0,
          y: 0
        }, {
          x: 4, 
          y: 5
        }]
    }
  }, 'deep object animation set all appropriate values' );
});

test('layer works with typed arrays', 7, function() {
  ok( window.Float32Array, 'browser supports Float32Array' );

  var floatArray = new Float32Array([0,0]),
      layer = Abacus.animation.layer({
        tween: 'linear'
      }).addFrame({
        index: 0,
        value: [0, 0]
      }).addFrame({
        index: 10,
        value: [1, 1]
      });

  layer.step({ rate: 5 }, floatArray, { sinceStart: 1000 });

  ok( floatArray instanceof Float32Array );
  equal( floatArray[0], 0.5 );
  equal( floatArray[1], 0.5 );

  layer = Abacus.animation.layer({
    tween: 'linear'
  }).addFrame({
    index: 0,
    value: new Float32Array([0, 0])
  }).addFrame({
    index: 10,
    value: new Float32Array([1, 1])
  });

  layer.step({ rate: 5 }, floatArray, { sinceStart: 1000 });

  ok( floatArray instanceof Float32Array );
  equal( floatArray[0], 0.5 );
  equal( floatArray[1], 0.5 );
});

test('animation{instance}.layer throws errors for bad arguments', 2, function() {
  var animation = Abacus.animation({}),
      options = {
        index: 0,
        tween: 'linear'
      };

  raises(function() {
    animation.layer( options );
  }, function( e ) {
    return e.hasOwnProperty('argument') && e.argument == options;
  }, 'exception on specifying options with index of a layer that doesn\'t exist' );

  raises(function() {
    animation.layer(true);
  }, function( e ) {
    return e.hasOwnProperty('argument') && e.argument === true;
  }, 'exception on specifying option as something other than undefined, integer, or object' );
});
