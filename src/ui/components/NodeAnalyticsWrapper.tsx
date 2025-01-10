import React, { useContext } from 'react'
import { NodeAnalyticsContext } from '../context/NodeAnalyticsContext'
import { IAnalyticsNodeMetadata } from '../contracts/contracts'
import { ErrorBoundary } from './ErrorBoundary'

interface INodeAnalyticsWrapperProps {
    children: React.ReactNode
    node: IAnalyticsNodeMetadata
}

export const AnalyticsNodeWrapper: React.FC<INodeAnalyticsWrapperProps> = ({
    children,
    node,
}) => {
    const analyticsContext = useContext(NodeAnalyticsContext)

    const onRender = () => {
        if (node.analyticsEvents.onRender) {
            analyticsContext.trackEvent(node.analyticsEvents.onRender, {
                nodeId: node.nodeId,
                nodeName: node.nodeName,
                zone: node.zone,
            })
        }
    }

    const onUnmount = () => {
        if (node.analyticsEvents.onUnmount) {
            analyticsContext.trackEvent(node.analyticsEvents.onUnmount, {
                nodeId: node.nodeId,
                nodeName: node.nodeName,
                zone: node.zone,
            })
        }
    }

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

    React.useEffect(() => {
        onRender()
        return onUnmount
    }, [])

    return <ErrorBoundary flagError={onRenderError}>{children}</ErrorBoundary>
}
