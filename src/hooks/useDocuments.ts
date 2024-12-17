import { useState, useEffect } from 'react';
import { Document, fetchDocuments } from '../services/documentService';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        setIsLoading(true);
        setError(null);
        const docs = await fetchDocuments();
        setDocuments(docs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar documentos');
      } finally {
        setIsLoading(false);
      }
    }

    loadDocuments();
  }, []);

  return { documents, isLoading, error };
}