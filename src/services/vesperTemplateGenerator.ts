import { vNode } from '../compiler/ast'
import Parser from '../compiler/parser'
import { TemplateGenerator } from './base/TemplateGenerator'
import { processBranch } from './renderUtils'

export class VesperTemplateGenerator extends TemplateGenerator {
    constructor(parser: Parser) {
        super(parser)
    }

    public generateTemplate(nodes: vNode[]): string {
        return `
        {
            "elements": [
                ${nodes.map((node) => processBranch(node).renderNode()).join(',')}
            ]
        }
        `
    }
}
