# Changelog

All notable changes to the FORMATDISC MVP Simulation Tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-12

### Added - Initial Release 🎉

#### Core Features
- **MVP Simulation Engine**: Complete 12-month financial projection system
  - Monthly revenue calculations based on pricing and user growth
  - Cost analysis including CAC and OPEX
  - Profit/loss tracking with cumulative totals
  - Break-even point detection
  
- **Risk Analysis System**
  - Multi-factor risk scoring algorithm
  - CAC recovery time analysis
  - Competition level assessment
  - Market maturity evaluation
  - Team size risk scoring
  - Overall confidence score (0-100)

- **Verdict Generation**
  - GO/MAYBE/NO-GO decision system
  - Confidence-based recommendations
  - Actionable improvement suggestions
  - Clear reasoning for each verdict

- **Interactive Simulation Form**
  - Business model inputs (name, market, pricing)
  - Revenue assumptions (price, users, growth, churn)
  - Cost structure (CAC, OPEX)
  - Team and market factors
  - Real-time validation
  - User-friendly interface

- **Results Visualization**
  - Financial projection charts (Recharts)
  - Revenue, cost, and profit line graphs
  - User growth visualization
  - Risk factor breakdown display
  - Key metrics summary cards

- **PDF Export**
  - Professional investor-ready reports
  - Complete financial projections
  - Risk analysis summary
  - Verdict and recommendations
  - FORMATDISC branding

#### Pages
- **Main Simulation Tool** (`/`): Interactive business validation application
- **Landing Page** (`/landing`): Marketing and feature overview page
- **Sitemap** (`/sitemap.xml`): SEO optimization

#### Technical Implementation
- **Framework**: Next.js 15 with App Router (SSG)
- **Language**: TypeScript 5 with strict type checking
- **Styling**: Tailwind CSS v4 with custom configuration
- **UI Components**: Radix UI primitives + shadcn/ui components
- **Charts**: Recharts for responsive data visualization
- **PDF Generation**: jsPDF for client-side report creation
- **Analytics**: Vercel Analytics integration

#### Developer Experience
- TypeScript for type safety
- ESLint configuration
- Component-based architecture
- Utility-first CSS approach
- Hot module replacement (HMR)
- Fast builds and deployments

#### Documentation
- Comprehensive README.md
- Detailed DEPLOYMENT.md guide
- Project completion summary

#### Security
- Client-side processing (no backend)
- No data persistence or transmission
- Security headers configured
- HTTPS enforcement via Vercel
- XSS protection via React
- No sensitive data storage

#### Performance
- Static site generation for fast loads
- Code splitting and optimization
- Sub-3-second simulation time
- Lightweight bundle sizes
  - Main page: 235 kB
  - Landing page: 105 kB
- Vercel Edge CDN distribution

#### Deployment
- Vercel platform integration
- Automatic deployments from GitHub
- Custom domain support (www.formatdisc.hr)
- Zero-configuration deployment
- Production-ready build process

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- Implemented security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Enabled HTTPS-only access
- Configured CSP-ready infrastructure

---

## [Unreleased]

### Planned Features
See [ROADMAP.md](./ROADMAP.md) for upcoming features and enhancements.

---

## Version History

### [1.0.0] - 2024-12-12
- Initial production release
- Complete MVP simulation functionality
- Full documentation
- Deployed to www.formatdisc.hr

---

## Changelog Guidelines

### Categories

**Added** - New features  
**Changed** - Changes to existing functionality  
**Deprecated** - Soon-to-be removed features  
**Removed** - Removed features  
**Fixed** - Bug fixes  
**Security** - Vulnerability fixes and security improvements

### Version Numbering (Semantic Versioning)

Given a version number MAJOR.MINOR.PATCH (e.g., 1.0.0):

- **MAJOR**: Breaking changes, incompatible API changes
- **MINOR**: New features, backwards-compatible
- **PATCH**: Bug fixes, backwards-compatible

### Examples of Future Entries

```markdown
## [1.1.0] - YYYY-MM-DD

### Added
- Multi-language support (Croatian and English)
- Historical simulation storage
- Export to CSV functionality
- Advanced scenario comparison

### Changed
- Improved chart performance
- Updated UI design system
- Enhanced mobile responsiveness

### Fixed
- CAC calculation edge case with zero growth
- PDF generation memory leak
- Mobile keyboard layout issue

### Security
- Updated dependencies to fix CVE-XXXX-XXXXX
- Enhanced input sanitization
```

---

**For version planning, see:** [ROADMAP.md](./ROADMAP.md)  
**For contributing changes, see:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Project Links:**
- **Live App:** https://www.formatdisc.hr
- **Repository:** https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr
- **Issues:** https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr/issues

**Contact:**
- Email: info@formatdisc.hr
- Phone: +385 91 542 1014
- Location: Zagreb, Croatia
