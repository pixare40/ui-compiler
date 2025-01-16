"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const utils_1 = require("../utils/utils");
const base_1 = require("./base");
const error_constants_1 = require("../constants/error_constants");
const nodeTypes_1 = require("../types/nodeTypes");
let Hero = class Hero extends base_1.BaseNode {
    constructor(children, zone = '') {
        super(children, zone);
    }
    preview() {
        const childComponentMap = new Map();
        this.children.forEach((child) => {
            if (child instanceof base_1.BaseNode) {
                if (!childComponentMap.get(child.name)) {
                    childComponentMap.set(child.name, []);
                }
                const template = child.renderNode();
                if (template == null) {
                    (0, utils_1.throwApplicationError)(error_constants_1.ERROR_INVALID_CHILD_COMPONENT, child);
                    return;
                }
                childComponentMap.get(child.name).push(template);
            }
            else {
                (0, utils_1.throwApplicationError)(error_constants_1.ERROR_INVALID_CHILD_COMPONENT, child);
            }
        });
        new Array('actions', 'content', 'image', 'header').forEach((key) => {
            if (!childComponentMap.get(key)) {
                (0, utils_1.throwApplicationError)(`Hero component must have ${key} defined`);
                return;
            }
        });
        const herozone = this.zone ? `"zone": "${this.zone}",` : '';
        return `{
            "$type": "${this.name || this.constructor.name}",
            ${herozone}
            "attributes": {
                "actions": ${childComponentMap.get('actions')},
                "content": ${childComponentMap.get('content')},
                "image": ${childComponentMap.get('image')},
                "header": ${childComponentMap.get('header')}
            }
        }`;
    }
    render() {
        return ``; // Return template you desire eg Mustache, HTML, etc
    }
};
exports.Hero = Hero;
exports.Hero = Hero = __decorate([
    nodeTypes_1.INode.register
], Hero);
