import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Las variables de entorno de Supabase no están configuradas.\n' +
    'Por favor, asegúrate de que el archivo .env contiene:\n' +
    '- VITE_SUPABASE_URL\n' +
    '- VITE_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Utility functions
export async function checkConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('profiles').select('count');
    return !error;
  } catch (error) {
    console.error('Error checking Supabase connection:', error);
    return false;
  }
}

export async function getAuthUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting auth user:', error);
    return null;
  }
}

export async function subscribeToAuthChanges(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

// Error handling utility
export function handleSupabaseError(error: any): string {
  console.error('Supabase error:', error);
  
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Email o contraseña incorrectos',
    'Email not confirmed': 'Por favor, confirma tu email antes de iniciar sesión',
    'User not found': 'Usuario no encontrado',
    'Database connection error': 'Error de conexión con la base de datos'
  };

  return errorMap[error.message] || 'Ha ocurrido un error inesperado';
}