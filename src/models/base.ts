export abstract class BaseNode {
    public propertyName: string = ''
    public zone: string = ''
    public children: BaseNode[] = []
    abstract renderTemplate(): string | null
}
