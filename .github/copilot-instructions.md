# Copilot Coding Agent Instructions

## Project Overview

This is the **FORMATDISC MVP Simulation Tool**, an AI-powered MVP simulator for entrepreneurs to validate startup ideas. The application provides real-time financial modeling, risk scoring, and growth forecasting.

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **UI Library:** Radix UI + shadcn/ui components
- **Charts:** Recharts
- **PDF Generation:** jsPDF
- **Deployment:** Vercel
- **Package Manager:** npm (primary), pnpm supported

## Build, Test, and Lint

### Installation
```bash
npm install
```

### Development
```bash
npm run dev  # Starts development server on http://localhost:3000
```

### Build
```bash
npm run build  # Creates production build
```

### Production
```bash
npm start  # Starts production server
```

### Linting
```bash
npm run lint  # Runs ESLint
```

**Note:** There is currently no test suite in this project. Do not add testing infrastructure unless explicitly requested.

## Development Standards

### React & TypeScript
- Use **React 19** with functional components and hooks exclusively
- Use TypeScript with strict type checking enabled
- Leverage Next.js 15 App Router conventions (no Pages Router)
- Use `async/await` for server components when needed
- Keep components pure and side-effect free where possible

### Code Organization
- **App structure:** Routes in `/app` directory following App Router conventions
- **Components:** Reusable UI components in `/components` directory
- **Libraries:** Utility functions and helpers in `/lib` directory
- **Public assets:** Static files in `/public` directory
- Use absolute imports with `@/` path alias (e.g., `@/components/ui/button`)

### Styling
- Use Tailwind CSS v4 for all styling
- Follow existing utility-first approach
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Maintain responsive design patterns (mobile-first)
- Use CSS variables for theming when appropriate

### UI Components
- Use shadcn/ui and Radix UI components as base building blocks
- Keep component files focused and single-purpose
- Place larger feature components in `/components` (e.g., `simulation-form.tsx`, `simulation-results.tsx`)
- Use the existing component patterns as reference

### Code Style
- **ESLint:** Configuration in `.eslintrc.json` - follow existing rules
- **Disabled rules:** `@typescript-eslint/no-explicit-any` and `react/no-unescaped-entities` are off
- Use double quotes for strings
- Use semicolons consistently
- Prefer `const` over `let`, avoid `var`
- Use modern ES6+ features (arrow functions, destructuring, spread operator)

## Architecture Guidelines

### App Router Structure
- **Main app:** `/app/page.tsx` - Main simulator application
- **Landing page:** `/app/landing/page.tsx` - Marketing landing page
- **Layout:** `/app/layout.tsx` - Root layout with metadata and fonts
- **Global styles:** `/app/globals.css` - Tailwind directives and global CSS

### Key Features
- Local-first evaluation (no backend required for simulation)
- Real-time financial modeling and calculations
- Interactive forms with validation (react-hook-form + zod)
- Data visualization with Recharts
- PDF export functionality with jsPDF
- Responsive design for all screen sizes

### State Management
- Use React hooks (`useState`, `useEffect`, etc.) for component state
- No global state management library (Redux, Zustand, etc.) is currently used
- Keep state close to where it's used

## Dependencies

### Core Dependencies
- **React 19 & Next.js 15:** Latest framework features
- **Radix UI:** Accessible, unstyled component primitives
- **React Hook Form + Zod:** Form handling and validation
- **Recharts:** Chart and data visualization
- **jsPDF:** PDF generation
- **Lucide React:** Icon library
- **Vercel Analytics:** Performance monitoring

### Don't Add Unless Necessary
- Avoid adding new dependencies unless absolutely required
- Prefer using existing libraries and utilities
- Check if functionality can be achieved with current dependencies

## Workflow

### Code Changes
- Make minimal, focused changes that address the specific task
- Preserve existing functionality unless explicitly changing it
- Follow established patterns in the codebase
- Run `npm run lint` before committing
- Test changes manually in development mode

### Commit Messages
- Use clear, descriptive commit messages
- Follow conventional commit format when possible
- Reference issue numbers if applicable

### Pull Requests
- PRs should be focused and address a single concern
- Include description of changes and reasoning
- Ensure production build succeeds (`npm run build`)

## Deployment

### Production Environment
- **Platform:** Vercel
- **Domain:** https://www.formatdisc.hr
- **Environment Variables:** No environment variables required for basic functionality
- Deployment is automatic on push to main branch (via Vercel integration)

### Build Verification
Always ensure production build succeeds before finalizing changes:
```bash
npm run build
```

## Additional Notes

### File Structure
- **components.json:** shadcn/ui configuration
- **next.config.mjs:** Next.js configuration
- **tailwind.config.ts:** Tailwind CSS configuration
- **tsconfig.json:** TypeScript configuration with path aliases

### Key Files to Reference
- **simulation-form.tsx:** Main form component with validation
- **simulation-results.tsx:** Results display and PDF generation
- **package.json:** Dependencies and scripts
- **README.md:** Project documentation

### Performance
- The app is designed to generate results in under 3 seconds
- Keep calculations and rendering optimized
- Use React best practices for performance (memoization when needed)

### Accessibility
- Radix UI components provide accessible primitives
- Maintain ARIA attributes and semantic HTML
- Ensure keyboard navigation works properly

## Common Tasks

### Adding a New Component
1. Create component in `/components` directory
2. Use TypeScript for props interface
3. Style with Tailwind CSS utilities
4. Import using `@/components/component-name` path

### Adding a New Page
1. Create route in `/app` directory following App Router conventions
2. Use `page.tsx` for route component
3. Add metadata export for SEO
4. Update sitemap if necessary

### Modifying Styles
1. Use Tailwind utilities preferentially
2. Check `tailwind.config.ts` for theme customization
3. Global styles in `app/globals.css` only when necessary
4. Use CSS variables for theme consistency

### Working with Forms
1. Use react-hook-form for form state
2. Use zod for validation schemas
3. Follow patterns in `simulation-form.tsx`
4. Provide clear error messages

## Documentation

- **README.md:** Overview, features, quick start, tech stack
- **DEPLOYMENT.md:** Deployment instructions and configuration
- **PROJECT_COMPLETE.md:** Project completion documentation
- **LICENSE:** MIT License
