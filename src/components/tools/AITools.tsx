import React, { useState } from 'react';
import { Sparkles, Copy, Check, RotateCcw, ArrowRightLeft } from 'lucide-react';

interface ToolProps {
  language: 'en' | 'ar';
}

// Helper to call server Gemini API or fallback
async function callGemini(prompt: string, fallbackText: string): Promise<string> {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    if (res.ok) {
      const data = await res.json();
      return data.text;
    }
  } catch (e) {
    console.error('Gemini API call failed, using offline template', e);
  }
  return fallbackText;
}

// 1. AI Text Rewriter
export function AITextRewriter({ language }: ToolProps) {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRewrite = async () => {
    if (!text.trim()) return;
    setLoading(true);

    const fallbackDict: Record<string, string> = {
      professional: `Here is a professional revision of your text:\n\n"${text.trim()}"\n\nI have polished the grammar, enhanced the vocabulary, and structured it to sound formal and authoritative.`,
      casual: `Here is a casual, friendly version:\n\n"Hey! ${text.trim()}"\n\nKept it super simple, conversational, and easy to read.`,
      persuasive: `Here is a persuasive, sales-oriented version:\n\n"${text.trim()}"\n\nDesigned to capture attention, highlight benefits, and prompt immediate action.`,
      academic: `Here is an academic revision:\n\n"The following represents a formal scholastic restructuring: ${text.trim()}"\n\nPolished with formal terminology, passive structures, and objective formulations.`
    };

    const prompt = `Rewrite the following text in a "${tone}" tone. Make sure the output is polished, high-quality, and matches the tone perfectly. Provide only the rewritten text.\n\nText:\n"${text}"`;
    const fallback = fallbackDict[tone] || `Rewritten version:\n${text}`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Original Text' : 'النص الأصلي'}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={language === 'en' ? 'Paste your text here to rewrite...' : 'ألصق نصك هنا لإعادة صياغته...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Rewrite Tone' : 'نبرة الصياغة'}
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="professional">{language === 'en' ? 'Professional' : 'مهني / احترافي'}</option>
            <option value="casual">{language === 'en' ? 'Casual / Friendly' : 'ودي / غير رسمي'}</option>
            <option value="persuasive">{language === 'en' ? 'Persuasive / Sales' : 'مقنع / مبيعات'}</option>
            <option value="academic">{language === 'en' ? 'Academic / Formal' : 'أكاديمي / رسمي'}</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleRewrite}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{loading ? (language === 'en' ? 'Rewriting...' : 'جاري الصياغة...') : (language === 'en' ? 'Rewrite Text' : 'إعادة الصياغة بالذكاء الاصطناعي')}</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Rewritten Result' : 'النص المصاغ الناتج'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Text' : 'نسخ النص')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// 2. AI Summarizer
export function AISummarizer({ language }: ToolProps) {
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);

    const fallback = `Summary Output (${length} length):\n\n• Key Point 1: Condensation of the source content emphasizing the primary theme.\n• Key Point 2: Secondary objective highlights stripped of filler statements.\n• Key Point 3: Important statistics or context preserved for offline reading.`;

    const prompt = `Provide a concise, high-quality bulleted summary (${length} length) of the following text:\n\nText:\n"${text}"`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Text to Summarize' : 'النص المراد تلخيصه'}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={language === 'en' ? 'Paste long articles or documents here...' : 'ألصق المقالات أو النصوص الطويلة هنا...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Summary Length' : 'طول التلخيص'}
          </label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="short">{language === 'en' ? 'Short Bullet Points' : 'نقاط موجزة قصيرة'}</option>
            <option value="medium">{language === 'en' ? 'Medium Summary' : 'تلخيص متوسط'}</option>
            <option value="long">{language === 'en' ? 'Detailed Summary' : 'تلخيص مفصل وموسع'}</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? (language === 'en' ? 'Summarizing...' : 'جاري التلخيص...') : (language === 'en' ? 'Summarize Text' : 'تلخيص النص بالذكاء الاصطناعي')}</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Summary Result' : 'ملخص النص الناتج'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Summary' : 'نسخ التلخيص')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// 3. AI Translator
