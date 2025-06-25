import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}