"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNode = void 0;
const services_1 = require("../services");
class BaseNode {
    constructor(children, zone = '', coordinates, style) {
        this.id = '';
        this.parent = null;
        this.name = '';
        this.zone = '';
        this.optional = false;
        this.multiple = false;
        this.coordinates = undefined;
        this.style = undefined;
        this.children = children || [];
        this.zone = zone;
        this.coordinates = coordinates;
        this.style = style;
    }
    preview() {
        return '';
    }
    renderNode() {
        if (services_1.environmentService.getVariable(services_1.Environment.OUTPUT_TYPE) ===
            services_1.EnvironmentType.Preview) {
            return this.preview() || '';
        }
        return this.render() || '';
    }
}
exports.BaseNode = BaseNode;
