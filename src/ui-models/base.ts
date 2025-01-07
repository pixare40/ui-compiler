import { environment } from '../services/environment'
import { ICoordinates } from '../types/coordinates'

export abstract class BaseNode {
    public propertyName: string = ''
    public zone: string = ''
    public children: BaseNode[]
    public optional: boolean = false
    public multiple: boolean = false
    public coordinates: ICoordinates | undefined = undefined

    constructor(
        children?: BaseNode[],
        zone: string = '',
        coordinates?: ICoordinates
    ) {
        this.children = children || []
        this.zone = zone
        this.coordinates = coordinates
    }

    abstract render(): string | null
    
    protected test(): string | null {
        return ''
    }

    public renderNode(): string {
        if (environment.get('ENV') === 'test') {
            return this.test() || ''
        }

        return this.render() || ''
    }
}
