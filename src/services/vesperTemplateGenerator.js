"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VesperTemplateGenerator = void 0;
const TemplateGenerator_1 = require("./base/TemplateGenerator");
const renderUtils_1 = require("./renderUtils");
class VesperTemplateGenerator extends TemplateGenerator_1.TemplateGenerator {
    constructor(parser) {
        super(parser);
    }
    generateTemplate(nodes) {
        return `
        {
            "elements": [
                ${nodes.map((node) => (0, renderUtils_1.processBranch)(node).renderNode()).join(',')}
            ]
        }
        `;
    }
}
exports.VesperTemplateGenerator = VesperTemplateGenerator;
