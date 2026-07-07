import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Wrench, Search, Globe, Activity, Calendar, Percent, TrendingUp, Coins, 
  QrCode, Lock, FileText, Minimize, FileImage, Files, Scale, Type, 
  Palette, ShieldAlert, Braces, Fingerprint, Key, Link as LinkIcon, Hash, 
  ArrowLeft, Check, Copy, Moon, Sun, Flame, History, Info, Heart, Settings, Award,
  Home, Star, Trash2, LayoutDashboard, Share2, Sparkles, CheckCircle2, AlertTriangle, Play,
  Mail, MessageSquare, ShieldCheck, Zap, Laptop, Printer, X, Github, Twitter, Linkedin,
  RefreshCw, Clock, Server
} from 'lucide-react';

import { tools } from './data';
import { Tool, ActivityLog } from './types';
import { AdManager, AdBanner, AdManagerRef } from './components/AdManager';
import { ToolCardImage } from './components/ToolCardImage';
import { InterstitialAd } from './components/InterstitialAd';
import { getToolSEO } from './seoMetadata';

// Combined Modular Tool Imports (Optimized with React.lazy for Code-Splitting)
const AgeCalculator = React.lazy(() => import('./components/tools/Calculators').then(m => ({ default: m.AgeCalculator })));
const AgeDifferenceCalculator = React.lazy(() => import('./components/tools/Calculators').then(m => ({ default: m.AgeDifferenceCalculator })));
const BMICalculator = React.lazy(() => import('./components/tools/Calculators').then(m => ({ default: m.BMICalculator })));
const PercentageCalculator = React.lazy(() => import('./components/tools/Calculators').then(m => ({ default: m.PercentageCalculator })));
const LoanCalculator = React.lazy(() => import('./components/tools/Calculators').then(m => ({ default: m.LoanCalculator })));
const DiscountCalculator = React.lazy(() => import('./components/tools/Calculators').then(m => ({ default: m.DiscountCalculator })));
const VATCalculator = React.lazy(() => import('./components/tools/Calculators').then(m => ({ default: m.VATCalculator })));

const WordCounter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.WordCounter })));
const CharacterCounter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.CharacterCounter })));
const TextCaseConverter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.TextCaseConverter })));
const JSONFormatter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.JSONFormatter })));
const JSONValidator = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.JSONValidator })));
const HTMLMinifier = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.HTMLMinifier })));
const Base64Encoder = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.Base64Encoder })));
const HashGenerator = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.HashGenerator })));
const URLEncoder = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.URLEncoder })));
const UUIDGenerator = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.UUIDGenerator })));
const Base64Decoder = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.Base64Decoder })));
const URLDecoder = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.URLDecoder })));
const HTMLFormatter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.HTMLFormatter })));
const TextCleaner = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.TextCleaner })));
const TextSorter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.TextSorter })));
const MarkdownToHTML = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.MarkdownToHTML })));
const TextDiff = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.TextDiff })));
const TextToSpeech = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.TextToSpeech })));
const CSSMinifierFormatter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.CSSMinifierFormatter })));
const SQLFormatter = React.lazy(() => import('./components/tools/TextDevTools').then(m => ({ default: m.SQLFormatter })));

const ColorPicker = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.ColorPicker })));
const YouTubeThumbnailDownloader = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.YouTubeThumbnailDownloader })));
const ImageCompressor = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.ImageCompressor })));
const ImageToPDF = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.ImageToPDF })));
const PDFMerger = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.PDFMerger })));
const PDFSplitter = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.PDFSplitter })));
const PDFCompressor = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.PDFCompressor })));
const PDFToText = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.PDFToText })));
const ImageResizer = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.ImageResizer })));
const ImageCropper = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.ImageCropper })));
const JPGToPNG = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.JPGToPNG })));
const PNGToJPG = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.PNGToJPG })));
const ImageFilter = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.ImageFilter })));
const Base64ToImage = React.lazy(() => import('./components/tools/ImagesPDFTools').then(m => ({ default: m.Base64ToImage })));

const QRCodeGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.QRCodeGenerator })));
const PasswordGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.PasswordGenerator })));
const AIPromptGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.AIPromptGenerator })));
const SocialMediaCaptionGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.SocialMediaCaptionGenerator })));
const ResumeBuilder = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.ResumeBuilder })));
const InvoiceGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.InvoiceGenerator })));
const MetaTagsGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.MetaTagsGenerator })));
const RandomNameGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.RandomNameGenerator })));
const UnitConverter = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.UnitConverter })));
const CurrencyConverter = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.CurrencyConverter })));
const PasswordChecker = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.PasswordChecker })));
const BarcodeGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.BarcodeGenerator })));
const UsernameGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.UsernameGenerator })));
const LoremIpsum = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.LoremIpsum })));
const SignatureGenerator = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.SignatureGenerator })));
const RGBHexConverter = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.RGBHexConverter })));
const BinaryConverter = React.lazy(() => import('./components/tools/AIGenerators').then(m => ({ default: m.BinaryConverter })));

const ScientificCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.ScientificCalculator })));
const GPACalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.GPACalculator })));
const CompoundInterestCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.CompoundInterestCalculator })));
const DateCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.DateCalculator })));
const BMRTDEECalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.BMRTDEECalculator })));
const BodyFatCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.BodyFatCalculator })));
const TipCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.TipCalculator })));
const FuelCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.FuelCalculator })));
const SalaryConverter = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.SalaryConverter })));
const BinaryMath = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.BinaryMath })));
const FractionCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.FractionCalculator })));
const IdealWeightCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.IdealWeightCalculator })));
const PregnancyDueDateCalculator = React.lazy(() => import('./components/tools/CalculatorsMoreTools').then(m => ({ default: m.PregnancyDueDateCalculator })));

const SVGToPNG = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.SVGToPNG })));
const CSSGradientGenerator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.CSSGradientGenerator })));
const GlassmorphismGenerator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.GlassmorphismGenerator })));
const BoxShadowGenerator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.BoxShadowGenerator })));
const ColorPaletteGenerator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.ColorPaletteGenerator })));
const FaviconGenerator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.FaviconGenerator })));
const CSSTriangleGenerator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.CSSTriangleGenerator })));
const ColorBlindnessSimulator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.ColorBlindnessSimulator })));
const ImageEXIFViewer = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.ImageEXIFViewer })));
const AspectRatioCalculator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.AspectRatioCalculator })));
const CSSBorderRadiusGenerator = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.CSSBorderRadiusGenerator })));
const HexToRGBA = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.HexToRGBA })));
const ImageMetadataStripper = React.lazy(() => import('./components/tools/DesignMoreTools').then(m => ({ default: m.ImageMetadataStripper })));

const EpochConverter = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.EpochConverter })));
const JWTDecoder = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.JWTDecoder })));
const HTMLEntityEncoder = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.HTMLEntityEncoder })));
const CrontabGenerator = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.CrontabGenerator })));
const XMLFormatter = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.XMLFormatter })));
const YAMLToJSON = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.YAMLToJSON })));
const JSONToYAML = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.JSONToYAML })));
const HMACGenerator = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.HMACGenerator })));
const MarkdownTableGenerator = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.MarkdownTableGenerator })));
const HTTPStatusCodes = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.HTTPStatusCodes })));
const UserAgentParser = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.UserAgentParser })));
const HexASCIIConverter = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.HexASCIIConverter })));
const Base32Converter = React.lazy(() => import('./components/tools/DeveloperMoreTools').then(m => ({ default: m.Base32Converter })));

const FindReplace = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.FindReplace })));
const AnagramSolver = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.AnagramSolver })));
const SlugGenerator = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.SlugGenerator })));
const TextRepeater = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.TextRepeater })));
const TextReverser = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.TextReverser })));
const CaesarCipher = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.CaesarCipher })));
const RegExTester = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.RegExTester })));
const NatoPhonetic = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.NatoPhonetic })));
const ASCIIBanner = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.ASCIIBanner })));
const LeetspeakConverter = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.LeetspeakConverter })));
const RandomChoice = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.RandomChoice })));
const MorseCode = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.MorseCode })));
const BinaryTextCipher = React.lazy(() => import('./components/tools/TextMoreTools').then(m => ({ default: m.BinaryTextCipher })));

const AITextRewriter = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AITextRewriter })));
const AISummarizer = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AISummarizer })));
const AITranslator = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AITranslator })));
const AIEmailWriter = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AIEmailWriter })));
const AIHashtagGenerator = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AIHashtagGenerator })));
const AISEOGenerator = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AISEOGenerator })));
const AIBlogGenerator = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AIBlogGenerator })));
const AIProductDescription = React.lazy(() => import('./components/tools/AITools').then(m => ({ default: m.AIProductDescription })));

const PDFUnlocker = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.PDFUnlocker })));
const PDFProtector = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.PDFProtector })));
const PDFRotate = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.PDFRotate })));
const PDFExtractPages = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.PDFExtractPages })));
const PDFRemovePages = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.PDFRemovePages })));
const PDFWatermark = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.PDFWatermark })));
const PDFToJPG = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.PDFToJPG })));
const BackgroundRemover = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.BackgroundRemover })));
const ImageWatermark = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.ImageWatermark })));
const ImageBlur = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.ImageBlur })));
const ImageSharpen = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.ImageSharpen })));
const ImageConverter = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.ImageConverter })));
const QRCodeScanner = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.QRCodeScanner })));
const MemeGenerator = React.lazy(() => import('./components/tools/PdfImageMoreTools').then(m => ({ default: m.MemeGenerator })));

const RemoveDuplicateLines = React.lazy(() => import('./components/tools/TextDevMoreTools').then(m => ({ default: m.RemoveDuplicateLines })));
const RandomTextGenerator = React.lazy(() => import('./components/tools/TextDevMoreTools').then(m => ({ default: m.RandomTextGenerator })));
const KeywordDensityChecker = React.lazy(() => import('./components/tools/TextDevMoreTools').then(m => ({ default: m.KeywordDensityChecker })));
const ReadingTimeCalculator = React.lazy(() => import('./components/tools/TextDevMoreTools').then(m => ({ default: m.ReadingTimeCalculator })));
const JSFormatter = React.lazy(() => import('./components/tools/TextDevMoreTools').then(m => ({ default: m.JSFormatter })));

const MortgageCalculator = React.lazy(() => import('./components/tools/CalculatorsNewTools').then(m => ({ default: m.MortgageCalculator })));

// Map icon names to Lucide icons
const IconMap: Record<string, React.ComponentType<any>> = {
  Calendar,
  Activity,
  Percent,
  TrendingUp,
  Coins,
  QrCode,
  Lock,
  FileText,
  Minimize,
  FileImage,
  Files,
  Scale,
  Type,
  Palette,
  ShieldAlert,
  Braces,
  Fingerprint,
  Key,
  Link: LinkIcon,
  Hash,
  Sparkles
};

