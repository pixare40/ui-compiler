import Parser from './parser'

repl()

async function repl() {
    const parser = new Parser()
    console.log('Welcome to UI (Read OOOWEEEEE Like Mr. Poopybutthole) REPL! v1.0.0')
    const input = `
        (a + b)
    `
    const ast = parser.produceAST(input)
    console.log(ast)
}
