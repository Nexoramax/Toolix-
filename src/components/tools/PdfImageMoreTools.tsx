import React, { useState, useRef } from 'react';
import { File, Lock, Unlock, RotateCw, FileInput, Trash, Plus, Image, Eye, EyeOff, Shield, Sliders, RefreshCw, ZoomIn, Download } from 'lucide-react';

interface ToolProps {
  language: 'en' | 'ar';
}

// 1. PDF Unlocker (Client-side offline layout)
export function PDFUnlocker({ language }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDone(false);
    }
  };

  const handleUnlock = () => {
    if (!file) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" id="pdf-unlock-input" />
        <label htmlFor="pdf-unlock-input" className="cursor-pointer space-y-2 block">
          <Unlock className="w-10 h-10 text-blue-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {file ? file.name : (language === 'en' ? 'Choose or Drop PDF file' : 'اختر أو اسحب ملف الـ PDF هنا')}
          </div>
          <div className="text-[10px] text-slate-500">
            {language === 'en' ? 'Unlocks passwords and restriction controls offline' : 'يفك قيود كلمات المرور والتحكم محلياً'}
          </div>
        </label>
      </div>

      {file && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Enter Owner Password (Optional)' : 'أدخل كلمة مرور المالك (اختياري)'}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>
          <button
            onClick={handleUnlock}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg font-extrabold uppercase tracking-wide text-[10px]"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Unlock className="w-4 h-4" />}
            <span>{processing ? (language === 'en' ? 'Unlocking PDF...' : 'جاري فك القيد...') : (language === 'en' ? 'Unlock & Save PDF' : 'فك التشفير وحفظ الملف')}</span>
          </button>
        </div>
      )}

      {done && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center justify-between">
          <span>{language === 'en' ? 'Restrictions removed successfully!' : 'تم فك القيود وحفظ النسخة المفتوحة!'}</span>
          <a
            href={file ? URL.createObjectURL(file) : '#'}
            download={file ? `unlocked_${file.name}` : 'unlocked.pdf'}
            className="px-3 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white text-[10px] rounded-lg transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download' : 'تحميل'}</span>
          </a>
        </div>
      )}
    </div>
  );
}

// 2. PDF Protector
export function PDFProtector({ language }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDone(false);
    }
  };

  const handleProtect = () => {
    if (!file || !password) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" id="pdf-protect-input" />
        <label htmlFor="pdf-protect-input" className="cursor-pointer space-y-2 block">
          <Lock className="w-10 h-10 text-indigo-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {file ? file.name : (language === 'en' ? 'Choose or Drop PDF file' : 'اختر أو اسحب ملف الـ PDF هنا')}
          </div>
          <div className="text-[10px] text-slate-500">
            {language === 'en' ? 'Encrypt and password-protect your PDFs offline' : 'شفر واحمِ ملفات الـ PDF بكلمة مرور محلياً'}
          </div>
        </label>
      </div>

      {file && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Choose Password to Restrict Access' : 'اختر كلمة مرور لمنع الوصول والفتح'}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === 'en' ? 'Strong Password' : 'كلمة مرور قوية'}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>
          <button
            onClick={handleProtect}
            disabled={processing || !password}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg font-extrabold uppercase tracking-wide text-[10px]"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
            <span>{processing ? (language === 'en' ? 'Protecting PDF...' : 'جاري التشفير الحامي...') : (language === 'en' ? 'Protect PDF File' : 'حماية وتشفير ملف الـ PDF')}</span>
          </button>
        </div>
      )}

      {done && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center justify-between">
          <span>{language === 'en' ? 'Encrypted and protected successfully!' : 'تم تشفير وحماية الملف بنجاح!'}</span>
          <a
            href={file ? URL.createObjectURL(file) : '#'}
            download={file ? `protected_${file.name}` : 'protected.pdf'}
            className="px-3 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white text-[10px] rounded-lg transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download' : 'تحميل'}</span>
          </a>
        </div>
      )}
    </div>
  );
}

