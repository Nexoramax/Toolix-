import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, Ref } from 'react';
import { Play, Shield, X, Award, Eye, Zap, RefreshCw, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

// Standard Google AdMob Real Unit IDs
export const AD_UNIT_IDS = {
  APP_ID: 'ca-app-pub-8513965989621096~1393569764',
  BANNER: 'ca-app-pub-8513965989621096/8850790328',
  INTERSTITIAL: 'ca-app-pub-8513965989621096/5295110159',
  REWARDED: 'ca-app-pub-8513965989621096/1469591389',
};

export interface AdStats {
  impressions: number;
  completions: number;
  toolUses: number;
  lastShownTimestamp: number;
}

interface AdManagerProps {
  language: 'en' | 'ar';
  darkMode: boolean;
  showToast: (message: string, type: 'success' | 'error') => void;
  onStatsChanged?: (stats: AdStats) => void;
}

export interface AdManagerRef {
  triggerAd: (type: 'interstitial' | 'rewarded', onComplete: (completed?: boolean) => void, bypassCooldown?: boolean) => void;
  getStats: () => AdStats;
  incrementToolUses: () => void;
}

export const AdManager = forwardRef(({ language, darkMode, showToast, onStatsChanged }: AdManagerProps, ref: Ref<AdManagerRef>) => {
  const [stats, setStats] = useState<AdStats>({
    impressions: 0,
    completions: 0,
    toolUses: 0,
    lastShownTimestamp: 0,
  });

  // Track the active callback for the currently running ad
  const activeCallbackRef = useRef<((completed?: boolean) => void) | null>(null);
  
  // Timeout reference for handling ad loading timeout
  const loadTimeoutRef = useRef<any>(null);

  // Active Ad State
  const [activeAd, setActiveAd] = useState<{
    type: 'interstitial' | 'rewarded';
    visible: boolean;
    loading: boolean;
    countdown: number;
    canClose: boolean;
    rewardGranted: boolean;
    brandName: string;
    description: string;
    cta: string;
  } | null>(null);

  // Sync Stats with LocalStorage
  useEffect(() => {
    const savedImpressions = localStorage.getItem('toolix_ad_impressions');
    const savedCompletions = localStorage.getItem('toolix_ad_completions');
    const savedToolUses = localStorage.getItem('toolix_ad_tool_uses');
    const savedLastShown = localStorage.getItem('toolix_ad_last_shown');

    const loadedStats = {
      impressions: savedImpressions ? parseInt(savedImpressions) : 0,
      completions: savedCompletions ? parseInt(savedCompletions) : 0,
      toolUses: savedToolUses ? parseInt(savedToolUses) : 0,
      lastShownTimestamp: savedLastShown ? parseInt(savedLastShown) : 0,
    };
    
    setStats(loadedStats);
    if (onStatsChanged) {
      setTimeout(() => {
        onStatsChanged(loadedStats);
      }, 0);
    }
  }, []);

  const updateStats = (newStats: Partial<AdStats>) => {
    setStats((prev) => {
      const updated = { ...prev, ...newStats };
      localStorage.setItem('toolix_ad_impressions', updated.impressions.toString());
      localStorage.setItem('toolix_ad_completions', updated.completions.toString());
      localStorage.setItem('toolix_ad_tool_uses', updated.toolUses.toString());
      localStorage.setItem('toolix_ad_last_shown', updated.lastShownTimestamp.toString());
      if (onStatsChanged) {
        setTimeout(() => {
          onStatsChanged(updated);
        }, 0);
      }
      return updated;
    });
  };

  // Sponsors
  const SPONSORS = [
    {
      en: { brandName: 'HostCloud Premium VPS', desc: 'Enterprise Cloud Server hosting with high-performance storage and instant deployment. 99.99% Guaranteed uptime.', cta: 'Claim $100 Trial Credit' },
      ar: { brandName: 'استضافة هوست كلاود السحابية', desc: 'استضافة سحابية فائقة السرعة للمؤسسات والمطورين مع تفعيل فوري وضمان تشغيل مستقر.', cta: 'احصل على رصيد تجريبي 100$' }
    },
    {
      en: { brandName: 'Figma Enterprise', desc: 'Real-time vector collaborative canvas for design systems, wireframing, and interactive prototyping.', cta: 'Try Team Edition Free' },
      ar: { brandName: 'فيجما للمؤسسات', desc: 'بيئة العمل التعاونية الأولى لتصميم الواجهات، وهيكلة الصفحات، وصنع النماذج التفاعلية.', cta: 'جرب النسخة الجماعية مجاناً' }
    },
    {
      en: { brandName: 'SecureVPN Suite 2026', desc: 'Double-hop bank-grade VPN tunnel for unmetered encryption. Safely bypass regional bandwidth caps.', cta: 'Protect Connection Now' },
      ar: { brandName: 'شبكة سيكيور في بي إن الآمنة', desc: 'تشفير مزدوج متقدم لحماية اتصالك وسرية بياناتك مع فك القيود وتصفح مجهول الهوية.', cta: 'احمِ اتصالك بالإنترنت فوراً' }
    }
  ];

  // AdMob Event Hooks & Trigger Logic
  const triggerAd = (type: 'interstitial' | 'rewarded', onComplete: (completed?: boolean) => void, bypassCooldown: boolean = false) => {
    // 5. Prevent duplicate ads from showing at the same time
    if (activeAd && activeAd.visible) {
      console.warn(`[AdMob] An ad of type ${activeAd.type} is already active/visible. Ignoring new trigger.`);
      onComplete(false);
      return;
    }

    const now = Date.now();
    const timeSinceLastAd = now - stats.lastShownTimestamp;
    
    // UX Rule: Don't show more than 1 ad every 2 minutes. This applies to both types to prevent ad spam.
    if (!bypassCooldown && timeSinceLastAd < 120000 && stats.lastShownTimestamp > 0) {
      console.log(`[AdMob] ${type.toUpperCase()} Ad skipped due to rate-limiting (last shown ${Math.round(timeSinceLastAd / 1000)}s ago). Allowing access directly.`);
      onComplete(true);
      return;
    }

    console.log(`[AdMob] Preparing to load ${type.toUpperCase()} Ad. Unit ID: ${type === 'interstitial' ? AD_UNIT_IDS.INTERSTITIAL : AD_UNIT_IDS.REWARDED}`);
    
    // 6. Handle Internet Status: AdMob fails if offline
    if (!navigator.onLine) {
      console.error('[AdMob] Ad failed to load: No internet connection.');
      const offlineMsg = language === 'ar' 
        ? 'لا يوجد اتصال بالإنترنت. تم تشغيل الأداة تلقائياً.' 
        : 'No internet connection. Tool launched automatically.';
      showToast(offlineMsg, 'error');
      
      // 7. Do not block tools when ad fails
      onComplete(true);
      return;
    }

    // Save the callback
    activeCallbackRef.current = onComplete;

    // Pick random sponsor
    const sponsorChoice = SPONSORS[Math.floor(Math.random() * SPONSORS.length)];
    const adData = language === 'ar' ? sponsorChoice.ar : sponsorChoice.en;

    setActiveAd({
      type,
      visible: true,
      loading: true,
      countdown: type === 'rewarded' ? 8 : 5, // Rewarded countdown: 8 seconds, Interstitial: 5 seconds
      canClose: false,
      rewardGranted: false,
      brandName: adData.brandName,
      description: adData.desc,
      cta: adData.cta
    });

    // Clear previous timeout if any
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    // 6. Load Timeout: trigger graceful failure if it exceeds 8 seconds
    loadTimeoutRef.current = setTimeout(() => {
      setActiveAd(prev => {
        if (prev && prev.loading) {
          console.error('[AdMob] Timeout: Ad loading took too long (limit 8s). Proceeding gracefully.');
          
          const timeoutMsg = language === 'ar'
            ? 'انتهت مهلة تحميل الإعلان. تم فتح الأداة تلقائياً.'
            : 'Ad load timeout. Tool launched automatically.';
          showToast(timeoutMsg, 'error');

          const callback = activeCallbackRef.current;
          activeCallbackRef.current = null;
          if (callback) {
            callback(true); // Graceful fallback
          }
          return null; // Close ad modal
        }
        return prev;
      });
    }, 8000);

    // Simulate 1.2s networks caching latency (Beautiful loading view)
    setTimeout(() => {
      // Clear the timeout once successfully cached
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }

      setActiveAd(prev => {
        if (!prev || !prev.visible) return prev; // If closed/failed during loading
        return { ...prev, loading: false };
      });

      // Execute side-effects outside of the React state updater/render phase
      if (activeCallbackRef.current === onComplete) {
        console.log(`[AdMob] onAdLoaded - Creative assets cached successfully.`);
        
        // 8. Console Logs: Log correct event depending on ad type
        if (type === 'rewarded') {
          console.log('Rewarded Loaded');
        } else {
          console.log('Interstitial Loaded');
          console.log('Interstitial Shown');
        }
        console.log(`[AdMob] onAdOpened - Impression counted. Total Impressions: ${stats.impressions + 1}`);
        
        // Track Impression in Local Storage
        updateStats({
          impressions: stats.impressions + 1,
          lastShownTimestamp: Date.now()
        });
      }
    }, 1200);
  };

  // Simulated ad load failure for testing
  const simulateAdFailure = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    console.error(`[AdMob] onAdFailedToLoad - Error Code 3: No Ad Fill from Server. Ad Unit ID active: ${activeAd?.type === 'rewarded' ? AD_UNIT_IDS.REWARDED : AD_UNIT_IDS.INTERSTITIAL}`);
    
    const failToast = language === 'ar' 
      ? 'فشل تحميل الإعلان. جاري المتابعة بدون إعلان.' 
      : 'Failed to load ad. Proceeding to tool directly.';
    
    showToast(failToast, 'error');

    // Store current callback, reset ad state, then invoke callback (fallback access)
    const callback = activeCallbackRef.current;
    setActiveAd(null);
    activeCallbackRef.current = null;
    if (callback) {
      callback(true);
    }
  };

  // Countdown timer clock loop
  useEffect(() => {
    if (!activeAd || activeAd.loading || activeAd.countdown <= 0) {
      if (activeAd && activeAd.countdown === 0 && !activeAd.canClose) {
        console.log(`[AdMob] Countdown complete for ${activeAd.type} ad`);
        
        if (activeAd.type === 'rewarded') {
          console.log(`[AdMob] onUserEarnedReward - Rewarding user for fully watching the sponsor clip.`);
          console.log('Reward Earned');
          setActiveAd(prev => prev ? { ...prev, canClose: true, rewardGranted: true } : null);
          updateStats({ completions: stats.completions + 1 });
        } else {
          setActiveAd(prev => prev ? { ...prev, canClose: true } : null);
          updateStats({ completions: stats.completions + 1 });
        }
      }
      return;
    }

    const timer = setTimeout(() => {
      setActiveAd(prev => {
        if (!prev) return null;
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeAd?.countdown, activeAd?.loading]);

  // Dismissing Ad overlay
  const handleCloseAd = () => {
    if (!activeAd) return;
    
    console.log(`[AdMob] onAdClosed - Ad dismissed by user.`);
    
    const wasRewardGranted = activeAd.rewardGranted;
    const previousType = activeAd.type;
    const callback = activeCallbackRef.current;

    setActiveAd(null);
    activeCallbackRef.current = null;

    if (previousType === 'rewarded' && !wasRewardGranted) {
      // If closed early without reward, inform user but let them proceed (as Requirement 6 specifies no blocking)
      console.warn(`[AdMob] Rewarded ad dismissed before reward validation was issued.`);
    }

    // Call the original action callback
    if (callback) {
      callback(previousType === 'rewarded' ? wasRewardGranted : true);
    }
  };

  useImperativeHandle(ref, () => ({
    triggerAd,
    getStats: () => stats,
    incrementToolUses: () => {
      updateStats({ toolUses: stats.toolUses + 1 });
    }
  }));

  if (!activeAd || !activeAd.visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all animate-fade-in font-sans">
      <div className={`relative w-full max-w-lg rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${
        darkMode ? 'bg-[#0a0d16]/95 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Glow behind modal */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* LOADING STATE VIEW */}
        {activeAd.loading ? (
          <div className="py-20 px-6 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className={`text-sm font-extrabold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {language === 'en' ? 'Sponsor Video Loading...' : 'جاري تحميل مقطع الراعي الإعلاني...'}
              </p>
              <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                {language === 'en' 
                  ? 'Connecting securely to AdMob advertisement distribution servers' 
                  : 'اتصال آمن بملقمات توزيع الإعلانات المعتمدة من Google AdMob'}
              </p>
            </div>

            {/* Simulated Load Failure Button for Testing Fallbacks */}
            <button
              onClick={simulateAdFailure}
              className="text-[10px] font-bold px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 rounded-lg transition-all cursor-pointer"
            >
              {language === 'en' ? 'Simulate Network Error' : 'محاكاة فشل الشبكة'}
            </button>
          </div>
        ) : (
          /* ACTIVE VIDEO CLIPS / BANNER PANEL */
          <div className="p-6 space-y-6 relative">
            
            {/* Header banner info */}
            <div className="flex justify-between items-center border-b border-slate-800/15 pb-3.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] uppercase tracking-wider font-extrabold">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {activeAd.type === 'rewarded' 
                    ? (language === 'en' ? 'Rewarded Sponsor Clip' : 'مقطع راعي بمكافأة')
                    : (language === 'en' ? 'Interstitial Sponsor Ad' : 'إعلان راعي بيني')}
                </span>
              </span>

              <div className="flex items-center gap-2">
                {activeAd.canClose ? (
                  <button
                    onClick={handleCloseAd}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      darkMode ? 'bg-slate-900 border-slate-850 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs font-mono font-bold bg-slate-950 px-3 py-1 rounded-md border border-slate-850 text-amber-400">
                    {language === 'en' ? `Skip in ${activeAd.countdown}s` : `تخطي بعد ${activeAd.countdown}ث`}
                  </span>
                )}
              </div>
            </div>

            {/* Video Canvas Presentation Screen */}
            <div className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden border border-slate-850 flex flex-col justify-between p-4 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/85 to-indigo-900/25" />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] font-mono text-slate-600">AdMob Creative Network</span>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md">
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>142K views today</span>
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center space-y-2 py-3">
                <div className="bg-indigo-600 p-3.5 rounded-full text-white shadow-xl shadow-indigo-600/30 animate-pulse">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <p className="text-xs font-bold text-slate-300">
                  {activeAd.brandName}
                </p>
              </div>

              {/* Countdown track */}
              <div className="relative z-10 space-y-1">
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full transition-all duration-1000 ease-linear"
                    style={{ 
                      width: `${100 - (activeAd.countdown / (activeAd.type === 'rewarded' ? 8 : 5)) * 100}%` 
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                  <span>0:{(activeAd.type === 'rewarded' ? 8 : 5) - activeAd.countdown}</span>
                  <span>0:{activeAd.type === 'rewarded' ? 8 : 5}</span>
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-1.5 text-center sm:text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <h3 className={`text-base font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeAd.brandName}
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {activeAd.description}
              </p>
            </div>

            {/* Interactive footer action */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-800/10">
              <a
                href="#visit-sponsor"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`[AdMob] onAdLeftApplication - Visited sponsor: ${activeAd.cta}`);
                  alert(language === 'en' ? 'Redirecting to sponsor portal in test mode...' : 'جاري التحويل لصفحة الراعي في وضع الاختبار...');
                }}
                className="w-full text-center py-3 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current text-yellow-300 animate-bounce" />
                <span>{activeAd.cta}</span>
              </a>

                        </div>

            {/* Ad Unit Id identifier */}
            <p className="text-[9px] text-slate-500 text-center font-mono mt-2 leading-tight">
              {language === 'en' 
                ? `Active Test Unit ID: ${activeAd.type === 'rewarded' ? AD_UNIT_IDS.REWARDED : AD_UNIT_IDS.INTERSTITIAL}`
                : `معرّف الإعلان النشط: ${activeAd.type === 'rewarded' ? AD_UNIT_IDS.REWARDED : AD_UNIT_IDS.INTERSTITIAL}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

// Beautiful Inline Banner Ad Component
interface AdBannerProps {
  language: 'en' | 'ar';
  darkMode: boolean;
  onVisibilityChange?: (visible: boolean) => void;
}

export function AdBanner({ language, darkMode, onVisibilityChange }: AdBannerProps) {
  const [closed, setClosed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [adContent, setAdContent] = useState({
    title: 'AdMob Sponsor Ad',
    desc: 'Deploy fast servers starting from $2.50/mo.',
    cta: 'Learn More',
    id: AD_UNIT_IDS.BANNER
  });

  const visible = !closed && !hasFailed;

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(visible);
    }
  }, [visible, onVisibilityChange]);

  useEffect(() => {
    // Reset loading state on language change
    setIsLoaded(false);
    setHasFailed(false);

    const banners = [
      {
        en: { title: 'Premium HostCloud', desc: 'Secure VPS servers starting at $2.50/mo. Global CDN included.', cta: 'Deploy Now' },
        ar: { title: 'هوست كلاود المتميز', desc: 'خوادم سحابية متميزة تبدأ من 2.50$ شهرياً، مع شبكة توصيل محتوى ذكية.', cta: 'تفعيل الآن' }
      },
      {
        en: { title: 'DesignFlow Suite', desc: 'Convert Figma/Sketch graphics to clean production-ready React typescript instantly.', cta: 'Export Code' },
        ar: { title: 'ديزاين فلو', desc: 'حول ملفات وتصاميم فيجما إلى كود ريأكت وتيب سكريبت منسق في ثانية واحدة.', cta: 'تصدير الكود' }
      },
      {
        en: { title: 'SafeGuard Pro VPN', desc: 'Keep your web actions anonymous. Fast unlimited proxies included.', cta: 'Install Free' },
        ar: { title: 'سيف جارد في بي إن', desc: 'احمِ اتصالك بالإنترنت وتصفح بسرية تامة مع خوادم غير محدودة السرعة.', cta: 'تثبيت مجاني' }
      }
    ];

    const chosen = banners[Math.floor(Math.random() * banners.length)];
    const text = language === 'ar' ? chosen.ar : chosen.en;
    setAdContent({
      title: text.title,
      desc: text.desc,
      cta: text.cta,
      id: AD_UNIT_IDS.BANNER
    });

    console.log(`[AdMob] Banner Ad initialized. Unit ID: ${AD_UNIT_IDS.BANNER}`);

    // Simulate standard Google AdMob asynchronous load
    const timer = setTimeout(() => {
      // 95% success rate for simulation robustness
      const simulateSuccess = Math.random() < 0.95;
      if (simulateSuccess) {
        setIsLoaded(true);
        console.log('Banner Loaded');
        console.log('Banner Displayed');
      } else {
        setHasFailed(true);
        console.log('Banner Failed');
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [language]);

  if (closed || hasFailed) return null;

  // Render a subtle shimmer placeholder before the banner fully loads to mimic native SDK behavior
  if (!isLoaded) {
    return (
      <div className={`relative p-3.5 h-[64px] rounded-xl border animate-pulse flex items-center justify-between ${
        darkMode ? 'bg-slate-900/20 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="flex items-center gap-3 w-full">
          <div className="bg-slate-700/20 w-8 h-8 rounded-lg" />
          <div className="space-y-2 w-1/3">
            <div className="bg-slate-700/20 h-3 rounded" />
            <div className="bg-slate-700/20 h-2 rounded w-5/6" />
          </div>
        </div>
        <div className="bg-slate-700/20 w-16 h-7 rounded-lg" />
      </div>
    );
  }

  return (
    <div className={`relative p-3.5 rounded-xl border overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3 ${
      darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Absolute top badge */}
      <span className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-widest text-slate-500 font-bold bg-slate-900/10 dark:bg-slate-950 px-1.5 py-0.5 rounded">
        AD
      </span>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="bg-blue-600/15 p-2 rounded-lg text-blue-400">
          <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
        </div>
        <div className="text-left w-full sm:w-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <h4 className={`text-xs font-extrabold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            {adContent.title}
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
            {adContent.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <span className="text-[8px] font-mono text-slate-500 hidden sm:inline">{adContent.id}</span>
        
        <div className="flex items-center gap-1.5">
          <a
            href="#sponsor-cta"
            onClick={(e) => {
              e.preventDefault();
              console.log(`[AdMob] Banner Ad click tracked.`);
              alert(language === 'en' ? 'Opening sponsor link...' : 'جاري فتح رابط الراعي...');
            }}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer"
          >
            {adContent.cta}
          </a>
          
          <button
            onClick={() => {
              console.log('[AdMob] Banner ad dismissed.');
              setClosed(true);
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300"
            title="Dismiss Ad"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
