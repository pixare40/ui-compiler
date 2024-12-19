export interface vNode {
    nodeName: string
    zone?: string
    attributes: object
    children: vNode[]
}
