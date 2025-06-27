'use client';
import { useEffect } from 'react';

export default function Notification({ 
  message, 
  type = 'info', 
  duration = 3000,
  onDismiss
}: {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onDismiss?: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const colors = {
    success: 'bg-green-500/80',
    error: 'bg-red-500/80',
    info: 'bg-blue-500/80'
  };

  return (
    <div className={`notification fixed bottom-6 left-6 px-4 py-2 rounded-md text-white ${colors[type]}`}>
      {message}
    </div>
  );
}