import { Environment, environmentService, EnvironmentType } from '../services'
import { IPreviewNode, IRenderNode } from '../types/nodeInterfaces'
import { ICoordinates, INode, Style } from '../types/nodeTypes'

export abstract class BaseNode implements IPreviewNode, IRenderNode, INode {
    public id: string = ''
    public parent: BaseNode | null = null
    public name: string = ''
    public zone: string = ''
    public children: BaseNode[]
    public optional: boolean = false
    public multiple: boolean = false
    public coordinates: ICoordinates | undefined = undefined
    public style: Style | undefined = undefined

    constructor(
        children?: BaseNode[],
        zone: string = '',
        coordinates?: ICoordinates,
        style?: Style
    ) {
        this.children = children || []
        this.zone = zone
        this.coordinates = coordinates
        this.style = style
    }

    abstract render(): string | null

    public preview(): string | null {
        return ''
    }

    public renderNode(): string {
        if (
            environmentService.getVariable(Environment.OUTPUT_TYPE) ===
            EnvironmentType.Preview
        ) {
            return this.preview() || ''
        }

        return this.render() || ''
    }
}
