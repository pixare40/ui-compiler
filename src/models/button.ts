import { componentName } from '../decorators/componentName'
import { BaseNode } from './base'

@componentName('button')
export class Button extends BaseNode {
    public text: string
    public label: string

    constructor(text: string, label: string) {
        super()
        this.text = text
        this.label = label
    }

    renderTemplate(): string {
        return `{
            "$type": "${this.propertyName || this.constructor.name}"
        }`
    }
}