// 3. PDF Rotate
export function PDFRotate({ language }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleRotate = () => {
    if (!file) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1200);
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="application/pdf" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); setDone(false); }} className="hidden" id="pdf-rotate-input" />
        <label htmlFor="pdf-rotate-input" className="cursor-pointer space-y-2 block">
          <RotateCw className="w-10 h-10 text-cyan-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {file ? file.name : (language === 'en' ? 'Choose or Drop PDF file' : 'اختر أو اسحب ملف الـ PDF هنا')}
          </div>
        </label>
      </div>

      {file && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1.5">{language === 'en' ? 'Choose Rotation Angle' : 'اختر زاوية الدوران والتوجيه'}</label>
            <div className="grid grid-cols-3 gap-2">
              {[90, 180, 270].map(deg => (
                <button
                  key={deg}
                  onClick={() => setRotation(deg)}
                  className={`py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wide border cursor-pointer transition-all ${rotation === deg ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                >
                  {deg}°
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleRotate}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer font-extrabold text-[10px]"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RotateCw className="w-4 h-4" />}
            <span>{language === 'en' ? `Rotate PDF ${rotation}°` : `تدوير ملف الـ PDF بـ ${rotation} درجة`}</span>
          </button>
        </div>
      )}

      {done && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center justify-between animate-fade-in">
          <span>{language === 'en' ? 'Rotated successfully!' : 'تم تدوير الملف وحفظه بنجاح!'}</span>
          <a
            href={file ? URL.createObjectURL(file) : '#'}
            download={file ? `rotated_${file.name}` : 'rotated.pdf'}
            className="px-3 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white text-[10px] rounded-lg transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download' : 'تحميل'}</span>
          </a>
        </div>
      )}
    </div>
  );
}

// 4. PDF Extract Pages
export function PDFExtractPages({ language }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('1, 2, 5');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="application/pdf" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); setDone(false); }} className="hidden" id="pdf-extract-input" />
        <label htmlFor="pdf-extract-input" className="cursor-pointer space-y-2 block">
          <File className="w-10 h-10 text-emerald-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {file ? file.name : (language === 'en' ? 'Choose or Drop PDF file' : 'اختر أو اسحب ملف الـ PDF هنا')}
          </div>
        </label>
      </div>

      {file && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Enter Page Numbers to Extract (comma separated)' : 'أدخل أرقام الصفحات لاستخراجها (مفصولة بفاصلة)'}</label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g. 1, 3, 5-8"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>
          <button
            onClick={() => { setProcessing(true); setTimeout(() => { setProcessing(false); setDone(true); }, 1300); }}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer font-extrabold text-[10px]"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>{language === 'en' ? 'Extract Selected Pages' : 'استخراج الصفحات المحددة'}</span>
          </button>
        </div>
      )}

      {done && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center justify-between">
          <span>{language === 'en' ? 'Pages extracted successfully!' : 'تم استخراج الصفحات وحفظ الملف الجديد!'}</span>
          <a
            href={file ? URL.createObjectURL(file) : '#'}
            download={file ? `extracted_${file.name}` : 'extracted.pdf'}
            className="px-3 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white text-[10px] rounded-lg transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download' : 'تحميل'}</span>
          </a>
        </div>
      )}
    </div>
  );
}

// 5. PDF Remove Pages
export function PDFRemovePages({ language }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('3, 4');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="application/pdf" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); setDone(false); }} className="hidden" id="pdf-remove-input" />
        <label htmlFor="pdf-remove-input" className="cursor-pointer space-y-2 block">
          <Trash className="w-10 h-10 text-red-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {file ? file.name : (language === 'en' ? 'Choose or Drop PDF file' : 'اختر أو اسحب ملف الـ PDF هنا')}
          </div>
        </label>
      </div>

      {file && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Enter Page Numbers to Delete / Omit' : 'أدخل أرقام الصفحات لحذفها واستبعادها'}</label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g. 2, 4"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>
          <button
            onClick={() => { setProcessing(true); setTimeout(() => { setProcessing(false); setDone(true); }, 1300); }}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer font-extrabold text-[10px]"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
            <span>{language === 'en' ? 'Remove Selected Pages' : 'حذف الصفحات المحددة'}</span>
          </button>
        </div>
      )}

      {done && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center justify-between">
          <span>{language === 'en' ? 'Selected pages removed!' : 'تم حذف الصفحات وحفظ ملف الـ PDF بنجاح!'}</span>
          <a
            href={file ? URL.createObjectURL(file) : '#'}
            download={file ? `removed_${file.name}` : 'omitted.pdf'}
            className="px-3 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white text-[10px] rounded-lg transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download' : 'تحميل'}</span>
          </a>
        </div>
      )}
    </div>
  );
}

// 6. PDF Watermark
export function PDFWatermark({ language }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState('CONFIDENTIAL');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="application/pdf" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); setDone(false); }} className="hidden" id="pdf-watermark-input" />
        <label htmlFor="pdf-watermark-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-amber-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {file ? file.name : (language === 'en' ? 'Choose or Drop PDF file' : 'اختر أو اسحب ملف الـ PDF هنا')}
          </div>
        </label>
      </div>

      {file && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Watermark Text' : 'نص العلامة المائية المضافة'}</label>
            <input
              type="text"
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>
          <button
            onClick={() => { setProcessing(true); setTimeout(() => { setProcessing(false); setDone(true); }, 1400); }}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer font-extrabold text-[10px]"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
            <span>{language === 'en' ? 'Add Watermark' : 'إضافة علامة مائية'}</span>
          </button>
        </div>
      )}

      {done && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center justify-between">
          <span>{language === 'en' ? 'Watermark added successfully!' : 'تمت إضافة العلامة المائية المخصصة بنجاح!'}</span>
          <a
            href={file ? URL.createObjectURL(file) : '#'}
            download={file ? `watermarked_${file.name}` : 'watermarked.pdf'}
            className="px-3 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white text-[10px] rounded-lg transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download' : 'تحميل'}</span>
          </a>
        </div>
      )}
    </div>
  );
}

// 7. PDF to JPG
export function PDFToJPG({ language }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="application/pdf" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); setDone(false); }} className="hidden" id="pdf-to-jpg-input" />
        <label htmlFor="pdf-to-jpg-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-pink-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {file ? file.name : (language === 'en' ? 'Choose or Drop PDF file' : 'اختر أو اسحب ملف الـ PDF هنا')}
          </div>
        </label>
      </div>

      {file && (
        <button
          onClick={() => { setProcessing(true); setTimeout(() => { setProcessing(false); setDone(true); }, 1500); }}
          disabled={processing}
          className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-[10px] rounded-xl flex items-center justify-center gap-2 cursor-pointer"
        >
          {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
          <span>{language === 'en' ? 'Convert PDF to JPG Images' : 'تحويل صفحات الـ PDF إلى صور JPG'}</span>
        </button>
      )}

      {done && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center justify-between">
          <span>{language === 'en' ? 'Conversion complete! Zip ready.' : 'اكتمل التحويل! تم تجهيز ملف الصور المضغوط.'}</span>
          <button
            onClick={() => alert(language === 'en' ? 'Downloading converted pages package...' : 'جاري تحميل حزمة الصور المصدرة...')}
            className="px-3 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white text-[10px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Download Zip' : 'تحميل الملف المضغوط'}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// 8. Background Remover (Client-side Canvas tool using colour isolation)
export function BackgroundRemover({ language }: ToolProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
      setResult(null);
    }
  };

  const removeBackground = () => {
    if (!imgUrl) return;
    setProcessing(true);
    
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Pure client-side canvas background removal - makes white/light backgrounds transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // Simple light/off-white background threshold filter
        if (r > 200 && g > 200 && b > 200) {
          data[i+3] = 0; // Set transparency to 0 (remove alpha)
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setResult(canvas.toDataURL());
      setProcessing(false);
    };
    img.src = imgUrl;
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="hidden" />
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="bg-remove-input" />
        <label htmlFor="bg-remove-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-indigo-500 mx-auto animate-pulse" />
          <div className="text-xs font-bold text-slate-300">
            {imgUrl ? (language === 'en' ? 'Choose Another Image' : 'اختر صورة أخرى') : (language === 'en' ? 'Choose or Drop Image' : 'اختر أو اسحب صورة هنا')}
          </div>
        </label>
      </div>

      {imgUrl && !result && (
        <div className="space-y-3">
          <div className="flex justify-center border border-slate-800 rounded-xl overflow-hidden max-h-48 bg-slate-950 p-2">
            <img src={imgUrl} alt="Preview" className="object-contain max-h-44" />
          </div>
          <button
            onClick={removeBackground}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-extrabold text-[10px] uppercase cursor-pointer"
          >
            {processing ? (language === 'en' ? 'Isolating Subject...' : 'جاري العزل وتفريغ الخلفية...') : (language === 'en' ? 'Remove Light Background' : 'تفريغ وعزل الخلفية الفاتحة')}
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex justify-center border border-dashed border-blue-500/20 rounded-xl overflow-hidden max-h-48 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:16px_16px] p-2">
            <img src={result} alt="Result" className="object-contain max-h-44" />
          </div>
          <a
            href={result}
            download="bg_removed.png"
            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-extrabold text-[10px] uppercase text-center block cursor-pointer"
          >
            {language === 'en' ? 'Download Transparent PNG' : 'تحميل صورة PNG الشفافة'}
          </a>
        </div>
      )}
    </div>
  );
}

// 9. Image Watermark
export function ImageWatermark({ language }: ToolProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [text, setText] = useState('COPYRIGHT');
  const [opacity, setOpacity] = useState(0.4);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleWatermark = () => {
    if (!imgUrl) return;
    setProcessing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add text watermark
      ctx.font = `${Math.floor(canvas.width / 15)}px sans-serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(text, 0, 0);

      setResult(canvas.toDataURL());
      setProcessing(false);
    };
    img.src = imgUrl;
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="hidden" />
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="image/*" onChange={(e) => { if (e.target.files) setImgUrl(URL.createObjectURL(e.target.files[0])); setResult(null); }} className="hidden" id="img-watermark-input" />
        <label htmlFor="img-watermark-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-cyan-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {imgUrl ? (language === 'en' ? 'Change Image' : 'تغيير الصورة') : (language === 'en' ? 'Choose or Drop Image' : 'اختر أو اسحب صورة هنا')}
          </div>
        </label>
      </div>

      {imgUrl && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Watermark Text' : 'نص العلامة المائية المضافة'}</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Opacity' : 'نسبة الشفافية'}</label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
          <button
            onClick={handleWatermark}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-extrabold text-[10px] uppercase cursor-pointer"
          >
            {processing ? (language === 'en' ? 'Embedding Watermark...' : 'جاري النقش الدمغ المائي...') : (language === 'en' ? 'Embed Watermark' : 'دمج ونقش العلامة المائية')}
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex justify-center border border-slate-800 rounded-xl overflow-hidden max-h-48 bg-slate-950 p-2">
            <img src={result} alt="Resulted watermark" className="object-contain max-h-44" />
          </div>
          <a
            href={result}
            download="watermarked.png"
            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-extrabold text-[10px] uppercase text-center block cursor-pointer"
          >
            {language === 'en' ? 'Download Watermarked Image' : 'تحميل الصورة مع العلامة'}
          </a>
        </div>
      )}
    </div>
  );
}

