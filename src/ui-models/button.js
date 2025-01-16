"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const nodeTypes_1 = require("../types/nodeTypes");
const base_1 = require("./base");
let Button = class Button extends base_1.BaseNode {
    constructor(text, label, type = 'primary', action, zone) {
        super([], zone);
        this.name = 'button';
        this.type = 'primary';
        this.text = text;
        this.label = label;
        this.type = type;
        this.action = action;
    }
    preview() {
        const zone = this.zone ? `"$zone": "${this.zone}",` : '';
        return `{
            "$type": "${this.propertyName || this.constructor.name}",
            ${zone}
            "attributes": {
                "action": "${this.action}",
                "text": "${this.text}",
                "label": "${this.label}",
                "type": "${this.type}"
            }
        }`;
    }
    render() {
        return ''; // Return template you desire eg Mustache, HTML, etc
    }
};
exports.Button = Button;
exports.Button = Button = __decorate([
    nodeTypes_1.INode.register
], Button);
