import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X, ShieldCheck, Info } from 'lucide-react';

interface CookieConsentProps {
  language: 'en' | 'ar';
  darkMode: boolean;
  onNavigateTo: (tab: any) => void;
}

export default function CookieConsent({ language, darkMode, onNavigateTo }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or rejected cookies
    const consent = localStorage.getItem('toolix_cookie_consent_v2');
    if (!consent) {
      // Delay slightly for a natural premium entering transition
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('toolix_cookie_consent_v2', 'accepted_all');
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('toolix_cookie_consent_v2', 'rejected_non_essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-24 right-4 left-4 sm:right-6 sm:left-auto z-50 max-w-sm sm:max-w-md p-5 rounded-2xl border shadow-2xl transition-all duration-300 animate-fade-in ${
        darkMode 
          ? 'bg-[#0b0f19]/95 border-slate-800/90 text-slate-300 shadow-slate-950/80 backdrop-blur-xl' 
          : 'bg-white/95 border-slate-200 text-slate-700 shadow-slate-300/60 backdrop-blur-xl'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      id="cookie-consent-modal"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl shrink-0 ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
            <ShieldCheck className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className={`text-xs font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'en' ? 'Cookie Consent & Privacy Choice' : 'موافقة ملفات تعريف الارتباط والخصوصية'}
            </h3>
            <p className="text-[10px] text-slate-500 leading-normal">
              {language === 'en'
                ? 'We and our trusted partners use cookies to deliver personalized advertising, secure site statistics, and keep the platform free.'
                : 'نحن وشركاؤنا الإعلانيون نستخدم ملفات تعريف الارتباط (الكوكيز) لتخصيص الإعلانات، وتوفير الموارد المالية لتشغيل المنصة مجاناً.'}
            </p>
          </div>
        </div>

        {/* Action button rows */}
        <div className="flex flex-col gap-2 pt-2 border-t dark:border-slate-850 border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 text-[10px] font-extrabold uppercase tracking-wider rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="cookie-accept-all-btn"
            >
              {language === 'en' ? 'Accept All' : 'قبول الكل'}
            </button>
            <button
              onClick={handleRejectAll}
              className={`flex-1 py-2 text-[10px] font-extrabold uppercase tracking-wider rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                darkMode 
                  ? 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-900' 
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
              id="cookie-reject-btn"
            >
              {language === 'en' ? 'Only Essential' : 'الأساسية فقط'}
            </button>
          </div>

          <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 mt-1">
            <button 
              onClick={() => {
                onNavigateTo('cookie');
                setIsVisible(false);
              }}
              className="hover:text-blue-400 underline transition-colors cursor-pointer"
            >
              {language === 'en' ? 'View Cookie Policy' : 'عرض سياسة الكوكيز بالتفصيل'}
            </button>
            <span>v2.1 • GDPR & AdSense Safe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
