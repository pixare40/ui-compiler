export enum Environment {
    OUTPUT_TYPE = 'OUTPUT_TYPE',
}

export enum EnvironmentType {
    Preview = 'preview',
    Template = 'template',
}

export interface IEnvironmentService {
    getEnvironment(key: Environment): string
    setEnvironment(key: Environment, value: string): void
}

class EnvironmentService {
    private readonly environmentVariables: Map<string, string>
    constructor() {
        this.environmentVariables = new Map<string, string>()
    }
    public getVariable(key: Environment): string {
        return this.environmentVariables.get(key) || ''
    }

    public setVariable(key: Environment, value: string) {
        this.environmentVariables.set(key, value)
    }
}

export const environmentService = new EnvironmentService()
