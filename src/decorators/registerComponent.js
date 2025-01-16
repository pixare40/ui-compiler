"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerComponent = registerComponent;
const services_1 = require("../services");
function registerComponent(componentName) {
    return function (target) {
        const original = target;
        function newConstructor(...args) {
            const instance = new original(...args);
            instance.propertyName = componentName;
            if (!services_1.componentRegistry.has(componentName)) {
                services_1.componentRegistry.set(componentName, instance);
            }
            else {
                console.warn('Component already registered:', componentName);
            }
            return instance;
        }
        newConstructor.prototype = original.prototype;
        return newConstructor;
    };
}
