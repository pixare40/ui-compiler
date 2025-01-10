import React, { createContext } from 'react'
import { IAnalyticsProvider } from '../contracts/contracts'

const INITIAL_NODE_ANALYTICS_CONTEXT_VALUE: INodeAnalyticsContextValue = {
    trackEvent: () => {},
}

export const NodeAnalyticsContext = createContext<INodeAnalyticsContextValue>(
    INITIAL_NODE_ANALYTICS_CONTEXT_VALUE
)

interface NodeAnalyticsProviderProps {
    children: React.ReactNode
    analyticsProvider: IAnalyticsProvider[]
}

interface INodeAnalyticsContextValue {
    trackEvent: (event: string, data: any) => void
}

export const NodeAnalyticsProvider: React.FC<NodeAnalyticsProviderProps> = ({
    children,
    analyticsProvider,
}) => {
    const trackEvent = (event: string, data: any) => {
        analyticsProvider.forEach((provider) =>
            provider.trackEvent(event, data)
        )
    }

    return (
        <NodeAnalyticsContext.Provider value={{ trackEvent }}>
            {children}
        </NodeAnalyticsContext.Provider>
    )
}
