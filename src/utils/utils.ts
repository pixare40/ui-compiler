export const isString = (input: any): input is string =>
    typeof input === 'string'

export function throwApplicationError(message: string, options?: any) {
    console.error(message, options)
    throw new Error(message)
}
