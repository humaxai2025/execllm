import { Input } from "./ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      type="text"
      placeholder="Search by name, vendor, or use case..."
      className="w-full max-w-md border-blue-200 shadow-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}