import { create } from 'zustand';
import { SystemSettings, DEFAULT_SETTINGS } from '../config/settings';
import { supabase } from '../lib/supabase/client';

interface SettingsState {
  settings: SystemSettings;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  updateSettings: (updates: Partial<SystemSettings>) => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isLoading: false,
  error: null,
  initialized: false,

  loadSettings: async () => {
    if (get().initialized) return;
    
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) throw error;

      if (data) {
        const mergedSettings = {
          supabase: { ...DEFAULT_SETTINGS.supabase, ...data.supabase },
          openai: { ...DEFAULT_SETTINGS.openai, ...data.openai },
          general: { ...DEFAULT_SETTINGS.general, ...data.general }
        };
        set({ settings: mergedSettings, initialized: true });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      console.error('Error loading settings:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (updates: Partial<SystemSettings>) => {
    set({ isLoading: true, error: null });
    try {
      const { data: existingSettings } = await supabase
        .from('system_settings')
        .select('id')
        .eq('id', 1)
        .single();

      const currentSettings = get().settings;
      const mergedSettings = {
        ...currentSettings,
        ...updates
      };

      let error;
      
      if (existingSettings) {
        // Update existing settings
        const { error: updateError } = await supabase
        .from('system_settings')
        .update({ 
          id: 1, // Solo mantenemos un registro de configuración
          supabase: mergedSettings.supabase,
          openai: mergedSettings.openai,
          general: mergedSettings.general,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);
        error = updateError;
      } else {
        // Insert new settings
        const { error: insertError } = await supabase
        .from('system_settings')
        .insert({ 
          id: 1,
          supabase: mergedSettings.supabase,
          openai: mergedSettings.openai,
          general: mergedSettings.general,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        error = insertError;
      }

      if (error) throw error;

      set({ settings: mergedSettings });
    } catch (error) {
      set({ error: (error as Error).message });
      console.error('Error updating settings:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));