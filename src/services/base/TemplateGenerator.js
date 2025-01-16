"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateGenerator = void 0;
class TemplateGenerator {
    constructor(parser) {
        this.parser = parser;
    }
    generate(statement) {
        if (typeof statement === 'string') {
            statement = this.parser.produceAST(statement).body;
        }
        this.onGenerate(statement);
        return this.generateTemplate(statement);
    }
    onGenerate(nodes) { }
}
exports.TemplateGenerator = TemplateGenerator;
