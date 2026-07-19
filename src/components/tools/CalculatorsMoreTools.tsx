import React, { useState } from 'react';

// 1. Scientific Calculator
export function ScientificCalculator({ language }: { language: 'en' | 'ar' }) {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');

  const handleBtn = (val: string) => {
    setExpr(prev => prev + val);
  };

  const handleClear = () => {
    setExpr('');
    setResult('');
  };

  const handleEvaluate = () => {
    try {
      // Safe visual evaluations inside Sandbox
      let cleanExpr = expr
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');

      const computed = new Function(`return ${cleanExpr}`)();
      setResult(Number(computed).toLocaleString(undefined, { maximumFractionDigits: 6 }));
    } catch {
      setResult(language === 'en' ? 'Syntax Error' : 'خطأ رياضي');
    }
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto p-4 rounded-2xl border border-slate-800 bg-slate-950">
      <div className="space-y-1 text-right bg-slate-900 border border-slate-850 p-3 rounded-xl min-h-[70px] flex flex-col justify-end">
        <span className="text-[10px] font-mono text-slate-500 overflow-x-auto block">{expr || '0'}</span>
        <span className="text-lg font-mono font-black text-emerald-400 block">{result || ' '}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-xs font-mono font-bold">
        <button onClick={handleClear} className="p-2.5 rounded-lg bg-red-600/15 text-red-400 hover:bg-red-600 hover:text-white cursor-pointer">AC</button>
        <button onClick={() => handleBtn('(')} className="p-2.5 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 cursor-pointer">(</button>
        <button onClick={() => handleBtn(')')} className="p-2.5 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 cursor-pointer">)</button>
        <button onClick={() => handleBtn('/')} className="p-2.5 rounded-lg bg-slate-900 text-blue-400 hover:bg-slate-800 cursor-pointer">/</button>

        <button onClick={() => handleBtn('sin(')} className="p-2.5 rounded-lg bg-slate-900/60 text-indigo-300 hover:bg-slate-800 cursor-pointer">sin</button>
        <button onClick={() => handleBtn('cos(')} className="p-2.5 rounded-lg bg-slate-900/60 text-indigo-300 hover:bg-slate-800 cursor-pointer">cos</button>
        <button onClick={() => handleBtn('tan(')} className="p-2.5 rounded-lg bg-slate-900/60 text-indigo-300 hover:bg-slate-800 cursor-pointer">tan</button>
        <button onClick={() => handleBtn('*')} className="p-2.5 rounded-lg bg-slate-900 text-blue-400 hover:bg-slate-800 cursor-pointer">*</button>

        <button onClick={() => handleBtn('log(')} className="p-2.5 rounded-lg bg-slate-900/60 text-indigo-300 hover:bg-slate-800 cursor-pointer">log</button>
        <button onClick={() => handleBtn('ln(')} className="p-2.5 rounded-lg bg-slate-900/60 text-indigo-300 hover:bg-slate-800 cursor-pointer">ln</button>
        <button onClick={() => handleBtn('√(')} className="p-2.5 rounded-lg bg-slate-900/60 text-indigo-300 hover:bg-slate-800 cursor-pointer">√</button>
        <button onClick={() => handleBtn('-')} className="p-2.5 rounded-lg bg-slate-900 text-blue-400 hover:bg-slate-800 cursor-pointer">-</button>

        <button onClick={() => handleBtn('7')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">7</button>
        <button onClick={() => handleBtn('8')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">8</button>
        <button onClick={() => handleBtn('9')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">9</button>
        <button onClick={() => handleBtn('+')} className="p-2.5 rounded-lg bg-slate-900 text-blue-400 hover:bg-slate-800 cursor-pointer">+</button>

        <button onClick={() => handleBtn('4')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">4</button>
        <button onClick={() => handleBtn('5')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">5</button>
        <button onClick={() => handleBtn('6')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">6</button>
        <button onClick={() => handleBtn('π')} className="p-2.5 rounded-lg bg-slate-900/60 text-emerald-400 hover:bg-slate-800 cursor-pointer">π</button>

        <button onClick={() => handleBtn('1')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">1</button>
        <button onClick={() => handleBtn('2')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">2</button>
        <button onClick={() => handleBtn('3')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">3</button>
        <button onClick={() => handleBtn('e')} className="p-2.5 rounded-lg bg-slate-900/60 text-emerald-400 hover:bg-slate-800 cursor-pointer">e</button>

        <button onClick={() => handleBtn('0')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer col-span-2">0</button>
        <button onClick={() => handleBtn('.')} className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">.</button>
        <button onClick={handleEvaluate} className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 cursor-pointer">=</button>
      </div>
    </div>
  );
}

// 2. GPA Calculator
export function GPACalculator({ language }: { language: 'en' | 'ar' }) {
  const [courses, setCourses] = useState([
    { grade: 'A', credits: 3 },
    { grade: 'B', credits: 4 },
    { grade: 'A', credits: 3 }
  ]);
  const [gpa, setGpa] = useState<string | null>(null);

  const gradePoints: Record<string, number> = {
    'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      totalPoints += (gradePoints[c.grade] || 0) * c.credits;
      totalCredits += Number(c.credits);
    });
    setGpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00');
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-left">
      <div className="space-y-2">
        {courses.map((c, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <span className="text-[11px] font-bold text-slate-500 font-mono w-16">Class {idx + 1}</span>
            <select
              value={c.grade}
              onChange={(e) => {
                const updated = [...courses];
                updated[idx].grade = e.target.value;
                setCourses(updated);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
            >
              {Object.keys(gradePoints).map(g => (
                <option key={g} value={g}>Grade: {g}</option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              max="5"
              value={c.credits}
              onChange={(e) => {
                const updated = [...courses];
                updated[idx].credits = Math.max(1, Number(e.target.value));
                setCourses(updated);
              }}
              className="w-20 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setCourses([...courses, { grade: 'A', credits: 3 }])}
          className="py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs"
        >
          ➕ {language === 'en' ? 'Add Course' : 'إضافة مساق'}
        </button>
        <button
          onClick={calculateGpa}
          className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
        >
          🎓 {language === 'en' ? 'Calculate GPA' : 'حساب المعدل'}
        </button>
      </div>

      {gpa !== null && (
        <div className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">Your Semester GPA</span>
          <span className="text-3xl font-black text-indigo-400 font-mono">{gpa} / 4.00</span>
        </div>
      )}
    </div>
  );
}

// 3. Compound Interest Calculator
export function CompoundInterestCalculator({ language }: { language: 'en' | 'ar' }) {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [contribution, setContribution] = useState(200);
  const [result, setResult] = useState<any>(null);

  const calculateInterest = () => {
    let balance = principal;
    const r = rate / 100;
    const n = 12; // Compounded monthly
    const totalMonths = years * 12;

    for (let m = 1; m <= totalMonths; m++) {
      balance = balance * (1 + r / n) + contribution;
    }

    const totalInvested = principal + contribution * totalMonths;
    const interestGained = Math.max(0, balance - totalInvested);

    setResult({
      finalBalance: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      interestGained: Math.round(interestGained)
    });
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-left">
      <div className="grid grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Initial Deposit' : 'الإيداع الأولي'}</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Annual Rate (%)' : 'الفائدة السنوية %'}</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Years' : 'المدة بالسنوات'}</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Monthly Addition' : 'الإضافة الشهرية'}</label>
          <input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
      </div>

      <button onClick={calculateInterest} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl">
        💰 {language === 'en' ? 'Calculate Interest' : 'احسب الأرباح المالية'}
      </button>

      {result && (
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850 text-center">
            <span className="text-sm font-bold text-slate-400 block">{language === 'en' ? 'Total Invested' : 'إجمالي المبالغ'}</span>
            <span className="text-xs font-mono font-bold text-white">${result.totalInvested.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850 text-center">
            <span className="text-sm font-bold text-slate-400 block">{language === 'en' ? 'Interest Gained' : 'إجمالي الفائدة'}</span>
            <span className="text-xs font-mono font-bold text-emerald-400">${result.interestGained.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850 text-center">
            <span className="text-sm font-bold text-slate-400 block">{language === 'en' ? 'Future Wealth' : 'الثروة المستقبلية'}</span>
            <span className="text-xs font-mono font-bold text-blue-400">${result.finalBalance.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 4. Date Adder / Subtractor
export function DateCalculator({ language }: { language: 'en' | 'ar' }) {
  const [baseDate, setBaseDate] = useState(() => new Date().toISOString().substring(0, 10));
  const [days, setDays] = useState(30);
  const [resultDate, setResultDate] = useState('');

  const calculateDate = () => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + Number(days));
    setResultDate(d.toDateString() + ' / ' + d.toLocaleDateString());
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Select Base Date' : 'تاريخ البداية'}</label>
        <input type="date" value={baseDate} onChange={(e) => setBaseDate(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Days to Add (Negative to Subtract)' : 'عدد الأيام للإضافة أو الخصم'}</label>
        <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
      </div>

      <button onClick={calculateDate} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        📅 {language === 'en' ? 'Calculate New Date' : 'احسب التاريخ الجديد'}
      </button>

      {resultDate && (
        <div className="p-3 bg-slate-900 border border-slate-850 rounded-lg text-xs font-mono text-center font-bold text-emerald-400 select-all">
          {resultDate}
        </div>
      )}
    </div>
  );
}

// 5. BMR & TDEE Calculator
export function BMRTDEECalculator({ language }: { language: 'en' | 'ar' }) {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [activity, setActivity] = useState(1.375); // Light exercise
  const [result, setResult] = useState<any>(null);

  const calculateBmrTdee = () => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'm') bmr += 5;
    else bmr -= 161;

    const tdee = bmr * activity;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-left">
      <div className="grid grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Weight (kg)' : 'الوزن (كجم)'}</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Height (cm)' : 'الارتفاع (سم)'}</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Age (years)' : 'العمر'}</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Gender' : 'الجنس'}</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setGender('m')} className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'm' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>M</button>
            <button onClick={() => setGender('f')} className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'f' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>F</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Activity Level' : 'مستوى النشاط البدني'}</label>
        <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white">
          <option value="1.2">Sedentary (desk job)</option>
          <option value="1.375">Lightly Active (light exercise)</option>
          <option value="1.55">Moderately Active (exercise 3-5 days)</option>
          <option value="1.725">Very Active (hard exercise daily)</option>
        </select>
      </div>

      <button onClick={calculateBmrTdee} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        ⚡ {language === 'en' ? 'Calculate BMR & TDEE' : 'احسب احتياجك من السعرات البدنية'}
      </button>

      {result && (
        <div className="grid grid-cols-2 gap-3 pt-1 text-center font-mono">
          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
            <span className="text-[10px] text-slate-500 block">BMR (Basal Metabolic)</span>
            <span className="text-base font-black text-amber-400">{result.bmr} kcal</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
            <span className="text-[10px] text-slate-500 block">TDEE (Daily Calories)</span>
            <span className="text-base font-black text-emerald-400">{result.tdee} kcal</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 6. US Navy Body Fat Calculator
export function BodyFatCalculator({ language }: { language: 'en' | 'ar' }) {
  const [waist, setWaist] = useState(85);
  const [neck, setNeck] = useState(38);
  const [height, setHeight] = useState(175);
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [hip, setHip] = useState(90); // Needed for females
  const [fat, setFat] = useState<string | null>(null);

  const calculateBodyFat = () => {
    try {
      let bfp = 0;
      if (gender === 'm') {
        // Male Navy Body Fat Formula
        bfp = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
      } else {
        // Female Navy Body Fat Formula
        bfp = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
      }
      setFat(isNaN(bfp) ? 'Invalid' : Math.max(2, bfp).toFixed(1));
    } catch {
      setFat('Error');
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-left">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Gender' : 'الجنس'}</label>
          <div className="grid grid-cols-2 gap-1.5">
            <button onClick={() => setGender('m')} className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'm' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>M</button>
            <button onClick={() => setGender('f')} className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'f' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>F</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Waist Circum. (cm)' : 'محيط الخصر (سم)'}</label>
          <input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Neck Circum. (cm)' : 'محيط الرقبة (سم)'}</label>
          <input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Height (cm)' : 'الارتفاع بالسم'}</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
        {gender === 'f' && (
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Hip Circum. (cm)' : 'محيط الورك (سم)'}</label>
            <input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
          </div>
        )}
      </div>

      <button onClick={calculateBodyFat} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🔍 {language === 'en' ? 'Calculate Body Fat' : 'احسب نسبة الدهون بالبدن'}
      </button>

      {fat && (
        <div className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">Navy Formula Body Fat</span>
          <span className="text-3xl font-black text-purple-400 font-mono">{fat}%</span>
        </div>
      )}
    </div>
  );
}

// 7. Tip & Bill Splitter
export function TipCalculator({ language }: { language: 'en' | 'ar' }) {
  const [bill, setBill] = useState(100);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(2);
  const [result, setResult] = useState<any>(null);

  const calculateTip = () => {
    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;
    const share = total / people;
    const tipShare = tipAmount / people;

    setResult({
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      share: share.toFixed(2),
      tipShare: tipShare.toFixed(2)
    });
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <span className="block font-bold text-slate-400 mb-1">Bill ($)</span>
          <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">Tip (%)</span>
          <input type="number" value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">People</span>
          <input type="number" value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white" />
        </div>
      </div>

      <button onClick={calculateTip} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        💸 {language === 'en' ? 'Calculate Tip Split' : 'احسب تقسيم الفاتورة والإكرامية'}
      </button>

      {result && (
        <div className="grid grid-cols-2 gap-3 text-center font-mono">
          <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl">
            <span className="text-[9px] text-slate-500 block">Tip Per Person</span>
            <span className="text-sm font-bold text-blue-400">${result.tipShare}</span>
          </div>
          <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl">
            <span className="text-[9px] text-slate-500 block">Total Per Person</span>
            <span className="text-sm font-bold text-emerald-400">${result.share}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 8. Fuel Cost & Travel Planner
export function FuelCalculator({ language }: { language: 'en' | 'ar' }) {
  const [distance, setDistance] = useState(300);
  const [efficiency, setEfficiency] = useState(8); // Liters per 100km
  const [price, setPrice] = useState(1.5); // Price per Liter
  const [cost, setCost] = useState<string | null>(null);

  const calculateFuel = () => {
    const totalLiters = (distance / 100) * efficiency;
    const totalCost = totalLiters * price;
    setCost(totalCost.toFixed(2));
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <span className="block font-bold text-slate-400 mb-1">Dist (km)</span>
          <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">L/100km</span>
          <input type="number" value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">Price/L</span>
          <input type="number" step="0.1" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white" />
        </div>
      </div>

      <button onClick={calculateFuel} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🚗 {language === 'en' ? 'Plan Travel Fuel Cost' : 'احسب تكلفة استهلاك وقود السفر'}
      </button>

      {cost !== null && (
        <div className="p-3.5 bg-slate-900 border border-slate-850 rounded-xl text-center">
          <span className="text-[10px] text-slate-500 block">Estimated Total Fuel Cost</span>
          <span className="text-xl font-mono font-black text-emerald-400">${cost}</span>
        </div>
      )}
    </div>
  );
}

// 9. Salary / Hourly Pay Converter
export function SalaryConverter({ language }: { language: 'en' | 'ar' }) {
  const [salary, setSalary] = useState(50000);
  const [breakdown, setBreakdown] = useState<any>(null);

  const convertSalary = () => {
    const monthly = salary / 12;
    const weekly = salary / 52;
    const daily = weekly / 5;
    const hourly = weekly / 40;

    setBreakdown({
      monthly: Math.round(monthly).toLocaleString(),
      weekly: Math.round(weekly).toLocaleString(),
      daily: Math.round(daily).toLocaleString(),
      hourly: hourly.toFixed(2)
    });
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Enter Yearly Salary ($)' : 'أدخل الراتب السنوي بالتفصيل ($)'}</label>
        <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
      </div>

      <button onClick={convertSalary} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        💵 {language === 'en' ? 'Convert Pay Rates' : 'حساب تقسيم ومعدلات الراتب'}
      </button>

      {breakdown && (
        <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-2 text-xs font-mono" dir="ltr">
          <div className="flex justify-between border-b border-slate-950 pb-1">
            <span className="text-slate-500">Monthly:</span>
            <span className="text-slate-300 font-bold">${breakdown.monthly}</span>
          </div>
          <div className="flex justify-between border-b border-slate-950 pb-1">
            <span className="text-slate-500">Weekly:</span>
            <span className="text-slate-300 font-bold">${breakdown.weekly}</span>
          </div>
          <div className="flex justify-between border-b border-slate-950 pb-1">
            <span className="text-slate-500">Daily (5 days/wk):</span>
            <span className="text-slate-300 font-bold">${breakdown.daily}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Hourly (40h/wk):</span>
            <span className="text-emerald-400 font-bold">${breakdown.hourly} / hr</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 10. Binary Math Calculator
export function BinaryMath({ language }: { language: 'en' | 'ar' }) {
  const [bin1, setBin1] = useState('1010');
  const [bin2, setBin2] = useState('0110');
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [result, setResult] = useState('');

  const calculateBinary = () => {
    try {
      const val1 = parseInt(bin1, 2);
      const val2 = parseInt(bin2, 2);
      if (isNaN(val1) || isNaN(val2)) {
        setResult('Error');
        return;
      }
      let finalVal = 0;
      switch (op) {
        case '+': finalVal = val1 + val2; break;
        case '-': finalVal = val1 - val2; break;
        case '*': finalVal = val1 * val2; break;
        case '/': finalVal = val2 !== 0 ? Math.floor(val1 / val2) : 0; break;
      }
      setResult(finalVal.toString(2));
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">Binary 1</label>
          <input type="text" value={bin1} onChange={(e) => setBin1(e.target.value.replace(/[^01]/g, ''))} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">Binary 2</label>
          <input type="text" value={bin2} onChange={(e) => setBin2(e.target.value.replace(/[^01]/g, ''))} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {(['+', '-', '*', '/'] as const).map(o => (
          <button key={o} onClick={() => setOp(o)} className={`px-3 py-1 rounded text-xs font-bold ${op === o ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>{o}</button>
        ))}
      </div>

      <button onClick={calculateBinary} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        ⚙️ {language === 'en' ? 'Compute Binary' : 'احسب بالعملية الثنائية'}
      </button>

      {result && (
        <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl text-center font-mono">
          <span className="text-[10px] text-slate-500 block">Binary Output</span>
          <span className="text-base font-black text-emerald-400">{result}</span>
        </div>
      )}
    </div>
  );
}

// 11. Fraction Calculator
export function FractionCalculator({ language }: { language: 'en' | 'ar' }) {
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [output, setOutput] = useState('');

  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

  const calculateFraction = () => {
    let finalNum = 0;
    let finalDen = 1;

    if (op === '+') {
      finalNum = num1 * den2 + num2 * den1;
      finalDen = den1 * den2;
    } else if (op === '-') {
      finalNum = num1 * den2 - num2 * den1;
      finalDen = den1 * den2;
    } else if (op === '*') {
      finalNum = num1 * num2;
      finalDen = den1 * den2;
    } else if (op === '/') {
      finalNum = num1 * den2;
      finalDen = den1 * num2;
    }

    const divisor = Math.abs(gcd(finalNum, finalDen));
    const simplifiedNum = finalNum / divisor;
    const simplifiedDen = finalDen / divisor;

    setOutput(`${simplifiedNum}/${simplifiedDen} (${(simplifiedNum / simplifiedDen).toFixed(3)})`);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="space-y-2">
          <input type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} className="w-full text-center py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs" />
          <div className="border-t border-slate-700 w-full" />
          <input type="number" value={den1} onChange={(e) => setDen1(Number(e.target.value))} className="w-full text-center py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs" />
        </div>
        <div className="space-y-2">
          <input type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} className="w-full text-center py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs" />
          <div className="border-t border-slate-700 w-full" />
          <input type="number" value={den2} onChange={(e) => setDen2(Number(e.target.value))} className="w-full text-center py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs" />
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {(['+', '-', '*', '/'] as const).map(o => (
          <button key={o} onClick={() => setOp(o)} className={`px-3 py-1 rounded text-xs font-bold ${op === o ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>{o}</button>
        ))}
      </div>

      <button onClick={calculateFraction} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        ⚙️ {language === 'en' ? 'Compute Fractions' : 'احسب الكسر الرياضي'}
      </button>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl text-center font-mono text-emerald-400 font-bold">
          {output}
        </div>
      )}
    </div>
  );
}

// 12. Ideal Weight Calculator
export function IdealWeightCalculator({ language }: { language: 'en' | 'ar' }) {
  const [height, setHeight] = useState(175);
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [result, setResult] = useState<string | null>(null);

  const calculateIdealWeight = () => {
    const heightInches = height / 2.54;
    const inchesOver5Feet = Math.max(0, heightInches - 60);
    let devine = 0;
    if (gender === 'm') {
      devine = 50.0 + 2.3 * inchesOver5Feet;
    } else {
      devine = 45.5 + 2.3 * inchesOver5Feet;
    }
    setResult(devine.toFixed(1));
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div className="grid grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Gender' : 'الجنس'}</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setGender('m')} className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'm' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>M</button>
            <button onClick={() => setGender('f')} className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'f' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>F</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Height (cm)' : 'الارتفاع بالسم'}</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
      </div>

      <button onClick={calculateIdealWeight} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        ⚖️ {language === 'en' ? 'Calculate Ideal Weight' : 'احسب الوزن المثالي التقريبي'}
      </button>

      {result && (
        <div className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">Devine Formula Ideal Weight</span>
          <span className="text-3xl font-black text-blue-400 font-mono">{result} kg</span>
        </div>
      )}
    </div>
  );
}

// 13. Pregnancy Due Date Calculator
export function PregnancyDueDateCalculator({ language }: { language: 'en' | 'ar' }) {
  const [lmp, setLmp] = useState(() => new Date().toISOString().substring(0, 10));
  const [result, setResult] = useState<any>(null);

  const calculateDueDate = () => {
    const lmpDate = new Date(lmp);
    // Naegele's rule: add 280 days (40 weeks)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);

    const today = new Date();
    const diffMs = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    setResult({
      dueDate: dueDate.toDateString(),
      gestationalAge: `${weeks} weeks, ${days} days`
    });
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'First Day of Last Period (LMP)' : 'أول يوم لآخر دورة شهرية'}</label>
        <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
      </div>

      <button onClick={calculateDueDate} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        👶 {language === 'en' ? 'Calculate Due Date' : 'احسب موعد الولادة المتوقع'}
      </button>

      {result && (
        <div className="grid grid-cols-2 gap-3 text-center font-mono pt-1">
          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
            <span className="text-[9px] text-slate-500 block">ESTIMATED DUE DATE</span>
            <span className="text-[11px] font-bold text-blue-400">{result.dueDate}</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
            <span className="text-[9px] text-slate-500 block">GESTATIONAL AGE</span>
            <span className="text-[11px] font-bold text-emerald-400">{result.gestationalAge}</span>
          </div>
        </div>
      )}
    </div>
  );
}
