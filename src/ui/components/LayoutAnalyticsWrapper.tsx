import React, {
    useContext,
    useRef,
    useInsertionEffect,
    useLayoutEffect,
} from 'react'
import { NodeAnalyticsContext } from '../context/NodeAnalyticsContext'
import { IAnalyticsLayoutMetadata } from '../contracts/contracts'
import { ErrorBoundary } from './ErrorBoundary'

interface INodeAnalyticsWrapperProps {
    children: React.ReactNode
    node: IAnalyticsLayoutMetadata
}

export const LayoutAnalyticsWrapper: React.FC<INodeAnalyticsWrapperProps> = ({
    children,
    node,
}) => {
    const analyticsContext = useContext(NodeAnalyticsContext)
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

            if (node.analyticsEvents.onRender) {
                analyticsContext.trackEvent(node.analyticsEvents.onRender, {
                    nodeId: node.nodeId,
                    nodeName: node.nodeName,
                    zone: node.zone,
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
        if (node.analyticsEvents.onRenderError) {
            analyticsContext.trackEvent(node.analyticsEvents.onRenderError, {
                error: { error, errorInfo },
                nodeId: node.nodeId,
                nodeName: node.nodeName,
                zone: node.zone,
            })
        }
    }

    return <ErrorBoundary flagError={onRenderError}>{children}</ErrorBoundary>
}
