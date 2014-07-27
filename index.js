var regInvoker;

(function () {
    'use strict';

    var createObject,
        defineProperty,
        defineProperties,
        freezeObject,
        invoke,
        build,
        createInstance,
        createRegistry,
        closure;

    createObject = Object.create.bind(Object);
    defineProperty = Object.defineProperty.bind(Object);
    defineProperties = Object.defineProperties.bind(Object);
    freezeObject = Object.freeze.bind(Object);
    
    invoke = function invoke(closure) {
        return build(closure);
    };
    
    build = function build(closure, parentInstance, parentRegistry, name) {
        var registry,
            Instance;
        
        registry = parentRegistry
            ? parentRegistry.fork(name)
            : createRegistry();
        
        Instance = createInstance(closure, parentInstance, registry);
        
        return closure(Instance, registry);
    };
    
    createInstance = function createInstance(closure, parentInstance, registry) {
        var childInstances,
            instance,
            registry,
            plugin,
            returnValue;

        childInstances = {};
        instance = {};

        instance.parent = function parent() {
            return parentInstance;
        };

        instance.child = function child(name) {
            return childInstances[name];
        };

        instance.children = function children() {
            return childInstances;
        };

        instance.create = function create() {
            return invoke(closure);
        };

        instance.copy = function copy() {
            return createObject(this);
        };

        instance.fork = function fork(name) {
            var child,
                descriptor,
                returnValue;

            if (name) {
                child = build(closure, this, registry, name);
                
                descriptor = {
                    value: child,
                    enumerable: true
                };

                defineProperty(childInstances, name, descriptor);
            } else {
                child = build(closure, this, registry);
            }

            return child;
        };
        
        return instance;
    };
    
    createRegistry = function createRegistry(parentRegistry) {
        var childRegistries,
            instance,
            registry,
            init,
            has;

        childRegistries = {};
        instance = {};
        registry = {};

        instance.parent = function parent() {
            return parentRegistry;
        };

        instance.child = function child(name) {
            return childRegistries[name];
        };

        instance.children = function children() {
            return childRegistries;
        };

        instance.create = function create() {
            return createRegistry();
        };
        
        instance.copy = function copy() {
            return createObject(this);
        };
        
        instance.fork = function fork(name) {
            var child;

            if (name) {
                child = createRegistry(this);

                defineProperty(childRegistries, name, {
                    value: child,
                    enumerable: true
                });

                return child;
            }
            
            return createRegistry();
        };

        init = instance.init = function init(name, value) {
            var hasValue;

            hasValue = has(name);

            if (!hasValue) {
                registry[name] = value;
            }

            return registry[name];
        };

        has = instance.has = function has(name) {
            return registry.hasOwnProperty(name);
        };

        instance.get = function get(name, defaultValue) {
            var hasValue;

            hasValue = has(name);

            if (hasValue) {
                return registry[name];
            }

            return defaultValue;
        };

        instance.set = function set(name, value) {
            registry[name] = value;

            return this;
        };

        instance.add = function add(name, value) {
            var store;
            
            store = init(name, []);
            store.push(value);

            return store;
        };

        instance.unset = function unset(name) {
            delete registry[name];

            return this;
        };

        return instance;
    };

    closure = function closure(regInvoker) {
        var registry;
    
        defineProperties(regInvoker, {
            registry: {
                get: function get() {
                    return registry = registry || createRegistry();
                },
                enumerable: true
            },
            invoke: {
                value: invoke,
                enumerable: true
            }
        });
        
        return regInvoker;
    };
    
    regInvoker = closure(createInstance(closure));
    
    if (typeof module === 'object' && module.exports !== undefined) {
        module.exports = regInvoker;
    }
}());
