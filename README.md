# TDEE Calculator

A professional Total Daily Energy Expenditure (TDEE) calculator with age-specific BMR formulas.

## Features

- **NASEM 2023 Standard**: Implements latest Estimated Energy Requirement (EER) equations from the National Academies' *Dietary Reference Intakes for Energy* (2023).
- **Scientific Formulas**: 
  - **Adults**: Uses direct linear regression equations (Doubly Labeled Water database) for 4 PAL categories.
  - **Pediatric**: Schofield and NASEM-specific growth cost refinements.
- **AMDR Implementation**: Macronutrient ranges based on *Acceptable Macronutrient Distribution Ranges*:
  - Protein: 10-35%
  - Fat: 20-35%
  - Carbs: 45-65%
- **Micronutrient Goals**: Sodium CDRR (<2,300mg) and Potassium AI recommendations.
- **Interactive Goals**: Dynamic macro distribution adjustment for Weight Loss, Maintenance, and Muscle Gain.

## Live Demo

Visit: [https://tcplasma.github.io/TDEE-Calculator/](https://tcplasma.github.io/TDEE-Calculator/)

## Technology Stack

- Pure HTML5, CSS3, JavaScript
- No external dependencies
- Palau Food Nutrition design system

## Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages.

### To Deploy

1. Push changes to the `master` branch
2. GitHub Actions will automatically deploy to GitHub Pages
3. Enable GitHub Pages in repository Settings → Pages → Source: GitHub Actions