"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_1 = require("./ast");
const lexer_1 = require("./lexer");
const utils_1 = require("../utils/utils");
const error_constants_1 = require("../constants/error_constants");
class Parser {
    constructor() {
        this.tokens = [];
    }
    notEOF() {
        return this.tokens[0].type !== lexer_1.TokenType.EOF;
    }
    advance() {
        return this.tokens.shift();
    }
    currentToken() {
        return this.tokens[0];
    }
    parseAttributeValue() {
        const token = this.advance();
        // Handle the case where the attribute value is an identifier i.e boolean and numeric values
        if (token.type === lexer_1.TokenType.Identifier) {
            if (token.value !== 'true' &&
                token.value !== 'false' &&
                isNaN(Number(token.value))) {
                throw (0, utils_1.throwApplicationError)(`${error_constants_1.ErrorValueObject.InvalidValue} parsing attribute value, expected boolean or numeric value, got`, token.value);
            }
            return {
                kind: ast_1.KindValueObject.Identifier,
                symbol: token.value,
            };
        }
        if (token.type !== lexer_1.TokenType.SingleQuote) {
            throw (0, utils_1.throwApplicationError)(`${error_constants_1.ErrorValueObject.UnexpectedToken} parsing attribute value, Excpected opening single quote, got`, token.value);
        }
        let value = '';
        while (this.currentToken().type !== lexer_1.TokenType.SingleQuote) {
            value += this.advance().value;
            // if value starts with https or http, then it is a url so don't add space between the values
            if (value.startsWith('https') || value.startsWith('http')) {
                continue;
            }
            if (this.currentToken().type !== lexer_1.TokenType.SingleQuote) {
                value += ' '; // this is the case when the attribute value is a string
            }
        }
        if (this.currentToken().type !== lexer_1.TokenType.SingleQuote) {
            throw (0, utils_1.throwApplicationError)(`${error_constants_1.ErrorValueObject.UnexpectedToken} parsing attribute value, Excpected closing single quote, got`, this.currentToken().value);
        }
        this.advance();
        return {
            kind: ast_1.KindValueObject.Identifier,
            symbol: value,
        };
    }
    parseAttribute() {
        const keyToken = this.advance();
        if (this.currentToken().type !== lexer_1.TokenType.Colon) {
            throw (0, utils_1.throwApplicationError)(`${error_constants_1.ErrorValueObject.UnexpectedToken} parsing attribute, expected colon, got`, keyToken.value);
        }
        this.advance();
        const attributeValue = this.parseAttributeValue();
        return {
            kind: ast_1.KindValueObject.Property,
            key: {
                kind: ast_1.KindValueObject.Identifier,
                symbol: keyToken.value,
            },
            value: attributeValue,
        };
    }
    parseAttributes() {
        const token = this.currentToken();
        if (token.type !== lexer_1.TokenType.Identifier) {
            throw (0, utils_1.throwApplicationError)(`${error_constants_1.ErrorValueObject.UnexpectedToken} parsing attributes, expected identifier, got`, token.value);
        }
        const attributes = [];
        while (this.currentToken().type !== lexer_1.TokenType.CloseParen) {
            attributes.push(this.parseAttribute());
            if (this.currentToken().type === lexer_1.TokenType.Comma) {
                this.advance();
            }
        }
        this.advance();
        return attributes;
    }
    parseNode() {
        var _a;
        const component = {
            kind: ast_1.KindValueObject.Node,
            name: '',
            attributes: [],
            children: [],
        };
        const token = this.advance();
        if (token.type !== lexer_1.TokenType.Identifier) {
            throw (0, utils_1.throwApplicationError)(`${error_constants_1.ErrorValueObject.UnexpectedToken} parsing component, expected identifier, got`, token.value);
        }
        component.name = token.value;
        if (this.currentToken().type === lexer_1.TokenType.OpenParen) {
            this.advance();
            component.attributes = this.parseAttributes();
        }
        if (this.currentToken().type === lexer_1.TokenType.OpenBrace) {
            this.advance();
            while (this.currentToken().type !== lexer_1.TokenType.CloseBrace) {
                (_a = component.children) === null || _a === void 0 ? void 0 : _a.push(this.parseNode());
            }
            this.advance();
        }
        return component;
    }
    parseStatement() {
        const token = this.currentToken();
        if (token.type === lexer_1.TokenType.Identifier) {
            return this.parseNode();
        }
        throw (0, utils_1.throwApplicationError)(`${error_constants_1.ErrorValueObject.UnexpectedToken} parsing statement, expected identifier, got`, token.value);
    }
    produceAST(input) {
        this.tokens = (0, lexer_1.tokenize)(input);
        const template = {
            kind: ast_1.KindValueObject.Template,
            body: [],
        };
        while (this.notEOF()) {
            template.body.push(this.parseStatement());
        }
        return template;
    }
}
exports.default = Parser;
