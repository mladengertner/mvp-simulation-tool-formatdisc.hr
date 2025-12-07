"use client";

import { useState } from "react";
import { SimulationInput, runSimulation } from "@/lib/simulation";

interface SimulationFormProps {
  onSubmit: (results: any) => void;
}

export function SimulationForm({ onSubmit }: SimulationFormProps) {
  const [formData, setFormData] = useState<SimulationInput>({
    ideaName: "",
    targetMarket: "",
    monthlyPrice: 29,
    initialUsers: 100,
    monthlyGrowthRate: 15,
    customerAcquisitionCost: 50,
    monthlyOperatingCost: 5000,
    teamSize: 2,
    competitionLevel: "medium",
    marketMaturity: "growing",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = runSimulation(formData);
    onSubmit(results);
  };

  const updateField = (field: keyof SimulationInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Enter Your Startup Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium mb-2">Startup Idea Name</label>
            <input
              type="text"
              required
              value={formData.ideaName}
              onChange={(e) => updateField("ideaName", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="e.g., AI Resume Builder"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Market</label>
            <input
              type="text"
              required
              value={formData.targetMarket}
              onChange={(e) => updateField("targetMarket", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="e.g., Job Seekers, SMBs"
            />
          </div>

          {/* Financial Metrics */}
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Price ($)</label>
            <input
              type="number"
              required
              min="1"
              value={formData.monthlyPrice}
              onChange={(e) => updateField("monthlyPrice", Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Initial Users</label>
            <input
              type="number"
              required
              min="1"
              value={formData.initialUsers}
              onChange={(e) => updateField("initialUsers", Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Monthly Growth Rate (%)</label>
            <input
              type="number"
              required
              min="0"
              max="100"
              value={formData.monthlyGrowthRate}
              onChange={(e) => updateField("monthlyGrowthRate", Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Customer Acquisition Cost ($)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.customerAcquisitionCost}
              onChange={(e) => updateField("customerAcquisitionCost", Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Monthly Operating Cost ($)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.monthlyOperatingCost}
              onChange={(e) => updateField("monthlyOperatingCost", Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Team Size</label>
            <input
              type="number"
              required
              min="1"
              value={formData.teamSize}
              onChange={(e) => updateField("teamSize", Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Competition Level</label>
            <select
              value={formData.competitionLevel}
              onChange={(e) => updateField("competitionLevel", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Market Maturity</label>
            <select
              value={formData.marketMaturity}
              onChange={(e) => updateField("marketMaturity", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="early">Early Stage</option>
              <option value="growing">Growing</option>
              <option value="mature">Mature</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Run Simulation
        </button>
      </form>
    </div>
  );
}
