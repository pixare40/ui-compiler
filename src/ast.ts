export type NodeTypes =
    | 'Template'
    | 'Identifier'
    | 'CallExpression'
    | 'BinaryExpression'
    | 'Property'
    | 'Component'

export interface Statement {
    kind: NodeTypes
}

export interface Template extends Statement {
    kind: 'Template'
    body: Statement[]
}

export interface Expression extends Statement {}

// will likely not be in use in the first iteration. We are not doing expression evaluation right now
// But we will for the optionality of a property
export interface BinaryExpression extends Expression {
    kind: 'BinaryExpression'
    operator: string
    left: Expression
    right: Expression
}

export interface Identifier extends Expression {
    kind: 'Identifier'
    symbol: string
}

export interface Property extends Expression {
    kind: 'Property'
    key: Identifier
    value: Identifier
}

export interface Component extends Expression {
    kind: 'Component'
    name: string
    properties: Property[]
    components: Component[]
}
