import Parser from './compiler/parser'

repl()

async function repl() {
    const parser = new Parser()
    console.log(
        'Welcome to UI (Read OOOWEEEEE Like Mr. Poopybutthole) REPL! v1.0.0'
    )
    const input = `
        hero(zone: 'A') {
                actions {
                    button(text: 'Continue', label: 'continue')
                }
                contents{
                    tagList(textBlock: '24m 26s', tag: '24m 26s')
                }
            }
    `
    const ast = parser.produceAST(input)

    console.log('Template AST:', ast)
}
