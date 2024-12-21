export type NodeTypes = 'Template' | 'Identifier' | 'Property' | 'Component'

export interface Statement {
    kind: NodeTypes
}

export interface Template extends Statement {
    kind: 'Template'
    body: Statement[]
}

export interface Expression extends Statement {}

export interface Identifier extends Expression {
    kind: 'Identifier'
    symbol: string
}

export interface Attribute extends Expression {
    kind: 'Property'
    key: Identifier
    value: Identifier
}

export interface Component extends Expression {
    kind: 'Component'
    name: string
    attributes?: Attribute[]
    children?: Component[]
    zone?: string
}
