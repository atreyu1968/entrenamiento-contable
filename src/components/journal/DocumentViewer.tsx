import React from 'react';
import { FileText } from 'lucide-react';
import Spinner from '../ui/Spinner';

interface Props {
  url: string;
  onDocumentLoad?: () => void;
}

export default function DocumentViewer({ url, onDocumentLoad }: Props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      onDocumentLoad?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Spinner size="lg" />
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-500 text-center">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <iframe
            src={url}
            className="w-full h-full min-h-[600px] rounded-lg shadow-lg"
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}