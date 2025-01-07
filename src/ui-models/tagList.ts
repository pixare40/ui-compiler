import { registerComponent } from '../decorators/registerComponent'
import { BaseNode } from './base'

@registerComponent('tagList')
export class TagList extends BaseNode {
    preview(): string {
        return `{
            "$type": "${this.propertyName || this.constructor.name}"
        }`
    }

    render(): string | null {
        return `` // Return template you desire eg Mustache, HTML, etc
    }
}
