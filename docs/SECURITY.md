# Security Policy - FORMATDISC MVP Simulation Tool

## Table of Contents
- [Security Overview](#security-overview)
- [Architecture Security](#architecture-security)
- [Data Privacy](#data-privacy)
- [Dependency Security](#dependency-security)
- [Secure Development Practices](#secure-development-practices)
- [Vulnerability Disclosure](#vulnerability-disclosure)
- [Security Checklist](#security-checklist)
- [Incident Response](#incident-response)

## Security Overview

The FORMATDISC MVP Simulation Tool is designed with **security and privacy by design** principles. As a client-side application with no backend infrastructure, it inherently avoids many common security vulnerabilities.

### Security Principles

1. **Client-Side Processing**: All calculations occur in the user's browser
2. **No Data Storage**: No user data is transmitted or stored on servers
3. **Privacy First**: User data never leaves their device
4. **Zero Backend**: No API attack surface
5. **Minimal Dependencies**: Reduced third-party vulnerability exposure
6. **Security Headers**: HTTP security headers configured
7. **HTTPS Only**: All traffic encrypted in production

### Threat Model

**Threats We Protect Against:**
- ✅ Data breaches (no data to breach)
- ✅ SQL injection (no database)
- ✅ API attacks (no backend API)
- ✅ Session hijacking (no sessions)
- ✅ XSS attacks (React sanitization)
- ✅ CSRF attacks (no state-changing requests)

**Threats Outside Our Control:**
- ⚠️ User's browser security
- ⚠️ User's device security
- ⚠️ DNS hijacking
- ⚠️ Supply chain attacks on dependencies

## Architecture Security

### Client-Side Security Model

```
┌─────────────────────────────────────────┐
│         User's Browser (Trusted)        │
├─────────────────────────────────────────┤
│  • All code execution                   │
│  • All data processing                  │
│  • All storage (temporary, in-memory)   │
│  • No network requests for user data    │
└─────────────────────────────────────────┘
           ↓ (HTTPS Only)
┌─────────────────────────────────────────┐
│       Vercel CDN (Static Assets)        │
├─────────────────────────────────────────┤
│  • JavaScript bundles                   │
│  • HTML files                           │
│  • CSS files                            │
│  • No user data                         │
└─────────────────────────────────────────┘
```

### Security Headers

**Implemented in `vercel.json`:**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Header Explanations

**X-Content-Type-Options: nosniff**
- Prevents MIME type sniffing
- Forces browser to respect declared content type
- Mitigates XSS and download attacks

**X-Frame-Options: DENY**
- Prevents clickjacking attacks
- Blocks embedding in iframes
- Protects against UI redressing

**X-XSS-Protection: 1; mode=block**
- Enables browser XSS filter
- Blocks page load if XSS detected
- Defense-in-depth measure

**Recommended Additional Headers (Future Enhancement):**

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
},
{
  "key": "Strict-Transport-Security",
  "value": "max-age=31536000; includeSubDomains"
},
{
  "key": "Referrer-Policy",
  "value": "strict-origin-when-cross-origin"
},
{
  "key": "Permissions-Policy",
  "value": "geolocation=(), microphone=(), camera=()"
}
```

## Data Privacy

### Data Handling Policy

**What We DON'T Do:**
- ❌ Store user input on servers
- ❌ Track simulation parameters
- ❌ Send data to third parties
- ❌ Use cookies for tracking
- ❌ Log user data
- ❌ Collect personal information

**What We DO:**
- ✅ Process all data client-side
- ✅ Keep data in browser memory only
- ✅ Clear data on page refresh
- ✅ Use HTTPS for static asset delivery
- ✅ Minimal analytics (Vercel Analytics - anonymous)

### Privacy by Design

```typescript
// Example: Simulation runs entirely client-side
export function runSimulation(input: SimulationInput): SimulationResults {
  // All processing happens here, in user's browser
  // No network calls
  // No data leaves the device
  
  const projections = calculateProjections(input);
  const risks = analyzeRisks(input);
  const verdict = generateVerdict(projections, risks);
  
  return { projections, risks, verdict };
}
```

### Analytics

**Vercel Analytics (Minimal, Anonymous):**
- Page views (no user identification)
- Performance metrics (load times)
- Geographic region (country-level only)
- Device type (mobile/desktop)

**No Analytics Collected:**
- User input data
- Simulation parameters
- Personal information
- Behavioral tracking
- Cross-site tracking

**Opt-Out:**
Users can disable analytics via browser:
- Use ad blockers
- Enable "Do Not Track"
- Disable JavaScript (app won't function)

## Dependency Security

### Dependency Management

**Current Strategy:**
1. Minimal dependencies
2. Regular updates via Dependabot
3. npm audit before releases
4. Pin major versions

### Vulnerability Scanning

**Before Each Release:**

```bash
# Check for known vulnerabilities
npm audit

# Review report
# ✓ 0 vulnerabilities (target)
# ⚠️ Fix any moderate or higher vulnerabilities
```

**Automated Scanning:**
- GitHub Dependabot alerts enabled
- Automatic PR creation for security updates
- Weekly dependency review

### Dependency Update Policy

**Security Updates:**
- Critical: Immediate (within 24 hours)
- High: Within 1 week
- Moderate: Within 1 month
- Low: Next regular update

**Example Response:**

```bash
# Security vulnerability found
npm audit
# ✗ high severity vulnerability in package-x

# Update specific package
npm update package-x --legacy-peer-deps

# Re-audit
npm audit
# ✓ 0 vulnerabilities

# Test application
npm run build
npm start

# Commit and deploy
git commit -m "security: update package-x to fix CVE-XXXX-XXXXX"
```

### Trusted Dependencies

**Core Dependencies (Reviewed):**
- next.js - Meta/Vercel maintained
- react - Meta maintained
- tailwindcss - Tailwind Labs
- typescript - Microsoft
- radix-ui - WorkOS
- recharts - Popular, actively maintained

**Dependency Review Criteria:**
1. Active maintenance
2. Large user base
3. Security track record
4. Open source (inspectable)
5. Regular updates

## Secure Development Practices

### Code Security Guidelines

#### 1. Input Validation

**Always validate user input:**

```typescript
// ✅ Good - Validation before processing
export function runSimulation(input: SimulationInput): SimulationResults {
  // Validate numeric ranges
  if (input.monthlyPrice <= 0) {
    throw new Error('Monthly price must be positive');
  }
  
  if (input.monthlyGrowthRate < 0 || input.monthlyGrowthRate > 100) {
    throw new Error('Growth rate must be between 0 and 100');
  }
  
  // Proceed with validated data
  return calculateResults(input);
}

// ❌ Bad - No validation
export function runSimulation(input: SimulationInput): SimulationResults {
  return calculateResults(input); // Dangerous!
}
```

#### 2. XSS Prevention

**React handles most XSS automatically, but:**

```typescript
// ✅ Good - React auto-escapes
function UserInput({ name }: { name: string }) {
  return <div>{name}</div>; // Safe
}

// ⚠️ Dangerous - dangerouslySetInnerHTML
function UserInput({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />; // Avoid!
}

// ✅ Better - Sanitize if you must use HTML
import DOMPurify from 'dompurify';

function UserInput({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

#### 3. Safe Data Handling

```typescript
// ✅ Good - Type-safe data handling
interface SimulationInput {
  ideaName: string;
  monthlyPrice: number; // Strongly typed
  // ...
}

function processInput(input: SimulationInput) {
  // TypeScript ensures type safety
}

// ❌ Bad - Unsafe data handling
function processInput(input: any) {
  // No type checking, vulnerable to unexpected data
}
```

#### 4. No Secret Storage

```typescript
// ❌ NEVER do this
const API_KEY = "sk-1234567890abcdef"; // Exposed in client code!

// ✅ If API keys needed (future)
// - Use server-side API routes
// - Store in environment variables
// - Never commit to git
// - Use secrets management
```

### Code Review Checklist

Before merging code:

- [ ] No sensitive data in code
- [ ] No console.log with user data
- [ ] Input validation present
- [ ] No SQL/NoSQL (we don't use databases)
- [ ] No eval() or Function() constructor
- [ ] No dangerouslySetInnerHTML without sanitization
- [ ] TypeScript types enforced
- [ ] No commented-out secrets
- [ ] No TODO with security implications

## Vulnerability Disclosure

### Reporting a Vulnerability

**If you discover a security vulnerability:**

1. **DO NOT** open a public GitHub issue
2. Email: info@formatdisc.hr
3. Subject: "Security Vulnerability Report"
4. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

**Response Timeline:**
- Initial response: Within 48 hours
- Triage: Within 1 week
- Fix implementation: Depends on severity
  - Critical: 24-48 hours
  - High: 1 week
  - Medium: 2 weeks
  - Low: Next release

**Process:**
1. We acknowledge receipt
2. We investigate and validate
3. We develop a fix
4. We deploy the fix
5. We notify reporter
6. We publish security advisory (if applicable)

### Responsible Disclosure

**We commit to:**
- Acknowledge all reports
- Keep reporters informed
- Credit reporters (if desired)
- Fix vulnerabilities promptly
- Be transparent about security

**We ask reporters to:**
- Allow reasonable time to fix
- Not exploit vulnerabilities
- Not publish details until fixed
- Provide clear reproduction steps

## Security Checklist

### Development Phase

- [ ] No secrets in code
- [ ] Input validation implemented
- [ ] TypeScript types enforced
- [ ] Dependencies reviewed
- [ ] No unsafe code patterns
- [ ] XSS protection verified

### Pre-Deployment

- [ ] npm audit passes (0 vulnerabilities)
- [ ] Build succeeds without warnings
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] No debug code in production
- [ ] Environment variables secured (if any)

### Post-Deployment

- [ ] Verify HTTPS active
- [ ] Check security headers
- [ ] Test in production
- [ ] Monitor for issues
- [ ] Set up security alerts

### Regular Maintenance

**Monthly:**
- [ ] Run npm audit
- [ ] Review Dependabot alerts
- [ ] Update critical dependencies
- [ ] Check for new security advisories

**Quarterly:**
- [ ] Full security review
- [ ] Update all dependencies
- [ ] Review access controls
- [ ] Audit build process

## Incident Response

### Security Incident Plan

**If a security issue is discovered in production:**

1. **Assess Severity**
   - Critical: Data breach, RCE, authentication bypass
   - High: XSS, CSRF, significant data leak
   - Medium: Minor data exposure, DoS
   - Low: Information disclosure

2. **Immediate Actions**
   - Document the issue
   - Assess impact
   - Contain the problem (if possible)
   - Notify team

3. **Fix Implementation**
   - Develop fix
   - Test thoroughly
   - Deploy immediately (critical/high)
   - Schedule deployment (medium/low)

4. **Post-Incident**
   - Update security documentation
   - Notify affected users (if applicable)
   - Publish security advisory
   - Improve processes to prevent recurrence

### Example Incident Response

**Scenario: XSS Vulnerability Discovered**

```markdown
**Severity:** High

**Impact:** User-generated content could execute scripts

**Timeline:**
- 09:00 - Vulnerability reported
- 09:15 - Team notified
- 09:30 - Investigation started
- 10:00 - Vulnerability confirmed
- 10:30 - Fix developed
- 11:00 - Fix tested
- 11:30 - Fix deployed to production
- 12:00 - Verification complete
- 13:00 - Security advisory published

**Fix:**
- Implemented DOMPurify sanitization
- Added input validation
- Updated tests
- Deployed via Vercel

**Prevention:**
- Added code review checklist item
- Enhanced security documentation
- Scheduled security training
```

## Security Resources

### Internal Resources
- This security policy
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Secure coding practices
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Security in contributions

### External Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [npm Security Best Practices](https://docs.npmjs.com/cli/v8/using-npm/security)

## Contact

**Security Contact:**
- Email: info@formatdisc.hr
- Subject: "Security - [Brief Description]"

**General Contact:**
- Website: https://www.formatdisc.hr
- Phone: +385 91 542 1014

---

**Last Updated:** December 2024  
**Version:** 1.0.0

**Commitment:** We take security seriously and are committed to protecting our users. This is a living document that will be updated as our security practices evolve.
