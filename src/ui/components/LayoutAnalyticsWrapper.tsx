import React, {
    useContext,
    useRef,
    useInsertionEffect,
    useLayoutEffect,
} from 'react'
import { LayoutNodeAnalyticsContext } from '../context/NodeAnalyticsContext'
import { IAnalyticsLayoutMetadata } from '../contracts/contracts'
import { ErrorBoundary } from './ErrorBoundary'

interface ILayoutNodeAnalyticsWrapperProps {
    children: React.ReactNode
    layout: IAnalyticsLayoutMetadata
}

export const LayoutAnalyticsWrapper: React.FC<
    ILayoutNodeAnalyticsWrapperProps
> = ({ children, layout }) => {
    const analyticsContext = useContext(LayoutNodeAnalyticsContext)
    const renderStartTime = useRef<number>(0)
    const paintTime = useRef<number>(0)

    // Pre-paint effect
    useInsertionEffect(() => {
        renderStartTime.current = performance.now()
    })

    // Post-layout effect
    useLayoutEffect(() => {
        // Measure after DOM mutations
        const layoutTime = performance.now() - renderStartTime.current

        // Setup PerformanceObserver for paint timing
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastPaint = entries[entries.length - 1]
            paintTime.current = lastPaint.startTime + lastPaint.duration

            if (layout.analyticsEvents.onRender) {
                analyticsContext.trackEvent(layout.analyticsEvents.onRender, {
                    nodeId: layout.nodeId,
                    nodeName: layout.nodeName,
                    zone: layout.zone,
                    renderDuration: layoutTime,
                    paintDuration: paintTime.current - renderStartTime.current,
                    timestamp: Date.now(),
                })
            } else {
                console.log('No onRender event')
            }

            observer.disconnect()
        })

        observer.observe({ entryTypes: ['paint'] })

        return () => observer.disconnect()
    })

    const onRenderError = (error: any, errorInfo: any) => {
        if (layout.analyticsEvents.onRenderError) {
            analyticsContext.trackEvent(layout.analyticsEvents.onRenderError, {
                error: { error, errorInfo },
                nodeId: layout.nodeId,
                nodeName: layout.nodeName,
                zone: layout.zone,
            })
        }
    }

    return <ErrorBoundary flagError={onRenderError}>{children}</ErrorBoundary>
}
