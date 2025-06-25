import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ExecLLM - Executive AI Model Comparison",
  description: "Compare the world's most powerful AI models for business—designed for executives who value clarity over complexity.",
  keywords: "AI, LLM, Large Language Models, Business AI, Executive Tools, AI Comparison",
  authors: [{ name: "ExecLLM Team" }],
  openGraph: {
    title: "ExecLLM - Executive AI Model Comparison",
    description: "Compare the world's most powerful AI models for business—designed for executives who value clarity over complexity.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}