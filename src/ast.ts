export type NodeTypes =
    | 'Template'
    | 'Identifier'
    | 'CallExpression'
    | 'BinaryExpression'

export interface Statement {
    kind: NodeTypes
}

export interface Template extends Statement {
    kind: 'Template'
    body: Statement[]
}

export interface Expression extends Statement {}

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
