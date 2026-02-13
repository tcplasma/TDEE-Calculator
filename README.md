# TDEE Calculator

A professional Total Daily Energy Expenditure (TDEE) calculator implementing the **NASEM 2023** *Dietary Reference Intakes for Energy* standard with full-spectrum age coverage.

## Features

- **NASEM 2023 Standard**: Full implementation of EER equations from the National Academies (2023), based on the global Doubly Labeled Water (DLW) database covering the **general population** (including overweight/obese individuals).
- **Three-Tier Age Engine**: Infant (0-2.99y), Pediatric (3-18.99y), Adult (19+) — each with dedicated TEE equations.
- **Per-PAL Coefficients**: Unique regression coefficients for each of the 4 Physical Activity Levels (Inactive, Low Active, Active, Very Active) per sex and age group.
- **Step-Count PAL Guidance**: Activity levels include step-count ranges and lifestyle descriptions for accurate self-assessment.
- **Growth Increment (G)**: Age- and sex-specific energy cost of growth for all individuals under 19.
- **Infant Precision**: Month-level age input for infants (0-35 months) as required by NASEM 2023 specification.
- **SEPV Confidence Interval**: Displays 96% CI around the EER point estimate (Male RMSE 339 ±664 kcal, Female RMSE 246 ±482 kcal).
- **Pregnancy Formula (2023)**: `EER = TEE + 9.16 × Gestation(wk) + Energy Deposition(BMI)` with precise gestation weeks input and pre-pregnancy BMI category selection (UW/NW/OW/OB). 1st trimester explicitly handled as no change.
- **Lactation**: 0-6 months exclusive (+400 kcal/d) and 7-12 months partial (+380 kcal/d).
- **AMDR Pie Chart**: Filled SVG pie chart showing Macronutrient Distribution with NASEM AMDR gram ranges.
- **WHO Guidelines**: Sodium (< 2,000 mg/day), Free Sugars (< 5% TDEE), Added Sugars (< 10% TDEE).
- **Micronutrient Goals**: Potassium AI (NASEM), age- and sex-adjusted.

## Live Demo

