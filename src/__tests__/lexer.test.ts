import { tokenize, TokenType } from '../compiler/lexer'

test('tokenize with components', () => {
    const input = `
        hero {
            actions {
                button {
                    (text: "Restart")
                    (label: "restart")
                }
                button {
                    text: "Pause"
                    label: "pause"
                }
            }
        }
    `
    const tokens = tokenize(input)

    expect(tokens).toEqual([
        { type: TokenType.Identifier, value: 'hero' },
        { type: TokenType.OpenBrace, value: '{' },
        { type: TokenType.Identifier, value: 'actions' },
        { type: TokenType.OpenBrace, value: '{' },
        { type: TokenType.Identifier, value: 'button' },
        { type: TokenType.OpenBrace, value: '{' },
        { type: TokenType.Identifier, value: 'text' },
        { type: TokenType.Identifier, value: 'Restart' },
        { type: TokenType.Identifier, value: 'label' },
        { type: TokenType.Identifier, value: 'restart' },
        { type: TokenType.CloseBrace, value: '}' },
        { type: TokenType.Identifier, value: 'button' },
        { type: TokenType.OpenBrace, value: '{' },
        { type: TokenType.Identifier, value: 'text' },
        { type: TokenType.Identifier, value: 'Pause' },
        { type: TokenType.Identifier, value: 'label' },
        { type: TokenType.Identifier, value: 'pause' },
        { type: TokenType.CloseBrace, value: '}' },
        { type: TokenType.CloseBrace, value: '}' },
        { type: TokenType.CloseBrace, value: '}' },
    ])
})
