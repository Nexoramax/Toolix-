import React, { useState } from 'react';
import { Copy, Check, Terminal, ShieldAlert } from 'lucide-react';

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

// 1. Unix Epoch Timestamp Converter
export function EpochConverter({ language }: { language: 'en' | 'ar' }) {
  const [epoch, setEpoch] = useState(() => Math.floor(Date.now() / 1000).toString());
  const [humanDate, setHumanDate] = useState('');
  const [targetDateStr, setTargetDateStr] = useState(() => new Date().toISOString());
  const [targetEpoch, setTargetEpoch] = useState('');

  const handleConvertEpoch = () => {
    try {
      const ms = epoch.length > 11 ? Number(epoch) : Number(epoch) * 1000;
      setHumanDate(new Date(ms).toUTCString() + ' / ' + new Date(ms).toLocaleString());
    } catch {
      setHumanDate(language === 'en' ? 'Invalid Epoch' : 'ختم زمني غير صالح');
    }
  };

  const handleConvertDate = () => {
    try {
      setTargetEpoch(Math.floor(Date.now() / 1000).toString());
      const parsed = Date.parse(targetDateStr);
      if (!isNaN(parsed)) {
        setTargetEpoch(Math.floor(parsed / 1000).toString());
      } else {
        setTargetEpoch(language === 'en' ? 'Invalid Date string' : 'تاريخ غير صالح');
      }
    } catch {
      setTargetEpoch(language === 'en' ? 'Invalid Date' : 'تاريخ غير صالح');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Epoch to Human */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Unix Epoch Timestamp to Human Date' : 'تحويل الختم الزمني Unix إلى تاريخ'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={epoch}
              onChange={(e) => setEpoch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white"
            />
            <button
              onClick={() => setEpoch(Math.floor(Date.now() / 1000).toString())}
              className="px-2.5 py-1 text-[10px] font-bold bg-slate-800 rounded-lg text-slate-300"
            >
              NOW
            </button>
          </div>
          <button
            onClick={handleConvertEpoch}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
          >
            {language === 'en' ? 'Convert to Date' : 'تحويل إلى تاريخ'}
          </button>
          {humanDate && (
            <div className="p-3 bg-slate-900 border border-slate-850 rounded-lg text-xs font-mono text-emerald-400 select-all leading-relaxed">
              {humanDate}
            </div>
          )}
        </div>

        {/* Human to Epoch */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Human Date to Unix Epoch' : 'تحويل التاريخ إلى ختم زمني Unix'}
          </label>
          <input
            type="text"
            value={targetDateStr}
            onChange={(e) => setTargetDateStr(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white"
          />
          <button
            onClick={handleConvertDate}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
          >
            {language === 'en' ? 'Convert to Epoch' : 'تحويل إلى ختم زمني'}
          </button>
          {targetEpoch && (
            <div className="p-3 bg-slate-900 border border-slate-850 rounded-lg text-xs font-mono text-blue-400 flex justify-between items-center">
              <span className="select-all">{targetEpoch}</span>
              <CopyButton text={targetEpoch} language={language} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 2. JWT Decoder (Offline client side)
export function JWTDecoder({ language }: { language: 'en' | 'ar' }) {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');

  const handleDecode = () => {
    try {
      const parts = token.trim().split('.');
      if (parts.length < 2) {
        setHeader(language === 'en' ? 'Invalid token format' : 'صيغة التوكن غير صحيحة');
        setPayload('');
        setSignature('');
        return;
      }

      const decodedHeader = JSON.stringify(JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))), null, 2);
      const decodedPayload = JSON.stringify(JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))), null, 2);
      
      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setSignature(parts[2] || '');
    } catch {
      setHeader(language === 'en' ? 'Failed to decode. Check token format.' : 'فشل فك الترميز. يرجى التحقق من صحة التوكن.');
      setPayload('');
      setSignature('');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder={language === 'en' ? 'Paste your JWT token here...' : 'ألصق توكن JWT هنا...'}
        rows={3}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={handleDecode}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
      >
        🔓 {language === 'en' ? 'Decode JWT' : 'فك تشفير JWT'}
      </button>

      {header && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-red-400 uppercase font-mono block">Header (ALGORITHM & TOKEN TYPE)</span>
            <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto max-h-40">{header}</pre>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono block">Payload (DATA)</span>
            <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto max-h-40">{payload}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. HTML Entity Encoder / Decoder
export function HTMLEntityEncoder({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => {
    const el = document.createElement('div');
    el.innerText = input;
    setOutput(el.innerHTML);
  };

  const decode = () => {
    const el = document.createElement('div');
    el.innerHTML = input;
    setOutput(el.innerText);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={language === 'en' ? 'Enter string here...' : 'أدخل النص هنا...'}
        rows={4}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="grid grid-cols-2 gap-3">
        <button onClick={encode} className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Encode to Entities' : 'ترميز كود HTML'}
        </button>
        <button onClick={decode} className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Decode Entities' : 'فك ترميز كود HTML'}
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

// 4. Crontab Expression Generator
export function CrontabGenerator({ language }: { language: 'en' | 'ar' }) {
  const [m, setM] = useState('*');
  const [h, setH] = useState('*');
  const [dom, setDom] = useState('*');
  const [mon, setMon] = useState('*');
  const [dow, setDow] = useState('*');

  const cronStr = `${m} ${h} ${dom} ${mon} ${dow}`;

  const explainCron = () => {
    let expl = 'Runs ';
    if (m === '*' && h === '*') expl += 'every minute';
    else if (m !== '*' && h === '*') expl += `at minute ${m} of every hour`;
    else if (m !== '*' && h !== '*') expl += `at ${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    
    if (dom !== '*') expl += `, on day ${dom} of the month`;
    if (mon !== '*') expl += `, of month ${mon}`;
    if (dow !== '*') expl += `, on weekday index ${dow}`;
    return expl;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        <div>
          <span className="block font-bold text-slate-400 mb-1">Minute</span>
          <input type="text" value={m} onChange={(e) => setM(e.target.value)} className="w-full text-center py-2 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">Hour</span>
          <input type="text" value={h} onChange={(e) => setH(e.target.value)} className="w-full text-center py-2 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">Day</span>
          <input type="text" value={dom} onChange={(e) => setDom(e.target.value)} className="w-full text-center py-2 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">Month</span>
          <input type="text" value={mon} onChange={(e) => setMon(e.target.value)} className="w-full text-center py-2 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
        </div>
        <div>
          <span className="block font-bold text-slate-400 mb-1">Weekday</span>
          <input type="text" value={dow} onChange={(e) => setDow(e.target.value)} className="w-full text-center py-2 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
        </div>
      </div>

      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3 text-center">
        <div>
          <span className="text-[9px] font-bold text-slate-500 uppercase block">{language === 'en' ? 'Generated Cron Expression' : 'تعبير Cron الناتج'}</span>
          <span className="text-xl font-bold font-mono text-indigo-400 select-all">{cronStr}</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 italic">
          {explainCron()}
        </div>
      </div>
    </div>
  );
}

// 5. XML Formatter / Minifier
export function XMLFormatter({ language }: { language: 'en' | 'ar' }) {
  const [xml, setXml] = useState('');
  const [output, setOutput] = useState('');

  const formatXml = () => {
    let formatted = '';
    let indent = '';
    const reg = /(>)(<)(\/*)/g;
    const xmlClean = xml.replace(reg, '$1\r\n$2$3');
    xmlClean.split('\r\n').forEach(node => {
      if (node.match(/.+<\/\w[^>]*>$/)) {
        formatted += indent + node + '\r\n';
      } else if (node.match(/^<\/\w/)) {
        if (indent !== '') indent = indent.substring(2);
        formatted += indent + node + '\r\n';
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        formatted += indent + node + '\r\n';
        indent += '  ';
      } else {
        formatted += indent + node + '\r\n';
      }
    });
    setOutput(formatted.trim());
  };

  const minifyXml = () => {
    setOutput(xml.replace(/>\s+</g, '><').trim());
  };

  return (
    <div className="space-y-4">
      <textarea
        value={xml}
        onChange={(e) => setXml(e.target.value)}
        placeholder={language === 'en' ? 'Paste raw XML here...' : 'ألصق كود XML هنا...'}
        rows={6}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="grid grid-cols-2 gap-3">
        <button onClick={formatXml} className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Format XML' : 'تنسيق كود XML'}
        </button>
        <button onClick={minifyXml} className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Minify XML' : 'تقليص كود XML'}
        </button>
      </div>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto pr-16 select-all pt-1.5 max-h-60 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 6. YAML to JSON Converter
export function YAMLToJSON({ language }: { language: 'en' | 'ar' }) {
  const [yaml, setYaml] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');

  const convertYamlToJson = () => {
    try {
      // Basic client-side YAML parser using spacing indentation heuristics
      const lines = yaml.split('\n');
      const obj: any = {};
      lines.forEach(line => {
        const clean = line.trim();
        if (!clean || clean.startsWith('#')) return;
        const index = clean.indexOf(':');
        if (index !== -1) {
          const key = clean.substring(0, index).trim();
          let val: any = clean.substring(index + 1).trim();
          if (val === 'true') val = true;
          else if (val === 'false') val = false;
          else if (!isNaN(Number(val)) && val !== '') val = Number(val);
          obj[key] = val;
        }
      });
      setJsonOutput(JSON.stringify(obj, null, 2));
    } catch {
      setJsonOutput(language === 'en' ? 'Error parsing YAML' : 'خطأ في معالجة كود YAML');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={yaml}
        onChange={(e) => setYaml(e.target.value)}
        placeholder="key: value&#10;number: 42&#10;boolean: true"
        rows={6}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={convertYamlToJson}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
      >
        🔄 {language === 'en' ? 'Convert to JSON' : 'تحويل إلى JSON'}
      </button>

      {jsonOutput && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={jsonOutput} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-amber-400 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {jsonOutput}
          </pre>
        </div>
      )}
    </div>
  );
}

// 7. JSON to YAML Converter
export function JSONToYAML({ language }: { language: 'en' | 'ar' }) {
  const [json, setJson] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');

  const convertJsonToYaml = () => {
    try {
      const parsed = JSON.parse(json);
      let yml = '';
      Object.keys(parsed).forEach(key => {
        yml += `${key}: ${parsed[key]}\n`;
      });
      setYamlOutput(yml);
    } catch {
      setYamlOutput(language === 'en' ? 'Invalid JSON syntax' : 'كود JSON غير صالح');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='{ "key": "value", "number": 42 }'
        rows={6}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={convertJsonToYaml}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
      >
        🔄 {language === 'en' ? 'Convert to YAML' : 'تحويل إلى YAML'}
      </button>

      {yamlOutput && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={yamlOutput} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto pr-16 select-all pt-1.5 leading-relaxed">
            {yamlOutput}
          </pre>
        </div>
      )}
    </div>
  );
}

// 8. HMAC Keyed-Hash Generator
export function HMACGenerator({ language }: { language: 'en' | 'ar' }) {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [algo, setAlgo] = useState<'SHA-256' | 'SHA-1'>('SHA-256');
  const [hmacValue, setHmacValue] = useState('');

  const generateHmac = async () => {
    if (!message || !key) return;
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(key);
      const messageData = encoder.encode(message);

      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algo },
        false,
        ['sign']
      );

      const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
      const hashArray = Array.from(new Uint8Array(signature));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHmacValue(hashHex);
    } catch {
      setHmacValue(language === 'en' ? 'Crypto error' : 'حدث خطأ تشفيري');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Message' : 'نص الرسالة'}</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Secret Key' : 'مفتاح السر HMAC'}</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        {(['SHA-256', 'SHA-1'] as const).map(a => (
          <button
            key={a}
            onClick={() => setAlgo(a)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${algo === a ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}
          >
            {a}
          </button>
        ))}
      </div>

      <button
        onClick={generateHmac}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
      >
        ⚙️ {language === 'en' ? 'Generate HMAC Signature' : 'إنشاء توقيع HMAC المشفّر'}
      </button>

      {hmacValue && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs font-mono text-emerald-400">
          <span className="select-all block max-w-[85%] truncate">{hmacValue}</span>
          <CopyButton text={hmacValue} language={language} />
        </div>
      )}
    </div>
  );
}

// 9. Markdown Table Generator
export function MarkdownTableGenerator({ language }: { language: 'en' | 'ar' }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [output, setOutput] = useState('');

  const generateTable = () => {
    let md = '|';
    for (let c = 1; c <= cols; c++) md += ` Header ${c} |`;
    md += '\n|';
    for (let c = 1; c <= cols; c++) md += ' --- |';
    md += '\n';

    for (let r = 1; r <= rows; r++) {
      md += '|';
      for (let c = 1; c <= cols; c++) md += ` Cell ${r},${c} |`;
      md += '\n';
    }
    setOutput(md);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Rows count' : 'عدد الأسطر'}</label>
          <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Columns count' : 'عدد الأعمدة'}</label>
          <input type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
        </div>
      </div>

      <button onClick={generateTable} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        📊 {language === 'en' ? 'Generate Markdown Table' : 'توليد جدول ماركداون'}
      </button>

      {output && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative text-left">
          <div className="absolute top-2 right-2">
            <CopyButton text={output} language={language} />
          </div>
          <pre className="text-[10px] font-mono text-indigo-400 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// 10. HTTP Status Codes Finder
export function HTTPStatusCodes({ language }: { language: 'en' | 'ar' }) {
  const [query, setQuery] = useState('');
  
  const codes = [
    { code: '200', name: 'OK', desc: 'Standard response for successful HTTP requests.' },
    { code: '201', name: 'Created', desc: 'The request has been fulfilled, resulting in the creation of a new resource.' },
    { code: '301', name: 'Moved Permanently', desc: 'This and all future requests should be directed to the given URI.' },
    { code: '302', name: 'Found (Temporary Redirect)', desc: 'The resource requested is temporarily located under a different URI.' },
    { code: '400', name: 'Bad Request', desc: 'The server cannot process the request due to client-side syntax errors.' },
    { code: '401', name: 'Unauthorized', desc: 'Similar to 403 Forbidden but specifically for use when authentication is required.' },
    { code: '403', name: 'Forbidden', desc: 'The request was valid, but the server is refusing action (insufficient permissions).' },
    { code: '404', name: 'Not Found', desc: 'The requested resource could not be found but may be available in the future.' },
    { code: '500', name: 'Internal Server Error', desc: 'A generic error message, given when an unexpected condition was encountered.' },
    { code: '502', name: 'Bad Gateway', desc: 'The server was acting as a gateway or proxy and received an invalid response.' },
    { code: '503', name: 'Service Unavailable', desc: 'The server is temporarily offline, overloaded or down for maintenance.' }
  ];

  const filtered = codes.filter(c => c.code.includes(query) || c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4 text-left">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={language === 'en' ? 'Search by code or name (e.g., 404, Unauthorized)...' : 'ابحث بكود أو اسم الحالة (مثل 404)...'}
        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
      />

      <div className="space-y-2 max-h-56 overflow-y-auto">
        {filtered.map(c => (
          <div key={c.code} className="p-3 rounded-lg border border-slate-850 bg-slate-900/40 flex items-start gap-3">
            <span className="font-mono font-black text-xs text-blue-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">{c.code}</span>
            <div className="text-[11px] leading-relaxed">
              <span className="font-black text-slate-200 block">{c.name}</span>
              <span className="text-slate-500 block mt-0.5">{c.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 11. User Agent Parser
export function UserAgentParser({ language }: { language: 'en' | 'ar' }) {
  const [ua, setUa] = useState(() => navigator.userAgent);
  const [parsed, setParsed] = useState<any>(null);

  const parseUA = () => {
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';

    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Macintosh')) os = 'macOS';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Linux')) os = 'Linux';

    if (ua.includes('Chrome')) browser = 'Google Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Apple Safari';
    else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
    else if (ua.includes('Edge')) browser = 'Microsoft Edge';

    setParsed({ os, browser });
  };

  return (
    <div className="space-y-4 text-left">
      <textarea
        value={ua}
        onChange={(e) => setUa(e.target.value)}
        placeholder="Mozilla/5.0..."
        rows={3}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button onClick={parseUA} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer">
        🔍 {language === 'en' ? 'Parse User Agent String' : 'تحليل معرف المتصفح UA'}
      </button>

      {parsed && (
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/40 font-mono text-xs">
          <div>
            <span className="text-slate-500 text-[10px] block">OPERATING SYSTEM</span>
            <span className="text-emerald-400 font-bold">{parsed.os}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">BROWSER TYPE</span>
            <span className="text-blue-400 font-bold">{parsed.browser}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 12. Hex to ASCII / ASCII to Hex
export function HexASCIIConverter({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const toHex = () => {
    let hex = '';
    for (let i = 0; i < input.length; i++) {
      hex += input.charCodeAt(i).toString(16).padStart(2, '0') + ' ';
    }
    setOutput(hex.trim().toUpperCase());
  };

  const toAscii = () => {
    try {
      const clean = input.replace(/\s+/g, '');
      let ascii = '';
      for (let i = 0; i < clean.length; i += 2) {
        ascii += String.fromCharCode(parseInt(clean.substring(i, i + 2), 16));
      }
      setOutput(ascii);
    } catch {
      setOutput(language === 'en' ? 'Error converting Hex' : 'خطأ في التحويل');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={language === 'en' ? 'Type text or space separated Hex values...' : 'أدخل النص أو كود الست عشري Hex...'}
        rows={4}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="grid grid-cols-2 gap-3">
        <button onClick={toHex} className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Convert to Hex' : 'تحويل إلى Hex'}
        </button>
        <button onClick={toAscii} className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Convert Hex to ASCII' : 'تحويل Hex إلى ASCII'}
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

// 13. Base32 Encoder / Decoder
export function Base32Converter({ language }: { language: 'en' | 'ar' }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  const encodeBase32 = () => {
    let bits = '';
    let result = '';
    for (let i = 0; i < input.length; i++) {
      bits += input.charCodeAt(i).toString(2).padStart(8, '0');
    }
    while (bits.length % 5 !== 0) bits += '0';
    for (let i = 0; i < bits.length; i += 5) {
      const idx = parseInt(bits.substring(i, i + 5), 2);
      result += alphabet[idx];
    }
    setOutput(result);
  };

  const decodeBase32 = () => {
    try {
      let bits = '';
      const clean = input.toUpperCase().replace(/[^A-Z2-7]/g, '');
      for (let i = 0; i < clean.length; i++) {
        const idx = alphabet.indexOf(clean[i]);
        if (idx === -1) continue;
        bits += idx.toString(2).padStart(5, '0');
      }
      let result = '';
      for (let i = 0; i + 8 <= bits.length; i += 8) {
        result += String.fromCharCode(parseInt(bits.substring(i, i + 8), 2));
      }
      setOutput(result);
    } catch {
      setOutput(language === 'en' ? 'Invalid Base32 string' : 'نص Base32 غير صالح');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={language === 'en' ? 'Type string here...' : 'اكتب النص هنا...'}
        rows={4}
        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="grid grid-cols-2 gap-3">
        <button onClick={encodeBase32} className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Encode to Base32' : 'ترميز Base32'}
        </button>
        <button onClick={decodeBase32} className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer">
          {language === 'en' ? 'Decode Base32' : 'فك ترميز Base32'}
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
