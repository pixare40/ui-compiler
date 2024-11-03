export enum TokenType {
    OpenParen = 'OpenParen',
    CloseParen = 'CloseParen',
    Identifier = 'Identifier',
    CurlyOpen = 'CurlyOpen',
    CurlyClose = 'CurlyClose',
    EOF = 'EOF',
    Colon = 'Colon',
}

export interface Token {
    type: string
    value: string
}

function isAlpha(char: string): boolean {
    return /[a-zA-Z]/.test(char)
}

function isDigit(char: string): boolean {
    return /[0-9]/.test(char)
}

function isSkippable(char: string): boolean {
    return /\s/.test(char)
}

function isAlphaNumeric(char: string): boolean {
    return isAlpha(char) || isDigit(char)
}

export function tokenize(input: string): Token[] {
    const tokens: Token[] = []
    let cursor = 0

    while (cursor < input.length) {
        const char = input[cursor]

        if (char === '(') {
            tokens.push({ type: TokenType.OpenParen, value: '(' })
            cursor++
            continue
        }

        if (char === ')') {
            tokens.push({ type: TokenType.CloseParen, value: ')' })
            cursor++
            continue
        }

        if (char === '{') {
            tokens.push({ type: TokenType.CurlyOpen, value: '{' })
            cursor++
            continue
        }

        if (char === '}') {
            tokens.push({ type: TokenType.CurlyClose, value: '}' })
            cursor++
            continue
        }

        if (char === ':') {
            tokens.push({ type: TokenType.Colon, value: ':' })
            cursor++
            continue
        }

        if (isAlphaNumeric(char)) {
            let value = ''
            while (isAlphaNumeric(input[cursor])) {
                value += input[cursor]
                cursor++
            }
            tokens.push({ type: TokenType.Identifier, value })
            continue
        }

        tokens.push({ type: TokenType.EOF, value: 'EOF' })
        //console.log('Unexpected character:', char);
        cursor++
    }

    return tokens
}
