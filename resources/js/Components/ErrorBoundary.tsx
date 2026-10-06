import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="text-center py-8">
                        <h2 className="text-xl font-bold text-red-600">
                            Something went wrong.
                        </h2>
                        <p className="text-gray-600">
                            Please refresh the page and try again.
                        </p>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
