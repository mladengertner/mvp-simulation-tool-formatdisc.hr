# Architecture - FORMATDISC MVP Simulation Tool

## Table of Contents
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Simulation Engine](#simulation-engine)
- [Design Patterns](#design-patterns)
- [Performance Considerations](#performance-considerations)
- [Security Architecture](#security-architecture)

## System Architecture

### High-Level Overview

The FORMATDISC MVP Simulation Tool follows a **client-side architecture** with no backend dependencies. All computation occurs in the user's browser, ensuring privacy, speed, and zero infrastructure costs.

```
┌───────────────────────────────────────────────────────────┐
│                     User Browser                          │
├───────────────────────────────────────────────────────────┤
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Next.js 15 Application Layer               │  │
│  │  ┌──────────────┐         ┌───────────────────┐   │  │
│  │  │   Landing    │         │   Simulation      │   │  │
│  │  │   Page (/)   │         │   Tool (/landing) │   │  │
│  │  └──────────────┘         └───────────────────┘   │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │            Presentation Layer (React)              │  │
│  │  ┌─────────────────┐  ┌──────────────────────┐    │  │
│  │  │ SimulationForm  │  │ SimulationResults    │    │  │
│  │  │ - User Input    │  │ - Charts Display     │    │  │
│  │  │ - Validation    │  │ - Metrics Summary    │    │  │
│  │  │ - Form State    │  │ - PDF Export         │    │  │
│  │  └─────────────────┘  └──────────────────────┘    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │            Business Logic Layer                    │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │       Simulation Engine (lib/simulation.ts) │ │  │
│  │  │                                               │ │  │
│  │  │  • Financial Projections Calculator          │ │  │
│  │  │  • Risk Analysis Algorithm                   │ │  │
│  │  │  • Growth Modeling Engine                    │ │  │
│  │  │  • Verdict Generation Logic                  │ │  │
│  │  │  • Recommendation System                     │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │            Utility Layer                           │  │
│  │  • PDF Generation (jsPDF)                          │  │
│  │  • Chart Rendering (Recharts)                      │  │
│  │  • UI Components (Radix + shadcn)                  │  │
│  │  • Utility Functions (lib/utils.ts)                │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │   Vercel Edge Network   │
              │   • CDN Distribution    │
              │   • Static Hosting      │
              │   • Analytics           │
              └─────────────────────────┘
```

### Architectural Principles

1. **Client-Side First:** All computation in browser, no server required
2. **Static Generation:** Pages pre-rendered at build time for performance
3. **Zero Backend:** No database, API, or server-side logic
4. **Privacy by Design:** User data never leaves the browser
5. **Progressive Enhancement:** Works without JavaScript (basic features)

## Technology Stack

### Frontend Framework
```typescript
// Next.js 15 with App Router
- Framework: Next.js 15.2.4
- React: 19.x (Latest)
- TypeScript: 5.x
- Rendering: Static Site Generation (SSG)
```

### Styling System
```typescript
// Tailwind CSS v4 + Component Libraries
- CSS Framework: Tailwind CSS 4.1.9
- Component Primitives: Radix UI
- Component Library: shadcn/ui
- Icons: Lucide React
- Animations: tailwindcss-animate
```

### Data Visualization
```typescript
// Chart and PDF Generation
- Charts: Recharts (responsive charts)
- PDF Export: jsPDF (client-side PDF generation)
- Data Formatting: date-fns
```

### Development Tools
```typescript
// Build and Development Tools
- Build Tool: Next.js built-in (Turbopack/Webpack)
- TypeScript Compiler: tsc
- Linter: ESLint
- CSS Processor: PostCSS
- Package Manager: npm
```

### Deployment
```typescript
// Hosting and Analytics
- Platform: Vercel
- CDN: Vercel Edge Network
- Analytics: @vercel/analytics
- Domain: www.formatdisc.hr
```

## Component Architecture

### Page Components

#### 1. Main Simulation Page (`app/page.tsx`)
```typescript
Purpose: Entry point for the simulation tool
Responsibilities:
  - Render SimulationForm
  - Manage simulation state
  - Display SimulationResults
  - Handle form submission

Key Features:
  - Client-side rendering
  - State management with useState
  - Responsive layout
```

#### 2. Landing Page (`app/landing/page.tsx`)
```typescript
Purpose: Marketing and information page
Responsibilities:
  - Display product features
  - Call-to-action buttons
  - Company branding
  - Link to main tool

Key Features:
  - Static generation
  - SEO optimized
  - Mobile responsive
```

### Core Components

#### SimulationForm Component
```typescript
Location: components/simulation-form.tsx
Purpose: Capture user input for simulation

Structure:
  ┌─────────────────────────────────┐
  │     SimulationForm              │
  ├─────────────────────────────────┤
  │ Props:                          │
  │   - onSubmit: (data) => void    │
  │                                  │
  │ State:                          │
  │   - formData: SimulationInput   │
  │   - errors: ValidationErrors    │
  │                                  │
  │ Sections:                       │
  │   1. Business Model             │
  │   2. Revenue Assumptions        │
  │   3. Cost Structure             │
  │   4. Team & Execution           │
  │                                  │
  │ Validation:                     │
  │   - Required fields             │
  │   - Number ranges               │
  │   - Business logic rules        │
  └─────────────────────────────────┘

Key Technologies:
  - React Hook Form (form management)
  - Zod (schema validation)
  - Radix UI (form components)
```

#### SimulationResults Component
```typescript
Location: components/simulation-results.tsx
Purpose: Display simulation results and insights

Structure:
  ┌─────────────────────────────────┐
  │   SimulationResults             │
  ├─────────────────────────────────┤
  │ Props:                          │
  │   - results: SimulationOutput   │
  │                                  │
  │ Sections:                       │
  │   1. Verdict Badge              │
  │   2. Confidence Score           │
  │   3. Financial Charts           │
  │   4. Risk Breakdown             │
  │   5. Recommendations            │
  │   6. PDF Export Button          │
  │                                  │
  │ Charts:                         │
  │   - Revenue Projection          │
  │   - Cost Analysis               │
  │   - Profit/Loss Curve           │
  │   - Customer Growth             │
  │                                  │
  │ Features:                       │
  │   - Interactive tooltips        │
  │   - Responsive design           │
  │   - PDF export                  │
  └─────────────────────────────────┘

Key Technologies:
  - Recharts (data visualization)
  - jsPDF (PDF generation)
  - Radix UI (UI components)
```

### UI Component Library

The application uses **shadcn/ui** components built on **Radix UI** primitives:

```
UI Components Used:
├── Forms
│   ├── Input
│   ├── Select
│   ├── Slider
│   ├── Label
│   └── Button
├── Layout
│   ├── Card
│   ├── Separator
│   ├── Tabs
│   └── ScrollArea
├── Feedback
│   ├── Badge
│   ├── Alert
│   ├── Progress
│   └── Toast
└── Data Display
    ├── Table
    ├── Accordion
    └── Tooltip
```

## Data Flow

### User Input → Simulation Results

```
1. USER INPUT
   │
   ├─→ SimulationForm Component
   │   ├─ Collect form data
   │   ├─ Validate inputs
   │   └─ Format data structure
   │
2. DATA VALIDATION
   │
   ├─→ Zod Schema Validation
   │   ├─ Check required fields
   │   ├─ Validate number ranges
   │   └─ Apply business rules
   │
3. SIMULATION PROCESSING
   │
   ├─→ runSimulation() function
   │   │
   │   ├─→ calculateFinancialProjections()
   │   │   ├─ Monthly revenue
   │   │   ├─ Monthly costs
   │   │   ├─ Profit/loss
   │   │   └─ Break-even point
   │   │
   │   ├─→ calculateRiskScore()
   │   │   ├─ Market risk
   │   │   ├─ Team risk
   │   │   ├─ Execution risk
   │   │   └─ Confidence score
   │   │
   │   ├─→ calculateGrowthMetrics()
   │   │   ├─ Customer acquisition
   │   │   ├─ ARPU
   │   │   └─ CAC recovery
   │   │
   │   └─→ generateVerdict()
   │       ├─ GO/MAYBE/NO-GO
   │       └─ Recommendations
   │
4. RESULTS DISPLAY
   │
   └─→ SimulationResults Component
       ├─ Render verdict
       ├─ Display charts
       ├─ Show metrics
       └─ Enable PDF export
```

### State Management

```typescript
// State Flow in Main Page
const [simulationResults, setSimulationResults] = 
  useState<SimulationOutput | null>(null);

// On form submission
const handleSubmit = (formData: SimulationInput) => {
  const results = runSimulation(formData);
  setSimulationResults(results);
};

// Results passed to display component
<SimulationResults results={simulationResults} />
```

## Simulation Engine

### Core Algorithm (`lib/simulation.ts`)

#### 1. Financial Projections Calculator

```typescript
Function: calculateFinancialProjections()

Inputs:
  - pricePerCustomer: number
  - initialCustomers: number
  - growthRate: number (%)
  - churnRate: number (%)
  - fixedCosts: number
  - cac: number

Algorithm:
  FOR each month (1-12):
    newCustomers = prevCustomers × (growthRate / 100)
    lostCustomers = prevCustomers × (churnRate / 100)
    totalCustomers = prevCustomers + newCustomers - lostCustomers
    
    revenue = totalCustomers × pricePerCustomer
    variableCosts = newCustomers × cac
    totalCosts = fixedCosts + variableCosts
    profit = revenue - totalCosts
    
    cumulativeProfit += profit

Output:
  - Monthly revenue array [12]
  - Monthly cost array [12]
  - Monthly profit array [12]
  - Break-even month (if applicable)
  - Total customers at month 12
```

#### 2. Risk Analysis Calculator

```typescript
Function: calculateRiskScore()

Factors:
  1. Market Risk (0-100)
     - Industry maturity
     - Competition level
     - Market size
  
  2. Team Risk (0-100)
     - Team size adequacy
     - Technical capability
     - Execution speed
  
  3. Execution Risk (0-100)
     - Complexity vs capability
     - Time to market
     - Resource availability
  
  4. Financial Risk (0-100)
     - CAC vs LTV ratio
     - Runway sufficiency
     - Profit margins

Algorithm:
  baseScore = 50
  
  marketScore = assessMarket(industry)
  teamScore = (teamSize × 5) + (techCapability × 7) + (executionSpeed × 8)
  executionScore = calculateExecutionViability()
  financialScore = assessFinancialHealth(projections)
  
  confidenceScore = weightedAverage([
    marketScore × 0.25,
    teamScore × 0.30,
    executionScore × 0.20,
    financialScore × 0.25
  ])

Output:
  - Overall confidence (0-100)
  - Factor breakdown
  - Risk categories
```

#### 3. Verdict Generation

```typescript
Function: generateVerdict()

Input: confidenceScore (0-100)

Logic:
  IF confidenceScore >= 70:
    verdict = "GO"
    message = "Strong business case with high success probability"
  
  ELSE IF confidenceScore >= 50:
    verdict = "MAYBE"
    message = "Viable with improvements in key areas"
  
  ELSE:
    verdict = "NO-GO"
    message = "High risk factors require fundamental changes"

Recommendations:
  IF teamScore < 60:
    suggest "Consider strengthening team capabilities"
  
  IF financialScore < 60:
    suggest "Review pricing model and cost structure"
  
  IF marketScore < 60:
    suggest "Conduct deeper market research"

Output:
  - Verdict (GO/MAYBE/NO-GO)
  - Confidence score
  - Recommendation list
```

## Design Patterns

### 1. Component Composition Pattern
```typescript
// Small, focused components composed together
<SimulationPage>
  <Header />
  <SimulationForm onSubmit={handleSubmit}>
    <BusinessModelSection />
    <RevenueSection />
    <CostSection />
    <TeamSection />
  </SimulationForm>
  {results && <SimulationResults results={results} />}
</SimulationPage>
```

### 2. Presentational vs Container Pattern
```typescript
// Container Component (logic)
function SimulationPage() {
  const [results, setResults] = useState(null);
  const handleSubmit = (data) => setResults(runSimulation(data));
  return <SimulationForm onSubmit={handleSubmit} />;
}

// Presentational Component (UI only)
function SimulationForm({ onSubmit }) {
  return <form onSubmit={onSubmit}>...</form>;
}
```

### 3. Custom Hooks Pattern
```typescript
// Reusable logic extraction
function useSimulation() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const runSimulation = async (data) => {
    setLoading(true);
    const output = calculateSimulation(data);
    setResults(output);
    setLoading(false);
  };
  
  return { results, loading, runSimulation };
}
```

### 4. Pure Function Pattern
```typescript
// All simulation functions are pure (no side effects)
function calculateRevenue(
  customers: number,
  price: number
): number {
  return customers * price; // Deterministic output
}
```

## Performance Considerations

### Build-Time Optimizations
- **Static Site Generation:** All pages pre-rendered
- **Tree Shaking:** Unused code eliminated
- **Code Splitting:** Automatic route-based splitting
- **Image Optimization:** Disabled for faster builds (no images)

### Runtime Optimizations
- **Client-Side Computation:** No network latency
- **Memoization:** Results cached during session
- **Lazy Loading:** Components loaded on demand
- **Efficient Rendering:** React 19 optimizations

### Bundle Size
```
Route                Size        First Load JS
/                    1.2 kB      235 kB
/landing             500 B       105 kB
/sitemap.xml         0 B         101 kB
```

### Performance Targets
- **Time to Interactive:** < 2 seconds
- **Simulation Time:** < 3 seconds
- **PDF Generation:** < 2 seconds
- **First Contentful Paint:** < 1 second

## Security Architecture

### Client-Side Security
1. **No Data Persistence:** User data never stored
2. **No Backend:** No API attack surface
3. **Content Security:** Headers configured in Vercel
4. **XSS Prevention:** React automatic escaping
5. **HTTPS Only:** Enforced by Vercel

### Security Headers (vercel.json)
```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" }
    ]
  }]
}
```

### Dependencies Security
- Regular dependency audits (`npm audit`)
- Automated Dependabot updates
- Minimal dependency tree
- No runtime dependencies with known vulnerabilities

## Scalability

### Current Architecture Scalability
- **Users:** Unlimited (client-side processing)
- **Concurrent Users:** No limits (no server)
- **Geographic Distribution:** Vercel global CDN
- **Load Handling:** Each user's browser handles their load

### Future Scalability Considerations
- **Feature Additions:** Modular architecture supports extensions
- **Backend Integration:** Can add API layer without major refactor
- **Multi-Tenancy:** Can add user accounts and data persistence
- **Team Collaboration:** Architecture supports shared workspaces

## Deployment Architecture

### Vercel Edge Network
```
User Request
    │
    ▼
┌─────────────────┐
│  Vercel Edge    │ (Nearest geographic location)
│  CDN Node       │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Static HTML    │ (Pre-rendered pages)
│  JS Bundles     │ (Client-side code)
│  CSS Assets     │ (Styles)
└─────────────────┘
```

### Build Process
```
1. GitHub Push
   ↓
2. Vercel Webhook Trigger
   ↓
3. Install Dependencies
   ↓
4. Next.js Build (Static Generation)
   ↓
5. Asset Optimization
   ↓
6. Deploy to Edge Network
   ↓
7. Invalidate CDN Cache
   ↓
8. Production Live
```

---

**For implementation details, see:**
- [API_REFERENCE.md](./API_REFERENCE.md) - Function signatures and types
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development workflows
- [DEPLOYMENT.md](../DEPLOYMENT.md) - Deployment procedures
