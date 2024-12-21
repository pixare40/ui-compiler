import { addCommonPartial } from '../decorators/addCommonPartial'
import { registerComponent } from '../decorators/registerComponent'
import { BaseNode } from './base'

@registerComponent('button')
export class Button extends BaseNode {
    public text: string
    public label: string

    constructor(text: string, label: string) {
        super()
        this.text = text
        this.label = label
    }

    @addCommonPartial
    renderTemplate(): string {
        return `{
            "text": "${this.text}",
            "label": "${this.label}
        }`
    }
}
