# FORMATDISC MVP Simulation Tool - Overview

## Table of Contents
- [Introduction](#introduction)
- [Purpose](#purpose)
- [Key Features](#key-features)
- [Target Audience](#target-audience)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Status](#project-status)

## Introduction

The **FORMATDISC MVP Simulation Tool** is an AI-powered platform designed to help entrepreneurs validate their startup ideas before investing significant time and resources into development. The tool provides comprehensive financial modeling, risk analysis, and growth forecasting to deliver data-driven GO/NO-GO decisions in seconds.

**Live Production URL:** https://www.formatdisc.hr

## Purpose

### Problem Statement
Early-stage founders often struggle to:
- Validate business viability before committing resources
- Create professional financial projections without expertise
- Understand and quantify business risks
- Produce investor-ready reports quickly

### Solution
The MVP Simulation Tool addresses these challenges by providing:
- **Instant Financial Modeling:** Automated 12-month revenue, cost, and profit projections
- **Risk Quantification:** AI-driven confidence scoring and factor analysis
- **Growth Forecasting:** Customer acquisition trajectories and ARPU calculations
- **Professional Outputs:** Board-ready PDF reports with charts and insights
- **Actionable Verdicts:** Clear GO/MAYBE/NO-GO recommendations with improvement suggestions

## Key Features

### 1. Financial Projections
- **12-Month Revenue Forecasting:** Automated monthly revenue predictions based on pricing model and customer acquisition
- **Cost Structure Analysis:** OPEX breakdown with CAC (Customer Acquisition Cost) modeling
- **Profit & Cash Flow Curves:** Visual representation of financial health over time
- **MRR Tracking:** Monthly Recurring Revenue and cumulative earnings calculations
- **Break-Even Analysis:** Precise calculation of when the business becomes profitable

### 2. Risk Analysis
- **Confidence Scoring:** 0-100 scale rating of business viability
- **Factor-Level Breakdown:** Individual risk assessment for:
  - Market Risk
  - Team Risk
  - Execution Risk
  - CAC Sensitivity
- **Monte Carlo-Style Variation:** Simulation of multiple outcome scenarios

### 3. Growth Modeling
- **Customer Acquisition Trajectory:** Month-by-month user growth projections
- **Revenue Per User (ARPU):** Average revenue calculations and trends
- **CAC Recovery Analysis:** Time to recover customer acquisition costs
- **Runway Implications:** Cash runway and sustainability metrics

### 4. GO/NO-GO Verdict System
- **Deterministic Scoring Algorithm:** Objective evaluation based on multiple factors
- **Three-Tier Classification:**
  - **GO** (Confidence ≥ 70%): Strong business case
  - **MAYBE** (50% ≤ Confidence < 70%): Viable with improvements
  - **NO-GO** (Confidence < 50%): High-risk or unviable
- **Actionable Recommendations:** Specific suggestions for improvement

### 5. PDF Export
- **Professional Reports:** Board-ready investor documentation
- **Visual Charts:** Revenue, cost, and profit projections
- **Summary Insights:** Key metrics and business model breakdown
- **Branding:** FORMATDISC-branded templates

### 6. Performance
- **Sub-3-Second Analysis:** Complete evaluation in under 3 seconds
- **Local-First Processing:** No backend required, all calculations client-side
- **Instant Results:** Real-time updates as users input data

## Target Audience

### Primary Users
1. **Early-Stage Entrepreneurs:** Founders looking to validate startup concepts
2. **Innovation Teams:** Corporate teams evaluating new product ideas
3. **Startup Advisors:** Mentors and consultants helping founders
4. **Angel Investors:** Early-stage investors conducting initial screening

### Use Cases
- Pre-development idea validation
- Pitch deck preparation
- Investor meeting preparation
- Business model refinement
- Market opportunity assessment
- Team capability evaluation

## System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────┐
│           User Browser (Client)              │
├─────────────────────────────────────────────┤
│  Next.js 15 Application (App Router)         │
│  ┌─────────────┐  ┌──────────────┐          │
│  │   Landing   │  │  Simulation  │          │
│  │    Page     │  │     Tool     │          │
│  └─────────────┘  └──────────────┘          │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │     React Components (TypeScript)       │ │
│  │  ┌────────────┐  ┌─────────────────┐   │ │
│  │  │ Input Form │  │ Results Display │   │ │
│  │  └────────────┘  └─────────────────┘   │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │        Simulation Engine (lib/)         │ │
│  │  • Financial Calculations                │ │
│  │  • Risk Analysis                         │ │
│  │  • Verdict Generation                    │ │
│  │  • PDF Export (jsPDF)                    │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │         UI Components                    │ │
│  │  • Radix UI Primitives                   │ │
│  │  • shadcn/ui Components                  │ │
│  │  • Recharts (Visualization)              │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │  Vercel CDN/Hosting   │
         └───────────────────────┘
```

### Key Components
1. **Frontend Layer:** Next.js 15 with React 19
2. **Computation Layer:** Client-side TypeScript simulation engine
3. **UI Layer:** Radix UI + shadcn/ui component library
4. **Visualization Layer:** Recharts for financial charts
5. **Export Layer:** jsPDF for PDF generation
6. **Deployment Layer:** Vercel edge network

## Technology Stack

### Core Framework
- **Next.js 15:** React framework with App Router
- **React 19:** UI component library
- **TypeScript 5:** Type-safe development

### Styling & UI
- **Tailwind CSS v4:** Utility-first CSS framework
- **Radix UI:** Accessible component primitives
- **shadcn/ui:** Pre-built component library
- **Lucide React:** Icon library

### Data Visualization
- **Recharts:** Responsive chart library
- **jsPDF:** PDF generation for reports

### Development Tools
- **ESLint:** Code linting
- **PostCSS:** CSS processing
- **Vercel Analytics:** Usage tracking

### Deployment
- **Vercel:** Hosting and CDN
- **GitHub:** Version control
- **Node.js 18+:** Runtime environment

## Project Status

### Current Version
**v1.0.0** - Production Ready

### Release Status
- ✅ **Production Deployed:** https://www.formatdisc.hr
- ✅ **Fully Functional:** All features operational
- ✅ **Performance Optimized:** <3s analysis time
- ✅ **Mobile Responsive:** Works on all devices
- ✅ **SEO Optimized:** Metadata and sitemap configured

### Key Metrics
- **Build Size:** 235 kB (main page), 105 kB (landing)
- **Response Time:** <3 seconds for complete analysis
- **Availability:** 99.9% uptime (Vercel SLA)
- **Static Generation:** All pages pre-rendered

### Roadmap Highlights
- Multi-language support (Croatian, English)
- Advanced scenario modeling
- Historical data persistence
- Team collaboration features
- API integration for external tools

## Contact & Support

**FORMATDISC, vl. Mladen Gertner**
- **Website:** https://www.formatdisc.hr
- **Email:** info@formatdisc.hr
- **Phone:** +385 91 542 1014
- **Location:** Zagreb, Croatia

## License

MIT License - See LICENSE file for details

---

**Next Steps:**
- Read [GETTING_STARTED.md](./GETTING_STARTED.md) for installation instructions
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Check [API_REFERENCE.md](./API_REFERENCE.md) for component documentation
