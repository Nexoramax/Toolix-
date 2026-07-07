import React, { useState } from 'react';
import { Copy, Check, CheckCircle2, AlertTriangle } from 'lucide-react';

// Word Counter
export function WordCounter({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');

  const stats = {
    chars: text.length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    paras: text.trim() === '' ? 0 : text.split(/\n\s*\n/).length,
    readingTime: Math.ceil((text.trim() === '' ? 0 : text.trim().split(/\s+/).length) / 200)
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'en' ? 'Type or paste your text here...' : 'اكتب أو ألصق النص هنا...'}
        rows={6}
        className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold text-blue-400 font-mono block">{stats.words}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Words' : 'الكلمات'}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold text-indigo-400 font-mono block">{stats.chars}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Characters' : 'الحروف'}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold text-purple-400 font-mono block">{stats.paras}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Paragraphs' : 'الفقرات'}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold text-amber-400 font-mono block">{stats.readingTime}m</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Read Time' : 'وقت القراءة'}</span>
        </div>
      </div>
    </div>
  );
}

// Character Counter
export function CharacterCounter({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');

  const charCountWithSpaces = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const linesCount = text === '' ? 0 : text.split('\n').length;

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'en' ? 'Type text here...' : 'اكتب النص هنا...'}
        rows={6}
        className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
      />
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold text-blue-400 font-mono block">{charCountWithSpaces}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'With Spaces' : 'مع المسافات'}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold text-indigo-400 font-mono block">{charCountNoSpaces}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Without Spaces' : 'بدون المسافات'}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xl font-bold text-purple-400 font-mono block">{linesCount}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'en' ? 'Lines' : 'الأسطر'}</span>
        </div>
      </div>
    </div>
  );
}

