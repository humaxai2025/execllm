import React from "react";
export function Card({ children, className = "", ...props }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}
export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
