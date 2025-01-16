"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const nodeTypes_1 = require("../types/nodeTypes");
const base_1 = require("./base");
let Image = class Image extends base_1.BaseNode {
    constructor(source, zone) {
        super([], zone);
        this.name = 'image';
        this.source = source;
    }
    preview() {
        return `{
            "$type": "${this.name || this.constructor.name}",
            "attributes": {
                "source": "${this.source}"
            }
        }`;
    }
    render() {
        return ``; // Return template you desire eg Mustache, HTML, etc
    }
};
exports.Image = Image;
exports.Image = Image = __decorate([
    nodeTypes_1.INode.register
], Image);
