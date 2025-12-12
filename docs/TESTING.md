# Testing Guide - FORMATDISC MVP Simulation Tool

## Table of Contents
- [Testing Philosophy](#testing-philosophy)
- [Testing Environment](#testing-environment)
- [Manual Testing](#manual-testing)
- [Component Testing](#component-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)
- [Browser Compatibility Testing](#browser-compatibility-testing)
- [Testing Checklist](#testing-checklist)

## Testing Philosophy

The FORMATDISC MVP Simulation Tool currently relies on **manual testing** and **browser-based validation** rather than automated test suites. This approach prioritizes rapid development and deployment while maintaining quality through systematic manual verification.

### Testing Principles

1. **Test in Real Environment**: Test in actual browsers, not just automated tools
2. **User-Focused Testing**: Validate from the end-user perspective
3. **Critical Path Priority**: Focus on core simulation functionality
4. **Responsive Validation**: Test on multiple device sizes
5. **Performance Awareness**: Monitor load times and responsiveness

## Testing Environment

### Local Development Testing

```bash
# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

### Production Build Testing

```bash
# Build for production
npm run build

# Start production server
npm start

# Test production build
http://localhost:3000
```

### Build Validation

```bash
# Check build output
npm run build

# Expected output:
# ✓ All pages generated successfully
# ✓ No errors or warnings
# ✓ Bundle sizes within limits
```

## Manual Testing

### Core Functionality Test Suite

#### 1. Simulation Form Testing

**Test: Form Input Validation**
```
Steps:
1. Navigate to http://localhost:3000
2. Try submitting empty form
3. Verify validation errors appear
4. Fill in invalid values (negative numbers, etc.)
5. Verify validation messages

Expected:
✓ Empty fields show required errors
✓ Invalid numbers are rejected
✓ Form cannot be submitted with errors
```

**Test: Form Submission**
```
Steps:
1. Fill in all fields with valid data:
   - Idea Name: "Test Startup"
   - Target Market: "SMB Software"
   - Monthly Price: 50
   - Initial Users: 100
   - Growth Rate: 15
   - CAC: 100
   - Operating Cost: 5000
   - Team Size: 3
   - Competition: Medium
   - Market Maturity: Growing
2. Click "Run Simulation"
3. Wait for results to appear

Expected:
✓ Form submits without errors
✓ Results appear within 3 seconds
✓ No console errors
```

#### 2. Results Display Testing

**Test: Verdict Display**
```
Steps:
1. Run simulation with good metrics (high growth, low CAC)
2. Verify "GO" verdict appears
3. Run simulation with poor metrics (low growth, high CAC)
4. Verify "NO-GO" verdict appears
5. Run simulation with moderate metrics
6. Verify "MAYBE" verdict appears

Expected:
✓ Correct verdict badge color (green/yellow/red)
✓ Confidence score displayed (0-100)
✓ Verdict reason text appears
```

**Test: Financial Charts**
```
Steps:
1. Run simulation
2. Scroll to charts section
3. Verify all charts render:
   - Revenue projection line chart
   - Cost breakdown chart
   - Profit/loss chart
   - User growth curve

Expected:
✓ All 4 charts render without errors
✓ Charts show correct data
✓ Axes are labeled
✓ Tooltips work on hover
✓ Charts are responsive
```

**Test: Risk Analysis**
```
Steps:
1. Run simulation
2. Review risk factors section
3. Verify all risk factors appear:
   - CAC Recovery Time
   - Competition Level
   - Market Maturity
   - Team Size

Expected:
✓ All 4 risk factors displayed
✓ Each has a score (0-100)
✓ Impact level shown (Low/Medium/High)
✓ Color coding correct
```

**Test: Recommendations**
```
Steps:
1. Run simulation with high CAC
2. Verify "Reduce CAC" suggestion appears
3. Run simulation with low growth
4. Verify "Increase growth rate" suggestion
5. Run simulation with small team
6. Verify "Expand team" suggestion

Expected:
✓ Relevant suggestions appear
✓ Suggestions are actionable
✓ No duplicate suggestions
```

#### 3. PDF Export Testing

**Test: PDF Generation**
```
Steps:
1. Run simulation
2. Scroll to results
3. Click "Download PDF Report"
4. Wait for PDF download

Expected:
✓ PDF downloads successfully
✓ PDF opens without errors
✓ All data is present in PDF
✓ Charts are visible in PDF
✓ Formatting is correct
```

**Test: PDF Content Accuracy**
```
Steps:
1. Run simulation
2. Note key metrics (verdict, confidence, revenue)
3. Download PDF
4. Open PDF and verify metrics match

Expected:
✓ Verdict matches
✓ Confidence score matches
✓ Financial numbers match
✓ Company branding present
```

### Navigation Testing

**Test: Page Navigation**
```
Steps:
1. Navigate to http://localhost:3000
2. Verify main simulation page loads
3. Navigate to http://localhost:3000/landing
4. Verify landing page loads
5. Click "Get Started" or similar link
6. Verify navigation to main tool

Expected:
✓ All pages load without errors
✓ Navigation links work
✓ No broken links
✓ Back button works
```

### Responsive Design Testing

**Test: Mobile (375px - 768px)**
```
Steps:
1. Open DevTools (F12)
2. Enable device emulation
3. Select "iPhone 12" or similar
4. Navigate through app
5. Test form input
6. Run simulation
7. View results

Expected:
✓ Layout adapts to mobile
✓ Form is usable
✓ Charts are readable
✓ No horizontal scroll
✓ Touch targets are adequate
```

**Test: Tablet (768px - 1024px)**
```
Steps:
1. Set viewport to iPad size
2. Test all functionality
3. Verify layout

Expected:
✓ Multi-column layout where appropriate
✓ Charts use available space
✓ Form is well-organized
```

**Test: Desktop (1024px+)**
```
Steps:
1. Test on full desktop view
2. Verify layout utilizes space
3. Check for any overflow issues

Expected:
✓ Optimal use of screen space
✓ Charts are large and readable
✓ Form sections well-organized
```

## Component Testing

### Testing Individual Components

#### SimulationForm Component

**Manual Test Script:**
```typescript
Test Case: Form renders correctly
1. Component mounts without errors
2. All form fields present
3. Labels are correct
4. Placeholders are helpful

Test Case: Validation works
1. Submit empty form → errors appear
2. Enter invalid data → specific errors
3. Enter valid data → no errors
4. onSubmit callback fires correctly

Test Case: State management
1. Field values update on change
2. Form can be cleared
3. Default values work
```

#### SimulationResults Component

**Manual Test Script:**
```typescript
Test Case: Results display
1. Component receives results prop
2. All sections render
3. Charts populate with data
4. No rendering errors

Test Case: Conditional rendering
1. Break-even displays when present
2. Break-even shows "N/A" when null
3. Suggestions display when available
4. Empty states handled gracefully

Test Case: Interactivity
1. Chart tooltips work
2. PDF button is clickable
3. Expandable sections work (if any)
```

## Integration Testing

### Full User Flow Testing

**Test: Complete Simulation Flow**
```
Scenario: User validates a startup idea

Steps:
1. User navigates to homepage
2. User views landing page
3. User clicks "Get Started"
4. User fills in business details:
   - Idea: "Project Management SaaS"
   - Market: "Remote Teams"
   - Price: $39/month
   - Initial Users: 50
   - Growth: 20%/month
   - CAC: $80
   - OPEX: $4000/month
   - Team: 2 people
   - Competition: Medium
   - Market: Growing
5. User submits form
6. User reviews results
7. User reads recommendations
8. User downloads PDF
9. User shares with team

Expected Outcomes:
✓ Entire flow completes without errors
✓ Results are accurate and helpful
✓ PDF is professional and complete
✓ User can make informed decision
```

### Data Flow Testing

**Test: Input → Processing → Output**
```
Test Case: Data Transformation

Input:
- monthlyPrice: 50
- initialUsers: 100
- monthlyGrowthRate: 10

Processing:
- Month 1: 100 users × $50 = $5,000 revenue
- Month 2: 110 users × $50 = $5,500 revenue
- Month 12: calculated correctly

Output:
- Verify projections array
- Verify totalRevenue12M
- Verify all calculations accurate

Validation:
✓ Manual calculation matches system
✓ No rounding errors
✓ All formulas correct
```

## End-to-End Testing

### Production-Like Environment Testing

**Test: Vercel Preview Deployment**
```
Steps:
1. Create feature branch
2. Push to GitHub
3. Vercel creates preview deployment
4. Test on preview URL
5. Verify all functionality works

Environment:
- Production build
- Vercel infrastructure
- Real CDN
- Analytics enabled

Validation:
✓ Build succeeds
✓ All pages accessible
✓ Functionality identical to local
✓ Performance is good
✓ No production-only bugs
```

## Performance Testing

### Load Time Testing

**Test: Page Load Performance**
```
Tools: Chrome DevTools Performance tab

Steps:
1. Open DevTools
2. Navigate to Performance tab
3. Start recording
4. Load page
5. Stop recording
6. Analyze metrics

Target Metrics:
✓ First Contentful Paint: < 1.5s
✓ Time to Interactive: < 3s
✓ Total Load Time: < 5s
✓ Bundle Size: < 500 KB
```

**Test: Simulation Performance**
```
Steps:
1. Start performance recording
2. Fill in form
3. Submit simulation
4. Wait for results
5. Stop recording

Target Metrics:
✓ Simulation calculation: < 100ms
✓ Results render time: < 500ms
✓ Total time to results: < 3s
```

### Memory Testing

**Test: Memory Leaks**
```
Steps:
1. Open DevTools → Memory tab
2. Take heap snapshot
3. Run simulation 10 times
4. Take another snapshot
5. Compare snapshots

Expected:
✓ Memory usage stable
✓ No significant leaks
✓ Browser remains responsive
```

## Accessibility Testing

### Keyboard Navigation

**Test: Keyboard Accessibility**
```
Steps:
1. Navigate page using only keyboard
2. Tab through all interactive elements
3. Use Enter/Space to activate
4. Navigate forms with arrows (selects)

Validation:
✓ All elements reachable via Tab
✓ Focus indicators visible
✓ Logical tab order
✓ Form controls work with keyboard
✓ No keyboard traps
```

### Screen Reader Testing

**Test: ARIA and Semantic HTML**
```
Tools: Browser DevTools Accessibility tree

Steps:
1. Inspect page accessibility tree
2. Verify semantic HTML
3. Check ARIA labels
4. Validate form labels

Expected:
✓ Headings properly nested (h1, h2, h3)
✓ Form inputs have labels
✓ Buttons have accessible names
✓ Images have alt text
```

### Color Contrast Testing

**Test: WCAG Compliance**
```
Tools: Browser DevTools or axe DevTools

Steps:
1. Install accessibility extension
2. Run audit on page
3. Check color contrast ratios
4. Verify text readability

Target:
✓ Normal text: 4.5:1 contrast ratio
✓ Large text: 3:1 contrast ratio
✓ No contrast failures
```

## Browser Compatibility Testing

### Supported Browsers

**Desktop:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile:**
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

### Cross-Browser Testing

**Test: Chrome**
```
Steps:
1. Open in Chrome
2. Test all functionality
3. Check DevTools console

Expected:
✓ Full functionality
✓ No errors
✓ Optimal performance
```

**Test: Firefox**
```
Steps:
1. Open in Firefox
2. Test all functionality
3. Verify charts render

Expected:
✓ Charts display correctly
✓ Layout matches Chrome
✓ No Firefox-specific issues
```

**Test: Safari**
```
Steps:
1. Open in Safari
2. Test forms and interactions
3. Verify PDF download

Expected:
✓ Forms work correctly
✓ PDF export functions
✓ No Safari-only bugs
```

**Test: Mobile Browsers**
```
Devices:
- iPhone (Safari)
- Android (Chrome)

Steps:
1. Open on mobile device
2. Test touch interactions
3. Test form input
4. Run simulation
5. Download PDF

Expected:
✓ Touch targets adequate
✓ Gestures work
✓ Virtual keyboard doesn't break layout
✓ Download works on mobile
```

## Testing Checklist

### Pre-Release Testing Checklist

**Functional Testing:**
- [ ] Form submission works
- [ ] Validation prevents invalid input
- [ ] Simulation calculations accurate
- [ ] Results display correctly
- [ ] Charts render without errors
- [ ] PDF export works
- [ ] Navigation works
- [ ] All links functional

**UI/UX Testing:**
- [ ] Responsive on mobile (375px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1024px+)
- [ ] No layout breaks
- [ ] Loading states work
- [ ] Error states work
- [ ] Color scheme consistent

**Performance Testing:**
- [ ] Page loads in < 3s
- [ ] Simulation completes in < 3s
- [ ] No memory leaks
- [ ] Build size acceptable
- [ ] No console errors

**Accessibility Testing:**
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader friendly
- [ ] Semantic HTML used

**Browser Testing:**
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on iOS
- [ ] Works on Android

**Build Testing:**
- [ ] `npm run build` succeeds
- [ ] Production build runs
- [ ] No build warnings
- [ ] TypeScript compiles

**Content Testing:**
- [ ] All text correct
- [ ] No typos
- [ ] Links point to correct URLs
- [ ] Branding correct
- [ ] Contact info current

## Testing Best Practices

### 1. Test After Every Change
```bash
# After code changes
npm run dev
# Manually test affected functionality
```

### 2. Test Production Builds
```bash
# Before deploying
npm run build
npm start
# Full manual test suite
```

### 3. Cross-Browser Testing
- Test in at least 2 browsers
- Test on at least 1 mobile device
- Verify core functionality works everywhere

### 4. Document Test Results
Keep notes on:
- What was tested
- Any issues found
- How issues were resolved
- Date of testing

### 5. Regression Testing
When fixing bugs:
- Verify fix works
- Ensure fix doesn't break other features
- Re-test related functionality

## Automated Testing (Future Enhancement)

### Recommended Testing Stack
```json
{
  "devDependencies": {
    "@testing-library/react": "latest",
    "@testing-library/jest-dom": "latest",
    "jest": "latest",
    "jest-environment-jsdom": "latest",
    "@playwright/test": "latest"
  }
}
```

### Example Unit Test (Future)
```typescript
// __tests__/simulation.test.ts
import { runSimulation } from '@/lib/simulation';

describe('runSimulation', () => {
  it('should calculate correct revenue', () => {
    const input = {
      monthlyPrice: 50,
      initialUsers: 100,
      // ... other fields
    };
    
    const result = runSimulation(input);
    
    expect(result.projections[0].revenue).toBe(5000);
  });
});
```

### Example E2E Test (Future)
```typescript
// tests/e2e/simulation.spec.ts
import { test, expect } from '@playwright/test';

test('complete simulation flow', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await page.fill('[name="ideaName"]', 'Test Startup');
  await page.fill('[name="monthlyPrice"]', '50');
  // ... fill other fields
  
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.verdict')).toBeVisible();
});
```

---

**For more information:**
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development workflows
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
