export enum NodeType {
    Template = 'Template',
    Identifier = 'Identifier',
    Property = 'Property',
    Node = 'Node',
}

export interface Statement {
    kind: string
}

export interface Template extends Statement {
    kind: NodeType.Template
    body: Statement[]
}

export interface Expression extends Statement {}

export interface Identifier extends Expression {
    kind: NodeType.Identifier
    symbol: string
}

export interface Attribute extends Expression {
    kind: NodeType.Property
    key: Identifier
    value: Identifier
}

export interface vNode extends Expression {
    kind: NodeType.Node
    name: string
    attributes?: Attribute[]
    children?: vNode[]
    zone?: string
}
