import { supabase } from '../../config/supabase';
import type { AuthError, User } from '@supabase/supabase-js';

interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

const handleAuthError = (error: any): AuthError => {
  console.error('Auth error:', error);
  
  // Map common error messages to user-friendly versions
  const errorMap: { [key: string]: string } = {
    'Invalid login credentials': 'Email o contraseña incorrectos',
    'Email not confirmed': 'Por favor, confirma tu email antes de iniciar sesión',
    'Invalid email': 'El email no es válido',
    'Password is too short': 'La contraseña debe tener al menos 6 caracteres'
  };

  const message = errorMap[error.message] || error.message;
  return { ...error, message };
};

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error de autenticación:', error);
      return { 
        user: null, 
        error: {
          ...error,
          message: error.message === 'Invalid login credentials' 
            ? 'Email o contraseña incorrectos'
            : error.message
        }
      };
    }

    return { 
      user: data.user,
      error: null
    }

  } catch (error) {
    console.error('Error inesperado:', error);
    return { user: null, error: handleAuthError(error) };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  metadata?: { [key: string]: any }
): Promise<AuthResponse> {
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    return { user, error };
  } catch (error) {
    return { user: null, error: handleAuthError(error) };
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error: handleAuthError(error) };
  }
}

export async function resetPasswordForEmail(
  email: string
): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  } catch (error) {
    return { error: handleAuthError(error) };
  }
}