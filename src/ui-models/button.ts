import { INode } from '../types/nodeTypes'
import { BaseNode } from './base'

@INode.register
export class Button extends BaseNode {
    name = 'button'
    public text: string
    public label: string
    private type: string = 'primary'
    private action: string

    constructor(
        text: string,
        label: string,
        type: string = 'primary',
        action: string,
        zone?: string
    ) {
        super([], zone)
        this.text = text
        this.label = label
        this.type = type
        this.action = action
    }

    preview(): string {
        const zone = this.zone ? `"$zone": "${this.zone}",` : ''

        return `{
            "$type": "${(this as any).propertyName || this.constructor.name}",
            ${zone}
            "attributes": {
                "action": "${this.action}",
                "text": "${this.text}",
                "label": "${this.label}",
                "type": "${this.type}"
            }
        }`
    }

    render(): string | null {
        return '' // Return template you desire eg Mustache, HTML, etc
    }
}
