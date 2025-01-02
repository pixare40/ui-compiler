import { vNode, Statement, Template } from '../compiler/ast'
import Parser from '../compiler/parser'
import { Hero } from '../ui-models/hero'
import { TagList } from '../ui-models/tagList'
import { throwApplicationError } from '../utils/utils'

export class TemplateGenerator {
    private readonly parser: Parser
    private componentMap: Map<string, any>

    constructor(parser: Parser) {
        this.parser = parser

        this.componentMap = new Map()
        this.componentMap.set('hero', Hero)
        this.componentMap.set('tagList', TagList)
    }

    public generateTemplate(input: string): string {
        const ast = this.parser.produceAST(input)
        return this.renderTemplate(ast)
    }

    public renderTemplate(ast: Template): string {
        return `
        {
            elements: [
                ${ast.body.map((node) => this.renderNode(node as vNode)).join(',')}
            ]
        }
        `
    }

    public renderNode(node: vNode): string {
        return ''
    }
}
