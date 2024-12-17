import React from 'react';
import { File, FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  url: string;
  date: string;
}

interface Props {
  documents: Document[];
  selectedId: string | null;
  onSelect: (document: Document) => void;
}

export default function DocumentList({ documents, selectedId, onSelect }: Props) {
  return (
    <div className="h-full bg-white border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Documentos</h2>
      </div>
      <div className="overflow-auto h-[calc(100%-4rem)]">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelect(doc)}
            className={`w-full flex items-center p-4 hover:bg-gray-50 border-b ${
              selectedId === doc.id ? 'bg-orange-50' : ''
            }`}
          >
            {doc.url.endsWith('.pdf') ? (
              <FileText className="h-6 w-6 text-orange-500" />
            ) : (
              <File className="h-6 w-6 text-gray-400" />
            )}
            <div className="ml-3 text-left">
              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
              <p className="text-xs text-gray-500">{doc.date}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}