"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("./compiler/parser"));
const services_1 = require("./services");
const nodeTypes_1 = require("./types/nodeTypes");
repl();
function repl() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Welcome to UI (Read OOOWEEEEE like Mr. Poopybutthole) REPL! v1.0.0');
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
    `;
        const parser = new parser_1.default();
        const ast = parser.produceAST(input);
        console.log('Template AST:', ast);
        services_1.environmentService.setVariable(services_1.Environment.OUTPUT_TYPE, services_1.EnvironmentType.Preview);
        // Generating a preview template
        const templateGenerator = new services_1.VesperTemplateGenerator(parser);
        const output = templateGenerator.generate(input);
        const formattedOutput = JSON.stringify(JSON.parse(output), null, 4);
        console.log('Output:', formattedOutput);
        const noteTypesRegistered = nodeTypes_1.INode.GetImplementations();
        console.log('Node Types:', noteTypesRegistered);
    });
}
