import Parser from './compiler/parser'
import { TemplateGenerator } from './services/templateGenerator'

repl()

async function repl() {
    const parser = new Parser()
    console.log(
        'Welcome to UI (Read OOOWEEEEE like Mr. Poopybutthole) REPL! v1.0.0'
    )
    const input = `
        hero(zone: 'A') {
                actions {
                    button(text: 'Continue', label: 'continue', type: 'primary', action: 'continue')
                }
                contents{
                    tagList(textBlock: '24m 26s', tag: '24m 26s')
                }
                image(source: 'https://via.placeholder.com/150')
                header(text: 'This is a test hero header')
            }
    `
    const ast = parser.produceAST(input)

    // Generate template test
    const template = new TemplateGenerator(parser)

    const output = template.generateTemplate(input)

    console.log('Template AST:', ast)
    console.log('Output:', output)
}
