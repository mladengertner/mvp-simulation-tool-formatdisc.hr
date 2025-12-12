# Contributing to FORMATDISC MVP Simulation Tool

Thank you for your interest in contributing! We welcome contributions from the community and are excited to collaborate with you.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race, ethnicity, or national origin
- Age
- Religion

### Expected Behavior

**Do:**
- ✅ Be respectful and professional
- ✅ Welcome newcomers warmly
- ✅ Provide constructive feedback
- ✅ Focus on what's best for the community
- ✅ Show empathy towards others

**Don't:**
- ❌ Use sexualized language or imagery
- ❌ Make personal attacks or insults
- ❌ Engage in trolling or harassment
- ❌ Publish others' private information
- ❌ Act unprofessionally

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to: info@formatdisc.hr

## How Can I Contribute?

### 1. Report Bugs 🐛

Found a bug? Help us fix it!
- Check existing issues first
- Create a detailed bug report
- Include steps to reproduce
- Provide screenshots if applicable

[Report a Bug →](https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr/issues/new)

### 2. Suggest Features 💡

Have an idea for improvement?
- Check the [roadmap](./ROADMAP.md) first
- Search existing feature requests
- Create a feature request issue
- Explain the use case and value

[Request a Feature →](https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr/issues/new)

### 3. Improve Documentation 📚

Documentation is always in need of improvement:
- Fix typos and grammar
- Add missing information
- Improve clarity
- Add examples
- Translate to other languages

### 4. Submit Code 💻

Contribute code improvements:
- Fix bugs
- Implement features
- Optimize performance
- Improve accessibility
- Enhance UI/UX

### 5. Review Pull Requests 👀

Help review others' contributions:
- Test changes locally
- Provide constructive feedback
- Suggest improvements
- Approve quality PRs

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Git
- GitHub account
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub
   # Then clone your fork
   git clone https://github.com/YOUR-USERNAME/mvp-simulation-tool-formatdisc.hr.git
   cd mvp-simulation-tool-formatdisc.hr
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr.git
   ```

3. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Verify Setup**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

### Staying Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Update your main branch
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

## Development Workflow

### Step-by-Step Contribution Process

1. **Create an Issue** (if one doesn't exist)
   - Describe what you plan to work on
   - Get feedback before starting
   - Reference the issue in your PR later

2. **Create a Feature Branch**
   ```bash
   # Update main first
   git checkout main
   git pull upstream main
   
   # Create new branch
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Write clean, documented code
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes**
   ```bash
   # Development testing
   npm run dev
   
   # Production build test
   npm run build
   npm start
   
   # Lint check
   npm run lint
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add awesome new feature"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill in the PR template
   - Wait for review

### Branch Naming Convention

```bash
# Features
feature/add-dark-mode
feature/multi-language-support
feature/scenario-comparison

# Bug fixes
fix/calculation-error
fix/mobile-layout-issue
fix/pdf-export-bug

# Documentation
docs/update-api-reference
docs/add-croatian-translation
docs/improve-readme

# Performance
perf/optimize-simulation-speed
perf/reduce-bundle-size

# Refactoring
refactor/clean-simulation-logic
refactor/extract-chart-components
```

## Coding Standards

### TypeScript

**Always use TypeScript with strict types:**

```typescript
// ✅ Good
interface UserData {
  name: string;
  age: number;
}

function processUser(user: UserData): string {
  return `${user.name} is ${user.age} years old`;
}

// ❌ Bad
function processUser(user: any) {
  return `${user.name} is ${user.age} years old`;
}
```

### React Components

**Use functional components with TypeScript:**

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}

// ❌ Bad
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Naming Conventions

```typescript
// Components: PascalCase
export function SimulationForm() {}

// Functions: camelCase
function calculateRevenue() {}

// Constants: UPPER_SNAKE_CASE
const MAX_USERS = 1000000;

// Variables: camelCase
const userName = "John";

// Files: kebab-case
// simulation-form.tsx
// risk-analysis.ts
```

### Code Organization

```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Component
export function MyComponent({ title }: ComponentProps) {
  // 3.1 Hooks
  const [state, setState] = useState();
  
  // 3.2 Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 3.3 Render
  return <div onClick={handleClick}>{title}</div>;
}

// 4. Helper functions
function helperFunction() {
  // ...
}
```

### Comments

**Add comments for complex logic:**

```typescript
// ✅ Good - Explains WHY
// Use exponential growth formula to account for viral coefficient
const users = initialUsers * Math.pow(1 + growthRate, months);

// ❌ Bad - States WHAT (obvious from code)
// Calculate users
const users = initialUsers * Math.pow(1 + growthRate, months);

