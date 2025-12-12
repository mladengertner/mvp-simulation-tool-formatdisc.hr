# Development Guide - FORMATDISC MVP Simulation Tool

## Table of Contents
- [Development Environment Setup](#development-environment-setup)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Development](#component-development)
- [State Management](#state-management)
- [Styling Guidelines](#styling-guidelines)
- [Testing During Development](#testing-during-development)
- [Debugging](#debugging)
- [Performance Optimization](#performance-optimization)
- [Common Development Tasks](#common-development-tasks)

## Development Environment Setup

### Prerequisites
- Node.js 18.x or higher
- npm 8.x or higher
- Git
- VS Code (recommended)

### Initial Setup

```bash
# Clone repository
git clone https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr.git
cd mvp-simulation-tool-formatdisc.hr

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## Development Workflow

### Branch Strategy

```bash
# Feature development
git checkout -b feature/your-feature-name

# Bug fixes
git checkout -b fix/bug-description

# Documentation updates
git checkout -b docs/update-description
```

### Typical Development Cycle

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-risk-factor
   ```

2. **Make Changes**
   - Edit files as needed
   - Follow coding standards
   - Test changes locally

3. **Verify Locally**
   ```bash
   npm run dev
   # Test in browser at http://localhost:3000
   ```

4. **Build Test**
   ```bash
   npm run build
   npm start
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add new risk factor for market size"
   ```

6. **Push to GitHub**
   ```bash
   git push origin feature/new-risk-factor
   ```

7. **Create Pull Request**
   - Open PR on GitHub
   - Request review
   - Address feedback

### Hot Module Replacement (HMR)

Next.js automatically reloads changes:
- Component changes: Instant reload
- Page changes: Instant reload
- Config changes: Requires server restart

```bash
# If HMR stops working
# Ctrl+C to stop server
npm run dev
```

## Coding Standards

### TypeScript Guidelines

#### 1. Always Use Type Annotations

```typescript
// ✅ Good
function calculateRevenue(users: number, price: number): number {
  return users * price;
}

// ❌ Bad
function calculateRevenue(users, price) {
  return users * price;
}
```

#### 2. Define Interfaces for Objects

```typescript
// ✅ Good
interface UserData {
  id: string;
  name: string;
  email: string;
}

function getUser(): UserData {
  // ...
}

// ❌ Bad
function getUser() {
  return { id: "1", name: "John", email: "john@example.com" };
}
```

#### 3. Use Enums or Union Types for Limited Values

```typescript
// ✅ Good
type CompetitionLevel = "low" | "medium" | "high";

// ❌ Bad
// Using string without type constraints
let competition: string = "low";
```

#### 4. Avoid `any` Type

```typescript
// ✅ Good
function processData(data: SimulationInput): SimulationResults {
  // ...
}

// ❌ Bad
function processData(data: any): any {
  // ...
}
```

### React Component Guidelines

#### 1. Functional Components with TypeScript

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// ❌ Bad - No types
export function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

#### 2. Use Client Components Explicitly

```typescript
// ✅ Good
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  // ...
}

// ❌ Bad - No 'use client' directive for client component
import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  // ...
}
```

#### 3. Component File Structure

```typescript
// ComponentName.tsx structure

'use client'; // If needed

// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Type definitions
interface ComponentProps {
  // ...
}

// 3. Component
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 3.1 Hooks
  const [state, setState] = useState();
  
  // 3.2 Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 3.3 Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 4. Helper functions (if any)
function helperFunction() {
  // ...
}
```

### Naming Conventions

#### Files
```
components/simulation-form.tsx     ✅ kebab-case
lib/simulation.ts                  ✅ kebab-case
app/landing/page.tsx               ✅ kebab-case
```

#### Components
```typescript
export function SimulationForm()    ✅ PascalCase
export function Button()            ✅ PascalCase
```

#### Functions
```typescript
function runSimulation()            ✅ camelCase
function calculateRevenue()         ✅ camelCase
```

#### Constants
```typescript
const MAX_USERS = 1000000;          ✅ UPPER_SNAKE_CASE
const API_ENDPOINT = "/api/data";   ✅ UPPER_SNAKE_CASE
```

#### Variables
```typescript
const userName = "John";             ✅ camelCase
let isActive = true;                 ✅ camelCase
```

## Component Development

### Creating a New Component

#### 1. Create Component File

```bash
# For UI components
touch components/ui/my-component.tsx

# For feature components
touch components/my-feature.tsx
```

#### 2. Component Template

```typescript
'use client'; // If interactive

import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
  className?: string;
}

export function MyComponent({ 
  title, 
  onAction, 
  className 
}: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      <h2>{title}</h2>
      {onAction && (
        <button onClick={onAction}>Action</button>
      )}
    </div>
  );
}
```

#### 3. Using shadcn/ui Components

```bash
# Add a new shadcn component
npx shadcn-ui@latest add button

# This creates components/ui/button.tsx
```

```typescript
// Use in your component
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Click Me
</Button>
```

### Component Best Practices

#### 1. Single Responsibility
Each component should do one thing well.

```typescript
// ✅ Good - Focused components
function UserAvatar({ url }: { url: string }) {
  return <img src={url} alt="User" />;
}

function UserName({ name }: { name: string }) {
  return <span>{name}</span>;
}

// ❌ Bad - Component doing too much
function UserProfile({ user, onEdit, onDelete, showStats }) {
  // Too many responsibilities
}
```

#### 2. Composition Over Inheritance

```typescript
// ✅ Good - Composition
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <UserAvatar url={user.avatar} />
      <UserName name={user.name} />
    </Card>
  );
}
```

#### 3. Extract Reusable Logic to Hooks

```typescript
// Custom hook
function useSimulation() {
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [loading, setLoading] = useState(false);
  
  const run = (input: SimulationInput) => {
    setLoading(true);
    const output = runSimulation(input);
    setResults(output);
    setLoading(false);
  };
  
  return { results, loading, run };
}

// Usage in component
function SimulationPage() {
  const { results, loading, run } = useSimulation();
  
  return (
    <>
      <SimulationForm onSubmit={run} />
      {loading && <Spinner />}
      {results && <SimulationResults results={results} />}
    </>
  );
}
```

## State Management

### Local State (useState)

For component-specific state:

```typescript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Form State (React Hook Form)

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      price: 0,
    },
  });
  
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### Shared State (Props & Lifting State Up)

```typescript
// Parent component manages state
function SimulationPage() {
  const [results, setResults] = useState<SimulationResults | null>(null);
  
  return (
    <>
      <SimulationForm onSubmit={(input) => {
        const output = runSimulation(input);
        setResults(output);
      }} />
      {results && <SimulationResults results={results} />}
    </>
  );
}
```

## Styling Guidelines

### Tailwind CSS Best Practices

#### 1. Use Utility Classes

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>

// ❌ Bad - Avoid custom CSS when Tailwind utilities exist
<div className="custom-card">
  <h1 className="custom-title">Title</h1>
</div>
```

#### 2. Use `cn()` for Conditional Classes

```typescript
import { cn } from '@/lib/utils';

function Button({ variant, className }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "secondary" && "bg-gray-200 text-gray-900",
        className
      )}
    >
      Click
    </button>
  );
}
```

#### 3. Responsive Design

```typescript
<div className="
  w-full              // Mobile: full width
  md:w-1/2            // Tablet: half width
  lg:w-1/3            // Desktop: one-third width
  p-4                 // Mobile: padding 1rem
  md:p-6              // Tablet: padding 1.5rem
  lg:p-8              // Desktop: padding 2rem
">
  Content
</div>
```

#### 4. Extract Common Patterns

```typescript
// For repeated patterns, create a reusable component
function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md p-6",
      className
    )}>
      {children}
    </div>
  );
}
```

## Testing During Development

### Manual Testing Checklist

When developing a feature:

- [ ] Component renders without errors
- [ ] All interactive elements work
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Build succeeds (`npm run build`)

### Browser Testing

```bash
# Start dev server
npm run dev

# Test in browser
open http://localhost:3000

# Check browser console for errors
# Open DevTools (F12) -> Console tab
```

### Build Testing

```bash
# Production build
npm run build

# Check for build errors
# Review build output for warnings

# Test production build
npm start
open http://localhost:3000
```

## Debugging

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools (F12)
3. Navigate to "Components" tab
4. Inspect component props and state

### Console Logging

```typescript
function MyComponent({ data }: Props) {
  console.log('Component rendered with:', data);
  
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounting');
  }, []);
  
  return <div>Content</div>;
}
```

### TypeScript Errors

```bash
# Check TypeScript errors
npx tsc --noEmit

# Watch mode for continuous checking
npx tsc --noEmit --watch
```

### Next.js Error Messages

Next.js provides detailed error messages in development:
- File causing the error
- Line number
- Stack trace

### Common Issues

#### 1. "Hydration Mismatch"
```typescript
// ❌ Bad - Using browser-only APIs in SSG
function Component() {
  const width = window.innerWidth; // Error!
  return <div>{width}</div>;
}

// ✅ Good - Check if running in browser
function Component() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  
  return <div>{width || 'Loading...'}</div>;
}
```

#### 2. "Module Not Found"
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Performance Optimization

### 1. Memoization

```typescript
import { useMemo } from 'react';

function ExpensiveComponent({ input }: Props) {
  const result = useMemo(() => {
    return runSimulation(input); // Only recalculate when input changes
  }, [input]);
  
  return <div>{result.verdict}</div>;
}
```

### 2. Code Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Disable SSR for this component
});
```

### 3. Image Optimization

```typescript
import Image from 'next/image';

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={200}
      height={50}
      priority // For above-the-fold images
    />
  );
}
```

## Common Development Tasks

### Adding a New Page

```bash
# Create page file
mkdir -p app/new-page
touch app/new-page/page.tsx
```

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}
```

Access at: `http://localhost:3000/new-page`

### Adding a New Component

```bash
touch components/my-component.tsx
```

```typescript
// components/my-component.tsx
interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return <h1>{title}</h1>;
}
```

### Updating Simulation Logic

```typescript
// lib/simulation.ts
export function runSimulation(input: SimulationInput): SimulationResults {
  // Add new calculation
  const newMetric = calculateNewMetric(input);
  
  return {
    // ... existing fields
    newMetric, // Add to results
  };
}
```

### Adding a New Risk Factor

```typescript
// In runSimulation() function
const newRiskFactor = {
  factor: "New Risk Factor",
  score: calculateScore(),
  impact: determineImpact(),
};

riskFactors.push(newRiskFactor);
```

### Updating Styles

```typescript
// Use Tailwind classes
<div className="bg-blue-500 hover:bg-blue-600 transition-colors">
  Content
</div>

// For custom CSS (rare)
// app/globals.css
.custom-animation {
  animation: fadeIn 0.3s ease-in;
}
```

## Troubleshooting Development Issues

### Port Already in Use

```bash
# Find and kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependency Issues

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Build Fails

```bash
# Clear cache
rm -rf .next
npm run build
```

### TypeScript Errors Won't Clear

```bash
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"

# Or clear cache
rm -rf .next
npm run dev
```

## Git Best Practices

### Commit Messages

```bash
# Good commit messages
git commit -m "Add risk factor for team experience"
git commit -m "Fix calculation bug in break-even logic"
git commit -m "Update documentation for API reference"

# Bad commit messages
git commit -m "fixes"
git commit -m "wip"
git commit -m "updates"
```

### Before Committing

```bash
# Check what will be committed
git status
git diff

# Build test
npm run build

# Commit
git add .
git commit -m "Descriptive message"
```

---

**Next Steps:**
- Review [TESTING.md](./TESTING.md) for testing strategies
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
