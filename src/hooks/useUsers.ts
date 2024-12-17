import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabase';
import type { Profile } from '../lib/supabase/profiles';

interface User extends Profile {
  email: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Obtener emails de los usuarios
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      const usersWithEmail = profiles.map(profile => ({
        ...profile,
        email: authUsers.users.find(u => u.id === profile.user_id)?.email || ''
      }));

      setUsers(usersWithEmail);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      
      setUsers(prev => prev.filter(user => user.user_id !== userId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const updateUserRole = async (userId: string, role: 'admin' | 'teacher' | 'student') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('user_id', userId);

      if (error) throw error;
      
      setUsers(prev =>
        prev.map(user =>
          user.user_id === userId ? { ...user, role } : user
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    deleteUser,
    updateUserRole,
    refreshUsers: fetchUsers
  };
}