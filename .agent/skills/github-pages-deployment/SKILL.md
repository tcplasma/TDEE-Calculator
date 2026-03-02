---
name: GitHub Pages Deployment (TDD + SOLID)
description: Deploy static HTML websites to GitHub Pages following Test-Driven Development and SOLID principles
---

# GitHub Pages Deployment with TDD and SOLID Principles

This skill provides a comprehensive guide for deploying static HTML websites (such as the TDEE Calculator) to GitHub Pages using automated CI/CD pipelines.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [TDD Workflow](#tdd-workflow)
3. [SOLID Principles for Static Sites](#solid-principles-for-static-sites)
4. [Project Setup](#project-setup)
5. [GitHub Repository Setup](#github-repository-setup)
6. [GitHub Actions Configuration](#github-actions-configuration)
7. [Deployment](#deployment)
8. [Verification Checklist](#verification-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Git installed locally
- GitHub account
- HTML/CSS/JS files ready for deployment
- Basic command line knowledge

---

## TDD Workflow

### The Red-Green-Refactor Cycle for Static Sites

**ALWAYS follow this cycle before deployment:**

1. **RED (Test First)**: Verify requirements are met
   - Does the site render correctly in browsers?
   - Are all links functional?
   - Is the site responsive on mobile devices?

2. **GREEN (Make it Work)**: Fix any issues found
   - Correct broken links
   - Fix responsive design issues
   - Ensure all assets load correctly

3. **REFACTOR (Improve)**: Optimize without breaking functionality
   - Minify CSS/JS
   - Optimize images
   - Improve accessibility

### Pre-Deployment Testing Checklist

```bash
# 1. Open the HTML file locally
start index.html  # Windows
open index.html   # macOS

# 2. Test in multiple browsers
# - Chrome, Firefox, Edge, Safari

# 3. Test responsive design
# - Use browser DevTools (F12) to simulate mobile devices

# 4. Validate HTML
# - https://validator.w3.org/

# 5. Check accessibility
# - https://wave.webaim.org/
```

---

## SOLID Principles for Static Sites

### S - Single Responsibility Principle

**Each file should have one purpose.**

```
✅ GOOD:
├── index.html          # Page structure only
├── styles/
│   ├── main.css        # Core styling
│   ├── responsive.css  # Media queries
│   └── animations.css  # Animations
└── scripts/
    ├── calculator.js   # Calculation logic
    └── ui.js           # UI interactions

❌ BAD:
└── everything.html     # HTML + CSS + JS all in one
```

### O - Open/Closed Principle

**Extend functionality without modifying core files.**

```html
<!-- ✅ GOOD: Use CSS variables for easy customization -->
<style>
  :root {
    --primary-color: #0099ff;
    --accent-color: #E4C859;
    --font-family: 'Inria Sans', sans-serif;
  }
</style>
```

### L - Liskov Substitution Principle

**Components should be interchangeable.**

```css
/* ✅ GOOD: Generic button class */
.btn { /* Base button styles */ }
.btn-primary { /* Primary variant */ }
.btn-secondary { /* Secondary variant */ }
```

### I - Interface Segregation Principle

**Don't force unused dependencies.**

```html
<!-- ✅ GOOD: Load only what's needed -->
<link rel="stylesheet" href="styles/main.css">

<!-- ❌ BAD: Loading entire frameworks for simple needs -->
<link rel="stylesheet" href="bootstrap.min.css">
```

### D - Dependency Inversion Principle

**Use abstractions, not hard-coded values.**

```javascript
// ✅ GOOD: Configuration object
const CONFIG = {
  apiEndpoint: 'https://api.example.com',
  theme: 'light'
};

// ❌ BAD: Hard-coded values throughout code
fetch('https://api.example.com/users');
```

---

## Modern Web Design Principles (2025-2026)

To ensure your web applications look **premium, state-of-the-art, and agency-quality**, follow these standards rigorously.

### 1. Design Token Architecture

Use a **layered CSS variable system** — raw values → semantic tokens → component tokens. Define everything at `:root` and override in components or media queries.

```css
:root {
  /* ── Raw Palette (OKLCH for perceptual uniformity) ── */
  --raw-blue-50:  oklch(0.97 0.01 250);
  --raw-blue-500: oklch(0.60 0.18 250);
  --raw-blue-700: oklch(0.45 0.18 250);
  --raw-gold-400: oklch(0.82 0.14  85);
  --raw-gray-50:  oklch(0.98 0.00   0);
  --raw-gray-100: oklch(0.94 0.00   0);
  --raw-gray-600: oklch(0.55 0.00   0);
  --raw-gray-900: oklch(0.20 0.00   0);
  --raw-white:    #ffffff;
  --raw-black:    #000000;

  /* ── Semantic Tokens ── */
  --color-bg-page:      var(--raw-gray-50);
  --color-bg-surface:   var(--raw-white);
  --color-bg-elevated:  rgba(255,255,255,0.8);
  --color-text-primary: var(--raw-gray-900);
  --color-text-muted:   var(--raw-gray-600);
  --color-brand:        var(--raw-blue-500);
  --color-brand-dark:   var(--raw-blue-700);
  --color-accent:       var(--raw-gold-400);

  /* ── Spacing Scale (8px grid) ── */
  --space-xs:  0.25rem;  /*  4px */
  --space-sm:  0.5rem;   /*  8px */
  --space-md:  1rem;     /* 16px */
  --space-lg:  1.5rem;   /* 24px */
  --space-xl:  2rem;     /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */

  /* ── Radius Scale ── */
  --radius-sm:   8px;
  --radius-md:  14px;
  --radius-lg:  20px;
  --radius-xl:  28px;
  --radius-full: 9999px;

  /* ── Typography Scale (fluid with clamp) ── */
  --text-xs:   clamp(0.65rem, 0.6rem + 0.2vw, 0.75rem);
  --text-sm:   clamp(0.8rem,  0.75rem + 0.2vw, 0.9rem);
  --text-base: clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem);
  --text-lg:   clamp(1.1rem,  1rem + 0.4vw, 1.3rem);
  --text-xl:   clamp(1.4rem,  1.2rem + 0.6vw, 1.7rem);
  --text-2xl:  clamp(1.8rem,  1.5rem + 1vw,  2.5rem);
  --text-3xl:  clamp(2.2rem,  1.8rem + 1.2vw, 3rem);

  /* ── Shadow System ── */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.06);
  --shadow-md:   0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg:   0 12px 32px rgba(0,0,0,0.12);
  --shadow-xl:   0 20px 48px rgba(0,0,0,0.16);
  --shadow-glow: 0 0 24px rgba(0,100,255,0.15);

  /* ── Glassmorphism ── */
  --glass-bg:     rgba(255,255,255,0.55);
  --glass-border: rgba(255,255,255,0.25);
  --glass-blur:   blur(20px);
}
```

### 2. Rich Aesthetics & Glassmorphism

Create **depth and atmosphere** with layered translucent surfaces:

```css
/* Modern glassmorphism card */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Dark glassmorphism variant (for dark headers/sections) */
.glass-dark {
  background: rgba(10, 20, 40, 0.7);
  backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.08);
  color: white;
}

/* Gradient backgrounds — use subtle, layered gradients, never flat colors */
.premium-bg {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(0,120,255,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(228,200,89,0.06) 0%, transparent 50%),
    linear-gradient(160deg, #f8fafc 0%, #eef2f7 100%);
}
```

**Rules:**
- ❌ Never use flat solid backgrounds (e.g., `background: #0099ff`)
- ✅ Always layer gradients, radials, or glass effects
- ✅ Use `box-shadow` for depth — every elevated element needs a shadow
- ✅ For headers: dark glass over a gradient, not a flat color bar

### 3. Premium Typography

```css
/* Import TWO complementary font families */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&display=swap');

/* Use fluid type scale — NEVER hardcode px for body text */
body { font-family: 'Inter', sans-serif; font-size: var(--text-base); }
h1, h2, h3 { font-family: 'Outfit', sans-serif; }
h1 { font-size: var(--text-3xl); font-weight: 700; letter-spacing: -0.03em; }
h2 { font-size: var(--text-xl); font-weight: 600; }
```

**Rules:**
- Use `clamp()` for all font sizes — no breakpoint-dependent sizes
- Heading letter-spacing should be negative (`-0.02em` to `-0.04em`)
- Body letter-spacing should be neutral or slightly positive
- Line height: 1.2 for headings, 1.6 for body text

### 4. Micro-animations & Interactive States

**Every interactive element MUST have animated feedback.** This is non-negotiable for premium feel.

```css
/* Base transition for ALL interactive elements */
.interactive {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Buttons: lift + glow on hover */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md), var(--shadow-glow);
}
.btn:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 0.1s;
}

/* Cards: subtle lift on hover */
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Inputs: glow ring on focus */
input:focus, select:focus {
  outline: none;
  border-color: var(--color-brand);
  box-shadow: 0 0 0 4px rgba(0,100,255,0.12);
  transform: scale(1.01);
}

/* Entrance animations (use sparingly) */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

### 5. Color Palette Guidelines for Health Apps

For health/nutrition calculators, follow this emotional color mapping:

| Purpose | Color Range | Example |
|---------|-------------|---------|
| Primary brand | Deep blue / teal | `oklch(0.55 0.15 240)` |
| Trust / safety | Soft blue | `oklch(0.80 0.08 240)` |
| Success / healthy | Emerald green | `oklch(0.65 0.18 155)` |
| Warning / caution | Amber / gold | `oklch(0.78 0.14 80)` |
| Danger / deficit | Coral / rose | `oklch(0.65 0.15 25)` |
| Surfaces | Off-white → warm gray gradient | `oklch(0.97 0.005 250)` |

**Rules:**
- Header/hero: use dark glass or deep gradient, NOT a flat saturated blue
- Background: subtle warm/cool gradient, never pure white
- Cards: white or near-white glass with generous blur
- Data cards (results): gradient backgrounds that feel alive, not flat boxes

### 6. Layout & Spacing

```css
/* Use consistent spacing tokens everywhere */
.section { padding: var(--space-2xl) var(--space-xl); }
.card    { padding: var(--space-lg); border-radius: var(--radius-lg); }
.stack > * + * { margin-top: var(--space-md); }

/* Desktop: max ~1100px container, generous padding */
/* Mobile: collapse to single column, reduce padding */
```

**Rules:**
- Minimum 16px gap between adjacent cards
- Generous internal padding (24px+ for cards)
- Headers: at least 3rem vertical padding
- Footer: subtle, not overpowering — use lighter tones or transparency

### 7. Accessibility (WCAG 2.2 AA)

- All text must meet 4.5:1 contrast ratio (3:1 for large text)
- All interactive elements need visible `:focus-visible` outlines
- Use semantic HTML (`<header>`, `<main>`, `<footer>`, `<section>`)
- Images must have descriptive `alt` text
- Form labels must be associated with their inputs

### 8. Responsive & Mobile-First

- Design for 375px first, then 768px, then 1024px+
- Use `clamp()` for fluid sizing instead of breakpoint jumps
- Stack columns on mobile, grid on desktop
- Touch targets: minimum 44×44px

## Project Setup

### Step 1: Initialize Project Structure

```bash
# Create project directory
mkdir my-website
cd my-website

# Initialize Git
git init

# Create .gitignore
echo "# OS files" > .gitignore
echo ".DS_Store" >> .gitignore
echo "Thumbs.db" >> .gitignore
echo "" >> .gitignore
echo "# Editor files" >> .gitignore
echo ".vscode/" >> .gitignore
echo "*.swp" >> .gitignore
```

### Step 2: Organize Files

```
my-website/
├── index.html              # Main entry point (REQUIRED)
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
├── assets/
│   └── images/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
└── .gitignore
```

### Step 3: Ensure index.html Exists

GitHub Pages requires an `index.html` file in the root directory.

```bash
# For TDEE Calculator: rename if needed
# If your file is named differently:
copy "tdee-calculator-standalone.html" "index.html"
```

---

## GitHub Repository Setup

### Step 1: Create GitHub Repository

```bash
# Option A: Using GitHub CLI
gh repo create my-website --public --source=. --push

# Option B: Manual Process
# 1. Go to https://github.com/new
# 2. Create a new repository
# 3. DO NOT initialize with README (you have local files)
```

### Step 2: Connect Local Repository to GitHub

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Add website files"

# Push to main branch
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. Save changes

---

## GitHub Actions Configuration

### Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # Runs on pushes to main branch
  push:
    branches: ["main"]
  
  # Allows manual trigger from Actions tab
  workflow_dispatch:

# Sets permissions for GITHUB_TOKEN
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload entire repository
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Deployment

### Automated Deployment

Once GitHub Actions is configured, deployment is automatic:

```bash
# Make changes
git add .
git commit -m "Update website content"
git push

# GitHub Actions will automatically deploy!
```

### Manual Deployment Trigger

1. Go to repository → **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### Verify Deployment

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

---

## Verification Checklist

### Pre-Deployment

- [ ] All HTML is valid (no syntax errors)
- [ ] All CSS is loading correctly
- [ ] All JavaScript is working without console errors
- [ ] All images and assets are loading
- [ ] Site is responsive on mobile devices
- [ ] All internal links are working
- [ ] Site has proper `<title>` and `<meta>` tags

### Post-Deployment

- [ ] Site is accessible at GitHub Pages URL
- [ ] All pages load correctly on live site
- [ ] SSL certificate is active (https://)
- [ ] No mixed content warnings
- [ ] Performance is acceptable (use Lighthouse)

### SEO Checklist

- [ ] Unique `<title>` tag on each page
- [ ] Meta description present
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text on all images
- [ ] Mobile-friendly design

---

## Troubleshooting

### Site Not Deploying

**Problem**: GitHub Actions workflow not running.

**Solution**:
1. Check if workflow file exists at `.github/workflows/deploy.yml`
2. Verify YAML syntax is correct
3. Check Actions tab for error messages

### 404 Error

**Problem**: Site shows 404 after deployment.

**Solution**:
1. Ensure `index.html` exists in root directory
2. Check file names are lowercase
3. Wait 5-10 minutes for propagation

### CSS/JS Not Loading

**Problem**: Styles or scripts not applying.

**Solution**:
1. Use relative paths: `./styles/main.css` not `/styles/main.css`
2. Check browser console for errors
3. Verify file paths match actual file locations

### Custom Domain Issues

**Problem**: Custom domain not working.

**Solution**:
1. Create `CNAME` file in repository root with your domain
2. Configure DNS with your domain provider
3. Wait up to 24 hours for DNS propagation

### Build Failures

**Problem**: GitHub Actions workflow fails.

**Solution**:
1. Check the Actions tab for detailed error logs
2. Verify all required files exist
3. Ensure no large files exceed GitHub's limits (100MB)

---

## Quick Reference

### Essential Commands

```bash
# Initialize repository
git init

# Add files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Force push (use carefully!)
git push -f origin main
```

### File Naming Conventions

- Use lowercase for all file/folder names
- Use hyphens for multi-word names: `my-page.html`
- Main page must be `index.html`
- No spaces in file names

### GitHub Pages URL Pattern

```
https://USERNAME.github.io/REPOSITORY-NAME/
https://USERNAME.github.io/REPOSITORY-NAME/page.html
```

---

## Example: TDEE Calculator Deployment

For the TDEE Calculator project:

```bash
# 1. Navigate to project
cd c:\Users\felix\TDEE

# 2. Initialize Git (if not already)
git init

# 3. Copy HTML to index.html
copy "tdee-calculator-standalone.html" "index.html"

# 4. Create workflows directory
mkdir .github
mkdir .github\workflows

# 5. Create deploy.yml (use template from this skill)

# 6. Add and commit
git add .
git commit -m "Initial: TDEE Calculator for GitHub Pages"

# 7. Create GitHub repo and push
gh repo create TDEE-Calculator --public --source=. --push

# 8. Enable GitHub Pages (Settings → Pages → GitHub Actions)

# 9. Your site will be live at:
# https://YOUR_USERNAME.github.io/TDEE-Calculator/
```
