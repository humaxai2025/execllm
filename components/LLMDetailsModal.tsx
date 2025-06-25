import { motion, AnimatePresence } from "framer-motion";

interface LLMModel {
  name: string;
  vendor: string;
  summary: string;
  capabilities: string[];
  useCases: string[];
  cost: string;
  deployment: string[];
}

interface LLMDetailsModalProps {
  model: LLMModel | null;
  onClose: () => void;
}

const costColors: Record<string, string> = {
  "$": "bg-green-100 text-green-700",
  "$$": "bg-yellow-100 text-yellow-700",
  "$$$": "bg-red-100 text-red-700",
  "Free": "bg-blue-100 text-blue-700"
};

export function LLMDetailsModal({ model, onClose }: LLMDetailsModalProps) {
  return (
    <AnimatePresence>
      {model && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative mx-4"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-blue-600"
              onClick={onClose}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-1">{model.name}</h2>
            <div className="text-gray-500 mb-3">{model.vendor}</div>
            <div className="mb-2">{model.summary}</div>
            <div>
              <b>Capabilities:</b>
              <ul className="list-disc pl-5 mb-2">
                {model.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <b>Best Use Cases:</b>
              <ul className="list-disc pl-5 mb-2">
                {model.useCases.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <b>Cost:</b>{" "}
              <span
                className={`inline-block ml-1 px-2 py-1 rounded-lg font-semibold ${costColors[model.cost] || "bg-gray-100 text-gray-700"}`}
              >
                {model.cost}
              </span>
            </div>
            <div className="mt-2">
              <b>Deployment:</b> {model.deployment.join(", ")}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}