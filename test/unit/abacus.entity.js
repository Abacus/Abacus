module('Animation');

test('identity api exists', 2, function() {
  ok( Abacus.entity.create, 'addPlayer exists' );
  ok( Abacus.entity, 'players exists' );
});

test('addPlayer constructs a player correctly', 4, function() {
  var boaz = Abacus.entity.create({name: 'boaz'});

  equal( typeof boaz.attributes.achievements, 'object', 'achievements exists on player and is an object' )
  equal( typeof boaz.addAchievement, 'function' , 'addAchievements exists on player and is a function' )
  equal( boaz.attributes.id.length, 36, 'id exists on player and is 36 characters long' )
  ok( boaz.attributes.name, 'the name property was properly merged onto the player object' )
});

test('addAcheivemnt constructs an acheivement properly and stores it on a player', 4, function() {
  var boaz = Abacus.entity.create({name: 'boaz'});                                    

  boaz.addAchievement({ points: 10 })

  ok( boaz.attributes.achievements[0], 'achievement exist' )
  ok( boaz.attributes.achievements[0].date, 'achievement has date property' )
  equal( boaz.attributes.achievements[0].id.length, 36, 'achievement has an id property that is 36 characters long' )
  equal( boaz.attributes.achievements[0].points, 10, 'achievement has points property that has been properddly merged on' )
 
});


