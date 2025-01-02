import { registerComponent } from '../decorators/registerComponent'
import { BaseNode } from './base'

@registerComponent('tagList')
export class TagList extends BaseNode {
    renderTestTemplate(): string {
        return `{
            "$type": "${this.propertyName || this.constructor.name}"
        }`
    }
}
