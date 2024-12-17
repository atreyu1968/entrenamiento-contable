import { Document } from '../types/supabase';
import { formatDate } from '../utils/date';

const GOOGLE_DRIVE_FOLDER_ID = '1lAKkATyIdSr30MM2SXajkDJ0KoACi8pdqPQI5juuQZ21ML_IqSlalVzc6OEi8MWCfhgx5c4Y';

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  webViewLink: string;
}

export async function fetchGoogleDriveFiles(): Promise<Document[]> {
  try {
    const files = [
      {
        id: '1',
        name: 'Factura Proveedor 001.pdf',
        url: 'https://drive.google.com/file/d/1lAKkATyIdSr30MM2SXajkDJ0KoACi8pdqPQI5juuQZ21ML_IqSlalVzc6OEi8MWCfhgx5c4Y/preview',
        date: formatDate(new Date()),
        type: 'invoice',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: null,
        metadata: {}
      }
      // Add more sample documents as needed
    ];

    return files;
  } catch (error) {
    console.error('Error fetching Google Drive files:', error);
    return [];
  }
}

export function getGoogleDrivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}