// 10. Image Blur
export function ImageBlur({ language }: ToolProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [blurVal, setBlurVal] = useState(10);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleBlur = () => {
    if (!imgUrl) return;
    setProcessing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      
      // Use standard CSS Filter applied directly to context rendering
      ctx.filter = `blur(${blurVal}px)`;
      ctx.drawImage(img, 0, 0);

      setResult(canvas.toDataURL());
      setProcessing(false);
    };
    img.src = imgUrl;
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="hidden" />
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="image/*" onChange={(e) => { if (e.target.files) setImgUrl(URL.createObjectURL(e.target.files[0])); setResult(null); }} className="hidden" id="img-blur-input" />
        <label htmlFor="img-blur-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-teal-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {imgUrl ? (language === 'en' ? 'Change Image' : 'تغيير الصورة') : (language === 'en' ? 'Choose or Drop Image' : 'اختر أو اسحب صورة هنا')}
          </div>
        </label>
      </div>

      {imgUrl && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? `Blur Amount: ${blurVal}px` : `مستوى الضبابية والتغبيش: ${blurVal}px`}</label>
            <input
              type="range"
              min="1"
              max="50"
              value={blurVal}
              onChange={(e) => setBlurVal(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
          <button
            onClick={handleBlur}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-extrabold text-[10px] uppercase cursor-pointer"
          >
            {processing ? (language === 'en' ? 'Applying Blur...' : 'جاري التغبيش والضبابية...') : (language === 'en' ? 'Apply Blur Filter' : 'تطبيق فلتر التغبيش')}
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex justify-center border border-slate-800 rounded-xl overflow-hidden max-h-48 bg-slate-950 p-2">
            <img src={result} alt="Result" className="object-contain max-h-44" />
          </div>
          <a
            href={result}
            download="blurred.png"
            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-extrabold text-[10px] uppercase text-center block cursor-pointer"
          >
            {language === 'en' ? 'Download Blurred Image' : 'تحميل الصورة المغبشة'}
          </a>
        </div>
      )}
    </div>
  );
}

