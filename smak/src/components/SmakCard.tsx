import React from 'react';

interface SmakCardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SmakCard({ children, className = "" }: SmakCardProps) {
  return (
    <div className={`bg-white rounded-2 w-100 shadow p-3 ${className}`}>
      {children}
    </div>
  );
}
