import { componentName } from '../decorators/componentName'
import { BaseNode } from './base'

@componentName('tagList')
export class TagList extends BaseNode {
    
    renderTemplate(): string {
        return `{
            "$type": "${this.propertyName || this.constructor.name}"
        }`
    }
}
