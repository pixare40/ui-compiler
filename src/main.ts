import Parser from './parser'

repl()

async function repl() {
    const parser = new Parser()
    console.log(
        'Welcome to UI (Read OOOWEEEEE Like Mr. Poopybutthole) REPL! v1.0.0'
    )
    const input = `
        {
        hero {
                actions {
                    button1(text: Continue, label: continue);
                    button2(text: Restart, label: restart);
                }
            }
        }
    `
    const ast = parser.produceAST(input)
    console.log(ast)
}
