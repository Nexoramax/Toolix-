import React, { useState } from 'react';
import { FileText, Copy, Check, Hash, Braces, Sparkles, Sliders, Type, FileCode, Clock } from 'lucide-react';

interface ToolProps {
  language: 'en' | 'ar';
}

// 1. Remove Duplicate Lines
export function RemoveDuplicateLines({ language }: ToolProps) {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

  const processText = () => {
    const lines = text.split('\n');
    const uniqueLines = Array.from(new Set(lines));
    setResult(uniqueLines.join('\n'));
    setStats({
      original: lines.length,
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length
    });
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Input Text (Paste lines here)' : 'النص المدخل (ألصق الأسطر هنا)'}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={language === 'en' ? 'Line A\nLine B\nLine A...' : 'السطر الأول\nالسطر الثاني\nالسطر الأول...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-mono focus:outline-none"
          rows={5}
        />
      </div>

      <button
        onClick={processText}
        className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-[10px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
      >
        <Hash className="w-4 h-4" />
        <span>{language === 'en' ? 'Deduplicate Lines' : 'إزالة الأسطر المكررة'}</span>
      </button>

      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-900">
            <div>
              <span className="block text-white text-xs font-bold">{stats.original}</span>
              {language === 'en' ? 'Original Lines' : 'الأسطر الأصلية'}
            </div>
            <div className="text-emerald-400 border-x border-slate-900">
              <span className="block text-emerald-400 text-xs font-bold">{stats.unique}</span>
              {language === 'en' ? 'Unique Lines' : 'أسطر فريدة'}
            </div>
            <div className="text-red-400">
              <span className="block text-red-400 text-xs font-bold">{stats.removed}</span>
              {language === 'en' ? 'Duplicates Removed' : 'تمت إزالتها'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold">{language === 'en' ? 'Cleaned Result' : 'الأسطر الفريدة الناتجة'}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-emerald-450 hover:text-emerald-450 font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-450" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Text' : 'نسخ النص')}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={result}
              className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
              rows={5}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Random Text Generator
export function RandomTextGenerator({ language }: ToolProps) {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useDigits) chars += '0123456789';
    if (useSpecial) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setResult('');
      return;
    }

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setResult(generated);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
        <div>
          <label className="block text-slate-400 mb-2">{language === 'en' ? `Length: ${length} Characters` : `طول النص: ${length} خانة`}</label>
          <input
            type="range"
            min="4"
            max="128"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="rounded bg-slate-900 border-slate-800 accent-blue-500" />
            <span>A-Z (Uppercase)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="rounded bg-slate-900 border-slate-800 accent-blue-500" />
            <span>a-z (Lowercase)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
            <input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} className="rounded bg-slate-900 border-slate-800 accent-blue-500" />
            <span>0-9 (Digits)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
            <input type="checkbox" checked={useSpecial} onChange={(e) => setUseSpecial(e.target.checked)} className="rounded bg-slate-900 border-slate-800 accent-blue-500" />
            <span>!@#$ (Symbols)</span>
          </label>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer"
        >
          {language === 'en' ? 'Generate Random Text' : 'توليد نص عشوائي'}
        </button>
      </div>

      {result && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-sm font-bold flex items-center justify-between text-blue-400 break-all">
          <span>{result}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(result);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

// 3. Keyword Density Checker
export function KeywordDensityChecker({ language }: ToolProps) {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<{ word: string; count: number; percent: number }[]>([]);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    const words = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2); // Exclude very short particles

    const totalWords = words.length;
    if (totalWords === 0) return;

    const frequencies: Record<string, number> = {};
    words.forEach(w => {
      frequencies[w] = (frequencies[w] || 0) + 1;
    });

    const sorted = Object.entries(frequencies)
      .map(([word, count]) => ({
        word,
        count,
        percent: parseFloat(((count / totalWords) * 100).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 words

    setKeywords(sorted);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Article Content / Copy' : 'نص المقال أو المحتوى'}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={language === 'en' ? 'Paste your copy here to analyze density...' : 'ألصق مقالك هنا لتحليل كثافة الكلمات المفتاحية...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={5}
        />
      </div>

      <button
        onClick={handleAnalyze}
        className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-extrabold text-[10px] uppercase rounded-xl cursor-pointer"
      >
        {language === 'en' ? 'Analyze Keyword Density' : 'تحليل كثافة الكلمات المفتاحية'}
      </button>

      {keywords.length > 0 && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">{language === 'en' ? 'Top Keywords' : 'أهم الكلمات المفتاحية'}</div>
          <div className="space-y-2.5">
            {keywords.map((kw, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-slate-350">
                  <span className="font-mono">{kw.word}</span>
                  <span>{kw.count}x ({kw.percent}%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-full rounded-full" style={{ width: `${Math.min(100, kw.percent * 5)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 4. Reading Time Calculator
export function ReadingTimeCalculator({ language }: ToolProps) {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ words: 0, characters: 0, readMin: 0, speakMin: 0 });

  const handleCalculate = () => {
    const cleanText = text.trim();
    if (!cleanText) {
      setStats({ words: 0, characters: 0, readMin: 0, speakMin: 0 });
      return;
    }

    const words = cleanText.split(/\s+/).length;
    const characters = cleanText.length;

    // Average speeds: reading = 225 WPM, speaking = 130 WPM
    const readMin = parseFloat((words / 225).toFixed(1));
    const speakMin = parseFloat((words / 130).toFixed(1));

    setStats({ words, characters, readMin, speakMin });
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Content to Estimate' : 'المحتوى المراد تقديره'}
        </label>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); }}
          placeholder={language === 'en' ? 'Paste text here...' : 'ألصق النص هنا...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={5}
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-extrabold text-[10px] uppercase rounded-xl cursor-pointer"
      >
        {language === 'en' ? 'Estimate Reading Metrics' : 'حساب مقاييس القراءة والإلقاء'}
      </button>

      {stats.words > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-center space-y-1">
            <Clock className="w-5 h-5 text-blue-400 mx-auto" />
            <div className="text-white text-sm font-bold">{stats.readMin} min</div>
            <div className="text-[10px] text-slate-500 uppercase font-extrabold">{language === 'en' ? 'Reading Time' : 'وقت القراءة المقدر'}</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-center space-y-1">
            <Clock className="w-5 h-5 text-pink-400 mx-auto" />
            <div className="text-white text-sm font-bold">{stats.speakMin} min</div>
            <div className="text-[10px] text-slate-500 uppercase font-extrabold">{language === 'en' ? 'Speaking Time' : 'وقت التحدث المقدر'}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-900 bg-slate-950 text-center">
            <div className="text-white text-xs font-bold">{stats.words}</div>
            <div className="text-[9px] text-slate-500 uppercase font-extrabold">{language === 'en' ? 'Words' : 'الكلمات'}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-900 bg-slate-950 text-center">
            <div className="text-white text-xs font-bold">{stats.characters}</div>
            <div className="text-[9px] text-slate-500 uppercase font-extrabold">{language === 'en' ? 'Characters' : 'الحروف والرموز'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 5. JS Formatter
export function JSFormatter({ language }: ToolProps) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJS = () => {
    try {
      // Offline lightweight aesthetic indenting logic
      let formatted = '';
      let indentLevel = 0;
      const cleanCode = code
        .replace(/\r/g, '')
        .replace(/\s*([{}();,])\s*/g, '$1') // Strip spaces surrounding key punctuation
        .replace(/\s+/g, ' ');

      let lastChar = '';
      for (let i = 0; i < cleanCode.length; i++) {
        const char = cleanCode[i];
        if (char === '{') {
          formatted += ' {\n' + '  '.repeat(++indentLevel);
        } else if (char === '}') {
          indentLevel = Math.max(0, indentLevel - 1);
          formatted += '\n' + '  '.repeat(indentLevel) + '}\n' + '  '.repeat(indentLevel);
        } else if (char === ';') {
          formatted += ';\n' + '  '.repeat(indentLevel);
        } else {
          formatted += char;
        }
        lastChar = char;
      }

      setResult(formatted.trim().replace(/\n\s*\n/g, '\n'));
    } catch (e) {
      setResult(code);
    }
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Minified / Messy JS Code' : 'كود جافا سكريبت مضغوط أو غير مرتب'}
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="function test(){console.log('success');if(true){return 42;}}"
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-mono focus:outline-none"
          rows={5}
        />
      </div>

      <button
        onClick={formatJS}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-[10px] uppercase rounded-xl cursor-pointer"
      >
        {language === 'en' ? 'Format JavaScript Code' : 'تنسيق كود جافا سكريبت'}
      </button>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Beautified JS' : 'الكود المنسق الناتج'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Beautified' : 'نسخ الكود المنسق')}</span>
            </button>
          </div>
          <pre className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-mono text-[10px] overflow-auto max-h-60 leading-relaxed">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
