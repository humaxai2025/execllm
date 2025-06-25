import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface FilterBarProps {
  filters: {
    cost: string[];
    vendor: string[];
    category: string[];
    deployment: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearAll: () => void;
  totalModels: number;
  filteredCount: number;
  allModels: LLMModel[];
}

interface FilterSectionProps {
  title: string;
  icon: string;
  options: { value: string; count: number; color?: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

function FilterSection({ title, icon, options, selectedValues, onToggle, isExpanded, onToggleExpanded }: FilterSectionProps) {
  const hasActiveFilters = selectedValues.length > 0;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (value: string) => {
    onToggle(value);
    // Close the dropdown after selection
    if (isExpanded) {
      onToggleExpanded();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isExpanded) {
        onToggleExpanded();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, onToggleExpanded]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={onToggleExpanded}
        className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${
          hasActiveFilters 
            ? 'bg-purple-900/20 border border-purple-500/30 text-purple-300' 
            : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-slate-600/50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-medium">{title}</span>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
              {selectedValues.length}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-20 mt-2 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-2xl"
          >
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 text-left ${
                    selectedValues.includes(option.value)
                      ? option.color || 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{option.value}</span>
                  <span className="text-xs opacity-75">({option.count})</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterBar({ filters, onFilterChange, onClearAll, totalModels, filteredCount, allModels }: FilterBarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Close all dropdowns when pressing Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedSections({});
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Generate filter options with counts
  const costTiers = [
    { value: "Free", count: allModels.filter(m => m.cost === "Free").length, color: "bg-green-600/20 text-green-300 border border-green-500/30" },
    { value: "$", count: allModels.filter(m => m.cost === "$").length, color: "bg-blue-600/20 text-blue-300 border border-blue-500/30" },
    { value: "$", count: allModels.filter(m => m.cost === "$").length, color: "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30" },
    { value: "$$", count: allModels.filter(m => m.cost === "$$").length, color: "bg-red-600/20 text-red-300 border border-red-500/30" }
  ];

  const vendorColors: Record<string, string> = {
    "OpenAI": "bg-green-600/20 text-green-300 border border-green-500/30",
    "Anthropic": "bg-orange-600/20 text-orange-300 border border-orange-500/30",
    "Google": "bg-blue-600/20 text-blue-300 border border-blue-500/30",
    "Meta": "bg-purple-600/20 text-purple-300 border border-purple-500/30",
    "Mistral AI": "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30",
    "Cohere": "bg-pink-600/20 text-pink-300 border border-pink-500/30",
    "Perplexity": "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
  };

  const vendors = Array.from(new Set(allModels.map(m => m.vendor)))
    .map(vendor => ({
      value: vendor,
      count: allModels.filter(m => m.vendor === vendor).length,
      color: vendorColors[vendor] || "bg-gray-600/20 text-gray-300 border border-gray-500/30"
    }))
    .sort((a, b) => b.count - a.count);

  const categories = Array.from(new Set(allModels.map(m => m.category).filter(Boolean)))
    .map(category => ({
      value: category!,
      count: allModels.filter(m => m.category === category).length
    }))
    .sort((a, b) => b.count - a.count);

  const deployments = Array.from(new Set(allModels.flatMap(m => m.deployment)))
    .map(deployment => ({
      value: deployment,
      count: allModels.filter(m => m.deployment.includes(deployment)).length
    }))
    .sort((a, b) => b.count - a.count);

  const hasActiveFilters = Object.values(filters).some(filterArray => filterArray.length > 0);
  const activeFilterCount = Object.values(filters).reduce((total, filterArray) => total + filterArray.length, 0);

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>🔍</span>
            Smart Filters
          </h2>
          {hasActiveFilters && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full"
            >
              <span className="text-purple-300 text-sm font-medium">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
            </motion.div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-slate-400 text-sm">
            {filteredCount} of {totalModels} models
          </div>
          {hasActiveFilters && (
            <motion.button
              onClick={onClearAll}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 rounded-lg transition-all duration-200 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          )}
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterSection
          title="Cost"
          icon="💰"
          options={costTiers}
          selectedValues={filters.cost}
          onToggle={(value) => onFilterChange('cost', value)}
          isExpanded={expandedSections.cost}
          onToggleExpanded={() => toggleSection('cost')}
        />
        
        <FilterSection
          title="Vendor"
          icon="🏢"
          options={vendors}
          selectedValues={filters.vendor}
          onToggle={(value) => onFilterChange('vendor', value)}
          isExpanded={expandedSections.vendor}
          onToggleExpanded={() => toggleSection('vendor')}
        />
        
        <FilterSection
          title="Category"
          icon="📁"
          options={categories}
          selectedValues={filters.category}
          onToggle={(value) => onFilterChange('category', value)}
          isExpanded={expandedSections.category}
          onToggleExpanded={() => toggleSection('category')}
        />
        
        <FilterSection
          title="Deployment"
          icon="🚀"
          options={deployments}
          selectedValues={filters.deployment}
          onToggle={(value) => onFilterChange('deployment', value)}
          isExpanded={expandedSections.deployment}
          onToggleExpanded={() => toggleSection('deployment')}
        />
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <motion.div 
          className="mt-6 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([filterType, values]) =>
              values.map(value => (
                <motion.span
                  key={`${filterType}-${value}`}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-purple-900/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {value}
                  <button
                    onClick={() => onFilterChange(filterType, value)}
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.span>
              ))
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}