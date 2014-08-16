
(function () {
    'use strict';
    
    var invoker,
        lib,
        hello,
        registry,
        internalRegistry,
        child,
        isLib,
        isHelloLib,
        isInternalRegistry,
        message,
        isCopy;

    invoker = require('reg-invoker');
    
    lib = invoker.invoke(function (instance, registry) {
        instance.getInternalRegistry = function () {
            return registry;
        };
        
        return instance;
    });

    hello = lib.fork('hello');
    registry = hello.registry = invoker.registry.create();
    internalRegistry = hello.getInternalRegistry();
    child = hello.parent().child('hello');

    registry.init('hello', 'I don\'t say hello!');
    registry.unset('hello');
    registry.init('hello', 'Hello world!');
    registry.init('hello', 'I don\'t say hello anymore!');

    isHelloLib = child === hello;
    isInternalRegistry = internalRegistry.parent().child('hello') === internalRegistry;
    message = child.registry.get('hello');
    isCopy = hello.copy().registry.get('hello') === message;

    console.log('is hello lib :', isHelloLib);
    console.log('is internal registry :', isInternalRegistry);
    console.log('is copy :', isCopy);
    console.log('message :', message);
}());
