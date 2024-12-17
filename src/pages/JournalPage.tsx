import React from 'react';
import { useNavigate } from 'react-router-dom';
import JournalEntryForm from '../components/journal/JournalEntryForm';
import ChartOfAccounts from '../components/accounting/ChartOfAccounts';
import LedgerView from '../components/accounting/LedgerView';
import DocumentDrawer from '../components/journal/DocumentDrawer';
import { useDocuments } from '../hooks/useDocuments';
import Spinner from '../components/ui/Spinner';
import { X, BookOpen, BarChart, FileText } from 'lucide-react';
import { AccountingEntry } from '../types';

export default function JournalPage() {
  const navigate = useNavigate();
  const { documents, isLoading, error } = useDocuments();
  const [selectedDoc, setSelectedDoc] = React.useState(documents[0]);
  const [showDocuments, setShowDocuments] = React.useState(false);
  const [entries, setEntries] = React.useState<AccountingEntry[]>([]);
  const [showChartOfAccounts, setShowChartOfAccounts] = React.useState(false);
  const [showLedger, setShowLedger] = React.useState(false);

  React.useEffect(() => {
    if (documents.length > 0 && !selectedDoc) {
      setSelectedDoc(documents[0]);
    }
  }, [documents]);

  const handleSaveEntries = React.useCallback((updatedEntries: AccountingEntry[]) => {
    setEntries(updatedEntries);
    // TODO: Implementar guardado en base de datos
  }, []);

  const handleExit = React.useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="h-14 bg-orange-500 text-white flex items-center justify-between px-4">
        <div>
          <h1 className="text-lg font-semibold">Diario Contable</h1>
          {selectedDoc && (
            <p className="text-sm text-white/80">
              Documento actual: {selectedDoc.name}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDocuments(true)}
            className="flex items-center px-3 py-1.5 text-white hover:bg-orange-600 rounded-md transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            Documentos
          </button>
          <button
            onClick={() => setShowChartOfAccounts(true)}
            className="flex items-center px-3 py-1.5 text-white hover:bg-orange-600 rounded-md transition-colors"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Plan Contable
          </button>
          <button
            onClick={() => setShowLedger(true)}
            className="flex items-center px-3 py-1.5 text-white hover:bg-orange-600 rounded-md transition-colors"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Mayor
          </button>
          <button
            onClick={handleExit}
            className="p-2 text-white hover:bg-orange-600 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* Document Preview */}
        {selectedDoc && (
          <div className="w-1/3 border-r">
            <DocumentViewer url={selectedDoc.url} />
          </div>
        )}
        
        {/* Journal Entries */}
        <div className={`${selectedDoc ? 'w-2/3' : 'w-full'}`}>
          <JournalEntryForm
            entries={entries}
            onSave={handleSaveEntries}
          />
        </div>
      </div>

      {/* Modals */}
      {showDocuments && (
        <DocumentDrawer
          documents={documents}
          selectedDoc={selectedDoc}
          onSelect={setSelectedDoc}
          onClose={() => setShowDocuments(false)}
        />
      )}
      {showChartOfAccounts && (
        <ChartOfAccounts onClose={() => setShowChartOfAccounts(false)} />
      )}
      {showLedger && (
        <LedgerView onClose={() => setShowLedger(false)} />
      )}
    </div>
  );
}