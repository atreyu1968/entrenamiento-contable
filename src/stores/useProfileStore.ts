import { create } from 'zustand';
import { getProfile, updateProfile, getAuthUser } from '../lib/supabase';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    const user = await getAuthUser();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const profile = await getProfile(user.id);
      set({ profile });
      
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates) => {
    const user = await getAuthUser();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const { success, error } = await updateProfile(user.id, updates);
      if (!success) throw error;
      
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  }
}));