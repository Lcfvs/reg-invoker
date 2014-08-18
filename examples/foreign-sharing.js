var invoker,
    lib,
    createForeignObject,
    instance,
    childInstance;

invoker = require('reg-invoker');

lib = function lib(instance, registry) {
    instance.foreign = registry.share(createForeignObject, registry);
    
    instance.setValue = function setValue(value) {
        registry.set('value', value);
    };
    
    return instance;
};

createForeignObject = function createForeignObject(instance, registry) {
    instance.getValue = registry.get.bind(registry, 'value');
    
    return instance;
};

instance = invoker.invoke(lib);
childInstance = instance.fork('child');

instance.setValue('a instance value');
console.log(instance.foreign.getValue('unknown'));
console.log(instance.child('child').foreign.getValue('unknown'));

childInstance.setValue('a child value');

console.log(instance.child('child').foreign.getValue('unknown'));
console.log(childInstance.foreign.getValue('unknown'));
