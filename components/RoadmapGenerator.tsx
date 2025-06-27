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
    const content = `
${model.name} Implementation Roadmap
Generated: ${new Date().toLocaleDateString()}
Use Case: ${useCase}
Team Size: ${teamSize}
Total Duration: ${totalDuration}

${'='.repeat(60)}

${roadmap.map((milestone, index) => `
${milestone.phase}: ${milestone.title}
Duration: ${milestone.duration}
${'-'.repeat(40)}

DELIVERABLES:
${milestone.deliverables.map(d => `• ${d}`).join('\n')}

SUCCESS METRICS:
${milestone.success_metrics.map(m => `• ${m}`).join('\n')}

TEAM REQUIRED:
${milestone.team.map(t => `• ${t}`).join('\n')}

RISKS TO MONITOR:
${milestone.risks.map(r => `• ${r}`).join('\n')}

`).join('\n' + '='.repeat(60) + '\n')}

EXECUTIVE SUMMARY:
This ${totalDuration} implementation plan provides a structured approach to deploying ${model.name} 
for ${useCase}. The phased approach minimizes risk while ensuring measurable business value at each stage.

KEY RECOMMENDATIONS:
• Allocate 20% buffer time for unforeseen challenges
• Ensure executive sponsorship throughout all phases
• Plan for change management and user training early
• Establish clear success metrics and governance
• Consider parallel pilot programs for faster validation

Generated by ExecLLM - Executive AI Implementation Planning
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model.name.replace(/\s+/g, '-')}-Implementation-Roadmap-${new Date().toISOString().split('T')[0]}.txt`;
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
                Export Plan
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Project Timeline</h3>
              <div className="text-sm text-slate-400">Total: {totalDuration}</div>
            </div>
            <div className="flex items-center space-x-2">
              {roadmap.map((milestone, index) => (
                <React.Fragment key={milestone.phase}>
                  <div className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full relative">
                    <div className="absolute -top-6 left-0 text-xs text-slate-300">
                      {milestone.phase}
                    </div>
                    <div className="absolute -bottom-6 left-0 text-xs text-slate-400">
                      {milestone.duration}
                    </div>
                  </div>
                  {index < roadmap.length - 1 && <div className="w-2 h-2 bg-slate-600 rounded-full"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Detailed Milestones */}
          <div className="space-y-6">
            {roadmap.map((milestone, index) => (
              <motion.div
                key={milestone.phase}
                className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">{milestone.phase}: {milestone.title}</h4>
                    <p className="text-slate-400">Duration: {milestone.duration}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-slate-300 mb-2">🎯 Deliverables</h5>
                      <ul className="space-y-1">
                        {milestone.deliverables.map((deliverable, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-slate-300 mb-2">✅ Success Metrics</h5>
                      <ul className="space-y-1">
                        {milestone.success_metrics.map((metric, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-slate-300 mb-2">👥 Team Required</h5>
                      <div className="flex flex-wrap gap-2">
                        {milestone.team.map((role, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-lg border border-blue-700/30">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-slate-300 mb-2">⚠️ Risk Factors</h5>
                      <ul className="space-y-1">
                        {milestone.risks.map((risk, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-start">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Executive Summary */}
          <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-xl p-6">
            <h4 className="font-semibold text-purple-300 mb-3">📋 Executive Summary</h4>
            <p className="text-slate-300 leading-relaxed mb-4">
              This {totalDuration} implementation plan provides a structured approach to deploying {model.name} 
              for {useCase}. The phased approach minimizes risk while ensuring measurable business value at each stage.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-2">Key Success Factors:</h5>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Executive sponsorship throughout</li>
                  <li>• Clear success metrics at each phase</li>
                  <li>• Dedicated team allocation</li>
                  <li>• Change management focus</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Critical Dependencies:</h5>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Data security compliance approval</li>
                  <li>• Technical team availability</li>
                  <li>• User training completion</li>
                  <li>• Budget allocation confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}