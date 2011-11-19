module('Animation');

test('identity api exists', 6, function() {
  ok( Abacus.entity, 'entity exists' );
  ok( Abacus.entity.entities, 'entity.entities exists' );
  ok( Abacus.entity.create, 'entity.create exists' );
  ok( Abacus.entity.get, 'entity.get exists' );
  ok( Abacus.entity.set, 'entity.set exists' );
  ok( Abacus.entity.destroy, 'entity.destroy exists' );
});

test('Abacus.entity.create constructs a player correctly', 9, function() {
  var boaz = Abacus.entity.create({name: 'boaz'});

  equal( typeof boaz.attributes.achievements, 'object', 'achievements exists on player and is an object' )
  equal( typeof boaz.addAchievement, 'function' , 'addAchievements exists on player and is a function' )
  equal( typeof boaz.get, 'function' , 'get exists on player and is a function' )
  equal( typeof boaz.has, 'function' , 'has exists on player and is a function' )
  equal( typeof boaz.set, 'function' , 'set exists on player and is a function' )
  equal( typeof boaz.toJSON, 'function' , 'toJSON exists on player and is a function' )
  equal( typeof boaz.unset, 'function' , 'unset exists on player and is a function' )
  equal( boaz.attributes.id.length, 36, 'id exists on player and is 36 characters long' )
  ok( boaz.attributes.name, 'the name property was properly merged onto the player object' )
  
  // boaz.get('name')
  // boaz.get('id').length
  // boaz.has('name')
});

test('addAcheivemnt constructs an acheivement properly and stores it on a player', 4, function() {
  var boaz = Abacus.entity.create({name: 'boaz'});                                    

  boaz.addAchievement({ points: 10 })

  ok( boaz.attributes.achievements[0], 'achievement exist' )
  ok( boaz.attributes.achievements[0].date, 'achievement has date property' )
  equal( boaz.attributes.achievements[0].id.length, 36, 'achievement has an id property that is 36 characters long' )
  equal( boaz.attributes.achievements[0].points, 10, 'achievement has points property that has been properddly merged on' )
 
});


