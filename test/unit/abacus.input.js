module('Timer Module');
test('Test that the Abacus.inputs exists', 1, function() {
  ok( Abacus.inputs, 'Abacus.inputs exists' );
});
 

test('Test that the Abacus.inputs for char code 0 is updating', 1, function() {

  document.addEventListener('keydown', function( e ){

    equal( Abacus.inputs['0'], 'inActive', 'Abacus.inputs["0"] is active' );
    console.log(Abacus.inputs['0'], 'its happening')

  }, false);


var evt = document.createEvent( 'KeyboardEvent' );
evt.initKeyboardEvent( 'keydown', true, false, null, 0, false, 0, false, 65, 0 );
document.dispatchEvent(evt);


});
