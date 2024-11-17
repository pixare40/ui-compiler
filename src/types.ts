export class Error {
    message: string
    context: any

    constructor(message: string, context: any) {
        this.message = message
        this.context = context
    }

    toString(): string {
        return `${this.message} at ${this.context}`
    }
}
