# API Reference - FORMATDISC MVP Simulation Tool

## Table of Contents
- [Core Simulation API](#core-simulation-api)
- [Type Definitions](#type-definitions)
- [Component APIs](#component-apis)
- [Utility Functions](#utility-functions)
- [Constants and Enums](#constants-and-enums)
- [Usage Examples](#usage-examples)

## Core Simulation API

### `runSimulation()`

The primary function that executes the complete MVP simulation analysis.

#### Signature
```typescript
function runSimulation(input: SimulationInput): SimulationResults
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `input` | `SimulationInput` | Complete set of startup parameters |

#### Returns
`SimulationResults` - Comprehensive analysis including projections, verdict, and recommendations

#### Description
Executes a complete 12-month business simulation including:
- Monthly financial projections (revenue, costs, profit)
- Risk factor analysis across multiple dimensions
- Confidence scoring algorithm
- GO/MAYBE/NO-GO verdict determination
- Actionable improvement suggestions
- Break-even point calculation

#### Time Complexity
O(12) - Linear time based on 12-month projection period

#### Example
```typescript
import { runSimulation } from '@/lib/simulation';

const input: SimulationInput = {
  ideaName: "CloudSync Pro",
  targetMarket: "Small Business SaaS",
  monthlyPrice: 49,
  initialUsers: 100,
  monthlyGrowthRate: 15,
  customerAcquisitionCost: 120,
  monthlyOperatingCost: 5000,
  teamSize: 3,
  competitionLevel: "medium",
  marketMaturity: "growing"
};

const results = runSimulation(input);
console.log(results.verdict); // "GO", "MAYBE", or "NO-GO"
console.log(results.confidenceScore); // 0-100
```

## Type Definitions

### `SimulationInput`

User input data structure for simulation.

```typescript
interface SimulationInput {
  ideaName: string;              // Startup/product name
  targetMarket: string;          // Target market description
  monthlyPrice: number;          // Price per customer per month ($)
  initialUsers: number;          // Starting customer count
  monthlyGrowthRate: number;     // Growth rate percentage (0-100)
  customerAcquisitionCost: number; // CAC in dollars
  monthlyOperatingCost: number;  // Fixed monthly OPEX ($)
  teamSize: number;              // Number of team members
  competitionLevel: "low" | "medium" | "high";
  marketMaturity: "early" | "growing" | "mature";
}
```

#### Field Constraints

| Field | Type | Range | Required | Default |
|-------|------|-------|----------|---------|
| `ideaName` | string | 1-100 chars | Yes | - |
| `targetMarket` | string | 1-200 chars | Yes | - |
| `monthlyPrice` | number | 1-10000 | Yes | - |
| `initialUsers` | number | 1-1000000 | Yes | - |
| `monthlyGrowthRate` | number | 0-100 | Yes | - |
| `customerAcquisitionCost` | number | 0-10000 | Yes | - |
| `monthlyOperatingCost` | number | 0-1000000 | Yes | - |
| `teamSize` | number | 1-100 | Yes | - |
| `competitionLevel` | enum | low/medium/high | Yes | - |
| `marketMaturity` | enum | early/growing/mature | Yes | - |

### `SimulationResults`

Complete simulation output with all calculated metrics.

```typescript
interface SimulationResults {
  input: SimulationInput;        // Original input (for reference)
  projections: MonthlyProjection[]; // 12-month financial projections
  confidenceScore: number;       // Business viability (0-100)
  verdict: "GO" | "MAYBE" | "NO-GO"; // Final recommendation
  verdictReason: string;         // Explanation for verdict
  riskFactors: RiskFactor[];     // Risk analysis breakdown
  breakEvenMonth: number | null; // Month when cumulative profit ≥ 0
  totalRevenue12M: number;       // Sum of 12 months revenue
  totalCosts12M: number;         // Sum of 12 months costs
  totalProfit12M: number;        // Cumulative profit at month 12
  arpu: number;                  // Average Revenue Per User
  suggestions: string[];         // Actionable recommendations
}
```

#### Return Value Details

| Field | Type | Description | Range |
|-------|------|-------------|-------|
| `confidenceScore` | number | Weighted score of business viability | 0-100 |
| `verdict` | enum | GO/MAYBE/NO-GO recommendation | - |
| `breakEvenMonth` | number\|null | First month with profit ≥ 0 | 1-12 or null |
| `totalRevenue12M` | number | Cumulative 12-month revenue | ≥ 0 |
| `totalProfit12M` | number | Net profit after 12 months | any |
| `arpu` | number | Average revenue per user | ≥ 0 |
| `suggestions` | string[] | List of improvement suggestions | 0-5 items |

### `MonthlyProjection`

Individual month's financial projection.

```typescript
interface MonthlyProjection {
  month: number;              // Month number (1-12)
  users: number;              // Total active users
  revenue: number;            // Monthly revenue ($)
  costs: number;              // Monthly total costs ($)
  profit: number;             // Monthly profit/loss ($)
  cumulativeProfit: number;   // Running total profit ($)
}
```

#### Calculation Formulas

```typescript
// Month-to-month calculations
users[month] = initialUsers × (1 + growthRate/100)^(month-1)
revenue[month] = users[month] × monthlyPrice
newUsers[month] = users[month] - users[month-1]
acquisitionCost[month] = newUsers[month] × CAC
costs[month] = monthlyOperatingCost + acquisitionCost[month]
profit[month] = revenue[month] - costs[month]
cumulativeProfit[month] = cumulativeProfit[month-1] + profit[month]
```

### `RiskFactor`

Individual risk factor analysis.

```typescript
interface RiskFactor {
  factor: string;    // Risk factor name
  score: number;     // Score (0-100, higher is better)
  impact: string;    // "Low" | "Medium" | "High"
}
```

#### Risk Factors Evaluated

| Factor | Description | Scoring Method |
|--------|-------------|----------------|
| CAC Recovery Time | Time to recover customer acquisition cost | Based on CAC/monthlyPrice ratio |
| Competition Level | Market competition intensity | User-specified (low/medium/high) |
| Market Maturity | Market development stage | User-specified (early/growing/mature) |
| Team Size | Team adequacy for execution | Based on team member count |

#### Scoring Logic

```typescript
// CAC Recovery Risk
cacRecoveryMonths = CAC / monthlyPrice
cacRisk = cacRecoveryMonths > 6 ? 30 : (> 3 ? 15 : 5)
score = 100 - cacRisk

// Competition Risk
competitionRisk = high ? 25 : (medium ? 15 : 5)
score = 100 - competitionRisk

// Market Maturity Risk
marketRisk = early ? 20 : (mature ? 10 : 5)
score = 100 - marketRisk

// Team Size Risk
teamRisk = size < 2 ? 20 : (size > 10 ? 15 : 5)
score = 100 - teamRisk
```

## Component APIs

### SimulationForm Component

Form component for collecting user input.

#### Props
```typescript
interface SimulationFormProps {
  onSubmit: (data: SimulationInput) => void;
}
```

#### Usage
```typescript
import { SimulationForm } from '@/components/simulation-form';

function MyPage() {
  const handleSubmit = (data: SimulationInput) => {
    const results = runSimulation(data);
    setResults(results);
  };
  
  return <SimulationForm onSubmit={handleSubmit} />;
}
```

#### Form Sections

1. **Business Overview**
   - Idea Name (text input)
   - Target Market (text input)

2. **Revenue Model**
   - Monthly Price (number input, $)
   - Initial Users (number input)
   - Monthly Growth Rate (number input, %)

3. **Cost Structure**
   - Customer Acquisition Cost (number input, $)
   - Monthly Operating Cost (number input, $)

4. **Market & Team**
   - Team Size (number input)
   - Competition Level (select: low/medium/high)
   - Market Maturity (select: early/growing/mature)

#### Validation Rules
- All fields required
- Numbers must be positive
- Growth rate: 0-100%
- Minimum team size: 1
- Enum fields must match allowed values

### SimulationResults Component

Results display component with charts and PDF export.

#### Props
```typescript
interface SimulationResultsProps {
  results: SimulationResults;
}
```

#### Usage
```typescript
import { SimulationResults } from '@/components/simulation-results';

function MyPage() {
  const [results, setResults] = useState<SimulationResults | null>(null);
  
  return (
    <>
      {results && <SimulationResults results={results} />}
    </>
  );
}
```

#### Display Sections

1. **Verdict Banner**
   - GO/MAYBE/NO-GO badge
   - Confidence score percentage
   - Verdict explanation

2. **Key Metrics**
   - Total 12M Revenue
   - Total 12M Costs
   - Total 12M Profit
   - Break-even Month
   - ARPU

3. **Financial Charts** (Recharts)
   - Revenue Projection Line Chart
   - Cost Analysis Area Chart
   - Profit/Loss Bar Chart
   - User Growth Curve

4. **Risk Analysis**
   - Risk factor cards
   - Individual scores
   - Impact levels

5. **Recommendations**
   - Bulleted suggestion list
   - Actionable improvements

6. **Actions**
   - PDF Export Button

## Utility Functions

### `cn()`

Utility for merging Tailwind CSS class names.

#### Signature
```typescript
function cn(...inputs: ClassValue[]): string
```

#### Parameters
- `inputs`: Variable number of class name values

#### Returns
Merged and deduplicated class name string

#### Description
Combines clsx and tailwind-merge for optimal className handling. Automatically resolves Tailwind class conflicts.

#### Example
```typescript
import { cn } from '@/lib/utils';

// Basic usage
cn('px-4 py-2', 'bg-blue-500');
// => "px-4 py-2 bg-blue-500"

// Conditional classes
cn('base-class', isActive && 'active-class');
// => "base-class active-class" (if isActive is true)

// Conflicting Tailwind classes (tailwind-merge resolves)
cn('px-4', 'px-8');
// => "px-8" (later value wins)

// Arrays and objects
cn(['class1', 'class2'], { class3: true, class4: false });
// => "class1 class2 class3"
```

## Constants and Enums

### Verdict Thresholds

```typescript
const VERDICT_THRESHOLDS = {
  GO: {
    minConfidence: 70,
    maxBreakEvenMonth: 8
  },
  MAYBE: {
    minConfidence: 50,
    maxBreakEvenMonth: 12
  },
  NO_GO: {
    // Below MAYBE thresholds
  }
} as const;
```

### Competition Levels

```typescript
type CompetitionLevel = "low" | "medium" | "high";

const COMPETITION_RISK = {
  low: 5,
  medium: 15,
  high: 25
} as const;
```

### Market Maturity Stages

```typescript
type MarketMaturity = "early" | "growing" | "mature";

const MARKET_RISK = {
  early: 20,
  growing: 5,
  mature: 10
} as const;
```

### Confidence Score Weights

```typescript
const CONFIDENCE_WEIGHTS = {
  riskScore: 0.6,      // 60% weight on risk factors
  profitability: 0.4   // 40% weight on break-even
} as const;
```

## Usage Examples

### Basic Simulation Flow

```typescript
import { runSimulation, SimulationInput } from '@/lib/simulation';

// 1. Prepare input data
const input: SimulationInput = {
  ideaName: "TaskMaster Pro",
  targetMarket: "Project Management for Teams",
  monthlyPrice: 29,
  initialUsers: 50,
  monthlyGrowthRate: 20,
  customerAcquisitionCost: 75,
  monthlyOperatingCost: 3000,
  teamSize: 2,
  competitionLevel: "medium",
  marketMaturity: "growing"
};

// 2. Run simulation
const results = runSimulation(input);

// 3. Access results
console.log(`Verdict: ${results.verdict}`);
console.log(`Confidence: ${results.confidenceScore}%`);
console.log(`Break-even: Month ${results.breakEvenMonth || 'Never'}`);
console.log(`12M Revenue: $${results.totalRevenue12M.toLocaleString()}`);

// 4. Access monthly data
results.projections.forEach(month => {
  console.log(`Month ${month.month}: ${month.users} users, $${month.revenue} revenue`);
});

// 5. Review suggestions
results.suggestions.forEach(suggestion => {
  console.log(`• ${suggestion}`);
});
```

### React Component Integration

```typescript
'use client';

import { useState } from 'react';
import { runSimulation, SimulationInput, SimulationResults } from '@/lib/simulation';
import { SimulationForm } from '@/components/simulation-form';
import { SimulationResults as ResultsDisplay } from '@/components/simulation-results';

export default function SimulationPage() {
  const [results, setResults] = useState<SimulationResults | null>(null);

  const handleSimulation = (input: SimulationInput) => {
    const output = runSimulation(input);
    setResults(output);
  };

  return (
    <div className="container mx-auto p-8">
      <h1>MVP Simulation Tool</h1>
      
      <SimulationForm onSubmit={handleSimulation} />
      
      {results && (
        <div className="mt-8">
          <ResultsDisplay results={results} />
        </div>
      )}
    </div>
  );
}
```

### Advanced: Custom Risk Analysis

```typescript
import { runSimulation, SimulationInput, RiskFactor } from '@/lib/simulation';

function analyzeBusinessRisk(input: SimulationInput): {
  overallRisk: string;
  criticalFactors: RiskFactor[];
} {
  const results = runSimulation(input);
  
  // Identify high-risk factors
  const criticalFactors = results.riskFactors.filter(
    factor => factor.impact === "High"
  );
  
  // Determine overall risk level
  let overallRisk: string;
  if (results.confidenceScore >= 70) {
    overallRisk = "Low";
  } else if (results.confidenceScore >= 50) {
    overallRisk = "Medium";
  } else {
    overallRisk = "High";
  }
  
  return { overallRisk, criticalFactors };
}

// Usage
const input = { /* ... */ };
const { overallRisk, criticalFactors } = analyzeBusinessRisk(input);
console.log(`Overall Risk Level: ${overallRisk}`);
console.log(`Critical Factors: ${criticalFactors.length}`);
```

### PDF Export Integration

```typescript
import { runSimulation } from '@/lib/simulation';
import jsPDF from 'jspdf';

async function generateReport(input: SimulationInput) {
  const results = runSimulation(input);
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text(results.input.ideaName, 20, 20);
  
  // Verdict
  doc.setFontSize(16);
  doc.text(`Verdict: ${results.verdict}`, 20, 40);
  doc.text(`Confidence: ${results.confidenceScore}%`, 20, 50);
  
  // Financial Summary
  doc.setFontSize(12);
  doc.text(`12-Month Revenue: $${results.totalRevenue12M.toLocaleString()}`, 20, 70);
  doc.text(`12-Month Costs: $${results.totalCosts12M.toLocaleString()}`, 20, 80);
  doc.text(`12-Month Profit: $${results.totalProfit12M.toLocaleString()}`, 20, 90);
  
  // Break-even
  if (results.breakEvenMonth) {
    doc.text(`Break-even: Month ${results.breakEvenMonth}`, 20, 100);
  }
  
  // Save
  doc.save(`${results.input.ideaName}-simulation-report.pdf`);
}
```

## Error Handling

### Input Validation

```typescript
function validateInput(input: Partial<SimulationInput>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!input.ideaName || input.ideaName.length === 0) {
    errors.push("Idea name is required");
  }
  
  if (!input.monthlyPrice || input.monthlyPrice <= 0) {
    errors.push("Monthly price must be greater than 0");
  }
  
  if (!input.initialUsers || input.initialUsers < 1) {
    errors.push("Initial users must be at least 1");
  }
  
  if (input.monthlyGrowthRate === undefined || 
      input.monthlyGrowthRate < 0 || 
      input.monthlyGrowthRate > 100) {
    errors.push("Growth rate must be between 0 and 100");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

## Performance Considerations

### Computational Complexity

| Function | Time Complexity | Space Complexity | Typical Runtime |
|----------|----------------|------------------|-----------------|
| `runSimulation()` | O(12) | O(12) | < 5ms |
| Monthly projection loop | O(12) | O(1) | < 2ms |
| Risk calculation | O(4) | O(4) | < 1ms |
| Verdict generation | O(1) | O(1) | < 1ms |

### Optimization Tips

1. **Memoization**: Cache results for identical inputs
2. **Lazy Evaluation**: Only calculate what's needed
3. **Batch Processing**: Run multiple simulations in parallel

```typescript
import { useMemo } from 'react';

function OptimizedComponent({ input }: { input: SimulationInput }) {
  // Memoize expensive simulation calculation
  const results = useMemo(
    () => runSimulation(input),
    [input] // Only recalculate when input changes
  );
  
  return <SimulationResults results={results} />;
}
```

---

**For more information:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design details
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Setup instructions
