import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Las variables de entorno de Supabase no están configuradas.\n' +
        'Por favor, asegúrate de que el archivo .env contiene:\n' +
        '- VITE_SUPABASE_URL\n' +
        '- VITE_SUPABASE_ANON_KEY'
      );
    }
    
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }
  
  return supabaseInstance;
}

export const supabase = getSupabaseClient();

export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('profiles').select('count');
    return !error;
  } catch (error) {
    console.error('Error de conexión a Supabase:', error);
    return false;
  }
}