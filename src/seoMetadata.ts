import { Tool } from './types';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

export function getToolSEO(tool: Tool, language: 'en' | 'ar' = 'en'): SEOData {
  const isEn = language === 'en';
  
  // Pre-defined high-intent SEO meta overrides for popular tools
  const overrides: Record<string, { en: Partial<SEOData>; ar: Partial<SEOData> }> = {
    'pdf-merger': {
      en: {
        title: 'Merge PDF Online Free - Combine PDF Files - Toolix',
        description: 'Easily merge and combine multiple PDF documents into a single consolidated PDF file online. 100% private, client-side, secure, and fast.',
        keywords: 'merge pdf, combine pdf, join pdf files, merge pdf online free'
      },
      ar: {
        title: 'دمج ملفات PDF مجاناً اون لاين - تجميع مستندات PDF - توليكس',
        description: 'ادمج عدة ملفات PDF معاً في مستند واحد متكامل اون لاين بسرعة وأمان تام. حماية خصوصية 100% بدون رفع الملفات إلى أي خادم.',
        keywords: 'دمج pdf, تجميع ملفات pdf, دمج بي دي اف, دمج ملفات بي دي اف مجانا'
      }
    },
    'image-compressor': {
      en: {
        title: 'Compress Image Online Free - Reduce Photo Size - Toolix',
        description: 'Optimize and compress PNG, JPEG, and JPG images client-side without losing visual quality. Reduce photo size instantly in your browser.',
        keywords: 'compress image, reduce image size, image optimizer, photo compressor'
      },
      ar: {
        title: 'ضغط الصور اون لاين مجاناً - تصغير حجم الصور PNG/JPG - توليكس',
        description: 'اضغط وصغر حجم صور PNG و JPEG مباشرة في متصفحك دون خسارة الجودة. حماية كاملة لخصوصيتك مع معالجة سريعة للغاية.',
        keywords: 'ضغط الصور, تصغير حجم الصور, تقليل حجم الصورة, مضغط صور مجاني'
      }
    },
    'password-generator': {
      en: {
        title: 'Secure Password Generator - Strong Custom Passwords - Toolix',
        description: 'Generate highly secure, random passwords with custom lengths and character selections. Runs entirely client-side to ensure absolute safety.',
        keywords: 'password generator, secure password, strong password, random password generator'
      },
      ar: {
        title: 'مولد كلمات المرور القوية - إنشاء كلمة سر عشوائية آمنة - توليكس',
        description: 'ولد كلمات مرور قوية وعشوائية ومخصصة مع حماية تامة. معالجة محلية بالكامل في متصفحك لضمان أمان حساباتك.',
        keywords: 'مولد كلمات المرور, انشاء كلمة سر قوية, توليد كلمات مرور, مولد باسورد'
      }
    },
    'word-counter': {
      en: {
        title: 'Online Word Counter - Character, Paragraph & Line Tracker - Toolix',
        description: 'Count words, characters, spaces, paragraphs, and estimate reading time of your text in real-time. Clean, private writing helper.',
        keywords: 'word counter, character count, text editor tool, word count online'
      },
      ar: {
        title: 'عداد الكلمات والحروف اون لاين - حساب طول النصوص والفقرات - توليكس',
        description: 'احسب عدد الكلمات والحروف والفقرات بدقة مع تقدير وقت القراءة لنصوصك في الوقت الفعلي. أداة كتابة آمنة وخاصة بالكامل.',
        keywords: 'عداد الكلمات, حساب عدد الكلمات, عد الحروف, عداد الحروف والرموز'
      }
    },
    'qr-generator': {
      en: {
        title: 'Free QR Code Generator - Custom QR Codes Online - Toolix',
        description: 'Create beautiful, custom QR codes for URLs, text, Wi-Fi networks, and contact details. Download instantly as vector SVG or PNG.',
        keywords: 'qr code generator, make qr code, free qr generator, custom qr'
      },
      ar: {
        title: 'صانع الرمز الشريطي QR Code مجاناً - تصميم كود QR مخصص - توليكس',
        description: 'أنشئ رموز QR مخصصة للروابط والنصوص وشبكات الواي فاي والاتصال. تنزيل فوري عالي الدقة كملف PNG أو SVG.',
        keywords: 'صانع كود qr, تصميم كود qr, توليد كود qr مجانا, صانع باركود'
      }
    },
    'bmi-calculator': {
      en: {
        title: 'BMI Calculator Free - Body Mass Index Health Tracker - Toolix',
        description: 'Calculate your Body Mass Index (BMI) instantly using metric or imperial units. Get insights into your health status and ideal weight.',
        keywords: 'bmi calculator, body mass index, calculate bmi, weight status'
      },
      ar: {
        title: 'حاسبة مؤشر كتلة الجسم BMI - حساب الوزن المثالي والكتلة - توليكس',
        description: 'احسب مؤشر كتلة الجسم (BMI) الخاص بك فوراً مع إرشادات دقيقة حول حالتك الصحية ووزنك المثالي بناءً على الطول والوزن.',
        keywords: 'حاسبة bmi, حساب مؤشر كتلة الجسم, حاسبة كتلة الجسم, الوزن المثالي'
      }
    },
    'loan-calculator': {
      en: {
        title: 'Loan Amortization Calculator - Monthly Payment Estimator - Toolix',
        description: 'Calculate monthly loan payments, interest charges, and amortization schedules. Professional, secure financial planning.',
        keywords: 'loan calculator, monthly payment, interest calculator, amortization schedule'
      },
      ar: {
        title: 'حاسبة القروض والتمويل - تقدير القسط الشهري والفوائد - توليكس',
        description: 'احسب قيمة الأقساط الشهرية للقروض والتمويل والفوائد الإجمالية مع جدول السداد المالي التفصيلي بسهولة ودقة.',
        keywords: 'حاسبة قروض, حساب قسط القرض, حاسبة تمويل, جدول سداد القرض'
      }
    }
  };

  const override = overrides[tool.id];
  if (override) {
    return {
      title: (isEn ? override.en.title : override.ar.title) || `${tool.name} | Toolix`,
      description: (isEn ? override.en.description : override.ar.description) || `${tool.description} | Toolix`,
      keywords: (isEn ? override.en.keywords : override.ar.keywords) || (tool.tags || []).join(', ')
    };
  }

  // Fallback dynamic SEO generation rules
  let actionPrefix = isEn ? 'Free Online Utility' : 'أداة مجانية لـ';
  
  if (tool.category === 'pdf-tools') {
    actionPrefix = isEn ? 'Free Online PDF Utility' : 'أداة بي دي إف لـ';
  } else if (tool.category === 'image-tools') {
    actionPrefix = isEn ? 'Free Online Image Editor' : 'أداة صور لـ';
  } else if (tool.category === 'text-tools') {
    actionPrefix = isEn ? 'Professional Text Helper' : 'أداة نصوص لـ';
  } else if (tool.category === 'developer-tools') {
    actionPrefix = isEn ? 'Developer Utility' : 'أداة مطورين لـ';
  } else if (tool.category === 'security-tools') {
    actionPrefix = isEn ? 'Secure Privacy Utility' : 'أداة حماية لـ';
  } else if (tool.category === 'calculators') {
    actionPrefix = isEn ? 'Accurate Calculator' : 'حاسبة رقمية لـ';
  } else if (tool.category === 'converters') {
    actionPrefix = isEn ? 'Instant Converter' : 'محول رقمي لـ';
  } else if (tool.category === 'generators') {
    actionPrefix = isEn ? 'Smart Generator' : 'مولد ذكي لـ';
  } else if (tool.category === 'ai-tools') {
    actionPrefix = isEn ? 'AI-Powered Assistant' : 'مساعد ذكاء اصطناعي لـ';
  }

  const cleanName = tool.name;
  const cleanDesc = tool.description;
  const cleanArName = tool.arabicName;
  const cleanArDesc = tool.arabicDescription;

  const title = isEn
    ? `${cleanName} - ${actionPrefix} | Toolix`
    : `${cleanArName} - ${actionPrefix} ${cleanArName} | توليكس`;

  const description = isEn
    ? `${cleanDesc} Secure, 100% private client-side processing in your browser. No files are ever sent to servers.`
    : `${cleanArDesc} أداة آمنة تعمل 100% داخل المتصفح بشكل خاص وسريع للغاية لحماية بياناتك من أي تسريب.`;

  const keywords = (tool.tags || []).join(', ') || (isEn ? `${cleanName.toLowerCase()}, free tool, online helper` : `${cleanArName}, أداة مجانية, اون لاين`);

  return { title, description, keywords };
}
