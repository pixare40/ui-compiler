import {
    Template,
    BinaryExpression,
    Identifier,
    Statement,
    Property,
    Component,
} from './ast'
import { Error } from './types'
import { tokenize, Token, TokenType } from './lexer'
import { throwApplicationError } from './utils/utils'
import { ErrorValueObject } from './constants/error_constants'

export default class Parser {
    private tokens: Token[] = []

    private notEOF(): boolean {
        return this.tokens[0].type !== TokenType.EOF
    }

    private advance(): Token {
        return this.tokens.shift() as Token
    }

    private currentToken(): Token {
        return this.tokens[0]
    }

    private parseComponent(): Component {
        const token = this.advance()

        if (token.type !== TokenType.CurlyOpen) {
            throwApplicationError(ErrorValueObject.UnexpectedToken, token.value)
        }

        const component: Component = {
            kind: 'Component',
            name: '',
            attributes: [],
            children: [],
        }

        while (this.currentToken().type !== TokenType.CurlyClose) {
            const token = this.advance()

            if (token.type === TokenType.Identifier) {
                component.name = token.value
            }

            if (token.type === TokenType.Colon) {
                const key = token.value
                const value = this.advance().value

                component.attributes?.push({
                    kind: 'Property',
                    key: {
                        kind: 'Identifier',
                        symbol: key,
                    },
                    value: {
                        kind: 'Identifier',
                        symbol: value,
                    },
                })
            }

            if (token.type === TokenType.Comma) {
                continue
            }

            if (token.type === TokenType.CurlyOpen) {
                component.children?.push(this.parseComponent())
            }
        }

        this.advance()

        return component
    }

    private parseStatement(): Statement {
        const token = this.currentToken()

        if (token.type === TokenType.CurlyOpen) {
            return this.parseComponent()
        }

        if (token.type === TokenType.Identifier) {
            return this.parseIdentifier()
        }

        throw new Error('Unexpected token')
    }

    public produceAST(input: string): Template {
        this.tokens = tokenize(input)

        console.log('Tokens:', this.tokens)

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
