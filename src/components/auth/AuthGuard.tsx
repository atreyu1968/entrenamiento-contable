import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import LoginForm from './LoginForm';
import Spinner from '../ui/Spinner';

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}