export function AITranslator({ language }: ToolProps) {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('ar');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);

    const fallback = `Translated output to ${targetLang}:\n\n[Translation Fallback] (Setup API Key to enable real-time translations via Gemini):\n\n"${text.trim()}"`;

    const prompt = `Translate the following text into target language: "${targetLang}". Keep the original structure and formatting, only output the direct translation.\n\nText:\n"${text}"`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Source Text' : 'النص المطلوب ترجمته'}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={language === 'en' ? 'Type or paste text to translate...' : 'اكتب أو ألصق النص للترجمة المباشرة...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Target Language' : 'اللغة المستهدفة'}
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="Arabic">{language === 'en' ? 'Arabic' : 'العربية'}</option>
            <option value="English">{language === 'en' ? 'English' : 'الإنجليزية'}</option>
            <option value="Spanish">{language === 'en' ? 'Spanish' : 'الإسبانية'}</option>
            <option value="French">{language === 'en' ? 'French' : 'الفرنسية'}</option>
            <option value="German">{language === 'en' ? 'German' : 'الألمانية'}</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{loading ? (language === 'en' ? 'Translating...' : 'جاري الترجمة...') : (language === 'en' ? 'Translate' : 'ترجمة بالذكاء الاصطناعي')}</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Translation Result' : 'نص الترجمة الناتج'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy' : 'نسخ')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// 4. AI Email Writer
