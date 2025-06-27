import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface ROICalculatorProps {
  model: LLMModel;
  onClose: () => void;
}

interface ROIInputs {
  currentCosts: number;
  teamSize: number;
  monthlyVolume: number;
  hourlyRate: number;
  useCase: string;
}

const useCaseTemplates = {
  "customer-service": {
    label: "Customer Service Automation",
    automationRate: 0.4,
    timePerTask: 15,
    description: "Automate 40% of customer inquiries"
  },
  "content-creation": {
    label: "Content Creation",
    automationRate: 0.6,
    timePerTask: 120,
    description: "Generate 60% faster content creation"
  },
  "document-processing": {
    label: "Document Processing",
    automationRate: 0.7,
    timePerTask: 45,
    description: "Automate 70% of document review"
  },
  "code-assistance": {
    label: "Development Assistance",
    automationRate: 0.3,
    timePerTask: 60,
    description: "30% faster development cycles"
  }
};

export function ROICalculator({ model, onClose }: ROICalculatorProps) {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentCosts: 50000,
    teamSize: 5,
    monthlyVolume: 1000,
    hourlyRate: 75,
    useCase: "customer-service"
  });

  const calculations = useMemo(() => {
    const template = useCaseTemplates[inputs.useCase as keyof typeof useCaseTemplates];
    
    // Monthly calculations
    const monthlyLaborHours = inputs.monthlyVolume * (template.timePerTask / 60);
    const monthlyLaborCost = monthlyLaborHours * inputs.hourlyRate;
    const timeSavingsHours = monthlyLaborHours * template.automationRate;
    const monthlySavings = timeSavingsHours * inputs.hourlyRate;
    
    // AI costs (estimated based on model tier)
    const costMultiplier = model.cost === 'Free' ? 0 : model.cost === 'Paid' ? 0.1 : 0.2;
    const monthlyAICost = inputs.monthlyVolume * costMultiplier;
    
    // Implementation costs
    const implementationCost = inputs.teamSize * 2000; // $2k per team member
    const trainingCost = inputs.teamSize * 500; // $500 per person training
    const oneTimeCosts = implementationCost + trainingCost;
    
    // Net calculations
    const netMonthlySavings = monthlySavings - monthlyAICost;
    const annualSavings = netMonthlySavings * 12;
    const paybackMonths = oneTimeCosts / netMonthlySavings;
    const threeYearROI = ((annualSavings * 3 - oneTimeCosts) / oneTimeCosts) * 100;
    
    return {
      monthlyLaborCost,
      monthlySavings,
      monthlyAICost,
      netMonthlySavings,
      annualSavings,
      oneTimeCosts,
      paybackMonths,
      threeYearROI,
      timeSavingsHours,
      template
    };
  }, [inputs, model]);

  const updateInput = (field: keyof ROIInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ROI Calculator
              </h2>
              <p className="text-slate-400">Business case for {model.name}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Your Scenario</h3>
              
              {/* Use Case Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Use Case</label>
                <select
                  value={inputs.useCase}
                  onChange={(e) => updateInput('useCase', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  {Object.entries(useCaseTemplates).map(([key, template]) => (
                    <option key={key} value={key}>{template.label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">{calculations.template.description}</p>
              </div>

              {/* Financial Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Team Size</label>
                  <input
                    type="number"
                    value={inputs.teamSize}
                    onChange={(e) => updateInput('teamSize', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={inputs.hourlyRate}
                    onChange={(e) => updateInput('hourlyRate', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Monthly Volume</label>
                <input
                  type="number"
                  value={inputs.monthlyVolume}
                  onChange={(e) => updateInput('monthlyVolume', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 1000 tickets, documents, requests"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                />
                <p className="text-xs text-slate-400 mt-1">Tasks/tickets/documents per month</p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Financial Impact</h3>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {calculations.threeYearROI > 0 ? '+' : ''}{calculations.threeYearROI.toFixed(0)}%
                  </div>
                  <div className="text-sm text-green-300">3-Year ROI</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {calculations.paybackMonths.toFixed(1)}
                  </div>
                  <div className="text-sm text-blue-300">Payback (months)</div>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="bg-slate-800/30 rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-white">Monthly Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Time Savings:</span>
                    <span className="text-white font-medium">{calculations.timeSavingsHours.toFixed(0)} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Labor Savings:</span>
                    <span className="text-green-400 font-medium">${calculations.monthlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">AI Costs:</span>
                    <span className="text-red-400 font-medium">-${calculations.monthlyAICost.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-600/50 pt-2 flex justify-between">
                    <span className="text-white font-medium">Net Monthly Savings:</span>
                    <span className="text-green-400 font-bold">${calculations.netMonthlySavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Implementation Costs */}
              <div className="bg-slate-800/30 rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-white">One-Time Costs</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Implementation:</span>
                    <span className="text-white font-medium">${(inputs.teamSize * 2000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Training:</span>
                    <span className="text-white font-medium">${(inputs.teamSize * 500).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-600/50 pt-2 flex justify-between">
                    <span className="text-white font-medium">Total Investment:</span>
                    <span className="text-orange-400 font-bold">${calculations.oneTimeCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Business Case Summary */}
              <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-xl p-4">
                <h4 className="font-medium text-purple-300 mb-2">Executive Summary</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Implementing {model.name} for {calculations.template.label.toLowerCase()} will save 
                  <span className="text-white font-medium"> ${calculations.netMonthlySavings.toLocaleString()}/month</span> with 
                  payback in <span className="text-white font-medium">{calculations.paybackMonths.toFixed(1)} months</span>. 
                  Annual savings: <span className="text-green-400 font-medium">${calculations.annualSavings.toLocaleString()}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}