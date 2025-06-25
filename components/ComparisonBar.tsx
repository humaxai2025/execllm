import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface ComparisonBarProps {
  selectedModels: LLMModel[];
  isComparisonMode: boolean;
  onToggleComparisonMode: () => void;
  onCompare: () => void;
  onClearSelection: () => void;
  onRemoveModel: (modelName: string) => void;
}

export function ComparisonBar({ 
  selectedModels, 
  isComparisonMode, 
  onToggleComparisonMode, 
  onCompare, 
  onClearSelection,
  onRemoveModel 
}: ComparisonBarProps) {
  const hasSelectedModels = selectedModels.length > 0;
  const canCompare = selectedModels.length >= 2;

  return (
    <div className="relative">
      {/* Comparison Mode Toggle */}
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          onClick={onToggleComparisonMode}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
            isComparisonMode 
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
              : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-slate-600/50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
          {isComparisonMode ? 'Exit Comparison Mode' : 'Enter Comparison Mode'}
          {hasSelectedModels && (
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
              {selectedModels.length}
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Floating Comparison Bar */}
      <AnimatePresence>
        {hasSelectedModels && (
          <motion.div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                {/* Selected Models Preview */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {selectedModels.slice(0, 3).map((model, index) => (
                      <div
                        key={model.name}
                        className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-slate-800"
                        title={model.name}
                      >
                        {model.name.charAt(0)}
                      </div>
                    ))}
                    {selectedModels.length > 3 && (
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 text-xs font-bold border-2 border-slate-800">
                        +{selectedModels.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-white">
                    <div className="font-semibold">
                      {selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''} selected
                    </div>
                    <div className="text-xs text-slate-400">
                      {canCompare ? 'Ready to compare' : 'Select 2+ models to compare'}
                    </div>
                  </div>
                </div>

                {/* Selected Models List (when expanded) */}
                {selectedModels.length > 0 && (
                  <div className="hidden sm:flex items-center gap-2 max-w-md overflow-x-auto">
                    {selectedModels.map((model) => (
                      <motion.span
                        key={model.name}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-purple-900/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm whitespace-nowrap"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {model.name}
                        <button
                          onClick={() => onRemoveModel(model.name)}
                          className="hover:text-white transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={onCompare}
                    disabled={!canCompare}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                      canCompare
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                    whileHover={canCompare ? { scale: 1.05 } : {}}
                    whileTap={canCompare ? { scale: 0.95 } : {}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                    Compare
                  </motion.button>
                  
                  <motion.button
                    onClick={onClearSelection}
                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}