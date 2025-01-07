import { vNode } from '../compiler/ast'

export interface ITemplateGenerator {
    generatePreview(statement: string | vNode[]): string
    generateTemplate(statement: vNode[]): string
}
