import type { Database } from '../types/supabase';
import { formatDate } from '../utils/date';
import { fetchGoogleDriveFiles } from './googleDriveService';

export type Document = Database['public']['Tables']['documents']['Row'];

export async function fetchDocuments(): Promise<Document[]> {
  try {
    // Fetch documents from Google Drive
    const driveFiles = await fetchGoogleDriveFiles();

    // Sort by date
    return driveFiles.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}