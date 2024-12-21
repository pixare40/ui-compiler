import { Component, Statement, Template } from '../compiler/ast'
import Parser from '../compiler/parser'
import { Hero } from '../models/hero'
import { TagList } from '../models/tagList'
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
                ${ast.body.map((node) => this.renderNode(node as Component)).join(',')}
            ]
        }
        `
    }

    public renderNode(node: Component): string {
        if (node.kind === 'Component') {
            const component = this.componentMap.get(node.name)
            return new component(node).renderTemplate()
        }

        throw throwApplicationError('Invalid node type')
    }
}
