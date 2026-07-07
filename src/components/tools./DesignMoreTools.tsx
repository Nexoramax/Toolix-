import React, { useState, useRef } from 'react';
import { Copy, Check, Download, Image as ImageIcon, Eye, Trash2 } from 'lucide-react';

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

// 1. SVG to PNG Converter
export function SVGToPNG({ language }: { language: 'en' | 'ar' }) {
  const [svgText, setSvgText] = useState('');
  const [pngUrl, setPngUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgText(event.target?.result as string || '');
    };
    reader.readAsText(file);
  };

  const convertSvg = () => {
    if (!svgText.trim()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width || 500;
      canvas.height = img.height || 500;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      setPngUrl(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      alert(language === 'en' ? 'Invalid SVG string or file' : 'صيغة SVG غير صالحة');
    };
    img.src = url;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Paste SVG Code or Upload File' : 'الصق كود SVG أو ارفع ملفاً'}
          </label>
          <input
            type="file"
            accept=".svg"
            onChange={handleFileUpload}
            className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
          <textarea
            value={svgText}
            onChange={(e) => setSvgText(e.target.value)}
            placeholder='<svg xmlns="http://www.w3.org/2000/svg" ...>'
            rows={8}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={convertSvg}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all"
          >
            {language === 'en' ? 'Convert to PNG' : 'تحويل إلى PNG'}
          </button>
        </div>

        <div className="flex flex-col justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/40 min-h-[250px] items-center text-center">
          <span className="text-xs font-bold text-slate-400 self-start">
            {language === 'en' ? 'PNG Preview Output' : 'معاينة صورة PNG الناتجة'}
          </span>
          {pngUrl ? (
            <div className="space-y-3 my-auto">
              <img src={pngUrl} alt="SVG output" className="max-h-[180px] object-contain border border-slate-800 bg-slate-950 p-2 rounded-lg" />
              <a
                href={pngUrl}
                download="toolix_converted.png"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Download PNG' : 'تحميل صورة PNG'}</span>
              </a>
            </div>
          ) : (
            <div className="my-auto text-slate-500 space-y-1">
              <ImageIcon className="w-8 h-8 mx-auto stroke-1" />
              <p className="text-[10px] font-semibold">{language === 'en' ? 'No preview generated' : 'لم يتم توليد معاينة بعد'}</p>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}

// 2. CSS Gradient Generator
export function CSSGradientGenerator({ language }: { language: 'en' | 'ar' }) {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#2563eb');
  const [color2, setColor2] = useState('#9333ea');
  const [stop1, setStop1] = useState(0);
  const [stop2, setStop2] = useState(100);

  const gradientCode = type === 'linear'
    ? `background: linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%);`
    : `background: radial-gradient(circle, ${color1} ${stop1}%, ${color2} ${stop2}%);`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 p-4 rounded-xl border border-slate-800 bg-slate-950">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">{language === 'en' ? 'Gradient Type' : 'نوع التدرج'}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setType('linear')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'linear' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
              >
                {language === 'en' ? 'Linear' : 'خطي'}
              </button>
              <button
                onClick={() => setType('radial')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'radial' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
              >
                {language === 'en' ? 'Radial' : 'دائري'}
              </button>
            </div>
          </div>

          {type === 'linear' && (
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5">
                <span>{language === 'en' ? 'Angle' : 'الزاوية'}</span>
                <span className="font-mono text-blue-400">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Start Color' : 'اللون الأول'}</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent border border-slate-800 cursor-pointer"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-full px-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'End Color' : 'اللون الثاني'}</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent border border-slate-800 cursor-pointer"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-full px-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                <span>{language === 'en' ? 'Stop 1' : 'موقع الأول'}</span>
                <span className="font-mono">{stop1}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={stop1}
                onChange={(e) => setStop1(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                <span>{language === 'en' ? 'Stop 2' : 'موقع الثاني'}</span>
                <span className="font-mono">{stop2}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={stop2}
                onChange={(e) => setStop2(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div
            className="w-full h-36 rounded-xl border border-slate-800 shadow-xl"
            style={{
              background: type === 'linear'
                ? `linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`
                : `radial-gradient(circle, ${color1} ${stop1}%, ${color2} ${stop2}%)`
            }}
          />

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 relative">
            <div className="absolute top-2 right-2">
              <CopyButton text={gradientCode} language={language} />
            </div>
            <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto pr-16 select-all pt-1.5">
              {gradientCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. CSS Glassmorphism Generator
export function GlassmorphismGenerator({ language }: { language: 'en' | 'ar' }) {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.15);
  const [color, setColor] = useState('#ffffff');
  const [saturation, setSaturation] = useState(120);

  const glassStyle = {
    background: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: `1px solid rgba(255, 255, 255, ${opacity * 0.5})`
  };

  const cssCode = `background: rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid rgba(255, 255, 255, ${(opacity * 0.5).toFixed(2)});
border-radius: 16px;`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 p-4 rounded-xl border border-slate-800 bg-slate-950">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
              <span>{language === 'en' ? 'Blur Size' : 'مقدار التمويه'}</span>
              <span className="font-mono text-blue-400">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
              <span>{language === 'en' ? 'Opacity' : 'الشفافية'}</span>
              <span className="font-mono text-blue-400">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
              <span>{language === 'en' ? 'Saturation' : 'درجة التشبع الملوّن'}</span>
              <span className="font-mono text-blue-400">{saturation}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Glass Tint Color' : 'لون صبغة الزجاج'}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-9 h-9 rounded-lg bg-transparent border border-slate-800 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="relative w-full h-40 rounded-2xl border border-slate-850 overflow-hidden bg-gradient-to-tr from-amber-500 via-pink-500 to-blue-500 flex items-center justify-center">
            <div style={glassStyle} className="w-[80%] h-[80%] rounded-2xl p-4 flex flex-col justify-center text-center shadow-2xl">
              <span className="text-sm font-black text-white tracking-wider">GLASSMORPHISM</span>
              <span className="text-[9px] text-white/80 font-semibold uppercase">Toolix Creative Builder</span>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 relative">
            <div className="absolute top-2 right-2">
              <CopyButton text={cssCode} language={language} />
            </div>
            <pre className="text-[9px] font-mono text-indigo-300 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
              {cssCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. CSS Box Shadow Generator
export function BoxShadowGenerator({ language }: { language: 'en' | 'ar' }) {
  const [hOffset, setHOffset] = useState(0);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(-5);
  const [opacity, setOpacity] = useState(0.25);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [inset, setInset] = useState(false);

  const rgbColor = `${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}`;
  const shadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${rgbColor}, ${opacity})`;
  const shadowCode = `box-shadow: ${shadowValue};`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-800 bg-slate-950">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Horizontal Offset</span>
                <span className="font-mono">{hOffset}px</span>
              </div>
              <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Vertical Offset</span>
                <span className="font-mono">{vOffset}px</span>
              </div>
              <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Blur Radius</span>
                <span className="font-mono">{blur}px</span>
              </div>
              <input type="range" min="0" max="80" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Spread Radius</span>
                <span className="font-mono">{spread}px</span>
              </div>
              <input type="range" min="-30" max="30" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Shadow Opacity</span>
                <span className="font-mono">{Math.round(opacity * 100)}%</span>
              </div>
              <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex items-center gap-2 pb-1 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 justify-center">
              <input
                type="checkbox"
                id="inset"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <label htmlFor="inset" className="text-xs font-bold text-slate-300 cursor-pointer">
                {language === 'en' ? 'Inset Shadow' : 'ظل داخلي'}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Shadow Base Color' : 'لون الظل الأساسي'}</label>
            <div className="flex gap-2">
              <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-9 h-9 rounded-lg bg-transparent border border-slate-800 cursor-pointer" />
              <input type="text" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full px-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="w-full h-40 rounded-2xl border border-slate-800 bg-slate-950 flex items-center justify-center p-4">
            <div
              className="w-24 h-24 rounded-2xl bg-slate-800 flex items-center justify-center text-center p-2"
              style={{ boxSshadow: shadowValue, boxShadow: shadowValue }}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language === 'en' ? 'Box Preview' : 'معاينة الصندوق'}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 relative">
            <div className="absolute top-2 right-2">
              <CopyButton text={shadowCode} language={language} />
            </div>
            <pre className="text-[9px] font-mono text-amber-300 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
              {shadowCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Color Palette Generator
export function ColorPaletteGenerator({ language }: { language: 'en' | 'ar' }) {
  const [colors, setColors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']);

  const generatePalette = () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColors([randomHex(), randomHex(), randomHex(), randomHex(), randomHex()]);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color, idx) => (
          <div key={idx} className="space-y-2">
            <div
              className="w-full h-28 rounded-xl border border-slate-850 shadow-md group relative flex items-end justify-center pb-2 cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
              onClick={() => navigator.clipboard.writeText(color)}
            >
              <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center text-white text-[9px] font-bold transition-opacity">
                {language === 'en' ? 'Copy HEX' : 'نسخ اللون'}
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold block text-slate-300 select-all">{color.toUpperCase()}</span>
          </div>
        ))}
      </div>

      <button
        onClick={generatePalette}
        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all shadow-md inline-block"
      >
        🔄 {language === 'en' ? 'Generate Random Palette' : 'توليد لوحة ألوان عشوائية'}
      </button>
    </div>
  );
}

// 6. Favicon Generator
export function FaviconGenerator({ language }: { language: 'en' | 'ar' }) {
  const [image, setImage] = useState<string | null>(null);
  const [sizes] = useState([16, 32, 48, 128]);
  const [generated, setGenerated] = useState<Record<number, string>>({});
  const [icoUrl, setIcoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    return () => {
      if (icoUrl) {
        URL.revokeObjectURL(icoUrl);
      }
    };
  }, [icoUrl]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string || null);
      setGenerated({});
      if (icoUrl) {
        URL.revokeObjectURL(icoUrl);
        setIcoUrl(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const generateFavicons = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // 1. Load the base image in a single, reliable promise to avoid race conditions
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error('Failed to load image'));
        i.src = image;
      });

      const results: Record<number, string> = {};
      const sizesData: { size: number; dataUrl: string }[] = [];

      // 2. Generate each canvas size synchronously
      sizes.forEach(size => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          const dataUrl = canvas.toDataURL('image/png');
          results[size] = dataUrl;
          sizesData.push({ size, dataUrl });
        }
      });

      setGenerated(results);

      // 3. Generate a real multi-resolution .ico package client-side
      const icoBlob = generateIcoBlob(sizesData);
      if (icoUrl) {
        URL.revokeObjectURL(icoUrl);
      }
      const newIcoUrl = URL.createObjectURL(icoBlob);
      setIcoUrl(newIcoUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Binary ICO packaging from PNG elements
  const generateIcoBlob = (sizesData: { size: number; dataUrl: string }[]): Blob => {
    const pngs = sizesData.map(({ size, dataUrl }) => {
      const base64 = dataUrl.split(',')[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return { size, bytes };
    });

    const numImages = pngs.length;
    const headerSize = 6;
    const directorySize = 16 * numImages;

    let totalImgDataSize = 0;
    pngs.forEach(png => {
      totalImgDataSize += png.bytes.length;
    });

    const buffer = new ArrayBuffer(headerSize + directorySize + totalImgDataSize);
    const view = new DataView(buffer);
    const uint8View = new Uint8Array(buffer);

    // ICO Header
    view.setUint16(0, 0, true); // Reserved (0)
    view.setUint16(2, 1, true); // Type (1 for ICO)
    view.setUint16(4, numImages, true); // Count of images

    let dirOffset = headerSize;
    let dataOffset = headerSize + directorySize;

    pngs.forEach(png => {
      const width = png.size >= 256 ? 0 : png.size;
      const height = png.size >= 256 ? 0 : png.size;

      view.setUint8(dirOffset + 0, width); // Width
      view.setUint8(dirOffset + 1, height); // Height
      view.setUint8(dirOffset + 2, 0); // Palette colors
      view.setUint8(dirOffset + 3, 0); // Reserved
      view.setUint16(dirOffset + 4, 1, true); // Planes
      view.setUint16(dirOffset + 6, 32, true); // Bits per pixel (32)
      view.setUint32(dirOffset + 8, png.bytes.length, true); // Size
      view.setUint32(dirOffset + 12, dataOffset, true); // Offset

      // Copy PNG data bytes
      uint8View.set(png.bytes, dataOffset);

      dirOffset += 16;
      dataOffset += png.bytes.length;
    });

    return new Blob([buffer], { type: 'image/x-icon' });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">{language === 'en' ? 'Upload Base Image' : 'ارفع الصورة الأساسية'}</label>
            <input type="file" accept="image/*" onChange={handleUpload} className="text-xs text-slate-400 cursor-pointer" />
          </div>
          {image && (
            <button
              onClick={generateFavicons}
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <span>{language === 'en' ? 'Generating...' : 'جاري التوليد...'}</span>
              ) : (
                <>
                  <span>⚙️</span>
                  <span>{language === 'en' ? 'Generate Multi-Size Favicons & ICO' : 'توليد المقاسات المتعددة وملف ICO'}</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 min-h-[160px] flex flex-col justify-center space-y-4">
          {Object.keys(generated).length > 0 ? (
            <div className="space-y-4">
              {/* ICO Main Download */}
              {icoUrl && (
                <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📦</span>
                    <div className="text-left">
                      <span className="text-xs font-bold text-blue-200 block font-mono">favicon.ico</span>
                      <span className="text-[10px] text-slate-400 block">
                        {language === 'en' ? 'Multi-resolution ICO package' : 'حزمة أيقونات متعددة المقاسات لجميع المتصفحات'}
                      </span>
                    </div>
                  </div>
                  <a
                    href={icoUrl}
                    download="favicon.ico"
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md inline-block cursor-pointer"
                  >
                    {language === 'en' ? 'Download ICO' : 'تحميل ICO'}
                  </a>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {sizes.map(size => (
                  <div key={size} className="space-y-1.5 p-2 rounded-lg bg-slate-950/60 border border-slate-850">
                    <div className="h-10 flex items-center justify-center">
                      <img src={generated[size]} alt={`Favicon ${size}`} style={{ width: size, height: size, maxWidth: '32px', maxHeight: '32px' }} className="object-contain" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 block">{size}x{size} px</span>
                    <a href={generated[size]} download={`favicon-${size}x${size}.png`} className="text-[9px] font-bold text-blue-400 hover:underline block">
                      {language === 'en' ? 'Download PNG' : 'تحميل PNG'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 text-[10px] font-bold">
              {language === 'en' ? 'Your generated favicon formats will show here' : 'ستظهر صيغ أيقونة الويب المولّدة هنا'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 7. CSS Triangle Generator
export function CSSTriangleGenerator({ language }: { language: 'en' | 'ar' }) {
  const [direction, setDirection] = useState<'top' | 'right' | 'bottom' | 'left'>('top');
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(60);
  const [color, setColor] = useState('#2563eb');

  const getBorderStyles = () => {
    const halfWidth = width / 2;
    switch (direction) {
      case 'top':
        return {
          borderWidth: `0 ${halfWidth}px ${height}px ${halfWidth}px`,
          borderColor: `transparent transparent ${color} transparent`
        };
      case 'bottom':
        return {
          borderWidth: `${height}px ${halfWidth}px 0 ${halfWidth}px`,
          borderColor: `${color} transparent transparent transparent`
        };
      case 'left':
        return {
          borderWidth: `${halfWidth}px ${height}px ${halfWidth}px 0`,
          borderColor: `transparent ${color} transparent transparent`
        };
      case 'right':
        return {
          borderWidth: `${halfWidth}px 0 ${halfWidth}px ${height}px`,
          borderColor: `transparent transparent transparent ${color}`
        };
    }
  };

  const cssCode = `width: 0;
height: 0;
border-style: solid;
border-width: ${getBorderStyles().borderWidth};
border-color: ${getBorderStyles().borderColor};`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-800 bg-slate-950">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">{language === 'en' ? 'Direction' : 'اتجاه المثلث'}</label>
            <div className="grid grid-cols-4 gap-1">
              {(['top', 'right', 'bottom', 'left'] as const).map(dir => (
                <button
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={`py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${direction === dir ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>{language === 'en' ? 'Base Width' : 'العرض'}</span>
                <span>{width}px</span>
              </div>
              <input type="range" min="10" max="150" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>{language === 'en' ? 'Height' : 'الارتفاع'}</span>
                <span>{height}px</span>
              </div>
              <input type="range" min="10" max="150" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Color' : 'لون المثلث'}</label>
            <div className="flex gap-2">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded bg-transparent border border-slate-800 cursor-pointer" />
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="w-full px-2 rounded border border-slate-800 bg-slate-900 text-xs font-mono text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-3">
          <div className="w-full h-36 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-center p-4">
            <div
              className="transition-all"
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                ...getBorderStyles()
              }}
            />
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 relative">
            <div className="absolute top-2 right-2">
              <CopyButton text={cssCode} language={language} />
            </div>
            <pre className="text-[9px] font-mono text-indigo-400 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
              {cssCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Color Blindness Simulator
export function ColorBlindnessSimulator({ language }: { language: 'en' | 'ar' }) {
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string || null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
        <label className="block text-xs font-bold text-slate-400 mb-2">{language === 'en' ? 'Upload Image for Simulation' : 'ارفع الصورة للمحاكاة'}</label>
        <input type="file" accept="image/*" onChange={handleUpload} className="text-xs text-slate-400 cursor-pointer" />
      </div>

      {image ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5 p-2 rounded-xl border border-slate-800 bg-slate-900/50 text-center">
            <span className="text-[10px] font-bold text-slate-300 block">{language === 'en' ? 'Normal Vision' : 'الرؤية الطبيعية'}</span>
            <img src={image} alt="Normal" className="w-full h-28 object-contain rounded border border-slate-900" />
          </div>
          <div className="space-y-1.5 p-2 rounded-xl border border-slate-800 bg-slate-900/50 text-center">
            <span className="text-[10px] font-bold text-slate-300 block">Protanopia ({language === 'en' ? 'Red Blind' : 'عمى الأحمر'})</span>
            <img src={image} alt="Protanopia" style={{ filter: 'contrast(1) saturate(0.8) hue-rotate(-20deg)' }} className="w-full h-28 object-contain rounded border border-slate-900" />
          </div>
          <div className="space-y-1.5 p-2 rounded-xl border border-slate-800 bg-slate-900/50 text-center">
            <span className="text-[10px] font-bold text-slate-300 block">Deuteranopia ({language === 'en' ? 'Green Blind' : 'عمى الأخضر'})</span>
            <img src={image} alt="Deuteranopia" style={{ filter: 'contrast(0.9) saturate(0.6) hue-rotate(30deg)' }} className="w-full h-28 object-contain rounded border border-slate-900" />
          </div>
          <div className="space-y-1.5 p-2 rounded-xl border border-slate-800 bg-slate-900/50 text-center">
            <span className="text-[10px] font-bold text-slate-300 block">Tritanopia ({language === 'en' ? 'Blue Blind' : 'عمى الأزرق'})</span>
            <img src={image} alt="Tritanopia" style={{ filter: 'contrast(1.1) saturate(0.95) hue-rotate(180deg)' }} className="w-full h-28 object-contain rounded border border-slate-900" />
          </div>
        </div>
      ) : (
        <div className="text-center p-8 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
          {language === 'en' ? 'Please upload an image to run color blindness simulations' : 'يرجى رفع صورة لتجربة محاكاة عيوب الرؤية اللونية'}
        </div>
      )}
    </div>
  );
}

// 9. Image EXIF Metadata Viewer
export function ImageEXIFViewer({ language }: { language: 'en' | 'ar' }) {
  const [meta, setMeta] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      setMeta({
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        width: `${img.width} px`,
        height: `${img.height} px`,
        ratio: `${(img.width / img.height).toFixed(2)}`,
        lastModified: new Date(file.lastModified).toLocaleDateString()
      });
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
        <label className="block text-xs font-bold text-slate-400 mb-2">{language === 'en' ? 'Select Image' : 'اختر الصورة للاستعراض'}</label>
        <input type="file" accept="image/*" onChange={handleUpload} className="text-xs text-slate-400 cursor-pointer" />
      </div>

      {meta ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 text-xs font-mono" dir="ltr">
          <div className="flex justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-500">Filename:</span>
            <span className="text-slate-300 font-bold truncate max-w-[200px]">{meta.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-500">Mime Type:</span>
            <span className="text-slate-300 font-bold">{meta.type}</span>
          </div>
          <div className="flex justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-500">File Size:</span>
            <span className="text-slate-300 font-bold">{meta.size}</span>
          </div>
          <div className="flex justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-500">Dimensions:</span>
            <span className="text-slate-300 font-bold">{meta.width} x {meta.height}</span>
          </div>
          <div className="flex justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-500">Aspect Ratio:</span>
            <span className="text-slate-300 font-bold">{meta.ratio}</span>
          </div>
          <div className="flex justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-500">Last Modified:</span>
            <span className="text-slate-300 font-bold">{meta.lastModified}</span>
          </div>
        </div>
      ) : (
        <div className="text-center p-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
          {language === 'en' ? 'Upload an image to inspect standard file dimensions and system metadata.' : 'ارفع صورة لعرض تفاصيلها التقنية وأبعادها والبيانات الوصفية.'}
        </div>
      )}
    </div>
  );
}

// 10. Aspect Ratio Calculator
export function AspectRatioCalculator({ language }: { language: 'en' | 'ar' }) {
  const [w, setW] = useState(1920);
  const [h, setH] = useState(1080);
  const [targetH, setTargetH] = useState(720);

  const gcd = (a: number, b: number): number => {
    return b ? gcd(b, a % b) : a;
  };

  const currentGcd = gcd(w, h);
  const ratioX = w / currentGcd;
  const ratioY = h / currentGcd;
  
  const scaledWidth = Math.round((w / h) * targetH);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-800 bg-slate-950">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Base Width (X)' : 'العرض الحالي'}</label>
              <input
                type="number"
                value={w}
                onChange={(e) => setW(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-850 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Base Height (Y)' : 'الارتفاع الحالي'}</label>
              <input
                type="number"
                value={h}
                onChange={(e) => setH(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-850 text-white text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Scale Target Height' : 'الارتفاع المستهدف للتحجيم'}</label>
            <input
              type="number"
              value={targetH}
              onChange={(e) => setTargetH(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-850 text-white text-xs font-bold"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3 flex flex-col justify-center text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">{language === 'en' ? 'Aspect Ratio Result' : 'نسبة الأبعاد الناتجة'}</span>
            <span className="text-2xl font-black text-blue-400 font-mono">{ratioX} : {ratioY}</span>
          </div>

          <div className="space-y-1 border-t border-slate-850 pt-2">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">{language === 'en' ? 'Scaled Width Output' : 'العرض المتناسب المستنتج'}</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{scaledWidth} px</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 11. CSS Border Radius Generator
export function CSSBorderRadiusGenerator({ language }: { language: 'en' | 'ar' }) {
  const [tl, setTl] = useState(30);
  const [tr, setTr] = useState(30);
  const [bl, setBl] = useState(30);
  const [br, setBr] = useState(30);

  const radiusString = `${tl}% ${100 - tl}% ${br}% ${100 - br}% / ${tr}% ${bl}% ${100 - bl}% ${100 - tr}%`;
  const cssCode = `border-radius: ${radiusString};`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-800 bg-slate-950">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Top Left</span>
                <span className="font-mono">{tl}%</span>
              </div>
              <input type="range" min="0" max="100" value={tl} onChange={(e) => setTl(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Top Right</span>
                <span className="font-mono">{tr}%</span>
              </div>
              <input type="range" min="0" max="100" value={tr} onChange={(e) => setTr(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Bottom Left</span>
                <span className="font-mono">{bl}%</span>
              </div>
              <input type="range" min="0" max="100" value={bl} onChange={(e) => setBl(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Bottom Right</span>
                <span className="font-mono">{br}%</span>
              </div>
              <input type="range" min="0" max="100" value={br} onChange={(e) => setBr(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="w-full h-40 rounded-2xl border border-slate-800 bg-slate-950 flex items-center justify-center p-4">
            <div
              className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg"
              style={{ borderRadius: radiusString }}
            />
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 relative">
            <div className="absolute top-2 right-2">
              <CopyButton text={cssCode} language={language} />
            </div>
            <pre className="text-[9px] font-mono text-emerald-400 overflow-x-auto pr-16 select-all pt-1 leading-relaxed">
              {cssCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 12. HEX to RGBA Converter
export function HexToRGBA({ language }: { language: 'en' | 'ar' }) {
  const [hex, setHex] = useState('#3b82f6');
  const [alpha, setAlpha] = useState(0.8);

  const getRgb = () => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    if (cleanHex.length !== 6) return 'rgba(0,0,0,1)';
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const rgbaCode = getRgb();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-800 bg-slate-950">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">{language === 'en' ? 'Select HEX' : 'اختر كود HEX'}</label>
            <div className="flex gap-2">
              <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-9 h-9 rounded-lg bg-transparent border border-slate-800 cursor-pointer" />
              <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full px-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-white focus:outline-none" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
              <span>{language === 'en' ? 'Alpha Opacity' : 'درجة الشفافية Alpha'}</span>
              <span className="font-mono">{alpha}</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full accent-blue-500" />
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="w-full h-24 rounded-2xl border border-slate-800 bg-slate-950 flex items-center justify-center p-3 relative overflow-hidden">
            {/* Grid pattern in background to show opacity clearly */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%,transparent_75%,#1e293b_75%,#1e293b),linear-gradient(45deg,#1e293b_25%,transparent_25%,transparent_75%,#1e293b_75%,#1e293b)] bg-[size:10px_10px] bg-[position:0_0,5px_5px] opacity-40" />
            <div className="absolute inset-0" style={{ backgroundColor: rgbaCode }} />
            <span className="relative z-10 text-[10px] font-bold text-white bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              RGBA PREVIEW
            </span>
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 relative">
            <div className="absolute top-2 right-2">
              <CopyButton text={rgbaCode} language={language} />
            </div>
            <pre className="text-[10px] font-mono text-indigo-400 overflow-x-auto pr-16 select-all pt-1.5 leading-relaxed">
              {rgbaCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 13. Image Metadata Stripper
export function ImageMetadataStripper({ language }: { language: 'en' | 'ar' }) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cleanedImageUrl, setCleanedImageUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          // Drawing onto canvas strips metadata instantly as toDataURL generates fresh image stream without EXIF tags
          setCleanedImageUrl(canvas.toDataURL('image/jpeg', 0.92));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-left">
        <label className="block text-xs font-bold text-slate-400 mb-2">{language === 'en' ? 'Upload Image to Strip Metadata' : 'ارفع صورة لتطهير بياناتها الوصفية'}</label>
        <input type="file" accept="image/*" onChange={handleUpload} className="text-xs text-slate-400 cursor-pointer" />
      </div>

      {cleanedImageUrl ? (
        <div className="space-y-4">
          <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs text-left">
            ✓ {language === 'en' ? 'Image successfully stripped of all EXIF & metadata!' : 'تم تطهير وحذف جميع البيانات الوصفية (EXIF) من الصورة بنجاح!'}
          </div>
          <div className="flex justify-center">
            <img src={cleanedImageUrl} alt="Cleaned" className="max-h-40 rounded border border-slate-800 object-contain p-2 bg-slate-950" />
          </div>
          <a
            href={cleanedImageUrl}
            download="toolix_metadata_stripped.jpg"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download Clean Image' : 'تحميل الصورة النظيفة'}</span>
          </a>
        </div>
      ) : (
        originalImage && <div className="text-xs text-slate-400 animate-pulse">{language === 'en' ? 'Stripping metadata...' : 'جاري تطهير البيانات...'}</div>
      )}
    </div>
  );
}
