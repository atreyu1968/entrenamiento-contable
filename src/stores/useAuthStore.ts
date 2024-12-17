import { create } from 'zustand';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signOut, 
  resetPasswordForEmail,
  createProfile 
} from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useProfileStore } from './useProfileStore';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await signInWithEmail(email, password);
      if (error) {
        throw new Error(error.message);
      }
      
      set({ user });
      
      await useProfileStore.getState().fetchProfile();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await signUpWithEmail(email, password);
      
      if (error) throw error;
      
      // Crear perfil inicial
      if (user) {
        const { error: profileError } = await createProfile(user.id, {
          id: user.id,
          user_id: user.id,
          full_name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          role: 'student',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
        if (profileError) throw profileError;
        
        // Cargar el perfil después de crearlo
        await useProfileStore.getState().fetchProfile();
      }
      
      set({ user });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await resetPasswordForEmail(email);
      if (error) throw error;
      
      set({ error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  }
}));