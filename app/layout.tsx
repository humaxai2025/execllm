import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "LLM Executive Comparison",
  description: "Compare the world's top LLMs for business use—fast, easy, jargon-free.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-tr from-gray-50 via-blue-100 to-purple-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