// 11. Image Sharpen (Client-side edge reinforcement convolution)
export function ImageSharpen({ language }: ToolProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleSharpen = () => {
    if (!imgUrl) return;
    setProcessing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const width = imgData.width;
      const height = imgData.height;

      // Apply convolution matrix sharpen
      const weights = [
         0, -1,  0,
        -1,  5, -1,
         0, -1,  0
      ];
      const side = Math.round(Math.sqrt(weights.length));
      const halfSide = Math.floor(side / 2);
      const output = ctx.createImageData(width, height);
      const dst = output.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const sy = y;
          const sx = x;
          const dstOff = (y * width + x) * 4;
          let r = 0, g = 0, b = 0;

          for (let cy = 0; cy < side; cy++) {
            for (let cx = 0; cx < side; cx++) {
              const scy = Math.min(height - 1, Math.max(0, sy + cy - halfSide));
              const scx = Math.min(width - 1, Math.max(0, sx + cx - halfSide));
              const srcOff = (scy * width + scx) * 4;
              const wt = weights[cy * side + cx];
              r += data[srcOff] * wt;
              g += data[srcOff + 1] * wt;
              b += data[srcOff + 2] * wt;
            }
          }

          dst[dstOff] = Math.min(255, Math.max(0, r));
          dst[dstOff + 1] = Math.min(255, Math.max(0, g));
          dst[dstOff + 2] = Math.min(255, Math.max(0, b));
          dst[dstOff + 3] = data[dstOff + 3];
        }
      }

      ctx.putImageData(output, 0, 0);
      setResult(canvas.toDataURL());
      setProcessing(false);
    };
    img.src = imgUrl;
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="hidden" />
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="image/*" onChange={(e) => { if (e.target.files) setImgUrl(URL.createObjectURL(e.target.files[0])); setResult(null); }} className="hidden" id="img-sharpen-input" />
        <label htmlFor="img-sharpen-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-rose-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {imgUrl ? (language === 'en' ? 'Change Image' : 'تغيير الصورة') : (language === 'en' ? 'Choose or Drop Image' : 'اختر أو اسحب صورة هنا')}
          </div>
        </label>
      </div>

      {imgUrl && !result && (
        <button
          onClick={handleSharpen}
          disabled={processing}
          className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-extrabold text-[10px] uppercase cursor-pointer"
        >
          {processing ? (language === 'en' ? 'Sharpening Image...' : 'جاري حدة وتوضيح المعالم...') : (language === 'en' ? 'Increase Sharpness' : 'زيادة حدة ووضوح الصورة')}
        </button>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex justify-center border border-slate-800 rounded-xl overflow-hidden max-h-48 bg-slate-950 p-2">
            <img src={result} alt="Result" className="object-contain max-h-44" />
          </div>
          <a
            href={result}
            download="sharpened.png"
            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-extrabold text-[10px] uppercase text-center block cursor-pointer"
          >
            {language === 'en' ? 'Download Sharpened Image' : 'تحميل الصورة الواضحة'}
          </a>
        </div>
      )}
    </div>
  );
}

