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
    const implementations: Constructor<INode>[] = []
    export function GetImplementations(): Constructor<INode>[] {
        return implementations
    }
    export function register<T extends Constructor<INode>>(ctor: T) {
        implementations.push(ctor)
        return ctor
    }
}
