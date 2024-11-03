import {
    Template,
    BinaryExpression,
    Identifier,
    Expression,
    Statement,
} from './ast'
import { tokenize, Token, TokenType } from './lexer'

export default class Parser {
    private tokens: Token[] = []

    private notEOF(): boolean {
        return this.tokens[0].type !== TokenType.EOF
    }

    private parseIdentifier(): Identifier {
        return {
            kind: 'Identifier',
            symbol: this.tokens?.shift()?.value ?? '', // potential bug
        }
    }

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

    private parseStatement(): Statement {
        if (this.tokens[0].type === TokenType.OpenParen) {
            return this.parseExpression()
        }

        if (this.tokens[0].type === TokenType.Identifier) {
            return this.parseIdentifier()
        }

        if (this.tokens[0].type === TokenType.CurlyOpen) {
            this.tokens.shift()
            const template: Template = {
                kind: 'Template',
                body: [],
            }
          
          // Create another component block
        }

        throw new Error('Unexpected token', { cause: this.tokens[0] })
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
