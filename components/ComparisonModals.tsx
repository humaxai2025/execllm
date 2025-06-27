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
    // Analyze the models to generate insights
    const costAnalysis = {
      free: models.filter(m => m.cost === 'Free').length,
      paid: models.filter(m => m.cost === 'Paid').length
    };

    const riskAnalysis = {
      low: models.filter(m => m.riskLevel === 'Low').length,
      medium: models.filter(m => m.riskLevel === 'Medium').length,
      high: models.filter(m => m.riskLevel === 'High').length
    };

    const integrationAnalysis = {
      low: models.filter(m => m.integrationComplexity === 'Low').length,
      medium: models.filter(m => m.integrationComplexity === 'Medium').length,
      high: models.filter(m => m.integrationComplexity === 'High').length
    };

    const complianceAnalysis = {
      enterprise: models.filter(m => m.complianceLevel === 'Enterprise').length,
      standard: models.filter(m => m.complianceLevel === 'Standard').length,
      basic: models.filter(m => m.complianceLevel === 'Basic').length
    };

    // Find common industries
    const allIndustries = models.flatMap(m => m.industries);
    const industryCount = allIndustries.reduce((acc, industry) => {
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const commonIndustries = Object.entries(industryCount)
      .filter(([_, count]) => count === models.length)
      .map(([industry, _]) => industry);

    const mostCoveredIndustries = Object.entries(industryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([industry, count]) => ({ industry, count }));

    // Vendor diversity
    const vendors = [...new Set(models.map(m => m.vendor))];
    const openSourceCount = models.filter(m => m.cost === 'Free').length;

    // Generate summary insights
    const insights = [];

    // Cost insights
    if (costAnalysis.free > 0 && costAnalysis.paid > 0) {
      insights.push(`Mixed cost strategy with ${costAnalysis.free} open-source and ${costAnalysis.paid} commercial options, providing flexibility for different budget scenarios.`);
    } else if (costAnalysis.free === models.length) {
      insights.push(`Full open-source approach offers maximum cost control and customization, but requires stronger internal technical capabilities.`);
    } else {
      insights.push(`Commercial-focused selection provides enterprise support and faster implementation, suitable for rapid deployment scenarios.`);
    }

    // Risk insights
    if (riskAnalysis.low >= models.length * 0.7) {
      insights.push(`Portfolio shows low-risk profile (${riskAnalysis.low}/${models.length} models) suitable for production environments and regulated industries.`);
    } else if (riskAnalysis.medium + riskAnalysis.high > riskAnalysis.low) {
      insights.push(`Mixed risk profile requires careful evaluation of deployment strategies and testing protocols before production use.`);
    }

    // Integration insights
    if (integrationAnalysis.low >= models.length * 0.7) {
      insights.push(`Low integration complexity across ${integrationAnalysis.low}/${models.length} models enables rapid deployment with minimal technical overhead.`);
    } else if (integrationAnalysis.high > 0) {
      insights.push(`Complex integration requirements for ${integrationAnalysis.high} model(s) will require dedicated technical resources and extended timeline.`);
    }

    // Compliance insights
    if (complianceAnalysis.enterprise >= models.length * 0.5) {
      insights.push(`Strong enterprise compliance coverage supports regulated industry requirements and data governance needs.`);
    }

    // Industry coverage
    if (commonIndustries.length > 0) {
      insights.push(`All models validated for ${commonIndustries.slice(0, 2).join(' and ')} use cases, ensuring industry-specific optimization.`);
    } else if (mostCoveredIndustries.length > 0) {
      insights.push(`Strongest coverage in ${mostCoveredIndustries[0].industry} (${mostCoveredIndustries[0].count}/${models.length} models) with good cross-industry applicability.`);
    }

    // Vendor diversity insight
    if (vendors.length === models.length) {
      insights.push(`Maximum vendor diversity reduces single-vendor dependency and provides negotiation leverage.`);
    } else if (vendors.length === 1) {
      insights.push(`Single-vendor approach simplifies vendor relationship management and potential volume discounts.`);
    }

    // Generate recommendations
    const recommendations = [];

    if (models.length >= 3) {
      recommendations.push("Consider running parallel pilots with top 2-3 models to validate performance against specific use cases.");
    }

    if (riskAnalysis.low > 0 && riskAnalysis.high > 0) {
      recommendations.push("Deploy low-risk models first for immediate value, while conducting extended evaluation of higher-risk options.");
    }

    if (integrationAnalysis.low > 0) {
      recommendations.push(`Prioritize models with low integration complexity (${integrationAnalysis.low} available) for fastest time-to-value.`);
    }

    if (openSourceCount > 0 && costAnalysis.paid > 0) {
      recommendations.push("Evaluate open-source options for non-critical applications and commercial solutions for mission-critical deployments.");
    }

    if (complianceAnalysis.enterprise < models.length && (mostCoveredIndustries.some(i => ['Financial Services', 'Healthcare & Life Sciences', 'Legal & Compliance'].includes(i.industry)))) {
      recommendations.push("Prioritize enterprise-grade compliance options for regulated industry applications.");
    }

    const quickWins = models.filter(m => 
      m.riskLevel === 'Low' && 
      m.integrationComplexity === 'Low' && 
      (m.timeToValue?.includes('1-2 weeks') || m.timeToValue?.includes('1 week'))
    );

    if (quickWins.length > 0) {
      recommendations.push(`${quickWins[0].name} offers fastest implementation path with low risk and complexity.`);
    }

    return {
      insights,
      recommendations,
      keyMetrics: {
        totalModels: models.length,
        vendors: vendors.length,
        avgRisk: riskAnalysis.low > riskAnalysis.medium + riskAnalysis.high ? 'Low' : 'Medium',
        enterpriseCompliance: complianceAnalysis.enterprise,
        topIndustry: mostCoveredIndustries[0]?.industry || 'Mixed'
      }
    };
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
    // Create a comprehensive comparison report
    const currentDate = new Date().toLocaleDateString();
    const comparisonReport = `
ExecLLM - AI Model Comparison Report
Generated on: ${currentDate}
Models Compared: ${models.length}

${'='.repeat(60)}

${models.map((model, index) => `
${index + 1}. ${model.name} by ${model.vendor}
${'─'.repeat(40)}
Cost Tier: ${model.cost}
Target Industries: ${model.industries.join(', ')}
Category: ${model.category || 'N/A'}
Release Year: ${model.releaseDate || 'N/A'}
Model Size: ${model.modelSize || 'N/A'}
Time to Value: ${model.timeToValue || 'N/A'}
Integration Complexity: ${model.integrationComplexity || 'N/A'}
Compliance Level: ${model.complianceLevel || 'N/A'}
Risk Level: ${model.riskLevel || 'N/A'}

Key Capabilities:
${model.capabilities.map(cap => `• ${cap}`).join('\n')}

Best Use Cases:
${model.useCases.map(use => `• ${use}`).join('\n')}

Deployment Options:
${model.deployment.map(dep => `• ${dep}`).join('\n')}

Summary:
${model.summary}

`).join('\n' + '='.repeat(60) + '\n')}

Report generated by ExecLLM - Executive AI Model Comparison Platform
Built with ❤️ by HumanXAI

For the latest information and interactive comparisons, visit ExecLLM.
`;

    const blob = new Blob([comparisonReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExecLLM-Comparison-${models.map(m => m.name.replace(/\s+/g, '-')).join('-vs-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToHTML = () => {
    // Generate executive summary
    const execSummary = generateExecutiveSummary(models);
    const currentDate = new Date().toLocaleDateString();
    
    const htmlContent = `
<!DOCTYPE html>
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
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px solid #6366f1;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #6366f1;
      font-size: 36px;
      margin: 0;
      font-weight: 700;
    }
    .header .subtitle {
      color: #64748b;
      font-size: 18px;
      margin: 8px 0 0 0;
      font-weight: 600;
    }
    .executive-summary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 40px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    .executive-summary h2 {
      margin-top: 0;
      font-size: 28px;
      font-weight: 700;
      text-align: center;
    }
    .key-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 25px 0;
    }
    .metric-card {
      background: rgba(255,255,255,0.15);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .metric-number {
      font-size: 24px;
      font-weight: bold;
      display: block;
    }
    .metric-label {
      font-size: 12px;
      opacity: 0.9;
      margin-top: 5px;
    }
    .insights-section, .recommendations-section {
      margin: 25px 0;
    }
    .insights-section h3, .recommendations-section h3 {
      color: white;
      font-size: 18px;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      padding-bottom: 8px;
    }
    .insight-item, .recommendation-item {
      background: rgba(255,255,255,0.1);
      padding: 12px;
      margin: 8px 0;
      border-radius: 6px;
      border-left: 3px solid rgba(255,255,255,0.5);
    }
    .meta-info {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 25px;
      border-left: 4px solid #6366f1;
      font-size: 14px;
    }
    .model-section {
      margin-bottom: 30px;
      page-break-inside: avoid;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      background: #fefefe;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .model-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e2e8f0;
    }
    .model-name {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 5px 0;
    }
    .model-vendor {
      font-size: 16px;
      color: #6366f1;
      font-weight: 600;
    }
    .cost-badge {
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 14px;
      color: white;
    }
    .cost-free { background: linear-gradient(135deg, #10b981, #059669) !important; }
    .cost-paid { background: linear-gradient(135deg, #3b82f6, #6366f1) !important; }
    .detail-section {
      margin: 20px 0;
    }
    .detail-title {
      font-size: 16px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
    }
    .summary-text {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      font-style: italic;
      border-left: 4px solid #6366f1;
      font-size: 14px;
      line-height: 1.6;
    }
    .exec-overview {
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
      border-left: 4px solid #f59e0b;
    }
    .exec-overview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      font-size: 13px;
    }
    .exec-metric {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .exec-metric-label {
      font-weight: 600;
      color: #92400e;
    }
    .exec-metric-value {
      font-weight: 700;
      color: #451a03;
    }
    .industries-grid, .capability-grid, .usecase-grid, .deployment-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 8px;
      margin-top: 10px;
    }
    .industry-item {
      background: #e0f2fe;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      border-left: 3px solid #0288d1;
      font-weight: 600;
    }
    .capability-item, .usecase-item, .deployment-item {
      background: #f1f5f9;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      border-left: 3px solid #6366f1;
    }
    .tech-details {
      background: #f8fafc;
      padding: 12px;
      border-radius: 6px;
      font-size: 14px;
    }
    .section-divider {
      border: none;
      height: 3px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1);
      margin: 40px 0;
      border-radius: 2px;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 2px solid #e2e8f0;
      padding-top: 20px;
    }
    .next-steps {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
      border-left: 4px solid #0ea5e9;
    }
    .next-steps h3 {
      color: #0c4a6e;
      margin-top: 0;
    }
    .next-steps ol {
      color: #075985;
      margin: 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 8px 0;
    }
    @media print {
      body { margin: 0; padding: 15mm; }
      .model-section { page-break-inside: avoid; margin-bottom: 20px; }
      .executive-summary { page-break-inside: avoid; }
    }
    @page { margin: 1in; size: A4; }
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
      font-size: 16px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
    }
    .summary-text {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      font-style: italic;
      border-left: 4px solid #6366f1;
      font-size: 14px;
      line-height: 1.6;
    }
    .industries-grid, .capability-grid, .usecase-grid, .deployment-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 8px;
      margin-top: 10px;
    }
    .industry-item {
      background: #e0f2fe;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      border-left: 3px solid #0288d1;
      font-weight: 600;
    }
    .capability-item, .usecase-item, .deployment-item {
      background: #f1f5f9;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      border-left: 3px solid #6366f1;
    }
    .tech-details, .exec-details {
      background: #f8fafc;
      padding: 12px;
      border-radius: 6px;
      font-size: 14px;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 2px solid #e2e8f0;
      padding-top: 20px;
    }
    @media print {
      body { margin: 0; padding: 15mm; }
      .model-section { page-break-inside: avoid; margin-bottom: 20px; }
    }
    @page { margin: 1in; size: A4; }
  </style>
</head>
<body>
  <div class="header">
    <h1>ExecLLM</h1>
    <div class="subtitle">AI Model Comparison Report</div>
  </div>
  
  <div class="meta-info">
    <strong>Report Generated:</strong> ${currentDate}<br>
    <strong>Models Compared:</strong> ${models.length}<br>
    <strong>Type:</strong> Executive Business Analysis with Industry Mapping
  </div>

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
        <div class="detail-title">Overview</div>
        <div class="summary-text">${model.summary}</div>
      </div>

      <div class="detail-section">
        <div class="detail-title">Target Industries</div>
        <div class="industries-grid">
          ${model.industries.map(industry => `<div class="industry-item">🏭 ${industry}</div>`).join('')}
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-title">Executive Summary</div>
        <div class="exec-details">
          <strong>Time to Value:</strong> ${model.timeToValue || 'N/A'}<br>
          <strong>Integration Complexity:</strong> ${model.integrationComplexity || 'N/A'}<br>
          <strong>Compliance Level:</strong> ${model.complianceLevel || 'N/A'}<br>
          <strong>Risk Level:</strong> ${model.riskLevel || 'N/A'}<br>
          <strong>Vendor Support:</strong> ${model.vendorSupport || 'N/A'}
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
  </div>
</body>
</html>`;

    // Create and download HTML file
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExecLLM-Comparison-Report-${models.map(m => m.name.replace(/\s+/g, '-')).join('-vs-')}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderCellContent = (model: LLMModel, row: typeof comparisonRows[0]) => {
    const value = model[row.key as keyof LLMModel];
    
    switch (row.type) {
      case "badge":
        if (row.key === "cost") {
          return (
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${costColors[value as string] || "bg-gray-500 text-white"}`}>
              {value}
            </span>
          );
        }
        return value;
      
      case "complexity":
        const complexityColors = {
          'Low': 'text-green-400',
          'Medium': 'text-yellow-400',
          'High': 'text-red-400'
        };
        return (
          <span className={`font-medium ${complexityColors[value as keyof typeof complexityColors] || 'text-slate-300'}`}>
            {value}
          </span>
        );
      
      case "risk":
        const riskColors = {
          'Low': 'text-green-400',
          'Medium': 'text-yellow-400',
          'High': 'text-red-400'
        };
        return (
          <span className={`font-medium ${riskColors[value as keyof typeof riskColors] || 'text-slate-300'}`}>
            {value}
          </span>
        );
      
      case "list":
        if (Array.isArray(value)) {
          const maxItems = row.key === "industries" ? 3 : 4;
          return (
            <div className="space-y-1">
              {value.slice(0, maxItems).map((item, index) => (
                <div key={index} className={`text-sm px-2 py-1 rounded ${
                  row.key === "industries" 
                    ? "bg-cyan-700/30 text-cyan-300" 
                    : "bg-slate-700/30 text-slate-300"
                }`}>
                  {row.key === "industries" && "🏭 "}{item}
                </div>
              ))}
              {value.length > maxItems && (
                <div className="text-xs text-slate-400">+{value.length - maxItems} more</div>
              )}
            </div>
          );
        }
        return value;
      
      case "text":
      default:
        if (row.key === "summary") {
          return <div className="text-sm leading-relaxed">{value}</div>;
        }
        return value || "N/A";
    }
  };

  // Find common industries across selected models
  const commonIndustries = models.length > 1 ? 
    models[0].industries.filter(industry => 
      models.every(model => model.industries.includes(industry))
    ) : [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden border border-slate-700/50"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative z-10 p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  Model Comparison
                </h2>
                <p className="text-slate-400">
                  Comparing {models.length} AI model{models.length !== 1 ? 's' : ''} side-by-side
                </p>
                {commonIndustries.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-slate-400">Common Industries:</span>
                    <div className="flex gap-1">
                      {commonIndustries.slice(0, 3).map(industry => (
                        <span key={industry} className="px-2 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded border border-cyan-700/30">
                          🏭 {industry}
                        </span>
                      ))}
                      {commonIndustries.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded">
                          +{commonIndustries.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative export-dropdown">
                  <motion.button
                    onClick={() => setShowExportOptions(!showExportOptions)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>

                  <AnimatePresence>
                    {showExportOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 shadow-2xl z-30 min-w-48"
                      >
                        <div className="space-y-2">
                          <motion.button
                            onClick={() => exportComparison('text')}
                            className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 hover:text-white transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="text-left">
                              <div className="font-medium">Text File</div>
                              <div className="text-xs text-slate-400">Plain text format (.txt)</div>
                            </div>
                          </motion.button>
                          
                          <motion.button
                            onClick={() => exportComparison('html')}
                            className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 hover:text-white transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <div className="text-left">
                              <div className="font-medium">HTML Report</div>
                              <div className="text-xs text-slate-400">Formatted document (.html)</div>
                            </div>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all duration-200"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-auto max-h-[calc(90vh-120px)]">
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50">
                <tr>
                  <td className="p-4 font-medium text-slate-300 w-48">Attribute</td>
                  {models.map((model) => (
                    <td key={model.name} className="p-4 min-w-80">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{model.name}</h3>
                          <p className={`text-sm font-medium ${vendorColors[model.vendor] || "text-slate-400"}`}>
                            {model.vendor}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveModel(model.name)}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                          title="Remove from comparison"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {comparisonRows.map((row, rowIndex) => (
                  <tr 
                    key={row.key}
                    className={`border-b border-slate-700/30 ${rowIndex % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'}`}
                  >
                    <td className="p-4 font-medium text-slate-300 bg-slate-800/30">
                      {row.label}
                    </td>
                    {models.map((model) => (
                      <td key={`${model.name}-${row.key}`} className="p-4 text-slate-200 align-top">
                        {renderCellContent(model, row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div>
                Use checkboxes on model cards to add/remove models from comparison
              </div>
              <div>
                Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">ESC</kbd> to close
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}