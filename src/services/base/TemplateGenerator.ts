import { vNode } from '../../compiler/ast'
import Parser from '../../compiler/parser'

export abstract class TemplateGenerator {
    protected readonly parser: Parser

    constructor(parser: Parser) {
        this.parser = parser
    }

    public generate(statement: string | vNode[]): string {
        let nodes: vNode[] = []
        if (typeof statement === 'string') {
            nodes = this.parser.produceAST(statement).body as vNode[]
        }

        this.onGenerate(nodes)

        return this.generateTemplate(nodes)
    }

    abstract generateTemplate(nodes: vNode[]): string
    onGenerate(nodes: vNode[]) {}
}
