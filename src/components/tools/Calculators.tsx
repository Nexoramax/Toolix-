import React, { useState } from 'react';

// Age Calculator
export function AgeCalculator({ language }: { language: 'en' | 'ar' }) {
  const [birthdate, setBirthdate] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateAge = () => {
    if (!birthdate) return;
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birthDateObj.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next Birthday calculation
    const nextBirthday = new Date(today.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const diffMs = nextBirthday.getTime() - today.getTime();
    const daysToNextBirthday = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds, daysToNextBirthday });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Select Birthdate' : 'اختر تاريخ الميلاد'}
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <button
          onClick={calculateAge}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all"
        >
          {language === 'en' ? 'Calculate Age' : 'احسب العمر'}
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-xl font-bold text-blue-400 font-mono block">{result.years}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Years' : 'سنوات'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-xl font-bold text-indigo-400 font-mono block">{result.months}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Months' : 'أشهر'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-xl font-bold text-purple-400 font-mono block">{result.days}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Days' : 'أيام'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <span className="text-xl font-bold text-amber-400 font-mono block">{result.daysToNextBirthday}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Days to Next Birthday' : 'أيام لعيد ميلادك القادم'}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900 text-left col-span-2 sm:col-span-4 space-y-2 mt-2 text-xs" dir="ltr">
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span className="text-slate-500">Total Days:</span>
              <span className="font-mono font-bold text-slate-300">{result.totalDays.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span className="text-slate-500">Total Weeks:</span>
              <span className="font-mono font-bold text-slate-300">{result.totalWeeks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span className="text-slate-500">Total Hours:</span>
              <span className="font-mono font-bold text-slate-300">{result.totalHours.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Seconds:</span>
              <span className="font-mono font-bold text-slate-300">{result.totalSeconds.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Age Difference Calculator
export function AgeDifferenceCalculator({ language }: { language: 'en' | 'ar' }) {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateDifference = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    let years = Math.abs(d2.getFullYear() - d1.getFullYear());
    let months = Math.abs(d2.getMonth() - d1.getMonth());
    let days = Math.abs(d2.getDate() - d1.getDate());

    const totalWeeks = Math.floor(totalDays / 7);
    const monthsExact = parseFloat((totalDays / 30.437).toFixed(1));
    const yearsExact = parseFloat((totalDays / 365.25).toFixed(2));

    setResult({ years, months, days, totalDays, totalWeeks, monthsExact, yearsExact });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'First Person Birthdate' : 'تاريخ ميلاد الشخص الأول'}
          </label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Second Person Birthdate' : 'تاريخ ميلاد الشخص الثاني'}
          </label>
          <input
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
      </div>

      <button
        onClick={calculateDifference}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs cursor-pointer transition-all shadow-md"
      >
        {language === 'en' ? 'Calculate Difference' : 'احسب فارق السن'}
      </button>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <span className="text-xl font-bold text-blue-400 font-mono block">{result.yearsExact}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Years' : 'سنوات'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-xl font-bold text-indigo-400 font-mono block">{result.monthsExact}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Months' : 'أشهر'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-xl font-bold text-purple-400 font-mono block">{result.totalDays.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Total Days' : 'إجمالي الأيام'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// BMI Calculator
export function BMICalculator({ language }: { language: 'en' | 'ar' }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // to meters
    if (!w || !h) return;
    const value = parseFloat((w / (h * h)).toFixed(1));
    setBmi(value);

    let statusEn = '';
    let statusAr = '';
    if (value < 18.5) {
      statusEn = 'Underweight';
      statusAr = 'نقص الوزن';
    } else if (value < 25) {
      statusEn = 'Normal weight';
      statusAr = 'وزن مثالي طبيعي';
    } else if (value < 30) {
      statusEn = 'Overweight';
      statusAr = 'وزن زائد';
    } else {
      statusEn = 'Obese';
      statusAr = 'سمنة مفرطة';
    }
    setStatus(language === 'en' ? statusEn : statusAr);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Weight (kg)' : 'الوزن (كيلوجرام)'}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Height (cm)' : 'الطول (سنتيمتر)'}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
      </div>

      <button
        onClick={calculateBMI}
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all"
      >
        {language === 'en' ? 'Calculate BMI' : 'احسب كتلة الجسم'}
      </button>

      {bmi && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Your BMI Score' : 'مؤشر كتلة جسمك'}</span>
          <span className="block text-3xl font-black text-emerald-400 font-mono">{bmi}</span>
          <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full">
            {status}
          </span>
        </div>
      )}
    </div>
  );
}

// Percentage Calculator
export function PercentageCalculator({ language }: { language: 'en' | 'ar' }) {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculatePercentage = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (isNaN(v1) || isNaN(v2) || v2 === 0) return;
    setResult(parseFloat(((v1 / 100) * v2).toFixed(2)));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'What is (X) %' : 'كم تساوي (X) ٪'}
          </label>
          <input
            type="number"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            placeholder="e.g. 20"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Of (Y)' : 'من القيمة الإجمالية (Y)'}
          </label>
          <input
            type="number"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            placeholder="e.g. 500"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
      </div>

      <button
        onClick={calculatePercentage}
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all"
      >
        {language === 'en' ? 'Calculate' : 'احسب النسبة'}
      </button>

      {result !== null && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1 font-mono text-xl font-bold">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase block">{language === 'en' ? 'Result' : 'النتيجة'}</span>
          <span className="text-blue-400">{val1}% {language === 'en' ? 'of' : 'من'} {val2} = {result}</span>
        </div>
      )}
    </div>
  );
}

