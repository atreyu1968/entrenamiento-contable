import { z } from 'zod';

export const envSchema = z.object({
  supabase: z.object({
    url: z.string().url('La URL de Supabase no es válida'),
    anonKey: z.string().min(1, 'La clave anónima de Supabase es requerida')
  })
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  const config = {
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL || '',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    }
  };

  try {
    const validated = envSchema.parse(config);
    return validated;
  } catch (error) {
    console.error('Error de validación del entorno:', error);
    throw new Error(
      'Error en la configuración del entorno. ' +
      'Asegúrate de que el archivo .env contiene:\n' +
      '- VITE_SUPABASE_URL\n' +
      '- VITE_SUPABASE_ANON_KEY'
    );
  }
}