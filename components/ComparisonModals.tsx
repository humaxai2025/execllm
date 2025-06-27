import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface ComparisonModalProps {
  models: LLMModel[];
  onClose: () => void;
  onRemoveModel: (modelName: string) => void;
}

const costColors: Record<string, string> = {
  "Free": "bg-green-500 text-white",
  "Paid": "bg-blue-500 text-white"
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

const comparisonRows = [
  { key: "vendor", label: "Vendor", type: "text" },
  { key: "cost", label: "Cost Tier", type: "badge" },
  { key: "industries", label: "Target Industries", type: "list" },
  { key: "category", label: "Category", type: "text" },
  { key: "releaseDate", label: "Release Year", type: "text" },
  { key: "modelSize", label: "Model Size", type: "text" },
  { key: "timeToValue", label: "Time to Value", type: "text" },
  { key: "integrationComplexity", label: "Integration Complexity", type: "complexity" },
  { key: "complianceLevel", label: "Compliance Level", type: "text" },
  { key: "riskLevel", label: "Risk Level", type: "risk" },
  { key: "capabilities", label: "Key Capabilities", type: "list" },
  { key: "useCases", label: "Best Use Cases", type: "list" },
  { key: "deployment", label: "Deployment Options", type: "list" },
  { key: "summary", label: "Summary", type: "text" }
];

export function ComparisonModal({ models, onClose, onRemoveModel }: ComparisonModalProps) {
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showExportOptions) {
          setShowExportOptions(false);
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (showExportOptions && !(e.target as Element).closest('.export-dropdown')) {
        setShowExportOptions(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, showExportOptions]);

  const generateExecutiveSummary = (models: LLMModel[]) => {
    // ...exact same code as before...
    // (for brevity, leave as-is, or paste from above; it's correct)
    // (see above code for the content)
    // -- omitted for brevity --
    // This whole function is syntactically correct as-is!
    // Just keep the original.
    // 
    // ... (Paste the full generateExecutiveSummary function here, unchanged)
    // ... (it's omitted in this sample for readability)
  };

  const exportComparison = (format: 'text' | 'html') => {
    if (format === 'html') {
      exportToHTML();
    } else {
      exportToText();
    }
    setShowExportOptions(false);
  };

  const exportToText = () => {
    // ...same as before, this block is correct...
    // Just keep the original code.
    // ... (Paste the full exportToText function here, unchanged)
  };

  const exportToHTML = () => {
    const execSummary = generateExecutiveSummary(models);
    const currentDate = new Date().toLocaleDateString();

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ExecLLM Executive Comparison Report</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.4;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: white;
    }
    /* ... (all your CSS here, keep as-is from your code, up to the closing </style> tag) ... */
  </style>
</head>
<body>
  <div class="header">
    <h1>ExecLLM</h1>
    <div class="subtitle">Executive AI Model Comparison Report</div>
  </div>
  <div class="executive-summary">
    <h2>📊 Executive Summary</h2>
    <div class="key-metrics">
      <div class="metric-card">
        <span class="metric-number">${execSummary.keyMetrics.totalModels}</span>
        <div class="metric-label">Models Evaluated</div>
      </div>
      <div class="metric-card">
        <span class="metric-number">${execSummary.keyMetrics.vendors}</span>
        <div class="metric-label">Vendor${execSummary.keyMetrics.vendors !== 1 ? 's' : ''}</div>
      </div>
      <div class="metric-card">
        <span class="metric-number">${execSummary.keyMetrics.avgRisk}</span>
        <div class="metric-label">Risk Profile</div>
      </div>
      <div class="metric-card">
        <span class="metric-number">${execSummary.keyMetrics.enterpriseCompliance}/${execSummary.keyMetrics.totalModels}</span>
        <div class="metric-label">Enterprise Ready</div>
      </div>
    </div>
    <div class="insights-section">
      <h3>🎯 Strategic Insights</h3>
      ${execSummary.insights.map((insight, i) =>
        `<div class="insight-item"><strong>${i + 1}.</strong> ${insight}</div>`
      ).join('')}
    </div>
    <div class="recommendations-section">
      <h3>💡 Executive Recommendations</h3>
      ${execSummary.recommendations.map((rec, i) =>
        `<div class="recommendation-item"><strong>${i + 1}.</strong> ${rec}</div>`
      ).join('')}
    </div>
    <div class="next-steps">
      <h3>🚀 Next Steps</h3>
      <ol>
        <li>Review detailed model analysis below</li>
        <li>Conduct proof-of-concept with recommended models</li>
        <li>Establish vendor relationships and pricing discussions</li>
        <li>Develop implementation timeline and resource allocation</li>
        <li>Create success metrics and evaluation framework</li>
      </ol>
    </div>
  </div>
  <div class="meta-info">
    <strong>Report Generated:</strong> ${currentDate}<br>
    <strong>Models Compared:</strong> ${models.length}<br>
    <strong>Analysis Type:</strong> Executive Business Analysis with Industry Mapping<br>
    <strong>Primary Industry Focus:</strong> ${execSummary.keyMetrics.topIndustry}
  </div>
  <hr class="section-divider">
  ${models.map((model, index) => `
    <div class="model-section">
      <div class="model-header">
        <div>
          <h2 class="model-name">${model.name}</h2>
          <div class="model-vendor">${model.vendor}</div>
        </div>
        <div class="cost-badge cost-${model.cost.toLowerCase()}">${model.cost}</div>
      </div>
      <div class="detail-section">
        <div class="detail-title">Executive Overview</div>
        <div class="exec-overview">
          <div class="exec-overview-grid">
            <div class="exec-metric">
              <span class="exec-metric-label">Time to Value:</span>
              <span class="exec-metric-value">${model.timeToValue || 'N/A'}</span>
            </div>
            <div class="exec-metric">
              <span class="exec-metric-label">Integration:</span>
              <span class="exec-metric-value">${model.integrationComplexity || 'N/A'}</span>
            </div>
            <div class="exec-metric">
              <span class="exec-metric-label">Compliance:</span>
              <span class="exec-metric-value">${model.complianceLevel || 'N/A'}</span>
            </div>
            <div class="exec-metric">
              <span class="exec-metric-label">Risk Level:</span>
              <span class="exec-metric-value">${model.riskLevel || 'N/A'}</span>
            </div>
            <div class="exec-metric">
              <span class="exec-metric-label">Support:</span>
              <span class="exec-metric-value">${model.vendorSupport || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-title">Business Summary</div>
        <div class="summary-text">${model.summary}</div>
      </div>
      <div class="detail-section">
        <div class="detail-title">Target Industries</div>
        <div class="industries-grid">
          ${model.industries.map(industry => `<div class="industry-item">🏭 ${industry}</div>`).join('')}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-title">Key Capabilities</div>
        <div class="capability-grid">
          ${model.capabilities.map(cap => `<div class="capability-item">• ${cap}</div>`).join('')}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-title">Best Use Cases</div>
        <div class="usecase-grid">
          ${model.useCases.map(use => `<div class="usecase-item">• ${use}</div>`).join('')}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-title">Deployment Options</div>
        <div class="deployment-grid">
          ${model.deployment.map(dep => `<div class="deployment-item">• ${dep}</div>`).join('')}
        </div>
      </div>
      ${(model.category || model.releaseDate || model.modelSize) ? `
        <div class="detail-section">
          <div class="detail-title">Technical Details</div>
          <div class="tech-details">
            ${model.category ? `<strong>Category:</strong> ${model.category}<br>` : ''}
            ${model.releaseDate ? `<strong>Release Year:</strong> ${model.releaseDate}<br>` : ''}
            ${model.modelSize ? `<strong>Model Size:</strong> ${model.modelSize}` : ''}
          </div>
        </div>
      ` : ''}
    </div>
  `).join('')}
  <div class="footer">
    <p><strong>ExecLLM</strong> - Executive AI Model Comparison Platform</p>
    <p>Built with ❤️ by HumanXAI</p>
    <p>For the latest information and interactive comparisons, visit ExecLLM</p>
    <p>Support our mission: <a href="https://buymeacoffee.com/humanxai">https://buymeacoffee.com/humanxai</a></p>
    <hr style="margin: 20px 0; border: none; height: 1px; background: #e2e8f0;">
    <p style="font-size: 11px; color: #94a3b8;">
      <strong>Methodology:</strong> This comparison uses ExecLLM's executive decision framework, evaluating models across business-critical dimensions including strategic fit, risk assessment, implementation complexity, and vendor ecosystem. 
      <strong>Disclaimer:</strong> Model capabilities and vendor offerings change rapidly. Verify current specifications and conduct proof-of-concept testing before making final procurement decisions.
    </p>
  </div>
</body>
</html>`;

    // Create and download HTML file
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExecLLM-Executive-Report-${models.map(m => m.name.replace(/\s+/g, '-')).join('-vs-')}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderCellContent = (model: LLMModel, row: typeof comparisonRows[0]) => {
    const value = model[row.key as keyof LLMModel];
    // ...the rest of this function is correct, keep as-is...
    // (for brevity, leave unchanged from your original)
  };

  // Find common industries across selected models
  const commonIndustries = models.length > 1 ?
    models[0].industries.filter(industry =>
      models.every(model => model.industries.includes(industry))
    ) : [];

  return (
    <AnimatePresence>
      {/* ...your full JSX as before, unchanged... */}
      {/* This whole section is fine as JSX, keep as-is */}
    </AnimatePresence>
  );
}
