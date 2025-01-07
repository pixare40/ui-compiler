import { vNode } from '../compiler/ast'
import Parser from '../compiler/parser'
import { Environment, environmentService, EnvironmentType } from './Environment'
import { render } from './RenderUtils'
import { ITemplateGenerator } from './types'

export class VesperTemplateGenerator implements ITemplateGenerator {
    private readonly parser: Parser

    constructor(parser: Parser) {
        this.parser = parser
    }

    public generatePreview(input: string): string {
        environmentService.setEnvironment(
            Environment.OUTPUT_TYPE,
            EnvironmentType.Preview
        )

        const ast = this.parser.produceAST(input) // obtain template from uiml and create a Template
        const statements = ast.body as vNode[]
        const template = this.generateTemplate(statements)
        return template
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
