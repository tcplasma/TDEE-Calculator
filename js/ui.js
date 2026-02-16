
// Application State
let state = {
    gender: 'male',
    unit: 'metric',
    activityLevel: 'low',
    goal: 'maintain'
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initial calculation
    calculate();
});

// UI Handlers
function setGender(g) {
    state.gender = g;
    document.getElementById('maleBtn').classList.toggle('active', g === 'male');
    document.getElementById('femaleBtn').classList.toggle('active', g === 'female');
    document.getElementById('femaleOnlyFields').style.display = g === 'female' ? 'block' : 'none';
    calculate();
}

function setUnit(u) {
    state.unit = u;
    document.getElementById('metricBtn').classList.toggle('active', u === 'metric');
    document.getElementById('imperialBtn').classList.toggle('active', u === 'imperial');

    document.getElementById('heightMetric').style.display = u === 'metric' ? 'block' : 'none';
    document.getElementById('heightImperial').style.display = u === 'imperial' ? 'block' : 'none';
    document.getElementById('weightLabel').textContent = u === 'metric' ? 'Weight (kg)' : 'Weight (lb)';

    // Convert values
    if (u === 'imperial') {
        const cm = parseFloat(document.getElementById('height').value);
        const totalIn = cm / 2.54;
        document.getElementById('heightFt').value = Math.floor(totalIn / 12);
        document.getElementById('heightIn').value = Math.round(totalIn % 12);
        document.getElementById('weight').value = Math.round(parseFloat(document.getElementById('weight').value) * 2.20462);
    } else {
        const ft = parseInt(document.getElementById('heightFt').value) || 0;
        const inches = parseInt(document.getElementById('heightIn').value) || 0;
        document.getElementById('height').value = Math.round((ft * 12 + inches) * 2.54);
        document.getElementById('weight').value = Math.round(parseFloat(document.getElementById('weight').value) / 2.20462);
    }
    calculate();
}

function setActivity(val) {
    state.activityLevel = val;
    const levels = ['inactive', 'low', 'active', 'very'];
    document.querySelectorAll('.activity-option').forEach((el, i) => {
        el.classList.toggle('active', levels[i] === val);
    });
    calculate();
}

function setGoal(val) {
    state.goal = val;
    document.getElementById('goalMaintain').classList.toggle('active', val === 'maintain');
    document.getElementById('goalCut').classList.toggle('active', val === 'cut');
    document.getElementById('goalBulk').classList.toggle('active', val === 'bulk');
    calculate();
}

function onAgeChange() {
    const age = parseInt(document.getElementById('age').value) || 0;
    document.getElementById('monthsGroup').style.display = age < 3 ? 'block' : 'none';
    if (age >= 3) calculate();
}

function onPregnancyChange() {
    const preg = document.getElementById('pregnancy').value;
    const isPregnant = (preg === 'p2' || preg === 'p3');
    document.getElementById('bmiGroup').style.display = isPregnant ? 'block' : 'none';
    document.getElementById('gestWeeksGroup').style.display = isPregnant ? 'block' : 'none';
    // Set default gestation weeks for selected trimester
    if (preg === 'p2') document.getElementById('gestWeeks').value = 20;
    if (preg === 'p3') document.getElementById('gestWeeks').value = 34;
    calculate();
}

function updatePieChart(tdee, goal) {
    // Filled SVG Pie Chart with AMDR ranges on slices
    // NASEM AMDR: Protein 10-35%, Fat 20-35%, Carbs 45-65%
    // Target: P 20%, F 30%, C 50%
    const cx = 110, cy = 110, r = 90;

    // Adjust label based on goal
    let goalLabel = 'Maintenance';
    if (goal === 'cut') goalLabel = 'Weight Loss';
    if (goal === 'bulk') goalLabel = 'Muscle Gain';

    // Compute exact grams for the target TDEE (20% P, 30% F, 50% C)
    const pGrams = Math.round(tdee * 0.20 / 4);
    const fGrams = Math.round(tdee * 0.30 / 9);
    const cGrams = Math.round(tdee * 0.50 / 4);

    // Compute AMDR gram ranges (for slices)
    const pLow = Math.round(tdee * 0.10 / 4), pHigh = Math.round(tdee * 0.35 / 4);
    const fLow = Math.round(tdee * 0.20 / 9), fHigh = Math.round(tdee * 0.35 / 9);
    const cLow = Math.round(tdee * 0.45 / 4), cHigh = Math.round(tdee * 0.65 / 4);

    const slices = [
        { pct: 0.50, color: '#0099ff', label: 'Carbs', range: `${cLow}-${cHigh}g`, amdr: '45-65%', textColor: 'white' },
        { pct: 0.30, color: '#E4C859', label: 'Fat', range: `${fLow}-${fHigh}g`, amdr: '20-35%', textColor: '#2d3748' },
        { pct: 0.20, color: '#ff6b6b', label: 'Protein', range: `${pLow}-${pHigh}g`, amdr: '10-35%', textColor: 'white' }
    ];

    let startAngle = -Math.PI / 2;
    let svg = '';

    slices.forEach(s => {
        const endAngle = startAngle + s.pct * 2 * Math.PI;
        const largeArc = s.pct > 0.5 ? 1 : 0;

        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);

        svg += `<path d="M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)} Z" fill="${s.color}" />`;

        // Labels at midpoint of arc
        const midAngle = (startAngle + endAngle) / 2;
        const labelR = r * 0.58;
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);

        svg += `<text x="${lx.toFixed(1)}" y="${(ly - 8).toFixed(1)}" text-anchor="middle" fill="${s.textColor}" font-size="11" font-weight="700" font-family="Outfit,sans-serif">${s.label}</text>`;
        svg += `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" text-anchor="middle" fill="${s.textColor}" font-size="9" font-weight="600" font-family="Outfit,sans-serif">${s.amdr}</text>`;
        svg += `<text x="${lx.toFixed(1)}" y="${(ly + 17).toFixed(1)}" text-anchor="middle" fill="${s.textColor}" font-size="9" font-weight="700" font-family="Outfit,sans-serif">${s.range}</text>`;

        startAngle = endAngle;
    });

    document.getElementById('pieChartSvg').innerHTML = svg;

    // Update Legend Text
    document.getElementById('chartLegendTitle').innerHTML = `<strong style="color: var(--text-main);">Target (${goalLabel})</strong><br>`;
    document.getElementById('chartLegendValues').innerHTML =
        `Protein 20% (<span style="color:#ff6b6b;font-weight:700">${pGrams}g</span>) · ` +
        `Fat 30% (<span style="color:#E4C859;font-weight:700">${fGrams}g</span>) · ` +
        `Carbs 50% (<span style="color:#0099ff;font-weight:700">${cGrams}g</span>)`;
}


