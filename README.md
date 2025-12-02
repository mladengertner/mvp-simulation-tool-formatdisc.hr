# **FORMATDISC MVP Simulation Tool**  
AI-powered MVP simulator for entrepreneurs. Validate your startup idea before you build.

[![Production](https://img.shields.io/badge/status-production-brightgreen)](https://www.formatdisc.hr)  
[![Deployment](https://img.shields.io/badge/deployed_on-Vercel-black?logo=vercel)](https://vercel.com)  
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)  
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)  
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  
![Status](https://img.shields.io/badge/Release-v1.0.0-purple)

**Live:** https://www.formatdisc.hr

---

## **Overview**

The FORMATDISC MVP Simulation Tool enables founders to evaluate the viability of their startup concepts using real-time AI-driven financial modeling, risk scoring, and growth forecasting. Designed for **early-stage entrepreneurs**, **innovation teams**, and **investors**, it produces investor-ready insights in seconds.

---

## **Enterprise Features**

### **Financial Projections**
- Automated 12-month revenue forecasting  
- Cost breakdown with OPEX / CAC models  
- Profit & cashflow curves  
- MRR and cumulative earnings

### **Risk Analysis**
- Confidence scoring system (0–100)  
- Factor-level risk breakdown (market, team, execution, CAC sensitivity)  
- Monte-Carlo-style variation simulation

### **Growth Modeling**
- Customer acquisition trajectory  
- Revenue per user (ARPU) projections  
- CAC recovery & runway implications  
- Break-even point calculation

### **GO / NO-GO Verdict**
- Deterministic scoring algorithm  
- “GO”, “MAYBE”, or “NO-GO” with rationale  
- Actionable suggestions for improvement

### **PDF Export**
- Board-ready investor reports  
- Projection charts  
- Summary insights  
- Business model breakdown

### **Instant Results**
- Full analysis generated in **under 3 seconds**  
- Local-first evaluation (no backend required)

---

## **Quick Start**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open your browser at:  
**http://localhost:3000**

---

## **Pages**

| Route | Description |
|-------|-------------|
| **/landing** | Marketing landing page |
| **/** | Main simulator application |

---

## **Deployment**

### **Vercel (Recommended)**

1. Push repository to GitHub  
2. Connect repo to Vercel  
3. Set custom domain: **www.formatdisc.hr**  
4. Deploy to production  

#### **Environment Variables**
No environment variables required for basic functionality.

---

## **Technology Stack**

- **Framework:** Next.js 15 (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS v4  
- **UI Libraries:** Radix UI + shadcn/ui  
- **Charts:** Recharts  
- **PDF Engine:** jsPDF  
- **Analytics:** Vercel Analytics  
- **Deployment:** Vercel

---

## **Author**

**FORMATDISC, vl. Mladen Gertner**  
Zagreb, Croatia  

- Website: https://www.formatdisc.hr  
- Email: info@formatdisc.hr  
- Phone: +385 91 542 1014

---

## **License**

MIT  
See the LICENSE file for details.
