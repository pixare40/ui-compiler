"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INode = void 0;
var INode;
(function (INode) {
    const implementations = new Map();
    function GetImplementations() {
        return implementations;
    }
    INode.GetImplementations = GetImplementations;
    function register(ctor) {
        implementations.set(ctor.name, ctor);
        return ctor;
    }
    INode.register = register;
    function GetImplementation(name) {
        return implementations.get(name) || null;
    }
    INode.GetImplementation = GetImplementation;
})(INode || (exports.INode = INode = {}));
