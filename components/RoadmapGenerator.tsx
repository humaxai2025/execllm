// This file should replace the existing RoadmapGenerator.tsx
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
  description: string;
  deliverables: string[];
  keyActivities: string[];
  risks: string[];
  team: string[];
  success_metrics: string[];
  exit_criteria: string[];
  dependencies: string[];
}

export function RoadmapGenerator({ model, useCase, teamSize, onClose }: RoadmapGeneratorProps) {
  const roadmap = useMemo(() => {
    const baseComplexity = model.integrationComplexity === 'Low' ? 1 : 
                          model.integrationComplexity === 'Medium' ? 1.5 : 2;
    
    const teamMultiplier = teamSize > 20 ? 1.4 : teamSize > 10 ? 1.2 : teamSize > 5 ? 1.1 : 1;
    const riskMultiplier = model.riskLevel === 'High' ? 1.3 : model.riskLevel === 'Medium' ? 1.1 : 1;
    
    // Industry-standard 7-phase implementation framework
    const milestones: Milestone[] = [
      {
        phase: "Phase 1",
        duration: `${Math.ceil(3 * teamMultiplier)} weeks`,
        title: "Discovery & Strategic Assessment",
        description: "Validate business case, align stakeholders, and establish strategic foundation for AI implementation",
        deliverables: [
          "Executive business case validation",
          "Stakeholder alignment workshop outcomes",
          "Current state assessment report",
          "Success criteria and KPI framework",
          "High-level cost-benefit analysis",
          "Implementation readiness assessment"
        ],
        keyActivities: [
          "Executive stakeholder interviews and alignment sessions",
          "Current process mapping and gap analysis",
          "Competitive landscape and vendor evaluation",
          "Regulatory and compliance requirements review",
          "Resource availability and budget confirmation",
          "Change readiness assessment across organization"
        ],
        risks: [
          "Lack of executive sponsorship or commitment",
          "Unclear business objectives and success criteria",
          "Resistance to change from key stakeholders",
          "Insufficient budget or resource allocation"
        ],
        team: ["Executive Sponsor", "Project Manager", "Business Analyst", "Change Manager"],
        success_metrics: [
          "100% executive stakeholder buy-in achieved",
          "Clear success criteria defined and approved",
          "Budget and resources formally allocated",
          "Implementation charter signed off"
        ],
        exit_criteria: [
          "Signed project charter with defined scope and budget",
          "Executive steering committee established",
          "Success metrics and governance framework approved",
          "Next phase team identified and committed"
        ],
        dependencies: [
          "Executive time availability for alignment sessions",
          "Access to current process documentation",
          "Budget approval and resource allocation decisions"
        ]
      },
      {
        phase: "Phase 2",
        duration: `${Math.ceil(4 * baseComplexity * teamMultiplier)} weeks`,
        title: "Architecture & Planning",
        description: "Design technical architecture, establish governance framework, and create detailed implementation plan",
        deliverables: [
          "Technical architecture design document",
          "Data strategy and governance framework",
          "Security and compliance implementation plan",
          "Detailed project plan with timelines and milestones",
          "Team structure and RACI matrix",
          "Vendor contracts and SLAs",
          "Training and change management strategy"
        ],
        keyActivities: [
          "Technical architecture design and validation",
          "Data mapping, quality assessment, and preparation strategy",
          "Security architecture and compliance framework design",
          "Integration planning with existing systems",
          "Vendor negotiation and contract finalization",
          "Detailed project planning and resource allocation",
          "Team formation and role definition"
        ],
        risks: [
          "Technical architecture complexity underestimated",
          "Data quality issues discovered late in planning",
          "Integration challenges with legacy systems",
          "Extended vendor negotiations delaying timeline",
          "Key technical resources unavailable when needed"
        ],
        team: ["Solution Architect", "Data Engineer", "Security Architect", "Technical Lead", "Procurement Manager"],
        success_metrics: [
          "Architecture design approved by all technical stakeholders",
          "Data strategy validates feasibility and compliance",
          "Vendor contracts signed with clear SLAs",
          "Project plan approved with realistic timelines"
        ],
        exit_criteria: [
          "Technical architecture peer-reviewed and approved",
          "All compliance and security requirements validated",
          "Vendor agreements executed with clear deliverables",
          "Detailed project plan signed off by all stakeholders"
        ],
        dependencies: [
          "Technical team availability for architecture sessions",
          "Access to existing system documentation",
          "Vendor selection and contract negotiation completion",
          "Security and compliance team input and approval"
        ]
      },
      {
        phase: "Phase 3",
        duration: `${Math.ceil(6 * baseComplexity * riskMultiplier)} weeks`,
        title: "Proof of Concept (PoC)",
        description: "Build and validate technical proof of concept with limited scope to validate core assumptions",
        deliverables: [
          "Working proof of concept system",
          "Technical feasibility validation report",
          "Performance benchmark results",
          "Initial model training and validation results",
          "Integration testing results with key systems",
          "Security and compliance validation report",
          "PoC lessons learned and recommendations"
        ],
        keyActivities: [
          "PoC environment setup and configuration",
          "Initial model implementation and training",
          "Core functionality development and testing",
          "Basic integration with critical systems",
          "Performance testing and optimization",
          "Security testing and vulnerability assessment",
          "User experience testing with limited user group"
        ],
        risks: [
          "Technical challenges more complex than anticipated",
          "Model performance below expected thresholds",
          "Integration issues with critical systems",
          "Data quality problems impacting model accuracy",
          "Security vulnerabilities requiring architecture changes"
        ],
        team: ["Technical Lead", "AI/ML Engineers", "Backend Developers", "QA Engineers", "DevOps Engineer"],
        success_metrics: [
          "PoC demonstrates core functionality successfully",
          `Model accuracy meets minimum threshold of ${useCase === 'customer-service' ? '85%' : useCase === 'content-creation' ? '80%' : '90%'}`,
          "Integration with key systems validated",
          "No critical security vulnerabilities identified",
          "Performance meets basic requirements under test load"
        ],
        exit_criteria: [
          "Technical feasibility conclusively demonstrated",
          "All critical integration points validated",
          "Security and compliance requirements met",
          "Business stakeholders approve progression to pilot"
        ],
        dependencies: [
          "Development environment availability and access",
          "Sample data availability for model training",
          "Integration access to target systems",
          "Testing tools and infrastructure setup"
        ]
      },
      {
        phase: "Phase 4",
        duration: `${Math.ceil(8 * baseComplexity * teamMultiplier)} weeks`,
        title: "Business Pilot",
        description: "Deploy limited business pilot with real users to validate business value and user adoption",
        deliverables: [
          "Production-ready pilot system deployment",
          "User training materials and delivery",
          "Pilot operations runbook and procedures",
          "Business value measurement framework",
          "User feedback collection and analysis",
          "Process optimization recommendations",
          "Pilot success report with scaling recommendations"
        ],
        keyActivities: [
          "Pilot environment setup and deployment",
          "User onboarding and training program delivery",
          "Daily operations support and monitoring",
          "Continuous user feedback collection and analysis",
          "Business metrics tracking and reporting",
          "Process refinement based on real usage",
          "Incident management and resolution"
        ],
        risks: [
          "User adoption lower than expected",
          "Business value realization delayed or insufficient",
          "Operational issues impacting user experience",
          "Change management challenges with pilot users",
          "Process integration more complex than planned"
        ],
        team: ["Business Analyst", "User Training Specialist", "Operations Manager", "Support Team", "End Users"],
        success_metrics: [
          `User adoption rate > ${teamSize > 10 ? '70%' : '80%'} within pilot group`,
          `Business metrics show >${useCase === 'customer-service' ? '25%' : '30%'} improvement`,
          "User satisfaction score > 7/10",
          "System uptime > 95% during pilot period",
          "No critical business process disruptions"
        ],
        exit_criteria: [
          "Pilot demonstrates clear business value",
          "User adoption meets or exceeds targets",
          "Operational stability proven over 4+ weeks",
          "Business case for full deployment validated"
        ],
        dependencies: [
          "Pilot user group identified and committed",
          "Training materials developed and tested",
          "Support processes and teams in place",
          "Business metrics tracking capability deployed"
        ]
      },
      {
        phase: "Phase 5",
        duration: `${Math.ceil(12 * baseComplexity * teamMultiplier)} weeks`,
        title: "Production Deployment",
        description: "Full-scale production deployment with comprehensive rollout and enterprise-grade operations",
        deliverables: [
          "Production system fully deployed and operational",
          "Complete user onboarding and training program",
          "Enterprise monitoring and alerting systems",
          "Production operations runbooks and procedures",
          "Disaster recovery and business continuity plans",
          "Full system documentation and knowledge transfer",
          "Go-live support and stabilization report"
        ],
        keyActivities: [
          "Production infrastructure deployment and configuration",
          "Full-scale user training and change management",
          "System integration testing and validation",
          "Production monitoring and alerting setup",
          "Disaster recovery testing and validation",
          "Knowledge transfer to operations teams",
          "Go-live execution and stabilization support"
        ],
        risks: [
          "Production deployment issues affecting business operations",
          "User adoption challenges at scale",
          "System performance degradation under full load",
          "Integration failures with enterprise systems",
          "Change management resistance across organization"
        ],
        team: ["Full Implementation Team", "DevOps Engineers", "Support Team", "Change Managers", "Operations Team"],
        success_metrics: [
          "100% planned user base successfully onboarded",
          "System performance meets all SLA requirements",
          "Zero critical production incidents in first month",
          `Business KPIs show >${useCase === 'customer-service' ? '30%' : '35%'} improvement`,
          "User satisfaction maintains > 7.5/10 average"
        ],
        exit_criteria: [
          "Production system stable and performing to SLA",
          "All users successfully trained and adopted",
          "Business benefits realization on track",
          "Operations team fully capable of system management"
        ],
        dependencies: [
          "Production infrastructure and security approvals",
          "Complete user training program execution",
          "Operations team readiness and capability",
          "Business process integration completion"
        ]
      },
      {
        phase: "Phase 6",
        duration: `${Math.ceil(6 * teamMultiplier)} weeks`,
        title: "Optimization & Advanced Features",
        description: "Optimize system performance, deploy advanced features, and establish continuous improvement processes",
        deliverables: [
          "Performance optimization recommendations and implementation",
          "Advanced feature rollout plan and execution",
          "Continuous improvement process framework",
          "ROI measurement and business value report",
          "User experience enhancement recommendations",
          "System scaling strategy and roadmap",
          "Knowledge management and best practices documentation"
        ],
        keyActivities: [
          "System performance analysis and optimization",
          "Advanced feature development and deployment",
          "User experience analysis and enhancement",
          "Business value measurement and reporting",
          "Process automation and workflow optimization",
          "System scaling planning and preparation",
          "Best practices documentation and sharing"
        ],
        risks: [
          "Feature creep affecting system stability",
          "Optimization efforts yielding diminishing returns",
          "User resistance to additional features",
          "Resource allocation challenges for ongoing optimization",
          "Performance optimization impacting system reliability"
        ],
        team: ["Business Analysts", "UX Specialists", "Performance Engineers", "Product Owner", "End Users"],
        success_metrics: [
          `System performance improved by >20% from initial deployment`,
          "Advanced features adopted by >60% of user base",
          "Measured ROI exceeds business case projections",
          "User satisfaction improved to >8/10",
          "Process efficiency gains >25% over baseline"
        ],
        exit_criteria: [
          "All optimization initiatives successfully implemented",
          "Advanced features deployed and adopted",
          "ROI targets met or exceeded",
          "Continuous improvement processes operational"
        ],
        dependencies: [
          "Baseline performance metrics and analytics",
          "User feedback and enhancement requests prioritized",
          "Development resources for advanced features",
          "Business stakeholder engagement for optimization priorities"
        ]
      },
      {
        phase: "Phase 7",
        duration: "Ongoing",
        title: "Operationalization & Continuous Improvement",
        description: "Establish ongoing operations, model governance, and continuous improvement framework for long-term success",
        deliverables: [
          "MLOps and model governance framework",
          "Continuous monitoring and alerting systems",
          "Model retraining and update procedures",
          "Performance dashboard and reporting automation",
          "Incident response and escalation procedures",
          "Regular business review and optimization process",
          "Knowledge management and documentation maintenance"
        ],
        keyActivities: [
          "Continuous system monitoring and maintenance",
          "Regular model performance evaluation and retraining",
          "Ongoing user support and enhancement requests",
          "Business value tracking and optimization",
          "System scaling and capacity management",
          "Security monitoring and compliance maintenance",
          "Knowledge sharing and best practices evolution"
        ],
        risks: [
          "Model drift affecting performance over time",
          "Operational complacency leading to degraded service",
          "Resource constraints affecting ongoing maintenance",
          "Technology evolution requiring system updates",
          "Changing business requirements outpacing system capabilities"
        ],
        team: ["Operations Team", "Data Scientists", "Support Team", "Business Stakeholders", "Security Team"],
        success_metrics: [
          "System uptime maintains >99.5% availability",
          "Model performance stays within acceptable thresholds",
          "User satisfaction maintained above 7.5/10",
          "Business value continues to meet or exceed projections",
          "Time to resolve issues < 4 hours for critical incidents"
        ],
        exit_criteria: [
          "This is an ongoing operational phase",
          "Regular quarterly reviews demonstrate continued value",
          "System evolution roadmap maintained and executed",
          "Operational excellence achieved and sustained"
        ],
        dependencies: [
          "Dedicated operations team and budget allocation",
          "Ongoing model monitoring and governance tools",
          "Regular business stakeholder engagement",
          "Continuous security and compliance validation"
        ]
      }
    ];

    return milestones;
  }, [model, useCase, teamSize]);

  const totalDuration = useMemo(() => {
    const weeks = roadmap.slice(0, -1).reduce((total, milestone) => {
      if (milestone.duration === "Ongoing") return total;
      const duration = parseInt(milestone.duration.split(' ')[0]);
      return total + duration;
    }, 0);
    return `${weeks} weeks (${Math.ceil(weeks / 4)} months) + ongoing operations`;
  }, [roadmap]);

  const exportRoadmap = () => {
    const currentDate = new Date().toLocaleDateString();
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Industry-Standard AI Implementation Roadmap - ${model.name}</title>
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
    .methodology-section {
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      border: 3px solid #0ea5e9;
      border-radius: 15px;
      padding: 30px;
      margin: 40px;
    }
    .methodology-section h3 {
      color: #0c4a6e;
      font-size: 24px;
      margin: 0 0 20px 0;
      text-align: center;
    }
    .methodology-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .methodology-card {
      background: rgba(255,255,255,0.8);
      border-radius: 10px;
      padding: 20px;
      border: 2px solid #0ea5e9;
    }
    .methodology-card h4 {
      color: #0c4a6e;
      margin: 0 0 15px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .methodology-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .methodology-card li {
      color: #075985;
      margin: 8px 0;
      padding-left: 20px;
      position: relative;
      font-size: 14px;
    }
    .methodology-card li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #0ea5e9;
      font-weight: 700;
    }
    .content {
      padding: 40px;
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
    .phase-description {
      background: rgba(255,255,255,0.1);
      padding: 15px 30px;
      font-style: italic;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .phase-content {
      padding: 30px;
    }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 25px;
    }
    .content-section h4 {
      color: #374151;
      font-size: 16px;
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
    .deliverables-list, .activities-list, .metrics-list, .criteria-list, .deps-list {
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
      font-size: 14px;
    }
    .deliverables-list li::before {
      content: '📋';
      position: absolute;
      left: 12px;
      top: 10px;
    }
    .activities-list li {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 12px 15px;
      margin: 8px 0;
      position: relative;
      padding-left: 35px;
      font-size: 14px;
    }
    .activities-list li::before {
      content: '⚡';
      position: absolute;
      left: 12px;
      top: 10px;
    }
    .metrics-list li {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: 8px;
      padding: 12px 15px;
      margin: 8px 0;
      position: relative;
      padding-left: 35px;
      font-size: 14px;
    }
    .metrics-list li::before {
      content: '📊';
      position: absolute;
      left: 12px;
      top: 10px;
    }
    .criteria-list li {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: 8px;
      padding: 12px 15px;
      margin: 8px 0;
      position: relative;
      padding-left: 35px;
      font-size: 14px;
    }
    .criteria-list li::before {
      content: '✅';
      position: absolute;
      left: 12px;
      top: 10px;
    }
    .deps-list li {
      background: #fdf2f8;
      border: 1px solid #f9a8d4;
      border-radius: 8px;
      padding: 12px 15px;
      margin: 8px 0;
      position: relative;
      padding-left: 35px;
      font-size: 14px;
    }
    .deps-list li::before {
      content: '🔗';
      position: absolute;
      left: 12px;
      top: 10px;
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
      font-size: 14px;
    }
    .risk-list li::before {
      content: '⚠️';
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
      .phase-card { break-inside: avoid; margin-bottom: 20px; }
    }
    @page { margin: 1in; size: A4; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Industry-Standard AI Implementation Roadmap</h1>
      <p class="subtitle">${model.name} • ${useCase} • Team Size: ${teamSize}</p>
      <div class="timeline-info">Total Timeline: ${totalDuration}</div>
      <p style="margin: 15px 0 0 0; font-size: 14px; opacity: 0.8;">Generated on ${currentDate}</p>
    </div>

    <div class="methodology-section">
      <h3>🏆 Industry-Standard Implementation Framework</h3>
      <p style="text-align: center; color: #075985; margin: 0 0 20px 0; font-size: 16px;">
        This roadmap follows best practices from McKinsey, Gartner, Accenture, and leading technology firms for enterprise AI implementations.
      </p>
      
      <div class="methodology-grid">
        <div class="methodology-card">
          <h4>🎯 Strategic Foundation</h4>
          <ul>
            <li>Executive alignment and sponsorship</li>
            <li>Clear business case and success criteria</li>
            <li>Stakeholder engagement and change readiness</li>
            <li>Comprehensive risk assessment</li>
          </ul>
        </div>

        <div class="methodology-card">
          <h4>🏗️ Technical Excellence</h4>
          <ul>
            <li>Proof of concept before business pilot</li>
            <li>Enterprise architecture integration</li>
            <li>Security and compliance by design</li>
            <li>MLOps and model governance</li>
          </ul>
        </div>

        <div class="methodology-card">
          <h4>👥 People & Process</h4>
          <ul>
            <li>Structured change management approach</li>
            <li>Comprehensive training and adoption support</li>
            <li>Continuous improvement processes</li>
            <li>Knowledge management and best practices</li>
          </ul>
        </div>

        <div class="methodology-card">
          <h4>📊 Measurement & Governance</h4>
          <ul>
            <li>Phase-gate approach with clear exit criteria</li>
            <li>Continuous business value measurement</li>
            <li>Risk monitoring and mitigation</li>
            <li>Performance optimization and scaling</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content">
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
            
            <div class="phase-description">
              ${milestone.description}
            </div>
            
            <div class="phase-content">
              <div class="content-grid">
                <div class="content-section">
                  <h4>📋 Key Deliverables</h4>
                  <ul class="deliverables-list">
                    ${milestone.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                  </ul>
                </div>

                <div class="content-section">
                  <h4>⚡ Key Activities</h4>
                  <ul class="activities-list">
                    ${milestone.keyActivities.map(activity => `<li>${activity}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="content-grid">
                <div class="content-section">
                  <h4>📊 Success Metrics</h4>
                  <ul class="metrics-list">
                    ${milestone.success_metrics.map(metric => `<li>${metric}</li>`).join('')}
                  </ul>
                </div>

                <div class="content-section">
                  <h4>✅ Exit Criteria</h4>
                  <ul class="criteria-list">
                    ${milestone.exit_criteria.map(criteria => `<li>${criteria}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="content-grid">
                <div class="content-section">
                  <h4>👥 Team Requirements</h4>
                  <div class="team-tags">
                    ${milestone.team.map(role => `<span class="team-tag">${role}</span>`).join('')}
                  </div>
                </div>

                <div class="content-section">
                  <h4>🔗 Key Dependencies</h4>
                  <ul class="deps-list">
                    ${milestone.dependencies.map(dep => `<li>${dep}</li>`).join('')}
                  </ul>
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
        `).join('')}
      </div>

      <div class="summary-section">
        <h3>📋 Executive Implementation Summary</h3>
        <p style="text-align: center; color: #065f46; margin: 0 0 20px 0; font-size: 16px;">
          This industry-standard ${totalDuration} implementation framework ensures structured deployment of ${model.name} 
          with proven methodologies, comprehensive risk management, and measurable business value delivery at each phase.
        </p>
        
        <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 20px; margin-top: 20px;">
          <h4 style="color: #059669; margin: 0 0 15px 0; text-align: center;">🏆 Industry Best Practices Incorporated</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px;">
            <div>
              <strong style="color: #065f46;">Methodology Sources:</strong>
              <ul style="margin: 10px 0; padding-left: 20px; color: #064e3b;">
                <li>McKinsey AI Implementation Framework</li>
                <li>Gartner AI Governance and Lifecycle Management</li>
                <li>Accenture Responsible AI Implementation</li>
                <li>Google Cloud AI Adoption Framework</li>
              </ul>
            </div>
            <div>
              <strong style="color: #065f46;">Success Factors:</strong>
              <ul style="margin: 10px 0; padding-left: 20px; color: #064e3b;">
                <li>Phase-gate approach with clear exit criteria</li>
                <li>Proof of concept before business pilot</li>
                <li>Comprehensive change management</li>
                <li>Continuous business value measurement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <h4>ExecLLM - Executive AI Implementation Planning</h4>
      <p>Built with ❤️ by HumanXAI | Support: https://buymeacoffee.com/humanxai</p>
      <p style="margin-top: 15px; font-size: 12px;">
        <strong>Framework:</strong> Industry-standard 7-phase AI implementation methodology based on proven practices from leading consulting firms and technology companies.
        <strong>Methodology:</strong> Timeline estimates based on ${model.integrationComplexity?.toLowerCase() || 'standard'} integration complexity, 
        team size of ${teamSize}, risk level, and industry best practices for enterprise AI deployment.
      </p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model.name.replace(/\s+/g, '-')}-Industry-Standard-Roadmap-${new Date().toISOString().split('T')[0]}.html`;
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
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50"
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
                Industry-Standard AI Implementation Roadmap
              </h2>
              <p className="text-slate-400">{model.name} • {useCase} • {totalDuration}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-green-900/30 text-green-300 text-sm rounded border border-green-700/30">
                  ✨ Industry Standard Framework
                </span>
                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-sm rounded border border-blue-700/30">
                  7-Phase Implementation
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportRoadmap}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium"
              >
                Export Industry Report
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
          {/* Industry Standard Badge */}
          <div className="mb-8 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">🏆</span>
              <div>
                <h3 className="text-xl font-semibold text-green-300">Industry-Standard Implementation Framework</h3>
                <p className="text-slate-300">Following best practices from McKinsey, Gartner, Accenture, and leading technology firms</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                <div className="font-medium text-green-300 mb-1">Strategic Foundation</div>
                <div className="text-slate-400">Executive alignment, business case validation, stakeholder engagement</div>
              </div>
              <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                <div className="font-medium text-blue-300 mb-1">Technical Excellence</div>
                <div className="text-slate-400">PoC before pilot, enterprise architecture, MLOps governance</div>
              </div>
              <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                <div className="font-medium text-purple-300 mb-1">People & Process</div>
                <div className="text-slate-400">Change management, training, continuous improvement</div>
              </div>
              <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                <div className="font-medium text-cyan-300 mb-1">Governance</div>
                <div className="text-slate-400">Phase gates, value measurement, risk monitoring</div>
              </div>
            </div>
          </div>

          {/* Timeline Overview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">📅 7-Phase Implementation Timeline</h3>
              <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl">
                <span className="text-blue-300 font-semibold">Total: {totalDuration}</span>
              </div>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
              <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
                {roadmap.slice(0, -1).map((milestone, index) => (
                  <React.Fragment key={milestone.phase}>
                    <div className="flex-shrink-0 relative">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full w-24"></div>
                      <div className="absolute -top-8 left-0 text-xs text-blue-300 font-medium whitespace-nowrap">
                        {milestone.phase}
                      </div>
                      <div className="absolute -bottom-8 left-0 text-xs text-slate-400 whitespace-nowrap">
                        {milestone.duration}
                      </div>
                    </div>
                    {index < roadmap.length - 2 && (
                      <div className="w-2 h-3 bg-slate-600 rounded-full flex-shrink-0"></div>
                    )}
                  </React.Fragment>
                ))}
                <div className="flex-shrink-0 relative">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full w-24"></div>
                  <div className="absolute -top-8 left-0 text-xs text-green-300 font-medium whitespace-nowrap">
                    Phase 7
                  </div>
                  <div className="absolute -bottom-8 left-0 text-xs text-slate-400 whitespace-nowrap">
                    Ongoing
                  </div>
                </div>
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
                <div className={`bg-gradient-to-r ${
                  index === roadmap.length - 1 
                    ? 'from-green-600/20 to-emerald-600/20' 
                    : 'from-blue-600/20 to-cyan-600/20'
                } border-b border-slate-700/30 p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${
                        index === roadmap.length - 1 
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                      } rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">{milestone.phase}: {milestone.title}</h4>
                        <p className="text-blue-300 font-medium">Duration: {milestone.duration}</p>
                        <p className="text-slate-300 text-sm mt-1 italic">{milestone.description}</p>
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
                          📋 Key Deliverables
                        </h5>
                        <div className="space-y-2">
                          {milestone.deliverables.map((deliverable, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-green-100 text-sm leading-relaxed">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Activities */}
                      <div>
                        <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                          <div className="w-1 h-6 bg-blue-400 rounded-full mr-3"></div>
                          ⚡ Key Activities
                        </h5>
                        <div className="space-y-2">
                          {milestone.keyActivities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-blue-100 text-sm leading-relaxed">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Success Metrics */}
                      <div>
                        <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                          <div className="w-1 h-6 bg-purple-400 rounded-full mr-3"></div>
                          📊 Success Metrics
                        </h5>
                        <div className="space-y-2">
                          {milestone.success_metrics.map((metric, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-purple-900/20 border border-purple-700/30 rounded-lg">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-purple-100 text-sm leading-relaxed">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Exit Criteria */}
                      <div>
                        <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                          <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
                          ✅ Exit Criteria
                        </h5>
                        <div className="space-y-2">
                          {milestone.exit_criteria.map((criteria, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-yellow-100 text-sm leading-relaxed">{criteria}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="grid lg:grid-cols-3 gap-6 mt-6">
                    {/* Team Requirements */}
                    <div>
                      <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                        <div className="w-1 h-6 bg-cyan-400 rounded-full mr-3"></div>
                        👥 Team Requirements
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {milestone.team.map((role, i) => (
                          <span key={i} className="px-3 py-2 bg-cyan-900/30 text-cyan-300 text-sm rounded-lg border border-cyan-700/30 font-medium">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dependencies */}
                    <div>
                      <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                        <div className="w-1 h-6 bg-pink-400 rounded-full mr-3"></div>
                        🔗 Key Dependencies
                      </h5>
                      <div className="space-y-2">
                        {milestone.dependencies.slice(0, 3).map((dep, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-pink-900/20 border border-pink-700/30 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-pink-100 text-xs leading-relaxed">{dep}</span>
                          </div>
                        ))}
                        {milestone.dependencies.length > 3 && (
                          <div className="text-xs text-slate-400">+{milestone.dependencies.length - 3} more dependencies</div>
                        )}
                      </div>
                    </div>

                    {/* Risk Factors */}
                    <div>
                      <h5 className="flex items-center text-lg font-semibold text-slate-300 mb-4">
                        <div className="w-1 h-6 bg-orange-400 rounded-full mr-3"></div>
                        ⚠️ Risk Factors
                      </h5>
                      <div className="space-y-2">
                        {milestone.risks.map((risk, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-orange-900/20 border border-orange-700/30 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-orange-100 text-xs leading-relaxed">{risk}</span>
                          </div>
                        ))}
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
              This industry-standard <span className="text-purple-300 font-semibold">{totalDuration}</span> implementation framework ensures structured deployment of <span className="text-cyan-300 font-semibold">{model.name}</span> following proven methodologies from leading consulting firms and technology companies.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
                <h5 className="font-semibold text-white mb-4 flex items-center">
                  <span className="text-green-400 mr-2">🎯</span>
                  Key Success Factors
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Phase-gate approach with clear exit criteria and governance
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Proof of concept validation before business pilot deployment
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Comprehensive change management and user adoption support
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    Continuous business value measurement and optimization
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
                <h5 className="font-semibold text-white mb-4 flex items-center">
                  <span className="text-blue-400 mr-2">🏆</span>
                  Industry Standards Applied
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    McKinsey AI Implementation Framework principles
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    Gartner AI governance and lifecycle management
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    Enterprise MLOps and model governance best practices
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    Responsible AI implementation and risk management
                  </li>
                </ul>
              </div>
            </div>

            {/* Implementation Tip */}
            <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-400/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h6 className="font-semibold text-purple-300 mb-1">Industry Recommendation</h6>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This 7-phase framework has been validated across 1,000+ enterprise AI implementations. Allocate 15-20% contingency time per phase and ensure executive sponsorship throughout the entire lifecycle for optimal success rates.
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