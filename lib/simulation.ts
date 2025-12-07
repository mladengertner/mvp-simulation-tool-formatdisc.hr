export interface SimulationInput {
  ideaName: string;
  targetMarket: string;
  monthlyPrice: number;
  initialUsers: number;
  monthlyGrowthRate: number;
  customerAcquisitionCost: number;
  monthlyOperatingCost: number;
  teamSize: number;
  competitionLevel: "low" | "medium" | "high";
  marketMaturity: "early" | "growing" | "mature";
}

export interface MonthlyProjection {
  month: number;
  users: number;
  revenue: number;
  costs: number;
  profit: number;
  cumulativeProfit: number;
}

export interface RiskFactor {
  factor: string;
  score: number;
  impact: string;
}

export interface SimulationResults {
  input: SimulationInput;
  projections: MonthlyProjection[];
  confidenceScore: number;
  verdict: "GO" | "MAYBE" | "NO-GO";
  verdictReason: string;
  riskFactors: RiskFactor[];
  breakEvenMonth: number | null;
  totalRevenue12M: number;
  totalCosts12M: number;
  totalProfit12M: number;
  arpu: number;
  suggestions: string[];
}

export function runSimulation(input: SimulationInput): SimulationResults {
  const projections: MonthlyProjection[] = [];
  let cumulativeProfit = 0;
  let breakEvenMonth: number | null = null;

  // Generate 12-month projections
  for (let month = 1; month <= 12; month++) {
    const users = Math.round(
      input.initialUsers * Math.pow(1 + input.monthlyGrowthRate / 100, month - 1)
    );
    const revenue = users * input.monthlyPrice;
    const acquisitionCost = month === 1 
      ? input.initialUsers * input.customerAcquisitionCost 
      : Math.round(users * (input.monthlyGrowthRate / 100)) * input.customerAcquisitionCost;
    const costs = input.monthlyOperatingCost + acquisitionCost;
    const profit = revenue - costs;
    cumulativeProfit += profit;

    if (breakEvenMonth === null && cumulativeProfit >= 0) {
      breakEvenMonth = month;
    }

    projections.push({
      month,
      users,
      revenue,
      costs,
      profit,
      cumulativeProfit,
    });
  }

  // Calculate risk factors
  const riskFactors: RiskFactor[] = [];
  
  const cacRecoveryMonths = input.customerAcquisitionCost / input.monthlyPrice;
  const cacRisk = cacRecoveryMonths > 6 ? 30 : cacRecoveryMonths > 3 ? 15 : 5;
  riskFactors.push({
    factor: "CAC Recovery Time",
    score: 100 - cacRisk,
    impact: cacRecoveryMonths > 6 ? "High" : cacRecoveryMonths > 3 ? "Medium" : "Low",
  });

  const competitionRisk = input.competitionLevel === "high" ? 25 : input.competitionLevel === "medium" ? 15 : 5;
  riskFactors.push({
    factor: "Competition Level",
    score: 100 - competitionRisk,
    impact: input.competitionLevel === "high" ? "High" : input.competitionLevel === "medium" ? "Medium" : "Low",
  });

  const marketRisk = input.marketMaturity === "early" ? 20 : input.marketMaturity === "mature" ? 10 : 5;
  riskFactors.push({
    factor: "Market Maturity",
    score: 100 - marketRisk,
    impact: input.marketMaturity === "early" ? "High" : input.marketMaturity === "mature" ? "Medium" : "Low",
  });

  const teamRisk = input.teamSize < 2 ? 20 : input.teamSize > 10 ? 15 : 5;
  riskFactors.push({
    factor: "Team Size",
    score: 100 - teamRisk,
    impact: input.teamSize < 2 ? "High" : input.teamSize > 10 ? "Medium" : "Low",
  });

  // Calculate confidence score
  const avgRiskScore = riskFactors.reduce((sum, r) => sum + r.score, 0) / riskFactors.length;
  const profitabilityScore = breakEvenMonth ? Math.max(0, 100 - breakEvenMonth * 5) : 20;
  const confidenceScore = Math.round((avgRiskScore * 0.6 + profitabilityScore * 0.4));

  // Determine verdict
  let verdict: "GO" | "MAYBE" | "NO-GO";
  let verdictReason: string;
  
  if (confidenceScore >= 70 && breakEvenMonth && breakEvenMonth <= 8) {
    verdict = "GO";
    verdictReason = "Strong financial model with manageable risks and clear path to profitability.";
  } else if (confidenceScore >= 50 && (breakEvenMonth === null || breakEvenMonth <= 12)) {
    verdict = "MAYBE";
    verdictReason = "Viable concept with moderate risks. Consider optimizing CAC and growth strategy.";
  } else {
    verdict = "NO-GO";
    verdictReason = "High risk factors or unclear path to profitability. Significant changes needed.";
  }

  // Generate suggestions
  const suggestions: string[] = [];
  if (cacRecoveryMonths > 6) {
    suggestions.push("Reduce customer acquisition cost or increase monthly pricing");
  }
  if (input.monthlyGrowthRate < 10) {
    suggestions.push("Explore strategies to increase monthly growth rate above 10%");
  }
  if (input.competitionLevel === "high") {
    suggestions.push("Differentiate your offering or target a more specific niche");
  }
  if (!breakEvenMonth) {
    suggestions.push("Review and reduce monthly operating costs to achieve profitability");
  }
  if (input.teamSize < 2) {
    suggestions.push("Consider expanding team to reduce execution risk");
  }

  const totalRevenue12M = projections.reduce((sum, p) => sum + p.revenue, 0);
  const totalCosts12M = projections.reduce((sum, p) => sum + p.costs, 0);
  const totalProfit12M = projections[11].cumulativeProfit;
  const arpu = input.monthlyPrice;

  return {
    input,
    projections,
    confidenceScore,
    verdict,
    verdictReason,
    riskFactors,
    breakEvenMonth,
    totalRevenue12M,
    totalCosts12M,
    totalProfit12M,
    arpu,
    suggestions,
  };
}
