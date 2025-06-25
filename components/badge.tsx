export function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