Visit: [https://tcplasma.github.io/TDEE-Calculator/](https://tcplasma.github.io/TDEE-Calculator/)

## Calculation Formulas

> Variables: **A** = Age (years), **H** = Height (cm), **W** = Weight (kg)

### 1. Basal Metabolic Rate (BMR) — Display Only
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

### 2. Total Energy Expenditure — TEE (NASEM 2023)

Formula structure: `TEE = C + (A_coeff × Age) + (H_coeff × Height) + (W_coeff × Weight)`

#### Infants (0-2.99y)
- Male: `-716.45 - 1.00A + 17.82H + 15.06W`
- Female: `-69.15 + 80.0A + 2.65H + 54.15W`

#### Boys (3-18.99y) — Age coefficient: **3.68**
| PAL | C | H | W |
|-----|------|-------|-------|
| Inactive | -447.51 | 13.01 | 13.15 |
| Low Active | 19.12 | 8.62 | 20.28 |
| Active | -388.19 | 12.66 | 20.46 |
| Very Active | -671.75 | 15.38 | 23.25 |

#### Girls (3-18.99y) — Age coefficient: **-22.25**
| PAL | C | H | W |
|-----|------|-------|-------|
| Inactive | 55.59 | 8.43 | 17.07 |
| Low Active | -297.54 | 12.77 | 14.73 |
| Active | -189.55 | 11.74 | 18.34 |
| Very Active | -709.59 | 18.22 | 14.25 |

#### Adult Men (19+) — Age coefficient: **-10.83**
| PAL | C | H | W |
|-----|------|------|-------|
| Inactive | 753.07 | 6.50 | 14.10 |
| Low Active | 581.47 | 8.30 | 14.94 |
| Active | 1004.82 | 6.52 | 15.91 |
| Very Active | -517.88 | 15.61 | 19.11 |

#### Adult Women (19+) — Age coefficient: **-7.01**
| PAL | C | H | W |
|-----|------|------|-------|
| Inactive | 584.90 | 5.72 | 11.71 |
| Low Active | 575.77 | 6.60 | 12.14 |
| Active | 710.25 | 6.54 | 12.34 |
| Very Active | 511.83 | 9.07 | 12.56 |

### 3. Growth Increment — G (kcal/d)

`EER = TEE + G` for all individuals under 19.

| Age Range | Male | Female |
|-----------|------|--------|
| 0-2.99 months | +200 | +180 |
| 3-5.99 months | +50 | +60 |
| 6-11.99 months | +20 | +20 |
| 12-35.99 months | +20 | +15 |
| 3 years | +20 | +15 |
| 4-8 years | +15 | +15 |
| 9-13 years | +25 | +30 |
| 14-18 years | +20 | +20 |

### 4. Pregnancy (NASEM 2023)

`EER = TEE + (9.16 × Gestation_weeks) + Energy_Deposition`

- **1st Trimester (0-12 wk)**: No energy adjustment; uses standard non-pregnant EER.
- **2nd/3rd Trimester**: Activated for gestation ≥ 13 weeks. User inputs precise gestation weeks.

Energy Deposition by pre-pregnancy BMI:

| BMI Category | Energy Deposition |
|--------------|-------------------|
| Underweight (< 18.5) | +300 kcal/d |
| Normal Weight (18.5-24.9) | +200 kcal/d |
| Overweight (25.0-29.9) | +150 kcal/d |
| Obese (≥ 30) | -50 kcal/d |

### 5. Lactation

| Period | Formula |
|--------|---------|
| 0-6 months (exclusive) | TEE + 540 - 140 = TEE + 400 |
| 7-12 months (partial) | TEE + 380 |

### 6. Macronutrient Distribution (AMDR)

- **Target Percentages (Maintenance)**: Protein 20%, Fat 30%, Carbs 50%
- **AMDR Gram Ranges** (displayed on pie chart):
  - Protein: `(TDEE × 0.10) / 4` to `(TDEE × 0.35) / 4`
  - Fat: `(TDEE × 0.20) / 9` to `(TDEE × 0.35) / 9`
  - Carbs: `(TDEE × 0.45) / 4` to `(TDEE × 0.65) / 4`

### 7. Nutritional Guidelines

- **Sodium**: < 2,000 mg/day (WHO 2023, stricter than NASEM CDRR 2,300 mg)
- **Potassium**: NASEM AI — Male 19+ 3,400 mg, Female 19+ 2,600 mg, <19 2,300 mg
- **Free Sugars**: < 5% of TDEE (WHO conditional)
- **Added Sugars**: < 10% of TDEE (WHO strong recommendation)

### 8. Weight Management Guidelines (NASEM 2023)

Targets are calculated using the **Standard Error of Predicted Values (SEPV)** to ensure effectiveness beyond physiological variation.

| Sex | SEPV | 96% CI (±1.96 × SEPV) |
|-----|------|-----------------------|
| Male | 342 kcal | ±670 kcal |
| Female | 241 kcal | ±472 kcal |

#### Goal Formulas

1. **Maintenance**: `Target = TDEE`
   - Aim for energy balance.

2. **Weight Loss**: `Target = TDEE - (1.96 × SEPV)`
   - Creates a deficit exceeding the prediction error to ensure weight loss for the majority.
   - **Safe Rate**: 0.5 - 1.0 lb/week (0.23 - 0.45 kg/week).
   - *Benefits*: For obese adults, intentional weight loss is associated with 18% lower all-cause mortality.

3. **Weight Gain**: `Target = TDEE + (1.96 × SEPV)`
   - Creates a surplus exceeding the prediction error.
   - **Safe Rate**: ~0.5 lb/week (0.23 kg/week).

4. **Muscle Gain**: `Target = TDEE + 250 to 500 kcal`
   - Conservative surplus to support hypertrophy while minimizing fat gain.
   - **Protein Target**: 20% of total calories (within AMDR).

### 9. Unit Conversions
- **Weight**: `1 kg = 2.20462 lb`
- **Height**: `1 inch = 2.54 cm`
- **Backend**: All calculations enforced in cm/kg; frontend converts for display only.

## Limitations & Exclusions

- Not applicable to individuals with **PAL > 2.5** (elite athletes, extreme manual labor).
- Not applicable to individuals with specific metabolic conditions affecting energy expenditure.
- EER is a **predicted starting point**. Long-term body weight monitoring is the ultimate biological indicator of energy adequacy.
- Self-reported dietary records typically underreport intake by 8–30%.

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