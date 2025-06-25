"use client";
import React, { useState, useEffect, useMemo } from "react";
import { LLMCard } from "../components/LLMCard";
import { LLMDetailsModal } from "../components/LLMDetailsModal";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import { ComparisonBar } from "../components/ComparisonBar";
import { ComparisonModal } from "../components/ComparisonModals";
import { motion } from "framer-motion";
import { llmsData, type LLMModel } from "../data/llms";

interface Filters {
  cost: string[];
  vendor: string[];
  category: string[];
  deployment: string[];
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LLMModel | null>(null);
  const [llms, setLlms] = useState<LLMModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    cost: [],
    vendor: [],
    category: [],
    deployment: []
  });
  
  // Comparison state
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<LLMModel[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  useEffect(() => {
    // Simulate a brief loading state for better UX, then load the data
    const timer = setTimeout(() => {
      setLlms(llmsData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Memoized filtering logic
  const filteredAndSearched = useMemo(() => {
    let result = llms;

    // Apply search filter
    if (search) {
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.vendor.toLowerCase().includes(search.toLowerCase()) ||
          m.useCases.join(" ").toLowerCase().includes(search.toLowerCase()) ||
          m.capabilities.join(" ").toLowerCase().includes(search.toLowerCase()) ||
          m.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply cost filters
    if (filters.cost.length > 0) {
      result = result.filter(m => filters.cost.includes(m.cost));
    }

    // Apply vendor filters
    if (filters.vendor.length > 0) {
      result = result.filter(m => filters.vendor.includes(m.vendor));
    }

    // Apply category filters
    if (filters.category.length > 0) {
      result = result.filter(m => m.category && filters.category.includes(m.category));
    }

    // Apply deployment filters
    if (filters.deployment.length > 0) {
      result = result.filter(m => 
        m.deployment.some(dep => filters.deployment.includes(dep))
      );
    }

    return result;
  }, [llms, search, filters]);

  // Enhanced FilterBar with proper counts
  const filterBarWithCounts = useMemo(() => {
    const getFilterCounts = () => {
      const costTiers = [
        { value: "Free", count: 0, color: "bg-green-100 text-green-700 border-green-300" },
        { value: "$", count: 0, color: "bg-blue-100 text-blue-700 border-blue-300" },
        { value: "$$", count: 0, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
        { value: "$$$", count: 0, color: "bg-red-100 text-red-700 border-red-300" }
      ];

      const vendorColors: Record<string, string> = {
        "OpenAI": "bg-green-100 text-green-700 border-green-300",
        "Anthropic": "bg-orange-100 text-orange-700 border-orange-300",
        "Google": "bg-blue-100 text-blue-700 border-blue-300",
        "Meta": "bg-purple-100 text-purple-700 border-purple-300",
        "Mistral AI": "bg-cyan-100 text-cyan-700 border-cyan-300",
        "Cohere": "bg-pink-100 text-pink-700 border-pink-300",
        "Perplexity": "bg-indigo-100 text-indigo-700 border-indigo-300",
        "AI21 Labs": "bg-teal-100 text-teal-700 border-teal-300",
        "Stability AI": "bg-rose-100 text-rose-700 border-rose-300",
        "Technology Innovation Institute": "bg-amber-100 text-amber-700 border-amber-300",
        "Zhipu AI": "bg-emerald-100 text-emerald-700 border-emerald-300"
      };

      const costCounts = costTiers.map(tier => ({
        ...tier,
        count: llms.filter(m => m.cost === tier.value).length
      }));

      const vendorCounts = Array.from(new Set(llms.map(m => m.vendor)))
        .map(vendor => ({
          value: vendor,
          count: llms.filter(m => m.vendor === vendor).length,
          color: vendorColors[vendor] || "bg-gray-100 text-gray-700 border-gray-300"
        }))
        .sort((a, b) => b.count - a.count);

      const categoryCounts = Array.from(new Set(llms.map(m => m.category).filter(Boolean)))
        .map(category => ({
          value: category!,
          count: llms.filter(m => m.category === category).length
        }))
        .sort((a, b) => b.count - a.count);

      const deploymentCounts = Array.from(
        new Set(llms.flatMap(m => m.deployment))
      )
        .map(deployment => ({
          value: deployment,
          count: llms.filter(m => m.deployment.includes(deployment)).length
        }))
        .sort((a, b) => b.count - a.count);

      return { costCounts, vendorCounts, categoryCounts, deploymentCounts };
    };

    return getFilterCounts();
  }, [llms]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[filterType as keyof Filters];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(f => f !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [filterType]: newFilters
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      cost: [],
      vendor: [],
      category: [],
      deployment: []
    });
  };

  // Comparison handlers
  const toggleComparisonMode = () => {
    setIsComparisonMode(!isComparisonMode);
    if (!isComparisonMode) {
      setSelectedForComparison([]);
    }
  };

  const handleCompareToggle = (model: LLMModel) => {
    setSelectedForComparison(prev => {
      const isAlreadySelected = prev.find(m => m.name === model.name);
      if (isAlreadySelected) {
        return prev.filter(m => m.name !== model.name);
      } else {
        // Limit to 4 models for comparison
        if (prev.length >= 4) {
          // Could add a toast notification here
          console.log("Maximum 4 models can be compared at once");
          return prev;
        }
        return [...prev, model];
      }
    });
  };

  const openComparisonModal = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparisonModal(true);
    }
  };

  const clearComparisonSelection = () => {
    setSelectedForComparison([]);
  };

  const removeFromComparison = (modelName: string) => {
    setSelectedForComparison(prev => prev.filter(m => m.name !== modelName));
  };

  const hasActiveFilters = Object.values(filters).some(filterArray => filterArray.length > 0);

  const backgroundStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-50" style={backgroundStyle}></div>
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="mb-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              ExecLLM
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.p 
            className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Compare the world's most powerful AI models for business—designed for executives who value clarity over complexity.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-md"
          >
            <SearchBar value={search} onChange={setSearch} />
          </motion.div>
        </motion.header>

        {!loading && (
          <>
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              totalModels={llms.length}
              filteredCount={filteredAndSearched.length}
              allModels={llms}
            />
          </>
        )}

        {/* Comparison Mode Toggle - Always Visible */}
        {!loading && (
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={toggleComparisonMode}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 text-lg ${
                isComparisonMode 
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-slate-800/80 border-2 border-slate-700/50 text-slate-300 hover:border-purple-500/50 hover:bg-slate-700/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
              {isComparisonMode ? 'Exit Comparison Mode' : 'Enter Comparison Mode'}
              {selectedForComparison.length > 0 && (
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                  {selectedForComparison.length}
                </span>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Floating Comparison Bar - Shows when models are selected */}
        <ComparisonBar
          selectedModels={selectedForComparison}
          isComparisonMode={isComparisonMode}
          onToggleComparisonMode={toggleComparisonMode}
          onCompare={openComparisonModal}
          onClearSelection={clearComparisonSelection}
          onRemoveModel={removeFromComparison}
        />

        {loading && (
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
            </div>
          </motion.div>
        )}

        {!loading && (
          <React.Fragment>
            {filteredAndSearched.length === 0 && llms.length > 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-slate-300 mb-2">No models found</h3>
                <p className="text-slate-400 mb-4">
                  {search || hasActiveFilters 
                    ? "Try adjusting your search terms or filters" 
                    : "No models match your criteria"
                  }
                </p>
                {hasActiveFilters && (
                  <motion.button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear All Filters
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Comparison Mode Help Text */}
            {isComparisonMode && selectedForComparison.length === 0 && filteredAndSearched.length > 0 && (
              <motion.div 
                className="text-center py-12 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-6 max-w-md mx-auto">
                  <div className="text-4xl mb-3">⚖️</div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Comparison Mode Active</h3>
                  <p className="text-slate-400 text-sm">
                    Click the checkboxes on model cards to select up to 4 models for comparison
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {filteredAndSearched.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <LLMCard model={model} onClick={() => setSelected(model)} />
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Results Summary */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400">
                <p>
                  {search || hasActiveFilters 
                    ? `Showing ${filteredAndSearched.length} of ${llms.length} models` 
                    : `${llms.length} AI models available`
                  }
                </p>
                {(search || hasActiveFilters) && (
                  <motion.button
                    onClick={() => {
                      setSearch("");
                      clearAllFilters();
                    }}
                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 rounded-lg transition-all duration-200 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Show All Models
                  </motion.button>
                )}
              </div>
            </motion.div>
          </React.Fragment>
        )}

        <motion.footer 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-center gap-4">
            <a 
              href="/glossary" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="mr-2">📚</span>
              Glossary & FAQ
            </a>
            
            <motion.div 
              className="text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Built with ❤️ by HumanXAI
            </motion.div>
          </div>
        </motion.footer>
      </div>

      <LLMDetailsModal model={selected} onClose={() => setSelected(null)} />
      
      {showComparisonModal && (
        <ComparisonModal
          models={selectedForComparison}
          onClose={() => setShowComparisonModal(false)}
          onRemoveModel={removeFromComparison}
        />
      )}
    </div>
  );
}