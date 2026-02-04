# Example Project Structure for GitHub Pages

This document shows the recommended file organization for deploying static websites to GitHub Pages.

## Basic Structure

```
my-website/
├── index.html              # Main entry point (REQUIRED)
├── .gitignore              # Git ignore file
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
└── README.md               # Project documentation
```

## Full Structure (Recommended)

```
my-website/
├── index.html              # Main entry point
├── about.html              # Additional pages
├── contact.html
│
├── styles/                 # CSS files
│   ├── main.css           # Primary styles
│   ├── responsive.css     # Media queries
│   └── variables.css      # CSS custom properties
│
├── scripts/                # JavaScript files
│   ├── main.js            # Primary scripts
│   └── components/        # Modular JS
│       ├── calculator.js
│       └── navigation.js
│
├── assets/                 # Static assets
│   ├── images/
│   │   ├── logo.png
│   │   └── hero-bg.jpg
│   ├── fonts/
│   └── icons/
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
│
├── .gitignore
└── README.md
```

## TDEE Calculator Structure

For the TDEE Calculator project specifically:

```
TDEE/
├── index.html                          # Renamed from tdee-calculator-standalone.html
├── tdee-calculator-standalone.html     # Original file (optional backup)
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── .agent/
│   └── skills/
│       └── github-pages-deployment/    # This skill
│
├── .gitignore
└── README.md
```

## Key Points

1. **index.html is required** - GitHub Pages uses this as the entry point
2. **Use relative paths** - `./styles/main.css` not `/styles/main.css`
3. **Lowercase filenames** - Avoid case sensitivity issues
4. **No spaces in names** - Use hyphens: `my-page.html`
