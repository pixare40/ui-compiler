import { componentName } from '../decorators/componentName'
import { BaseNode } from './base'

@componentName('image')
export class Image extends BaseNode {
    source: string

    constructor(source: string, zone?: string) {
        super()
        this.source = source
    }

    renderTemplate(): string {
        return `{
            "$type": "${this.propertyName || this.constructor.name}",
            "attributes": {
                "source": "${this.source}"
        }`
    }
}
