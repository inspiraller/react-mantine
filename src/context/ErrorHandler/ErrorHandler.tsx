import React, { Component, ReactNode } from 'react';

import { GenericError } from './GenericError';
import { TanstackError } from '@/types/Error';

const { NODE_ENV } = process.env;

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorHandlerProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorHandler extends Component<
  ErrorHandlerProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorHandlerProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (NODE_ENV === 'development') {
      console.error('Error caught by ErrorHandler:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <GenericError
          handleRetry={this.handleRetry}
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

// Hook for handling async errors
export const useErrorHandler = () => {
  const handleError = (error: Error | TanstackError | unknown) => {
    console.error(error);
    // if (error instanceof Error) {
    //   console.error('Error:', error.message, error.stack);
    // } else if (
    //   typeof error === 'object' &&
    //   error !== null &&
    //   'message' in error
    // ) {
    //   console.error('API Error:', (error as TanstackError).message);
    // } else {
    //   console.error('Unknown error:', error);
    // }
  };

  return { handleError };
};

// Provider component for global error handling
export const ErrorHandlerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Here you can add global error reporting (e.g., Sentry, LogRocket, etc.)
    console.error('Global error caught:', error, errorInfo);

    // Example: Send to error reporting service
    // errorReportingService.captureException(error, { extra: errorInfo });
  };

  return <ErrorHandler onError={handleGlobalError}>{children}</ErrorHandler>;
};
