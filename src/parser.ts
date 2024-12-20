import { Template, Identifier, Statement, Attribute, Component } from './ast'
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

    private parseAttributeValue(): Identifier {
        const token = this.advance()

        if (token.type !== TokenType.SingleQuote) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing attribute value, Excpected opening single quote`,
                token.value
            )
        }

        const valueToken = this.advance()

        if (valueToken.type !== TokenType.Identifier) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing attribute value, Expected identifier`,
                valueToken.value
            )
        }

        const closingToken = this.advance()

        if (closingToken.type !== TokenType.SingleQuote) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing attribute value, Expected closing single quote`,
                closingToken.value
            )
        }

        return {
            kind: 'Identifier',
            symbol: valueToken.value,
        }
    }

    private parseAttribute(): Attribute {
        const keyToken = this.advance()

        if (this.currentToken().type !== TokenType.Colon) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing attribute, expected colon`,
                keyToken.value
            )
        }

        this.advance()

        const attributeValue = this.parseAttributeValue()

        return {
            kind: 'Property',
            key: {
                kind: 'Identifier',
                symbol: keyToken.value,
            },
            value: attributeValue,
        }
    }

    private parseAttributes(): Attribute[] {
        const token = this.currentToken()

        if (token.type !== TokenType.Identifier) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing attributes, expected identifier`,
                token.value
            )
        }

        const attributes: Attribute[] = []

        while (this.currentToken().type !== TokenType.CloseParen) {
            attributes.push(this.parseAttribute())

            // In a property list the only valid separator is a comma
            if (this.currentToken().type === TokenType.Comma) {
                this.advance()
            } else if (this.currentToken().type !== TokenType.CloseParen) {
                throw throwApplicationError(
                    `${ErrorValueObject.UnexpectedToken} parsing attributes, expected comma or closing parenthesis`,
                    this.currentToken().value
                )
            }
        }

        return attributes
    }

    private parseComponent(): Component {
        const component: Component = {
            kind: 'Component',
            name: '',
            attributes: [],
            children: [],
        }

        while (this.currentToken().type !== TokenType.CurlyClose) {
            const token = this.advance()

            switch (token.type) {
                case TokenType.Identifier:
                    component.name = token.value
                    break
                case TokenType.CurlyOpen:
                    component.children?.push(this.parseComponent())
                    break
                case TokenType.OpenParen:
                    component.attributes = this.parseAttributes()
                    break
                default:
                    throw throwApplicationError(
                        `${ErrorValueObject.UnexpectedToken} parsing component, expected identifier, opening curly brace or opening parenthesis`,
                        token.value
                    )
            }
        }

        console.log('While loop exiting', this.currentToken())

        return component
    }

    private parseStatement(): Statement {
        const token = this.currentToken()

        if (token.type === TokenType.Identifier) {
            return this.parseComponent()
        }

        throw throwApplicationError(
            `${ErrorValueObject.UnexpectedToken} parsing statement, expected identifier`,
            token.value
        )
    }

    public produceAST(input: string): Template {
        this.tokens = tokenize(input)

        const template: Template = {
            kind: 'Template',
            body: [],
        }

        // Shift the statement bound token
        const token = this.advance()
        if (token.type !== TokenType.CurlyOpen) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing template, expected opening curly brace`,
                token.value
            )
        }

        while (this.notEOF()) {
            template.body.push(this.parseStatement())

            // Shift the statement bound token
            if (this.currentToken().type === TokenType.CurlyClose) {
                this.advance()
                break
            } else {
                throw throwApplicationError(
                    `${ErrorValueObject.UnexpectedToken} parsing template, expected closing curly brace`,
                    this.currentToken().value
                )
            }
        }

        console.log('AST:', template)

        return template
    }
}
