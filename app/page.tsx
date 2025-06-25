"use client";
import { useState, useEffect } from "react";
import { LLMCard } from "../components/LLMCard.tsx";
import { LLMDetailsModal } from "../components/LLMDetailsModal.tsx";
import { SearchBar } from "../components/SearchBar.tsx";

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

  useEffect(() => {
    fetch("/llms.json")
      .then((res) => res.json())
      .then((data) => setLlms(data))
      .catch((error) => console.error("Error loading LLM data:", error));
  }, []);

  const filtered = llms.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.vendor.toLowerCase().includes(search.toLowerCase()) ||
      m.useCases.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10 px-4">
      <header className="mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          LLM Executive Comparison
        </h1>
        <p className="text-lg text-gray-600 mb-4 text-center max-w-2xl">
          Compare the world's top language models for business—fast, easy, and jargon-free.
        </p>
        <SearchBar value={search} onChange={setSearch} />
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((model) => (
          <LLMCard key={model.name} model={model} onClick={() => setSelected(model)} />
        ))}
      </div>

      <div className="mt-16 text-center text-gray-500">
        <a href="/glossary" className="underline hover:text-blue-700">
          Glossary & FAQ
        </a>
      </div>

      <LLMDetailsModal model={selected} onClose={() => setSelected(null)} />
    </div>
  );
}