import { registerComponent } from '../decorators/registerComponent'
import { BaseNode } from './base'

@registerComponent('image')
export class Image extends BaseNode {
    source: string

    constructor(source: string, zone?: string) {
        super([], zone)
        this.source = source
    }

    test(): string {
        return `{
            "$type": "${this.propertyName || this.constructor.name}",
            "attributes": {
                "source": "${this.source}"
            }
        }`
    }

    render(): string | null {
        return `` // Return template you desire eg Mustache, HTML, etc
    }
}
