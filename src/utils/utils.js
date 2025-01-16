"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
exports.throwApplicationError = throwApplicationError;
const isString = (input) => typeof input === 'string';
exports.isString = isString;
function throwApplicationError(message, options) {
    console.error(message, options);
    throw new Error(message);
}
