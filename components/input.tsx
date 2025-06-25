export function Input({ className = "", ...props }) {
  return (
    <input
      className={`rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${className}`}
      {...props}
    />
  );
}
