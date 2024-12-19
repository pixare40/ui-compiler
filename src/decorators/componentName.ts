export function componentName(componentName: string) {
    return function (target: Function) {
        const original = target
        function newConstructor(...args: any[]) {
            const instance = new (original as any)(...args)
            instance.propertyName = componentName

            return instance
        }

        newConstructor.prototype = original.prototype
        return newConstructor as any
    }
}