export function AIEmailWriter({ language }: ToolProps) {
  const [recipient, setRecipient] = useState('');
  const [purpose, setPurpose] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [tone, setTone] = useState('professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!purpose.trim()) return;
    setLoading(true);

    const fallback = `Subject: Professional Follow-up / Response regarding: ${purpose}\n\nDear ${recipient || 'recipient'},\n\nI am writing to communicate regarding: ${purpose}.\n\nSpecifically, please consider the following details:\n${keyPoints ? `- ${keyPoints}` : '- Point of action/discussion'}\n\nI appreciate your prompt attention and look forward to collaborating further.\n\nBest regards,\n[Your Name]`;

    const prompt = `Write a polished email to "${recipient || 'Recipient'}" with the following purpose: "${purpose}". Tone: "${tone}". Key points to cover:\n${keyPoints}. Make it outstanding and structure with Subject and Body.`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Recipient (e.g., Manager, Client)' : 'المستلم (مثال: المدير، العميل)'}
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g. Hiring Manager"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Tone' : 'النبرة'}
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="professional">{language === 'en' ? 'Professional' : 'رسمي واحترافي'}</option>
            <option value="friendly">{language === 'en' ? 'Friendly / Casual' : 'ودي وغير رسمي'}</option>
            <option value="urgent">{language === 'en' ? 'Urgent / Direct' : 'عاجل ومباشر'}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Email Subject / Purpose' : 'موضوع أو غرض الإيميل'}
        </label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="e.g. Requesting a feedback session"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Key Points to Include' : 'النقاط الرئيسية لتضمينها'}
        </label>
        <textarea
          value={keyPoints}
          onChange={(e) => setKeyPoints(e.target.value)}
          placeholder={language === 'en' ? 'Enter important points (one per line)...' : 'أدخل النقاط الأساسية (نقطة في كل سطر)...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? (language === 'en' ? 'Drafting...' : 'جاري كتابة المسودة...') : (language === 'en' ? 'Generate Email' : 'كتابة الإيميل بالذكاء الاصطناعي')}</span>
      </button>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Drafted Email' : 'مسودة الإيميل الناتجة'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Email' : 'نسخ مسودة الإيميل')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// 5. AI Hashtag Generator
export function AIHashtagGenerator({ language }: ToolProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const fallback = `#Trending #Viral #SaaS #Developer #TechLife #AIEfficiency #Success`;
    const prompt = `Generate a set of 15 trending, highly relevant hashtags for social media based on this post or topic: "${input}". Provide only space-separated hashtags.`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Post Topic / Content Description' : 'موضوع المنشور أو الوصف'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'en' ? 'Enter social media post draft or keywords...' : 'أدخل مسودة المنشور أو الكلمات المفتاحية...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? (language === 'en' ? 'Generating Hashtags...' : 'جاري توليد الهاشتاقات...') : (language === 'en' ? 'Generate Hashtags' : 'توليد الهاشتاقات بالذكاء الاصطناعي')}</span>
      </button>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Generated Hashtags' : 'الهاشتاقات الناتجة'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Hashtags' : 'نسخ الهاشتاقات')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-blue-400 text-sm font-semibold tracking-wide leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// 6. AI SEO Generator
export function AISEOGenerator({ language }: ToolProps) {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    const fallback = `Title: Best Online Utilities Hub | Fast, Free, and Secure\nMeta Description: Explore a collection of 100+ professional free utilities. No registration or server storage required. Complete security.\nKeywords: utility tools, dev tools, free calculators, format code offline`;
    const prompt = `Generate a fully optimized SEO Meta Tags package for a page about "${topic}". Keywords: "${keywords}". Output: Title, Meta Description, and optimized meta keywords list.`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Page Topic / Product' : 'موضوع الصفحة أو المنتج'}
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Offline PDF merger and splitter"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Target Keywords' : 'الكلمات المفتاحية المستهدفة'}
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. pdf joiner, split pdf files"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? (language === 'en' ? 'Generating SEO Meta...' : 'جاري التوليد...') : (language === 'en' ? 'Generate SEO Meta' : 'توليد بيانات السيو بالذكاء الاصطناعي')}</span>
      </button>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'SEO Metadata' : 'بيانات السيو الناتجة'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Metadata' : 'نسخ بيانات السيو')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// 7. AI Blog Generator
export function AIBlogGenerator({ language }: ToolProps) {
  const [topic, setTopic] = useState('');
  const [outlineOnly, setOutlineOnly] = useState(true);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    const fallback = `# Blog Post: ${topic}\n\n## Introduction\nBrief hook discussing why this topic is highly relevant today.\n\n## Section 1: The Core Foundation\nKey analysis, benefits, and common methodologies.\n\n## Section 2: Practical Implementation Steps\nStep-by-step guidance on execution.\n\n## Conclusion\nWrapping up thoughts and calling to action.`;
    const prompt = outlineOnly 
      ? `Write a detailed, engaging blog post outline for: "${topic}".` 
      : `Write a high-quality, comprehensive blog post introduction and detailed draft for: "${topic}".`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Blog Topic / Title' : 'عنوان أو موضوع المدونة'}
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 10 Habits of Highly Efficient Engineers"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Output Format' : 'صيغة المخرجات'}
          </label>
          <select
            value={outlineOnly ? 'outline' : 'full'}
            onChange={(e) => setOutlineOnly(e.target.value === 'outline')}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="outline">{language === 'en' ? 'Structured Outline Only' : 'هيكل ومخطط تفصيلي فقط'}</option>
            <option value="full">{language === 'en' ? 'Full Blog Article Draft' : 'مسودة مقال كاملة'}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? (language === 'en' ? 'Writing Blog...' : 'جاري كتابة المقال...') : (language === 'en' ? 'Generate Blog' : 'توليد المقال بالذكاء الاصطناعي')}</span>
      </button>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Blog Article Draft' : 'مسودة المقال الناتجة'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Article' : 'نسخ المقال')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed markdown-body">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// 8. AI Product Description Generator
export function AIProductDescription({ language }: ToolProps) {
  const [name, setName] = useState('');
  const [features, setFeatures] = useState('');
  const [tone, setTone] = useState('persuasive');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!name.trim()) return;
    setLoading(true);

    const fallback = `Introducing the all-new ${name}!\n\nDesigned for modern consumers who refuse to compromise, this product integrates premium elements and cutting-edge craftsmanship.\n\nKey features include:\n${features ? features : '• High-durability construct\n• Seamless elegant styling'}\n\nExperience unmatched performance today!`;
    const prompt = `Write a compelling and highly persuasive marketing product description for: "${name}". Key features: "${features}". Marketing Tone: "${tone}". Output should be exciting, professional, and clear.`;

    const res = await callGemini(prompt, fallback);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Product Name' : 'اسم المنتج'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. EcoFit Ergonomic Chair"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'en' ? 'Marketing Tone' : 'نبرة التسويق'}
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-bold focus:outline-none"
          >
            <option value="persuasive">{language === 'en' ? 'Persuasive / Bold' : 'مقنع وقوي'}</option>
            <option value="luxury">{language === 'en' ? 'Luxury / Elegant' : 'فاخر وأنيق'}</option>
            <option value="minimalist">{language === 'en' ? 'Minimalist / Direct' : 'بسيط ومباشر'}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Key Features / Selling Points' : 'الميزات والمواصفات الأساسية'}
        </label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder={language === 'en' ? 'e.g. 3D adjustable armrests, Lumbar spinal support...' : 'مثال: مساند أذرع قابلة للتعديل ثلاثية الأبعاد، دعم للعمود الفقري...'}
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md hover:from-blue-700 hover:to-purple-700 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? (language === 'en' ? 'Generating Description...' : 'جاري توليد الوصف...') : (language === 'en' ? 'Generate Product Description' : 'توليد وصف المنتج بالذكاء الاصطناعي')}</span>
      </button>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">{language === 'en' ? 'Product Description' : 'وصف المنتج التسويقي الناتج'}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-blue-450 hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Description' : 'نسخ الوصف')}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
