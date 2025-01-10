export interface IAnalyticsProvider {
    trackEvent: (event: string, data: any) => void
}

export interface INodeAnalyticsEvents {
    onMount?: string
    onUnmount?: string
    onRender?: string
    onRenderError?: string
    onInteraction?: string
}

export interface IAnalyticsNodeMetadata {
    nodeId: string
    nodeName: string
    zone: string
    parentId?: string
    analyticsEvents: INodeAnalyticsEvents
}
