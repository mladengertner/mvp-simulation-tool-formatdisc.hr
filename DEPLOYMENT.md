# 🚀 Deployment Guide

This guide will help you deploy the FORMATDISC MVP Simulation Tool to production.

## ✅ Pre-Deployment Checklist

- [x] All dependencies installed
- [x] Build process configured
- [x] Production build tested
- [x] Vercel configuration ready
- [x] Environment optimized

## 📦 Quick Deploy to Vercel

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository: `mladengertner/mvp-simulation-tool-formatdisc.hr`
   - Vercel will auto-detect Next.js settings

3. **Configure Domain**
   - In Vercel dashboard, go to Project Settings → Domains
   - Add custom domain: `www.formatdisc.hr`
   - Follow Vercel's DNS configuration instructions

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site is live! 🎉

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

## 🔧 Build Commands

The project is already configured with the correct build settings:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install --legacy-peer-deps`
- **Development Command**: `npm run dev`

## 🌐 Environment Configuration

**No environment variables required!** The application runs entirely client-side.

Optional analytics is already configured via `@vercel/analytics`.

## 📊 Performance Optimizations

Already configured:
- ✅ Static page generation
- ✅ Image optimization disabled (unoptimized mode for faster builds)
- ✅ TypeScript build errors ignored (for faster deploys)
- ✅ ESLint errors ignored during builds
- ✅ Security headers configured in `vercel.json`
- ✅ Clean URLs enabled
- ✅ Trailing slash handling

## 🧪 Testing Locally

```bash
# Development mode
npm run dev
# Open http://localhost:3000

# Production build test
npm run build
npm start
# Open http://localhost:3000
```

## 📱 Pages Available

- `/` - Main MVP Simulation Tool
- `/landing` - Marketing Landing Page

## 🔒 Security

Configured security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Dependency Issues
```bash
# Reinstall with legacy peer deps
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Vercel Deployment Issues
- Ensure build command is: `npm run build`
- Install command should be: `npm install --legacy-peer-deps`
- Node version: 18.x or higher

## 📞 Support

**FORMATDISC, vl. Mladen Gertner**
- Email: info@formatdisc.hr
- Phone: +385 91 542 1014
- Website: https://www.formatdisc.hr

---

## 🎯 Post-Deployment

After deployment:
1. ✅ Test all functionality on live site
2. ✅ Verify PDF export works
3. ✅ Test simulation calculations
4. ✅ Check mobile responsiveness
5. ✅ Verify analytics tracking

Your MVP Simulation Tool is now ready for production! 🚀
