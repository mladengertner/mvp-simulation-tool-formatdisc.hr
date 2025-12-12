# Getting Started - FORMATDISC MVP Simulation Tool

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [First-Time Setup](#first-time-setup)
- [Using the Simulation Tool](#using-the-simulation-tool)
- [Project Structure](#project-structure)
- [Common Commands](#common-commands)
- [Next Steps](#next-steps)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js:** Version 18.x or higher
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
  
- **npm:** Version 8.x or higher (comes with Node.js)
  - Verify installation: `npm --version`

### Optional but Recommended
- **Git:** For version control
- **VS Code:** Recommended IDE with TypeScript support
- **Vercel CLI:** For deployment (`npm i -g vercel`)

### System Requirements
- **OS:** Windows, macOS, or Linux
- **RAM:** Minimum 4GB (8GB recommended)
- **Disk Space:** 500MB for dependencies and build artifacts

## Installation

### Step 1: Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr.git

# Navigate to project directory
cd mvp-simulation-tool-formatdisc.hr
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag is required due to React 19 peer dependency compatibility.

**Expected Output:**
```
added 350+ packages in 30-60s
```

### Step 3: Verify Installation

```bash
# Check if installation was successful
npm list --depth=0
```

You should see all major dependencies listed, including:
- next@15.2.4
- react@19.x
- typescript@5.x
- tailwindcss@4.x

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.2.4
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

**Access the application:**
- Main Tool: http://localhost:3000
- Landing Page: http://localhost:3000/landing

### Production Mode

Build and run the production version:

```bash
# Build the application
npm run build

# Start production server
npm start
```

**Build Output:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    1.2 kB          235 kB
├ ○ /landing                             500 B           105 kB
└ ○ /sitemap.xml                         0 B             101 kB
```

**Access the production build:**
- http://localhost:3000

## First-Time Setup

### 1. Environment Configuration

**No environment variables required!** The application runs entirely client-side.

Optional: If you want to enable Vercel Analytics in development:
```bash
# Create .env.local (optional)
echo "NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_id" > .env.local
```

### 2. Code Editor Setup

**VS Code Configuration (Recommended):**

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

**Recommended VS Code Extensions:**
- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Prettier - Code formatter

### 3. Verify Everything Works

```bash
# Run dev server
npm run dev
```

Open http://localhost:3000 and verify:
- ✅ Page loads without errors
- ✅ Form is interactive
- ✅ Styling appears correct
- ✅ No console errors in browser DevTools

## Using the Simulation Tool

### Step 1: Navigate to the Main Tool

Go to http://localhost:3000 (or just `/` if already running)

### Step 2: Fill in Startup Details

Complete the simulation form with your startup information:

**Business Model Section:**
- **Startup Name:** Your company name
- **Industry:** Select from dropdown (SaaS, E-commerce, Marketplace, etc.)
- **Pricing Model:** Choose your revenue model

**Revenue Assumptions:**
- **Price per Customer:** Monthly/one-time fee
- **Initial Customers:** Starting customer base
- **Monthly Growth Rate:** Expected customer growth (%)
- **Churn Rate:** Expected customer loss per month (%)

**Cost Structure:**
- **Fixed Monthly Costs:** Operational expenses (OPEX)
- **CAC (Customer Acquisition Cost):** Cost to acquire one customer

**Team & Execution:**
- **Team Size:** Number of team members
- **Technical Capability:** Team's technical skills (1-10)
- **Execution Speed:** Development velocity (1-10)

### Step 3: Generate Analysis

Click the **"Run Simulation"** button.

The tool will instantly generate:
- 12-month financial projections
- Risk analysis with confidence score
- GO/MAYBE/NO-GO verdict
- Actionable recommendations
- Break-even point calculation

### Step 4: Review Results

**Results Include:**
1. **Overall Verdict:** GO, MAYBE, or NO-GO
2. **Confidence Score:** 0-100% business viability rating
3. **Financial Charts:**
   - Monthly revenue projections
   - Cost breakdown
   - Profit/loss curve
   - Customer growth
4. **Risk Breakdown:** Detailed factor analysis
5. **Recommendations:** Specific improvement suggestions

### Step 5: Export PDF Report

Click **"Download PDF Report"** to generate an investor-ready document containing:
- Executive summary
- Financial projections
- Risk analysis
- Business model overview
- Charts and visualizations

## Project Structure

```
mvp-simulation-tool-formatdisc.hr/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles (Tailwind)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main simulation page
│   ├── sitemap.ts               # SEO sitemap
│   └── landing/
│       └── page.tsx             # Marketing landing page
│
├── components/                   # React components
│   ├── simulation-form.tsx      # Input form component
│   └── simulation-results.tsx   # Results display component
│
├── lib/                         # Core logic
│   ├── simulation.ts            # Simulation engine
│   └── utils.ts                 # Utility functions
│
├── public/                      # Static assets
│   ├── favicon.svg              # App icon
│   └── robots.txt               # SEO configuration
│
├── docs/                        # Documentation (you are here!)
│   ├── OVERVIEW.md
│   ├── GETTING_STARTED.md
│   └── ...
│
├── .eslintrc.json              # ESLint configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment config
```

## Common Commands

### Development
```bash
# Start development server
npm run dev

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Dependency Management
```bash
# Install new package
npm install <package-name> --legacy-peer-deps

# Update dependencies
npm update --legacy-peer-deps

# Audit security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Git Workflow
```bash
# Check status
git status

# Create feature branch
git checkout -b feature/your-feature

# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin feature/your-feature
```

### Cleaning & Troubleshooting
```bash
# Clear Next.js cache
rm -rf .next

# Remove dependencies
rm -rf node_modules package-lock.json

# Fresh install
npm install --legacy-peer-deps

# Clear all build artifacts
npm run build && rm -rf .next
```

## Next Steps

### For Users
1. **Explore the Tool:** Try different business models and scenarios
2. **Review Documentation:** Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
3. **Customize:** Modify components to fit your needs

### For Developers
1. **Read Architecture:** Review [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Check API Reference:** See [API_REFERENCE.md](./API_REFERENCE.md)
3. **Review Development Guide:** Read [DEVELOPMENT.md](./DEVELOPMENT.md)
4. **Contribute:** Check [CONTRIBUTING.md](./CONTRIBUTING.md)

### For Deployment
1. **Read Deployment Guide:** Follow [DEPLOYMENT.md](../DEPLOYMENT.md)
2. **Setup Vercel:** Connect your repository
3. **Configure Domain:** Point www.formatdisc.hr to Vercel
4. **Go Live:** Deploy to production

## Troubleshooting

### Common Issues

**1. Installation Fails**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**2. Dev Server Won't Start**
```bash
# Kill existing processes on port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**3. Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**4. TypeScript Errors**
```bash
# Regenerate TypeScript types
rm -rf .next
npm run dev
```

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more detailed solutions.

## Getting Help

### Resources
- **Documentation:** Check the `/docs` folder
- **GitHub Issues:** https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr/issues
- **Email Support:** info@formatdisc.hr

### Community
- **Questions:** Open a GitHub Discussion
- **Bug Reports:** Create a GitHub Issue
- **Feature Requests:** Submit an Issue with enhancement label

## Success Checklist

Before moving forward, ensure:
- [ ] Node.js 18+ is installed
- [ ] Dependencies installed successfully
- [ ] Dev server starts without errors
- [ ] Application loads at http://localhost:3000
- [ ] Simulation form works correctly
- [ ] Results display properly
- [ ] PDF export functions
- [ ] No console errors in browser

**Congratulations! You're ready to start using the FORMATDISC MVP Simulation Tool.** 🎉

---

**Contact:** info@formatdisc.hr | **Website:** https://www.formatdisc.hr
