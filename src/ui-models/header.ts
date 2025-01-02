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

    renderTestTemplate(): string {
        return `{
                "text": "${this.text}"
            }`
    }
}

console.log(new Header('Hello, World!').renderTestTemplate())
