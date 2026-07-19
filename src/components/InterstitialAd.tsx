import React, { useState, useEffect } from 'react';
import { X, Shield, Timer, HelpCircle, Sparkles, AlertTriangle } from 'lucide-react';
import { AdPlaceholder } from './AdPlaceholder';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
  darkMode: boolean;
}

export function InterstitialAd({ isOpen, onClose, language, darkMode }: InterstitialAdProps) {
  const [countdown, setCountdown] = useState<number>(5);
  const [canClose, setCanClose] = useState<boolean>(false);
  const isEn = language === 'en';

  useEffect(() => {
    if (isOpen) {
      // Reset countdown and close permission whenever opened
      setCountdown(5);
      setCanClose(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || countdown <= 0) {
      if (countdown === 0 && !canClose) {
        setCanClose(true);
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md transition-all animate-fade-in font-sans">
      {/* Background radial soft light blobs to look ultra-premium */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Center Card */}
      <div 
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl transition-all duration-350 p-6 md:p-8 overflow-hidden transform scale-100 ${
          darkMode 
            ? 'bg-[#0b0f19]/95 border-slate-800 text-white' 
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/40'
        }`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Subtle top decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Top Header Row with Title and Close Controls */}
        <div className="flex items-center justify-between border-b border-slate-800/15 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${darkMode ? 'bg-blue-600/15 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className={`text-base md:text-lg font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {isEn ? 'Advertisement' : 'إعلان ممول'}
              </h2>
              <p className={`text-[10px] md:text-xs font-medium ${darkMode ? 'text-slate-450' : 'text-slate-550'}`}>
                {isEn ? 'Sponsored Content' : 'محتوى برعاية شركائنا'}
              </p>
            </div>
          </div>

          {/* Close Action Indicator / Timer */}
          <div className="flex items-center gap-3">
            {canClose ? (
              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title={isEn ? 'Close Ad' : 'إغلاق الإعلان'}
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black font-mono tracking-wider bg-amber-500/10 border border-amber-500/25 text-amber-400">
                <Timer className="w-4 h-4 animate-spin text-amber-400" />
                <span>{isEn ? `Skip in ${countdown}s` : `تخطي بعد ${countdown}ث`}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Body Description */}
        <div className="space-y-4 mb-6 text-center md:text-left">
          <div className="space-y-1">
            <p className={`text-xs md:text-sm font-semibold leading-relaxed ${darkMode ? 'text-slate-350' : 'text-slate-650'}`}>
              {isEn 
                ? 'Sponsored content will appear here. Toolix remains 100% free and premium through direct sponsors support.' 
                : 'سيظهر المحتوى الإعلاني الممول هنا. تظل منصة توليكس مجانية 100% وسريعة للغاية بفضل دعم الرعاة المباشرين.'}
            </p>
          </div>

          {/* Integrated AdPlaceholder Banner Component */}
          <div className="w-full mt-4">
            <AdPlaceholder darkMode={darkMode} language={language} />
          </div>
        </div>

        {/* Informational Hint & Lock Status Row */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/10 text-[10px] md:text-xs font-semibold ${
          darkMode ? 'text-slate-500' : 'text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>
              {isEn 
                ? 'Safe, lightweight & private client-side ad placements' 
                : 'مساحات إعلانية آمنة وخفيفة وتعمل بالكامل داخل جهازك'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!canClose ? (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/10">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{isEn ? 'Closing is temporarily locked' : 'زر الإغلاق مقفل مؤقتاً'}</span>
              </span>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl transition-all cursor-pointer"
              >
                {isEn ? 'Skip Ad & Continue' : 'تخطي الإعلان والمتابعة'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
