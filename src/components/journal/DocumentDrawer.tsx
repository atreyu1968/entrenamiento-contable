import React from 'react';
import { X, FileText, File } from 'lucide-react';
import DocumentViewer from './DocumentViewer';
import { Document } from '../../services/documentService';

interface Props {
  documents: Document[];
  selectedDoc: Document | null;
  onSelect: (doc: Document) => void;
  onClose: () => void;
}

export default function DocumentDrawer({ documents, selectedDoc, onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-y-0 right-0 w-[800px] bg-white shadow-xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Documentos</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Document List */}
        <div className="w-64 border-r overflow-auto">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelect(doc)}
              className={`w-full flex items-center p-4 hover:bg-gray-50 border-b ${
                selectedDoc?.id === doc.id ? 'bg-orange-50' : ''
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

        {/* Document Viewer */}
        <div className="flex-1">
          {selectedDoc && (
            <DocumentViewer url={selectedDoc.url} />
          )}
        </div>
      </div>
    </div>
  );
}