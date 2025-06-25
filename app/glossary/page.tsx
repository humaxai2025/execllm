import { Card } from "../../components/ui/card.tsx";



const glossary = [
  {
    term: "LLM",
    def: "Large Language Model. An advanced AI that understands and generates human language."
  },
  {
    term: "API",
    def: "Application Programming Interface. Lets apps talk to each other, e.g., connect your tool to an LLM."
  },
  {
    term: "Open Source",
    def: "A model or software anyone can inspect, use, or modify freely."
  },
  {
    term: "Cloud",
    def: "Model is hosted online; you access it via the Internet."
  },
  {
    term: "Self-hosted",
    def: "You run the model on your own servers—private and more control."
  },
  {
    term: "Cost",
    def: "How much you pay: $ (cheap), $$ (moderate), $$$ (premium), or Free."
  }
];

export default function Glossary() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">Glossary & FAQ</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {glossary.map(({ term, def }) => (
          <Card key={term} className="shadow-lg p-5">
            <span className="font-bold text-lg text-blue-700">{term}</span>
            <div className="mt-2 text-gray-700">{def}</div>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a href="/" className="underline text-blue-700">← Back to LLM Directory</a>
      </div>
    </div>
  );
}