function calculate() {
    let age = parseInt(document.getElementById('age').value) || 25;
    // For infants (age < 3), use months input for fractional year precision
    if (age < 3) {
        const months = parseInt(document.getElementById('ageMonths').value) || 0;
        age = months / 12; // Convert to fractional years for formula
    }
    const pregnancy = document.getElementById('pregnancy').value;
    const lactation = document.getElementById('lactation').value;
    const prePregBMI = document.getElementById('prePregBMI').value;
    const gestWeeks = parseInt(document.getElementById('gestWeeks').value) || 20;
    let weight, height;

    if (state.unit === 'metric') {
        weight = parseFloat(document.getElementById('weight').value) || 70;
        height = parseFloat(document.getElementById('height').value) || 170;
    } else {
        const ft = parseInt(document.getElementById('heightFt').value) || 0;
        const inches = parseInt(document.getElementById('heightIn').value) || 0;
        height = (ft * 12 + inches) * 2.54;
        weight = (parseFloat(document.getElementById('weight').value) || 154) / 2.20462;
    }

    const tdee = calculateEER(age, weight, height, state.gender, state.activityLevel, pregnancy, lactation, prePregBMI, gestWeeks);

    // SEPV 96% Confidence Interval (NASEM 2023: Male 342, Female 241)
    const sepv = (state.gender === 'male') ? 342 : 241;
    const ci = Math.round(1.96 * sepv);
    const tdeeLow = Math.max(0, Math.round(tdee) - ci);
    const tdeeHigh = Math.round(tdee) + ci;

    let bmrDisplay;
    if (age >= 19) {
        bmrDisplay = (state.gender === 'male')
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        const H_m = height / 100;
        if (age < 3) bmrDisplay = 61.0 * weight - 51;
        else if (age < 10) bmrDisplay = (state.gender === 'male') ? 22.7 * weight + 495 : 22.5 * weight + 499;
        else bmrDisplay = (state.gender === 'male') ? 17.686 * weight + 658.2 * H_m - 618.6 : 13.384 * weight + 692.6 * H_m - 360.2;
    }

    document.getElementById('bmrValue').textContent = Math.round(bmrDisplay).toLocaleString();
    document.getElementById('tdeeValue').textContent = Math.round(tdee).toLocaleString();
    document.getElementById('tdeeLow').textContent = tdeeLow.toLocaleString();
    document.getElementById('tdeeHigh').textContent = tdeeHigh.toLocaleString();
    document.getElementById('formulaBadge').textContent = 'Standard: ' + getFormulaName(age);

    // Goals (NASEM 2023 Guidelines)
    // Weight Loss: Safe Rate 0.5 - 1.0 lb/week (250 - 500 kcal/day deficit) based on README
    const cutMin = Math.round(tdee - 500);
    const cutMax = Math.round(tdee - 250);
    document.getElementById('cutValue').textContent = `${cutMin.toLocaleString()} - ${cutMax.toLocaleString()}`;

    // Maintain: TDEE
    document.getElementById('maintainValue').textContent = Math.round(tdee).toLocaleString();

    // Muscle Gain: TDEE + 250-500 kcal
    const bulkLow = Math.round(tdee + 250);
    const bulkHigh = Math.round(tdee + 500);
    document.getElementById('bulkValue').textContent = `${bulkLow.toLocaleString()} - ${bulkHigh.toLocaleString()}`;

    // Calculate Target TDEE based on current goal
    let targetTdee = tdee;
    if (state.goal === 'cut') targetTdee = cutMin; // Default to -500 deficit for chart
    if (state.goal === 'bulk') targetTdee = Math.round((bulkLow + bulkHigh) / 2); // Use midpoint for chart

    // Pie chart shows AMDR ranges based on Target TDEE (Dynamic)
    updatePieChart(targetTdee, state.goal);

    // Micronutrients (NASEM + WHO)
    // Sodium: WHO recommends < 2,000 mg/day (stricter than NASEM 2,300)
    const sodiumLimit = 2000;
    let potassiumGoal = (age >= 19) ? (state.gender === 'male' ? 3400 : 2600) : 2300;

    document.getElementById('sodiumValue').textContent = `< ${sodiumLimit.toLocaleString()} mg`;
    document.getElementById('potassiumValue').textContent = `> ${potassiumGoal.toLocaleString()} mg`;

    // Sugar: WHO recommends < 10% of TDEE (strong), < 5% (conditional)
    // 1g sugar = 4 kcal
    const sugar5 = Math.round(tdee * 0.05 / 4);
    const sugar10 = Math.round(tdee * 0.10 / 4);
    document.getElementById('sugarValue5').textContent = `< ${sugar5}g/day`;
    document.getElementById('sugarValue10').textContent = `< ${sugar10}g/day`;
}
