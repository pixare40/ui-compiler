import { BaseNode } from './base'

export class GenericNode extends BaseNode {
    constructor(children: BaseNode[], zone: string = '') {
        super(children, zone)
    }

    renderTestTemplate(): string | null {
        return ''
    }
}
