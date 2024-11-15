import React from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Description générée</h3>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copié !
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4 mr-2" />
              Copier
            </>
          )}
        </button>
      </div>
      <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
    </div>
  );
}