// Loan Calculator
export function LoanCalculator({ language }: { language: 'en' | 'ar' }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateLoan = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12; // monthly rate
    const n = parseFloat(term) * 12; // monthly periods

    if (!p || !r || !n) return;

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalPayment: parseFloat(totalPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2))
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Loan Amount' : 'مبلغ القرض'}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 10000"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Interest Rate (%)' : 'نسبة الفائدة السنوية'}
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g. 5.5"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Term (Years)' : 'مدة السداد (بالسنوات)'}
          </label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. 5"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
      </div>

      <button
        onClick={calculateLoan}
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all"
      >
        {language === 'en' ? 'Calculate Payment' : 'احسب تفاصيل القرض'}
      </button>

      {result && (
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-blue-400 font-mono block">${result.monthlyPayment.toLocaleString()}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Monthly Pay' : 'القسط الشهري'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-indigo-400 font-mono block">${result.totalInterest.toLocaleString()}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Total Interest' : 'إجمالي الفوائد'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-purple-400 font-mono block">${result.totalPayment.toLocaleString()}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Total Cost' : 'الإجمالي الكلي'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Discount Calculator
export function DiscountCalculator({ language }: { language: 'en' | 'ar' }) {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [taxPercent, setTaxPercent] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent) || 0;
    const tax = parseFloat(taxPercent) || 0;

    if (isNaN(price)) return;

    const discountAmount = price * (discount / 100);
    const discountedPrice = price - discountAmount;
    const taxAmount = discountedPrice * (tax / 100);
    const finalPrice = discountedPrice + taxAmount;

    setResult({
      savings: parseFloat(discountAmount.toFixed(2)),
      beforeTax: parseFloat(discountedPrice.toFixed(2)),
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2))
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Original Price' : 'السعر الأصلي'}
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="e.g. 150"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Discount (%)' : 'الخصم (%)'}
          </label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="e.g. 20"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Tax (%) (Optional)' : 'الضريبة (%) (اختياري)'}
          </label>
          <input
            type="number"
            value={taxPercent}
            onChange={(e) => setTaxPercent(e.target.value)}
            placeholder="e.g. 15"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
      </div>

      <button
        onClick={calculateDiscount}
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all"
      >
        {language === 'en' ? 'Calculate Discount' : 'احسب السعر النهائي'}
      </button>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-emerald-400 font-mono block">${result.savings}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'You Save' : 'مقدار التوفير'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-slate-300 font-mono block">${result.beforeTax}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Sale Price' : 'السعر بعد الخصم'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-indigo-400 font-mono block">${result.taxAmount}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Tax' : 'الضريبة'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <span className="text-base font-black text-blue-400 font-mono block">${result.finalPrice}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Final Price' : 'السعر الإجمالي النهائي'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// VAT / Tax Calculator
export function VATCalculator({ language }: { language: 'en' | 'ar' }) {
  const [amount, setAmount] = useState('');
  const [vatRate, setVatRate] = useState('15');
  const [mode, setMode] = useState<'add' | 'exclude'>('add');
  const [result, setResult] = useState<any>(null);

  const calculateVAT = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(vatRate);

    if (isNaN(amt) || isNaN(rate)) return;

    let netAmount = 0;
    let vatAmount = 0;
    let totalAmount = 0;

    if (mode === 'add') {
      netAmount = amt;
      vatAmount = amt * (rate / 100);
      totalAmount = amt + vatAmount;
    } else {
      totalAmount = amt;
      netAmount = amt / (1 + (rate / 100));
      vatAmount = totalAmount - netAmount;
    }

    setResult({
      netAmount: parseFloat(netAmount.toFixed(2)),
      vatAmount: parseFloat(vatAmount.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2))
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Amount' : 'المبلغ'}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'VAT Rate (%)' : 'نسبة ضريبة القيمة المضافة (%)'}
          </label>
          <input
            type="number"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
            placeholder="e.g. 15"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Calculation Mode' : 'طريقة الحساب'}
          </label>
          <select
            value={mode}
            onChange={(e: any) => setMode(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="add">{language === 'en' ? 'Add VAT (Include)' : 'إضافة الضريبة (+)'}</option>
            <option value="exclude">{language === 'en' ? 'Exclude VAT (Remove)' : 'خصم واستبعاد الضريبة (-)'}</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculateVAT}
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all"
      >
        {language === 'en' ? 'Calculate VAT' : 'احسب ضريبة القيمة المضافة'}
      </button>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-slate-300 font-mono block">${result.netAmount}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Net Amount (Excl. VAT)' : 'المبلغ الصافي (بدون ضريبة)'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-indigo-400 font-mono block">${result.vatAmount}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'VAT Amount' : 'قيمة الضريبة المضافة'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-sm font-bold text-emerald-400 font-mono block">${result.totalAmount}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Total Amount (Incl. VAT)' : 'المبلغ الإجمالي (شامل الضريبة)'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
