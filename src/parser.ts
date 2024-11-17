import {
    Template,
    BinaryExpression,
    Identifier,
    Expression,
    Statement,
    Property,
    Component,
} from './ast'
import { Error } from './types'
import { tokenize, Token, TokenType } from './lexer'

export default class Parser {
    private tokens: Token[] = []

    private notEOF(): boolean {
        return this.tokens[0].type !== TokenType.EOF
    }

    private advance(): Token {
        return this.tokens.shift() as Token
    }

    private parseIdentifier(): Identifier {
        if (this.tokens[0].type !== TokenType.Identifier) {
            console.log('Expected an identifier', this.tokens[0])
            throw new Error('Expected an identifier', {
                cause: this.tokens[0],
            })
        }
        return {
            kind: 'Identifier',
            symbol: this.advance().value, // potential bug
        }
    }

    private currentToken(): Token {
        return this.tokens[0]
    }

    // Will likely not be in use in the first iteration.
    // We are not evaluating expressions more like converting them to a different format.
    private parseExpression(): Statement {
        this.tokens.shift()
        const identifier = this.parseIdentifier()
        const expression: BinaryExpression = {
            kind: 'BinaryExpression',
            operator: identifier.symbol,
            left: this.parseStatement(),
            right: this.parseStatement(),
        }
        this.tokens.shift()
        return expression
    }

    private parseProperty(): Property {
        if (this.currentToken().type !== TokenType.Identifier) {
            console.log('Expected an identifier, got', this.currentToken())
            throw new Error('Expected an identifier', {
                cause: this.currentToken(),
            })
        }

        const identifier = this.parseIdentifier()

        if (this.currentToken().type !== TokenType.Colon) {
            console.log(
                'Expected a colon between property key and value, got',
                this.currentToken().value
            )
            throw new Error('Expected a colon', {
                cause: this.currentToken(),
            })
        }

        this.tokens.shift() // Shift the colon

        const value = this.parseIdentifier()
        const property: Property = {
            kind: 'Property',
            key: identifier,
            value,
        }

        return property
    }

    private parseProperties(): Property[] {
        if (this.tokens[0].type !== TokenType.OpenParen) {
            console.log('Expected an open paren', this.tokens[0])
            throw new Error('Expected an open paren', {
                cause: this.tokens[0],
            })
        }

        this.tokens.shift() // Shift the open paren

        const properties: Property[] = []

        // properties are optional and take the form (key: value, key: value) with a semicolon terminator
        while (this.currentToken().type !== TokenType.CloseParen) {
            properties.push(this.parseProperty())

            if (this.currentToken().type === TokenType.Comma) {
                this.tokens.shift() // Shift the comma
            }
        }

        if (this.currentToken().type !== TokenType.CloseParen) {
            console.log('Expected a closing paren', this.tokens[0])
            throw new Error('Expected a closing paren', {
                cause: this.currentToken(),
            })
        }

        this.tokens.shift() // Shift the closing paren

        return properties
    }

    private parseComponent(): Component {
        if (this.currentToken().type === TokenType.CurlyOpen) {
            // I Know I know. Not good. But I am trying to get this to work first
            this.tokens.shift()
        }

        let name = ''

        if (this.tokens[0].type === TokenType.Identifier) {
            name = this.tokens[0].value
            this.tokens.shift()
        }

        let properties: Property[] = []
        const components: Component[] = []

        while (this.currentToken().type !== TokenType.CurlyClose) {
            if (this.currentToken().type === TokenType.OpenParen) {
                properties = this.parseProperties()
            } else if (
                this.currentToken().type === TokenType.CurlyOpen ||
                this.currentToken().type === TokenType.Identifier
            ) {
                components.push(this.parseComponent())
            } else if (this.currentToken().type === TokenType.SemiColon) {
                // this.tokens.shift()
                break
            } else {
                console.log(
                    'Unexpected token found parsing component',
                    this.tokens[0]
                )
                throw new Error('Unexpected token found', {
                    cause: this.currentToken(),
                })
            }
        }

        if (
            this.currentToken().type !== TokenType.CurlyClose &&
            this.currentToken().type !== TokenType.SemiColon
        ) {
            console.log(
                'Expected a closing curly or a semicolon',
                this.tokens[0]
            )
            throw new Error('Expected a closing curly or a semicolon', {
                cause: this.currentToken(),
            })
        }

        if (this.currentToken().type === TokenType.SemiColon) {
            this.tokens.shift()
        }

        if (this.currentToken().type === TokenType.CurlyClose) {
            this.tokens.shift()
        }

        const component: Component = {
            kind: 'Component',
            name,
            properties,
            components,
        }

        return component
    }

    private parseStatement(): Statement {
        switch (this.currentToken().type) {
            case TokenType.Identifier:
                return this.parseIdentifier()
            case TokenType.OpenParen:
                return this.parseProperty()
            case TokenType.CurlyOpen:
                const component = this.parseComponent()
                return component
            // what I am assuming here is that after the curly open we will have an identifier of the
            // next identifier of a component.

            default:
                console.log(
                    'Unexpected token found parsing statement',
                    this.tokens[0]
                )
                throw new Error('Unexpected token found parsing statement', {
                    cause: this.tokens[0],
                })
        }
    }

    public produceAST(input: string): Template {
        this.tokens = tokenize(input)
        const template: Template = {
            kind: 'Template',
            body: [],
        }

        while (this.notEOF()) {
            template.body.push(this.parseStatement())
        }

        console.log('AST:', template)

        return template
    }
}
