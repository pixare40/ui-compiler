export const NodeTypesValueObject = {
    Template: 'Template',
    Identifier: 'Identifier',
    Property: 'Property',
    Node: 'Node',
}

export type NodeTypes = keyof typeof NodeTypesValueObject

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

export interface vNode extends Expression {
    kind: 'Node'
    name: string
    attributes?: Attribute[]
    children?: vNode[]
    zone?: string
}
