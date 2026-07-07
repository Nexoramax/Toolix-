import React, { useState } from 'react';
import { Percent, Coins, FileText } from 'lucide-react';

interface ToolProps {
  language: 'en' | 'ar';
}

// Mortgage Calculator component
export function MortgageCalculator({ language }: ToolProps) {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateMortgage = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const payment = loanAmount / numberOfPayments;
      setMonthlyPayment(parseFloat(payment.toFixed(2)));
      setTotalPayment(loanAmount);
      setTotalInterest(0);
      return;
    }

    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const total = payment * numberOfPayments;
    const interest = total - loanAmount;

    setMonthlyPayment(parseFloat(payment.toFixed(2)));
    setTotalPayment(parseFloat(total.toFixed(2)));
    setTotalInterest(parseFloat(interest.toFixed(2)));
  };

  return (
    <div className="space-y-4 text-left font-semibold text-xs" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 mb-1.5">{language === 'en' ? 'Home Price ($)' : 'سعر العقار / المنزل ($)'}</label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1.5">{language === 'en' ? 'Down Payment ($)' : 'الدفعة الأولى ($)'}</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 mb-1.5">{language === 'en' ? 'Interest Rate (%)' : 'نسبة الفائدة السنوية (%)'}</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1.5">{language === 'en' ? 'Loan Term (Years)' : 'مدة القرض (سنوات)'}</label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none"
          >
            <option value={15}>15 {language === 'en' ? 'Years' : 'سنة'}</option>
            <option value={20}>20 {language === 'en' ? 'Years' : 'سنة'}</option>
            <option value={30}>30 {language === 'en' ? 'Years' : 'سنة'}</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculateMortgage}
        className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-extrabold text-[10px] uppercase rounded-xl cursor-pointer"
      >
        {language === 'en' ? 'Calculate Mortgage Payments' : 'حساب أقساط التمويل العقاري'}
      </button>

      {monthlyPayment !== null && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 font-bold">
          <div className="text-center pb-2.5 border-b border-slate-900">
            <span className="block text-2xl font-mono text-cyan-400">${monthlyPayment.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{language === 'en' ? 'Estimated Monthly Payment' : 'القسط الشهري المقدر'}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px] uppercase tracking-wider text-slate-400">
            <div>
              <span className="block text-white font-mono text-xs font-bold">${(homePrice - downPayment).toLocaleString()}</span>
              {language === 'en' ? 'Loan Principal' : 'أصل مبلغ التمويل'}
            </div>
            <div>
              <span className="block text-cyan-400 font-mono text-xs font-bold">${totalInterest?.toLocaleString()}</span>
              {language === 'en' ? 'Total Interest' : 'مجموع الفوائد'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
