"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
exports.tokenize = tokenize;
var TokenType;
(function (TokenType) {
    TokenType["OpenParen"] = "OpenParen";
    TokenType["CloseParen"] = "CloseParen";
    TokenType["Identifier"] = "Identifier";
    TokenType["OpenBrace"] = "OpenBrace";
    TokenType["CloseBrace"] = "CloseBrace";
    TokenType["EOF"] = "EOF";
    TokenType["Colon"] = "Colon";
    TokenType["Comma"] = "Comma";
    TokenType["SingleQuote"] = "SingleQuote";
    TokenType["ForwardSlash"] = "ForwardSlash";
    TokenType["Period"] = "Period";
})(TokenType || (exports.TokenType = TokenType = {}));
function isAlpha(char) {
    return /[a-zA-Z]/.test(char);
}
function isDigit(char) {
    return /[0-9]/.test(char);
}
function isSkippable(char) {
    return /\s/.test(char);
}
function isAlphaNumeric(char) {
    return isAlpha(char) || isDigit(char);
}
function tokenize(input) {
    const tokens = [];
    let cursor = 0;
    while (cursor < input.length) {
        const char = input[cursor];
        if (char === '(') {
            tokens.push({ type: TokenType.OpenParen, value: '(' });
            cursor++;
            continue;
        }
        if (char === ')') {
            tokens.push({ type: TokenType.CloseParen, value: ')' });
            cursor++;
            continue;
        }
        if (char === '{') {
            tokens.push({ type: TokenType.OpenBrace, value: '{' });
            cursor++;
            continue;
        }
        if (char === '}') {
            tokens.push({ type: TokenType.CloseBrace, value: '}' });
            cursor++;
            continue;
        }
        if (char === ':') {
            tokens.push({ type: TokenType.Colon, value: ':' });
            cursor++;
            continue;
        }
        if (char === ',') {
            tokens.push({ type: TokenType.Comma, value: ',' });
            cursor++;
            continue;
        }
        if (char === '/') {
            tokens.push({ type: TokenType.ForwardSlash, value: '/' });
            cursor++;
            continue;
        }
        if (char === '.') {
            tokens.push({ type: TokenType.Period, value: '.' });
            cursor++;
            continue;
        }
        if (char === "'") {
            tokens.push({ type: TokenType.SingleQuote, value: "'" });
            cursor++;
            continue;
        }
        if (isAlphaNumeric(char)) {
            let value = '';
            while (isAlphaNumeric(input[cursor])) {
                value += input[cursor];
                cursor++;
            }
            tokens.push({ type: TokenType.Identifier, value });
            continue;
        }
        cursor++;
    }
    tokens.push({ type: TokenType.EOF, value: 'EOF' });
    return tokens;
}
