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

export interface IAnalyticsLayoutMetadata {
    nodeId: string
    nodeName: string
    zone: string
    parentId?: string
    analyticsEvents: INodeAnalyticsEvents
}

export interface IAnalyticsType {
    trackEvent: (event: string, data: any) => void
    trackPageView: (page: string) => void
    trackError: (error: any) => void
    trackTiming: (timing: string, data: any) => void
}
