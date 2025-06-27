import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { type LLMModel } from "../data/llms";

interface RoadmapGeneratorProps {
  model: LLMModel;
  useCase: string;
  teamSize: number;
  onClose: () => void;
}

interface Milestone {
  phase: string;
  duration: string;
  title: string;
  deliverables: string[];
  risks: string[];
  team: string[];
  success_metrics: string[];
}

export function RoadmapGenerator({ model, useCase, teamSize, onClose }: RoadmapGeneratorProps) {
  const roadmap = useMemo(() => {
    const baseComplexity = model.integrationComplexity === 'Low' ? 1 : 
                          model.integrationComplexity === 'Medium' ? 1.5 : 2;
    
    const teamMultiplier = teamSize > 10 ? 1.3 : teamSize > 5 ? 1.1 : 1;
    
    const milestones: Milestone[] = [
      {
        phase: "Phase 1",
        duration: `${Math.ceil(2 * baseComplexity)} weeks`,
        title: "Foundation & Planning",
        deliverables: [
          "Technical architecture design",
          "Data security and compliance review",
          "Vendor agreements and API access",
          "Team training plan",
          "Success metrics definition"
        ],
        risks: [
          "Data privacy compliance delays",
          "API access restrictions",
          "Team availability conflicts"
        ],
        team: ["Project Manager", "Technical Lead", "Security Officer"],
        success_metrics: [
          "Architecture approved by IT",
          "Security compliance verified",
          "Team training completed"
        ]
      },
      {
        phase: "Phase 2",
        duration: `${Math.ceil(4 * baseComplexity * teamMultiplier)} weeks`,
        title: "Pilot Implementation",
        deliverables: [
          "Proof of concept deployment",
          "Initial integration with existing systems",
          "User acceptance testing",
          "Performance benchmarking",
          "Feedback collection and analysis"
        ],
        risks: [
          "Integration complexity underestimated",
          "Performance below expectations",
          "User adoption resistance"
        ],
        team: ["Technical Lead", "Developers", "QA Testers", "End Users"],
        success_metrics: [
          `${useCase === 'customer-service' ? '40%' : useCase === 'content-creation' ? '60%' : '50%'} automation rate achieved`,
          "User satisfaction > 7/10",
          "No critical security issues"
        ]
      },
      {
        phase: "Phase 3",
        duration: `${Math.ceil(6 * baseComplexity * teamMultiplier)} weeks`,
        title: "Full Deployment",
        deliverables: [
          "Production system deployment",
          "Full team onboarding",
          "Monitoring and alerting setup",
          "Documentation and knowledge transfer",
          "Success metrics tracking"
        ],
        risks: [
          "Scaling issues in production",
          "Change management challenges",
          "Budget overruns"
        ],
        team: ["Full Project Team", "DevOps", "Support Team"],
        success_metrics: [
          "100% team adoption",
          "ROI targets met",
          "System uptime > 99.5%"
        ]
      },
      {
        phase: "Phase 4",
        duration: `${Math.ceil(4 * teamMultiplier)} weeks`,
        title: "Optimization & Scale",
        deliverables: [
          "Performance optimization",
          "Advanced feature rollout",
          "Process refinement",
          "ROI measurement and reporting",
          "Future roadmap planning"
        ],
        risks: [
          "Feature creep",
          "Optimization diminishing returns",
          "Team complacency"
        ],
        team: ["Technical Lead", "Business Analysts", "End Users"],
        success_metrics: [
          "20% improvement in key metrics",
          "Positive ROI achieved",
          "Team satisfaction > 8/10"
        ]
      }
    ];

    return milestones;
  }, [model, useCase, teamSize]);

  const totalDuration = useMemo(() => {
    const weeks = roadmap.reduce((total, milestone) => {
      const duration = parseInt(milestone.duration.split(' ')[0]);
      return total + duration;
    }, 0);
    return `${weeks} weeks (${Math.ceil(weeks / 4)} months)`;
  }, [roadmap]);

  const exportRoadmap = () => {
    const currentDate = new Date().toLocaleDateString();
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AI Implementation Roadmap - ${model.name}</title>
  <style>
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
      line-height: 1.6;
      color: #1a202c;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 36px;
      font-weight: 700;
    }
    .header .subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin: 0 0 15px 0;
    }
    .timeline-info {
      background: rgba(255,255,255,0.2);
      padding: 15px 25px;
      border-radius: 25px;
      display: inline-block;
      font-weight: 600;
    }
    .content {
      padding: 40px;
    }
    .timeline-overview {
      background: linear-gradient(135deg, #f8fafc, #e2e8f0);
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 40px;
      border: 3px solid #e2e8f0;
    }
    .timeline-overview h3 {
      margin: 0 0 20px 0;
      font-size: 24px;
      color: #1e293b;
      text-align: center;
    }
    .timeline-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }
    .timeline-segment {
      background: linear-gradient(135deg, #4f46e5, #06b6d4);
      height: 8px;
      border-radius: 4px;
      position: relative;
    }
    .timeline-labels {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
    }
    .phase-container {
      margin-bottom: 40px;
    }
    .phase-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      border: 2px solid #e2e8f0;
      overflow: hidden;
      margin-bottom: 25px;
    }
    .phase-header {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      padding: 25px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .phase-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
    .phase-duration {
      background: rgba(255,255,255,0.2);
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
    }
    .phase-number {
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
    }
    .phase-content {
      padding: 30px;
    }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .content-section h4 {
      color: #374151;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 15px 0;
      display: flex;
      align-items: center;
    }
    .content-section h4::before {
      content: '';
      width: 4px;
      height: 20px;
      background: linear-gradient(135deg, #4f46e5, #06b6d4);
      border-radius: 2px;
      margin-right: 10px;
    }
    .deliverables-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .deliverables-list li {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 12px 15px;
      margin: 8px 0;
      position: relative;
      padding-left: 35px;
    }
    .deliverables-list li::before {
      content: '✓';
      position: absolute;
      left: 12px;
      top: 12px;
      color: #16a34a;
      font-weight: 700;
    }
    .metrics-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .metrics-list li {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 12px 15px;
      margin: 8px 0;
      position: relative;
      padding-left: 35px;
    }
    .metrics-list li::before {
      content: '📊';
      position: absolute;
      left: 12px;
      top: 10px;
    }
    .team-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .team-tag {
      background: linear-gradient(135deg, #dbeafe, #bfdbfe);
      border: 1px solid #3b82f6;
      color: #1e40af;
      padding: 6px 12px;
      border-radius: 15px;
      font-size: 14px;
      font-weight: 500;
    }
    .risk-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .risk-list li {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 12px 15px;
      margin: 8px 0;
      position: relative;
      padding-left: 35px;
    }
    .risk-list li::before {
      content: '⚠️';
      position: absolute;
      left: 12px;
      top: 10px;
    }
    .summary-section {
      background: linear-gradient(135deg, #ecfdf5, #d1fae5);
      border: 3px solid #34d399;
      border-radius: 15px;
      padding: 30px;
      margin: 40px 0;
    }
    .summary-section h3 {
      color: #065f46;
      font-size: 24px;
      margin: 0 0 20px 0;
      text-align: center;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      margin-top: 20px;
    }
    .summary-card {
      background: rgba(255,255,255,0.8);
      border-radius: 10px;
      padding: 20px;
    }
    .summary-card h4 {
      color: #374151;
      margin: 0 0 15px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .summary-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .summary-card li {
      color: #064e3b;
      margin: 8px 0;
      padding-left: 20px;
      position: relative;
    }
    .summary-card li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #059669;
      font-weight: 700;
    }
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      border-top: 3px solid #e2e8f0;
    }
    .footer h4 {
      color: #374151;
      margin: 0 0 10px 0;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; }
      .phase-card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AI Implementation Roadmap</h1>
      <p class="subtitle">${model.name} • ${useCase} • Team Size: ${teamSize}</p>
      <div class="timeline-info">Total Timeline: ${totalDuration}</div>
      <p style="margin: 15px 0 0 0; font-size: 14px; opacity: 0.8;">Generated on ${currentDate}</p>
    </div>

    <div class="content">
      <div class="timeline-overview">
        <h3>📅 Project Timeline Overview</h3>
        <div class="timeline-bar">
          ${roadmap.map(() => '<div class="timeline-segment"></div>').join('')}
        </div>
        <div class="timeline-labels">
          ${roadmap.map(milestone => `<div><strong>${milestone.phase}</strong><br>${milestone.duration}</div>`).join('')}
        </div>
      </div>

      <div class="phase-container">
        ${roadmap.map((milestone, index) => `
          <div class="phase-card">
            <div class="phase-header">
              <div style="display: flex; align-items: center; gap: 20px;">
                <div class="phase-number">${index + 1}</div>
                <div>
                  <h2 class="phase-title">${milestone.phase}: ${milestone.title}</h2>
                </div>
              </div>
              <div class="phase-duration">${milestone.duration}</div>
            </div>
            
            <div class="phase-content">
              <div class="content-grid">
                <div class="content-section">
                  <h4>🎯 Key Deliverables</h4>
                  <ul class="deliverables-list">
                    ${milestone.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                  </ul>
                </div>

                <div class="content-section">
                  <h4>📊 Success Metrics</h4>
                  <ul class="metrics-list">
                    ${milestone.success_metrics.map(metric => `<li>${metric}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="content-grid" style="margin-top: 25px;">
                <div class="content-section">
                  <h4>👥 Team Requirements</h4>
                  <div class="team-tags">
                    ${milestone.team.map(role => `<span class="team-tag">${role}</span>`).join('')}
                  </div>
                </div>

                <div class="content-section">
                  <h4>⚠️ Risk Factors</h4>
                  <ul class="risk-list">
                    ${milestone.risks.map(risk => `<li>${risk}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="summary-section">
        <h3>📋 Executive Implementation Summary</h3>
        <p style="text-align: center; color: #065f46; margin: 0 0 20px 0; font-size: 16px;">
          This ${totalDuration} implementation plan provides a structured approach to deploying ${model.name} 
          for ${useCase}. The phased approach minimizes risk while ensuring measurable business value at each stage.
        </p>
        
        <div class="summary-grid">
          <div class="summary-card">
            <h4>🎯 Critical Success Factors</h4>
            <ul>
              <li>Executive sponsorship throughout all phases</li>
              <li>Clear success metrics and governance framework</li>
              <li>Dedicated team allocation and resource commitment</li>
              <li>Proactive change management and user training</li>
              <li>Pilot-first approach with measured rollout</li>
            </ul>
          </div>

          <div class="summary-card">
            <h4>🔗 Key Dependencies</h4>
            <ul>
              <li>Data security and compliance approval process</li>
              <li>Technical team availability and skill development</li>
              <li>User training completion and adoption readiness</li>
              <li>Budget allocation and vendor contract execution</li>
              <li>Integration with existing systems and workflows</li>
            </ul>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 20px; margin-top: 20px; text-align: center;">
          <h4 style="color: #059669; margin: 0 0 10px 0;">💡 Implementation Recommendation</h4>
          <p style="color: #064e3b; margin: 0; font-weight: 500;">
            Allocate 20% buffer time for unforeseen challenges. Begin with a focused pilot program 
            covering 20-30% of target volume to validate assumptions before full-scale deployment.
          </p>
        </div>
      </div>
    </div>

    <div class="footer">
      <h4>ExecLLM - Executive AI Implementation Planning</h4>
      <p>Built with ❤️ by HumanXAI | Support: https://buymeacoffee.com/humanxai</p>
      <p style="margin-top: 15px; font-size: 12px;">
        <strong>Methodology:</strong> Timeline estimates based on ${model.integrationComplexity?.toLowerCase() || 'standard'} integration complexity, 
        team size of ${teamSize}, and industry best practices for AI implementation.
      </p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model.name.replace(/\s+/g, '-')}-Implementation-Roadmap-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Implementation Roadmap
              </h2>
              <p className="text-slate-400">{model.name} • {useCase} • {totalDuration}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportRoadmap}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium"
              >
                Export HTML Report
              </button>
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
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Timeline Overview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">📅 Project Timeline</h3>
              <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl">
                <span className="text-blue-300 font-semibold">Total: {totalDuration}</span>
              </div>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
              <div className="flex items-center space-x-3 mb-4">
                {roadmap.map((milestone, index) => (
                  <React.Fragment key={milestone.phase}>
                    <div className="flex-1 relative">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full"></div>
                      <div className="absolute -top-8 left-0 text-xs text-blue-300 font-medium">
                        {milestone.phase}
                      </div>
                      <div className="absolute -bottom-8 left-0 text-xs text-slate-400">
                        {milestone.duration}
                      </div>
                    </div>
                    {index < roadmap.length - 1 && (
                      <div className="w-3 h-3 bg-slate-600 rounded-full flex-shrink-0"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Phase Cards */}
          <div className="space-y-8">
            {roadmap.map((milestone, index) => (
              <motion.div
                key={milestone.phase}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Phase Header */}
                <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-slate-700/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">{milestone.phase}: {milestone.title}</h4>
                        <p className="text-blue-300 font-medium">Duration: {milestone.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Deliverables */}
                      <div>
                        <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                          <div className="w-1 h-6 bg-green-400 rounded-full mr-3"></div>
                          🎯 Key Deliverables
                        </h5>
                        <div className="space-y-3">
                          {milestone.deliverables.map((deliverable, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-green-100 text-sm leading-relaxed">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Success Metrics */}
                      <div>
                        <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                          <div className="w-1 h-6 bg-blue-400 rounded-full mr-3"></div>
                          📊 Success Metrics
                        </h5>
                        <div className="space-y-3">
                          {milestone.success_metrics.map((metric, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-blue-100 text-sm leading-relaxed">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Team Requirements */}
                      <div>
                        <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                          <div className="w-1 h-6 bg-purple-400 rounded-full mr-3"></div>
                          👥 Team Requirements
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {milestone.team.map((role, i) => (
                            <span key={i} className="px-4 py-2 bg-purple-900/30 text-purple-300 text-sm rounded-xl border border-purple-700/30 font-medium">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Risk Factors */}
                      <div>
                        <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                          <div className="w-1 h-6 bg-orange-400 rounded-full mr-3"></div>
                          ⚠️ Risk Factors
                        </h5>
                        <div className="space-y-3">
                          {milestone.risks.map((risk, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-orange-900/20 border border-orange-700/30 rounded-lg">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-orange-100 text-sm leading-relaxed">{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Executive Summary */}
          <div className="mt-10 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-8">
            <h4 className="flex items-center text-xl font-semibold text-purple-300 mb-6">
              <div className="w-1 h-6 bg-purple-400 rounded-full mr-3"></div>
              📋 Executive Implementation Summary
            </h4>
            <p className="text-slate-300 leading-relaxed mb-8 text-center text-lg">
              This <span className="text-purple-300 font-semibold">{totalDuration}</span> implementation plan provides a structured approach to deploying <span className="text-cyan-300 font-semibold">{model.name}</span> for <span className="text-purple-300 font-semibold">{useCase}</span>. The phased approach minimizes risk while ensuring measurable business value at each stage.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
                <h5 className="font-semibold text-white mb-4 flex items-center">
                  <span className="text-green-400 mr-2">🎯</span>
                  Critical Success Factors
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Executive sponsorship throughout all phases
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Clear success metrics and governance framework
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Dedicated team allocation and resource commitment
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Proactive change management and user training
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
                <h5 className="font-semibold text-white mb-4 flex items-center">
                  <span className="text-blue-400 mr-2">🔗</span>
                  Key Dependencies
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    Data security and compliance approval process
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    Technical team availability and skill development
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    User training completion and adoption readiness
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    Budget allocation and vendor contract execution
                  </li>
                </ul>
              </div>
            </div>

            {/* Implementation Tip */}
            <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-400/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h6 className="font-semibold text-purple-300 mb-1">Implementation Recommendation</h6>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Allocate 20% buffer time for unforeseen challenges. Begin with a focused pilot program covering 20-30% of target volume to validate assumptions before full-scale deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}