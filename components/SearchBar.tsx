import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="relative w-full"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <svg 
          className={`w-5 h-5 transition-colors duration-300 ${
            isFocused ? 'text-purple-400' : 'text-slate-400'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search models, vendors, or use cases..."
        className={`
          w-full pl-12 pr-4 py-4 
          bg-slate-800/50 backdrop-blur-sm 
          border-2 transition-all duration-300 rounded-2xl
          text-white placeholder-slate-400
          focus:outline-none focus:ring-0
          ${isFocused 
            ? 'border-purple-500/50 shadow-lg shadow-purple-500/20 bg-slate-800/70' 
            : 'border-slate-700/50 hover:border-slate-600/50'
          }
        `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Clear Button */}
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
          onClick={() => onChange("")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}

      {/* Gradient border effect on focus */}
      <div className={`
        absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
        ${isFocused ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-sm opacity-30"></div>
      </div>
    </motion.div>
  );
}