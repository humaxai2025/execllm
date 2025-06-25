"use client";
import { useState, useEffect } from "react";
import { LLMCard } from "../components/LLMCard";
import { LLMDetailsModal } from "../components/LLMDetailsModal";
import { SearchBar } from "../components/SearchBar";
import { motion } from "framer-motion";

interface LLMModel {
  name: string;
  vendor: string;
  summary: string;
  capabilities: string[];
  useCases: string[];
  cost: string;
  deployment: string[];
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LLMModel | null>(null);
  const [llms, setLlms] = useState<LLMModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/llms.json");
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`);
        }
        const data = await response.json();
        setLlms(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error loading LLM data:", err);
        setError("Failed to load LLM data. Please try again later.");
        setLlms([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtered = llms.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.vendor.toLowerCase().includes(search.toLowerCase()) ||
      m.useCases.join(" ").toLowerCase().includes(search.toLowerCase()) ||
      m.capabilities.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="mb-16 flex flex-col items-center text-center"
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
            <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              ExecLLM
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.p 
            className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Compare the world's most powerful AI models for business—designed for executives who value clarity over complexity.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-md"
          >
            <SearchBar value={search} onChange={setSearch} />
          </motion.div>
        </motion.header>

        {loading && (
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="max-w-md mx-auto mb-8 p-6 bg-red-900/20 border border-red-500/30 rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}

        {!loading && !error && (
          <>
            {filtered.length === 0 && llms.length > 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-slate-300 mb-2">No models found</h3>
                <p className="text-slate-400">Try adjusting your search terms</p>
              </motion.div>
            )}

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {filtered.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <LLMCard model={model} onClick={() => setSelected(model)} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        <motion.footer 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a 
            href="/glossary" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <span className="mr-2">📚</span>
            Glossary & FAQ
          </a>
        </motion.footer>
      </div>

      <LLMDetailsModal model={selected} onClose={() => setSelected(null)} />
    </div>
  );
}