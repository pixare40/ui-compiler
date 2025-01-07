import { registerComponent } from '../decorators/registerComponent'
import { INode } from '../types/nodeTypes'
import { BaseNode } from './base'

@INode.register
export class Image extends BaseNode implements INode {
    name = 'image'
    source: string

    constructor(source: string, zone?: string) {
        super([], zone)
        this.source = source
    }

    preview(): string {
        return `{
            "$type": "${this.name || this.constructor.name}",
            "attributes": {
                "source": "${this.source}"
            }
        }`
    }

    render(): string | null {
        return `` // Return template you desire eg Mustache, HTML, etc
    }
}
