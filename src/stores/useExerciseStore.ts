import { create } from 'zustand';
import { Exercise } from '../types';
import { supabase } from '../config/supabase';

interface ExerciseStore {
  exercises: Exercise[];
  selectedExercise: Exercise | null;
  isLoading: boolean;
  error: string | null;
  fetchExercises: () => Promise<void>;
  selectExercise: (exercise: Exercise | null) => void;
  submitExercise: (exerciseId: string, entries: any[]) => Promise<void>;
}

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: [],
  selectedExercise: null,
  isLoading: false,
  error: null,

  fetchExercises: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ exercises: data as Exercise[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  selectExercise: (exercise) => {
    set({ selectedExercise: exercise });
  },

  submitExercise: async (exerciseId, entries) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('submissions')
        .insert({
          exercise_id: exerciseId,
          user_id: 'temp-user', // TODO: Implementar autenticación
          entries,
        });

      if (error) throw error;
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));