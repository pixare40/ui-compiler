import { vNode } from '../compiler/ast'
import { BaseNode } from '../ui-models/base'
import { Button } from '../ui-models/button'
import { GenericNode } from '../ui-models/generic'
import { Header } from '../ui-models/header'
import { Hero } from '../ui-models/hero'
import { Image } from '../ui-models/image'
import { TagList } from '../ui-models/tagList'

export type BranchNodeProcessor = (node: vNode) => BaseNode

export const branchNodeProcessorRegistry = new Map<string, BranchNodeProcessor>(
    [
        ['hero', hero],
        ['actions', actions],
        ['contents', content],
        ['button', button],
        ['tagList', tagList],
        ['image', image],
        ['header', header],
    ]
)

export function hero(node: vNode): BaseNode {
    const children: BaseNode[] = []

    // TODO: Add zone to hero from the zone property defined on the vNode
    const zone =
        node.attributes?.find((attr) => attr.key.symbol === 'zone')?.value
            .symbol || ''
    node.children?.forEach((child) => {
        children.push(processBranch(child))
    })
    const hero = new Hero(children, zone || '')
    return hero
}

export function actions(node: vNode): BaseNode {
    const children: BaseNode[] = []
    node.children?.forEach((child) => {
        children.push(processBranch(child))
    })

    const actionNode = new GenericNode(children, node.zone || '')
    actionNode.name = 'actions'
    actionNode.render = () => {
        return ``
    }
    actionNode.preview = () => {
        return `[
                ${actionNode.children.map((child) => child.renderNode()).join(',')}
            ]`
    }

    return actionNode
}

export function content(node: vNode): BaseNode {
    const children: BaseNode[] = []
    node.children?.forEach((child) => {
        children.push(processBranch(child))
    })

    const contentNode = new GenericNode(children, node.zone || '')
    contentNode.name = 'content'
    contentNode.render = () => {
        return ``
    }
    contentNode.preview = () => {
        return `[
                ${contentNode.children.map((child) => child.renderNode()).join(',')}
            ]`
    }

    return contentNode
}

export function tagList(node: vNode): BaseNode {
    return new TagList()
}

export function image(node: vNode): BaseNode {
    const source =
        node.attributes?.find((attr) => attr.key.symbol === 'source')?.value
            .symbol || ''
    return new Image(source)
}

export function header(node: vNode): BaseNode {
    const text =
        node.attributes?.find((attr) => attr.key.symbol === 'text')?.value
            .symbol || ''
    return new Header(text)
}

export function button(node: vNode): BaseNode {
    // get button text and label
    const text =
        node.attributes?.find((attr) => attr.key.symbol === 'text')?.value
            .symbol || ''
    const label =
        node.attributes?.find((attr) => attr.key.symbol === 'label')?.value
            .symbol || ''
    const type =
        node.attributes?.find((attr) => attr.key.symbol === 'type')?.value
            .symbol || 'primary'
    const action =
        node.attributes?.find((attr) => attr.key.symbol === 'action')?.value
            .symbol || ''

    if (!text || !label) {
        throw new Error('Button must have text and label')
    }

    const button = new Button(text, label, type, action, node.zone || '')

    return button
}

/**
 * This function takes a vNode and returns a BaseNode and also renders all the children of the vNode
 * @param node
 * @returns
 */
export function processBranch(node: vNode): BaseNode {
    const renderFunction = branchNodeProcessorRegistry.get(node.name)
    if (!renderFunction) {
        throw new Error(`No render function found for ${node.name}`)
    }
    return renderFunction(node)
}
