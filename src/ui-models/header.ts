import { INode } from '../types/nodeTypes'
import { BaseNode } from './base'

@INode.register
export class Header extends BaseNode {
    text: string
    constructor(text: string) {
        super()
        this.text = text
    }

    preview(): string {
        return `{
                "text": "${this.text}"
            }`
    }

    render(): string | null {
        return '' // Return template you desire eg Mustache, HTML, etc
    }
}
