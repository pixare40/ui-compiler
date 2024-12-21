import { registerComponent } from '../decorators/registerComponent'
import { BaseNode } from './base'

@registerComponent('image')
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
