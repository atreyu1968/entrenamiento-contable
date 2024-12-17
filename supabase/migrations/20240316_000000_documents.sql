-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT CHECK (type IN ('invoice', 'receipt', 'bank_statement', 'other')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create trigger for updated_at
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Documents are viewable by authenticated users"
ON documents FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own documents"
ON documents FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Storage policies
CREATE POLICY "Authenticated users can view documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' 
  AND auth.role() = 'authenticated'
);

-- Insert sample data
INSERT INTO documents (name, url, date, type) VALUES
('Factura Proveedor 001', 'samples/invoice-001.pdf', '2024-03-01', 'invoice'),
('Recibo Alquiler Marzo', 'samples/receipt-001.pdf', '2024-03-05', 'receipt'),
('Extracto Bancario Marzo', 'samples/bank-001.pdf', '2024-03-10', 'bank_statement')
ON CONFLICT DO NOTHING;