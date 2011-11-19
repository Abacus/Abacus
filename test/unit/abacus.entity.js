module('Animation');

test('entity api exists and works properly', 7, function() {
  ok( Abacus.entity, 'entity exists' );
  ok( Abacus.entity.entities, 'entity.entities exists' );
  ok( Abacus.entity.create, 'entity.create exists' );
  ok( Abacus.entity.get, 'entity.get exists' );
  ok( Abacus.entity.set, 'entity.set exists' );
  ok( Abacus.entity.destroy, 'entity.destroy exists' );
  
  var boaz = Abacus.entity.create({name: 'boaz', type: 'enemy', id: 'asd'})

  equal( Abacus.entity.get('asd').get('name'), 'boaz', 'getting an entity by id, and accessing its custom name prop returns the right name val');
});

test('Abacus.entity.create constructs a player correctly', 18, function() {
  var boaz = Abacus.entity.create({name: 'boaz'});

  equal( typeof boaz.attributes.achievements, 'object', 'achievements exists on player and is an object' );
  equal( typeof boaz.addAchievement, 'function', 'addAchievements exists on player and is a function' );
  equal( typeof boaz.get, 'function', 'get exists on player and is a function' );
  equal( typeof boaz.has, 'function', 'has exists on player and is a function' );
  equal( typeof boaz.set, 'function', 'set exists on player and is a function' );
  equal( typeof boaz.toJSON, 'function', 'toJSON exists on player and is a function' );
  equal( typeof boaz.unset, 'function', 'unset exists on player and is a function' );
  equal( boaz.attributes.id.length, 36, 'id exists on player and is 36 characters long' );
  ok( boaz.attributes.name, 'the name property was properly merged onto the player object' );
  
  equal( boaz.get('name'), 'boaz', 'Test get method to return correct value' );
  equal( boaz.get('id').length, 36, 'test that get id returns a 36 char string' );
  equal( boaz.has('name'), true, 'check that has method returns true for prop that is expected to exist' );
  equal( boaz.set('foo', 'bar').get('foo'), 'bar', 'check that setting foo as bar and then getting foo returns bar' );
  equal( boaz.has('foo'), true, 'check that has foo is true' );
  equal( boaz.get('foo'), 'bar', 'check that get foo returns bar' );
  equal( boaz.unset('foo').has('foo'), false, 'check that unset foo and then has foo is false' );
  equal( boaz.has('foo'), false, 'check that has foo is false' );
  equal( boaz.toJSON().length, 102, 'check that toJSON returns a string with the expected length' );
  
});

test('addAcheivemnt constructs an acheivement properly and stores it on a player', 4, function() {
  var boaz = Abacus.entity.create({name: 'boaz'});                                    

  boaz.addAchievement({ points: 10 })

  ok( boaz.attributes.achievements[0], 'achievement exist' )
  ok( boaz.attributes.achievements[0].date, 'achievement has date property' )
  equal( boaz.attributes.achievements[0].id.length, 36, 'achievement has an id property that is 36 characters long' )
  equal( boaz.attributes.achievements[0].points, 10, 'achievement has points property that has been properddly merged on' )
 
});


