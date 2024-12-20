import { addCommonPartial } from '../decorators/addCommonPartial'
import { componentName } from '../decorators/componentName'
import { BaseNode } from './base'

@componentName('header')
export class Header extends BaseNode {
    text: string
    constructor(text: string) {
        super()
        this.text = text
    }

    @addCommonPartial
    renderTemplate(): string {
        return `{
                "text": "${this.text}"
            }`
    }
}

console.log(new Header('Hello, World!').renderTemplate())
