module('Animation');

test('identity api exists', 2, function() {
  ok( Abacus.addPlayer, 'addPlayer exists' );
  ok( Abacus.players, 'players exists' );
});

test('addPlayer constructs a player correctly', 4, function() {
  var boaz = Abacus.addPlayer({name: 'boaz'});

  equal( typeof boaz.achievements, 'object', 'achievements exists on player and is an object' )
  equal( typeof boaz.addAchievement, 'function' , 'addAchievements exists on player and is a function' )
  equal( boaz.id.length, 36, 'id exists on player and is 36 characters long' )
  ok( boaz.name, 'the name property was properly merged onto the player object' )
});

test('addAcheivemnt constructs an acheivement properly and stores it on a player', 4, function() {
  var boaz = Abacus.addPlayer({name: 'boaz'});                                    

  boaz.addAchievement({ points: 10 })

  ok( boaz.achievements[0], 'achievement exist' )
  ok( boaz.achievements[0].date, 'achievement has date property' )
  equal( boaz.achievements[0].id.length, 36, 'achievement has an id property that is 36 characters long' )
  equal( boaz.achievements[0].points, 10, 'achievement has points property that has been properddly merged on' )
 
});