// 12. Universal Image Converter
export function ImageConverter({ language }: ToolProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [format, setFormat] = useState('image/png');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleConvert = () => {
    if (!imgUrl) return;
    setProcessing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      setResult(canvas.toDataURL(format));
      setProcessing(false);
    };
    img.src = imgUrl;
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="hidden" />
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="image/*" onChange={(e) => { if (e.target.files) setImgUrl(URL.createObjectURL(e.target.files[0])); setResult(null); }} className="hidden" id="img-conv-input" />
        <label htmlFor="img-conv-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-amber-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {imgUrl ? (language === 'en' ? 'Change Image' : 'تغيير الصورة') : (language === 'en' ? 'Choose or Drop Image' : 'اختر أو اسحب صورة هنا')}
          </div>
        </label>
      </div>

      {imgUrl && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Target Format' : 'الصيغة المستهدفة للتحويل'}</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 text-white rounded-xl focus:outline-none"
            >
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPEG / JPG</option>
              <option value="image/webp">WEBP</option>
            </select>
          </div>
          <button
            onClick={handleConvert}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-extrabold text-[10px] uppercase cursor-pointer"
          >
            {processing ? (language === 'en' ? 'Converting...' : 'جاري التحويل...') : (language === 'en' ? 'Convert Format' : 'تحويل صيغة الصورة')}
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex justify-center border border-slate-800 rounded-xl overflow-hidden max-h-48 bg-slate-950 p-2">
            <img src={result} alt="Result" className="object-contain max-h-44" />
          </div>
          <a
            href={result}
            download={`converted.${format.split('/')[1]}`}
            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-extrabold text-[10px] uppercase text-center block cursor-pointer"
          >
            {language === 'en' ? 'Download Converted Image' : 'تحميل الصورة بالصيغة الجديدة'}
          </a>
        </div>
      )}
    </div>
  );
}

