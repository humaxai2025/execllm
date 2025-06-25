import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${className}`}
      {...props}
    />
  );
}