import { vNode } from '../compiler/ast'
import Parser from '../compiler/parser'
import { TemplateGenerator } from './base/TemplateGenerator'
import { render } from './RenderUtils'

export class VesperTemplateGenerator extends TemplateGenerator {
    constructor(parser: Parser) {
        super(parser)
    }

    public generateTemplate(nodes: vNode[]): string {
        return `
        {
            "elements": [
                ${nodes.map((node) => render(node).renderNode()).join(',')}
            ]
        }
        `
    }
}
