"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericNode = void 0;
const base_1 = require("./base");
class GenericNode extends base_1.BaseNode {
    constructor(children, zone = '') {
        super(children, zone);
    }
    render() {
        return '';
    }
}
exports.GenericNode = GenericNode;
