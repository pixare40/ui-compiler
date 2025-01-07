export const environment = new Map<string, string>()

export enum Environment {
    ENV = 'ENV',
    PORT = 'PORT',
}

export enum EnvironmentType {
    Test = 'test',
    Preview = 'dev',
    Production = 'production',
}