// Text Case Converter
export function TextCaseConverter({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convert = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'slug') => {
    if (type === 'upper') setText(text.toUpperCase());
    else if (type === 'lower') setText(text.toLowerCase());
    else if (type === 'title') {
      setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
    } else if (type === 'sentence') {
      setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase()));
    } else if (type === 'slug') {
      setText(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter English text here..."
          rows={5}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
        />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => convert('upper')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">UPPERCASE</button>
        <button onClick={() => convert('lower')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">lowercase</button>
        <button onClick={() => convert('title')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">Title Case</button>
        <button onClick={() => convert('sentence')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">Sentence case</button>
        <button onClick={() => convert('slug')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">URL slug-ify</button>
      </div>
    </div>
  );
}

// JSON Formatter
export function JSONFormatter({ language }: { language: 'en' | 'ar' }) {
  const [json, setJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatJSON = (minify: boolean = false) => {
    try {
      if (!json.trim()) return;
      const parsed = JSON.parse(json);
      setJson(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder='{"key": "value"}'
          rows={7}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => formatJSON(false)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          {language === 'en' ? 'Beautify' : 'تنسيق وتجميل'}
        </button>
        <button
          onClick={() => formatJSON(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          {language === 'en' ? 'Minify' : 'تصغير'}
        </button>
      </div>
    </div>
  );
}

// JSON Validator
export function JSONValidator({ language }: { language: 'en' | 'ar' }) {
  const [json, setJson] = useState('');
  const [status, setStatus] = useState<{ valid: boolean; message: string } | null>(null);

  const validateJSON = () => {
    if (!json.trim()) {
      setStatus(null);
      return;
    }
    try {
      JSON.parse(json);
      setStatus({
        valid: true,
        message: language === 'en' ? 'Valid JSON Format' : 'تنسيق JSON صحيح وقابل للتحليل'
      });
    } catch (err: any) {
      setStatus({
        valid: false,
        message: err.message
      });
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='Paste JSON to validate here...'
        rows={6}
        className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={validateJSON}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer hover:shadow-lg transition-all"
      >
        {language === 'en' ? 'Validate JSON' : 'التحقق من صحة JSON'}
      </button>

      {status && (
        <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs ${status.valid ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {status.valid ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}

// HTML Minifier
export function HTMLMinifier({ language }: { language: 'en' | 'ar' }) {
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const minifyHTML = () => {
    const minified = html
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse whitespaces
      .replace(/>\s+</g, '><') // remove whitespace between tags
      .trim();
    setHtml(minified);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<html>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>"
          rows={7}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <button
        onClick={minifyHTML}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
      >
        {language === 'en' ? 'Minify HTML' : 'تصغير ملف HTML'}
      </button>
    </div>
  );
}

// Base64 Encoder/Decoder
export function Base64Encoder({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch (e) {
      setOutput(language === 'en' ? 'Error: Invalid characters for encoding.' : 'خطأ: أحرف غير صالحة للتشفير.');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      setOutput(language === 'en' ? 'Error: Invalid Base64 format.' : 'خطأ: تنسيق Base64 غير صحيح.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Input Text' : 'نص المدخلات'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>{language === 'en' ? 'Output Result' : 'النتيجة النهائية'}</span>
            {output && (
              <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300 font-sans font-bold flex items-center gap-1 cursor-pointer">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{language === 'en' ? 'Copy' : 'نسخ'}</span>
              </button>
            )}
          </label>
          <textarea
            value={output}
            readOnly
            rows={5}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-mono focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={handleEncode} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
          {language === 'en' ? 'Encode' : 'تشفير'}
        </button>
        <button onClick={handleDecode} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
          {language === 'en' ? 'Decode' : 'فك تشفير'}
        </button>
      </div>
    </div>
  );
}

// Hash Generator
export function HashGenerator({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [algo, setAlgo] = useState<'SHA-256' | 'SHA-512' | 'MD5'>('SHA-256');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const generateHash = async () => {
    if (!input) return;
    if (algo === 'MD5') {
      // Mock / Simple JS Hash or Fallback (MD5 is legacy, SHA is native)
      setHash(input.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0).toString(16));
      return;
    }
    const msgUint8 = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setHash(hashHex);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Text to Hash' : 'النص المطلوب توليد الهاش له'}
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter plain text..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Algorithm' : 'الخوارزمية'}
          </label>
          <select
            value={algo}
            onChange={(e: any) => setAlgo(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
            <option value="MD5">MD5 (Simple)</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateHash}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
      >
        {language === 'en' ? 'Generate Hash' : 'توليد الهاش'}
      </button>

      {hash && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center text-xs font-mono">
          <span className="text-blue-400 break-all">{hash}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(hash);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer ml-3 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}

// URL Encoder/Decoder
export function URLEncoder({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput(language === 'en' ? 'Error: Invalid URL format.' : 'خطأ: صيغة URL غير صالحة.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            URL Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>Result</span>
            {output && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-blue-400 hover:text-blue-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{language === 'en' ? 'Copy' : 'نسخ'}</span>
              </button>
            )}
          </label>
          <textarea
            value={output}
            readOnly
            rows={4}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-mono focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={handleEncode} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
          {language === 'en' ? 'Encode' : 'ترميز'}
        </button>
        <button onClick={handleDecode} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
          {language === 'en' ? 'Decode' : 'فك ترميز'}
        </button>
      </div>
    </div>
  );
}

// UUID Generator
export function UUIDGenerator({ language }: { language: 'en' | 'ar' }) {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUUIDs = () => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }));
    }
    setUuids(arr);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Quantity' : 'الكمية المراد توليدها'}
          </label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <button
          onClick={generateUUIDs}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shrink-0"
        >
          {language === 'en' ? 'Generate' : 'توليد المعرّفات'}
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">{language === 'en' ? 'Generated UUIDs' : 'المعرّفات المولدة'}</span>
            <button onClick={copyAll} className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{language === 'en' ? 'Copy All' : 'نسخ الكل'}</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 max-h-48 overflow-y-auto space-y-1 font-mono text-xs text-left" dir="ltr">
            {uuids.map((u, i) => (
              <div key={i} className="text-blue-400">{u}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Base64 Decoder
export function Base64Decoder({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    try {
      setOutput(atob(input.trim()));
    } catch (e) {
      setOutput(language === 'en' ? 'Invalid Base64 format.' : 'ترميز غير صحيح.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Base64 Input</label>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
        />
      </div>

      <button onClick={handleDecode} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
        {language === 'en' ? 'Decode' : 'فك التشفير'}
      </button>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Decoded Plain Text</span>
            <button onClick={handleCopy} className="text-blue-400 font-bold flex items-center gap-1 cursor-pointer">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
          <textarea readOnly value={output} rows={4} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}

// URL Decoder
export function URLDecoder({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input.trim()));
    } catch (e) {
      setOutput(language === 'en' ? 'Invalid URL encoding.' : 'ترميز URL غير صحيح.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Encoded URL Input</label>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
        />
      </div>

      <button onClick={handleDecode} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
        {language === 'en' ? 'Decode URL' : 'فك ترميز الرابط'}
      </button>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Decoded Text</span>
            <button onClick={handleCopy} className="text-blue-400 font-bold flex items-center gap-1 cursor-pointer">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
          <textarea readOnly value={output} rows={4} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}

// HTML Formatter
export function HTMLFormatter({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const formatHTML = () => {
    let formatted = '';
    let reg = /(<\/?[a-zA-Z0-9\s"=-_]+>)/g;
    let lines = input.replace(reg, '\n$1\n').split('\n');
    let indent = 0;
    
    lines.forEach(line => {
      line = line.trim();
      if (!line) return;
      if (line.match(/^<\//)) {
        indent--;
      }
      formatted += '  '.repeat(Math.max(0, indent)) + line + '\n';
      if (line.match(/^<[a-zA-Z0-9]+/) && !line.match(/\/>$/) && !line.match(/^<(br|img|hr|input|meta|link)/)) {
        indent++;
      }
    });
    setOutput(formatted.trim());
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Raw HTML</label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<div><p>Hello</p></div>"
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
        />
      </div>

      <button onClick={formatHTML} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
        {language === 'en' ? 'Format HTML' : 'تنسيق الكود'}
      </button>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Formatted HTML Code</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
          <textarea readOnly value={output} rows={6} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}

// Text Cleaner
export function TextCleaner({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const cleanText = () => {
    let res = input
      .replace(/\s+/g, ' ')         // Collapse duplicate spaces
      .replace(/^\s+|\s+$/g, '')    // Trim outer bounds
      .replace(/[\r\n]+/g, '\n');   // Clear empty lines
    setOutput(res);
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste cluttered text..."
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs focus:outline-none"
        />
      </div>

      <button onClick={cleanText} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
        {language === 'en' ? 'Clean Text' : 'تنظيف وتطهير النص'}
      </button>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Cleaned Result</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
          <textarea readOnly value={output} rows={5} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs" />
        </div>
      )}
    </div>
  );
}

// Text Sorter
export function TextSorter({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const sortLines = (mode: 'asc' | 'desc' | 'reverse') => {
    let lines = input.split('\n').filter(l => l.trim());
    if (mode === 'asc') lines.sort();
    else if (mode === 'desc') lines.sort().reverse();
    else lines.reverse();
    setOutput(lines.join('\n'));
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter list lines here..."
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => sortLines('asc')} className="py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white text-xs font-bold rounded-xl">A to Z</button>
        <button onClick={() => sortLines('desc')} className="py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white text-xs font-bold rounded-xl">Z to A</button>
        <button onClick={() => sortLines('reverse')} className="py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white text-xs font-bold rounded-xl">Reverse</button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Sorted Result</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
          <textarea readOnly value={output} rows={4} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs font-mono" />
        </div>
      )}
    </div>
  );
}

// Markdown to HTML
export function MarkdownToHTML({ language }: { language: 'en' | 'ar' }) {
  const [markdown, setMarkdown] = useState('# Heading\n\n**Bold Text** and *italic* details with `inline code`.');
  const [html, setHtml] = useState('');

  const convertMarkdown = () => {
    let text = markdown;
    text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    text = text.replace(/^## (.*$)/gim, '<h2>$2</h2>');
    text = text.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    text = text.replace(/\*(.*)\*/gim, '<em>$1</em>');
    text = text.replace(/`(.*)`/gim, '<code>$1</code>');
    text = text.replace(/\n$/gim, '<br />');
    setHtml(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Markdown Editor</label>
          <textarea
            rows={8}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">HTML Output Preview</span>
          <div className="flex-1 p-4 rounded-xl border border-slate-800 bg-slate-950/40 text-left text-slate-300 text-xs overflow-auto h-48 select-text" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>

      <button onClick={convertMarkdown} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
        {language === 'en' ? 'Render HTML' : 'تحويل الماركداون'}
      </button>
    </div>
  );
}

// Text Diff Checker
export function TextDiff({ language }: { language: 'en' | 'ar' }) {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffs, setDiffs] = useState<string[]>([]);

  const compareText = () => {
    let origLines = original.split('\n');
    let modLines = modified.split('\n');
    let outputLines: string[] = [];

    const maxLength = Math.max(origLines.length, modLines.length);
    for (let i = 0; i < maxLength; i++) {
      const o = origLines[i] || '';
      const m = modLines[i] || '';
      if (o === m) {
        outputLines.push(`  ${o}`);
      } else {
        if (o) outputLines.push(`- ${o}`);
        if (m) outputLines.push(`+ ${m}`);
      }
    }
    setDiffs(outputLines);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Original Text</label>
          <textarea rows={4} value={original} onChange={(e) => setOriginal(e.target.value)} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Modified Text</label>
          <textarea rows={4} value={modified} onChange={(e) => setModified(e.target.value)} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs" />
        </div>
      </div>

      <button onClick={compareText} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
        {language === 'en' ? 'Compare' : 'مقارنة وإظهار الفروق'}
      </button>

      {diffs.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-left overflow-auto max-h-60" dir="ltr">
          {diffs.map((line, idx) => (
            <div key={idx} className={line.startsWith('-') ? 'text-red-400 bg-red-950/20 px-1' : line.startsWith('+') ? 'text-emerald-400 bg-emerald-950/20 px-1' : 'text-slate-400 px-1'}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Text to Speech
export function TextToSpeech({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('Welcome to Toolix Platform. Enjoy 50+ completely free premium client-side tools.');
  const [playing, setPlaying] = useState(false);

  const handleSpeak = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs"
        />
      </div>

      <div className="flex gap-4">
        <button onClick={handleSpeak} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl">
          {playing ? (language === 'en' ? 'Speaking...' : 'يتحدث...') : (language === 'en' ? 'Speak Text' : 'انطق النص')}
        </button>
        {playing && (
          <button onClick={handleStop} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl">
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

// CSS Minifier & Beautifier
export function CSSMinifierFormatter({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const processCSS = (mode: 'minify' | 'beautify') => {
    if (mode === 'minify') {
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Clear comments
        .replace(/\s+/g, ' ')             // Collapse spaces
        .replace(/\s*([{}|:;])\s*/g, '$1') // Clear margins around tokens
        .trim();
      setOutput(minified);
    } else {
      let beautified = input
        .replace(/\s+/g, ' ')
        .replace(/{/g, ' {\n  ')
        .replace(/;/g, ';\n  ')
        .replace(/}/g, '\n}\n')
        .replace(/\s*\n\s*\n/g, '\n')
        .trim();
      setOutput(beautified);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder=".card { border: 1px solid #ccc; padding: 20px; }"
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => processCSS('minify')} className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl">Minify CSS</button>
        <button onClick={() => processCSS('beautify')} className="py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white text-xs font-bold rounded-xl">Format CSS</button>
      </div>

      {output && (
        <textarea readOnly value={output} rows={6} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs" />
      )}
    </div>
  );
}

// SQL Formatter
export function SQLFormatter({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatSQL = () => {
    let clean = input.replace(/\s+/g, ' ').trim();
    let keywords = ['SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'LIMIT', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'SET'];
    
    let query = clean;
    keywords.forEach(keyword => {
      let reg = new RegExp(`\\b${keyword}\\b`, 'gi');
      query = query.replace(reg, `\n${keyword}`);
    });

    setOutput(query.trim());
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT id, name FROM users WHERE active = 1 ORDER BY created_at DESC;"
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
        />
      </div>

      <button onClick={formatSQL} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
        {language === 'en' ? 'Format SQL' : 'تنسيق الاستعلام'}
      </button>

      {output && (
        <textarea readOnly value={output} rows={6} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs" />
      )}
    </div>
  );
}
