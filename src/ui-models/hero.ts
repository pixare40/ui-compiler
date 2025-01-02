import { registerComponent } from '../decorators/registerComponent'
import { throwApplicationError } from '../utils/utils'
import { BaseNode } from './base'
import { ERROR_INVALID_CHILD_COMPONENT } from '../constants/error_constants'

@registerComponent('hero')
export class Hero extends BaseNode {
    constructor(children?: BaseNode[], zone: string = '') {
        super(children, zone)
    }

    renderTemplate(): string | null {
        const childComponentMap: Map<string, string[]> = new Map()

        this.children.forEach((child: BaseNode) => {
            if (child instanceof BaseNode) {
                if (!childComponentMap.get(child.propertyName)) {
                    childComponentMap.set(child.propertyName, [])
                }

                const template = child.renderTemplate()

                if (template == null) {
                    throwApplicationError(ERROR_INVALID_CHILD_COMPONENT, child)
                    return
                }

                childComponentMap.get(child.propertyName)!.push(template)
            } else {
                throwApplicationError(ERROR_INVALID_CHILD_COMPONENT, child)
            }
        })

        new Array('actions', 'content', 'image', 'header').forEach((key) => {
            if (!childComponentMap.get(key)) {
                throwApplicationError(`Hero component must have ${key} defined`)
                return
            }
        })

        return `{
            "$type": "${this.propertyName || this.constructor.name}",
            "$zone": "${this.zone}",
            "attributes": {
                "actions": ${childComponentMap.get('actions')},
                "content": ${childComponentMap.get('content')},
                "image": ${childComponentMap.get('image')},
                "header": ${childComponentMap.get('header')}
            }
        }`
    }
}
