module('Store');
test('Test that the Abacus.store and its methods exists', 6, function() {
  ok( Abacus.store, 'Abacus.store exists' );
  ok( Abacus.store.storageId, 'Abacus.store.storageId exists' );
  ok( Abacus.store._cache, 'Abacus.store._cache exists' );
  ok( Abacus.store.read, 'Abacus.store.read exists' );
  ok( Abacus.store.save, 'Abacus.store.save exists' );
  ok( Abacus.store.destroy, 'Abacus.store.destroy exists' );
});

test('Test the Abacus.store methods', 4, function() {
  
  // Clear out local storage to make sure 
  // we get consistant results
  Abacus.store.destroy()

  boaz = Abacus.entity({ name: 'boaz', age: 25 });
  pete = Abacus.entity({ name: 'pete', age: 28 });
  irene = Abacus.entity({ name: 'irene', age: 26 });
  
  Abacus.extend( boaz, Abacus.store );
  Abacus.extend( pete, Abacus.store );
  Abacus.extend( irene, Abacus.store );

  equal( typeof Abacus.store.read(), 'object', 'Abacus.store.read returns an object' );

});