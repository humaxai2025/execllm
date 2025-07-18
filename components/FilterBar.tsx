import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface FilterBarProps {
  filters: {
    cost: string[];
    vendor: string[];
    category: string[];
    deployment: string[];
    industry: string[];
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
    // Close the dropdown after selection for single-select behavior
    onToggleExpanded();
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
              {selectedValues[0]}
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
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                      selectedValues.includes(option.value) 
                        ? 'border-purple-400 bg-purple-400' 
                        : 'border-slate-400'
                    }`}>
                      {selectedValues.includes(option.value) && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.value}</span>
                  </div>
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

  // Generate filter options with counts - SIMPLIFIED COST TIERS
  const costTiers = [
    { value: "Free", count: allModels.filter(m => m.cost === "Free").length, color: "bg-green-600/20 text-green-300 border border-green-500/30" },
    { value: "Paid", count: allModels.filter(m => m.cost === "Paid").length, color: "bg-blue-600/20 text-blue-300 border border-blue-500/30" }
  ];

  const vendorColors: Record<string, string> = {
    "OpenAI": "bg-green-600/20 text-green-300 border border-green-500/30",
    "Anthropic": "bg-orange-600/20 text-orange-300 border border-orange-500/30",
    "Google": "bg-blue-600/20 text-blue-300 border border-blue-500/30",
    "Meta": "bg-purple-600/20 text-purple-300 border border-purple-500/30",
    "Mistral AI": "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30",
    "Cohere": "bg-pink-600/20 text-pink-300 border border-pink-500/30",
    "Perplexity": "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30",
    "AI21 Labs": "bg-teal-600/20 text-teal-300 border border-teal-500/30",
    "Stability AI": "bg-rose-600/20 text-rose-300 border border-rose-500/30",
    "Technology Innovation Institute": "bg-amber-600/20 text-amber-300 border border-amber-500/30",
    "Zhipu AI": "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
  };

  // Industry colors for better visual distinction
  const industryColors: Record<string, string> = {
    "Financial Services": "bg-green-600/20 text-green-300 border border-green-500/30",
    "Healthcare & Life Sciences": "bg-red-600/20 text-red-300 border border-red-500/30",
    "Legal & Compliance": "bg-blue-600/20 text-blue-300 border border-blue-500/30",
    "Technology & Software": "bg-purple-600/20 text-purple-300 border border-purple-500/30",
    "Marketing & Advertising": "bg-pink-600/20 text-pink-300 border border-pink-500/30",
    "Education & Training": "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30",
    "Manufacturing": "bg-orange-600/20 text-orange-300 border border-orange-500/30",
    "Retail & E-commerce": "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30",
    "Consulting & Professional Services": "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30",
    "Media & Entertainment": "bg-rose-600/20 text-rose-300 border border-rose-500/30",
    "Government & Public Sector": "bg-teal-600/20 text-teal-300 border border-teal-500/30",
    "Research & Development": "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30",
    "Customer Service": "bg-amber-600/20 text-amber-300 border border-amber-500/30",
    "International Business": "bg-lime-600/20 text-lime-300 border border-lime-500/30"
  };

  // Get unique vendors and sort by count
  const vendors = Array.from(new Set(allModels.map(m => m.vendor)))
    .map(vendor => ({
      value: vendor,
      count: allModels.filter(m => m.vendor === vendor).length,
      color: vendorColors[vendor] || "bg-gray-600/20 text-gray-300 border border-gray-500/30"
    }))
    .sort((a, b) => b.count - a.count);

  // Get unique categories and sort by count  
  const categories = Array.from(new Set(allModels.map(m => m.category).filter(Boolean)))
    .map(category => ({
      value: category!,
      count: allModels.filter(m => m.category === category).length,
      color: "bg-slate-600/20 text-slate-300 border border-slate-500/30"
    }))
    .sort((a, b) => b.count - a.count);

  // Get unique deployment options and sort by count
  const deployments = Array.from(new Set(allModels.flatMap(m => m.deployment)))
    .map(deployment => ({
      value: deployment,
      count: allModels.filter(m => m.deployment.includes(deployment)).length,
      color: "bg-slate-600/20 text-slate-300 border border-slate-500/30"
    }))
    .sort((a, b) => b.count - a.count);

  // Get unique industries and sort by count
  const industries = Array.from(new Set(allModels.flatMap(m => m.industries)))
    .map(industry => ({
      value: industry,
      count: allModels.filter(m => m.industries.includes(industry)).length,
      color: industryColors[industry] || "bg-slate-600/20 text-slate-300 border border-slate-500/30"
    }))
    .sort((a, b) => b.count - a.count);

  const hasActiveFilters = Object.values(filters).some(filterArray => filterArray.length > 0);
  const activeFilterCount = Object.values(filters).filter(filterArray => filterArray.length > 0).length;

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

      {/* Filter Grid - Now with 5 columns to accommodate industry filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <FilterSection
          title="Industry"
          icon="🏭"
          options={industries}
          selectedValues={filters.industry}
          onToggle={(value) => onFilterChange('industry', value)}
          isExpanded={expandedSections.industry}
          onToggleExpanded={() => toggleSection('industry')}
        />
        
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

      {/* Industry Use Case Insights */}
      {filters.industry.length > 0 && (
        <motion.div 
          className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <h3 className="text-sm font-semibold text-purple-300">Industry Insights</h3>
          </div>
          <p className="text-sm text-slate-300">
            Showing AI models optimized for <span className="text-purple-300 font-medium">{filters.industry[0]}</span>. 
            These models have been specifically validated for industry use cases, compliance requirements, and business workflows.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}