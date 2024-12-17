export interface SystemSettings {
  supabase: {
    url: string;
    anonKey: string;
  };
  openai: {
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
  };
  general: {
    maxAttempts: number;
    autoGrading: boolean;
    feedbackDelay: number;
    defaultIGICRate: number;
  };
}

export const DEFAULT_SETTINGS: SystemSettings = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  },
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: 'gpt-4',
    maxTokens: 500,
    temperature: 0.7
  },
  general: {
    maxAttempts: 3,
    autoGrading: true,
    feedbackDelay: 0,
    defaultIGICRate: 7
  }
};