export enum KindValueObject {
    Template = 'Template',
    Identifier = 'Identifier',
    Property = 'Property',
    Node = 'Node',
}

export interface Statement {
    kind: string
}

export interface Template extends Statement {
    kind: KindValueObject.Template
    body: Statement[]
}

export interface Expression extends Statement {}

export interface Identifier extends Expression {
    kind: KindValueObject.Identifier
    symbol: string
}

export interface Attribute extends Expression {
    kind: KindValueObject.Property
    key: Identifier
    value: Identifier
}

export interface vNode extends Statement {
    kind: KindValueObject.Node
    name: string
    attributes?: Attribute[]
    children?: vNode[]
    zone?: string
}
