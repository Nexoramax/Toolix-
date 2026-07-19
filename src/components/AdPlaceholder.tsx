import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface AdPlaceholderProps {
  darkMode?: boolean;
  language?: 'en' | 'ar';
  /**
   * Custom width or height overrides.
   * Default will be standard leaderboard 728x90 on desktop, fully responsive on mobile.
   */
  className?: string;
}

export function AdPlaceholder({ darkMode = true, language = 'en', className = '' }: AdPlaceholderProps) {
  const isEn = language === 'en';

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-2xl border transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700/80' 
          : 'bg-slate-50 border-slate-200 hover:border-slate-350'
      } ${className}`}
      style={{ minHeight: '90px' }}
    >
      {/* Background Subtle Gradients & Floating Accents */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Google AdSense / Advertising Provider Integration Target */}
      {/* 
        DEVELOPER NOTE: To replace this placeholder with Google AdSense:
        1. Add the AdSense script tag to public/index.html (or in useEffect):
           <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
        2. Replace the markup inside this container with your AdSense responsive/fixed unit:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        3. Trigger push inside useEffect:
           try {
             ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
           } catch (e) {
             console.error('AdSense load error:', e);
           }
      */}
      
      <div className="absolute top-2 right-3 z-15 flex items-center gap-1">
        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
          darkMode ? 'bg-slate-950 text-slate-500 border border-slate-800' : 'bg-slate-200 text-slate-600 border border-slate-300'
        }`}>
          {isEn ? 'Sponsor Ad' : 'إعلان ممول'}
        </span>
        <div className="group relative">
          <Info className={`w-3.5 h-3.5 cursor-help transition-colors ${darkMode ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`} />
          <div className={`absolute right-0 top-5 hidden group-hover:block w-48 p-2 text-[9px] rounded-lg shadow-xl border z-50 leading-relaxed ${
            darkMode ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-white text-slate-600 border-slate-200'
          }`} dir={isEn ? 'ltr' : 'rtl'}>
            {isEn 
              ? 'This is a placeholder for your premium sponsor network, Google AdSense, or direct advertiser.'
              : 'هذا مجرد مكان مؤقت لشبكة إعلاناتك أو جوجل أدسنس أو الرعاة المباشرين.'}
          </div>
        </div>
      </div>

      {/* Main content Area - Structured to match standard 728x90 advertisement banner */}
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-4 md:px-6 md:py-3.5 gap-3 min-h-[90px]">
        {/* Ad Left Section: Icon & Text */}
        <div className="flex items-center gap-3.5 w-full md:w-auto text-left" dir={isEn ? 'ltr' : 'rtl'}>
          <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${
            darkMode ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/15' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
          }`}>
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
          
          <div className="space-y-0.5 max-w-sm md:max-w-md lg:max-w-lg">
            <h4 className={`text-xs md:text-sm font-black tracking-tight leading-snug ${
              darkMode ? 'text-slate-150' : 'text-slate-850'
            }`}>
              {isEn ? 'Deploy High-Performance Cloud Servers' : 'استضف خوادمك السحابية فائقة الأداء'}
            </h4>
            <p className={`text-[10px] md:text-xs leading-normal line-clamp-1 ${
              darkMode ? 'text-slate-450' : 'text-slate-550'
            }`}>
              {isEn 
                ? 'Sponsored content will appear here. Safe-ad network verified partner.'
                : 'سيظهر المحتوى الإعلاني الممول هنا. شريك شبكة إعلانية آمنة وموثوقة.'}
            </p>
          </div>
        </div>

        {/* Ad Right Section: CTA Button & Link */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto mt-1 md:mt-0 pt-2.5 md:pt-0 border-t border-slate-800/10 md:border-0" dir={isEn ? 'ltr' : 'rtl'}>
          <span className="text-[9px] font-mono text-slate-500 hidden lg:inline">
            728x90 Leaderboard
          </span>
          <button
            onClick={() => {
              alert(isEn ? 'Redirecting to sponsor website in test mode...' : 'جاري توجيهك لموقع المعلن في وضع التجربة...');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              darkMode 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/15 hover:shadow-indigo-500/25' 
                : 'bg-indigo-650 hover:bg-indigo-700 text-white shadow shadow-indigo-650/15'
            }`}
          >
            {isEn ? 'Learn More' : 'المزيد من التفاصيل'}
          </button>
        </div>
      </div>
    </div>
  );
}
