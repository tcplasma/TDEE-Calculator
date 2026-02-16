/**
 * NASEM 2023 TDEE/EER Calculation Logic
 */

/**
 * Determines the formula name based on age.
 * @param {number} age - Age in years.
 * @returns {string} Name of the NASEM guideline used.
 */
function getFormulaName(age) {
    if (age < 3) return 'NASEM 2023 (Infant)';
    if (age < 19) return 'NASEM 2023 (Child/Teen)';
    return 'NASEM 2023 (Adult)';
}

/**
 * Calculates Estimated Energy Requirement (EER) based on NASEM 2023 standards.
 * @param {number} age - Age in years (can be fractional for infants).
 * @param {number} weight - Weight in kg.
 * @param {number} height - Height in cm.
 * @param {string} gender - 'male' or 'female'.
 * @param {string} activity - 'inactive', 'low', 'active', 'very'.
 * @param {string} pregnancy - 'none', 'p1', 'p2', 'p3'.
 * @param {string} lactation - 'none', 'l1', 'l2'.
 * @param {string} prePregBMI - 'uw', 'nw', 'ow', 'ob'.
 * @param {number} gestationWeeks - Weeks of gestation (13-40).
 * @returns {number} Total Daily Energy Expenditure (kcal/day).
 */
function calculateEER(age, weight, height, gender, activity, pregnancy, lactation, prePregBMI, gestationWeeks) {
    // NASEM 2023 DRI Equations (Full Implementation)
    const W = weight; // kg
    const A = age;    // years (fractional for infants)
    const H = height; // cm
    let tee = 0;
    let G = 0; // Growth increment

    if (age < 3) {
        // ── Infant TEE (0-2.99y) ──
        if (gender === 'male') {
            tee = -716.45 - (1.00 * A) + (17.82 * H) + (15.06 * W);
        } else {
            tee = -69.15 + (80.0 * A) + (2.65 * H) + (54.15 * W);
        }
        // Infant Growth Increment (age in months = A * 12)
        const ageMonths = A * 12;
        if (ageMonths < 3) {
            G = (gender === 'male') ? 200 : 180;
        } else if (ageMonths < 6) {
            G = (gender === 'male') ? 50 : 60;
        } else {
            // 6-35.99 months: Male +20, Female 12-35.99mo +15, Female 6-11.99mo +20
            G = (gender === 'female' && ageMonths >= 12) ? 15 : 20;
        }

    } else if (age < 19) {
        // ── Pediatric TEE (3-18.99y) ── per-PAL coefficients
        if (gender === 'male') {
            // Boys: Age coefficient A = 3.68
            switch (activity) {
                case 'inactive': tee = -447.51 + (3.68 * A) + (13.01 * H) + (13.15 * W); break;
                case 'low': tee = 19.12 + (3.68 * A) + (8.62 * H) + (20.28 * W); break;
                case 'active': tee = -388.19 + (3.68 * A) + (12.66 * H) + (20.46 * W); break;
                case 'very': tee = -671.75 + (3.68 * A) + (15.38 * H) + (23.25 * W); break;
            }
        } else {
            // Girls: Age coefficient A = -22.25
            switch (activity) {
                case 'inactive': tee = 55.59 + (-22.25 * A) + (8.43 * H) + (17.07 * W); break;
                case 'low': tee = -297.54 + (-22.25 * A) + (12.77 * H) + (14.73 * W); break;
                case 'active': tee = -189.55 + (-22.25 * A) + (11.74 * H) + (18.34 * W); break;
                case 'very': tee = -709.59 + (-22.25 * A) + (18.22 * H) + (14.25 * W); break;
            }
        }
        // Pediatric Growth Increment G (3-18y)
        if (age <= 3) G = (gender === 'male') ? 20 : 15;
        else if (age <= 8) G = 15;
        else if (age <= 13) G = (gender === 'male') ? 25 : 30;
        else G = 20; // 14-18y

    } else {
        // ── Adult TEE (19+) ──
        if (gender === 'male') {
            switch (activity) {
                case 'inactive': tee = 753.07 - (10.83 * A) + (6.50 * H) + (14.10 * W); break;
                case 'low': tee = 581.47 - (10.83 * A) + (8.30 * H) + (14.94 * W); break;
                case 'active': tee = 1004.82 - (10.83 * A) + (6.52 * H) + (15.91 * W); break;
                case 'very': tee = -517.88 - (10.83 * A) + (15.61 * H) + (19.11 * W); break;
            }
        } else {
            switch (activity) {
                case 'inactive': tee = 584.90 - (7.01 * A) + (5.72 * H) + (11.71 * W); break;
                case 'low': tee = 575.77 - (7.01 * A) + (6.60 * H) + (12.14 * W); break;
                case 'active': tee = 710.25 - (7.01 * A) + (6.54 * H) + (12.34 * W); break;
                case 'very': tee = 511.83 - (7.01 * A) + (9.07 * H) + (12.56 * W); break;
            }
        }
    }

    // EER = TEE + G (for age < 19)
    let eer = tee + G;

    // ── Pregnancy Adjustment (Female, Gestation >= 13 wk) ──
    if (gender === 'female' && (pregnancy === 'p2' || pregnancy === 'p3')) {
        // Use actual gestation weeks from input
        const gestWeeks = gestationWeeks || ((pregnancy === 'p2') ? 20 : 34);
        // Energy Deposition by pre-pregnancy BMI category
        const edMap = { uw: 300, nw: 200, ow: 150, ob: -50 };
        const ed = edMap[prePregBMI] || 200;
        eer += (9.16 * gestWeeks) + ed;
    }

    // ── Lactation Adjustment ──
    if (gender === 'female' && lactation !== 'none') {
        if (lactation === 'l1') eer += (540 - 140); // 0-6mo exclusive
        if (lactation === 'l2') eer += 380;          // 7-12mo partial
    }

    return eer;
}
