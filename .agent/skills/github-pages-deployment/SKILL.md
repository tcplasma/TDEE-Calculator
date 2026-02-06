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

## Modern Web Design Principles

To ensure your web applications are not just functional but also **beautiful and state-of-the-art**, adhere to these design standards:

### 1. Rich Aesthetics
- **Vibrant Color Palettes**: Avoid flat, generic colors. Use curated gradients (e.g., `linear-gradient(135deg, #0099ff 0%, #0c98fc 100%)`).
- **Glassmorphism**: Use translucent backgrounds with blur effects for a premium feel.
  ```css
  .modern-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  }
  ```
- **Depth & Dimension**: Use subtle shadows and layered elements to create a sense of space.

### 2. Premium Typography
- **Google Fonts**: Always import and use modern typography. 
  - *Serif*: Playfair Display, Lora.
  - *Sans-Serif*: Outfit, Inter, Montserrat, Roboto.
- **Dynamic Sizing**: Use `rem` or `vw` for scalable typography.

### 3. Dynamic Design & Micro-animations
- **Interactive States**: Every button or clickable element should have a smooth hover or active transition.
  ```css
  .btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  ```
- **Lively Interfaces**: Use micro-animations to reward user interaction (e.g., subtle scaling on input focus).

### 4. Responsive & Accessible
- **Mobile First**: Design for small screens first, then scale up.
- **Semantic HTML**: Use structures that are meaningful for both users and search engines.

---

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
