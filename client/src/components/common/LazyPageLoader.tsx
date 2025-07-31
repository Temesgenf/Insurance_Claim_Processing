import React, { Suspense, Component, type ReactNode } from 'react';
import { usePerformanceMonitor } from '../../hooks/usePerformance';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Error Boundary for lazy loaded components
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 text-center mb-4">
            We're having trouble loading this page. Please try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced loading component with skeleton
const EnhancedPageLoader: React.FC = () => {
  const { renderCount } = usePerformanceMonitor('PageLoader');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Skeleton loader */}
      <div className="w-full max-w-md mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {/* Header skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="flex space-x-2 pt-4">
            <div className="h-10 bg-gray-300 rounded w-20"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
      
      {/* Spinner */}
      <div className="mt-8">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-brand-400 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
        </div>
        <p className="mt-4 text-sm text-gray-500">Loading page...</p>
        {renderCount > 1 && (
          <p className="mt-2 text-xs text-gray-400">Taking longer than usual...</p>
        )}
      </div>
    </div>
  );
};

// Lazy wrapper component with error boundary and performance monitoring
interface LazyPageWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

const LazyPageWrapper: React.FC<LazyPageWrapperProps> = ({ 
  children, 
  fallback = <EnhancedPageLoader />,
  errorFallback 
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyPageWrapper;
export { EnhancedPageLoader, ErrorBoundary }; 