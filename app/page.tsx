"use client";

import { useState } from "react";
import { SimulationForm } from "@/components/simulation-form";
import { SimulationResults } from "@/components/simulation-results";

export default function HomePage() {
  const [results, setResults] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            FORMATDISC MVP Simulation Tool
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered MVP simulator for startup validation. Get instant financial projections, risk analysis, and GO/NO-GO verdict.
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          {!results ? (
            <SimulationForm onSubmit={setResults} />
          ) : (
            <SimulationResults results={results} onReset={() => setResults(null)} />
          )}
        </div>

        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>© 2024 FORMATDISC, vl. Mladen Gertner | info@formatdisc.hr | +385 91 542 1014</p>
        </footer>
      </div>
    </main>
  );
}
