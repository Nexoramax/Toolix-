import React from 'react';
import { 
  Calendar, Activity, Percent, TrendingUp, Coins, QrCode, Lock, FileText, 
  Minimize, FileImage, Files, Scale, Type, Palette, ShieldAlert, Braces, 
  Fingerprint, Key, Link as LinkIcon, Hash, Sparkles, Receipt, Code, AlertCircle,
  Play
} from 'lucide-react';
import { tools } from '../data';

interface ToolCardImageProps {
  toolId: string;
  darkMode: boolean;
}

// Category-based illustrations for fallback
function CategoryPDFIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10 animate-fade-in" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="15" width="40" height="52" rx="4" fill={darkMode ? "#1e293b" : "#f1f5f9"} stroke={darkMode ? "#ef4444" : "#f87171"} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="32" y1="25" x2="52" y2="25" stroke={darkMode ? "#475569" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="33" x2="58" y2="33" stroke={darkMode ? "#475569" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="41" x2="48" y2="41" stroke={darkMode ? "#475569" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        
        <rect x="38" y="27" width="42" height="54" rx="5" fill={darkMode ? "#0f172a" : "#ffffff"} stroke="#ef4444" strokeWidth="2" />
        <path d="M68 27H75C77.2091 27 79 28.7909 79 31V76C79 78.2091 77.2091 80 75 80H43C40.7909 80 39 78.2091 39 76V73" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3" />
        
        <line x1="48" y1="38" x2="70" y2="38" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="48" y1="46" x2="72" y2="46" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="54" x2="64" y2="54" stroke={darkMode ? "#94a3b8" : "#475569"} strokeWidth="2" strokeLinecap="round" />
        
        <rect x="46" y="61" width="24" height="11" rx="3" fill="#ef4444" />
        <text x="58" y="69" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PDF</text>
      </svg>
    </div>
  );
}

function CategoryImageIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-purple-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="16" width="56" height="64" rx="6" fill={darkMode ? "#1e293b" : "#f8fafc"} stroke={darkMode ? "#475569" : "#cbd5e1"} strokeWidth="1.5" />
        <rect x="28" y="22" width="44" height="42" rx="3" fill={darkMode ? "#0f172a" : "#e2e8f0"} stroke={darkMode ? "#334155" : "#cbd5e1"} strokeWidth="1" />
        
        <circle cx="60" cy="32" r="5" fill="#a855f7" fillOpacity="0.8" />
        <path d="M28 60L42 42L52 52L64 38L72 54H28V60Z" fill={darkMode ? "#3b0764" : "#d8b4fe"} stroke="#a855f7" strokeWidth="1.5" strokeLinejoin="round" />
        
        <line x1="30" y1="71" x2="70" y2="71" stroke={darkMode ? "#475569" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        <circle cx="48" cy="71" r="3.5" fill="#a855f7" stroke={darkMode ? "#0f172a" : "#ffffff"} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function CategoryTextIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-emerald-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="15" width="56" height="70" rx="6" fill={darkMode ? "#0f172a" : "#ffffff"} stroke="#10b981" strokeWidth="2" />
        <line x1="36" y1="15" x2="36" y2="85" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
        
        <line x1="42" y1="28" x2="70" y2="28" stroke={darkMode ? "#334155" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="36" x2="66" y2="36" stroke={darkMode ? "#334155" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        
        <rect x="42" y="41" width="28" height="6" rx="2" fill="#10b981" fillOpacity="0.2" />
        <line x1="42" y1="44" x2="70" y2="44" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        
        <line x1="42" y1="52" x2="60" y2="52" stroke={darkMode ? "#334155" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="60" x2="68" y2="60" stroke={darkMode ? "#334155" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="68" x2="54" y2="68" stroke={darkMode ? "#334155" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" />
        
        <circle cx="68" cy="68" r="9" fill="#10b981" />
        <text x="68" y="71" fill="#ffffff" fontSize="10" fontWeight="extrabold" fontFamily="sans-serif" textAnchor="middle">A</text>
      </svg>
    </div>
  );
}

function CategoryDeveloperIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="20" width="64" height="60" rx="6" fill={darkMode ? "#090d16" : "#f1f5f9"} stroke={darkMode ? "#1e293b" : "#cbd5e1"} strokeWidth="2" />
        <path d="M18 26C18 22.6863 20.6863 20 24 20H76C79.3137 20 82 22.6863 82 26V30H18V26Z" fill={darkMode ? "#111827" : "#e2e8f0"} />
        <circle cx="26" cy="25" r="2.5" fill="#ef4444" />
        <circle cx="34" cy="25" r="2.5" fill="#f59e0b" />
        <circle cx="42" cy="25" r="2.5" fill="#10b981" />
        
        <path d="M26 42L33 47L26 52" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="37" y1="47" x2="47" y2="47" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        
        <text x="26" y="65" fill={darkMode ? "#64748b" : "#475569"} fontSize="8" fontFamily="monospace" fontWeight="bold">const app =</text>
        <rect x="26" y="69" width="40" height="4" rx="1.5" fill="#3b82f6" fillOpacity="0.3" />
      </svg>
    </div>
  );
}

function CategorySecurityIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-indigo-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 16C59.5 21 72 21 72 21V46C72 60.5 59.5 76 50 82C40.5 76 28 60.5 28 46V21C28 21 40.5 21 50 16Z" fill={darkMode ? "#0f172a" : "#ffffff"} stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M50 22C43 26 34 26 34 26V46C34 57 43.5 69 50 74C56.5 69 66 57 66 46V26C66 26 57 26 50 22Z" fill="#6366f1" fillOpacity="0.08" />
        
        <rect x="42" y="48" width="16" height="12" rx="2.5" fill="#6366f1" />
        <path d="M45 48V42.5C45 39.5 47.5 37 50 37C52.5 37 55 39.5 55 42.5V48" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="54" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
}

function CategoryCalculatorsIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="16" width="56" height="68" rx="8" fill={darkMode ? "#0f172a" : "#ffffff"} stroke="#06b6d4" strokeWidth="2" />
        
        <rect x="28" y="22" width="44" height="15" rx="4" fill={darkMode ? "#090d16" : "#f1f5f9"} stroke={darkMode ? "#1e293b" : "#cbd5e1"} strokeWidth="1" />
        <text x="66" y="32" fill="#06b6d4" fontSize="10" fontWeight="extrabold" fontFamily="monospace" textAnchor="end">1,240.50</text>
        
        <rect x="28" y="44" width="8" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="40" y="44" width="8" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="52" y="44" width="8" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="64" y="44" width="8" height="8" rx="2" fill="#06b6d4" />
        <text x="68" y="50" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">/</text>
        
        <rect x="28" y="55" width="8" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="40" y="55" width="8" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="52" y="55" width="8" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="64" y="55" width="8" height="8" rx="2" fill="#06b6d4" />
        <text x="68" y="61" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">*</text>

        <rect x="28" y="66" width="20" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="52" y="66" width="8" height="8" rx="2" fill={darkMode ? "#1e293b" : "#e2e8f0"} />
        <rect x="64" y="66" width="8" height="8" rx="2" fill="#06b6d4" />
        <text x="68" y="72" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">=</text>
      </svg>
    </div>
  );
}

function CategoryConvertersIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-amber-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="28" stroke={darkMode ? "#334155" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="3 3" />
        
        <path d="M46 22H64V40" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M64 22L42 44" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        
        <path d="M54 78H36V60" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 78L58 56" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        
        <circle cx="50" cy="50" r="10" fill={darkMode ? "#0f172a" : "#ffffff"} stroke="#f59e0b" strokeWidth="2" />
        <text x="50" y="53" fill="#f59e0b" fontSize="8" fontWeight="extrabold" fontFamily="monospace" textAnchor="middle">⇄</text>
      </svg>
    </div>
  );
}

function CategoryGeneratorsIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-pink-500/10 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#ec4899" strokeWidth="2" strokeLinecap="round">
          <line x1="28" y1="28" x2="34" y2="34" />
          <line x1="72" y1="28" x2="66" y2="34" />
          <line x1="28" y1="72" x2="34" y2="66" />
        </g>
        
        <path d="M36 24L38 29L43 31L38 33L36 38L34 33L29 31L34 29L36 24Z" fill="#ec4899" />
        <path d="M64 16L65 19.5L68.5 20.5L65 21.5L64 25L63 21.5L59.5 20.5L63 19.5L64 16Z" fill="#db2777" />
        
        <path d="M32 74L68 38L62 32L26 68L32 74Z" fill={darkMode ? "#1e293b" : "#cbd5e1"} stroke={darkMode ? "#334155" : "#475569"} strokeWidth="1.5" />
        <path d="M62 32L68 38L74 32L68 26L62 32Z" fill="#ec4899" className="animate-pulse" />
        
        <circle cx="72" cy="55" r="2" fill="#ec4899" />
        <circle cx="28" cy="48" r="1.5" fill="#db2777" />
        <circle cx="50" cy="74" r="2.5" fill="#f472b6" />
      </svg>
    </div>
  );
}

function CategoryAIIllustration({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute inset-0 bg-fuchsia-500/15 rounded-xl blur-lg" />
      <svg className="w-16 h-16 relative z-10 animate-pulse" style={{ animationDuration: '4s' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="18" stroke="#d946ef" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="30" stroke="#a21caf" strokeWidth="0.75" strokeDasharray="4 2" />
        
        <line x1="50" y1="20" x2="50" y2="80" stroke="#d946ef" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#d946ef" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="28.7" y1="28.7" x2="71.3" y2="71.3" stroke="#d946ef" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="28.7" y1="71.3" x2="71.3" y2="28.7" stroke="#d946ef" strokeWidth="1" strokeOpacity="0.4" />
        
        <circle cx="50" cy="20" r="3" fill="#d946ef" />
        <circle cx="50" cy="80" r="3" fill="#d946ef" />
        <circle cx="20" cy="50" r="3" fill="#d946ef" />
        <circle cx="80" cy="50" r="3" fill="#d946ef" />
        <circle cx="28.7" cy="28.7" r="3" fill="#a21caf" />
        <circle cx="71.3" cy="71.3" r="3" fill="#a21caf" />
        <circle cx="28.7" cy="71.3" r="3" fill="#a21caf" />
        <circle cx="71.3" cy="28.7" r="3" fill="#a21caf" />
        
        <path d="M50 35L53 47L65 50L53 53L50 65L47 53L35 50L47 47L50 35Z" fill="url(#aiSparkleGrad)" />
        
        <defs>
          <linearGradient id="aiSparkleGrad" x1="35" y1="35" x2="65" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f5d0fe" />
            <stop offset="0.5" stopColor="#d946ef" />
            <stop offset="1" stopColor="#701a75" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function ToolCardImage({ toolId, darkMode }: ToolCardImageProps) {
  const getIllustration = () => {
    switch (toolId) {
      case 'age-calculator':
      case 'age-difference-calculator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`relative p-3 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'} shadow-md flex items-center gap-3 w-4/5`}>
              <Calendar className="w-8 h-8 text-blue-500" />
              <div className="space-y-1 text-left">
                <div className={`h-2.5 w-16 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                <div className={`h-1.5 w-10 rounded ${darkMode ? 'bg-slate-800/60' : 'bg-slate-200/60'}`} />
              </div>
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-500 text-white shadow">
                2026
              </span>
            </div>
          </div>
        );

      case 'bmi-calculator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-4">
            <div className="w-full flex justify-between text-[8px] font-mono text-slate-500 mb-1">
              <span>Underweight</span>
              <span className="text-emerald-500 font-bold">Healthy</span>
              <span>Overweight</span>
            </div>
            <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-800 flex relative">
              <div className="w-1/3 bg-amber-500/20 h-full rounded-l-full" />
              <div className="w-1/3 bg-emerald-500/30 h-full" />
              <div className="w-1/3 bg-rose-500/20 h-full rounded-r-full" />
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1.5 bg-emerald-500 border border-white dark:border-slate-950 rounded-full animate-bounce" />
            </div>
            <div className="mt-2 text-[10px] font-mono font-bold text-emerald-400">
              BMI: 21.7
            </div>
          </div>
        );

      case 'percentage-calculator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 w-4/5 ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-sm font-black text-blue-500">%</span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1">
                  <span className={`text-[8px] font-mono ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>20% of 150 =</span>
                  <span className="text-[10px] font-bold text-emerald-400">30</span>
                </div>
                <div className={`h-1.5 w-full rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
              </div>
            </div>
          </div>
        );

      case 'loan-calculator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-4">
            <div className="w-full flex items-end justify-between h-10 gap-1.5 px-2">
              <div className="bg-blue-500/20 w-3 h-5 rounded-t" />
              <div className="bg-blue-500/40 w-3 h-8 rounded-t" />
              <div className="bg-blue-500/60 w-3 h-6 rounded-t" />
              <div className="bg-blue-600 w-3 h-10 rounded-t shadow-md shadow-blue-500/20 animate-pulse" />
            </div>
            <div className="w-full h-0.5 bg-slate-700/30 rounded mt-1" />
            <div className="flex justify-between w-full text-[8px] font-mono text-slate-500 mt-1 px-1">
              <span>Interest</span>
              <span className="font-bold text-slate-300">$420/mo</span>
            </div>
          </div>
        );

      case 'currency-converter':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex items-center gap-2">
              <div className={`px-2.5 py-1.5 rounded-lg border text-xs font-black shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-slate-50 border-slate-200 text-blue-600'}`}>
                USD
              </div>
              <Coins className="w-4 h-4 text-slate-500 animate-spin" style={{ animationDuration: '6s' }} />
              <div className={`px-2.5 py-1.5 rounded-lg border text-xs font-black shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'}`}>
                EUR
              </div>
            </div>
            <span className="text-[8px] font-mono text-slate-500 mt-2">Rate: 1.00 USD = 0.92 EUR</span>
          </div>
        );

      case 'qr-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2 rounded-xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'} shadow`}>
              <QrCode className="w-11 h-11 text-indigo-400" />
            </div>
          </div>
        );

      case 'password-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-5">
            <div className={`w-full p-2.5 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'} shadow-sm`}>
              <Lock className="w-4 h-4 text-emerald-400" />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                ))}
              </div>
              <span className="text-[9px] font-extrabold text-emerald-400 uppercase">Strong</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2 border border-slate-300 dark:border-slate-850">
              <div className="bg-emerald-500 h-full w-4/5 rounded-full" />
            </div>
          </div>
        );

      case 'word-counter':
      case 'char-counter':
      case 'case-converter':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2.5 rounded-xl border text-left w-4/5 relative ${darkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="space-y-1.5">
                <div className={`h-1.5 w-11/12 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
                <div className={`h-1.5 w-4/5 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
                <div className="h-1.5 w-3/5 rounded bg-blue-500/50" />
              </div>
              <span className="absolute bottom-1 right-2 font-mono text-[8px] text-blue-400 font-extrabold">
                A-z
              </span>
            </div>
          </div>
        );

      case 'image-compressor':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-6">
            <div className="flex items-center justify-between w-full gap-2.5">
              <div className="text-center">
                <div className={`p-2 rounded-lg border ${darkMode ? 'bg-slate-950/60 border-slate-900 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <FileImage className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono text-slate-500 block mt-1">4.2 MB</span>
              </div>
              
              <div className="text-blue-400 flex flex-col items-center">
                <Minimize className="w-3.5 h-3.5 animate-bounce" />
                <span className="text-[8px] font-mono font-bold text-emerald-400">-75%</span>
              </div>

              <div className="text-center">
                <div className="p-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <FileImage className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono text-emerald-400 block mt-1">1.0 MB</span>
              </div>
            </div>
          </div>
        );

      case 'image-to-pdf':
      case 'pdf-merger':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex items-center -space-x-2">
              <div className={`p-2.5 rounded-lg border rotate-[-6deg] shadow-md ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <FileImage className="w-4 h-4" />
              </div>
              <div className={`p-2.5 rounded-lg border rotate-[6deg] shadow-lg relative z-10 ${darkMode ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-white border-slate-300 text-blue-600'}`}>
                <Files className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded-lg border bg-rose-500/15 border-rose-500/30 text-rose-500 shadow-md rotate-[-3deg]">
                <span className="text-[9px] font-bold">PDF</span>
              </div>
            </div>
          </div>
        );

      case 'unit-converter':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 w-4/5 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <Scale className="w-5 h-5 text-indigo-400 animate-pulse" />
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-mono font-extrabold text-indigo-400">10 kg</span>
                <span className={`text-[8px] font-mono block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>= 22.04 lbs</span>
              </div>
            </div>
          </div>
        );

      case 'color-picker':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-5">
            <div className="flex gap-1.5 w-full justify-center">
              <div className="w-5 h-7 rounded-lg bg-blue-500 shadow-sm" />
              <div className="w-5 h-7 rounded-lg bg-indigo-500 shadow-sm" />
              <div className="w-5 h-7 rounded-lg bg-purple-500 shadow-sm" />
              <div className="w-5 h-7 rounded-lg bg-rose-500 shadow-sm" />
            </div>
            <span className="text-[8px] font-mono text-slate-500 mt-2 font-bold">#3B82F6 &bull; #6366F1</span>
          </div>
        );

      case 'json-formatter':
      case 'json-validator':
      case 'html-minifier':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2 rounded-xl border w-11/12 text-left shadow-sm ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-100 border-slate-200'}`}>
              <div className="flex items-center gap-1 border-b border-slate-800/10 pb-1 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-[7px] text-blue-400 space-y-0.5">
                <div>{'{'}</div>
                <div className="pl-2"><span className="text-purple-400">"status"</span>: <span className="text-emerald-400">"success"</span>,</div>
                <div className="pl-2"><span className="text-purple-400">"code"</span>: <span className="text-amber-400">200</span></div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        );

      case 'uuid-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-4">
            <div className={`w-full p-2 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <Fingerprint className="w-4 h-4 text-purple-400" />
              <span className="text-[7.5px] font-mono text-slate-400">f81d4fae-7dec-11d0-a765</span>
            </div>
            <span className="text-[8px] font-mono text-slate-500 mt-1.5">RFC 4122 Standard</span>
          </div>
        );

      case 'base64-encoder':
      case 'hash-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2 rounded-xl border text-center flex items-center gap-2.5 ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <Key className="w-4 h-4 text-blue-500 animate-pulse" />
              <div className="text-left leading-tight">
                <span className="text-[9px] font-mono font-bold text-slate-300">SHA-256</span>
                <span className="text-[7px] font-mono text-slate-500 block">e3b0c44298fc1c149afbf4c8...</span>
              </div>
            </div>
          </div>
        );

      case 'url-encoder':
        const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://toolix.app';
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-5">
            <div className={`w-full p-2 rounded-xl border text-left flex items-center gap-2 ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[7.5px] font-mono text-cyan-400 truncate">{originUrl}?q=saas%20suite</span>
            </div>
          </div>
        );

      case 'ai-prompt-generator':
      case 'social-caption-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-ping" />
              <div className="relative bg-gradient-to-tr from-blue-600 to-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-600/20">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <span className="text-[9px] font-bold text-indigo-400 mt-2 uppercase tracking-widest animate-pulse">AI Powered</span>
          </div>
        );

      case 'resume-builder':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2 rounded-xl border w-4/5 text-left shadow relative ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-1.5 mb-2 border-b border-slate-800/10 pb-1">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="space-y-0.5">
                  <div className={`h-1.5 w-10 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
                  <div className={`h-1 w-6 rounded ${darkMode ? 'bg-slate-800/60' : 'bg-slate-300/60'}`} />
                </div>
              </div>
              <div className="space-y-1">
                <div className={`h-1 w-full rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
                <div className={`h-1 w-5/6 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
                <div className={`h-1 w-2/3 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
              </div>
            </div>
          </div>
        );

      case 'invoice-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2 rounded-xl border w-4/5 text-left shadow relative ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-center mb-1.5 border-b border-slate-800/10 pb-1">
                <span className="text-[7px] font-bold text-blue-500">INVOICE</span>
                <span className="text-[7px] font-mono text-slate-500">#4819</span>
              </div>
              <div className="space-y-1 mb-1.5">
                <div className="flex justify-between text-[6px] text-slate-400">
                  <span>SaaS Development</span>
                  <span className="font-bold text-slate-300">$1,500</span>
                </div>
                <div className={`h-0.5 w-full rounded ${darkMode ? 'bg-slate-800/60' : 'bg-slate-200/60'}`} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[6px] text-slate-500">VAT (15%)</span>
                <span className="text-[8px] font-black text-emerald-400">$1,725</span>
              </div>
            </div>
          </div>
        );

      case 'yt-thumbnail-downloader':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="relative w-4/5 aspect-video rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center group shadow-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-indigo-900/40" />
              <div className="bg-red-600 p-2 rounded-full text-white shadow-xl group-hover:scale-110 duration-300 relative z-10">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span className="absolute bottom-1 right-2 text-[6px] font-mono text-slate-400 bg-slate-900/80 px-1 rounded">10:42</span>
            </div>
          </div>
        );

      case 'meta-tags-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2 rounded-xl border w-4/5 text-left shadow-sm ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-100 border-slate-200'}`}>
              <div className="flex items-center gap-1.5 mb-1 text-[8px] font-bold text-cyan-500">
                <Code className="w-3.5 h-3.5" />
                <span>SEO Tags</span>
              </div>
              <div className="font-mono text-[6.5px] text-slate-500 space-y-0.5">
                <div>&lt;<span className="text-purple-400">meta</span> <span className="text-amber-400">name</span>=<span className="text-emerald-400">"title"</span> .../&gt;</div>
                <div>&lt;<span className="text-purple-400">meta</span> <span className="text-amber-400">name</span>=<span className="text-emerald-400">"desc"</span> .../&gt;</div>
              </div>
            </div>
          </div>
        );

      case 'random-name-generator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full px-4">
            <div className="flex flex-wrap gap-1 justify-center max-w-[150px]">
              <span className="px-2 py-0.5 text-[8px] font-extrabold rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">Apex</span>
              <span className="px-2 py-0.5 text-[8px] font-extrabold rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">SaaSify</span>
              <span className="px-2 py-0.5 text-[8px] font-extrabold rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">Vortex</span>
            </div>
          </div>
        );

      case 'mortgage-calculator':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className={`p-2 rounded-xl border flex items-center gap-3 w-4/5 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <Coins className="w-8 h-8 text-cyan-400" />
              <div className="space-y-1 text-left">
                <div className={`h-2.5 w-16 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                <div className="text-[9px] font-bold text-cyan-400 font-mono">$2,400/mo</div>
              </div>
            </div>
          </div>
        );

      default: {
        const tool = tools.find(t => t.id === toolId);
        const category = tool ? tool.category : '';
        switch (category) {
          case 'pdf-tools':
            return <CategoryPDFIllustration darkMode={darkMode} />;
          case 'image-tools':
            return <CategoryImageIllustration darkMode={darkMode} />;
          case 'text-tools':
            return <CategoryTextIllustration darkMode={darkMode} />;
          case 'developer-tools':
            return <CategoryDeveloperIllustration darkMode={darkMode} />;
          case 'security-tools':
            return <CategorySecurityIllustration darkMode={darkMode} />;
          case 'calculators':
            return <CategoryCalculatorsIllustration darkMode={darkMode} />;
          case 'converters':
            return <CategoryConvertersIllustration darkMode={darkMode} />;
          case 'generators':
            return <CategoryGeneratorsIllustration darkMode={darkMode} />;
          case 'ai-tools':
            return <CategoryAIIllustration darkMode={darkMode} />;
          default:
            return <CategoryGeneratorsIllustration darkMode={darkMode} />;
        }
      }
    }
  };

  return (
    <div className="w-full h-24 bg-gradient-to-tr from-blue-600/5 via-slate-900/40 to-indigo-600/5 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center border border-slate-800/10 group-hover:border-blue-500/20 transition-all duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04),transparent_70%)]" />
      {getIllustration()}
    </div>
  );
}
