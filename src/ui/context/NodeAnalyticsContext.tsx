import React, { createContext } from 'react'
import { IAnalyticsProvider } from '../contracts/contracts'

const INITIAL_NODE_ANALYTICS_CONTEXT_VALUE: ILayoutNodeAnalyticsContextValue = {
    trackEvent: () => {},
}

export const LayoutNodeAnalyticsContext =
    createContext<ILayoutNodeAnalyticsContextValue>(
        INITIAL_NODE_ANALYTICS_CONTEXT_VALUE
    )

interface ILayoutNodeAnalyticsProviderProps {
    children: React.ReactNode
    analyticsProvider: IAnalyticsProvider[]
}

interface ILayoutNodeAnalyticsContextValue {
    trackEvent: (event: string, data: any) => void
}

export const LayoutNodeAnalyticsProvider: React.FC<
    ILayoutNodeAnalyticsProviderProps
> = ({ children, analyticsProvider }) => {
    const trackEvent = (event: string, data: any) => {
        analyticsProvider.forEach((provider) =>
            provider?.trackEvent(event, data)
        )
    }

    return (
        <LayoutNodeAnalyticsContext.Provider value={{ trackEvent }}>
            {children}
        </LayoutNodeAnalyticsContext.Provider>
    )
}
