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
                    button(text: Continue, label: continue);
                    button(text: Restart, label: restart);
                    button(text: Exit, label: exit);
                }
                contents{
                    tagList(textBlock: 24m26s, tag: 24m26s);
                }
            }
        hero {
                actions {
                    button(text: Continue, label: continue);
                    button(text: Restart, label: restart);
                    button(text: Exit, label: exit);
                }
                contents{
                    tagList(textBlock: 24m26s, tag: 24m26s);
                }
            }
        }
    `
    const ast = parser.produceAST(input)
    console.log(ast)
}
