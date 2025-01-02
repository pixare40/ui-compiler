import { vNode, Template } from '../compiler/ast'
import Parser from '../compiler/parser'
import { render } from './renderUtils'

export class TemplateGenerator {
    private readonly parser: Parser

    constructor(parser: Parser) {
        this.parser = parser
    }

    public generateTemplate(input: string): string {
        const ast = this.parser.produceAST(input)
        const template = this.renderTemplate(ast)
        return template
    }

    public renderTemplate(ast: Template): string {
        return `
        {
            "elements": [
                ${ast.body.map((node) => render(node as vNode).renderTemplate()).join(',')}
            ]
        }
        `
    }
}