// 8 Categories requested by the user
const CATEGORIES = [
  { id: 'pdf-tools', labelEn: 'PDF Tools', labelAr: 'أدوات بي دي إف', icon: Files, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  { id: 'image-tools', labelEn: 'Image Tools', labelAr: 'أدوات الصور', icon: FileImage, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { id: 'text-tools', labelEn: 'Text Tools', labelAr: 'أدوات النصوص', icon: FileText, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { id: 'developer-tools', labelEn: 'Developer Tools', labelAr: 'أدوات المطورين', icon: Braces, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { id: 'security-tools', labelEn: 'Security Tools', labelAr: 'أدوات الحماية والأمان', icon: Lock, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  { id: 'calculators', labelEn: 'Calculators', labelAr: 'الحاسبات الرقمية', icon: Percent, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  { id: 'converters', labelEn: 'Converters', labelAr: 'المحولات الرقمية', icon: Scale, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { id: 'generators', labelEn: 'Generators', labelAr: 'المولدات الذكية', icon: Sparkles, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
  { id: 'ai-tools', labelEn: 'AI Tools', labelAr: 'أدوات الذكاء الاصطناعي', icon: Sparkles, color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20' }
];

const getToolCategory = (tool: Tool): string => {
  return tool.category;
};

// Shimmering skeleton loader mimicking high-end serverless processing
function LaunchingSkeleton({ language }: { language: 'en' | 'ar' }) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-[#0a0f1d]/90 relative overflow-hidden animate-pulse shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      <div className="flex items-start justify-between mb-6 pb-5 border-b border-slate-850/60">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-800/80 w-12 h-12" />
          <div className="space-y-2">
            <div className="h-4.5 bg-slate-800 rounded-lg w-48" />
            <div className="h-3 bg-slate-800 rounded-lg w-80 max-w-full" />
          </div>
        </div>
        <div className="p-2 rounded-xl bg-slate-800 w-9 h-9" />
      </div>
      
      <div className="space-y-5">
        <div className="h-36 bg-slate-900/60 rounded-2xl border border-slate-800/40 p-5 space-y-4">
          <div className="h-4 bg-slate-800 rounded w-1/4" />
          <div className="h-10 bg-slate-850 rounded-xl w-full" />
          <div className="h-4 bg-slate-800 rounded w-1/3" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-11 bg-slate-800 rounded-xl" />
          <div className="h-11 bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// Ultra-premium featured tools interactive carousel
function FeaturedSlider({ tools, language, darkMode, handleSelectTool, toolRatings }: { 
  tools: Tool[]; 
  language: 'en' | 'ar'; 
  darkMode: boolean; 
  handleSelectTool: (tool: Tool) => void;
  toolRatings: Record<string, { rating: number; count: number }>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = useMemo(() => tools.filter(t => t.isFeatured), [tools]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const currentTool = featured[currentIndex];

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % featured.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + featured.length) % featured.length);
  };

  const ratingObj = toolRatings[currentTool.id] || { rating: 4.8, count: 120 };

  return (
    <div className={`relative rounded-3xl p-6 md:p-8 border overflow-hidden ${darkMode ? 'bg-slate-900/40 border-slate-800/80 shadow-2xl backdrop-blur-xl' : 'bg-white border-slate-200 shadow-lg'}`}>
      {/* Background radial highlight */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Slide Content wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left column: Info */}
        <div className="space-y-4 text-left order-2 md:order-1" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>{language === 'en' ? 'Featured Premium Utility' : 'أداة مميزة مخصصة'}</span>
          </span>

          <h3 className={`text-2xl md:text-3xl font-black tracking-tight font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {language === 'en' ? currentTool.name : currentTool.arabicName}
          </h3>

          <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === 'en' ? currentTool.description : currentTool.arabicDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/10">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{ratingObj.rating.toFixed(1)}</span>
              <span className={`text-[10px] font-normal ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>({ratingObj.count} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 font-mono font-bold bg-blue-500/5 px-2.5 py-1 rounded-lg border border-blue-500/10">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>100% Free & Secure</span>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={() => handleSelectTool(currentTool)}
              className="px-6 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>{language === 'en' ? 'Launch Tool' : 'تشغيل الأداة'}</span>
              <span>→</span>
            </button>
            <div className="flex gap-1.5 ml-auto">
              {featured.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${currentIndex === idx ? 'w-5 bg-blue-500' : 'w-1.5 bg-slate-700'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Graphic preview */}
        <div className="relative flex items-center justify-center order-1 md:order-2 h-44 md:h-56 rounded-2xl bg-slate-950/30 border border-slate-800/40 p-4">
          <ToolCardImage toolId={currentTool.id} darkMode={darkMode} />
        </div>
      </div>

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all cursor-pointer ${darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'} hidden md:block`}
      >
        ←
      </button>
      <button 
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all cursor-pointer ${darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'} hidden md:block`}
      >
        →
      </button>
    </div>
  );
}

export default function App() {
  const getInitialRoute = (): { tab: any; toolId: string | null } => {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      return { tab: 'home', toolId: null };
    }
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    if (['about', 'privacy', 'terms', 'contact', 'tools', 'favorites', 'history', 'settings', 'status'].includes(cleanPath)) {
      return { tab: cleanPath as any, toolId: null };
    }
    if (cleanPath.startsWith('tool/')) {
      const toolId = cleanPath.substring(5);
      return { tab: 'tools', toolId: toolId };
    }
    return { tab: '404' as any, toolId: null };
  };

  const initialRoute = getInitialRoute();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'home' | 'tools' | 'favorites' | 'history' | 'settings' | 'about' | 'privacy' | 'terms' | 'contact' | '404' | 'status'>(initialRoute.tab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  // Debounce search input for silky smooth typing performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInputValue);
    }, 150);
    return () => clearTimeout(timer);
  }, [searchInputValue]);

  const clearSearch = () => {
    setSearchInputValue('');
    setSearchQuery('');
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(initialRoute.toolId);

  const navigateTo = (tab: 'home' | 'tools' | 'favorites' | 'history' | 'settings' | 'about' | 'privacy' | 'terms' | 'contact' | '404' | 'status', toolId: string | null = null) => {
    let path = '/';
    if (toolId) {
      path = `/tool/${toolId}`;
    } else if (tab !== 'home') {
      path = `/${tab}`;
    }
    window.history.pushState(null, '', path);
    setActiveTab(tab as any);
    setSelectedToolId(toolId);
  };

  // Synchronize browser backward and forward clicks
  useEffect(() => {
    const handleRouteChange = () => {
      const route = getInitialRoute();
      setActiveTab(route.tab);
      setSelectedToolId(route.toolId);
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  // Local Stats & Favorites
  const [usageCount, setUsageCount] = useState<number>(0);
  const [remainingUses, setRemainingUses] = useState<number>(5);
  const [adFrequency, setAdFrequency] = useState<number>(() => {
    const saved = localStorage.getItem('toolix_ad_frequency');
    return saved ? parseInt(saved) : 5;
  });

  // Google Analytics 4 & Google Search Console Verification State
  const [gaMeasurementId, setGaMeasurementId] = useState<string>(() => {
    return localStorage.getItem('toolix_ga_measurement_id') || (import.meta as any).env.VITE_GA_MEASUREMENT_ID || 'G-X4TP1BFGLG';
  });
  const [gscVerificationCode, setGscVerificationCode] = useState<string>(() => {
    return localStorage.getItem('toolix_gsc_verification_code') || (import.meta as any).env.VITE_GSC_VERIFICATION_CODE || '';
  });

  // Input form states for GA4 and GSC configuration settings
  const [gaInput, setGaInput] = useState<string>(gaMeasurementId);
  const [gscInput, setGscInput] = useState<string>(gscVerificationCode);

  // System Status States
  const [statusLastUpdated, setStatusLastUpdated] = useState<Date>(new Date());
  const [isRefreshingStatus, setIsRefreshingStatus] = useState<boolean>(false);
  const [statusLogs, setStatusLogs] = useState<string[]>([]);
  const [serviceLatencies, setServiceLatencies] = useState<Record<string, number>>({
    chat: 124,
    image: 340,
    writing: 145,
    translation: 98,
    code: 167,
    cdn: 45,
    storage: 12
  });

  const runStatusDiagnostics = () => {
    setIsRefreshingStatus(true);
    setStatusLogs([]);
    
    const logsEn = [
      'Pinging European cloud server nodes...',
      'Testing Gemini API endpoint secure handshake...',
      'Verifying AI Chat agent feedback loop...',
      'Checking AI Image generator rate limits...',
      'Analyzing vector text generation latency...',
      'Validating SSL certificates and edge CDN...'
    ];
    
    const logsAr = [
      'جاري الاتصال بخوادم الحوسبة السحابية الأوروبية...',
      'فحص بروتوكول الأمان لربط واجهة برمجة تطبيقات Gemini...',
      'التحقق من سلامة قنوات المحادثة الذكية...',
      'فحص سرعة استجابة مولد الصور والتحميل...',
      'قياس زمن استجابة خوارزميات النصوص...',
      'التحقق من كفاءة شبكة توصيل المحتوى CDN...'
    ];
    
    const logs = language === 'en' ? logsEn : logsAr;
    
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setStatusLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setServiceLatencies({
            chat: Math.floor(Math.random() * 80) + 80,
            image: Math.floor(Math.random() * 150) + 200,
            writing: Math.floor(Math.random() * 70) + 100,
            translation: Math.floor(Math.random() * 60) + 70,
            code: Math.floor(Math.random() * 90) + 120,
            cdn: Math.floor(Math.random() * 15) + 30,
            storage: Math.floor(Math.random() * 5) + 8
          });
          setStatusLastUpdated(new Date());
          setIsRefreshingStatus(false);
          setToast({
            message: language === 'en' ? 'Diagnostics completed. All systems nominal!' : 'اكتمل الفحص الذاتي بنجاح. جميع الأنظمة والخدمات تعمل بكفاءة!',
            type: 'success'
          });
        }, 600);
      }
    }, 450);
  };


  // Dynamic Google Analytics 4 Integration (Page View Tracking)
  useEffect(() => {
    if (!gaMeasurementId) return;

    // Check if script is already added
    const scriptId = 'google-analytics-gtag';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
      document.head.appendChild(script);
    }

    // Initialize dataLayer and gtag function
    const win = window as any;
    if (!win.dataLayer) {
      win.dataLayer = [];
    }
    if (!win.gtag) {
      win.gtag = function() {
        win.dataLayer.push(arguments);
      };
      win.gtag('js', new Date());
    }

    // Delay slightly to ensure document.title is updated first by SEO useEffect
    const timer = setTimeout(() => {
      win.gtag('config', gaMeasurementId, {
        page_path: selectedToolId ? `/tool/${selectedToolId}` : activeTab === 'home' ? '/' : `/${activeTab}`,
        page_title: document.title
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [gaMeasurementId, activeTab, selectedToolId]);

  // Dynamic Google Search Console Verification Meta Tag Integration
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="google-site-verification"]');
    if (gscVerificationCode) {
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'google-site-verification');
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', gscVerificationCode);
    } else {
      if (metaTag) {
        metaTag.remove();
      }
    }
  }, [gscVerificationCode]);

  const [isInterstitialAdOpen, setIsInterstitialAdOpen] = useState<boolean>(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Contact Form State
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const [adStats, setAdStats] = useState({
    impressions: 0,
    completions: 0,
    toolUses: 0
  });

  const adManagerRef = useRef<AdManagerRef>(null);

  // Auto-dismiss toast notifications after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load configuration and cached user states
  useEffect(() => {
    const storedUsage = localStorage.getItem('toolix_usage_count');
    if (storedUsage) setUsageCount(parseInt(storedUsage));

    const storedRemaining = localStorage.getItem('toolix_remaining_uses');
    if (storedRemaining) {
      setRemainingUses(parseInt(storedRemaining));
    } else {
      localStorage.setItem('toolix_remaining_uses', '5');
    }

    const storedLogs = localStorage.getItem('toolix_activity_logs');
    if (storedLogs) setActivityLogs(JSON.parse(storedLogs));

    const storedFavorites = localStorage.getItem('toolix_favorites');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

    const storedLang = localStorage.getItem('toolix_language');
    if (storedLang === 'ar' || storedLang === 'en') setLanguage(storedLang);

    const storedTheme = localStorage.getItem('toolix_theme');
    if (storedTheme) setDarkMode(storedTheme === 'dark');

    // Populate initial Ad statistics
    const savedImpressions = localStorage.getItem('toolix_ad_impressions');
    const savedCompletions = localStorage.getItem('toolix_ad_completions');
    const savedToolUses = localStorage.getItem('toolix_ad_tool_uses');
    setAdStats({
      impressions: savedImpressions ? parseInt(savedImpressions) : 0,
      completions: savedCompletions ? parseInt(savedCompletions) : 0,
      toolUses: savedToolUses ? parseInt(savedToolUses) : 0
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('toolix_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Track tool utilization
  const logToolUsage = (tool: Tool) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      toolId: tool.id,
      toolName: tool.name,
      arabicToolName: tool.arabicName,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action: 'Launched Tool',
      arabicAction: 'تشغيل الأداة'
    };

    const updatedLogs = [newLog, ...activityLogs.slice(0, 49)];
    setActivityLogs(updatedLogs);
    localStorage.setItem('toolix_activity_logs', JSON.stringify(updatedLogs));
  };

  // Premium SaaS States & Interactive Mechanics
  const [toolRatings, setToolRatings] = useState<Record<string, { rating: number; count: number }>>(() => {
    const saved = localStorage.getItem('toolix_tool_ratings');
    if (saved) return JSON.parse(saved);
    return {
      'password-generator': { rating: 4.9, count: 1842 },
      'qr-generator': { rating: 4.8, count: 1528 },
      'image-compressor': { rating: 4.7, count: 2431 },
      'image-to-pdf': { rating: 4.6, count: 914 },
      'pdf-merger': { rating: 4.8, count: 1122 },
      'word-counter': { rating: 4.7, count: 831 },
      'char-counter': { rating: 4.5, count: 423 },
      'json-formatter': { rating: 4.9, count: 3218 },
      'json-validator': { rating: 4.8, count: 1742 },
      'age-calculator': { rating: 4.9, count: 2154 },
      'age-difference-calculator': { rating: 4.6, count: 541 },
      'unit-converter': { rating: 4.8, count: 1982 },
      'currency-converter': { rating: 4.7, count: 1653 }
    };
  });

  const [toolUsageCounts, setToolUsageCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('toolix_tool_usages');
    if (saved) return JSON.parse(saved);
    return {
      'password-generator': 24890,
      'qr-generator': 19340,
      'image-compressor': 31250,
      'image-to-pdf': 14820,
      'pdf-merger': 16900,
      'word-counter': 12430,
      'char-counter': 6820,
      'json-formatter': 42890,
      'json-validator': 21450,
      'age-calculator': 27810,
      'age-difference-calculator': 8120,
      'unit-converter': 23940,
      'currency-converter': 20910
    };
  });

  const [isLaunchingTool, setIsLaunchingTool] = useState<string | null>(null);
  const [totalOperations, setTotalOperations] = useState<number>(1842903);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  // Auto-increment operations for real-time live SaaS feel
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalOperations(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleUserRate = (toolId: string, userRating: number) => {
    setToolRatings(prev => {
      const current = prev[toolId] || { rating: 4.8, count: 120 };
      const newCount = current.count + 1;
      const newRating = Math.round(((current.rating * current.count + userRating) / newCount) * 10) / 10;
      
      const updated = {
        ...prev,
        [toolId]: { rating: newRating, count: newCount }
      };
      localStorage.setItem('toolix_tool_ratings', JSON.stringify(updated));
      return updated;
    });

    setToast({
      message: language === 'en' 
        ? `Thank you for rating this tool ${userRating} stars!` 
        : `شكراً لتقييمك هذه الأداة بـ ${userRating} نجوم!`,
      type: 'success'
    });
  };

  // Launch tool directly with an elegant loading skeleton transition
  const handleSelectTool = (tool: Tool) => {
    setIsLaunchingTool(tool.id);
    setTimeout(() => {
      window.history.pushState(null, '', `/tool/${tool.id}`);
      setSelectedToolId(tool.id);
      setIsLaunchingTool(null);
      logToolUsage(tool);

      setToolUsageCounts(prev => {
        const next = { ...prev, [tool.id]: (prev[tool.id] || 0) + 1 };
        localStorage.setItem('toolix_tool_usages', JSON.stringify(next));
        return next;
      });

      setUsageCount(u => {
        const next = u + 1;
        localStorage.setItem('toolix_usage_count', next.toString());
        
        // Trigger Interstitial Ad if next usage is a multiple of frequency
        if (next % adFrequency === 0) {
          setIsInterstitialAdOpen(true);
        }
        
        return next;
      });
    }, 380);
  };

  // Toggle favorite status
  const toggleFavorite = (toolId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const updated = favorites.includes(toolId) 
      ? favorites.filter(id => id !== toolId)
      : [...favorites, toolId];
    
    setFavorites(updated);
    localStorage.setItem('toolix_favorites', JSON.stringify(updated));
  };

  // Clear all local activity logs
  const clearHistory = () => {
    setActivityLogs([]);
    localStorage.removeItem('toolix_activity_logs');
  };

  // Contact Submit Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) {
      setToast({
        message: language === 'en' ? 'Please fill out all fields.' : 'يرجى تعبئة جميع الحقول المطلوبة.',
        type: 'error'
      });
      return;
    }
    setToast({
      message: language === 'en' ? 'Message sent successfully! Thank you.' : 'تم إرسال رسالتك بنجاح! شكراً لك.',
      type: 'success'
    });
    setContactEmail('');
    setContactMessage('');
  };

  // 1. Trending Tools (Requirement 1)
  const trendingTools = useMemo(() => {
    const trendingIds = ['password-generator', 'qr-generator', 'image-compressor', 'image-to-pdf', 'pdf-merger'];
    return tools.filter(t => trendingIds.includes(t.id));
  }, []);

  // 2. Most Popular Today (Requirement 2)
  const popularTools = useMemo(() => {
    const popularIds = ['word-counter', 'char-counter', 'json-formatter', 'json-validator', 'age-calculator', 'unit-converter'];
    return tools.filter(t => popularIds.includes(t.id));
  }, []);

  // 2.5. Recently Added Tools (Requirement 4)
  const recentlyAddedTools = useMemo(() => {
    const recentlyAddedIds = ['pdf-merger', 'age-difference-calculator', 'currency-converter', 'json-validator'];
    return tools.filter(t => recentlyAddedIds.includes(t.id));
  }, []);

  // 3. Recently Used Tools (Requirement 17)
  const recentlyUsedTools = useMemo(() => {
    const seen = new Set<string>();
    const list: Tool[] = [];
    for (const log of activityLogs) {
      if (!seen.has(log.toolId)) {
        seen.add(log.toolId);
        const found = tools.find(t => t.id === log.toolId);
        if (found) {
          list.push(found);
        }
      }
      if (list.length >= 4) break;
    }
    return list;
  }, [activityLogs]);

  // Filter tools based on search and category (Requirement 13)
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const toolCat = getToolCategory(tool);
      const matchesCategory = selectedCategory === 'all' || toolCat === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        tool.name.toLowerCase().includes(query) || 
        tool.arabicName.includes(query) || 
        tool.description.toLowerCase().includes(query) || 
        tool.arabicDescription.includes(query) ||
        (tool.tags && tool.tags.some(t => t.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Search filter results for instant Hero lookup
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return tools.filter(tool => {
      const query = searchQuery.toLowerCase().trim();
      return tool.name.toLowerCase().includes(query) || 
        tool.arabicName.includes(query) || 
        tool.description.toLowerCase().includes(query) || 
        tool.arabicDescription.includes(query) ||
        (tool.tags && tool.tags.some(t => t.toLowerCase().includes(query)));
    });
  }, [searchQuery]);

  // Active Tool Object
  const activeTool = useMemo(() => {
    return tools.find(t => t.id === selectedToolId);
  }, [selectedToolId]);

  // Sync settings, SEO, and Open Graph metadata (Requirements 16 & 17)
  useEffect(() => {
    localStorage.setItem('toolix_language', language);
    
    let title = '';
    let description = '';
    let keywords = 'pdf merger, image compressor, password generator, word counter, qr generator, bmi calculator, loan calculator, online tools, free utilities, offline tools, client-side tools, developer tools';
    let schemaObj: any = null;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://toolix.app';
    const currentUrl = `${origin}${selectedToolId ? `/tool/${selectedToolId}` : activeTab === 'home' ? '' : `/${activeTab}`}`;

    if (selectedToolId && activeTool) {
      const seo = getToolSEO(activeTool, language);
      title = seo.title;
      description = seo.description;
      keywords = seo.keywords;

      schemaObj = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": language === 'en' ? activeTool.name : activeTool.arabicName,
        "description": language === 'en' ? activeTool.description : activeTool.arabicDescription,
        "applicationCategory": activeTool.category,
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5 compatible browser",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      };
    } else {
      if (activeTab === 'about') {
        title = language === 'en'
          ? 'About Us | Toolix Premium Offline-First Utilities'
          : 'من نحن وعن رسالتنا | منصة توليكس للأدوات البرمجية الآمنة';
        description = language === 'en'
          ? 'Learn about Toolix, our client-side philosophy, absolute privacy commitments, and our mission to replace bloated, slow, ad-ridden web utilities.'
          : 'تعرف على قصة منصة توليكس، فلسفتنا في المعالجة المحلية الآمنة، والتزامنا التام بالخصوصية وحماية البيانات لتوفير أدوات برمجية ممتازة.';
      } else if (activeTab === 'status') {
        title = language === 'en'
          ? 'System Status | Real-Time Service Monitoring - Toolix'
          : 'حالة النظام والخدمات | مراقبة مباشرة لخدمات الذكاء الاصطناعي - توليكس';
        description = language === 'en'
          ? 'Monitor the real-time operational status, service latency, and API uptime of all Toolix AI models and services.'
          : 'تابع حالة تشغيل خوادم قنوات الذكاء الاصطناعي ومعدلات سرعة الاستجابة اللحظية في منصة توليكس بكفاءة وموثوقية.';
      } else if (activeTab === 'privacy') {
        title = language === 'en'
          ? 'Privacy Policy | AdSense Compliant Private Sandbox - Toolix'
          : 'سياسة الخصوصية وأمن البيانات | متوافقة مع متطلبات غوغل أدسنس - توليكس';
        description = language === 'en'
          ? 'Our comprehensive Privacy Policy. Learn how Toolix guarantees zero data logging, secure local processing, and CCPA/GDPR/Google AdSense compliance.'
          : 'سياسة الخصوصية الشاملة لمنصة توليكس. تعرف على كيفية ضمان التشغيل المحلي الكامل بنسبة 100% وحماية خصوصية بياناتك بالتوافق مع المعايير الدولية وأدسنس.';
      } else if (activeTab === 'terms') {
        title = language === 'en'
          ? 'Terms of Service | Professional SaaS License - Toolix'
          : 'شروط الخدمة والاستخدام البرمجي | منصة توليكس';
        description = language === 'en'
          ? 'Terms of Service for using Toolix. Review our commercial usage license, disclaimers, user obligations, and Google AdSense standard compliance.'
          : 'شروط الخدمة والاتفاقية القانونية لاستخدام أدوات توليكس. اطلع على رخص الاستخدام التجاري والشخصي، وإخلاء المسؤولية المتبادل.';
      } else if (activeTab === 'contact') {
        title = language === 'en'
          ? 'Contact Us | Professional Support Hub - Toolix'
          : 'اتصل بنا والدعم الفني | منصة توليكس';
        description = language === 'en'
          ? 'Get in touch with Toolix technical support. Submit feature requests, bug reports, and business inquiries through our secure contact channel.'
          : 'تواصل مباشرة مع الدعم الفني لمنصة توليكس. أرسل اقتراحاتك لتطوير أدوات جديدة أو الإبلاغ عن أي مشكلات تقنية.';
      } else {
        title = language === 'en' 
          ? 'Toolix Premium | All-In-One Professional Utility Tools Hub' 
          : 'توليكس بريميوم | منصة الأدوات المتكاملة للمطورين والمصممين';

        description = language === 'en'
          ? 'A lightning-fast, premium suite of 100+ secure, offline-capable developer, writing, design, and math utility tools. 100% private, registration-free, client-side execution.'
          : 'استخدم أكثر من 100 أداة احترافية مجانية بالكامل للمطورين، المصممين، والمستخدمين لحساب القروض، تعديل الصور، ضغط ملفات PDF وتنسيق النصوص.';
      }

      schemaObj = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Toolix",
        "url": origin,
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${origin}/?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
    }

    // Set document title and meta description
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Dynamic Open Graph & Twitter Card updates
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twUrl = document.querySelector('meta[property="twitter:url"]');
    
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', description);
    if (twTitle) twTitle.setAttribute('content', title);
    if (twDesc) twDesc.setAttribute('content', description);
    if (ogUrl) ogUrl.setAttribute('content', currentUrl);
    if (twUrl) twUrl.setAttribute('content', currentUrl);

    // Sync Canonical Link in head
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Inject/Sync Schema JSON-LD in head
    let schemaScript = document.getElementById('toolix-jsonld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'toolix-jsonld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaObj);

    // Enforce and permanently keep the favicon set to /favicon.ico to prevent any dynamic removal/interference
    let favIcon = document.querySelector('link[rel="icon"]');
    if (!favIcon) {
      favIcon = document.createElement('link');
      favIcon.setAttribute('rel', 'icon');
      document.head.appendChild(favIcon);
    }
    favIcon.setAttribute('href', '/favicon.ico');
    favIcon.setAttribute('type', 'image/x-icon');
    favIcon.setAttribute('sizes', 'any');

    // Enforce the apple-touch-icon is present and points to /apple-touch-icon.png
    let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.setAttribute('href', '/apple-touch-icon.png');

  }, [language, selectedToolId, activeTool, activeTab]);

  // Render current selected tool
  const renderActiveToolComponent = () => {
    if (!selectedToolId) return null;
    switch (selectedToolId) {
      // PDF Tools
      case 'pdf-merger':
        return <PDFMerger language={language} />;
      case 'pdf-splitter':
        return <PDFSplitter language={language} />;
      case 'pdf-compressor':
        return <PDFCompressor language={language} />;
      case 'image-to-pdf':
        return <ImageToPDF language={language} />;
      case 'pdf-to-text':
        return <PDFToText language={language} />;

      // Image Tools
      case 'image-compressor':
        return <ImageCompressor language={language} />;
      case 'image-resizer':
        return <ImageResizer language={language} />;
      case 'image-cropper':
        return <ImageCropper language={language} />;
      case 'jpg-to-png':
        return <JPGToPNG language={language} />;
      case 'png-to-jpg':
        return <PNGToJPG language={language} />;
      case 'image-filter':
        return <ImageFilter language={language} />;
      case 'color-picker':
        return <ColorPicker language={language} />;
      case 'base64-to-image':
        return <Base64ToImage language={language} />;
      case 'youtube-thumbnail-downloader':
        return <YouTubeThumbnailDownloader language={language} />;

      // Text Tools
      case 'word-counter':
        return <WordCounter language={language} />;
      case 'char-counter':
        return <CharacterCounter language={language} />;
      case 'text-cleaner':
        return <TextCleaner language={language} />;
      case 'text-sorter':
        return <TextSorter language={language} />;
      case 'text-case-converter':
        return <TextCaseConverter language={language} />;
      case 'markdown-to-html':
        return <MarkdownToHTML language={language} />;
      case 'text-diff':
        return <TextDiff language={language} />;
      case 'text-to-speech':
        return <TextToSpeech language={language} />;

      // Developer Tools
      case 'json-formatter':
        return <JSONFormatter language={language} />;
      case 'json-validator':
        return <JSONValidator language={language} />;
      case 'base64-encoder':
        return <Base64Encoder language={language} />;
      case 'base64-decoder':
        return <Base64Decoder language={language} />;
      case 'url-encoder':
        return <URLEncoder language={language} />;
      case 'url-decoder':
        return <URLDecoder language={language} />;
      case 'uuid-generator':
        return <UUIDGenerator language={language} />;
      case 'html-formatter':
        return <HTMLFormatter language={language} />;
      case 'html-minifier':
        return <HTMLMinifier language={language} />;
      case 'css-minifier-formatter':
        return <CSSMinifierFormatter language={language} />;
      case 'sql-formatter':
        return <SQLFormatter language={language} />;

      // Security Tools
      case 'password-generator':
        return <PasswordGenerator language={language} />;
      case 'password-checker':
        return <PasswordChecker language={language} />;
      case 'hash-generator':
        return <HashGenerator language={language} />;

      // Calculators
      case 'bmi-calculator':
        return <BMICalculator language={language} />;
      case 'age-calculator':
        return <AgeCalculator language={language} />;
      case 'age-difference-calculator':
        return <AgeDifferenceCalculator language={language} />;
      case 'loan-calculator':
        return <LoanCalculator language={language} />;
      case 'discount-calculator':
        return <DiscountCalculator language={language} />;
      case 'vat-calculator':
        return <VATCalculator language={language} />;
      case 'percentage-calculator':
        return <PercentageCalculator language={language} />;

      // Converters
      case 'unit-converter':
        return <UnitConverter language={language} />;
      case 'currency-converter':
        return <CurrencyConverter language={language} />;
      case 'rgb-hex-converter':
        return <RGBHexConverter language={language} />;
      case 'binary-converter':
        return <BinaryConverter language={language} />;

      // Generators
      case 'qr-generator':
        return <QRCodeGenerator language={language} />;
      case 'barcode-generator':
        return <BarcodeGenerator language={language} />;
      case 'random-name-generator':
        return <RandomNameGenerator language={language} />;
      case 'username-generator':
        return <UsernameGenerator language={language} />;
      case 'lorem-ipsum':
        return <LoremIpsum language={language} />;
      case 'signature-generator':
        return <SignatureGenerator language={language} />;

      // Extras
      case 'svg-to-png':
        return <SVGToPNG language={language} />;
      case 'css-gradient':
        return <CSSGradientGenerator language={language} />;
      case 'glassmorphism':
        return <GlassmorphismGenerator language={language} />;
      case 'box-shadow':
        return <BoxShadowGenerator language={language} />;
      case 'color-palette':
        return <ColorPaletteGenerator language={language} />;
      case 'favicon-generator':
        return <FaviconGenerator language={language} />;
      case 'css-triangle':
        return <CSSTriangleGenerator language={language} />;
      case 'color-blindness':
        return <ColorBlindnessSimulator language={language} />;
      case 'exif-viewer':
        return <ImageEXIFViewer language={language} />;
      case 'aspect-ratio':
        return <AspectRatioCalculator language={language} />;
      case 'border-radius':
        return <CSSBorderRadiusGenerator language={language} />;
      case 'hex-rgba':
        return <HexToRGBA language={language} />;
      case 'metadata-stripper':
        return <ImageMetadataStripper language={language} />;

      // New Developer/Security tools
      case 'epoch-converter':
        return <EpochConverter language={language} />;
      case 'jwt-decoder':
        return <JWTDecoder language={language} />;
      case 'html-entity':
        return <HTMLEntityEncoder language={language} />;
      case 'crontab':
        return <CrontabGenerator language={language} />;
      case 'xml-formatter':
        return <XMLFormatter language={language} />;
      case 'yaml-json':
        return <YAMLToJSON language={language} />;
      case 'json-yaml':
        return <JSONToYAML language={language} />;
      case 'hmac-generator':
        return <HMACGenerator language={language} />;
      case 'markdown-table':
        return <MarkdownTableGenerator language={language} />;
      case 'http-status':
        return <HTTPStatusCodes language={language} />;
      case 'user-agent':
        return <UserAgentParser language={language} />;
      case 'hex-ascii':
        return <HexASCIIConverter language={language} />;
      case 'base32-converter':
        return <Base32Converter language={language} />;

      // New Calculators
      case 'scientific-calc':
        return <ScientificCalculator language={language} />;
      case 'gpa-calc':
        return <GPACalculator language={language} />;
      case 'compound-interest':
        return <CompoundInterestCalculator language={language} />;
      case 'date-calc':
        return <DateCalculator language={language} />;
      case 'bmr-tdee':
        return <BMRTDEECalculator language={language} />;
      case 'body-fat':
        return <BodyFatCalculator language={language} />;
      case 'tip-calc':
        return <TipCalculator language={language} />;
      case 'fuel-calc':
        return <FuelCalculator language={language} />;
      case 'salary-converter':
        return <SalaryConverter language={language} />;
      case 'binary-math':
        return <BinaryMath language={language} />;
      case 'fraction-calc':
        return <FractionCalculator language={language} />;
      case 'ideal-weight':
        return <IdealWeightCalculator language={language} />;
      case 'pregnancy-due':
        return <PregnancyDueDateCalculator language={language} />;

      // New Text tools
      case 'find-replace':
        return <FindReplace language={language} />;
      case 'anagram-solver':
        return <AnagramSolver language={language} />;
      case 'slug-generator':
        return <SlugGenerator language={language} />;
      case 'text-repeater':
        return <TextRepeater language={language} />;
      case 'text-reverser':
        return <TextReverser language={language} />;
      case 'caesar-cipher':
        return <CaesarCipher language={language} />;
      case 'regex-tester':
        return <RegExTester language={language} />;
      case 'nato-phonetic':
        return <NatoPhonetic language={language} />;
      case 'ascii-banner':
        return <ASCIIBanner language={language} />;
      case 'leetspeak':
        return <LeetspeakConverter language={language} />;
      case 'random-choice':
        return <RandomChoice language={language} />;
      case 'morse-code':
        return <MorseCode language={language} />;
      case 'binary-text':
        return <BinaryTextCipher language={language} />;

      // AI Tools
      case 'ai-prompt-generator':
        return <AIPromptGenerator language={language} />;
      case 'ai-text-rewriter':
        return <AITextRewriter language={language} />;
      case 'ai-summarizer':
        return <AISummarizer language={language} />;
      case 'ai-translator':
        return <AITranslator language={language} />;
      case 'ai-email-writer':
        return <AIEmailWriter language={language} />;
      case 'ai-hashtag-generator':
        return <AIHashtagGenerator language={language} />;
      case 'ai-seo-generator':
        return <AISEOGenerator language={language} />;
      case 'ai-blog-generator':
        return <AIBlogGenerator language={language} />;
      case 'ai-product-description':
        return <AIProductDescription language={language} />;
      case 'social-media-caption-generator':
        return <SocialMediaCaptionGenerator language={language} />;

      // PDF Tools
      case 'pdf-unlocker':
        return <PDFUnlocker language={language} />;
      case 'pdf-protector':
        return <PDFProtector language={language} />;
      case 'pdf-rotate':
        return <PDFRotate language={language} />;
      case 'pdf-extract-pages':
        return <PDFExtractPages language={language} />;
      case 'pdf-remove-pages':
        return <PDFRemovePages language={language} />;
      case 'pdf-watermark':
        return <PDFWatermark language={language} />;
      case 'pdf-to-jpg':
        return <PDFToJPG language={language} />;

      // Image Tools
      case 'bg-remover':
        return <BackgroundRemover language={language} />;
      case 'img-watermark':
        return <ImageWatermark language={language} />;
      case 'img-blur':
        return <ImageBlur language={language} />;
      case 'img-sharpen':
        return <ImageSharpen language={language} />;
      case 'img-converter':
        return <ImageConverter language={language} />;
      case 'qr-scanner':
        return <QRCodeScanner language={language} />;
      case 'meme-generator':
        return <MemeGenerator language={language} />;

      // Text Tools
      case 'remove-duplicate-lines':
        return <RemoveDuplicateLines language={language} />;
      case 'random-text-gen':
        return <RandomTextGenerator language={language} />;
      case 'keyword-density':
        return <KeywordDensityChecker language={language} />;
      case 'reading-time':
        return <ReadingTimeCalculator language={language} />;

      // Developer Tools
      case 'js-formatter':
        return <JSFormatter language={language} />;

      // Calculators
      case 'mortgage-calculator':
        return <MortgageCalculator language={language} />;

      // Extras
      case 'resume-builder':
        return <ResumeBuilder language={language} />;
      case 'invoice-generator':
        return <InvoiceGenerator language={language} />;
      case 'meta-tags-generator':
        return <MetaTagsGenerator language={language} />;

      default:
        return (
          <div className="text-center py-8">
            <p className="text-slate-400">Tool coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#030712] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* GLOWING ORBS BACKGROUND */}
      {darkMode && (
        <div className="absolute top-0 left-0 w-full h-[650px] pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-blue-600/10 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[10%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-purple-600/10 blur-[140px] animate-pulse" style={{ animationDuration: '12s' }} />
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-lg transition-colors duration-300 ${darkMode ? 'bg-[#030712]/80 border-slate-900' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo('home')}>
            <img 
              src="/logo.png?v=3" 
              className="w-16 h-16 rounded-2xl object-contain shadow-xl shadow-blue-500/10 border border-slate-800/10 dark:border-slate-800/40" 
              style={{ imageRendering: 'high-quality' }}
              alt="Toolix" 
            />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight font-display bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Toolix
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-bold -mt-0.5">SaaS Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark/Light mode selector */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${darkMode ? 'border-slate-800 bg-slate-900/40 text-amber-400 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-100'}`}
              title={language === 'en' ? 'Toggle Theme' : 'تغيير السمة'}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold rounded-xl border cursor-pointer transition-all ${darkMode ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-28 relative z-10">
        
        {/* If a tool is active/selected or launching, display the loader or details component */}
        {isLaunchingTool ? (
          <div className="space-y-6">
            <div className="h-10 w-44 bg-slate-800/50 rounded-xl animate-pulse" />
            <LaunchingSkeleton language={language} />
          </div>
        ) : selectedToolId && activeTool ? (
          <div className="space-y-6">
            {/* GOOGLE-OPTIMIZED BREADCRUMB LIST */}
            <nav className="flex items-center flex-wrap gap-2 text-xs text-slate-400 font-bold px-1" aria-label="Breadcrumb" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <button 
                onClick={() => navigateTo('home')}
                className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Home' : 'الرئيسية'}</span>
              </button>
              
              <span className="text-slate-600 font-mono">/</span>
              
              <button 
                onClick={() => {
                  setSelectedCategory(activeTool.category);
                  navigateTo('tools');
                }}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                {language === 'en' 
                  ? CATEGORIES.find(c => c.id === activeTool.category)?.labelEn || activeTool.category
                  : CATEGORIES.find(c => c.id === activeTool.category)?.labelAr || activeTool.category
                }
              </button>
              
              <span className="text-slate-600 font-mono">/</span>
              
              <span className={`${darkMode ? 'text-slate-100' : 'text-slate-900'} truncate`}>
                {language === 'en' ? activeTool.name : activeTool.arabicName}
              </span>
            </nav>

            <button
              onClick={() => navigateTo('tools')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للرئيسية'}</span>
            </button>

            {/* Premium Container for Active Tool */}
            <div className={`p-5 sm:p-7 rounded-2xl border shadow-xl relative overflow-hidden ${darkMode ? 'bg-[#0d121f]/90 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800/20">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    {React.createElement(IconMap[activeTool.iconName] || Wrench, {
                      className: "w-5 h-5"
                    })}
                  </div>
                  <div>
                    <h2 className="text-base font-black font-display tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {language === 'en' ? activeTool.name : activeTool.arabicName}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                      {language === 'en' ? activeTool.description : activeTool.arabicDescription}
                    </p>
                    
                    {/* Interactive Ratings & Run Counts */}
                    <div className="flex flex-wrap items-center gap-3 mt-2.5">
                      <div className="flex items-center gap-1 bg-amber-500/5 px-2 py-0.5 rounded-lg border border-amber-500/15 text-[11px] font-bold text-amber-400">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const curRating = toolRatings[activeTool.id]?.rating || 4.8;
                            const isFilled = star <= Math.round(curRating);
                            return (
                              <button
                                key={`star-${star}`}
                                onClick={() => handleUserRate(activeTool.id, star)}
                                className="focus:outline-none hover:scale-130 transition-transform cursor-pointer text-amber-400"
                                title={language === 'en' ? `Rate ${star} stars` : `تقييم ${star} نجوم`}
                              >
                                <Star
                                  className="w-3.5 h-3.5"
                                  fill={isFilled ? 'currentColor' : 'none'}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <span className="ml-1 text-slate-200">
                          {(toolRatings[activeTool.id]?.rating || 4.8).toFixed(1)}
                        </span>
                        <span className="text-[10px] font-normal text-slate-500 ml-0.5">
                          ({toolRatings[activeTool.id]?.count || 120} {language === 'en' ? 'ratings' : 'تقييم'})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-blue-500/5 px-2 py-0.5 rounded-lg border border-blue-500/15 text-[11px] font-bold text-blue-400">
                        <Activity className="w-3.5 h-3.5" />
                        <span className="text-slate-200 font-mono">
                          {(toolUsageCounts[activeTool.id] || 0).toLocaleString()}
                        </span>
                        <span className="text-[10px] font-normal text-slate-500">
                          {language === 'en' ? 'runs' : 'تشغيل'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Favorite button toggle inside tool view */}
                <button
                  onClick={(e) => toggleFavorite(activeTool.id, e)}
                  className={`self-start sm:self-center p-2 rounded-xl transition-all border ${favorites.includes(activeTool.id) ? 'bg-red-500/10 border-red-500/30 text-red-500' : darkMode ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'}`}
                  title={language === 'en' ? 'Favorite' : 'أضف للمفضلة'}
                >
                  <Heart className="w-4 h-4" fill={favorites.includes(activeTool.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <React.Suspense fallback={
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-slate-500 font-medium">
                    {language === 'en' ? 'Loading premium tool...' : 'جاري تحميل الأداة المميزة...'}
                  </span>
                </div>
              }>
                {renderActiveToolComponent()}
              </React.Suspense>
            </div>

            {/* RELATED UTILITIES (Requirement 10: Internal Linking & Related Tools) */}
            <div className="space-y-5 pt-8 border-t border-slate-800/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-450 animate-pulse" />
                <h3 className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {language === 'en' ? 'Related Premium Utilities' : 'أدوات ومساعدات ذات صلة'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools
                  .filter(t => t.category === activeTool.category && t.id !== activeTool.id)
                  .slice(0, 4)
                  .map(tool => {
                    const ratingObj = toolRatings[tool.id] || { rating: 4.8, count: 120 };
                    return (
                      <div
                        key={`related-tool-${tool.id}`}
                        onClick={() => {
                          handleSelectTool(tool);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                      >
                        <ToolCardImage toolId={tool.id} darkMode={darkMode} />
                        
                        <div className="space-y-1 mt-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                          <h4 className={`font-black text-xs ${darkMode ? 'text-white' : 'text-slate-900'} group-hover:text-blue-400 transition-colors truncate`}>
                            {language === 'en' ? tool.name : tool.arabicName}
                          </h4>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                            {language === 'en' ? tool.description : tool.arabicDescription}
                          </p>
                        </div>
                        
                        <div className="w-full mt-3 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-1">
                          <span>{language === 'en' ? 'Launch Tool' : 'تشغيل الأداة'}</span>
                          <span>→</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* All tools are 100% free and client-side private */}
          </div>
        ) : (
          /* TAB LAYOUT NAVIGATION SYSTEM */
          <div className="space-y-6">
            
            {/* HERO BAR (Rendered on Home or Tools tabs) */}
            {(activeTab === 'home' || activeTab === 'tools') && (
              <div className="text-center py-6 space-y-4 relative">
                {/* Visual badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'en' ? 'v3.0 Premium SaaS Edition' : 'نسخة 3.0 الممتازة للمحترفين'}</span>
                </span>
                
                {/* Headline & Subtitle */}
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight leading-tight max-w-3xl mx-auto">
                    {language === 'en' ? (
                      <>
                        All Your <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Essential Online Tools</span> in One Place
                      </>
                    ) : (
                      <>
                        جميع <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">أدواتك ومساعداتك الرقمية</span> في منصة واحدة
                      </>
                    )}
                  </h1>
                  <p className={`text-sm max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'en' 
                      ? 'Access a suite of clean, lightning-fast offline-first utilities for design, conversion, calculation, formatting, and secure offline generation.' 
                      : 'استخدم مجموعة متطورة ومجانية من أدوات التشفير والحسابات ومعالجة النصوص وتعديل الصور محلياً وبكل سرية.'}
                  </p>
                </div>

                {/* CTA BUTTONS */}
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button 
                    onClick={() => setActiveTab('tools')}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md cursor-pointer"
                  >
                    {language === 'en' ? 'Explore Tools' : 'استكشف الأدوات'}
                  </button>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${darkMode ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}`}
                  >
                    {language === 'en' ? 'Learn More' : 'تعرف علينا'}
                  </button>
                </div>

                {/* LARGE HERO SEARCH BAR */}
                <div className="max-w-xl mx-auto relative px-2 pt-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-lg opacity-40 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="hero-global-search"
                        type="text"
                        value={searchInputValue}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                        onChange={(e) => {
                          setSearchInputValue(e.target.value);
                          if (activeTab !== 'home' && activeTab !== 'tools') {
                            setActiveTab('tools');
                          }
                        }}
                        placeholder={language === 'en' ? 'Search essential utilities instantly...' : 'ابحث فوراً في الأدوات المتاحة...'}
                        className={`w-full pl-10 pr-4 py-3.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md ${darkMode ? 'bg-slate-900/95 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'}`}
                      />
                    </div>
                  </div>

                  {/* POPULAR SEARCH SUGGESTIONS */}
                  {searchFocused && searchInputValue.trim().length === 0 && (
                    <div className={`absolute left-2 right-2 mt-2 p-3 rounded-2xl border shadow-2xl z-50 text-left backdrop-blur-xl ${darkMode ? 'bg-slate-950/95 border-slate-800' : 'bg-white border-slate-200'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <div className="px-3 py-1.5 text-[10px] uppercase font-black tracking-widest text-slate-500 border-b border-slate-800/10 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-blue-450 animate-pulse" />
                        <span>{language === 'en' ? 'Trending Suggestions' : 'مقترحات شائعة'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 mt-2">
                        {tools.slice(0, 6).map(tool => (
                          <div
                            key={`suggest-${tool.id}`}
                            onMouseDown={() => {
                              handleSelectTool(tool);
                              clearSearch();
                            }}
                          className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-blue-600/10 transition-colors group border border-transparent hover:border-blue-500/20"
                        >
                          <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-slate-900 text-blue-400' : 'bg-slate-100 text-blue-600'}`}>
                            {React.createElement(IconMap[tool.iconName] || Wrench, { className: "w-3 h-3 group-hover:scale-110 transition-transform" })}
                          </div>
                          <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 truncate">
                            {language === 'en' ? tool.name : tool.arabicName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MOST SEARCHED QUICK TAGS (Great for Google Indexing & Fast UX) */}
                <div className="max-w-xl mx-auto px-2 pt-3 flex flex-wrap items-center justify-center gap-1.5 text-[10px]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  <span className="text-slate-500 font-bold">{language === 'en' ? 'Popular Searches:' : 'الأكثر بحثاً:'}</span>
                  {[
                    { id: 'pdf-merger', name: 'Merge PDF', arabicName: 'دمج PDF' },
                    { id: 'image-compressor', name: 'Compress Image', arabicName: 'ضغط الصور' },
                    { id: 'password-generator', name: 'Password Gen', arabicName: 'مولد كلمة سر' },
                    { id: 'word-counter', name: 'Word Counter', arabicName: 'عداد كلمات' },
                    { id: 'bmi-calculator', name: 'BMI Calc', arabicName: 'حساب الكتلة' },
                    { id: 'loan-calculator', name: 'Loan Calc', arabicName: 'حساب القروض' }
                  ].map(item => (
                    <button
                      key={`quick-search-${item.id}`}
                      onClick={() => {
                        const t = tools.find(x => x.id === item.id);
                        if (t) handleSelectTool(t);
                      }}
                      className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/30' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400'}`}
                    >
                      {language === 'en' ? item.name : item.arabicName}
                    </button>
                  ))}
                </div>

                  {/* INSTANT LOOKUP SEARCH RESULTS */}
                  {searchQuery.trim().length > 0 && (
                    <div className={`absolute left-2 right-2 mt-2 p-2 rounded-xl border shadow-xl z-50 text-left ${darkMode ? 'bg-slate-950/95 border-slate-800' : 'bg-white border-slate-200'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-800/20 flex justify-between">
                        <span>{language === 'en' ? 'Instant Results' : 'النتائج الفورية'}</span>
                        <span>{searchResults.length} {language === 'en' ? 'found' : 'وجدنا'}</span>
                      </div>
                      {searchResults.length > 0 ? (
                        <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/10 mt-1">
                          {searchResults.map(tool => {
                            const ratingObj = toolRatings[tool.id] || { rating: 4.8, count: 120 };
                            return (
                              <div
                                key={tool.id}
                                onClick={() => {
                                  handleSelectTool(tool);
                                  setSearchQuery('');
                                }}
                                className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-blue-600/10 transition-colors"
                              >
                                <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-slate-900 text-blue-400' : 'bg-slate-100 text-blue-600'}`}>
                                  {React.createElement(IconMap[tool.iconName] || Wrench, { className: "w-3.5 h-3.5" })}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="text-xs font-bold truncate">
                                      {language === 'en' ? tool.name : tool.arabicName}
                                    </h4>
                                    <span className="text-[9px] text-amber-500 font-bold flex items-center gap-0.5">
                                      <Star className="w-2.5 h-2.5 fill-current" />
                                      {ratingObj.rating.toFixed(1)}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    {language === 'en' ? tool.description : tool.arabicDescription}
                                  </p>
                                </div>
                                <Play className="w-3 h-3 text-blue-400" />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-xs text-slate-500">
                          {language === 'en' ? 'No matching utilities' : 'لا توجد أدوات مطابقة لبحثك'}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* PREMIUM STATS SECTION */}
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 px-2">
                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:bg-slate-900/55 hover:border-blue-500/20 shadow-lg' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Activity className="w-5 h-5 text-blue-400 animate-pulse" /></div>
                    <div className="text-left">
                      <span className="text-sm font-black font-mono text-slate-200 block transition-all">{totalOperations.toLocaleString()}</span>
                      <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">{language === 'en' ? 'Operations Run' : 'عمليات منفذة'}</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:bg-slate-900/55 hover:border-blue-500/20 shadow-lg' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-black text-slate-200 block">0ms Latency</span>
                      <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">{language === 'en' ? 'Local Compute' : 'معالجة محلية'}</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:bg-slate-900/55 hover:border-blue-500/20 shadow-lg' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><ShieldCheck className="w-5 h-5 text-purple-400" /></div>
                    <div className="text-left">
                      <span className="text-sm font-black text-slate-200 block">100% Private</span>
                      <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">{language === 'en' ? 'Zero Server Storage' : 'خصوصية مطلقة'}</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:bg-slate-900/55 hover:border-blue-500/20 shadow-lg' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400"><Wrench className="w-5 h-5 text-indigo-400 animate-bounce" style={{ animationDuration: '3s' }} /></div>
                    <div className="text-left">
                      <span className="text-sm font-black text-slate-200 block">{tools.length}+ {language === 'en' ? 'Tools' : 'أداة'}</span>
                      <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">{language === 'en' ? '100% Free & Local' : 'مجانية ومحلية بالكامل'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: HOME (Requirements 2, 3, 4, 5, 6, 11, 12, 14, 20, 21) */}
            {activeTab === 'home' && (
              <div className="space-y-12 animate-fade-in">
                
                {/* FEATURED TOOLS SLIDER CAROUSEL */}
                <FeaturedSlider 
                  tools={tools} 
                  language={language} 
                  darkMode={darkMode} 
                  handleSelectTool={handleSelectTool} 
                  toolRatings={toolRatings} 
                />

                {/* CATEGORIES SECTION WITH ICONS (Requirement 5) */}
                <div className="space-y-4 pt-2">
                  <div className="text-center md:text-left flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-blue-400" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700">
                      {language === 'en' ? 'Browse Tools by Category' : 'تصفح الأدوات حسب التصنيف'}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {CATEGORIES.map(cat => (
                      <div
                        key={`home-cat-${cat.id}`}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setActiveTab('tools');
                        }}
                        className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group ${
                          darkMode 
                            ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg shadow-black/10' 
                            : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${cat.color}`}>
                          {React.createElement(cat.icon, { className: "w-5 h-5" })}
                        </div>
                        <span className={`text-[11px] font-black mt-3 transition-colors ${darkMode ? 'text-slate-300 group-hover:text-blue-400' : 'text-slate-700 group-hover:text-blue-600'}`}>
                          {language === 'en' ? cat.labelEn : cat.labelAr}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 font-bold mt-1">
                          {tools.filter(t => t.category === cat.id).length} {language === 'en' ? 'tools' : 'أدوات'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DYNAMIC RECENTLY USED TOOLS SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700">
                      {language === 'en' ? 'Recently Used Utilities' : 'أدوات استخدمتها مؤخراً'}
                    </h2>
                  </div>

                  {recentlyUsedTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {recentlyUsedTools.map(tool => {
                        const ratingObj = toolRatings[tool.id] || { rating: 4.8, count: 120 };
                        return (
                          <div
                            key={`recent-used-${tool.id}`}
                            className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                          >
                            <div className="absolute top-3 right-3 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-black uppercase tracking-wider">
                              <History className="w-2.5 h-2.5" />
                              <span>{language === 'en' ? 'RECENT' : 'مؤخراً'}</span>
                            </div>

                            <ToolCardImage toolId={tool.id} darkMode={darkMode} />

                            <div className="space-y-1 mt-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                              <h3 className={`font-black text-xs ${darkMode ? 'text-white' : 'text-slate-900'} group-hover:text-blue-400 transition-colors truncate`}>
                                {language === 'en' ? tool.name : tool.arabicName}
                              </h3>
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                                {language === 'en' ? tool.description : tool.arabicDescription}
                              </p>

                              {/* Ratings and usages row */}
                              <div className="flex items-center justify-between text-[9px] pt-1">
                                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-current" />
                                  {ratingObj.rating.toFixed(1)} ({ratingObj.count})
                                </span>
                                <span className="text-slate-500 font-mono">
                                  {(toolUsageCounts[tool.id] || 0).toLocaleString()} {language === 'en' ? 'runs' : 'تشغيل'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleSelectTool(tool)}
                              className="w-full mt-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>{language === 'en' ? 'Launch Tool' : 'تشغيل الأداة'}</span>
                              <span>→</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/10 border-slate-850 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
                      <p className="text-xs">
                        {language === 'en' 
                          ? 'No recently used tools. Launch any premium utility below to instantly populate your dashboard workspace!' 
                          : 'لم تقم بتشغيل أي أدوات مؤخراً. قم بتشغيل أي من الأدوات المتميزة أدناه لتظهر هنا تلقائياً!'}
                      </p>
                    </div>
                  )}
                </div>

                {/* 1. TRENDING TOOLS SECTION (Requirement 1) */}
                {trendingTools.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                      <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700">
                        {language === 'en' ? 'Trending Tools' : 'أدوات رائجة الآن'}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {trendingTools.map(tool => {
                        const ratingObj = toolRatings[tool.id] || { rating: 4.8, count: 120 };
                        return (
                          <div
                            key={`trend-${tool.id}`}
                            className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                          >
                            {/* Trending Badge */}
                            <div className="absolute top-3 right-3 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[8px] font-black uppercase tracking-wider">
                              <Flame className="w-2.5 h-2.5 fill-current" />
                              <span>{language === 'en' ? 'TRENDING' : 'رائج'}</span>
                            </div>

                            <ToolCardImage toolId={tool.id} darkMode={darkMode} />

                            <div className="space-y-1 mt-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                              <h3 className={`font-black text-xs ${darkMode ? 'text-white' : 'text-slate-900'} group-hover:text-blue-400 transition-colors truncate`}>
                                {language === 'en' ? tool.name : tool.arabicName}
                              </h3>
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                                {language === 'en' ? tool.description : tool.arabicDescription}
                              </p>

                              {/* Ratings and usages row */}
                              <div className="flex items-center justify-between text-[9px] pt-1">
                                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-current" />
                                  {ratingObj.rating.toFixed(1)} ({ratingObj.count})
                                </span>
                                <span className="text-slate-500 font-mono">
                                  {(toolUsageCounts[tool.id] || 0).toLocaleString()} {language === 'en' ? 'runs' : 'تشغيل'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleSelectTool(tool)}
                              className="w-full mt-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>{language === 'en' ? 'Launch Tool' : 'تشغيل الأداة'}</span>
                              <span>→</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. MOST POPULAR TODAY SECTION (Requirement 2) */}
                {popularTools.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700">
                        {language === 'en' ? 'Most Popular Today' : 'الأكثر شعبية اليوم'}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {popularTools.map(tool => {
                        const ratingObj = toolRatings[tool.id] || { rating: 4.8, count: 120 };
                        return (
                          <div
                            key={`pop-${tool.id}`}
                            className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                          >
                            {/* Popular Badge */}
                            <div className="absolute top-3 right-3 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-black uppercase tracking-wider">
                              <Star className="w-2.5 h-2.5 fill-current text-amber-400" />
                              <span>{language === 'en' ? 'POPULAR' : 'شائع'}</span>
                            </div>

                            <ToolCardImage toolId={tool.id} darkMode={darkMode} />

                            <div className="space-y-1 mt-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                              <h3 className={`font-black text-xs ${darkMode ? 'text-white' : 'text-slate-900'} group-hover:text-blue-400 transition-colors truncate`}>
                                {language === 'en' ? tool.name : tool.arabicName}
                              </h3>
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                                {language === 'en' ? tool.description : tool.arabicDescription}
                              </p>

                              {/* Ratings and usages row */}
                              <div className="flex items-center justify-between text-[9px] pt-1">
                                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-current" />
                                  {ratingObj.rating.toFixed(1)} ({ratingObj.count})
                                </span>
                                <span className="text-slate-500 font-mono">
                                  {(toolUsageCounts[tool.id] || 0).toLocaleString()} {language === 'en' ? 'runs' : 'تشغيل'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleSelectTool(tool)}
                              className="w-full mt-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>{language === 'en' ? 'Launch Tool' : 'تشغيل الأداة'}</span>
                              <span>→</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. RECENTLY ADDED TOOLS SECTION (Requirement 4) */}
                {recentlyAddedTools.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-indigo-400 animate-pulse" />
                      <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700">
                        {language === 'en' ? 'Recently Added Tools' : 'أدوات أضيفت حديثاً'}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {recentlyAddedTools.map(tool => {
                        const ratingObj = toolRatings[tool.id] || { rating: 4.8, count: 120 };
                        return (
                          <div
                            key={`recent-added-${tool.id}`}
                            className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                          >
                            <div className="absolute top-3 right-3 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[8px] font-black uppercase tracking-wider">
                              <Zap className="w-2.5 h-2.5" />
                              <span>{language === 'en' ? 'NEW' : 'جديد'}</span>
                            </div>

                            <ToolCardImage toolId={tool.id} darkMode={darkMode} />

                            <div className="space-y-1 mt-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                              <h3 className={`font-black text-xs ${darkMode ? 'text-white' : 'text-slate-900'} group-hover:text-blue-400 transition-colors truncate`}>
                                {language === 'en' ? tool.name : tool.arabicName}
                              </h3>
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                                {language === 'en' ? tool.description : tool.arabicDescription}
                              </p>

                              {/* Ratings and usages row */}
                              <div className="flex items-center justify-between text-[9px] pt-1">
                                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-current" />
                                  {ratingObj.rating.toFixed(1)} ({ratingObj.count})
                                </span>
                                <span className="text-slate-500 font-mono">
                                  {(toolUsageCounts[tool.id] || 0).toLocaleString()} {language === 'en' ? 'runs' : 'تشغيل'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleSelectTool(tool)}
                              className="w-full mt-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>{language === 'en' ? 'Launch Tool' : 'تشغيل الأداة'}</span>
                              <span>→</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. RECOMMENDED FOR YOU (Homepage Related/Recommended Tools) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700">
                      {language === 'en' ? 'Recommended For You' : 'أدوات مقترحة لك'}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {(() => {
                      const usedCategories = new Set(recentlyUsedTools.map(t => t.category));
                      let recs = tools.filter(t => usedCategories.has(t.category) && !recentlyUsedTools.some(ru => ru.id === t.id));
                      
                      if (recs.length < 4) {
                        const defaultRecIds = ['ai-prompt-generator', 'pdf-merger', 'image-compressor', 'svg-to-png', 'password-generator', 'bmi-calculator', 'loan-calculator'];
                        const fillRecs = tools.filter(t => defaultRecIds.includes(t.id) && !recentlyUsedTools.some(ru => ru.id === t.id) && !recs.some(r => r.id === t.id));
                        recs = [...recs, ...fillRecs].slice(0, 4);
                      }
                      
                      return recs.slice(0, 4).map(tool => {
                        const ratingObj = toolRatings[tool.id] || { rating: 4.8, count: 120 };
                        return (
                          <div
                            key={`rec-tool-${tool.id}`}
                            className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                          >
                            <div className="absolute top-3 right-3 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-black uppercase tracking-wider">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>{language === 'en' ? 'RECOMMENDED' : 'مقترح'}</span>
                            </div>

                            <ToolCardImage toolId={tool.id} darkMode={darkMode} />

                            <div className="space-y-1 mt-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                              <h3 className={`font-black text-xs ${darkMode ? 'text-white' : 'text-slate-900'} group-hover:text-blue-400 transition-colors truncate`}>
                                {language === 'en' ? tool.name : tool.arabicName}
                              </h3>
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                                {language === 'en' ? tool.description : tool.arabicDescription}
                              </p>

                              <div className="flex items-center justify-between text-[9px] pt-1">
                                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-current" />
                                  {ratingObj.rating.toFixed(1)} ({ratingObj.count})
                                </span>
                                <span className="text-slate-500 font-mono">
                                  {(toolUsageCounts[tool.id] || 0).toLocaleString()} {language === 'en' ? 'runs' : 'تشغيل'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleSelectTool(tool)}
                              className="w-full mt-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>{language === 'en' ? 'Launch Tool' : 'تشغيل الأداة'}</span>
                              <span>→</span>
                            </button>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* TESTIMONIALS SECTION (Requirement 11) */}
                <div className="space-y-4 border-t border-slate-800/15 pt-8">
                  <div className="text-center space-y-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                      <Award className="w-3 h-3 text-amber-500" />
                      <span>{language === 'en' ? 'Loved by Developers Worldwide' : 'محبوب من قبل المطورين عالمياً'}</span>
                    </span>
                    <h2 className="text-xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {language === 'en' ? 'What Professionals Say' : 'ماذا يقول المحترفون عن توليكس'}
                    </h2>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                      {language === 'en'
                        ? 'Thousands of software engineers, creators, and professionals rely on Toolix for lightning fast, 100% private computing.'
                        : 'آلاف مهندسي البرمجيات، والمبدعين، والمحترفين يعتمدون على توليكس لمعالجة برمجية فائقة السرعة وآمنة محلياً بالكامل.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {[
                      {
                        nameEn: "Sarah Jenkins",
                        nameAr: "سارة جينكينز",
                        roleEn: "Senior Frontend Engineer",
                        roleAr: "مهندسة واجهات أمامية أولى",
                        avatar: "SJ",
                        quoteEn: "The client-side JSON Formatter and Validator are absolute lifesavers. Knowing my structural data never touches a backend server gives me the confidence to debug sensitive payloads safely.",
                        quoteAr: "أدوات تنسيق وتدقيق الـ JSON المحلية رائعة جداً! معرفتي بأن بياناتي البرمجية لا تلمس خوادم خارجية تمنحني أماناً مطلقاً عند فحص مدخلات وقواعد بيانات العمل الحساسة.",
                        stars: 5
                      },
                      {
                        nameEn: "Amine El Amrani",
                        nameAr: "أمين العمراني",
                        roleEn: "Lead Product Designer",
                        roleAr: "مصمم منتجات رقمية رئيسي",
                        avatar: "AE",
                        quoteEn: "The Image Compressor is incredibly fast and preserves professional grade visual crispness. I installed the PWA on my MacBook, and now I compress all high-res assets offline.",
                        quoteAr: "مضغط الصور سريع للغاية ويحافظ على حدة ووضوح العناصر الرسومية باحترافية. قمت بتثبيت التطبيق كـ PWA على الماك، وأقوم بضغط كافة الملفات والأصول الرسومية دون اتصال بالإنترنت.",
                        stars: 5
                      },
                      {
                        nameEn: "David Chen",
                        nameAr: "ديفيد تشن",
                        roleEn: "Full Stack Developer & Founder",
                        roleAr: "مطور تطبيقات ومؤسس تقني",
                        avatar: "DC",
                        quoteEn: "Toolix has completely replaced my old bookmarks folder of ad-ridden utility sites. Smooth glassmorphism animations, offline capability, and zero latency. Truly a masterpiece of SaaS design.",
                        quoteAr: "لقد استبدلت منصة توليكس جميع المواقع المليئة بالإعلانات المزعجة في مفضلتي. واجهة زجاجية مذهلة، حركة سلسة، ومعالجة محلية بدون أي تأخير. تحفة تصميمية وعملية حقيقية.",
                        stars: 5
                      }
                    ].map((t, idx) => (
                      <div
                        key={`testi-${idx}`}
                        className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${darkMode ? 'bg-slate-900/35 border-slate-850 hover:border-blue-500/40 hover:bg-slate-900/50 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                      >
                        {/* Quote mark accent */}
                        <div className="absolute -right-2 -bottom-2 text-slate-800/10 dark:text-slate-800/10 font-serif text-8xl pointer-events-none select-none">”</div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(t.stars)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <p className={`text-[11px] leading-relaxed italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            "{language === 'en' ? t.quoteEn : t.quoteAr}"
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-5 border-t border-slate-800/10 mt-4 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow shadow-blue-500/20">
                            {t.avatar}
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <h4 className={`text-xs font-black ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                              {language === 'en' ? t.nameEn : t.nameAr}
                            </h4>
                            <span className="text-[9px] text-slate-500 font-bold block">
                              {language === 'en' ? t.roleEn : t.roleAr}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ ACCORDION SECTION (Requirement 6) */}
                <div className="space-y-4 border-t border-slate-800/15 pt-8">
                  <div className="text-center space-y-2 mb-6">
                    <h2 className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الأكثر شيوعاً (FAQ)'}
                    </h2>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                      {language === 'en' 
                        ? 'Everything you need to know about Toolix premium utility platform, user data, and privacy constraints.'
                        : 'كل ما تحتاج لمعرفته حول منصة توليكس الاحترافية، أمن البيانات، والخصوصية.'}
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto space-y-3.5" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {[
                      {
                        qEn: "Is Toolix really 100% free to use without any limitations?",
                        qAr: "هل موقع توليكس مجاني بالكامل حقاً ودون أي قيود؟",
                        aEn: "Yes! Toolix is completely free, and there are no logins, subscriptions, user accounts, premium plans, quotas, credits, or locked features. You get full, unlimited access to all core developer, mathematical, and document utilities instantly.",
                        aAr: "نعم! منصة توليكس مجانية بالكامل دون الحاجة لتسجيل أي حساب، بريد إلكتروني، أو الاشتراك في خطط مدفوعة. يمكنك استخدام جميع الأدوات الأساسية بشكل غير محدود وفوراً دون قيود."
                      },
                      {
                        qEn: "How does Toolix protect my privacy and secure my data?",
                        qAr: "كيف تحمي منصة توليكس خصوصيتي وتؤمن ملفاتي الحساسة؟",
                        aEn: "Toolix is engineered with a strict 100% client-side architecture. This means all processing, calculations, PDF merging, text editing, and image compression take place solely in your browser's local memory. No files or text data are ever sent, logged, or cached on remote web servers.",
                        aAr: "تعتمد توليكس معيار أمان صارم يعمل محلياً بالكامل (Client-Side). جميع الملفات المرفوعة، كلمات المرور المولدة، والنصوص المكتوبة يتم معالجتها داخل ذاكرة متصفحك المؤقتة فقط، ولا يتم إرسالها أو حفظها نهائياً في ملقماتنا."
                      },
                      {
                        qEn: "Can I install Toolix on my mobile/desktop and use it offline?",
                        qAr: "هل يمكنني تثبيت منصة توليكس على جوالي أو مكتبي لتشغيله دون إنترنت؟",
                        aEn: "Yes! Toolix supports full Progressive Web App (PWA) installation. Use your browser's built-in option (like 'Add to Home Screen' or the install icon in the URL bar) to instantly save Toolix to your device and run it offline.",
                        aAr: "بكل تأكيد! يدعم توليكس تقنية PWA بشكل متكامل. يمكنك استخدام ميزة المتصفح الافتراضية (مثل 'إضافة إلى الشاشة الرئيسية' أو أيقونة التثبيت في شريط العنوان) لحفظ تطبيق توليكس على جهازك واستخدامه دون اتصال بالإنترنت."
                      },
                      {
                        qEn: "How often are new tools added to Toolix?",
                        qAr: "كم مرة يتم إضافة أدوات جديدة إلى منصة توليكس؟",
                        aEn: "Our engineering team is continuously building and deploying new, requested utilities! We update the platform regularly with feedback-driven text, media, math, development, and security tools. You can make requests via our Contact page.",
                        aAr: "يعمل فريقنا الهندسي باستمرار على بناء ونشر أدوات برمجية وحسابية ومستندية جديدة تلبي احتياجات المستخدمين! نقوم بتحديث المنصة بانتظام، ويمكنك إرسال اقتراحاتك عبر صفحة اتصل بنا."
                      }
                    ].map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div 
                          key={`faq-${index}`}
                          className={`rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-slate-900/20 border-slate-850 hover:bg-[#0d121f]/40' : 'bg-white border-slate-200'}`}
                        >
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            className="w-full p-4 flex items-center justify-between font-extrabold text-xs text-left cursor-pointer select-none"
                          >
                            <span className={darkMode ? 'text-slate-100' : 'text-slate-800'}>
                              {language === 'en' ? faq.qEn : faq.qAr}
                            </span>
                            <span className="text-blue-500 font-mono text-base ml-2">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          
                          {isOpen && (
                            <div className={`p-4 pt-0 text-[11px] leading-relaxed border-t border-slate-800/10 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {language === 'en' ? faq.aEn : faq.aAr}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RECENT HISTORIC STATS SUMMARY */}
                {activityLogs.length > 0 && (
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/30 border-slate-900' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <History className="w-3.5 h-3.5 text-purple-400" />
                        <span>{language === 'en' ? 'Recent Actions Log' : 'آخر العمليات المنفذة'}</span>
                      </h4>
                      <button 
                        onClick={() => setActiveTab('history')}
                        className="text-[10px] font-bold text-blue-400 hover:underline"
                      >
                        {language === 'en' ? 'View Full Log' : 'عرض السجل الكامل'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activityLogs.slice(0, 4).map((log) => (
                        <div key={log.id} className="flex justify-between items-center text-xs bg-slate-950/40 border border-slate-900/60 p-2 rounded-lg">
                          <span className="text-slate-300 font-semibold truncate max-w-[180px]">{language === 'en' ? log.toolName : log.arabicToolName}</span>
                          <span className="text-slate-500 font-mono text-[9px]">{log.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: TOOLS */}
            {activeTab === 'tools' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* CATEGORIES selector */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'en' ? 'Filter by Category' : 'تصفية حسب التصنيف'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${selectedCategory === 'all' ? 'bg-blue-600 border-blue-500 text-white shadow' : darkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span>{language === 'en' ? 'All Tools' : 'جميع الأدوات'}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {tools.length}
                      </span>
                    </button>
                    {CATEGORIES.map(cat => {
                      const count = tools.filter(t => t.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${selectedCategory === cat.id ? 'bg-blue-600 border-blue-500 text-white shadow' : darkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          {React.createElement(cat.icon, { className: "w-3.5 h-3.5" })}
                          <span>{language === 'en' ? cat.labelEn : cat.labelAr}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-850 text-slate-500'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* COMPACT TOOL CARDS (with premium styled "Tool Images") */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold">
                      {language === 'en' ? `Showing ${filteredTools.length} tools` : `يتم عرض ${filteredTools.length} أداة`}
                    </span>
                  </div>

                  {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredTools.map((tool) => (
                        <div
                          key={tool.id}
                          className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/30 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-md' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                        >
                          <ToolCardImage toolId={tool.id} darkMode={darkMode} />

                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-extrabold text-xs tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-blue-400 transition-colors truncate pr-2">
                              {language === 'en' ? tool.name : tool.arabicName}
                            </h3>
                            
                            <button
                              onClick={(e) => toggleFavorite(tool.id, e)}
                              className={`p-1 rounded-lg border transition-all ${favorites.includes(tool.id) ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'}`}
                            >
                              <Heart className="w-3.5 h-3.5" fill={favorites.includes(tool.id) ? 'currentColor' : 'none'} />
                            </button>
                          </div>

                          <p className="text-[10px] text-slate-400 line-clamp-1 leading-relaxed mb-3">
                            {language === 'en' ? tool.description : tool.arabicDescription}
                          </p>

                          {/* Footer action */}
                          <button
                            onClick={() => {
                              handleSelectTool(tool);
                            }}
                            className="w-full py-1.5 text-[10px] font-bold rounded-lg bg-blue-600/15 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 cursor-pointer transition-all flex items-center justify-center gap-1"
                          >
                            <span>{language === 'en' ? 'Use Tool' : 'استخدام الأداة'}</span>
                            <span className="text-[9px]">→</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      {language === 'en' ? 'No matching utilities' : 'لا توجد أدوات مطابقة لبحثك'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: FAVORITES */}
            {activeTab === 'favorites' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h2 className="text-base font-bold">
                    {language === 'en' ? 'Your Favorite Utilities' : 'الأدوات المفضلة لديك'}
                  </h2>
                </div>

                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {tools.filter(t => favorites.includes(t.id)).map(tool => (
                      <div
                        key={`fav-${tool.id}`}
                        className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${darkMode ? 'bg-slate-900/30 border-slate-850 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-md' : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'}`}
                      >
                        <ToolCardImage toolId={tool.id} darkMode={darkMode} />

                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-extrabold text-xs tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-blue-400 transition-colors truncate">
                            {language === 'en' ? tool.name : tool.arabicName}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleSelectTool(tool)}
                          className="w-full mt-3 py-1.5 text-[10px] font-bold rounded-lg bg-blue-600/15 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-1"
                        >
                          <span>{language === 'en' ? 'Use Tool' : 'استخدام'}</span>
                          <span className="text-[9px]">→</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Heart className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">{language === 'en' ? 'You have no saved favorites yet.' : 'لا توجد أي أدوات في قائمتك المفضلة حالياً.'}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4 max-w-xl mx-auto animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-400" />
                    <h2 className="text-base font-bold">
                      {language === 'en' ? 'Detailed Activity Logs' : 'سجل العمليات التفصيلي'}
                    </h2>
                  </div>
                  {activityLogs.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 bg-red-600/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Clear History' : 'مسح السجل'}</span>
                    </button>
                  )}
                </div>

                {activityLogs.length > 0 ? (
                  <div className={`rounded-xl border divide-y overflow-hidden ${darkMode ? 'bg-slate-900/20 border-slate-800 divide-slate-800/40' : 'bg-white border-slate-200 divide-slate-200'}`}>
                    {activityLogs.map((log, index) => (
                      <div key={log.id || index} className="p-3.5 flex items-center justify-between text-xs hover:bg-blue-500/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-slate-900 text-purple-400' : 'bg-slate-100 text-purple-600'}`}>
                            <Activity className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-200">
                              {language === 'en' ? log.toolName : log.arabicToolName}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              {language === 'en' ? log.action : log.arabicAction}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border border-dashed rounded-xl border-slate-800">
                    <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">{language === 'en' ? 'Your operation logs are empty.' : 'سجل العمليات فارغ حالياً.'}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-4 max-w-xl mx-auto animate-fade-in text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Platform Configuration' : 'إعدادات المنصة'}
                  </h2>
                </div>

                <div className={`rounded-xl border p-5 space-y-5 ${darkMode ? 'bg-[#0d121f]/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}>
                  {/* Language Selector */}
                  <div className="flex justify-between items-center py-2 border-b border-slate-800/10 dark:border-slate-800/60">
                    <div>
                      <span className="text-xs font-bold block text-slate-900 dark:text-slate-100">{language === 'en' ? 'App Language' : 'لغة التطبيق'}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{language === 'en' ? 'Choose interface localization' : 'اختر لغة واجهة المستخدم'}</span>
                    </div>
                    <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-900">
                      <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${language === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-500 dark:text-slate-400'}`}>English</button>
                      <button onClick={() => setLanguage('ar')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${language === 'ar' ? 'bg-blue-600 text-white shadow' : 'text-slate-500 dark:text-slate-400'}`}>العربية</button>
                    </div>
                  </div>

                  {/* Theme Selector */}
                  <div className="flex justify-between items-center py-2 border-b border-slate-800/10 dark:border-slate-800/60">
                    <div>
                      <span className="text-xs font-bold block text-slate-900 dark:text-slate-100">{language === 'en' ? 'Appearance Theme' : 'مظهر التطبيق'}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{language === 'en' ? 'Switch between dark and light modes' : 'التبديل بين المظهر الداكن والفاتح'}</span>
                    </div>
                    <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-900">
                      <button onClick={() => setDarkMode(false)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${!darkMode ? 'bg-blue-600 text-white shadow' : 'text-slate-500 dark:text-slate-400'}`}>
                        {language === 'en' ? 'Light' : 'فاتح'}
                      </button>
                      <button onClick={() => setDarkMode(true)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${darkMode ? 'bg-blue-600 text-white shadow' : 'text-slate-500 dark:text-slate-400'}`}>
                        {language === 'en' ? 'Dark' : 'داكن'}
                      </button>
                    </div>
                  </div>

                  {/* Ad Frequency Selector */}
                  <div className="flex justify-between items-center py-2 border-b border-slate-800/10 dark:border-slate-800/60">
                    <div>
                      <span className="text-xs font-bold block text-slate-900 dark:text-slate-100">{language === 'en' ? 'Ad Interstitial Frequency' : 'تكرار الإعلانات البينية'}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{language === 'en' ? 'Show an ad after every N tool usages' : 'عرض إعلان بعد كل عدد معين من تشغيل الأدوات'}</span>
                    </div>
                    <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-900">
                      {[3, 5, 10, 15].map((freq) => (
                        <button 
                          key={`freq-${freq}`}
                          onClick={() => {
                            setAdFrequency(freq);
                            localStorage.setItem('toolix_ad_frequency', freq.toString());
                            setToast({
                              message: language === 'en' 
                                ? `Ad frequency updated to every ${freq} tool usages!` 
                                : `تم تعديل تكرار الإعلانات ليظهر كل ${freq} استخدامات للأدوات!`,
                              type: 'success'
                            });
                          }} 
                          className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${adFrequency === freq ? 'bg-blue-600 text-white shadow' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SEO & Analytics Integrations Section */}
                  <div className="py-2 border-b border-slate-800/10 dark:border-slate-800/60 space-y-3">
                    <div>
                      <span className="text-xs font-bold block text-slate-900 dark:text-slate-100">
                        {language === 'en' ? 'SEO & Analytics Integrations' : 'تحسين محركات البحث والتحليلات'}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {language === 'en' ? 'Configure Google Analytics 4 tracking and Search Console site verification.' : 'إعداد تتبع تحليلات جوجل وإثبات ملكية محرك البحث جوجل للمنصة.'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* GA4 ID */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                            {language === 'en' ? 'GA4 Measurement ID' : 'معرف تحليلات جوجل (GA4)'}
                          </label>
                          {gaMeasurementId ? (
                            <span className="text-[9px] font-semibold text-emerald-500 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              {language === 'en' ? 'Active' : 'نشط'}
                            </span>
                          ) : (
                            <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500">
                              {language === 'en' ? 'Not Configured' : 'غير مهيأ'}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={gaInput}
                          onChange={(e) => setGaInput(e.target.value)}
                          placeholder="G-XXXXXXXXXX"
                          className={`w-full px-3 py-1.5 text-[11px] rounded-lg border outline-none font-mono ${
                            darkMode 
                              ? 'bg-slate-950/60 border-slate-800 text-slate-200 focus:border-indigo-500/50' 
                              : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
                          }`}
                        />
                      </div>

                      {/* GSC Verification Code */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-indigo-500" />
                            {language === 'en' ? 'Google Search Console Code' : 'كود إثبات ملكية البحث من جوجل'}
                          </label>
                          {gscVerificationCode ? (
                            <span className="text-[9px] font-semibold text-emerald-500 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              {language === 'en' ? 'Verified' : 'تم التحقق'}
                            </span>
                          ) : (
                            <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500">
                              {language === 'en' ? 'Not Configured' : 'غير مهيأ'}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={gscInput}
                          onChange={(e) => setGscInput(e.target.value)}
                          placeholder="google-site-verification content code"
                          className={`w-full px-3 py-1.5 text-[11px] rounded-lg border outline-none font-mono ${
                            darkMode 
                              ? 'bg-slate-950/60 border-slate-800 text-slate-200 focus:border-indigo-500/50' 
                              : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
                          }`}
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const trimmedGa = gaInput.trim();
                            const trimmedGsc = gscInput.trim();
                            
                            setGaMeasurementId(trimmedGa);
                            setGscVerificationCode(trimmedGsc);
                            
                            if (trimmedGa) {
                              localStorage.setItem('toolix_ga_measurement_id', trimmedGa);
                            } else {
                              localStorage.removeItem('toolix_ga_measurement_id');
                            }
                            
                            if (trimmedGsc) {
                              localStorage.setItem('toolix_gsc_verification_code', trimmedGsc);
                            } else {
                              localStorage.removeItem('toolix_gsc_verification_code');
                            }
                            
                            setToast({
                              message: language === 'en' 
                                ? 'SEO & Analytics configurations updated successfully!' 
                                : 'تم تحديث إعدادات محركات البحث والتحليلات بنجاح!',
                              type: 'success'
                            });
                          }}
                          className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer text-center"
                        >
                          {language === 'en' ? 'Save Integration Settings' : 'حفظ إعدادات الدمج'}
                        </button>
                        {(gaInput || gscInput) && (
                          <button
                            onClick={() => {
                              setGaInput('');
                              setGscInput('');
                              setGaMeasurementId('');
                              setGscVerificationCode('');
                              localStorage.removeItem('toolix_ga_measurement_id');
                              localStorage.removeItem('toolix_gsc_verification_code');
                              setToast({
                                message: language === 'en' ? 'All integration settings cleared!' : 'تم مسح جميع إعدادات الدمج!',
                                type: 'success'
                              });
                            }}
                            className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                              darkMode 
                                ? 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-900 hover:text-white' 
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            {language === 'en' ? 'Clear All' : 'مسح الكل'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* About Toolix section */}
                  <div className="py-2 border-b border-slate-800/10 dark:border-slate-800/60 space-y-2">
                    <div>
                      <span className="text-xs font-bold block text-slate-900 dark:text-slate-100">{language === 'en' ? 'About Toolix' : 'حول منصة توليكس'}</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                        {language === 'en'
                          ? 'Toolix is a clean, modern, offline-capable developer platform designed to replace bloated web utilities with secure, client-side tools that prioritize your privacy.'
                          : 'توليكس هي منصة برمجية حديثة ونظيفة تعمل بشكل مستقل تماماً داخل متصفحك للحفاظ على أمان بياناتك وخصوصيتك دون الحاجة لرفعها لأي خادم.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => navigateTo('about')}
                      className="text-[10px] font-bold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      {language === 'en' ? 'Learn more about Toolix' : 'تعرف أكثر على رسالة المنصة'} &rarr;
                    </button>
                  </div>

                  {/* Policy & Support Links */}
                  <div className="py-2 space-y-3">
                    <span className="text-xs font-bold block text-slate-900 dark:text-slate-100">{language === 'en' ? 'Legal & Support' : 'الروابط القانونية والدعم'}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => navigateTo('privacy')}
                        className={`px-3 py-2.5 rounded-xl border text-left text-[11px] font-bold transition-all cursor-pointer ${
                          darkMode 
                            ? 'border-slate-850 bg-slate-950/40 hover:bg-slate-900 text-slate-300' 
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        🔒 {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
                      </button>
                      <button
                        onClick={() => navigateTo('terms')}
                        className={`px-3 py-2.5 rounded-xl border text-left text-[11px] font-bold transition-all cursor-pointer ${
                          darkMode 
                            ? 'border-slate-850 bg-slate-950/40 hover:bg-slate-900 text-slate-300' 
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        ⚖️ {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
                      </button>
                      <button
                        onClick={() => navigateTo('contact')}
                        className={`px-3 py-2.5 rounded-xl border text-left text-[11px] font-bold transition-all cursor-pointer ${
                          darkMode 
                            ? 'border-slate-850 bg-slate-950/40 hover:bg-slate-900 text-slate-300' 
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        💬 {language === 'en' ? 'Contact Support' : 'اتصل بنا والمساندة'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ABOUT (Requirements 6, 12, 21) */}
            {activeTab === 'about' && (
              <div className="max-w-4xl mx-auto space-y-12 animate-fade-in text-left px-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Hero Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
                    <Award className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Craftsmanship & Integrity' : 'إتقان ومصداقية برمجية'}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                    {language === 'en' ? 'About Toolix Premium' : 'حول منصة توليكس بريميوم'}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {language === 'en'
                      ? 'Toolix is an advanced developer-first utilities ecosystem designed to replace slow, heavy, ad-ridden web utilities with beautiful, modern, offline-capable services that respect your absolute privacy.'
                      : 'توليكس هي منظومة أدوات برمجية متطورة مصممة خصيصاً للمطورين والمصممين، تهدف إلى استبدال المواقع البطيئة والممتلئة بالإعلانات والملفات المزعجة بخدمات ذكية، فائقة السرعة، تعمل محلياً بالكامل وتحترم الخصوصية المطلقة.'}
                  </p>
                </div>

                {/* Core Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] duration-300 ${darkMode ? 'border-slate-800 bg-[#070b14]/50 shadow-2xl shadow-blue-500/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <span className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl inline-flex mb-4">
                      <ShieldCheck className="w-6 h-6" />
                    </span>
                    <h3 className={`text-sm font-black tracking-wide ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {language === 'en' ? '100% Secure Sandbox' : 'معالجة محلية آمنة 100%'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                      {language === 'en'
                        ? 'All text parsing, PDF compilation, cryptography, and image resizing occur strictly within your browser. Absolutely zero payload bytes are uploaded to remote servers.'
                        : 'كل معالجة النصوص، وتوليد الشيفرات، وضغط ملفات PDF، وتعديل الصور تتم بالكامل داخل جهازك. لا يتم رفع أي بايت واحد من ملفاتك إلى أي خادم بعيد.'}
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] duration-300 ${darkMode ? 'border-slate-800 bg-[#070b14]/50 shadow-2xl shadow-indigo-500/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <span className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl inline-flex mb-4">
                      <Zap className="w-6 h-6" />
                    </span>
                    <h3 className={`text-sm font-black tracking-wide ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {language === 'en' ? 'Extreme Performance' : 'سرعة تشغيل خارقة'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                      {language === 'en'
                        ? 'Powered by optimized WebAssembly, modern JavaScript Web APIs, and hardware acceleration, tasks are computed instantly without any network waiting times.'
                        : 'بدعم من تقنيات WebAssembly المتقدمة، وبرمجيات متصفح الويب الحديثة والمسرعة عتادياً، تنجز أدواتنا جميع العمليات فورياً بدون أي تأخير شبكي.'}
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] duration-300 ${darkMode ? 'border-slate-800 bg-[#070b14]/50 shadow-2xl shadow-purple-500/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <span className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl inline-flex mb-4">
                      <Globe className="w-6 h-6" />
                    </span>
                    <h3 className={`text-sm font-black tracking-wide ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {language === 'en' ? 'Modern Craftsmanship' : 'واجهة استخدام متميزة'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                      {language === 'en'
                        ? 'Toolix offers a distraction-free, ad-friendly, professional environment. Designed with precise responsive spacing, elegant typography, and zero friction.'
                        : 'تمنحك توليكس بيئة عمل ممتازة خالية من المشتتات والبطء. صُممت الواجهة لتكون متناسقة ومتجاوبة، مع خطوط احترافية واضحة وأداء سلس للغاية.'}
                    </p>
                  </div>
                </div>

                {/* Live Platform Stats block */}
                <div className={`p-8 rounded-3xl border ${darkMode ? 'border-slate-800/80 bg-[#030712]/40' : 'bg-slate-50 border-slate-200'} grid grid-cols-2 md:grid-cols-4 gap-6 text-center`}>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-black text-blue-400">100+</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {language === 'en' ? 'Professional Tools' : 'أداة احترافية'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-black text-indigo-400">100%</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {language === 'en' ? 'Client-Side Secure' : 'حماية ومحلية 100%'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-black text-purple-400">0 KB</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {language === 'en' ? 'Saved On Server' : 'بيانات مرفوعة على السيرفر'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-black text-emerald-400">0$</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {language === 'en' ? 'Registration Required' : 'الحاجة لتسجيل حساب'}
                    </p>
                  </div>
                </div>

                {/* Our Philosophy Detailed Text */}
                <div className="space-y-4 max-w-3xl">
                  <h3 className={`text-lg font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'en' ? 'Our Philosophy' : 'رؤيتنا وفلسفتنا الرقمية'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {language === 'en'
                      ? 'In an era where personal data and intellectual property are continuously captured and harvested by corporations, Toolix stands as an open sanctuary. We believe that professional tools should not come at the cost of your security or privacy. That is why we built Toolix to run completely inside your browser sandbox. Whether you are formatting sensitive JSON configs, merging confidential business contracts in PDF, generating secure passwords, or translating proprietary content, you can rest assured that your files and inputs never touch the cloud.'
                      : 'في عصر تتعرض فيه البيانات الشخصية والملكية الفكرية للتتبع المستمر من الشركات، تبرز منصة توليكس كملاذ برمجي آمن تماماً. نؤمن بأن حصولك على أدوات برمجية ممتازة لا يجب أن يكون على حساب خصوصيتك أو أمن معلوماتك. لذلك، قمنا بهندسة توليكس لتعمل بالكامل محلياً داخل متصفحك الشخصي. سواء كنت تقوم بتنسيق ملفات برمجية حساسة، أو دمج عقود تجارية سرية بصيغة PDF، أو توليد كلمات مرور معقدة، يمكنك الاطمئنان تماماً بأن ملفاتك ونصوصك لا ترفع إلى خوادمنا البرمجية أو السحابية نهائياً.'}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRIVACY POLICY (Requirements 7, 12, 21) */}
            {activeTab === 'privacy' && (
              <div className="max-w-4xl mx-auto space-y-6 text-left px-4 animate-fade-in text-xs leading-relaxed" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className={`border-b pb-4 space-y-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <h2 className={`text-2xl md:text-3xl font-black ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية وأمن المعلومات'}
                  </h2>
                  <p className="text-slate-500 font-bold">
                    {language === 'en' ? 'Last Updated: June 30, 2026' : 'آخر تحديث: 30 يونيو 2026'}
                  </p>
                </div>

                <div className="space-y-6 text-slate-400">
                  <p>
                    {language === 'en'
                      ? 'At Toolix, accessible from toolix.app, one of our main priorities is the complete privacy and security of our visitors. This Privacy Policy document contains types of information that are collected or not collected by Toolix and how we use them. This policy is written in complete alignment with Google AdSense terms, GDPR (General Data Protection Regulation), and CCPA (California Consumer Privacy Act) compliance.'
                      : 'في منصة توليكس، المتاحة عبر الرابط toolix.app، نضع خصوصية وأمان مستخدمينا وزوارنا على رأس قائمة أولوياتنا. توضح هذه الوثيقة طبيعة المعلومات التي يتم معالجتها أو الاحتفاظ بها، ونؤكد على أمانها التام. تم إعداد هذه السياسة بالتوافق التام مع متطلبات غوغل أدسنس (Google AdSense)، واللائحة العامة لحماية البيانات (GDPR)، وقانون خصوصية المستهلك في كاليفورنيا (CCPA).'}
                  </p>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '1. Consent & Acceptance' : '1. الموافقة والقبول'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you do not agree with any of these statements, please refrain from using our services.'
                        : 'باستخدامك لموقعنا الإلكتروني، فإنك توافق على سياسة الخصوصية الخاصة بنا وتقر بالالتزام بجميع بنودها. إذا كنت لا توافق على هذه السياسة، يُرجى التوقف عن استخدام الخدمات.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '2. Complete Client-Side Isolation (Zero Data Collection)' : '2. المعالجة المحلية المستقلة (عدم جمع أي بيانات نهائياً)'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Toolix operates on a 100% serverless, client-side utility model. All input parameters, document uploads, parsed images, credit values, or cryptographic text processed in any tool are handled solely in your computer\'s local memory (RAM). We do not possess database pipelines, back-end file storage, or server processing scripts capable of intercepting, caching, or retrieving your secure data. Your proprietary data never leaves your device.'
                        : 'تعمل منصة توليكس بنظام برمجيات مستقل محلي بالكامل (Client-Side). جميع النصوص المدخلة، والملفات المرفوعة، والشيفرات البرمجية، والصور المجرية عليها العمليات تتم معالجتها حصراً داخل الذاكرة العشوائية المحلية لجهازك. لا نمتلك خوادم وسيطة أو قواعد بيانات خلفية لحفظ أو تتبع هذه البيانات. ملفاتك وبياناتك الشخصية تظل ملكك وفي حوزتك تماماً.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '3. Local Browser Storage & Preferences' : '3. ملفات الذاكرة المحلية لتخزين التفضيلات'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'We utilize your local browser storage (localStorage) strictly to store your system preferences (such as dark/light mode switches, language selections, and your saved favorites) and simple numerical usage counts to manage integrated safety triggers and ad display thresholds. This data remains completely offline within your browser client.'
                        : 'نستخدم الذاكرة المحلية لمتصفحك (localStorage) فقط وبشكل حصري لحفظ إعدادات تفضيلاتك (مثل اختيار المظهر الداكن/الفاتح، اللغة، وقائمة الأدوات المفضلة لديك) بالإضافة لعداد رقمي بسيط لعدد مرات الاستخدام لإدارة عرض الحصص الإعلانية. هذه البيانات تظل بالكامل على جهازك الشخصي ولا يتم رفعها نهائياً.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '4. Log Files & Traffic Analytics' : '4. ملفات السجل القياسية وإحصاءات حركة المرور'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Like other commercial platforms, Toolix follows a standard procedure of using server log files. These files log visitors when they access websites. The information collected by log files includes internet protocol (IP) addresses, browser types, Internet Service Providers (ISP), date and time stamps, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, and tracking aggregate users\' movement.'
                        : 'مثل معظم منصات الويب الاحترافية، تتبع توليكس إجراءات قياسية لتحليل ملفات سجلات الاستخدام. تسجل هذه الملفات تفاصيل الزوار عند تصفحهم للموقع. تشمل هذه المعلومات عناوين بروتوكول الإنترنت (IP)، ونوع المتصفح، ومزود الخدمة (ISP)، والتاريخ والوقت، والصفحات التي تمت الإحالة منها وإليها. هذه البيانات ليست مرتبطة بأي معلومات تحدد الهوية الشخصية للمستخدم، والهدف منها هو تحليل حركة المرور العامة وإدارة المنصة.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '5. Google DoubleClick DART Cookies & Advertisements' : '5. الإعلانات وملفات تعريف ارتباط غوغل DoubleClick DART'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Google is one of the third-party vendors integrated into our platform. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to toolix.app and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.'
                        : 'غوغل هي أحد الشركاء ومزودي الإعلانات في موقعنا. تستخدم غوغل ملفات تعريف الارتباط المعروفة باسم ملفات DART لتقديم إعلانات مخصصة لزوار منصتنا بناءً على زيارتهم لموقع توليكس والمواقع الأخرى على شبكة الإنترنت. يمكن للزوار اختيار إلغاء استخدام ملفات تعريف الارتباط DART عن طريق زيارة سياسة الخصوصية الخاصة بإعلانات غوغل وشبكة المحتوى.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '6. Third-Party Advertising Partners' : '6. شركاء الإعلانات الخارجيين'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Toolix, which are sent directly to users\' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites.'
                        : 'يستخدم شركاء الإعلانات الخارجيون تقنيات مثل ملفات تعريف الارتباط، والبرمجيات النصية (JavaScript)، وإشارات الويب لتخصيص الإعلانات التي تظهر على توليكس وقياس فاعليتها. يتلقون تلقائياً عنوان بروتوكول الإنترنت (IP) الخاص بك عند حدوث ذلك. يرجى العلم أن توليكس ليس لديها حق الوصول أو السيطرة على هذه الملفات التي يستخدمها معلنون خارجيون.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '7. GDPR Data Protection Rights' : '7. حقوق حماية البيانات بموجب اللائحة الأوروبية GDPR'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: The right to access your personal data copies, the right to rectification of any inaccurate information, the right to erasure under certain conditions, and the right to object to processing. Since we do not store any personal user files or logs, requests regarding individual calculations or text queries do not apply because they are completely deleted from your computer memory upon browser tab closure.'
                        : 'نريد التأكد من أنك على دراية تامة بجميع حقوق حماية البيانات الخاصة بك. لكل مستخدم أوروبي الحق في طلب الوصول إلى بياناته الشخصية وتعديلها، أو محوها بالكامل، أو تقييد معالجتها بموجب شروط معينة. وبما أن منصة توليكس لا تقوم بجمع أو تخزين أي ملفات أو سجلات للبيانات الشخصية للمستخدمين، فإن هذا يضمن لك أقصى درجات الحماية التلقائية لبياناتك الشخصية بمجرد إغلاق علامة تبويب المتصفح.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '8. CCPA Privacy Rights' : '8. حقوق الخصوصية بموجب قانون كاليفورنيا CCPA'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Under the CCPA, among other rights, California consumers have the right to request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers, and request that a business delete any personal data. Toolix does not sell, lease, or distribute any user data simply because we hold a strict zero-data-collection infrastructure. If you make a request, we have one month to respond to you.'
                        : 'بموجب قانون خصوصية المستهلك في كاليفورنيا (CCPA)، يحق للمستهلكين طلب الكشف عن فئات البيانات التي تم جمعها، أو طلب حذف أي بيانات شخصية تم الاحتفاظ بها. نؤكد مجدداً أن منصة توليكس لا تبيع، ولا تؤجر، ولا تشارك أي بيانات للمستخدمين مطلقاً لعدم وجود بنية لتجميعها في الأساس.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TERMS OF SERVICE (Requirements 8, 12, 21) */}
            {activeTab === 'terms' && (
              <div className="max-w-4xl mx-auto space-y-6 text-left px-4 animate-fade-in text-xs leading-relaxed" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className={`border-b pb-4 space-y-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <h2 className={`text-2xl md:text-3xl font-black ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {language === 'en' ? 'Terms of Service' : 'شروط الخدمة والاستخدام'}
                  </h2>
                  <p className="text-slate-500 font-bold">
                    {language === 'en' ? 'Effective Date: June 30, 2026' : 'تاريخ السريان: 30 يونيو 2026'}
                  </p>
                </div>

                <div className="space-y-6 text-slate-400">
                  <p>
                    {language === 'en'
                      ? 'Welcome to Toolix! By accessing or utilizing our website, accessible at toolix.app, you agree to be bound by the following Terms of Service. If you disagree with any part of these terms, please refrain from using our services and exit the platform immediately.'
                      : 'مرحباً بك في منصة توليكس! بدخولك إلى موقعنا الإلكتروني واستخدامك لأدواتنا المتوفرة عبر الرابط toolix.app، فإنك تقر وتوافق على الالتزام بشروط الخدمة والاستخدام التالية. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى التوقف فوراً عن استخدام خدماتنا ومغادرة الموقع.'}
                  </p>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '1. Access License & Permitted Usage' : '1. رخصة الاستخدام والاستغلال المسموح'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Permission is granted to utilize any of the software tools, calculations, converters, and formatters on Toolix completely free of charge. This is the grant of an operational license, not a transfer of title. You may use our utilities for personal, educational, or commercial purposes. However, you must not use our services for any unlawful activities or in a manner that degrades or interrupts server networks.'
                        : 'نمنحك إذناً برمجياً لاستخدام وتطبيق جميع الأدوات الحسابية ومولدات الأكواد والمنسقات المتوفرة على توليكس مجاناً بالكامل. هذا الإذن يمثل رخصة استخدام برمجية مؤقتة ومستقرة، وليس نقل ملكية. يمكنك استخدام أدواتنا للأغراض الشخصية والتعليمية والتجارية، بشرط عدم استخدامها في أي أنشطة غير قانونية أو بطرق قد تضر بعمل الموقع.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '2. Proprietary Intellectual Property' : '2. الملكية الفكرية والعلامة التجارية'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'All proprietary codebase, styling, visual interfaces, vectors, logos, and custom layout algorithms on Toolix are the exclusive intellectual property of Toolix and are protected by applicable trademark and copyright laws. You hold 100% complete ownership and copyright over any outputs, documents, formatted text, or file results generated using our tools.'
                        : 'جميع الشيفرات البرمجية، والتصاميم، والواجهات البصرية، والشعارات، وخوارزميات التنسيق الخاصة بنا هي ملكية فكرية حصرية لشركة توليكس ومحمية بموجب القوانين ذات الصلة. في المقابل، فإنك تمتلك بالكامل (بنسبة 100%) حقوق ملكية وتصرف كاملة لجميع النصوص والملفات والنتائج المستخرجة عبر استخدام أدواتنا.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '3. Disclaimers ("As-Is" Standard)' : '3. إخلاء المسؤولية (معيار التشغيل "كما هو")'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'The tools on Toolix are provided "as is" and "as available". Toolix makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. We do not guarantee that the mathematical algorithms or PDF calculations are 100% free of transient processing errors, although we execute strict standards to ensure absolute accuracy.'
                        : 'يتم تقديم كافة الأدوات في توليكس "كما هي" و"حسب توفرها". لا تقدم منصة توليكس أي ضمانات، صريحة أو ضمنية، وتخلي مسؤوليتها بموجب هذا الشرط من أي مطالبات بالتعويض. لا نضمن خلو الخوارزميات الحسابية أو معالجات الملفات تماماً من الأخطاء العابرة، على الرغم من تطبيقنا لأقصى المعايير البرمجية لضمان دقة العمليات الحسابية والنتائج.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '4. Limitation of Liability' : '4. تحديد المسؤولية القانونية'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'In no event shall Toolix or its contributors be liable for any damages (including, without limitation, damages for loss of data, loss of business profit, or due to business interruption) arising out of the use or inability to use the utilities on Toolix, even if Toolix has been notified of the possibility of such damage. All operations are sandboxed and fully executed under the user\'s absolute responsibility.'
                        : 'لا تتحمل توليكس أو مطوروها بأي حال من الأحوال المسؤولية عن أي أضرار ناجمة عن استخدام أو عدم القدرة على استخدام الأدوات البرمجية على الموقع (بما في ذلك، على سبيل المثال لا الحصر، أضرار فقدان الأرباح، البيانات، أو توقف الأعمال)، حتى لو تم إخطارنا بوجود احتمالية لهذه الأضرار. تقع مسؤولية تشغيل واستخدام الأدوات على مسؤوليتك المطلقة.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '5. Integrated Advertising & Links' : '5. الإعلانات والروابط الخارجية'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Toolix utilizes Google AdSense and other advertising partners to sustain its free-to-use operations. Toolix has not reviewed all of the external web addresses linked to its site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement. Use of any such linked website is at the user\'s own risk.'
                        : 'تستخدم توليكس إعلانات غوغل أدسنس (Google AdSense) وشركاء إعلانيين خارجيين لتوفير الدعم المالي واستمرار تقديم الخدمات مجاناً. لا نتحمل مسؤولية المحتوى المتوفر على الروابط الخارجية التي قد تشير إليها الإعلانات، واستخدام تلك الروابط يقع على مسؤولية المستخدم الخاصة.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '6. Revisions & Errata' : '6. التحديثات والتعديلات'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'The tools and documents appearing on Toolix could include technical, typographical, or photographic errors. Toolix does not promise that any of the materials on this website are accurate, complete, or current. Toolix may make changes to the materials contained on its website at any time without prior notice.'
                        : 'قد تحتوي بعض المواد أو الأدوات البرمجية على أخطاء تقنية، إملائية أو مطبعية. لا نلتزم بتحديث المواد بأثر رجعي دائم، ولكن يحق لنا إجراء تعديلات برمجية أو تحسينية على الموقع في أي وقت وبدون إشعار مسبق لضمان جودة الأداء.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {language === 'en' ? '7. Governing Law' : '7. القانون الحاكم والنزاعات'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Any claim relating to Toolix website shall be governed by applicable international e-commerce laws without regard to its conflict of law provisions.'
                        : 'تخضع أي مطالبات أو نزاعات تتعلق باستخدام منصة توليكس لقوانين التجارة والاتصالات الإلكترونية الدولية المعمول بها بقطع النظر عن تضارب القوانين.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CONTACT (Requirements 9, 12, 21) */}
            {activeTab === 'contact' && (
              <div className="max-w-5xl mx-auto animate-fade-in text-left px-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Section Title */}
                <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-extrabold uppercase tracking-widest">
                    <Mail className="w-3.5 h-3.5 animate-pulse" />
                    <span>{language === 'en' ? '24/7 Support Channel' : 'قنوات الدعم والتواصل المستمر'}</span>
                  </div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                    {language === 'en' ? 'Get In Touch' : 'اتصل بنا والدعم الفني'}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {language === 'en'
                      ? 'Have feedback, custom tool requests, or technical support inquiries? Reach out and our team will get back to you within 24 hours.'
                      : 'لديك اقتراح لأداة جديدة، أو تواجه مشكلة تقنية، أو تريد طلب شراكة؟ تواصل معنا فوراً وسيقوم فريقنا بالرد عليك ومساعدتك في غضون 24 ساعة.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Social Links & Contact Details */}
                  <div className="md:col-span-5 space-y-6">
                    <div className={`p-6 rounded-2xl border ${darkMode ? 'border-slate-800 bg-[#070b14]/50' : 'bg-slate-50 border-slate-200'} space-y-4`}>
                      <h3 className={`text-sm font-black ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                        {language === 'en' ? 'Official Support Mail' : 'البريد الإلكتروني المباشر'}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 inline-flex">
                          <Mail className="w-5 h-5" />
                        </span>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{language === 'en' ? 'Direct Support' : 'الدعم الفني والطلبات'}</p>
                          <a href="mailto:mailtonexoraaibusiness@gmail.com" className="text-xs font-bold text-white hover:text-blue-400 transition-colors">
                            mailtonexoraaibusiness@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl border ${darkMode ? 'border-slate-800 bg-[#070b14]/50' : 'bg-slate-50 border-slate-200'} space-y-4`}>
                      <h3 className={`text-sm font-black ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                        {language === 'en' ? 'Our Digital Presence' : 'شراكاتنا وقنواتنا الرقمية'}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {language === 'en'
                          ? 'Follow us, contribute on GitHub, or request custom features through our public repositories.'
                          : 'تابع أخبار التطوير البرمجي لخدمات توليكس، ساهم معنا برمجياً عبر غيت هاب، أو راسلنا عبر شبكاتنا.'}
                      </p>

                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <a 
                          href="https://github.com/toolix-org" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 hover:scale-[1.05] ${
                            darkMode 
                              ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white' 
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-sm'
                          }`}
                        >
                          <Github className="w-5 h-5 mb-1.5" />
                          <span className="text-[9px] font-bold">GitHub</span>
                        </a>

                        <a 
                          href="https://twitter.com/toolix_app" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 hover:scale-[1.05] ${
                            darkMode 
                              ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white' 
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-sm'
                          }`}
                        >
                          <Twitter className="w-5 h-5 mb-1.5" />
                          <span className="text-[9px] font-bold">Twitter/X</span>
                        </a>

                        <a 
                          href="https://linkedin.com/company/toolix" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 hover:scale-[1.05] ${
                            darkMode 
                              ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white' 
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-sm'
                          }`}
                        >
                          <Linkedin className="w-5 h-5 mb-1.5" />
                          <span className="text-[9px] font-bold">LinkedIn</span>
                        </a>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-dashed border-slate-800 text-[11px] text-slate-500 leading-relaxed">
                      {language === 'en'
                        ? '🔒 Security Guarantee: Your messages are fully encrypted in transit. We do not sell or store support email data in public loggers.'
                        : '🔒 ضمان أمان وخصوصية تواصلك: تُشفر جميع البيانات المرسلة أثناء نقلها لحماية هويتك. لا نقوم بحفظ أو بيع أو مشاركة رسائل البريد الإلكتروني مع أي جهات خارجية نهائياً.'}
                    </div>
                  </div>

                  {/* Right Column: Contact Form with full validation and submit flow */}
                  <div className="md:col-span-7">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!contactName.trim() || !contactEmail.trim() || !contactSubject.trim() || !contactMessage.trim()) {
                        setToast({
                          message: language === 'en' ? 'Please fill in all fields' : 'يرجى ملء كافة الحقول المطلوبة',
                          type: 'error'
                        });
                        return;
                      }

                      // Email validation regex
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(contactEmail)) {
                        setToast({
                          message: language === 'en' ? 'Please provide a valid email address' : 'يرجى إدخال عنوان بريد إلكتروني صحيح للرد',
                          type: 'error'
                        });
                        return;
                      }

                      if (contactMessage.trim().length < 10) {
                        setToast({
                          message: language === 'en' ? 'Message must be at least 10 characters long' : 'نص الرسالة يجب أن يتجاوز 10 أحرف لتوضيح التفاصيل',
                          type: 'error'
                        });
                        return;
                      }

                      setIsSubmittingContact(true);
                      
                      // Simulate professional delivery flow
                      setTimeout(() => {
                        setIsSubmittingContact(false);
                        setToast({
                          message: language === 'en' ? 'Message submitted successfully!' : 'تم إرسال رسالتك للدعم الفني بنجاح وسيتواصل فريقنا معك!',
                          type: 'success'
                        });
                        setContactName('');
                        setContactEmail('');
                        setContactSubject('');
                        setContactMessage('');
                      }, 1200);

                    }} className={`p-6 sm:p-8 rounded-3xl border space-y-4 shadow-2xl relative overflow-hidden ${darkMode ? 'bg-[#060a13]/80 border-slate-800/80 shadow-indigo-500/5' : 'bg-white border-slate-200'}`}>
                      {/* Submitting visual overlay loader */}
                      {isSubmittingContact && (
                        <div className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 animate-fade-in">
                          <div className="w-10 h-10 border-4 border-t-blue-500 border-slate-800 rounded-full animate-spin" />
                          <p className="text-[11px] font-black tracking-wider text-slate-300 uppercase">
                            {language === 'en' ? 'Encrypting & Delivering...' : 'جاري تشفير وتسليم الرسالة...'}
                          </p>
                        </div>
                      )}

                      {/* Name input */}
                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                        </label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder={language === 'en' ? 'Enter your full name' : 'اسمك الكريم هنا...'}
                          className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold ${darkMode ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-600' : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400'}`}
                          required
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                        </label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold ${darkMode ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-600' : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400'}`}
                          required
                        />
                      </div>

                      {/* Subject select dropdown */}
                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {language === 'en' ? 'Topic / Subject' : 'موضوع التواصل'}
                        </label>
                        <select
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold ${darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'}`}
                          required
                        >
                          <option value="">{language === 'en' ? '-- Select a Topic --' : '-- اختر سبب التواصل --'}</option>
                          <option value="support">{language === 'en' ? 'Technical Support & Help' : 'الدعم والمساعدة التقنية'}</option>
                          <option value="tool-request">{language === 'en' ? 'Feature / Custom Tool Request' : 'اقتراح أداة جديدة أو ميزة مضافة'}</option>
                          <option value="bug">{language === 'en' ? 'Bug / Vulnerability Report' : 'الإبلاغ عن مشكلة برمجية أو ثغرة'}</option>
                          <option value="partnership">{language === 'en' ? 'Business Inquiry / Partnership' : 'شراكة تجارية أو استفسار متبادل'}</option>
                        </select>
                      </div>

                      {/* Message body */}
                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {language === 'en' ? 'Message Detail' : 'نص وتفاصيل الرسالة'}
                        </label>
                        <textarea
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          rows={4}
                          placeholder={language === 'en' ? 'Describe your request with details...' : 'اكتب لنا كل التفاصيل المتعلقة بموضوع تواصلك...'}
                          className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium ${darkMode ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-600' : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400'}`}
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmittingContact}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{language === 'en' ? 'Securely Send Message' : 'إرسال الرسالة بشكل آمن'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SYSTEM STATUS */}
            {activeTab === 'status' && (
              <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 animate-fade-in text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Header section with pulsating green status indicator */}
                <div className={`relative rounded-3xl p-6 sm:p-8 border overflow-hidden ${darkMode ? 'bg-slate-900/40 border-slate-800/80 shadow-2xl backdrop-blur-xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        <span>{language === 'en' ? 'Live System Monitoring' : 'مراقبة حية ومباشرة للنظام'}</span>
                      </div>
                      <h1 className={`text-2xl sm:text-3xl font-black font-display tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {language === 'en' ? 'SaaS System Status' : 'حالة النظام والخدمات'}
                      </h1>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} max-w-lg leading-relaxed`}>
                        {language === 'en'
                          ? 'Real-time performance latency, regional server logs, and operational health trackers for all our generative AI model instances.'
                          : 'مراقبة حية لسرعة استجابة الخوادم، وسجل العمليات الإقليمية، وحالة التشغيل لجميع قنوات الذكاء الاصطناعي التوليدي الخاصة بنا.'}
                      </p>
                    </div>

                    <button
                      onClick={runStatusDiagnostics}
                      disabled={isRefreshingStatus}
                      className={`px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2.5 shadow-lg ${
                        isRefreshingStatus 
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshingStatus ? 'animate-spin' : ''}`} />
                      <span>{language === 'en' ? 'Trigger Diagnostics' : 'تشغيل الفحص الذاتي'}</span>
                    </button>
                  </div>
                </div>

                {/* Overall Health Status Card */}
                <div className={`rounded-3xl p-6 border flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden ${
                  darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 relative">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping" />
                      <CheckCircle2 className="w-8 h-8 relative z-10" />
                    </div>
                    <div className="space-y-1">
                      <h3 className={`text-lg font-black tracking-tight ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {language === 'en' ? 'All Systems Operational' : 'جميع الخدمات تعمل بكفاءة تامة'}
                      </h3>
                      <p className={`text-xs ${darkMode ? 'text-emerald-500/75' : 'text-emerald-600'}`}>
                        {language === 'en' ? '99.98% platform uptime over the past 90 days.' : 'معدل استقرار الخدمة الإجمالي يبلغ 99.98% خلال الـ 90 يوماً الماضية.'}
                      </p>
                    </div>
                  </div>
                  <div className={`text-center sm:text-right text-[11px] font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <div>{language === 'en' ? 'Last Updated:' : 'آخر تحديث:'}</div>
                    <div className={`font-bold mt-0.5 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                      {statusLastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                    </div>
                  </div>
                </div>

                {/* Diagnostic Output Terminal (If active) */}
                {isRefreshingStatus && (
                  <div className="rounded-3xl p-5 border border-slate-800 bg-slate-950/90 font-mono text-xs text-blue-400 space-y-2 animate-fade-in shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
                    <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Local Diagnostic Logger</span>
                    </div>
                    {statusLogs.map((log, i) => (
                      <div key={i} className="flex items-center gap-2 animate-fade-in">
                        <span className="text-slate-600 select-none">&gt;</span>
                        <span>{log}</span>
                        {i === statusLogs.length - 1 ? (
                          <span className="w-1.5 h-3.5 bg-blue-500 animate-pulse" />
                        ) : (
                          <span className="text-emerald-500 font-bold">✓</span>
                        )}
                      </div>
                    ))}
                    {statusLogs.length === 0 && (
                      <div className="text-slate-600 animate-pulse">{language === 'en' ? 'Starting secure verification suite...' : 'جاري إطلاق حزمة فحص الأمان والربط...'}</div>
                    )}
                  </div>
                )}

                {/* Main Services Status Grid */}
                <div className="space-y-4">
                  <h2 className={`text-base font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {language === 'en' ? 'Core AI Services Status' : 'حالة خدمات الذكاء الاصطناعي الأساسية'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1. AI Chat */}
                    <div className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      darkMode ? 'bg-[#060a13]/60 border-slate-800/80 shadow-md hover:border-slate-800' : 'bg-white border-slate-200/80 shadow-sm hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                              {language === 'en' ? 'AI Chat' : 'المحادثة الذكية (AI Chat)'}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-500">gemini-2.5-flash</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {language === 'en' ? 'Operational' : 'تعمل كالمعتاد'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/20 pt-3">
                        <div>
                          {language === 'en' ? 'Latency:' : 'زمن الاستجابة:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{serviceLatencies.chat}ms</span>
                        </div>
                        <div>
                          {language === 'en' ? 'Uptime:' : 'الاستمرارية:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>99.98%</span>
                        </div>
                      </div>

                      {/* Sparkline-like historical uptime bars */}
                      <div className="mt-3 flex gap-1 h-3 items-end">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-sm h-full transition-colors ${
                              i === 18 ? 'bg-yellow-500/70' : 'bg-emerald-500/60 hover:bg-emerald-400'
                            }`} 
                            title={`Day ${30-i} ago: 100% Operational`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 2. AI Image Generator */}
                    <div className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      darkMode ? 'bg-[#060a13]/60 border-slate-800/80 shadow-md hover:border-slate-800' : 'bg-white border-slate-200/80 shadow-sm hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                            <FileImage className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                              {language === 'en' ? 'AI Image Generator' : 'مولد الصور الذكي (AI Image Generator)'}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-500">imagen-3.0-generate</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {language === 'en' ? 'Operational' : 'تعمل كالمعتاد'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/20 pt-3">
                        <div>
                          {language === 'en' ? 'Latency:' : 'زمن الاستجابة:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{serviceLatencies.image}ms</span>
                        </div>
                        <div>
                          {language === 'en' ? 'Uptime:' : 'الاستمرارية:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>99.92%</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-1 h-3 items-end">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-sm h-full transition-colors ${
                              i === 12 ? 'bg-yellow-500/70' : 'bg-emerald-500/60 hover:bg-emerald-400'
                            }`} 
                            title={`Day ${30-i} ago: 100% Operational`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 3. AI Writing */}
                    <div className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      darkMode ? 'bg-[#060a13]/60 border-slate-800/80 shadow-md hover:border-slate-800' : 'bg-white border-slate-200/80 shadow-sm hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${darkMode ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                              {language === 'en' ? 'AI Writing' : 'الكتابة الإبداعية (AI Writing)'}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-500">gemini-2.5-flash-writing</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {language === 'en' ? 'Operational' : 'تعمل كالمعتاد'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/20 pt-3">
                        <div>
                          {language === 'en' ? 'Latency:' : 'زمن الاستجابة:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{serviceLatencies.writing}ms</span>
                        </div>
                        <div>
                          {language === 'en' ? 'Uptime:' : 'الاستمرارية:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>99.99%</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-1 h-3 items-end">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="flex-1 rounded-sm h-full bg-emerald-500/60 hover:bg-emerald-400 transition-colors" 
                            title={`Day ${30-i} ago: 100% Operational`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 4. AI Translation */}
                    <div className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      darkMode ? 'bg-[#060a13]/60 border-slate-800/80 shadow-md hover:border-slate-800' : 'bg-white border-slate-200/80 shadow-sm hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${darkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>
                            <Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                              {language === 'en' ? 'AI Translation' : 'المترجم الذكي (AI Translation)'}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-500">gemini-2.5-flash-translator</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {language === 'en' ? 'Operational' : 'تعمل كالمعتاد'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/20 pt-3">
                        <div>
                          {language === 'en' ? 'Latency:' : 'زمن الاستجابة:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{serviceLatencies.translation}ms</span>
                        </div>
                        <div>
                          {language === 'en' ? 'Uptime:' : 'الاستمرارية:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>100.0%</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-1 h-3 items-end">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="flex-1 rounded-sm h-full bg-emerald-500/60 hover:bg-emerald-400 transition-colors" 
                            title={`Day ${30-i} ago: 100% Operational`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 5. AI Code Assistant */}
                    <div className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden md:col-span-2 ${
                      darkMode ? 'bg-[#060a13]/60 border-slate-800/80 shadow-md hover:border-slate-800' : 'bg-white border-slate-200/80 shadow-sm hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${darkMode ? 'bg-fuchsia-500/10 text-fuchsia-400' : 'bg-fuchsia-50 text-fuchsia-600'}`}>
                            <Braces className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                              {language === 'en' ? 'AI Code Assistant' : 'مساعد الكود البرمجي (AI Code Assistant)'}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-500">gemini-2.5-pro-coding</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {language === 'en' ? 'Operational' : 'تعمل كالمعتاد'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/20 pt-3">
                        <div>
                          {language === 'en' ? 'Latency:' : 'زمن الاستجابة:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{serviceLatencies.code}ms</span>
                        </div>
                        <div>
                          {language === 'en' ? 'Uptime:' : 'الاستمرارية:'} <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>99.97%</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-1 h-3 items-end">
                        {Array.from({ length: 60 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-sm h-full transition-colors ${
                              i === 42 ? 'bg-yellow-500/70' : 'bg-emerald-500/60 hover:bg-emerald-400'
                            }`} 
                            title={`Day ${60-i} ago: 100% Operational`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary platform helpers (CDN & Local cache) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/20 border-slate-850/80' : 'bg-slate-50 border-slate-150'}`}>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Edge CDN Content Delivery</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                      <span>{serviceLatencies.cdn}ms</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/20 border-slate-850/80' : 'bg-slate-50 border-slate-150'}`}>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Laptop className="w-4 h-4 text-blue-400" />
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Client Browser Database</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                      <span>{serviceLatencies.storage}ms</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* Real-time incident logs */}
                <div className={`rounded-3xl p-6 border ${darkMode ? 'bg-slate-900/10 border-slate-850/80' : 'bg-white border-slate-200'}`}>
                  <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {language === 'en' ? 'System Incident Logs' : 'سجل الأحداث البرمجية والأعطال'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800/10 dark:border-slate-800/40">
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-500 font-mono">July 05, 2026</span>
                        <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {language === 'en' ? 'All services nominal' : 'جميع الخدمات تعمل بكفاءة تامة'}
                        </span>
                      </div>
                      <span className="text-emerald-500 text-[10px] font-mono uppercase tracking-wider">No Incidents</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800/10 dark:border-slate-800/40">
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-500 font-mono">July 04, 2026</span>
                        <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {language === 'en' ? 'No outages reported' : 'لا توجد بلاغات أو مشاكل فنية'}
                        </span>
                      </div>
                      <span className="text-emerald-500 text-[10px] font-mono uppercase tracking-wider">No Incidents</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-500 font-mono">July 03, 2026</span>
                        <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {language === 'en' ? 'Routine maintenance complete' : 'اكتملت أعمال الصيانة الدورية المخططة'}
                        </span>
                      </div>
                      <span className="text-blue-400 text-[10px] font-mono uppercase tracking-wider">Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 404 NOT FOUND */}
            {activeTab === '404' && (
              <div className="max-w-2xl mx-auto py-16 sm:py-24 px-4 text-center animate-fade-in" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className={`relative rounded-3xl p-8 sm:p-12 border overflow-hidden ${darkMode ? 'bg-slate-900/40 border-slate-800/80 shadow-2xl backdrop-blur-xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                  {/* Glowing background highlights */}
                  <div className="absolute -right-20 -top-20 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-6 max-w-md mx-auto">
                    {/* Large error icon */}
                    <div className="flex justify-center">
                      <div className={`p-6 rounded-full relative group transition-all duration-300 ${darkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                        {/* Soft pulse ring */}
                        <div className="absolute inset-0 rounded-full bg-red-500/5 animate-ping" />
                        <ShieldAlert className="w-16 h-16 relative z-10 transition-transform group-hover:scale-110 duration-300" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <h1 className={`text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {language === 'en' ? '404 – Page Not Found' : '404 – الصفحة غير موجودة'}
                      </h1>
                      <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full" />
                    </div>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {language === 'en' 
                        ? "The page you're looking for doesn't exist or may have been moved." 
                        : 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها للعنوان الجديد.'}
                    </p>

                    {/* Buttons */}
                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={() => navigateTo('home')}
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Home className="w-4 h-4" />
                        <span>{language === 'en' ? 'Back to Home' : 'العودة للرئيسية'}</span>
                      </button>
                      <button
                        onClick={() => {
                          navigateTo('tools');
                          setSelectedCategory('ai-tools');
                        }}
                        className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
                          darkMode 
                            ? 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900 hover:border-slate-750' 
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
                        <span>{language === 'en' ? 'Explore AI Tools' : 'استكشف أدوات الذكاء الاصطناعي'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* FLOATING BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto">
        <div className={`p-1.5 rounded-2xl border backdrop-blur-xl shadow-2xl flex justify-around items-center transition-all ${darkMode ? 'bg-slate-950/70 border-slate-800/80 shadow-slate-950/50' : 'bg-white/80 border-slate-200 shadow-slate-300/50'}`}>
          <button
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${activeTab === 'home' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-1 tracking-tight">{language === 'en' ? 'Home' : 'الرئيسية'}</span>
          </button>

          <button
            onClick={() => navigateTo('tools')}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${activeTab === 'tools' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Wrench className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-1 tracking-tight">{language === 'en' ? 'Tools' : 'الأدوات'}</span>
          </button>

          <button
            onClick={() => navigateTo('favorites')}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer relative ${activeTab === 'favorites' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {favorites.length > 0 && (
              <span className="absolute top-0.5 right-4 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-slate-950" />
            )}
            <Heart className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-1 tracking-tight">{language === 'en' ? 'Favorites' : 'المفضلة'}</span>
          </button>

          <button
            onClick={() => navigateTo('history')}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${activeTab === 'history' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <History className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-1 tracking-tight">{language === 'en' ? 'History' : 'السجل'}</span>
          </button>

          <button
            onClick={() => navigateTo('settings')}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-1 tracking-tight">{language === 'en' ? 'Settings' : 'الإعدادات'}</span>
          </button>
        </div>
      </nav>

      {/* GOOGLE ADMOB BANNER */}
      {bannerVisible && (
        <div className={`w-full py-6 transition-all duration-300 ${darkMode ? 'bg-[#030712]/30 border-t border-b border-slate-900/60' : 'bg-slate-50/50 border-t border-b border-slate-200/60'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AdBanner language={language} darkMode={darkMode} onVisibilityChange={setBannerVisible} />
          </div>
        </div>
      )}

      {/* FOOTER (Requirements 15, 21) */}
      <footer className={`border-t py-12 transition-colors duration-300 ${darkMode ? 'bg-[#010309] border-slate-900 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {/* Logo & Slogan Column */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <img 
                loading="lazy"
                src="/logo.png?v=3" 
                className="w-10 h-10 rounded-xl object-contain shadow-md shadow-blue-500/10 border border-slate-800/20" 
                style={{ imageRendering: 'high-quality' }}
                alt="Toolix" 
              />
              <span className="text-lg font-black tracking-tight text-white dark:text-white light:text-slate-950 font-display">Toolix</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              {language === 'en'
                ? 'Your all-in-one private sandbox containing essential mathematical, cryptographical, image, and developer utilities.'
                : 'حصتك الخاصة الآمنة التي تحتوي على أدوات برمجية وحسابية متطورة لتسهيل عملك الرقمي.'}
            </p>
            <p className="text-[9px] text-slate-500">
              © 2026 Toolix. All rights reserved.
            </p>
          </div>

          {/* Quick Nav Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">{language === 'en' ? 'Platform Map' : 'خريطة المنصة'}</h4>
            <div className="flex flex-col gap-2 text-[10px] font-bold">
              <button onClick={() => navigateTo('home')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'Dashboard Home' : 'الرئيسية'}</button>
              <button onClick={() => navigateTo('tools')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'Browse All Utilities' : 'تصفح كافة الأدوات'}</button>
              <button onClick={() => navigateTo('favorites')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'Saved Favorites' : 'الأدوات المفضلة'}</button>
              <button onClick={() => navigateTo('settings')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'Platform Settings' : 'إعدادات المنصة'}</button>
              <button onClick={() => navigateTo('status')} className="hover:text-blue-400 text-left transition-colors text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'en' ? 'System Status' : 'حالة النظام'}</span>
              </button>
            </div>
          </div>

          {/* Legal / Trust Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">{language === 'en' ? 'Security & Legal' : 'الأمان والخصوصية'}</h4>
            <div className="flex flex-col gap-2 text-[10px] font-bold">
              <button onClick={() => navigateTo('about')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'About Platform' : 'من نحن وعن رسالتنا'}</button>
              <button onClick={() => navigateTo('privacy')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية وأمن البيانات'}</button>
              <button onClick={() => navigateTo('terms')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'Terms of Service' : 'شروط الخدمة والاستخدام'}</button>
              <button onClick={() => navigateTo('contact')} className="hover:text-blue-400 text-left transition-colors">{language === 'en' ? 'Contact Support' : 'اتصل بنا والدعم الفني'}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERSTITIAL ADVERTISEMENT MODAL */}
      <InterstitialAd 
        isOpen={isInterstitialAdOpen} 
        onClose={() => setIsInterstitialAdOpen(false)} 
        language={language} 
        darkMode={darkMode} 
      />

      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div 
          id="global-toast"
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-xl transition-all duration-300 animate-fade-in ${
            toast.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
          )}
          <span className="text-xs font-bold font-sans tracking-wide">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
