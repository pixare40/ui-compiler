import { vNode } from '../../compiler/ast'
import Parser from '../../compiler/parser'

export abstract class TemplateGenerator {
    protected readonly parser: Parser

    constructor(parser: Parser) {
        this.parser = parser
    }

    public generate(statement: string | vNode[]): string {
        if (typeof statement === 'string') {
            statement = this.parser.produceAST(statement).body as vNode[]
        }

        this.onGenerate(statement)

        return this.generateTemplate(statement)
    }

    abstract generateTemplate(nodes: vNode[]): string
    onGenerate(nodes: vNode[]) {}
}
