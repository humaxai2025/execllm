import { Card, CardContent } from "./ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
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

interface LLMCardProps {
  model: LLMModel;
  onClick: () => void;
}

const costColors: Record<string, string> = {
  "$": "bg-green-100 text-green-700",
  "$$": "bg-yellow-100 text-yellow-700",
  "$$$": "bg-red-100 text-red-700",
  "Free": "bg-blue-100 text-blue-700"
};

export function LLMCard({ model, onClick }: LLMCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(50,50,120,0.18)" }}>
      <Card
        className="cursor-pointer hover:border-blue-500 transition"
        onClick={onClick}
      >
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{model.name}</h2>
            <span
              className={`rounded-xl px-3 py-1 text-sm font-bold ${costColors[model.cost] || "bg-gray-100 text-gray-700"}`}
            >
              {model.cost}
            </span>
          </div>
          <div className="text-gray-500 mb-1">{model.vendor}</div>
          <div className="mb-2 text-gray-700">{model.summary}</div>
          <div className="flex flex-wrap gap-1 mb-1">
            {model.capabilities.map((c) => (
              <Badge key={c} className="bg-purple-100 text-purple-700">
                {c}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {model.useCases.map((u) => (
              <Badge key={u} className="bg-blue-100 text-blue-700">
                {u}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}