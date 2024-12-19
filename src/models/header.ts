import { componentName } from '../decorators/componentName'
import { BaseNode } from './base'

@componentName('header')
export class Header extends BaseNode {
    text: string
    constructor(text: string) {
        super()
        this.text = text
    }
    renderTemplate(): string {
        return `{
            "$type": "${this.propertyName || this.constructor.name}",
            "attributes": {
                "text": "${this.text}"
        }`
    }
}
