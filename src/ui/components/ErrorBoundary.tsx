import React from 'react'

interface ErrorBoundaryProps {
    children: React.ReactNode
    flagError: (error: any, errorInfo: any) => void
    fallback?: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_error: any) {
        return { hasError: true }
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.props.flagError?.(error, errorInfo)
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback || null
        }
        return this.props.children
    }
}
