"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("../compiler/lexer");
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
    `;
    const tokens = (0, lexer_1.tokenize)(input);
    expect(tokens).toEqual([
        { type: lexer_1.TokenType.Identifier, value: 'hero' },
        { type: lexer_1.TokenType.OpenBrace, value: '{' },
        { type: lexer_1.TokenType.Identifier, value: 'actions' },
        { type: lexer_1.TokenType.OpenBrace, value: '{' },
        { type: lexer_1.TokenType.Identifier, value: 'button' },
        { type: lexer_1.TokenType.OpenBrace, value: '{' },
        { type: lexer_1.TokenType.Identifier, value: 'text' },
        { type: lexer_1.TokenType.Identifier, value: 'Restart' },
        { type: lexer_1.TokenType.Identifier, value: 'label' },
        { type: lexer_1.TokenType.Identifier, value: 'restart' },
        { type: lexer_1.TokenType.CloseBrace, value: '}' },
        { type: lexer_1.TokenType.Identifier, value: 'button' },
        { type: lexer_1.TokenType.OpenBrace, value: '{' },
        { type: lexer_1.TokenType.Identifier, value: 'text' },
        { type: lexer_1.TokenType.Identifier, value: 'Pause' },
        { type: lexer_1.TokenType.Identifier, value: 'label' },
        { type: lexer_1.TokenType.Identifier, value: 'pause' },
        { type: lexer_1.TokenType.CloseBrace, value: '}' },
        { type: lexer_1.TokenType.CloseBrace, value: '}' },
        { type: lexer_1.TokenType.CloseBrace, value: '}' },
    ]);
});
