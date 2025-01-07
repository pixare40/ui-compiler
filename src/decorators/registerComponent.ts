import { componentRegistry } from '../services/ComponentRegistry'

export function registerComponent(componentName: string) {
    return function (target: Function) {
        const original = target
        function newConstructor(...args: any[]) {
            const instance = new (original as any)(...args)
            instance.propertyName = componentName

            if (!componentRegistry.has(componentName)) {
                componentRegistry.set(componentName, instance)
            } else {
                console.warn('Component already registered:', componentName)
            }

            return instance
        }

        newConstructor.prototype = original.prototype
        return newConstructor as any
    }
}
