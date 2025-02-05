import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
};

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <Loader2 
      className={`animate-spin text-indigo-600 ${sizeClasses[size]} ${className}`}
    />
  );
}