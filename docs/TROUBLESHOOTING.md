# Troubleshooting Guide - FORMATDISC MVP Simulation Tool

## Table of Contents
- [Installation Issues](#installation-issues)
- [Development Server Issues](#development-server-issues)
- [Build Issues](#build-issues)
- [Runtime Errors](#runtime-errors)
- [Performance Issues](#performance-issues)
- [Styling Issues](#styling-issues)
- [Deployment Issues](#deployment-issues)
- [Browser-Specific Issues](#browser-specific-issues)
- [Getting Help](#getting-help)

## Installation Issues

### Problem: `npm install` Fails

**Error Message:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**
```bash
# Use --legacy-peer-deps flag (required for React 19)
npm install --legacy-peer-deps
```

**Explanation:**
React 19 has peer dependency requirements that conflict with some packages. The `--legacy-peer-deps` flag bypasses strict peer dependency checking.

---

### Problem: `npm install` is Slow

**Symptoms:**
- Installation takes 5+ minutes
- Appears stuck on certain packages

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install --legacy-peer-deps
   ```

2. **Use different registry (if blocked):**
   ```bash
   npm install --legacy-peer-deps --registry=https://registry.npmjs.org/
   ```

3. **Check internet connection:**
   - Verify stable connection
   - Disable VPN if causing issues
   - Try different network

---

### Problem: Permission Errors on Installation

**Error Message:**
```
EACCES: permission denied
```

**Solution (Linux/macOS):**
```bash
# Don't use sudo! Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Then retry
npm install --legacy-peer-deps
```

**Solution (Windows):**
```bash
# Run terminal as Administrator
# Or install in user directory
npm install --legacy-peer-deps
```

## Development Server Issues

### Problem: Dev Server Won't Start

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

**macOS/Linux:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

**Windows:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

---

### Problem: Changes Not Reflected (HMR Not Working)

**Symptoms:**
- Edit files but browser doesn't update
- Need to manually refresh every time

**Solutions:**

1. **Restart dev server:**
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check if file is in watched directory:**
   - Ensure file is not in `node_modules`
   - Verify file is in `app/`, `components/`, or `lib/`

4. **Hard refresh browser:**
   - Chrome/Firefox: Ctrl+Shift+R (Cmd+Shift+R on Mac)
   - Safari: Cmd+Option+R

---

### Problem: "Module not found" Error

**Error Message:**
```
Module not found: Can't resolve '@/components/...'
```

**Solutions:**

1. **Check import path:**
   ```typescript
   // ✅ Correct
   import { Button } from '@/components/ui/button';
   
   // ❌ Wrong
   import { Button } from 'components/ui/button';
   import { Button } from '@components/ui/button';
   ```

2. **Verify file exists:**
   ```bash
   ls -la components/ui/button.tsx
   ```

3. **Check tsconfig.json paths:**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

4. **Restart TypeScript server (VS Code):**
   - Cmd/Ctrl + Shift + P
   - Type: "TypeScript: Restart TS Server"
   - Press Enter

## Build Issues

### Problem: Build Fails with TypeScript Errors

**Error Message:**
```
Type error: Property 'X' does not exist on type 'Y'
```

**Solutions:**

1. **Check type definitions:**
   ```typescript
   // Ensure all props are typed correctly
   interface MyComponentProps {
     prop1: string;
     prop2: number;
   }
   
   export function MyComponent({ prop1, prop2 }: MyComponentProps) {
     // ...
   }
   ```

2. **Add missing types:**
   ```bash
   npm install --save-dev @types/node @types/react @types/react-dom
   ```

3. **Ignore build errors (temporary):**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     typescript: {
       ignoreBuildErrors: true, // Not recommended for production
     },
   };
   ```

---

### Problem: Out of Memory During Build

**Error Message:**
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Solution:**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# On Windows (PowerShell)
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or permanently in package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

---

### Problem: Build Succeeds but App Crashes

**Symptoms:**
- `npm run build` completes
- `npm start` fails or app doesn't load

**Solutions:**

1. **Check for client-side only code in server components:**
   ```typescript
   // ❌ Wrong - using window in server component
   export default function Page() {
     const width = window.innerWidth; // Error!
     return <div>{width}</div>;
   }
   
   // ✅ Correct - use client component
   'use client';
   
   export default function Page() {
     const [width, setWidth] = useState(0);
     
     useEffect(() => {
       setWidth(window.innerWidth);
     }, []);
     
     return <div>{width}</div>;
   }
   ```

2. **Clear build cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

3. **Check environment variables:**
   - Ensure no missing required env vars
   - Verify `.env.production` if used

## Runtime Errors

### Problem: "Hydration Mismatch" Error

**Error Message:**
```
Hydration failed because the initial UI does not match what was rendered on the server.
```

**Common Causes & Solutions:**

1. **Using browser APIs in SSR:**
   ```typescript
   // ❌ Wrong
   function Component() {
     const time = new Date().toLocaleString(); // Different on server/client
     return <div>{time}</div>;
   }
   
   // ✅ Correct
   'use client';
   
   function Component() {
     const [time, setTime] = useState('');
     
     useEffect(() => {
       setTime(new Date().toLocaleString());
     }, []);
     
     return <div>{time || 'Loading...'}</div>;
   }
   ```

2. **Conditional rendering based on client state:**
   ```typescript
   // ❌ Wrong
   function Component() {
     const isMobile = window.innerWidth < 768;
     return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
   }
   
   // ✅ Correct
   'use client';
   
   function Component() {
     const [isMobile, setIsMobile] = useState(false);
     
     useEffect(() => {
       setIsMobile(window.innerWidth < 768);
     }, []);
     
     return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
   }
   ```

---

### Problem: Simulation Returns NaN or Undefined

**Symptoms:**
- Confidence score shows NaN
- Revenue shows undefined
- Charts don't render

**Solutions:**

1. **Check input values:**
   ```typescript
   console.log('Input:', input);
   // Ensure all numeric values are actually numbers, not strings
   ```

2. **Verify form data types:**
   ```typescript
   // ✅ Correct - convert to numbers
   const formData = {
     monthlyPrice: Number(form.monthlyPrice),
     initialUsers: Number(form.initialUsers),
     monthlyGrowthRate: Number(form.monthlyGrowthRate),
   };
   ```

3. **Handle division by zero:**
   ```typescript
   // Add checks
   const cacRecovery = monthlyPrice > 0 
     ? customerAcquisitionCost / monthlyPrice 
     : 0;
   ```

---

### Problem: Charts Not Rendering

**Symptoms:**
- Results show but charts area is blank
- Console shows chart-related errors

**Solutions:**

1. **Verify Recharts data format:**
   ```typescript
   // Data must be array of objects
   const chartData = projections.map(p => ({
     month: p.month,
     revenue: p.revenue,
     costs: p.costs,
   }));
   ```

2. **Check for null/undefined values:**
   ```typescript
   // Filter out invalid data
   const validData = chartData.filter(d => 
     d.revenue !== null && 
     d.revenue !== undefined &&
     !isNaN(d.revenue)
   );
   ```

3. **Ensure parent has height:**
   ```typescript
   // Charts need defined height
   <div className="h-[300px]">
     <ResponsiveContainer width="100%" height="100%">
       <LineChart data={chartData}>
         {/* ... */}
       </LineChart>
     </ResponsiveContainer>
   </div>
   ```

## Performance Issues

### Problem: Slow Simulation Calculation

**Symptoms:**
- Takes more than 5 seconds to show results
- Browser becomes unresponsive

**Solutions:**

1. **Profile the simulation:**
   ```typescript
   console.time('simulation');
   const results = runSimulation(input);
   console.timeEnd('simulation');
   // Should be < 100ms
   ```

2. **Optimize calculations:**
   ```typescript
   // ❌ Slow - recalculating every time
   for (let i = 0; i < 1000; i++) {
     const value = expensiveCalculation();
   }
   
   // ✅ Fast - calculate once
   const value = expensiveCalculation();
   for (let i = 0; i < 1000; i++) {
     useValue(value);
   }
   ```

3. **Use memoization:**
   ```typescript
   import { useMemo } from 'react';
   
   const results = useMemo(
     () => runSimulation(input),
     [input]
   );
   ```

---

### Problem: PDF Generation is Slow

**Symptoms:**
- PDF download takes 10+ seconds
- Browser freezes during PDF creation

**Solutions:**

1. **Reduce PDF complexity:**
   - Fewer images
   - Simpler charts
   - Less text formatting

2. **Show loading indicator:**
   ```typescript
   const [generating, setGenerating] = useState(false);
   
   const handleDownload = async () => {
     setGenerating(true);
     await generatePDF(results);
     setGenerating(false);
   };
   ```

## Styling Issues

### Problem: Tailwind Classes Not Applied

**Symptoms:**
- Classes in HTML but styles not showing
- Some classes work, others don't

**Solutions:**

1. **Check class name spelling:**
   ```typescript
   // ❌ Wrong
   <div className="bg-blu-500"> // typo: "blu" not "blue"
   
   // ✅ Correct
   <div className="bg-blue-500">
   ```

2. **Ensure classes are not dynamic:**
   ```typescript
   // ❌ Wrong - Tailwind can't detect this
   const color = "blue";
   <div className={`bg-${color}-500`}>
   
   // ✅ Correct - Use full class names
   <div className={color === "blue" ? "bg-blue-500" : "bg-red-500"}>
   ```

3. **Restart dev server:**
   ```bash
   # Ctrl+C
   npm run dev
   ```

4. **Check tailwind.config.ts:**
   ```typescript
   // Ensure content paths include your files
   export default {
     content: [
       "./app/**/*.{js,ts,jsx,tsx,mdx}",
       "./components/**/*.{js,ts,jsx,tsx,mdx}",
     ],
   };
   ```

---

### Problem: Styles Look Different in Production

**Symptoms:**
- Styles work in dev but not in production build
- Layout breaks in production

**Solutions:**

1. **Test production build locally:**
   ```bash
   npm run build
   npm start
   # Compare with dev
   ```

2. **Check for missing imports:**
   ```typescript
   // Ensure globals.css is imported
   // in app/layout.tsx
   import './globals.css';
   ```

3. **Verify build output:**
   ```bash
   # Check for CSS warnings in build log
   npm run build
   ```

## Deployment Issues

### Problem: Vercel Deployment Fails

**Error Message:**
```
Build failed with exit code 1
```

**Solutions:**

1. **Check build locally first:**
   ```bash
   npm run build
   # Fix any errors before deploying
   ```

2. **Review Vercel build logs:**
   - Go to Vercel dashboard
   - Click on failed deployment
   - Read build logs for specific error

3. **Verify Node version:**
   ```json
   // package.json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

4. **Check install command:**
   - In Vercel settings
   - Install Command: `npm install --legacy-peer-deps`

---

### Problem: App Works Locally but Not on Vercel

**Symptoms:**
- Local build succeeds
- Vercel deployment succeeds
- App doesn't work on live URL

**Solutions:**

1. **Check browser console:**
   - Open live URL
   - F12 → Console
   - Look for errors

2. **Verify environment variables:**
   - Check Vercel dashboard → Settings → Environment Variables
   - Ensure all required vars are set

3. **Test build commands match:**
   ```bash
   # Use exact Vercel commands locally
   npm install --legacy-peer-deps
   npm run build
   ```

4. **Check for absolute URLs:**
   ```typescript
   // ❌ Wrong - hardcoded localhost
   fetch('http://localhost:3000/api/data');
   
   // ✅ Correct - relative or env-based
   fetch('/api/data');
   ```

## Browser-Specific Issues

### Problem: Works in Chrome but Not Safari

**Common Safari Issues:**

1. **Date formatting:**
   ```typescript
   // ❌ May fail in Safari
   new Date('2024-01-01 12:00:00');
   
   // ✅ Safari-compatible
   new Date('2024-01-01T12:00:00Z');
   ```

2. **Flexbox quirks:**
   ```css
   /* Add explicit flex-shrink for Safari */
   .flex-item {
     flex-shrink: 0;
   }
   ```

3. **PDF download:**
   ```typescript
   // Safari may block automatic downloads
   // Ensure user interaction triggers download
   const handleDownload = () => {
     // User clicked button → Safari allows
     downloadPDF();
   };
   ```

### Problem: Mobile Browser Issues

**Common Mobile Problems:**

1. **Viewport too small:**
   ```html
   <!-- Ensure this meta tag in layout.tsx -->
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

2. **Touch events:**
   ```typescript
   // Use onClick, not onHover for mobile
   <button onClick={handleClick}>
     Click Me
   </button>
   ```

3. **Virtual keyboard:**
   ```typescript
   // Prevent zoom on input focus (if desired)
   <input
     type="text"
     className="text-base" // 16px minimum to prevent zoom
   />
   ```

## Common Error Messages

### "Cannot read property 'X' of undefined"

**Cause:** Accessing property of undefined object

**Solution:**
```typescript
// ❌ Wrong
const name = user.name; // Error if user is undefined

// ✅ Correct
const name = user?.name; // Optional chaining
const name = user ? user.name : 'Unknown'; // Conditional
```

### "Maximum update depth exceeded"

**Cause:** Infinite loop in state updates

**Solution:**
```typescript
// ❌ Wrong - infinite loop
useEffect(() => {
  setCount(count + 1); // Triggers re-render → effect runs again
});

// ✅ Correct - add dependency array
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // Runs once on mount
```

### "Objects are not valid as a React child"

**Cause:** Trying to render an object directly

**Solution:**
```typescript
// ❌ Wrong
return <div>{user}</div>; // Can't render object

// ✅ Correct
return <div>{user.name}</div>; // Render primitive value
return <div>{JSON.stringify(user)}</div>; // Or stringify
```

## Getting Help

### Before Asking for Help

**Checklist:**
1. Read error message carefully
2. Check this troubleshooting guide
3. Search GitHub issues
4. Check browser console for errors
5. Try reproduction in clean environment

### Information to Include

When reporting an issue, include:

```markdown
**Environment:**
- OS: (e.g., macOS 13.4, Windows 11, Ubuntu 22.04)
- Node version: (run `node --version`)
- npm version: (run `npm --version`)
- Browser: (e.g., Chrome 120, Safari 17)

**Steps to Reproduce:**
1. Step one
2. Step two
3. ...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Error Message:**
```
Paste full error message here
```

**Code:**
```typescript
// Relevant code snippet
```

**Screenshots:**
(If applicable)
```

### Where to Get Help

1. **GitHub Issues:**
   - https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr/issues
   - Search existing issues first
   - Create new issue with template

2. **Email Support:**
   - info@formatdisc.hr
   - Include "MVP Tool Support" in subject

3. **Documentation:**
   - Check `/docs` folder
   - Review README.md
   - Read DEVELOPMENT.md

### Emergency Fixes

**Nuclear Option (When Nothing Else Works):**

```bash
# ⚠️ Last resort - clears everything

# 1. Clear all caches
rm -rf node_modules
rm -rf .next
rm -rf package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Fresh install
npm install --legacy-peer-deps

# 4. Rebuild
npm run build

# 5. Test
npm run dev
```

**Git Reset (If You Broke Something):**

```bash
# View uncommitted changes
git status

# Discard all local changes (⚠️ cannot undo!)
git reset --hard HEAD

# Or restore specific file
git checkout -- path/to/file.tsx
```

---

**Related Documentation:**
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Setup instructions
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [TESTING.md](./TESTING.md) - Testing procedures
- [DEPLOYMENT.md](../DEPLOYMENT.md) - Deployment guide
