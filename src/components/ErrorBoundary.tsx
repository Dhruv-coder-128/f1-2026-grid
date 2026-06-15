import { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="glass rounded-2xl border border-red-500/20 p-8 max-w-md text-center">
            <AlertTriangle size={48} className="text-f1-red mx-auto mb-4" />
            <h2 className="font-display font-bold text-xl text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 text-sm mb-4">We encountered an unexpected error. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-f1-red text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
