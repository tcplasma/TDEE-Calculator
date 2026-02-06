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

## Calculation Formulas

### 1. Basal Metabolic Rate (BMR)
- **Adults (19+)**: Mifflin-St Jeor Equation
  - Male: `10W + 6.25H - 5A + 5`
  - Female: `10W + 6.25H - 5A - 161`
- **Infants (0-3y)**: `61.0W - 51`
- **Children (3-10y)**:
  - Male: `22.7W + 495`
  - Female: `22.5W + 499`
- **Adolescents (10-18y)**:
  - Male: `17.686W + 658.2H(m) - 618.6`
  - Female: `13.384W + 692.6H(m) - 360.2`

### 2. Total Daily Energy Expenditure (TDEE / EER)
Based on NASEM 2023 Linear Regression Equations.

#### Adults (19+)
- **Men**:
  - Inactive: `753.07 - 10.83A + 6.50H + 14.10W`
  - Low Active: `581.47 - 10.83A + 8.30H + 14.94W`
  - Active: `1004.82 - 10.83A + 6.52H + 15.91W`
  - Very Active: `-517.88 - 10.83A + 15.61H + 19.11W`
- **Women**:
  - Inactive: `584.90 - 7.01A + 5.72H + 11.71W`
  - Low Active: `575.77 - 7.01A + 6.60H + 12.14W`
  - Active: `710.25 - 7.01A + 6.54H + 12.34W`
  - Very Active: `511.83 - 7.01A + 9.07H + 12.56W`

#### Physiological Adjustments
- **Pregnancy**: +340 kcal (T2), +450 kcal (T3)
- **Lactation (0-6m)**: +400 kcal

### 3. Macronutrient Distribution (AMDR)
- **Target Percentages by Goal**:
  - **Maintenance**: Protein 20%, Fat 30%, Carbs 50%
  - **Weight Loss**: Protein 35%, Fat 25%, Carbs 40%
  - **Muscle Gain**: Protein 25%, Fat 25%, Carbs 50%

- **AMDR Gram Range Formulas**:
  The displayed range is based on the NASEM Acceptable Macronutrient Distribution Ranges:
  - **Protein Range (g)**: `(Target TDEE × 0.10) / 4` to `(Target TDEE × 0.35) / 4`
  - **Fat Range (g)**: `(Target TDEE × 0.20) / 9` to `(Target TDEE × 0.35) / 9`
  - **Carbs Range (g)**: `(Target TDEE × 0.45) / 4` to `(Target TDEE × 0.65) / 4`

*(Note: Target TDEE is adjusted based on goal: Loss = TDEE-500, Gain = TDEE+300, Maintain = TDEE)*

### 4. Unit Conversions
- **Weight**: `1 kg = 2.20462 lb`
- **Height**: `1 inch = 2.54 cm`

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