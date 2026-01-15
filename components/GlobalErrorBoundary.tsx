'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { getAllUserInfo } from '@/utils/userInfo';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    context?: string; // e.g., "Generic", "Quest", "Payment"
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    eventId: string | null;
}

/**
 * Global Error Boundary
 * Catches JavaScript errors anywhere in the child component tree,
 * logs them to the backend, and displays a fallback UI.
 */
class GlobalErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            eventId: null
        };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error: error,
            errorInfo: null,
            eventId: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log the error to state for display
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log the error to the backend
        this.logErrorToBackend(error, errorInfo);
    }

    async logErrorToBackend(error: Error, errorInfo: ErrorInfo) {
        try {
            // Collect user info for context (don't block on this)
            let userInfo = null;
            try {
                userInfo = await getAllUserInfo({ includeLocation: false });
            } catch (e) {
                console.warn('Failed to get user info for error log', e);
            }

            const errorData = {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo.componentStack,
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                context: this.props.context || 'Global',
                userInfo: userInfo
            };

            const response = await fetch('/api/logging/client-error', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(errorData),
            });

            const result = await response.json();
            if (result.eventId) {
                this.setState({ eventId: result.eventId });
            }

        } catch (loggingError) {
            // Fallback: just console log if the logging itself fails
            console.error('Failed to send error report to backend:', loggingError);
        }
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50 rounded-lg border border-gray-200 m-4">
                    <div className="bg-red-100 p-4 rounded-full mb-6">
                        <AlertCircle className="w-12 h-12 text-red-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-gilroy-bold">
                        Something went wrong
                    </h2>

                    <p className="text-gray-600 mb-6 max-w-md font-gilroy-medium">
                        We've logged this error and notified our team. Please try refreshing the page.
                    </p>

                    <div className="bg-white p-4 rounded-md border border-gray-200 text-left w-full max-w-2xl mb-8 overflow-auto max-h-60 shadow-inner">
                        <p className="font-mono text-red-600 text-sm font-bold mb-2 wrap-break-word">
                            {this.state.error?.toString()}
                        </p>
                        {this.state.eventId && (
                            <p className="font-mono text-gray-400 text-xs mt-2">
                                Reference ID: {this.state.eventId}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={this.handleReload}
                        className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-gilroy-bold"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
