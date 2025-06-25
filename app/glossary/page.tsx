"use client";
import React from "react";
import { motion } from "framer-motion";

interface GlossaryItem {
  term: string;
  def: string;
  icon: string;
}

const glossary: GlossaryItem[] = [
  {
    term: "LLM",
    def: "Large Language Model. An advanced AI system that understands and generates human language with remarkable sophistication.",
    icon: "🧠"
  },
  {
    term: "API",
    def: "Application Programming Interface. The bridge that allows your business applications to communicate with AI models seamlessly.",
    icon: "🔗"
  },
  {
    term: "Open Source",
    def: "AI models with publicly available code that your team can inspect, modify, and deploy according to your specific needs.",
    icon: "🔓"
  },
  {
    term: "Cloud Deployment",
    def: "AI models hosted on remote servers, accessible via the internet. Perfect for rapid deployment without infrastructure investment.",
    icon: "☁️"
  },
  {
    term: "Self-Hosted",
    def: "Running AI models on your own infrastructure, providing maximum control, security, and data privacy for enterprise needs.",
    icon: "🏢"
  },
  {
    term: "Cost Tiers",
    def: "Pricing structure: $ (budget-friendly), $$ (balanced value), $$$ (premium performance), or Free (open-source options).",
    icon: "💰"
  },
  {
    term: "Multimodal",
    def: "AI systems that can process and understand multiple types of input—text, images, audio, and more—in a single model.",
    icon: "🎭"
  },
  {
    term: "Fine-tuning",
    def: "Customizing a pre-trained AI model with your specific data to improve performance for your unique business use cases.",
    icon: "⚙️"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Glossary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Glossary & FAQ
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Essential AI terminology explained in business language—no technical jargon, just clear insights.
          </motion.p>
        </motion.header>

        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {glossary.map((item) => (
              <motion.div
                key={item.term}
                variants={itemVariants}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 h-full transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{item.icon}</span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                        {item.term}
                      </h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {item.def}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-center gap-4">
            <a 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to ExecLLM Directory
            </a>
            
            <motion.div 
              className="text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Built with ❤️ by HumanXAI
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}