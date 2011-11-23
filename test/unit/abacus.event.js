module('Event');
test('Test that Abacus.event APIs exist', 4, function() {
  ok( Abacus.event, 'Abacus.event exists' );
  ok( Abacus.event.bind, 'Abacus.event.bind exists' );
  ok( Abacus.event.unbind, 'Abacus.event.unbind exists' );
  ok( Abacus.event.trigger, 'Abacus.event.trigger exists' );
});

test('Test that Abacus.event APIs return themsevles', 3, function() {

  var obj = Abacus.extend( {}, Abacus.event)

  
  equal( obj.bind(), obj, 'Abacus.event returns an instance of its parent' );
  equal( obj.unbind(), obj, 'Abacus.event.unbind returns an instance of its parent' );
  equal( obj.trigger(), obj, 'Abacus.event.trigger returns an instance of its parent' );
});

test('Test that Abacus.event APIs call relevant callbacks on a global basis', 2, function() {

  var testObj = {}
  Abacus.event.bind( 'a', function(){ Abacus.event['testprop'] = 'a' } );
  Abacus.event.trigger( 'a' );

  equal( Abacus.event.trigger('a').testprop, 'a', 'Abacus.event.bind and Abacus.event.trigger work globally' );

  Abacus.event.unbind('a')
  Abacus.event.bind('a', function(){ Abacus.event['testproptwo'] = 'b' });
  Abacus.event.trigger( 'a' );

  equal( Abacus.event.testproptwo, 'b', 'Abacus.event.unbind unbound the callbacks correctly' );
});

test('Test that Abacus.event APIs call relevant callbacks on an instance basis', 5, function() {

  var myfn = function(){ obj['testpropthree'] = 'this shouldnt happen' },
    obj = Abacus.extend( {}, Abacus.event);
  
  obj.bind('a', function(){ obj[''] = 'a' });
  obj.bind('b', function(){ obj['testprop'] = 'b' });
  obj.bind('c', function(){ obj['testprop'] = 'c' });
  obj.bind('d', function(){ obj['testprop'] = 'd' });
  obj.bind('d', myfn);

  equal( obj.trigger('a').testprop, 'a', 'Abacus.extend( {}, Abacus.event) bind and trigger works on one channel for this instance');
  equal( obj.trigger('b').testprop, 'b', 'Abacus.extend( {}, Abacus.event) bind and trigger works on two channels for this instance');
  equal( obj.trigger('c').testprop, 'c', 'Abacus.extend( {}, Abacus.event) bind and trigger works on three channels for this instance');
  equal( obj.unbind('d', myfn).trigger('d').testpropthree, undefined, 'Abacus.extend( {}, Abacus.event) unbind named function works');
  
  obj.unbind('a')
  obj.bind('a', function(){ Abacus.event['testproptwo'] = 'b' });
  obj.trigger( 'a' );
  
  equal( obj.trigger('c').testproptwo, 'b', 'Abacus.extend( {}, Abacus.event).unbind, and rebind and trigger works' );
  
  
  
});