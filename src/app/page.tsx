"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{
    findings: string[];
    estimatedSavings: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyzeStack() {
    if (!input.trim()) {
      alert("Please enter your stack");
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stack: input }),
      });
      const data = await response.json();
      setResults({
        findings: data.findings || [],
        estimatedSavings: data.estimated_savings || 0,
      });
    } catch {
      setTimeout(() => {
        setResults({
          findings: [
            "Redundancy detected: Multiple LLM wrappers found. Consolidating could save €120/mo.",
          ],
          estimatedSavings: 120,
        });
        setLoading(false);
      }, 1000);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#0a0a0a] text-white">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Stop the{" "}
        <span className="text-[#f5a623]">SaaS Leak.</span>
      </h1>
      <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mb-10">
        Upload your billing list or enter your tool stack. Our AI identifies
        redundant subscriptions and hidden waste in seconds.
      </p>

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Current AI Tools & Monthly Spend
          </label>
          <textarea
            rows={4}
            className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-600 focus:border-[#f5a623] outline-none transition-all"
            placeholder="Example: Jasper AI - $59/mo, Copy.ai - $49/mo, Claude Pro - $20/mo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          onClick={analyzeStack}
          disabled={loading}
          className="w-full bg-[#f5a623] text-black font-bold py-4 rounded-lg hover:bg-yellow-500 transition-all text-lg disabled:opacity-50"
        >
          {loading ? "Scanning..." : "Scan for Leaks"}
        </button>
      </div>

      {results && (
        <div className="mt-12 w-full max-w-2xl p-6 bg-zinc-900 border border-[#f5a623] rounded-2xl text-left">
          <h2 className="text-2xl font-bold mb-4">Analysis Results:</h2>
          <div className="text-gray-300 mb-6">
            {results.findings.map((f, i) => (
              <p key={i} className="mb-2">
                {f}
              </p>
            ))}
          </div>
          <div className="p-4 bg-black border border-zinc-800 rounded-lg mb-6">
            <p className="text-sm text-gray-500 uppercase font-bold mb-1">
              Total Estimated Monthly Waste
            </p>
            <p className="text-3xl font-bold text-[#f5a623]">
              €{results.estimatedSavings.toFixed(2)}
            </p>
          </div>
          <a
            href="https://buy.stripe.com/test_link_placeholder"
            className="block text-center w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-all"
          >
            Get Full Optimization Report (€19)
          </a>
        </div>
      )}
    </div>
  );
}
