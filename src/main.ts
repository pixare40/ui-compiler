import Parser from './compiler/parser'
import { Environment, environmentService, EnvironmentType } from './services'
import { VesperTemplateGenerator } from './services/VesperTemplateGenerator'

repl()

async function repl() {
    console.log(
        'Welcome to UI (Read OOOWEEEEE like Mr. Poopybutthole) REPL! v1.0.0'
    )
    const input = `
        hero(zone: 'A') {
                actions {
                    button(text: 'Continue', label: 'continue', type: 'primary', action: 'play')
                }
                contents{
                    tagList(textBlock: '24m 26s', tag: '24m 26s')
                }
                image(source: 'https://via.placeholder.com/150')
                header(text: 'This is a test hero header')
            }
    `

    const parser = new Parser()

    const ast = parser.produceAST(input)

    console.log('Template AST:', ast)

    environmentService.setVariable(
        Environment.OUTPUT_TYPE,
        EnvironmentType.Template
    )

    // Generating a preview template

    const templateGenerator = new VesperTemplateGenerator(parser)

    const output = templateGenerator.generate(input)

    const formattedOutput = JSON.stringify(JSON.parse(output), null, 4)

    console.log('Output:', formattedOutput)
}
