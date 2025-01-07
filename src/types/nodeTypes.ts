export interface ICoordinates {
    x: number
    y: number
}

export interface Style {
    [key: string]: string
}

export interface INode {
    id: string
    name: string
    coordinates: ICoordinates | undefined
    style: Style | undefined
    children: INode[]
    parent: INode | null
}

export namespace INode {
    type Constructor<T> = {
        new (...args: any[]): T
        readonly prototype: T
    }
    const implementations: Map<string, Constructor<INode>> = new Map()
    export function GetImplementations(): Map<string, Constructor<INode>> {
        return implementations
    }
    export function register<T extends Constructor<INode>>(ctor: T) {
        implementations.set(ctor.name, ctor)
        return ctor
    }

    export function GetImplementation(name: string): Constructor<INode> | null {
        return implementations.get(name) || null
    }
}
