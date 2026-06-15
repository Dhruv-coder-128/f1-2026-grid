import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Failed to load data', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-f1-red/10 flex items-center justify-center mb-4 border border-f1-red/20">
        <AlertTriangle className="text-f1-red" size={28} />
      </div>
      <h3 className="font-display font-bold text-xl text-white mb-2">{message}</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-md">
        We couldn't fetch the latest data. Please check your connection or try again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-f1-red text-white font-bold rounded-md hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      )}
    </div>
  );
}
