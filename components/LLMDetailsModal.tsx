import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface LLMDetailsModalProps {
  model: LLMModel | null;
  onClose: () => void;
}

const costColors: Record<string, string> = {
  "Free": "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
  "Paid": "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
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

export function LLMDetailsModal({ model, onClose }: LLMDetailsModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (model) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [model, onClose]);

  return (
    <AnimatePresence>
      {model && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5"></div>
            
            {/* Header */}
            <div className="relative z-10 p-8 border-b border-slate-700/50">
              <button
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                onClick={onClose}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="pr-12">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {model.name}
                  </h2>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${costColors[model.cost] || "bg-gray-600 text-white"} shadow-lg`}>
                    {model.cost}
                  </div>
                </div>
                <p className={`text-lg font-semibold ${vendorColors[model.vendor] || "text-slate-400"}`}>
                  {model.vendor}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 space-y-6 max-h-[60vh] overflow-y-auto modal-scroll">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                  Overview
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {model.summary}
                </p>
              </div>

              {/* Industry Focus */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                  Industry Focus
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {model.industries.map((industry) => (
                    <div
                      key={industry}
                      className={`flex items-center p-3 rounded-xl border ${
                        industryColors[industry] || "bg-slate-900/20 text-slate-300 border-slate-700/30"
                      }`}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mr-3"></div>
                      <span className="font-medium">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                  Capabilities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {model.capabilities.map((capability) => (
                    <div
                      key={capability}
                      className="flex items-center p-3 bg-purple-900/20 border border-purple-700/30 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-purple-300 font-medium">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                  Best Use Cases
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {model.useCases.map((useCase) => (
                    <div
                      key={useCase}
                      className="flex items-center p-3 bg-cyan-900/20 border border-cyan-700/30 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      <span className="text-cyan-300 font-medium">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deployment */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                  Deployment Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {model.deployment.map((option) => (
                    <span
                      key={option}
                      className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-xl font-medium border border-slate-600"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              {/* Executive Summary */}
              {(model.timeToValue || model.integrationComplexity || model.complianceLevel || model.vendorSupport || model.riskLevel) && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                    Executive Summary
                  </h3>
                  <div className="grid grid-cols-1 gap-3 bg-slate-800/30 p-4 rounded-xl">
                    {model.timeToValue && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time to Value:</span>
                        <span className="text-white font-medium">{model.timeToValue}</span>
                      </div>
                    )}
                    {model.integrationComplexity && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Integration:</span>
                        <span className={`font-medium ${
                          model.integrationComplexity === 'Low' ? 'text-green-400' :
                          model.integrationComplexity === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {model.integrationComplexity}
                        </span>
                      </div>
                    )}
                    {model.complianceLevel && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Compliance:</span>
                        <span className="text-white font-medium">{model.complianceLevel}</span>
                      </div>
                    )}
                    {model.vendorSupport && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Support:</span>
                        <span className="text-white font-medium">{model.vendorSupport}</span>
                      </div>
                    )}
                    {model.riskLevel && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Risk Level:</span>
                        <span className={`font-medium ${
                          model.riskLevel === 'Low' ? 'text-green-400' :
                          model.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {model.riskLevel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Technical Details */}
              {(model.category || model.releaseDate || model.modelSize) && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                    Technical Details
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-xl space-y-2">
                    {model.category && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="text-white font-medium">{model.category}</span>
                      </div>
                    )}
                    {model.releaseDate && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Release Year:</span>
                        <span className="text-white font-medium">{model.releaseDate}</span>
                      </div>
                    )}
                    {model.modelSize && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Model Size:</span>
                        <span className="text-white font-medium">{model.modelSize}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}