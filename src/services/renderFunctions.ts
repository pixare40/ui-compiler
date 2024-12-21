import { vNode } from '../ui-models/types'

export const renderFunctions = new Map<string, Function>([
    ['hero', hero],
    ['actions', actions],
    ['contents', contents],
    ['button', button],
])

export function hero(): vNode {
    return {
        nodeName: 'hero',
        attributes: {},
        children: [],
    }
}

export function actions(): vNode {
    return {
        nodeName: 'actions',
        attributes: {},
        children: [],
    }
}

export function contents(): vNode {
    return {
        nodeName: 'contents',
        attributes: {},
        children: [],
    }
}

export function button(): vNode {
    return {
        nodeName: 'button',
        attributes: {},
        children: [],
    }
}

export function render(node: vNode) {
    return node
}
