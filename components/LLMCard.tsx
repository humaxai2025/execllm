import React from "react";
import { motion } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface LLMCardProps {
  model: LLMModel;
  onClick: () => void;
  onCompareToggle?: (model: LLMModel) => void;
  isSelected?: boolean;
  isComparisonMode?: boolean;
  comparisonFull?: boolean;
  onROIClick?: (model: LLMModel) => void;
  onRoadmapClick?: (model: LLMModel) => void;
}

const costColors: Record<string, string> = {
  "$": "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
  "$$": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
  "$$$": "bg-gradient-to-r from-red-500 to-pink-500 text-white",
  "Free": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
  "Paid": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
};

const vendorColors: Record<string, string> = {
  "OpenAI": "text-green-400",
  "Anthropic": "text-orange-400", 
  "Google": "text-blue-400",
  "Meta": "text-purple-400",
  "Mistral AI": "text-cyan-400",
  "Cohere": "text-pink-400",
  "Perplexity": "text-indigo-400",
  "AI21 Labs": "text-teal-400",
  "Stability AI": "text-rose-400",
  "Technology Innovation Institute": "text-amber-400",
  "Zhipu AI": "text-emerald-400"
};

const industryColors: Record<string, string> = {
  "Financial Services": "bg-green-900/30 text-green-300 border-green-700/30",
  "Healthcare & Life Sciences": "bg-red-900/30 text-red-300 border-red-700/30",
  "Legal & Compliance": "bg-blue-900/30 text-blue-300 border-blue-700/30",
  "Technology & Software": "bg-purple-900/30 text-purple-300 border-purple-700/30",
  "Marketing & Advertising": "bg-pink-900/30 text-pink-300 border-pink-700/30",
  "Education & Training": "bg-yellow-900/30 text-yellow-300 border-yellow-700/30",
  "Manufacturing": "bg-orange-900/30 text-orange-300 border-orange-700/30",
  "Retail & E-commerce": "bg-cyan-900/30 text-cyan-300 border-cyan-700/30",
  "Consulting & Professional Services": "bg-indigo-900/30 text-indigo-300 border-indigo-700/30",
  "Media & Entertainment": "bg-rose-900/30 text-rose-300 border-rose-700/30",
  "Government & Public Sector": "bg-teal-900/30 text-teal-300 border-teal-700/30",
  "Research & Development": "bg-emerald-900/30 text-emerald-300 border-emerald-700/30",
  "Customer Service": "bg-amber-900/30 text-amber-300 border-amber-700/30",
  "International Business": "bg-lime-900/30 text-lime-300 border-lime-700/30"
};

export const LLMCard = React.memo<LLMCardProps>(({ 
  model, 
  onClick, 
  onCompareToggle, 
  isSelected = false, 
  isComparisonMode = false, 
  comparisonFull = false,
  onROIClick,
  onRoadmapClick
}) => {
  const handleCompareClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!comparisonFull || isSelected) {
      onCompareToggle?.(model);
    }
  }, [comparisonFull, isSelected, onCompareToggle, model]);

  const handleROIClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onROIClick?.(model);
  }, [onROIClick, model]);

  const handleRoadmapClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onRoadmapClick?.(model);
  }, [onRoadmapClick, model]);

  const handleCardClick = React.useCallback(() => {
    if (isComparisonMode && onCompareToggle && (!comparisonFull || isSelected)) {
      onCompareToggle(model);
    } else if (!isComparisonMode) {
      onClick();
    }
  }, [isComparisonMode, onCompareToggle, comparisonFull, isSelected, model, onClick]);

  const isDisabled = comparisonFull && !isSelected;

  return (
    <motion.div
      whileHover={!isDisabled ? { 
        scale: 1.02,
        y: -4
      } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`group h-full ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleCardClick}
    >
      <div className={`relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border rounded-3xl p-6 h-full transition-all duration-300 hover:shadow-2xl ${
        isSelected 
          ? 'border-purple-500/70 bg-purple-900/20 shadow-purple-500/20' 
          : isDisabled
            ? 'border-slate-700/30 opacity-50 cursor-not-allowed'
            : 'border-slate-700/50 hover:border-purple-500/50 hover:shadow-purple-500/10'
      }`}>
        {/* Comparison Checkbox */}
        {(isComparisonMode || isSelected) && (
          <motion.div
            className="absolute top-4 left-4 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.button
              onClick={handleCompareClick}
              disabled={isDisabled}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shadow-lg ${
                isSelected
                  ? 'bg-purple-500 border-purple-500 text-white'
                  : isDisabled
                    ? 'border-slate-600 bg-slate-700/30 cursor-not-allowed'
                    : 'border-slate-400 hover:border-purple-400 bg-slate-800/50'
              }`}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.9 } : {}}
            >
              {isSelected && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className={`flex justify-between items-start mb-4 ${(isComparisonMode || isSelected) ? 'ml-8' : ''}`}>
            <div className="flex-1 pr-4">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                {model.name}
              </h3>
              <p className={`text-sm font-semibold ${vendorColors[model.vendor] || "text-slate-400"}`}>
                {model.vendor}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${costColors[model.cost] || "bg-gray-600 text-white"} shadow-lg flex-shrink-0`}>
              {model.cost}
            </div>
          </div>

          {/* Summary */}
          <p className="text-slate-300 text-sm mb-4 line-clamp-3 flex-grow">
            {model.summary}
          </p>

          {/* Industries */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-2">INDUSTRIES</h4>
              <div className="flex flex-wrap gap-1">
                {model.industries.slice(0, 2).map((industry) => (
                  <span
                    key={industry}
                    className={`px-2 py-1 text-xs rounded-lg border ${
                      industryColors[industry] || "bg-slate-700/50 text-slate-400 border-slate-600/50"
                    }`}
                  >
                    {industry}
                  </span>
                ))}
                {model.industries.length > 2 && (
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-lg">
                    +{model.industries.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-2">CAPABILITIES</h4>
              <div className="flex flex-wrap gap-1">
                {model.capabilities.slice(0, 3).map((capability) => (
                  <span
                    key={capability}
                    className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-lg border border-purple-700/30"
                  >
                    {capability}
                  </span>
                ))}
                {model.capabilities.length > 3 && (
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-lg">
                    +{model.capabilities.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-2">USE CASES</h4>
              <div className="flex flex-wrap gap-1">
                {model.useCases.slice(0, 2).map((useCase) => (
                  <span
                    key={useCase}
                    className="px-2 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded-lg border border-cyan-700/30"
                  >
                    {useCase}
                  </span>
                ))}
                {model.useCases.length > 2 && (
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-lg">
                    +{model.useCases.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          {!isComparisonMode && (onROIClick || onRoadmapClick) && (
            <div className="mt-4 pt-3 border-t border-slate-700/50">
              <div className="flex gap-2">
                {onROIClick && (
                  <motion.button
                    onClick={handleROIClick}
                    className="flex-1 px-3 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-700/30 text-green-300 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    ROI
                  </motion.button>
                )}
                {onRoadmapClick && (
                  <motion.button
                    onClick={handleRoadmapClick}
                    className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-700/30 text-blue-300 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Plan
                  </motion.button>
                )}
              </div>
            </div>
          )}

          {/* Click indicator */}
          <div className="mt-4 pt-3 border-t border-slate-700/50">
            <div className="flex items-center justify-center text-slate-500 group-hover:text-purple-400 transition-colors duration-300">
              <span className="text-xs font-medium mr-1">
                {isComparisonMode ? 'Click to compare' : 'Click for details'}
              </span>
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});