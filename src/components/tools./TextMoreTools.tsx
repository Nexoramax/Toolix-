import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Copy Helper
function CopyButton({ text, language }: { text: string; language: 'en' | 'ar' }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1 cursor-pointer text-[10px]"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy' : 'نسخ')}</span>
    </button>
  );
}

// 1. Find and Replace Tool
export function FindReplace({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [output, setOutput] = useState('');

  const handleReplace = () => {
    if (!find) {
      setOutput(text);
      return;
    }
    // Perform standard safe replacement
    try {
      const escapedFind = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedFind, 'g');
      setOutput(text.replace(regex, replace));
    } catch {
      setOutput(text);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'en' ? 'Type or paste your source text here...' : 'اكتب أو ألصق النص هنا...'}
        rows={5}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Find Text' : 'ابحث عن الكلمة'}</label>
          <input type="text" value={find} onChange={(e) => setFind(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Replace With' : 'استبدل بـ'}</label>
          <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
      </div>

      <button onClick={handleReplace} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🔄 {language === 'en' ? 'Find and Replace' : 'البحث والاستبدال بالنص'}
      </button>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 2. Anagram Solver
export function AnagramSolver({ language }: { language: 'en' | 'ar' }) {
  const [word, setWord] = useState('');
  const [anagrams, setAnagrams] = useState<string[]>([]);

  const handleSolve = () => {
    const cleanWord = word.trim().toLowerCase();
    if (!cleanWord) return;

    // Simple client side recursive anagram generator
    const generatePermutations = (str: string): string[] => {
      if (str.length <= 1) return [str];
      const perms: string[] = [];
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remaining = str.slice(0, i) + str.slice(i + 1);
        for (const subPerm of generatePermutations(remaining)) {
          perms.push(char + subPerm);
        }
      }
      return Array.from(new Set(perms));
    };

    const results = generatePermutations(cleanWord).filter(w => w !== cleanWord).slice(0, 30);
    setAnagrams(results);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-left">
      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Enter Scrambled Word' : 'أدخل الكلمة المبعثرة'}</label>
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
      </div>

      <button onClick={handleSolve} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🔄 {language === 'en' ? 'Rearrange Letters' : 'فك شفرة الحروف'}
      </button>

      {anagrams.length > 0 && (
        <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-1.5">
          <span className="text-[9px] font-bold text-slate-500 block uppercase">Rearranged Combinations (First 30)</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs text-blue-400">
            {anagrams.map((w, idx) => (
              <span key={idx} className="bg-slate-950 px-2 py-1 rounded border border-slate-800 font-bold select-all">{w}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 3. SEO Slug Generator
export function SlugGenerator({ language }: { language: 'en' | 'ar' }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = () => {
    const clean = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(clean);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Page Title / Article Heading' : 'عنوان المقال / الصفحة'}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 10 Best Developer Tools of 2026!"
          className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
        />
      </div>

      <button onClick={generateSlug} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🔗 {language === 'en' ? 'Generate URL Slug' : 'توليد اسم الرابط الصديق للسيو Slug'}
      </button>

      {slug && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs font-mono text-emerald-400">
          <span className="select-all block max-w-[85%] truncate">{slug}</span>
          <CopyButton text={slug} language={language} />
        </div>
      )}
    </div>
  );
}

// 4. Text Repeater
export function TextRepeater({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [count, setCount] = useState(10);
  const [delimiter, setDelimiter] = useState('newline');
  const [output, setOutput] = useState('');

  const handleRepeat = () => {
    if (!text) return;
    const delim = delimiter === 'newline' ? '\n' : delimiter === 'space' ? ' ' : '';
    const items = Array(Math.min(1000, Math.max(1, count))).fill(text);
    setOutput(items.join(delim));
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'en' ? 'Enter text to repeat...' : 'أدخل النص لتكراره...'}
        rows={3}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
      />

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-bold text-slate-400 mb-1">Repeat Count</label>
          <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white" />
        </div>
        <div>
          <label className="block font-bold text-slate-400 mb-1">Separator</label>
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white">
            <option value="newline">New Line</option>
            <option value="space">Space</option>
            <option value="none">No separator</option>
          </select>
        </div>
      </div>

      <button onClick={handleRepeat} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🔁 {language === 'en' ? 'Repeat Text' : 'كرر النص'}
      </button>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto pr-16 select-all pt-1 max-h-40">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 5. Text Reverser
export function TextReverser({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const reverseChars = () => {
    setOutput(text.split('').reverse().join(''));
  };

  const reverseWords = () => {
    setOutput(text.split(/\s+/).reverse().join(' '));
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'en' ? 'Type or paste text...' : 'اكتب أو ألصق النص هنا...'}
        rows={4}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
      />
      <div className="grid grid-cols-2 gap-3">
        <button onClick={reverseChars} className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Reverse Characters' : 'عكس الحروف بالكامل'}
        </button>
        <button onClick={reverseWords} className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Reverse Words' : 'عكس ترتيب الكلمات'}
        </button>
      </div>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 6. Rot13 & Caesar Cipher
export function CaesarCipher({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState('');

  const runCipher = (encrypt: boolean) => {
    const s = encrypt ? shift : (26 - shift) % 26;
    let res = '';
    for (let i = 0; i < text.length; i++) {
      let c = text.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        res += String.fromCharCode(((c - 65 + s) % 26) + 65);
      } else if (c >= 97 && c <= 122) {
        res += String.fromCharCode(((c - 97 + s) % 26) + 97);
      } else {
        res += text[i];
      }
    }
    setOutput(res);
  };

  return (
    <div className="space-y-4 text-left">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type English text..."
        rows={3}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:outline-none"
      />

      <div>
        <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
          <span>Caesar Shift Key</span>
          <span className="font-mono text-blue-400">{shift}</span>
        </div>
        <input type="range" min="1" max="25" value={shift} onChange={(e) => setShift(Number(e.target.value))} className="w-full accent-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => runCipher(true)} className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer">
          🔒 {language === 'en' ? 'Encrypt Text' : 'تشفير النص'}
        </button>
        <button onClick={() => runCipher(false)} className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer">
          🔓 {language === 'en' ? 'Decrypt Text' : 'فك تشفير النص'}
        </button>
      </div>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-amber-300 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 7. RegExp Match Tester
export function RegExTester({ language }: { language: 'en' | 'ar' }) {
  const [regex, setRegex] = useState('(\\w+)');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Toolix has great utilities!');
  const [matches, setMatches] = useState<string[]>([]);

  const handleTest = () => {
    try {
      const re = new RegExp(regex, flags);
      const res: string[] = [];
      let m;
      if (flags.includes('g')) {
        while ((m = re.exec(text)) !== null) {
          res.push(m[0]);
        }
      } else {
        const single = text.match(re);
        if (single) res.push(single[0]);
      }
      setMatches(res);
    } catch {
      setMatches([language === 'en' ? 'Invalid Regular Expression' : 'تعبير نمطي غير صالح']);
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-bold text-slate-400 mb-1">RegExp Pattern</label>
          <input type="text" value={regex} onChange={(e) => setRegex(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">Flags</label>
          <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 mb-1">Test String</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:outline-none" />
      </div>

      <button onClick={handleTest} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🧪 {language === 'en' ? 'Test Regex Match' : 'فحص ومطابقة التعبير النمطي'}
      </button>

      {matches.length > 0 && (
        <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-1.5">
          <span className="text-[9px] font-bold text-slate-500 block uppercase">Matches Found</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs text-emerald-400">
            {matches.map((m, idx) => (
              <span key={idx} className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-bold">{m}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 8. NATO Phonetic Alphabet Converter
export function NatoPhonetic({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const nato: Record<string, string> = {
    A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf',
    H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November',
    O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform',
    V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu'
  };

  const handleConvert = () => {
    const chars = text.toUpperCase().replace(/[^A-Z\s]/g, '');
    const res = chars.split('').map(char => nato[char] || char).join(' ');
    setOutput(res);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type words (e.g., Code)..."
        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
      />

      <button onClick={handleConvert} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        ✈️ {language === 'en' ? 'Convert to NATO Phonetic' : 'التحويل للألفبائية الصوتية للناتو'}
      </button>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[11px] font-mono text-indigo-400 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 9. Text to ASCII Banner Generator
export function ASCIIBanner({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('HELL0');
  const [banner, setBanner] = useState('');

  const letters: Record<string, string[]> = {
    H: ['|__|', '|  |'],
    E: ['|== ', '|___'],
    L: ['|   ', '|___'],
    O: ['|==|', '|__|'],
    Y: [' \\/ ', ' /  '],
    A: [' /\\ ', '/==\\'],
    B: ['|==\\', '|==/'],
    C: ['|== ', '|___'],
    D: ['|==\\', '|==/']
  };

  const handleGenerate = () => {
    const clean = text.toUpperCase().replace(/[^A-Z\s]/g, '');
    let line1 = '';
    let line2 = '';
    for (let i = 0; i < clean.length; i++) {
      const char = clean[i];
      if (char === ' ') {
        line1 += '   ';
        line2 += '   ';
      } else {
        const glyph = letters[char] || [' || ', ' || '];
        line1 += glyph[0] + ' ';
        line2 += glyph[1] + ' ';
      }
    }
    setBanner(line1 + '\n' + line2);
  };

  return (
    <div className="space-y-4 text-left">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type word (A, B, C, D, E, L, H, O, Y)..."
        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
      />

      <button onClick={handleGenerate} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🎨 {language === 'en' ? 'Generate ASCII Banner' : 'توليد لافتة ASCII بارزة'}
      </button>

      {banner && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl relative">
          <div className="absolute top-2 right-2">
            <CopyButton text={banner} language={language} />
          </div>
          <pre className="text-[13px] font-mono text-emerald-400 overflow-x-auto pr-16 select-all leading-tight font-black">
            {banner}
          </pre>
        </div>
      )}
    </div>
  );
}

// 10. Leetspeak Converter
export function LeetspeakConverter({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const handleLeet = () => {
    const leetMap: Record<string, string> = {
      A: '4', B: '8', E: '3', G: '6', I: '1', O: '0', S: '5', T: '7', Z: '2'
    };
    const res = text.toUpperCase().split('').map(char => leetMap[char] || char).join('');
    setOutput(res);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type english phrase (e.g. Hacker)..."
        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
      />

      <button onClick={handleLeet} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        💻 {language === 'en' ? 'Convert to Leetspeak' : 'التحويل للغة ليتسبيك لبرمجة الألعاب'}
      </button>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[11px] font-mono text-indigo-400 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 11. Random Choice Picker
export function RandomChoice({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [winner, setWinner] = useState('');

  const handlePick = () => {
    const items = input.split('\n').map(i => i.trim()).filter(i => i);
    if (items.length === 0) return;
    const random = items[Math.floor(Math.random() * items.length)];
    setWinner(random);
  };

  return (
    <div className="space-y-4 text-left">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={language === 'en' ? 'Enter options (one per line)...' : 'أدخل الخيارات (خيار واحد في كل سطر)...'}
        rows={4}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
      />

      <button onClick={handlePick} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer text-center">
        🎲 {language === 'en' ? 'Pick Random Winner' : 'اختر فائزاً عشوائياً'}
      </button>

      {winner && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">The Random Winner is</span>
          <span className="text-xl font-black font-mono">{winner}</span>
        </div>
      )}
    </div>
  );
}

// 12. Morse Code Translator
export function MorseCode({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const morseAlphabet: Record<string, string> = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
    I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
    Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..'
  };

  const toMorse = () => {
    const clean = text.toUpperCase().replace(/[^A-Z\s]/g, '');
    const res = clean.split('').map(char => morseAlphabet[char] || ' ').join(' ');
    setOutput(res);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type english text (e.g. SOS)..."
        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
      />

      <button onClick={toMorse} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        📻 {language === 'en' ? 'Translate to Morse' : 'التحويل لشفرة مورس'}
      </button>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[11px] font-mono text-indigo-400 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 13. Binary Text Cipher
export function BinaryTextCipher({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => {
    let bits = '';
    for (let i = 0; i < text.length; i++) {
      bits += text.charCodeAt(i).toString(2).padStart(8, '0') + ' ';
    }
    setOutput(bits.trim());
  };

  const decode = () => {
    try {
      const parts = text.trim().split(/\s+/);
      let res = '';
      parts.forEach(part => {
        if (part) {
          res += String.fromCharCode(parseInt(part, 2));
        }
      });
      setOutput(res);
    } catch {
      setOutput(language === 'en' ? 'Invalid Binary cipher stream' : 'مجرى تشفير ثنائي غير صالح');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'en' ? 'Type text or space-separated binary codes...' : 'اكتب نص عادي أو قيم ثنائية مفصولة بمسافات...'}
        rows={4}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-2 gap-3">
        <button onClick={encode} className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Encode to Binary' : 'تشفير إلى نظام ثنائي'}
        </button>
        <button onClick={decode} className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Decode Binary' : 'فك التشفير الثنائي'}
        </button>
      </div>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
