import { useState, useCallback } from 'react';
import { supabase } from '../config/supabase';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setTodos(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
      console.error('Error fetching todos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    todos,
    isLoading,
    error,
    fetchTodos
  };
}