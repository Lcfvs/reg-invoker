Registry invoker
================

**Registry invoker** is a generic **JavaScript** base to manage communications between your instances & offer an internal registry to store & exchange your values.


Install
-------
On Node.js : 
`npm install reg-invoker`

On browsers : 
```
<script src="https://raw.github.com/Lcfvs/reg-invoker/master/reg-invoker.min.js"></script>
```

Usage
-----
```
var regInvoker,
    closure,
    instance;

regInvoker = require('reg-invoker');

closure = function closure(instance, internalRegistry) {
    instance.getInternalRegistry = function getInternalRegistry() {
        return internalRegistry;
    };
    
    instance.publicRegistry = internalRegistry.create();
    
    return instance;
};

instance = regInvoker.invoke(closure);
```

Reference :
-----------
```
regInvoker
    @instance @static: {Object} regInvoker
    @description: a reg-invoker instance
    @see: `instance`
    @method @readonly: {Function} invoke(closure)
        @see: `regInvoker.invoke()`
        
    @property @readonly: {Object} registry
        @description: generated on the fly on first value call
        
        @see: `registry`
```

```
regInvoker.invoke(closure)
    @description: the method that creates a pre-built instance with a
    @description: parents <-> childs communication and an internal registry
    
    @param: {Function} closure
        @see: `closure`
        
    @return: {*} closureValue
        @description: the closure return value
```

```
closure
    @instance: {Function} closure
    @description: the function that receives a pre-built instance and
    @description: the internal registry
    
    @param: {Object} instance
        @see: `instance`
        
    @param: {Object} internalRegistry
        @description: private registry, only known by instance and
        @description: parents & childs & copies registries 
        
        @see: `registry`
```

```
instance
    @instance: {Object} instance
    @description: a pre-built instance
    
    @method: parent()
        @description: returns the parent instance, if any
        
        @see: `instance`
        
        @return {Object|undefined} parentInstance
        
    @method: child(name)
        @description: returns the named child instance, if any
        
        @see: `instance`
        
        @param: {String} name
            @description: the child name of the related instance
            
        @return {Object|undefined} childInstance
        
    @method: children()
        @description: returns all the named child instances
        
        @see: `instance`
        
        @return {Object} childrenInstances
        
    @method: create()
        @description: creates an orphan instance
        @description: has no parent
        @description: calls the closure
        
        @see: `instance`
        
        @return {Object} orphanInstance
        
    @method: copy()
        @description: copies the related instance
        @description: shares the same registry with the related instance
        @description: not registered as a child of an instance
        @description: no closure call
        
        @see: `instance`
        
        @return {Object} instanceCopy
        
    @method: fork(name)
        @description: creates an instance
        @description: has a parent
        @description: is registered as a child of the related instance, if a name is specified
        @description: calls the closure
        
        @see: `instance`
        
        @param @optional: {String} name
            @description: the child name of the related instance
        
        @return {Object} childInstance
```

```
registry
    @instance: {Object} registry
    @description: a registry
    
    @method: parent()
        @description: returns the parent registry, if any
        
        @see: `registry`
        
        @return {Object|undefined} parentRegistry
        
    @method: child(name)
        @description: returns the named child registry, if any
        
        @see: `registry`
        
        @param: {String} name
            @description: the child name of the related registry
            
        @return {Object|undefined} childRegistry
        
    @method: children()
        @description: returns all the named child registries
        
        @see: `registry`
        
        @return {Object} childrenRegistries
        
    @method: create()
        @description: creates an orphan registry
        @description: has no parent
        @description: calls the closure
        
        @see: `registry`
        
        @return {Object} orphanRegistry
        
    @method: copy()
        @description: copies the related registry
        @description: shares the same registry with the related registry
        @description: not registered as a child of an registry
        
        @see: `registry`
        
        @return {Object} registryCopy
        
    @method: fork(name)
        @description: creates a registry
        @description: has a parent
        @description: is registered as a child of the related registry, if a name is specified
        @description: calls the closure
        
        @see: `registry`
        
        @param @optional: {String} name
            @description: the child name of the related registry
        
        @return {Object} childRegistry
        
    @method: init(name, value)
        @description: creates a record with the chosen name, in the registry, with the related value
        @description: returns the current stored value
        
        @param: {String} name
            @description: the named record in the related registry
        
        @param: {String} value
            @description: the value of named record in the related registry
            @description: ignored if the named record already exists
        
        @return {*} recordedValue
        
    @method: has(name)
        @description: creates a record with the chosen name, in the registry, with the related value
        @description: returns if the named record exists
        
        @param: {String} name
            @description: the named record in the related registry
        
        @return {Boolean} recordExists
        
    @method: get(name, defaultValue)
        @description: returns a record value with the chosen name, in the registry
        
        @param: {String} name
            @description: the named record in the related registry
        
        @param @optional: {String} defaultValue
            @description: the return value if registry has no record for the specified name
        
        @return {*} recordedValue
        
    @method: set(name, value)
        @description: wrotes a record with the chosen name, in the registry, with the related value
        @description: returns the registry
        
        @param: {String} name
            @description: the named record in the related registry
        
        @param: {String} value
            @description: the value of named record in the related registry
        
    @method: add(name, value)
        @description: adds a value to a record with the chosen name, in the registry, with the related value
        @description: an array is recorded as the record value, if no record for the specified name
        @description: returns the record value
        
        @param: {String} name
            @description: the named record in the related registry
        
        @param: {String} value
            @description: the value stored in the named record in the related registry
        
        @return {*} recordValue
        
    @method: unset(name)
        @description: deletes a record with the chosen name, in the registry, with the related value
        
        @param: {String} name
            @description: the named record in the related registry
```

License
-------
This project is under the MIT license
