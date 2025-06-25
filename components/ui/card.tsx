import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", onClick, ...props }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}