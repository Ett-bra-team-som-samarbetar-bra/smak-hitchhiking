import React from 'react';

interface SmakCardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SmakCard({ children, className = "" }: SmakCardProps) {
  return (
    <div className={`bg-white m-0 rounded-2 w-100 p-3 shadow ${className}`}>
      {children}
    </div>
  );
}
