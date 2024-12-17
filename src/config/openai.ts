import { Configuration, OpenAIApi } from 'openai';
import { useSettingsStore } from '../stores/useSettingsStore';

let openaiInstance: OpenAIApi | null = null;

export function getOpenAIInstance() {
  const settings = useSettingsStore.getState().settings;
  
  if (!openaiInstance && settings.openai.apiKey) {
    const configuration = new Configuration({
      apiKey: settings.openai.apiKey
    });
    openaiInstance = new OpenAIApi(configuration);
  }
  
  return openaiInstance;
}

export async function generateResponse(prompt: string) {
  const openai = getOpenAIInstance();
  const settings = useSettingsStore.getState().settings;
  
  if (!openai) {
    throw new Error('OpenAI no está configurado');
  }
  
  try {
    const response = await openai.createChatCompletion({
      model: settings.openai.model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: settings.openai.maxTokens,
      temperature: settings.openai.temperature,
    });
    
    return response.data.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error al generar respuesta:', error);
    throw error;
  }
}