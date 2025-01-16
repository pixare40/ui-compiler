"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentService = exports.EnvironmentType = exports.Environment = void 0;
var Environment;
(function (Environment) {
    Environment["OUTPUT_TYPE"] = "OUTPUT_TYPE";
})(Environment || (exports.Environment = Environment = {}));
var EnvironmentType;
(function (EnvironmentType) {
    EnvironmentType["Preview"] = "preview";
    EnvironmentType["Template"] = "template";
})(EnvironmentType || (exports.EnvironmentType = EnvironmentType = {}));
class EnvironmentService {
    constructor() {
        this.environmentVariables = new Map();
    }
    getVariable(key) {
        return this.environmentVariables.get(key) || '';
    }
    setVariable(key, value) {
        this.environmentVariables.set(key, value);
    }
}
exports.environmentService = new EnvironmentService();
