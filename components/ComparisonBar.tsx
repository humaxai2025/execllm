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
      {/* Floating Comparison Bar - Only shows when models are selected */}
      <AnimatePresence>
        {hasSelectedModels && (
          <motion.div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm max-w-4xl">
              <div className="flex items-center gap-6">
                {/* Selected Models Preview */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {selectedModels.slice(0, 3).map((model, index) => (
                      <div
                        key={model.name}
                        className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-slate-800 shadow-lg"
                        title={model.name}
                      >
                        {model.name.charAt(0)}
                      </div>
                    ))}
                    {selectedModels.length > 3 && (
                      <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 text-sm font-bold border-2 border-slate-800 shadow-lg">
                        +{selectedModels.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-white">
                    <div className="font-bold text-lg">
                      {selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''} selected
                    </div>
                    <div className="text-sm text-slate-300">
                      {canCompare 
                        ? 'Ready to compare side-by-side' 
                        : selectedModels.length === 1 
                          ? 'Select 1 more model to compare'
                          : selectedModels.length >= 4
                            ? 'Maximum 4 models (remove some to add others)'
                            : 'Select 2+ models to compare'
                      }
                    </div>
                  </div>
                </div>

                {/* Selected Models List */}
                <div className="hidden lg:flex items-center gap-2 max-w-md overflow-x-auto">
                  {selectedModels.map((model) => (
                    <motion.span
                      key={model.name}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm whitespace-nowrap"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <span className="font-medium">{model.name}</span>
                      <button
                        onClick={() => onRemoveModel(model.name)}
                        className="hover:text-white transition-colors p-1"
                        title={`Remove ${model.name}`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={onCompare}
                    disabled={!canCompare}
                    className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-3 ${
                      canCompare
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg transform hover:scale-105'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                    whileHover={canCompare ? { scale: 1.05 } : {}}
                    whileTap={canCompare ? { scale: 0.95 } : {}}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                    Compare Models
                  </motion.button>
                  
                  <motion.button
                    onClick={onClearSelection}
                    className="px-6 py-3 bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white rounded-xl transition-all duration-200 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear All
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