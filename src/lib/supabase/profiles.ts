import { supabase } from './client';
import type { Database } from '../../types/supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function updateProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<{ success: boolean; error: any }> {
  try {
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq('user_id', userId);

    return { success: !error, error };
  } catch (error) {
    return { success: false, error };
  }
}

export async function createProfile(
  userId: string,
  data: Partial<Profile>
): Promise<{ success: boolean; error: any }> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        ...data
      })
      .select()
      .single();

    return { success: !error && !!data, error };
  } catch (error) {
    return { success: false, error };
  }
}