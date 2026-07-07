import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Sparkles, Wand2, Download, Plus, Trash2, Printer, Eye, Settings, RefreshCw } from 'lucide-react';

// QR Code Generator
export function QRCodeGenerator({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState(typeof window !== 'undefined' ? window.location.origin : 'https://toolix.app');
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!text) return;
    QRCode.toDataURL(text, { width: 250, margin: 2, color: { dark: '#ffffff', light: '#090d16' } }, (err, url) => {
      if (!err) setQrUrl(url);
    });
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {language === 'en' ? 'Enter Text or URL' : 'أدخل النص أو الرابط'}
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
          {qrUrl && <img src={qrUrl} alt="QR Code" className="w-40 h-40 rounded-lg p-2 bg-slate-950 border border-slate-900" />}
          {qrUrl && (
            <a
              href={qrUrl}
              download="qrcode.png"
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Download PNG' : 'تحميل الصورة'}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Password Generator
export function PasswordGenerator({ language }: { language: 'en' | 'ar' }) {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let pool = '';
    if (useUpper) pool += upper;
    if (useLower) pool += lower;
    if (useNumbers) pool += numbers;
    if (useSymbols) pool += symbols;

    if (!pool) return;

    let res = '';
    for (let i = 0; i < length; i++) {
      res += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setPassword(res);
  };

  useEffect(() => {
    generate();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex justify-between items-center font-mono text-sm">
        <span className="text-blue-400 break-all select-all">{password}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">{language === 'en' ? 'Length' : 'الطول'}</span>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-xs font-mono font-bold text-blue-400">{length}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/30 border border-slate-800/40 text-xs text-slate-300 font-semibold">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="rounded bg-slate-950 border-slate-800 accent-blue-500" />
            <span>A-Z</span>
          </label>
          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/30 border border-slate-800/40 text-xs text-slate-300 font-semibold">
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="rounded bg-slate-950 border-slate-800 accent-blue-500" />
            <span>a-z</span>
          </label>
          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/30 border border-slate-800/40 text-xs text-slate-300 font-semibold">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="rounded bg-slate-950 border-slate-800 accent-blue-500" />
            <span>0-9</span>
          </label>
          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/30 border border-slate-800/40 text-xs text-slate-300 font-semibold">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="rounded bg-slate-950 border-slate-800 accent-blue-500" />
            <span>Symbols</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// AI Prompt Generator
export function AIPromptGenerator({ language }: { language: 'en' | 'ar' }) {
  const [role, setRole] = useState('Software Engineer');
  const [task, setTask] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generatePrompt = async () => {
    setGenerating(true);
    try {
      // We will try calling our real server endpoint first
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create a highly professional and optimized LLM system prompt for the role of a "${role}". The specific goal is: "${task}". Produce only the output prompt markdown.`
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPrompt(data.text);
      } else {
        throw new Error();
      }
    } catch (e) {
      // Client-side fallback template
      setPrompt(`Act as a professional ${role}.
Your goal is to: ${task || 'provide expert consultation'}.
Always adhere strictly to these principles:
1. Provide actionable, high-quality information with specific examples.
2. Maintain a professional, comprehensive, and objective tone.
3. Structure your response clearly using headers, bullet points, and code blocks where applicable.`);
    }
    setGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Target AI Role' : 'دور الذكاء الاصطناعي المستهدف'}
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="Copywriter / Content Writer">Copywriter / Content Writer</option>
            <option value="SEO Specialist">SEO Specialist</option>
            <option value="Business Strategy Consultant">Business Strategy Consultant</option>
            <option value="Social Media Manager">Social Media Manager</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Task / Goal' : 'المهمة أو الهدف'}
          </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g. Write a marketing email for a SaaS"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
      </div>

      <button
        onClick={generatePrompt}
        disabled={generating}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-md"
      >
        <Sparkles className="w-4 h-4" />
        <span>{generating ? (language === 'en' ? 'Generating...' : 'جاري التوليد...') : (language === 'en' ? 'Generate Optimized Prompt' : 'توليد البرومبت المحسّن')}</span>
      </button>

      {prompt && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Optimized Prompt' : 'البرومبت المحسّن الناتج'}</span>
            <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{language === 'en' ? 'Copy Prompt' : 'نسخ البرومبت'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={prompt}
            rows={6}
            className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}

// Social Media Caption Generator
export function SocialMediaCaptionGenerator({ language }: { language: 'en' | 'ar' }) {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [tone, setTone] = useState('Professional');
  const [caption, setCaption] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateCaption = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Write a compelling ${platform} post caption about: "${topic}". Tone: "${tone}". Include matching hashtags and emojis.`
        })
      });
      if (res.ok) {
        const data = await res.json();
        setCaption(data.text);
      } else {
        throw new Error();
      }
    } catch (e) {
      // Fallback
      setCaption(`🔥 Exciting news! Let's talk about ${topic || 'something amazing'}.
      
As we continue to grow, staying focused on core priorities is everything. What are your thoughts on this?

#growth #innovation #success #trending`);
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Topic / Theme' : 'الموضوع أو الفكرة'}
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Launching a new SaaS product"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Platform' : 'المنصة'}
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="LinkedIn">LinkedIn</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter/X">Twitter / X</option>
            <option value="Facebook">Facebook</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateCaption}
        disabled={generating}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-md"
      >
        <Wand2 className="w-4 h-4" />
        <span>{generating ? (language === 'en' ? 'Generating...' : 'جاري التوليد...') : (language === 'en' ? 'Generate Caption' : 'توليد المنشور الكابشن')}</span>
      </button>

      {caption && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Social Media Caption' : 'المنشور الناتج'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(caption);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{language === 'en' ? 'Copy Post' : 'نسخ'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={caption}
            rows={5}
            className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}

// Resume Builder (Professional Client-side Resume Renders)
export function ResumeBuilder({ language }: { language: 'en' | 'ar' }) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Professional Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Senior React Developer" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Skills (comma-separated)</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, TypeScript, Node.js" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Work History</label>
            <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Describe your experience..." rows={3} className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-medium" />
          </div>
        </div>

        {/* PRINTABLE PREVIEW CARD */}
        <div id="resume-printable-area" className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-md space-y-4 text-left font-sans">
          <div className="border-b pb-4">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{name || 'Your Full Name'}</h2>
            <p className="text-xs font-bold text-blue-600 tracking-wider uppercase mt-0.5">{title || 'Professional Title'}</p>
            <p className="text-[10px] text-slate-500 mt-1">{email || 'your.email@example.com'}</p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b pb-1 mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-1">
              {(skills || 'React, TypeScript, Tailwind').split(',').map((s, idx) => (
                <span key={idx} className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b pb-1 mb-2">Professional Experience</h3>
            <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-wrap">
              {experience || 'Specify your duties, accomplishments, projects, and work history here. It will automatically render neatly inside this beautiful high-fidelity layout.'}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="w-full mt-4 py-2 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all no-print"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Invoice Generator
export function InvoiceGenerator({ language }: { language: 'en' | 'ar' }) {
  const [billTo, setBillTo] = useState('');
  const [items, setItems] = useState([{ desc: 'Consulting Services', qty: 1, price: 100 }]);

  const addItem = () => {
    setItems([...items, { desc: 'Development Work', qty: 1, price: 150 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Bill To (Client Details)</label>
            <input type="text" value={billTo} onChange={(e) => setBillTo(e.target.value)} placeholder="Acme Corporation" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Line Items</span>
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input type="text" value={item.desc} onChange={(e) => handleItemChange(idx, 'desc', e.target.value)} placeholder="Item description" className="flex-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
                <input type="number" value={item.qty} onChange={(e) => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} className="w-14 px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-white text-xs font-mono font-bold" />
                <input type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', parseFloat(e.target.value) || 0)} className="w-20 px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-white text-xs font-mono font-bold" />
                <button onClick={() => removeItem(idx)} className="p-1.5 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/20 text-red-400 rounded-lg cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button onClick={addItem} className="flex items-center gap-1 text-[10px] px-3 py-1.5 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE PREVIEW INVOICE */}
        <div className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-md space-y-4 text-left font-sans">
          <div className="flex justify-between border-b pb-4">
            <div>
              <h2 className="text-lg font-black uppercase text-blue-600 tracking-tight">INVOICE</h2>
              <p className="text-[10px] text-slate-500">Invoice ID: INV-{Date.now().toString().slice(-6)}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block">Toolix Platform Corp</span>
              <span className="text-[9px] text-slate-400 block">Silicon Valley, CA</span>
            </div>
          </div>

          <div>
            <span className="text-[9px] text-slate-400 uppercase font-black block">Bill To:</span>
            <span className="text-xs font-bold text-slate-800">{billTo || 'Client Details / Organization'}</span>
          </div>

          <div className="space-y-1 text-xs border-b pb-4">
            <div className="flex justify-between font-bold text-slate-500 border-b pb-1 text-[10px] uppercase">
              <span>Item / Service</span>
              <span>Total</span>
            </div>
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.desc} (x{item.qty})</span>
                <span className="font-mono">${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-right text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Subtotal:</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Tax (15%):</span>
              <span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-black border-t pt-1.5 text-base text-blue-600">
              <span>Total Due:</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </div>

          <button onClick={() => window.print()} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all no-print">
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Meta Tags Generator
export function MetaTagsGenerator({ language }: { language: 'en' | 'ar' }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://toolix.app';
    const meta = `<!-- Standard Meta Tags -->
<title>${title || 'Toolix - Essential Online Tools'}</title>
<meta name="description" content="${desc || 'Access the ultimate developer, image, and PDF productivity utilities.'}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url || origin}">
<meta property="og:title" content="${title || 'Toolix - Essential Online Tools'}">
<meta property="og:description" content="${desc || 'Access the ultimate developer, image, and PDF productivity utilities.'}">
<meta property="og:image" content="${image || `${origin}/banner.png`}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url || origin}">
<meta property="twitter:title" content="${title || 'Toolix - Essential Online Tools'}">
<meta property="twitter:description" content="${desc || 'Access the ultimate developer, image, and PDF productivity utilities.'}">
<meta property="twitter:image" content="${image || `${origin}/banner.png`}">`;
    setTags(meta);
  }, [title, desc, url, image]);

  const handleCopy = () => {
    navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Site Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. My Awesome Website" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</label>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. A gorgeous SaaS-quality online tool platform." className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target URL</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="e.g. https://mywebsite.com" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Feature Banner Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="e.g. https://mywebsite.com/og-banner.png" className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-semibold" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">HTML Meta tags</span>
            <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Tags</span>
            </button>
          </div>
          <textarea
            readOnly
            value={tags}
            rows={10}
            className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// Random Name Generator
export function RandomNameGenerator({ language }: { language: 'en' | 'ar' }) {
  const [category, setCategory] = useState('Tech Startup');
  const [names, setNames] = useState<string[]>([]);

  const generateNames = () => {
    const data: Record<string, string[]> = {
      'Tech Startup': ['AeroFlow', 'Voltio', 'ByteScale', 'SynthX', 'ZettaCore', 'CloudPulse', 'Antigravity', 'Interstellar', 'HexaCode', 'ApexAI'],
      'Creative Studio': ['PixelWave', 'ArtisanLab', 'PrismFlow', 'EchoCreations', 'MuseCraft', 'CanvasBay', 'StudioBold', 'FableMedia', 'GlowCraft', 'VelvetStudio'],
      'Arabic Names': ['أمير', 'ريان', 'يوسف', 'ليان', 'نور', 'سليم', 'كريم', 'فارس', 'جود', 'ياسين'],
      'Business': ['ApexInvest', 'CoreVentures', 'ProAlpha', 'IntegraCorp', 'FortisGroup', 'Meridux', 'Vanguard', 'OmniScale', 'PrimePartners', 'NexusHoldings']
    };
    const list = data[category] || [];
    setNames([...list].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    generateNames();
  }, [category]);

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Style Theme' : 'سمة ومجال الأسماء'}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="Tech Startup">Tech Startup</option>
            <option value="Creative Studio">Creative Studio</option>
            <option value="Arabic Names">Arabic Names (أسماء عربية)</option>
            <option value="Business">Business & Corporate</option>
          </select>
        </div>
        <button
          onClick={generateNames}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Regenerate' : 'توليد مجدداً'}</span>
        </button>
      </div>

      {names.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {names.map((n, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 flex justify-between items-center hover:bg-slate-900 transition-all font-mono text-xs"
            >
              <span className="text-slate-300 font-bold">{n}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(n);
                }}
                className="text-slate-500 hover:text-white transition-all cursor-pointer text-[10px]"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Unit Converter
export function UnitConverter({ language }: { language: 'en' | 'ar' }) {
  const [value, setValue] = useState('1');
  const [type, setType] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [result, setResult] = useState<number | null>(null);

  const conversions: any = {
    length: {
      m: 1,
      km: 1000,
      ft: 0.3048,
      inch: 0.0254
    },
    weight: {
      kg: 1,
      g: 0.001,
      lbs: 0.453592,
      oz: 0.0283495
    }
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    if (type === 'temp') {
      if (fromUnit === 'C' && toUnit === 'F') setResult(parseFloat(((val * 9/5) + 32).toFixed(2)));
      else if (fromUnit === 'F' && toUnit === 'C') setResult(parseFloat(((val - 32) * 5/9).toFixed(2)));
      else setResult(val);
      return;
    }

    const rates = conversions[type];
    if (!rates) return;
    const valueInBase = val * rates[fromUnit];
    const converted = valueInBase / rates[toUnit];
    setResult(parseFloat(converted.toFixed(4)));
  };

  useEffect(() => {
    convert();
  }, [value, type, fromUnit, toUnit]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
          <select
            value={type}
            onChange={(e) => {
              const val = e.target.value;
              setType(val);
              if (val === 'length') { setFromUnit('m'); setToUnit('km'); }
              else if (val === 'weight') { setFromUnit('kg'); setToUnit('lbs'); }
              else { setFromUnit('C'); setToUnit('F'); }
            }}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="length">Length</option>
            <option value="weight">Weight / Mass</option>
            <option value="temp">Temperature</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            {type === 'length' && (
              <>
                <option value="m">Meters (m)</option>
                <option value="km">Kilometers (km)</option>
                <option value="ft">Feet (ft)</option>
                <option value="inch">Inches (in)</option>
              </>
            )}
            {type === 'weight' && (
              <>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="lbs">Pounds (lbs)</option>
              </>
            )}
            {type === 'temp' && (
              <>
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            {type === 'length' && (
              <>
                <option value="m">Meters (m)</option>
                <option value="km">Kilometers (km)</option>
                <option value="ft">Feet (ft)</option>
                <option value="inch">Inches (in)</option>
              </>
            )}
            {type === 'weight' && (
              <>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="lbs">Pounds (lbs)</option>
              </>
            )}
            {type === 'temp' && (
              <>
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
              </>
            )}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center font-mono text-xl font-bold text-blue-400">
          {value} {fromUnit} = {result} {toUnit}
        </div>
      )}
    </div>
  );
}

// Currency Converter
export function CurrencyConverter({ language }: { language: 'en' | 'ar' }) {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);

  const rates: any = {
    USD: { EUR: 0.92, GBP: 0.79, SAR: 3.75, AED: 3.67, EGP: 48.20, USD: 1 },
    EUR: { USD: 1.09, GBP: 0.86, SAR: 4.08, AED: 3.99, EGP: 52.39, EUR: 1 },
    GBP: { USD: 1.27, EUR: 1.16, SAR: 4.75, AED: 4.65, EGP: 61.02, GBP: 1 },
    SAR: { USD: 0.27, EUR: 0.25, GBP: 0.21, AED: 0.98, EGP: 12.85, SAR: 1 },
    AED: { USD: 0.27, EUR: 0.25, GBP: 0.22, SAR: 1.02, EGP: 13.13, AED: 1 },
    EGP: { USD: 0.021, EUR: 0.019, GBP: 0.016, SAR: 0.078, AED: 0.076, EGP: 1 }
  };

  const convert = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt)) return;
    const rate = rates[from]?.[to] || 1;
    setResult(parseFloat((amt * rate).toFixed(2)));
  };

  useEffect(() => {
    convert();
  }, [amount, from, to]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="EGP">EGP (ج.م)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="EGP">EGP (ج.م)</option>
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center font-mono text-xl font-bold text-emerald-400">
          {amount} {from} = {result} {to}
        </div>
      )}
    </div>
  );
}

// Password Strength Checker
export function PasswordChecker({ language }: { language: 'en' | 'ar' }) {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: 'bg-red-500' });

  const checkStrength = (val: string) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    let label = 'Weak';
    let color = 'bg-red-500';

    if (score === 4) {
      label = 'Very Strong';
      color = 'bg-emerald-500';
    } else if (score === 3) {
      label = 'Strong';
      color = 'bg-teal-500';
    } else if (score === 2) {
      label = 'Medium';
      color = 'bg-amber-500';
    }

    setStrength({ score, label, color });
  };

  useEffect(() => {
    checkStrength(password);
  }, [password]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Enter Password to Check' : 'أدخل كلمة المرور لفحصها'}
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-mono"
        />
      </div>

      {password && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Strength:</span>
            <span className={strength.score >= 3 ? 'text-emerald-400' : strength.score === 2 ? 'text-amber-400' : 'text-red-400'}>{strength.label}</span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <div className={`h-full ${strength.color} transition-all`} style={{ width: `${(strength.score / 4) * 100}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

// Barcode Generator
export function BarcodeGenerator({ language }: { language: 'en' | 'ar' }) {
  const [text, setText] = useState('1234567890');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Enter Barcode Value' : 'أدخل قيمة الباركود'}
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
        />
      </div>

      <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-slate-200 space-y-3">
        {/* Render a gorgeous high-fidelity dynamic barcode using pure CSS bars */}
        <div className="flex items-end h-24 bg-white px-6 py-2 rounded">
          {text.split('').map((char, idx) => {
            const width = (parseInt(char) || 1) % 4 + 1;
            const space = (idx % 3 === 0) ? 'mr-1' : 'mr-0.5';
            return (
              <div
                key={idx}
                className={`bg-slate-950 ${space}`}
                style={{ width: `${width}px`, height: idx % 2 === 0 ? '100%' : '85%' }}
              />
            );
          })}
        </div>
        <span className="text-slate-900 font-mono text-sm tracking-widest font-bold">{text}</span>
      </div>
    </div>
  );
}

// Username Generator
export function UsernameGenerator({ language }: { language: 'en' | 'ar' }) {
  const [seed, setSeed] = useState('');
  const [usernames, setUsernames] = useState<string[]>([]);

  const generateUsernames = () => {
    const prefixes = ['The', 'Real', 'Crypto', 'Alpha', 'Cyber', 'Neon', 'Pixel', 'Sonic', 'Hyper', 'Swift'];
    const suffixes = ['_OP', 'X', '99', 'Core', 'Flow', '_dev', 'Cloud', 'Pulse', 'Apex', 'Star'];
    
    let res: string[] = [];
    for (let i = 0; i < 6; i++) {
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      const customSeed = seed ? seed.toLowerCase().replace(/\s+/g, '') : 'user';
      res.push(`${p}${customSeed}${s}`);
    }
    setUsernames(res);
  };

  useEffect(() => {
    generateUsernames();
  }, [seed]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Base Word (Optional)' : 'الكلمة الأساسية (اختياري)'}
        </label>
        <input
          type="text"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          placeholder="e.g. gamer"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {usernames.map((u, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-blue-400 font-mono font-bold">{u}</span>
            <button
              onClick={() => navigator.clipboard.writeText(u)}
              className="text-[10px] text-slate-400 hover:text-white cursor-pointer"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lorem Ipsum Generator
export function LoremIpsum({ language }: { language: 'en' | 'ar' }) {
  const [paragraphs, setParagraphs] = useState(2);
  const [text, setText] = useState('');

  const generateLorem = () => {
    const p1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    const p2 = 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const p3 = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.';

    let res = [];
    for (let i = 0; i < paragraphs; i++) {
      if (i % 3 === 0) res.push(p1);
      else if (i % 3 === 1) res.push(p2);
      else res.push(p3);
    }
    setText(res.join('\n\n'));
  };

  useEffect(() => {
    generateLorem();
  }, [paragraphs]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
        <span>Paragraphs Count:</span>
        <input
          type="number"
          min="1"
          max="10"
          value={paragraphs}
          onChange={(e) => setParagraphs(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-20 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold"
        />
      </div>

      <textarea
        readOnly
        value={text}
        rows={6}
        className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs leading-relaxed"
      />
    </div>
  );
}

// Signature Generator (Interactive Drawing Canvas)
export function SignatureGenerator({ language }: { language: 'en' | 'ar' }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2d7ff9');

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;
    }
    return ctx;
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getCanvasContext();
    if (!ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getCanvasContext();
    if (!ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signature.png';
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs font-bold text-slate-400">
        <span>{language === 'en' ? 'Draw your signature below:' : 'ارسم توقيعك في المساحة أدناه:'}</span>
        <div className="flex items-center gap-2">
          <span>Stroke Color:</span>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-6 bg-transparent border-0 cursor-pointer" />
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl cursor-crosshair touch-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={clearCanvas} className="py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all">
          {language === 'en' ? 'Clear Canvas' : 'مسح اللوحة'}
        </button>
        <button onClick={downloadSignature} className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
          {language === 'en' ? 'Download PNG' : 'تحميل صورة شفافة'}
        </button>
      </div>
    </div>
  );
}

// RGB to HEX & HEX to RGB
export function RGBHexConverter({ language }: { language: 'en' | 'ar' }) {
  const [hex, setHex] = useState('#2d7ff9');
  const [rgb, setRgb] = useState('45, 127, 249');

  const convertHexToRgb = (h: string) => {
    const clean = h.replace('#', '');
    if (clean.length === 6) {
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);
      setRgb(`${r}, ${g}, ${b}`);
    }
  };

  const convertRgbToHex = (rStr: string) => {
    const parts = rStr.split(',').map(p => parseInt(p.trim()));
    if (parts.length === 3 && parts.every(p => !isNaN(p) && p >= 0 && p <= 255)) {
      const h = '#' + parts.map(p => p.toString(16).padStart(2, '0')).join('');
      setHex(h);
    }
  };

  return (
    <div className="space-y-4 text-xs font-bold">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 mb-2">HEX Code</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => {
              setHex(e.target.value);
              convertHexToRgb(e.target.value);
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-2">RGB Format</label>
          <input
            type="text"
            value={rgb}
            onChange={(e) => {
              setRgb(e.target.value);
              convertRgbToHex(e.target.value);
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
          />
        </div>
      </div>

      <div className="p-6 rounded-xl border border-slate-800 flex items-center justify-center text-sm" style={{ backgroundColor: hex }}>
        <span className="bg-slate-950/80 px-4 py-1.5 rounded-lg text-white font-mono">{hex}</span>
      </div>
    </div>
  );
}

// Binary / Numerical Base Converter
export function BinaryConverter({ language }: { language: 'en' | 'ar' }) {
  const [decimal, setDecimal] = useState('42');
  const [binary, setBinary] = useState('101010');
  const [hexVal, setHexVal] = useState('2a');

  const updateFromDecimal = (val: string) => {
    const num = parseInt(val, 10);
    setDecimal(val);
    if (!isNaN(num)) {
      setBinary(num.toString(2));
      setHexVal(num.toString(16));
    } else {
      setBinary('');
      setHexVal('');
    }
  };

  const updateFromBinary = (val: string) => {
    const num = parseInt(val, 2);
    setBinary(val);
    if (!isNaN(num)) {
      setDecimal(num.toString(10));
      setHexVal(num.toString(16));
    } else {
      setDecimal('');
      setHexVal('');
    }
  };

  return (
    <div className="space-y-4 text-xs font-bold text-left">
      <div>
        <label className="block text-slate-400 mb-1.5">Decimal (Base 10)</label>
        <input type="text" value={decimal} onChange={(e) => updateFromDecimal(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono" />
      </div>
      <div>
        <label className="block text-slate-400 mb-1.5">Binary (Base 2)</label>
        <input type="text" value={binary} onChange={(e) => updateFromBinary(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono" />
      </div>
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center font-mono text-base font-bold text-blue-400">
        HEX = {hexVal.toUpperCase()}
      </div>
    </div>
  );
}
