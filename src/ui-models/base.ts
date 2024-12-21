export abstract class BaseNode {
    public propertyName: string = ''
    public zone: string = ''
    public children: BaseNode[]
    public optional: boolean = false
    public multiple: boolean = false
    abstract renderTemplate(): string | null

    constructor(children?: BaseNode[], zone: string = '') {
        this.children = children || []
        this.zone = zone
    }
}
