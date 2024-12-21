import { Template, Identifier, Statement, Attribute, Component } from './ast'
import { tokenize, Token, TokenType } from './lexer'
import { throwApplicationError } from '../utils/utils'
import { ErrorValueObject } from '../constants/error_constants'

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
                `${ErrorValueObject.UnexpectedToken} parsing attribute value, Excpected opening single quote, got`,
                token.value
            )
        }

        // take all tokens until the closing single quote
        let value = ''
        while (this.currentToken().type !== TokenType.SingleQuote) {
            value += this.advance().value
        }

        if (this.currentToken().type !== TokenType.SingleQuote) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing attribute value, Excpected closing single quote, got`,
                this.currentToken().value
            )
        }

        this.advance()

        return {
            kind: 'Identifier',
            symbol: value,
        }
    }

    private parseAttribute(): Attribute {
        const keyToken = this.advance()

        if (this.currentToken().type !== TokenType.Colon) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing attribute, expected colon, got`,
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
                `${ErrorValueObject.UnexpectedToken} parsing attributes, expected identifier, got`,
                token.value
            )
        }

        const attributes: Attribute[] = []

        while (this.currentToken().type !== TokenType.CloseParen) {
            attributes.push(this.parseAttribute())

            if (this.currentToken().type === TokenType.Comma) {
                this.advance()
            }
        }

        this.advance()

        return attributes
    }

    private parseComponent(): Component {
        const component: Component = {
            kind: 'Component',
            name: '',
            attributes: [],
            children: [],
        }

        const token = this.advance()
        if (token.type !== TokenType.Identifier) {
            throw throwApplicationError(
                `${ErrorValueObject.UnexpectedToken} parsing component, expected identifier, got`,
                token.value
            )
        }

        component.name = token.value

        if (this.currentToken().type === TokenType.OpenParen) {
            this.advance()
            component.attributes = this.parseAttributes()
        }

        if (this.currentToken().type === TokenType.OpenBrace) {
            this.advance()
            while (this.currentToken().type !== TokenType.CloseBrace) {
                component.children?.push(this.parseComponent())
            }
            this.advance()
        }

        return component
    }

    private parseStatement(): Statement {
        const token = this.currentToken()

        if (token.type === TokenType.Identifier) {
            return this.parseComponent()
        }

        throw throwApplicationError(
            `${ErrorValueObject.UnexpectedToken} parsing statement, expected identifier, got`,
            token.value
        )
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

        return template
    }
}
