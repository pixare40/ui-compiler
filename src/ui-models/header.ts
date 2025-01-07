import { addCommonPartial } from '../decorators/addCommonPartial'
import { registerComponent } from '../decorators/registerComponent'
import { BaseNode } from './base'

@registerComponent('header')
export class Header extends BaseNode {
    text: string
    constructor(text: string) {
        super()
        this.text = text
    }

    test(): string {
        return `{
                "text": "${this.text}"
            }`
    }

    render(): string | null {
        return '' // Return template you desire eg Mustache, HTML, etc
    }
}