// ✅ Good - Documents edge case
// Handle division by zero when price is not set
const recovery = price > 0 ? cac / price : 0;
```

### Tailwind CSS

```typescript
// ✅ Good - Semantic grouping
<div className="
  flex items-center gap-4
  p-6 m-4
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">

// ❌ Bad - Random order
<div className="shadow-md p-6 bg-white gap-4 flex m-4 items-center rounded-lg hover:shadow-lg transition-shadow">
```

## Commit Guidelines

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Feature
feat(simulation): add 24-month projection option

# Bug fix
fix(pdf): resolve export error on mobile devices

# Documentation
docs(readme): update installation instructions

# Performance
perf(charts): optimize rendering with memoization

# Refactor
refactor(forms): extract validation logic to separate file

# Multiple lines
feat(api): add simulation sharing endpoint

Allow users to generate shareable links for simulations.
Links expire after 7 days for privacy.

Closes #123
```

### Best Practices

**Do:**
- ✅ Use imperative mood ("add" not "added")
- ✅ Keep subject line under 50 characters
- ✅ Capitalize subject line
- ✅ No period at end of subject
- ✅ Reference issues in footer

**Don't:**
- ❌ Commit multiple unrelated changes together
- ❌ Use vague messages like "fix stuff" or "updates"
- ❌ Include work-in-progress code in commits
- ❌ Commit commented-out code

## Pull Request Process

### Before Submitting

**Checklist:**
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log or debug code
- [ ] Builds successfully (`npm run build`)
- [ ] Tested in development (`npm run dev`)
- [ ] No TypeScript errors
- [ ] No ESLint errors (if configured)

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Fixes #(issue number)

## Testing
Describe testing done:
- [ ] Tested locally in dev mode
- [ ] Tested production build
- [ ] Tested on mobile
- [ ] Tested in different browsers

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No console logs
- [ ] Builds successfully
```

### Review Process

1. **Automated Checks**
   - Build must succeed
   - No merge conflicts

2. **Code Review**
   - At least one approval required
   - Address all feedback
   - Make requested changes

3. **Testing**
   - Reviewer tests changes
   - Verifies functionality
   - Checks for regressions

4. **Merge**
   - Maintainer merges PR
   - Branch is deleted
   - Changes deployed

### After Merge

- Your contribution is live! 🎉
- You'll be credited in release notes
- Thank you for contributing!

## Reporting Bugs

### Before Reporting

1. **Check existing issues**: Your bug may already be reported
2. **Try latest version**: Bug might be fixed
3. **Reproduce**: Ensure it's reproducible

### Bug Report Template

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS 13.4]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional Context**
Any other relevant information
```

## Suggesting Features

### Feature Request Template

```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
How would you solve it?

**Alternatives Considered**
What other solutions did you think about?

**Use Cases**
Who would benefit and how?

**Additional Context**
Mockups, examples, etc.
```

## Community

### Communication Channels

**GitHub:**
- Issues: Bug reports and feature requests
- Discussions: General questions and ideas
- Pull Requests: Code contributions

**Email:**
- info@formatdisc.hr
- For private concerns or questions

**Website:**
- https://www.formatdisc.hr
- Official announcements and updates

### Getting Help

**Documentation:**
1. Check [README.md](../README.md)
2. Read [GETTING_STARTED.md](./GETTING_STARTED.md)
3. Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**Ask Questions:**
1. Search existing issues/discussions
2. Create a new discussion (not issue)
3. Be specific and provide context

**Need Faster Response:**
- Email: info@formatdisc.hr
- Include "Help Needed" in subject

## Recognition

### Contributors

All contributors are recognized in:
- GitHub Contributors page
- Release notes (for significant contributions)
- CHANGELOG.md

### Types of Recognition

**Code Contributors:**
- Credited in commit history
- Listed in release notes
- Thank you in announcements

**Non-Code Contributors:**
- Documentation improvements credited
- Bug reporters acknowledged
- Feature suggestions recognized

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

See [LICENSE](../LICENSE) file for details.

---

## Questions?

**Not sure where to start?**
- Read this guide carefully
- Check out [good first issues](https://github.com/mladengertner/mvp-simulation-tool-formatdisc.hr/labels/good%20first%20issue)
- Reach out: info@formatdisc.hr

**Want to contribute but don't know how?**
- Documentation improvements are always welcome
- Reporting bugs helps everyone
- Suggesting features shapes the roadmap
- Reviewing PRs supports the community

---

**Thank you for contributing to FORMATDISC MVP Simulation Tool!** 🙏

Your contributions make this project better for everyone.

---

**Contact:**
- Email: info@formatdisc.hr
- Website: https://www.formatdisc.hr
- Phone: +385 91 542 1014
- Location: Zagreb, Croatia
