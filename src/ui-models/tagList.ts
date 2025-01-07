import { INode } from '../types/nodeTypes'
import { BaseNode } from './base'

@INode.register
export class TagList extends BaseNode {
    preview(): string {
        return `{
            "$type": "${this.name || this.constructor.name}"
        }`
    }

    render(): string | null {
        return `` // Return template you desire eg Mustache, HTML, etc
    }
}
