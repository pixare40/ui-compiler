function $parcel$export(e, n, v, s) {
    Object.defineProperty(e, n, {
        get: v,
        set: s,
        enumerable: true,
        configurable: true,
    })
}

$parcel$export(
    module.exports,
    'tokenize',
    () => $b7000f98844c3676$export$660b2ee2d4fb4eff
)
var $b7000f98844c3676$export$f435f793048e7a0f
;(function (TokenType) {
    TokenType['OpenParen'] = 'OpenParen'
    TokenType['CloseParen'] = 'CloseParen'
    TokenType['Identifier'] = 'Identifier'
    TokenType['CurlyOpen'] = 'CurlyOpen'
    TokenType['CurlyClose'] = 'CurlyClose'
    TokenType['EOF'] = 'EOF'
})(
    $b7000f98844c3676$export$f435f793048e7a0f ||
        ($b7000f98844c3676$export$f435f793048e7a0f = {})
)
function $b7000f98844c3676$var$isAlpha(char) {
    return /[a-zA-Z]/.test(char)
}
function $b7000f98844c3676$var$isDigit(char) {
    return /[0-9]/.test(char)
}
function $b7000f98844c3676$var$isSkippable(char) {
    return /\s/.test(char)
}
function $b7000f98844c3676$var$isAlphaNumeric(char) {
    return (
        $b7000f98844c3676$var$isAlpha(char) ||
        $b7000f98844c3676$var$isDigit(char)
    )
}
function $b7000f98844c3676$export$660b2ee2d4fb4eff(input) {
    const tokens = []
    let cursor = 0
    while (cursor < input.length) {
        const char = input[cursor]
        if (char === '(') {
            tokens.push({
                type: 'OpenParen',
                value: '(',
            })
            cursor++
            continue
        }
        if (char === ')') {
            tokens.push({
                type: 'CloseParen',
                value: ')',
            })
            cursor++
            continue
        }
        if (char === '{') {
            tokens.push({
                type: 'CurlyOpen',
                value: '{',
            })
            cursor++
            continue
        }
        if (char === '}') {
            tokens.push({
                type: 'CurlyClose',
                value: '}',
            })
            cursor++
            continue
        }
        if ($b7000f98844c3676$var$isAlphaNumeric(char)) {
            let value = ''
            while ($b7000f98844c3676$var$isAlphaNumeric(input[cursor])) {
                value += input[cursor]
                cursor++
            }
            tokens.push({
                type: 'Identifier',
                value: value,
            })
            continue
        }
        tokens.push({
            type: 'EOF',
            value: 'EOF',
        })
        //console.log('Unexpected character:', char);
        cursor++
    }
    return tokens
}

//# sourceMappingURL=main.js.map
