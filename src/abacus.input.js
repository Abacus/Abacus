(function( window, Abacus ) {

  // Wait until the DOM is loaded
	document.addEventListener('DOMContentLoaded', function(){

		// Create an inputs object on Abacus
		Abacus.inputs = {
			state: function ( keyCode, state ){

        if ( arguments.length > 1 ) {
				
				  this[ Abacus.inputsMap[ keyCode ] ] = state;
          
					//console.log(this[ Abacus.inputs[ keyCode ] ], Abacus.inputs[ keyCode ], keyCode, this )

        } else {

					return this[ Abacus.inputsLookup[ keyCode ] ] ;
				
				}
			}
		};
		
		Abacus.inputsLookup = {}; // int -> string

		// Loop over the inputsMap (hoisted from below) 
    for( var i in Abacus.inputsMap ) {

      // Put each of it's values on the inputsLookup object
      Abacus.inputsLookup[ Abacus.inputsMap[ i ] ] = i;

      // Create an inActive key for each of the input on the input obj
      Abacus.inputs[ i ] = 'inActive';
      
			// Put each of it's keys on the inputs object
			// Abacus.inputs.state( i , 'inActive' );
    }

	  document.addEventListener('keydown', function( e ){
			Abacus.inputs.state( e.keyCode, 'active')

			console.log(e.keyCode, Abacus.inputs.state( Abacus.inputsLookup[ e.keyCode ] ) )
		}, false);

    document.addEventListener('keyup', function( e ){
			Abacus.inputs.state( e.keyCode, 'inActive' );
		}, false);

  }, false);
 
	Abacus.inputsMap = {
  	'backspace': 8,
		'tab': 9,
		'enter': 13,
		'shift': 16,
		'ctrl': 17,
		'alt': 18,
		'pause/break': 19,
		'caps lock': 20,
		'escape': 27,
		'page up': 33,
		'page down': 34,
		'end': 35,
		'home': 36,
		'left arrow': 37,
		'up arrow': 38,
		'right arrow': 39,
		'down arrow': 40,
		'insert': 45,
		'delete': 46,
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57,
		'a': 65,
		'b': 66,
		'c': 67,
		'd': 68,
		'e': 69,
		'f': 70,
		'g': 71,
		'h': 72,
		'i': 73,
		'j': 74,
		'k': 75,
		'l': 76,
		'm': 77,
		'n': 78,
		'o': 79,
		'p': 80,
		'q': 81,
		'r': 82,
		's': 83,
		't': 84,
		'u': 85,
		'v': 86,
		'w': 87,
		'x': 88,
		'y': 89,
		'z': 90,
		'left window key': 91,
		'right window key': 92,
		'select key': 93,
		'numpad 0': 96,
		'numpad 1': 97,
		'numpad 2': 98,
		'numpad 3': 99,
		'numpad 4': 100,
		'numpad 5': 101,
		'numpad 6': 102,
		'numpad 7': 103,
		'numpad 8': 104,
		'numpad 9': 105,
		'multiply': 106,
		'add': 107,
		'subtract': 109,
		'decimal point': 110,
		'divide': 111,
		'f1': 112,
		'f2': 113,
		'f3': 114,
		'f4': 115,
		'f5': 116,
		'f6': 117,
		'f7': 118,
		'f8': 119,
		'f9': 120,
		'f10': 121,
		'f11': 122,
		'f12': 123,
		'num lock': 144,
		'scroll lock': 145,
		'semi-colon': 186,
		'equal sign': 187,
		'comma': 188,
		'dash': 189,
		'period': 190,
		'forward slash': 191,
		'grave accent': 192,
		'open bracket': 219,
		'back slash': 220,
		'close braket': 221,
		'single quote': 222
	};
	

})( this, this.Abacus );

