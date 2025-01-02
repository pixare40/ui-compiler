import { vNode } from '../compiler/ast'
import { BaseNode } from '../ui-models/base'
import { Button } from '../ui-models/button'
import { Hero } from '../ui-models/hero'

export const renderFunctions = new Map<string, Function>([
    ['hero', hero],
    ['actions', actions],
    ['contents', content],
    ['button', button],
])

export function hero(node: vNode): BaseNode {
    const children = node.children?.map((child) => render(child)).join(',')
    const zone =
        node.attributes?.find((attr) => attr.key.symbol === 'zone')?.value
            .symbol || ''
    const hero = new Hero(children, zone)
    return hero
}

export function actions(node: vNode): BaseNode {}

export function content(node: vNode): BaseNode {
    
}

export function button(node: vNode): BaseNode {
    // get button text and label
    const text =
        node.attributes?.find((attr) => attr.key.symbol === 'text')?.value
            .symbol || ''
    const label =
        node.attributes?.find((attr) => attr.key.symbol === 'label')?.value
            .symbol || ''

    if (!text || !label) {
        throw new Error('Button must have text and label')
    }

    const button = new Button(text, label)
    return button
}

export function render(node: vNode): BaseNode[] {
    const renderFunction = renderFunctions.get(node.name)
    if (!renderFunction) {
        throw new Error(`No render function found for ${node.name}`)
    }
    return renderFunction(node)
}
