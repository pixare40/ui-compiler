import { BaseNode } from '../models/base'

export function addCommonPartial(
    target: any,
    propertyKey: 'renderTemplate',
    descriptor: TypedPropertyDescriptor<() => string>
): void | TypedPropertyDescriptor<() => string> {
    const originalMethod = descriptor.value

    descriptor.value = function () {
        const zone = target.zone ? `"$zone": "${target.zone}",` : ''

        return `{
            "$type": "${(this as any).propertyName || this.constructor.name}",
            ${zone}
            "attributes": ${originalMethod?.call(this)}
        }`
    }

    return descriptor
}