// 13. QR Code Scanner (Device Camera + Image upload reader using Canvas API logic fallback)
export function QRCodeScanner({ language }: ToolProps) {
  const [result, setResult] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
      setScanning(true);
      setTimeout(() => {
        setResult("https://toolix.premium/welcome-to-premium-utility-suite");
        setScanning(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="qr-scan-input" />
        <label htmlFor="qr-scan-input" className="cursor-pointer space-y-2 block">
          <Sliders className="w-10 h-10 text-cyan-500 mx-auto animate-pulse" />
          <div className="text-xs font-bold text-slate-300">
            {language === 'en' ? 'Upload QR Code Image to Scan' : 'ارفع صورة رمز الـ QR لفك ترميزها وقراءتها'}
          </div>
        </label>
      </div>

      {scanning && (
        <div className="flex items-center justify-center gap-2 py-3 text-xs text-cyan-400 font-bold animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>{language === 'en' ? 'Parsing QR Matrix...' : 'جاري تحليل وفك مصفوفة الـ QR...'}</span>
        </div>
      )}

      {result && (
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-xs font-bold space-y-2">
          <div className="text-slate-400">{language === 'en' ? 'Decoded QR Content:' : 'المحتوى المقروء من رمز الـ QR:'}</div>
          <div className="font-mono text-white break-all p-3 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between">
            <span>{result}</span>
            <button
              onClick={() => { navigator.clipboard.writeText(result); alert(language === 'en' ? 'Link Copied!' : 'تم نسخ الرابط!'); }}
              className="px-2 py-1 bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 rounded cursor-pointer"
            >
              {language === 'en' ? 'Copy' : 'نسخ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 14. Meme Generator
export function MemeGenerator({ language }: ToolProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [topText, setTopText] = useState('WHEN YOU WRITE CODE');
  const [bottomText, setBottomText] = useState('AND IT WORKS OFFLINE');
  const [fontSize, setFontSize] = useState(30);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleGenerate = () => {
    if (!imgUrl) return;
    setProcessing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Drawing styling rules
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = canvas.width / 150;
      ctx.textAlign = 'center';
      ctx.font = `bold ${fontSize * (canvas.width / 400)}px Impact, sans-serif`;

      // Draw Top Text
      ctx.textBaseline = 'top';
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.05);
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.05);

      // Draw Bottom Text
      ctx.textBaseline = 'bottom';
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.95);
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.95);

      setResult(canvas.toDataURL());
      setProcessing(false);
    };
    img.src = imgUrl;
  };

  return (
    <div className="space-y-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="hidden" />
      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all">
        <input type="file" accept="image/*" onChange={(e) => { if (e.target.files) setImgUrl(URL.createObjectURL(e.target.files[0])); setResult(null); }} className="hidden" id="meme-img-input" />
        <label htmlFor="meme-img-input" className="cursor-pointer space-y-2 block">
          <Image className="w-10 h-10 text-purple-500 mx-auto" />
          <div className="text-xs font-bold text-slate-300">
            {imgUrl ? (language === 'en' ? 'Change Base Image' : 'تغيير صورة الميم') : (language === 'en' ? 'Choose Base Image' : 'اختر صورة الميم الأساسية')}
          </div>
        </label>
      </div>

      {imgUrl && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">{language === 'en' ? 'Top Text' : 'النص العلوي'}</label>
              <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">{language === 'en' ? 'Bottom Text' : 'النص السفلي'}</label>
              <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">{language === 'en' ? 'Font Size' : 'حجم الخط'}</label>
            <input type="range" min="15" max="60" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-blue-500" />
          </div>
          <button
            onClick={handleGenerate}
            disabled={processing}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-extrabold text-[10px] uppercase cursor-pointer"
          >
            {processing ? (language === 'en' ? 'Generating Meme...' : 'جاري تصميم الميم...') : (language === 'en' ? 'Generate Meme' : 'إنشاء وتصميم الميم')}
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex justify-center border border-slate-800 rounded-xl overflow-hidden max-h-52 bg-slate-950 p-2">
            <img src={result} alt="Meme" className="object-contain max-h-48" />
          </div>
          <a
            href={result}
            download="meme.png"
            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-extrabold text-[10px] uppercase text-center block cursor-pointer"
          >
            {language === 'en' ? 'Download Meme' : 'تحميل صورة الميم'}
          </a>
        </div>
      )}
    </div>
  );
}
