import { addCommonPartial } from '../decorators/addCommonPartial'
import { registerComponent } from '../decorators/registerComponent'
import { BaseNode } from './base'

@registerComponent('button')
export class Button extends BaseNode {
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

    renderTestTemplate(): string {
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
}
