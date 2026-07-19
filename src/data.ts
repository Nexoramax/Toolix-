import { Tool } from './types';

export const tools: Tool[] = [
  // --- PDF Tools ---
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    arabicName: 'دمج ملفات PDF',
    description: 'Merge multiple PDF files into a single consolidated document.',
    arabicDescription: 'ادمج عدة ملفات PDF معاً في مستند واحد متكامل.',
    category: 'pdf-tools',
    iconName: 'Files',
    isPopular: true,
    isFeatured: true,
    tags: ['pdf', 'merge', 'combine', 'join', 'دمج', 'تجميع']
  },
  {
    id: 'pdf-splitter',
    name: 'Split PDF',
    arabicName: 'تقسيم ملف PDF',
    description: 'Split a PDF document into separate page ranges or single pages.',
    arabicDescription: 'قسم مستند PDF إلى صفحات منفصلة أو نطاق صفحات محدد.',
    category: 'pdf-tools',
    iconName: 'Files',
    tags: ['pdf', 'split', 'divider', 'extract', 'تقسيم', 'فصل']
  },
  {
    id: 'pdf-compressor',
    name: 'Compress PDF',
    arabicName: 'ضغط ملف PDF',
    description: 'Optimize and reduce the file size of your PDF documents.',
    arabicDescription: 'قلل حجم ملفات PDF وحسّنها للمشاركة السهلة عبر الإنترنت.',
    category: 'pdf-tools',
    iconName: 'Minimize',
    isTrending: true,
    tags: ['pdf', 'compress', 'shrink', 'size', 'ضغط', 'حجم']
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    arabicName: 'تحويل الصور إلى PDF',
    description: 'Convert multiple images into a clean, single PDF document.',
    arabicDescription: 'حول مجموعة من الصور إلى مستند PDF واحد نظيف ومنظم.',
    category: 'pdf-tools',
    iconName: 'FileImage',
    isFeatured: true,
    tags: ['pdf', 'convert', 'image to pdf', 'jpg to pdf', 'صور بي دي اف', 'تحويل']
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text Converter',
    arabicName: 'تحويل PDF إلى نص',
    description: 'Extract raw text contents directly from your PDF documents.',
    arabicDescription: 'استخرج النصوص الخام مباشرة من داخل ملفات الـ PDF.',
    category: 'pdf-tools',
    iconName: 'FileText',
    tags: ['pdf', 'text', 'extract', 'convert', 'نص', 'استخراج']
  },

  // --- Image Tools ---
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    arabicName: 'مضغط الصور',
    description: 'Compress PNG/JPEG images client-side without losing quality.',
    arabicDescription: 'اضغط صور PNG/JPEG مباشرة في متصفحك دون خسارة الجودة.',
    category: 'image-tools',
    iconName: 'Minimize',
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    tags: ['compress', 'image size', 'png', 'jpeg', 'optimize', 'ضغط صور', 'حجم']
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    arabicName: 'تغيير حجم الصور',
    description: 'Resize image dimensions (width and height) while keeping quality.',
    arabicDescription: 'غير أبعاد الصور (العرض والارتفاع) مع الحفاظ على الجودة والنسب.',
    category: 'image-tools',
    iconName: 'Minimize',
    tags: ['resize', 'dimension', 'width', 'height', 'scale', 'مقاس', 'أبعاد']
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    arabicName: 'قص الصور',
    description: 'Crop and trim unwanted outer areas of your images easily.',
    arabicDescription: 'قص واقتطع الأجزاء غير المرغوبة من صورك بدقة وسهولة.',
    category: 'image-tools',
    iconName: 'Minimize',
    tags: ['crop', 'trim', 'cut', 'aspect ratio', 'قص', 'تأطير']
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    arabicName: 'تحويل JPG إلى PNG',
    description: 'Convert JPEG/JPG images to PNG format instantly in your browser.',
    arabicDescription: 'حول الصور من صيغة JPG/JPEG إلى صيغة PNG الشفافة فوراً.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['jpg', 'png', 'convert', 'format', 'تحويل', 'صيغة']
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    arabicName: 'تحويل PNG إلى JPG',
    description: 'Convert PNG files to JPEG/JPG format with background selection.',
    arabicDescription: 'حول الصور من صيغة PNG إلى صيغة JPG/JPEG بسهولة.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['png', 'jpg', 'convert', 'format', 'تحويل', 'خلفية']
  },
  {
    id: 'image-filter',
    name: 'Image Filter & Adjuster',
    arabicName: 'فلاتر ومعدل الصور',
    description: 'Apply beautiful CSS filters like grayscale, sepia, brightness, or contrast.',
    arabicDescription: 'طبق فلاتر وتعديلات بصرية رائعة كالسطوع والتباين والأبيض والأسود.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['filter', 'adjust', 'brightness', 'contrast', 'sepia', 'فلاتر', 'تعديل']
  },
  {
    id: 'color-picker',
    name: 'Image Color Picker',
    arabicName: 'مستخرج الألوان من الصور',
    description: 'Extract exact HEX, RGB, or HSL color values from any uploaded image.',
    arabicDescription: 'استخرج قيم الألوان الدقيقة HEX أو RGB أو HSL من أي صورة ترفعها.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['color', 'picker', 'extract', 'hex', 'rgb', 'ألوان', 'قطارة']
  },
  {
    id: 'base64-to-image',
    name: 'Base64 to Image',
    arabicName: 'تحويل Base64 إلى صورة',
    description: 'Convert raw Base64 strings back into renderable PNG/JPG images.',
    arabicDescription: 'حول أكواد ونصوص Base64 المشفرة مجدداً إلى صور قابلة للعرض والتحميل.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['base64', 'image', 'decode', 'render', 'تحويل', 'كود']
  },

  // --- Text Tools ---
  {
    id: 'word-counter',
    name: 'Word Counter',
    arabicName: 'عداد الكلمات',
    description: 'Count words, characters, paragraphs, and reading times of your text.',
    arabicDescription: 'احسب عدد الكلمات، الحروف، الفقرات، ووقت القراءة المأمول لنصوصك.',
    category: 'text-tools',
    iconName: 'FileText',
    isPopular: true,
    tags: ['word', 'count', 'characters', 'reading time', 'text', 'كلمات', 'أحرف']
  },
  {
    id: 'char-counter',
    name: 'Character Counter',
    arabicName: 'عداد الحروف والرموز',
    description: 'Count exact characters with or without spaces, words, and lines.',
    arabicDescription: 'احسب عدد الحروف بدقة مع أو بدون المسافات، مع إحصائيات الكلمات والأسطر.',
    category: 'text-tools',
    iconName: 'Hash',
    tags: ['characters', 'letters', 'spaces', 'char count', 'حروف', 'عداد']
  },
  {
    id: 'text-cleaner',
    name: 'Text Cleaner',
    arabicName: 'مُطهر ومُنظف النصوص',
    description: 'Remove extra spaces, blank lines, HTML tags, or specific symbols.',
    arabicDescription: 'احذف المسافات الزائدة، الأسطر الفارغة، وسوم HTML، أو رموز محددة لتنظيف نصوصك.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['clean', 'text', 'spaces', 'remove', 'تنظيف', 'فراغات']
  },
  {
    id: 'text-sorter',
    name: 'Text Sorter',
    arabicName: 'فرز وترتيب النصوص',
    description: 'Sort lines of text alphabetically, reverse order, length, or shuffle.',
    arabicDescription: 'رتب أسطر النصوص والفقرات أبجدياً، عكسياً، بحسب الطول، أو عشوائياً.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['sort', 'alphabetical', 'reverse', 'shuffle', 'ترتيب', 'فرز']
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    arabicName: 'محول حالة الحروف الإنجليزية',
    description: 'Convert English text to UPPERCASE, lowercase, Title Case, or Sentence case.',
    arabicDescription: 'حول نصوصك الإنجليزية إلى حروف كبيرة، صغيرة، حالة العناوين أو الجمل.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['case', 'upper', 'lower', 'title', 'sentence', 'حالة الحروف']
  },
  {
    id: 'markdown-to-html',
    name: 'Markdown to HTML',
    arabicName: 'تحويل Markdown إلى HTML',
    description: 'Write Markdown syntax and instantly convert or preview as clean HTML code.',
    arabicDescription: 'اكتب بنظام الماركداون وحوله فوراً إلى كود HTML مع معاينة حية.',
    category: 'text-tools',
    iconName: 'FileText',
    tags: ['markdown', 'html', 'convert', 'preview', 'ماركداون', 'تحويل']
  },
  {
    id: 'text-diff',
    name: 'Text Diff Checker',
    arabicName: 'مقارنة وفحص الفروق النصية',
    description: 'Compare two text blocks side-by-side to highlight differences and edits.',
    arabicDescription: 'قارن بين نصين جنباً إلى جنب مع إبراز الفروق والتعديلات بدقة.',
    category: 'text-tools',
    iconName: 'FileText',
    tags: ['diff', 'compare', 'difference', 'match', 'مقارنة', 'فروق']
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech Reader',
    arabicName: 'قارئ النصوص الصوتي',
    description: 'Convert text into natural sounding speech audio using browser TTS.',
    arabicDescription: 'حول نصوصك المكتوبة إلى صوت مسموع طبيعي بفضل ميزة TTS بالمتصفح.',
    category: 'text-tools',
    iconName: 'Play',
    tags: ['speech', 'tts', 'audio', 'read', 'صوت', 'قارئ']
  },

  // --- Developer Tools ---
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    arabicName: 'منسق ومعالج JSON',
    description: 'Beautify, minify, validate, and parse raw JSON strings instantly.',
    arabicDescription: 'جمل، صغر، تحقق وافحص نصوص JSON الخام فوراً.',
    category: 'developer-tools',
    iconName: 'Braces',
    isPopular: true,
    isTrending: true,
    tags: ['json', 'format', 'minify', 'beautify', 'تنسيق جي سون']
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    arabicName: 'مدقق نصوص JSON',
    description: 'Check raw JSON syntax correctness with detailed error diagnostics.',
    arabicDescription: 'افحص ودقق صحة نصوص JSON مع تحديد أسباب ومواقع الأخطاء إن وجدت.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['json validator', 'lint json', 'syntax', 'تدقيق جي سون']
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    arabicName: 'مشفّر Base64',
    description: 'Encode plain text strings into secure, portable Base64 standard.',
    arabicDescription: 'شفر وحول النصوص العادية إلى ترميز Base64 القياسي بسهولة.',
    category: 'developer-tools',
    iconName: 'Key',
    tags: ['base64', 'encode', 'crypt', 'تشفير', 'ترميز']
  },
  {
    id: 'base64-decoder',
    name: 'Base64 Decoder',
    arabicName: 'مفكك تشفير Base64',
    description: 'Decode raw Base64 strings back into legible human text.',
    arabicDescription: 'فك ترميز أكواد Base64 واسترجع النصوص الأصلية المقروءة.',
    category: 'developer-tools',
    iconName: 'Key',
    tags: ['base64', 'decode', 'decrypt', 'فك تشفير', 'فك ترميز']
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    arabicName: 'ترميز الروابط URL',
    description: 'Safely encode URL queries and parameters for web safe transmission.',
    arabicDescription: 'شفر الروابط ومكوناتها لتصبح آمنة تماماً للاستخدام على الويب.',
    category: 'developer-tools',
    iconName: 'Link',
    tags: ['url', 'encode', 'percent-encoding', 'رابط', 'ترميز']
  },
  {
    id: 'url-decoder',
    name: 'URL Decoder',
    arabicName: 'فك ترميز الروابط URL',
    description: 'Decode URL parameters and web strings back to clear plain text.',
    arabicDescription: 'فك تشفير الروابط والمكونات المشفرة ورجعها لشكلها الأصلي.',
    category: 'developer-tools',
    iconName: 'Link',
    tags: ['url', 'decode', 'plain', 'رابط', 'فك ترميز']
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    arabicName: 'مولد معرّفات UUID',
    description: 'Generate cryptographic-quality random UUID (v4) identifiers instantly.',
    arabicDescription: 'ولد معرّفات فريدة عشوائية آمنة وصالحة للاستخدام البرمجي.',
    category: 'developer-tools',
    iconName: 'Fingerprint',
    tags: ['uuid', 'guid', 'id', 'generator', 'معرف', 'توليد']
  },
  {
    id: 'html-formatter',
    name: 'HTML Formatter',
    arabicName: 'منسق أكواد HTML',
    description: 'Format, beautify, and indent raw HTML code snippets for legibility.',
    arabicDescription: 'نسق وجمل أكواد HTML ورتب المسافات البادئة لتسهيل قراءتها وفحصها.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['html', 'format', 'beautify', 'indent', 'تنسيق', 'كود']
  },
  {
    id: 'html-minifier',
    name: 'HTML Minifier',
    arabicName: 'مقلص ومصغر HTML',
    description: 'Remove redundant spaces, comments, and empty lines to shrink HTML size.',
    arabicDescription: 'احذف الفراغات الزائدة، التعليقات والأسطر الفارغة لتقليص حجم ملف الـ HTML.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['html', 'minify', 'compress', 'shrink', 'تصغير', 'كود']
  },
  {
    id: 'css-minifier-formatter',
    name: 'CSS Beautifier & Minifier',
    arabicName: 'منسق ومقلص ملفات CSS',
    description: 'Format raw CSS rules to make them readable, or minify them for deployment.',
    arabicDescription: 'نسق أكواد الـ CSS أو قلصها لحجم أصغر تمهيداً لرفعها لموقعك.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['css', 'minify', 'format', 'beautify', 'تنسيق', 'تصغير']
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    arabicName: 'منسق استعلامات SQL',
    description: 'Format complex SQL queries into a clean, highly structured, readable script.',
    arabicDescription: 'رتب ونسق استعلامات SQL المعقدة بطريقة برمجية منظمة وسهلة القراءة.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['sql', 'format', 'beautify', 'query', 'استعلام', 'تنسيق']
  },

  // --- Security Tools ---
  {
    id: 'password-generator',
    name: 'Password Generator',
    arabicName: 'مولد كلمات المرور',
    description: 'Generate secure, highly customizable random passwords.',
    arabicDescription: 'ولد كلمات مرور عشوائية قوية وآمنة وقابلة للتخصيص بالكامل.',
    category: 'security-tools',
    iconName: 'Lock',
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    tags: ['password', 'secure', 'generator', 'security', 'كلمة مرور', 'أمان']
  },
  {
    id: 'password-checker',
    name: 'Password Strength Checker',
    arabicName: 'فاحص قوة كلمة المرور',
    description: 'Analyze entropy, security level, and receive suggestions for improvement.',
    arabicDescription: 'حلل مدى قوة وأمان كلمة المرور الخاصة بك مع نصائح فورية لتقويتها.',
    category: 'security-tools',
    iconName: 'ShieldCheck',
    isFeatured: true,
    tags: ['password', 'strength', 'checker', 'entropy', 'فحص', 'قوة']
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    arabicName: 'مولد الهاش والتشفير',
    description: 'Generate SHA-256, SHA-512, or simple MD5 hashes client-side.',
    arabicDescription: 'أنشئ هاش آمن (SHA-256، SHA-512 أو MD5) مباشرة لنصوصك بالمتصفح.',
    category: 'security-tools',
    iconName: 'Hash',
    tags: ['hash', 'sha256', 'sha512', 'md5', 'crypt', 'تشفير', 'هاش']
  },

  // --- Calculators ---
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    arabicName: 'حاسبة مؤشر كتلة الجسم',
    description: 'Calculate your BMI index and see your immediate health category status.',
    arabicDescription: 'احسب مؤشر كتلة جسمك (BMI) واعرف وضعك الصحي والوزن المثالي لك.',
    category: 'calculators',
    iconName: 'Activity',
    isPopular: true,
    tags: ['bmi', 'health', 'weight', 'height', 'diet', 'كتلة الجسم', 'صحة']
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    arabicName: 'حاسبة العمر',
    description: 'Calculate your exact age in years, months, days, and seconds.',
    arabicDescription: 'احسب عمرك الدقيق بالسنوات والأشهر والأيام والثواني بدقة.',
    category: 'calculators',
    iconName: 'Calendar',
    isPopular: true,
    isFeatured: true,
    tags: ['age', 'years', 'months', 'birthday', 'عمر', 'ميلاد']
  },
  {
    id: 'age-difference-calculator',
    name: 'Age Difference Calculator',
    arabicName: 'حاسبة فارق السن',
    description: 'Calculate the exact difference in age between two people.',
    arabicDescription: 'احسب الفارق الزمني الدقيق بالسنوات والأشهر والأيام بين شخصين.',
    category: 'calculators',
    iconName: 'Calendar',
    tags: ['age difference', 'compare age', 'years diff', 'فارق السن', 'فرق العمر']
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    arabicName: 'حاسبة القروض والتمويل',
    description: 'Compute monthly mortgage payments, interest rates, and loan durations.',
    arabicDescription: 'احسب قيمة القسط الشهري، إجمالي الفائدة، وتكلفة التمويل والقروض.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['loan', 'mortgage', 'interest', 'payment', 'قرض', 'قسط', 'تمويل']
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    arabicName: 'حاسبة التخفيضات والخصومات',
    description: 'Calculate your savings, sale price, and exact final costs instantly.',
    arabicDescription: 'احسب السعر بعد الخصم، مقدار التوفير، والنسبة المئوية المخصومة.',
    category: 'calculators',
    iconName: 'Percent',
    isTrending: true,
    tags: ['discount', 'sale', 'save', 'percentage', 'خصم', 'تخفيض', 'توفير']
  },
  {
    id: 'vat-calculator',
    name: 'VAT / Tax Calculator',
    arabicName: 'حاسبة ضريبة القيمة المضافة',
    description: 'Add or subtract VAT (Value Added Tax) or general sales tax from any amount.',
    arabicDescription: 'احسب قيمة الضريبة المضافة (VAT) أو ضريبة المبيعات بالزيادة أو الخصم.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['vat', 'tax', 'sales tax', 'add', 'exclude', 'ضريبة', 'قيمة مضافة']
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    arabicName: 'حاسبة النسبة المئوية',
    description: 'Find percentage increase, decrease, or simple part of a total amount.',
    arabicDescription: 'احسب الزيادة، النقصان، أو النسبة المئوية البسيطة من قيمة إجمالية.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['percent', 'ratio', 'portion', 'fraction', 'نسبة مئوية', 'حساب']
  },

  // --- Converters ---
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    arabicName: 'محول الوحدات',
    description: 'Convert between different units of length, mass, temp, area, and speed.',
    arabicDescription: 'حول بين الوحدات المختلفة للمسافة، الكتلة، الحرارة، المساحة والسرعة.',
    category: 'converters',
    iconName: 'Scale',
    isPopular: true,
    tags: ['unit', 'convert', 'length', 'weight', 'temperature', 'وحدات', 'تحويل']
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    arabicName: 'محول العملات',
    description: 'Convert between world currencies with instant exchange rates.',
    arabicDescription: 'حول بين العملات المختلفة بأسعار صرف فورية دقيقة ومثبتة.',
    category: 'converters',
    iconName: 'Coins',
    isPopular: true,
    tags: ['currency', 'money', 'exchange', 'usd', 'eur', 'عملة', 'تحويل عملات']
  },
  {
    id: 'rgb-hex-converter',
    name: 'RGB to HEX & HEX to RGB',
    arabicName: 'محول صيغ الألوان RGB-HEX',
    description: 'Easily convert CSS color coordinates between HEX codes and RGB formats.',
    arabicDescription: 'حول ترميز الألوان بسهولة بين كود HEX وصيغة RGB مع معاينة حية.',
    category: 'converters',
    iconName: 'Palette',
    tags: ['rgb', 'hex', 'color', 'convert', 'تحويل', 'ألوان']
  },
  {
    id: 'binary-converter',
    name: 'Binary / Hex / Decimal Converter',
    arabicName: 'محول الأنظمة العددية (ثنائي/عشري)',
    description: 'Convert numbers between Binary, Octal, Decimal, and Hexadecimal formats.',
    arabicDescription: 'حول الأرقام بين الأنظمة الثنائية، والثمانية، والعشرية، والست عشرية.',
    category: 'converters',
    iconName: 'Hash',
    tags: ['binary', 'decimal', 'hex', 'octal', 'math', 'ثنائي', 'عشري', 'تحويل']
  },

  // --- Generators ---
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    arabicName: 'مولد رموز QR',
    description: 'Generate customizable high-quality QR codes for text, URLs, or Wi-Fi.',
    arabicDescription: 'أنشئ رموز QR مخصصة عالية الجودة للنصوص أو الروابط أو الواي فاي.',
    category: 'generators',
    iconName: 'QrCode',
    isPopular: true,
    isFeatured: true,
    tags: ['qr', 'qrcode', 'wifi qr', 'رمز استجابة', 'باركود']
  },
  {
    id: 'barcode-generator',
    name: 'Barcode Generator',
    arabicName: 'مولد الرموز الشريطية (باركود)',
    description: 'Generate high resolution commercial Code-128 or EAN barcodes.',
    arabicDescription: 'ولد رموز شريطية (باركود) قياسية عالية الدقة من نوع Code-128 أو EAN.',
    category: 'generators',
    iconName: 'QrCode',
    tags: ['barcode', 'upc', 'ean', 'code128', 'باركود', 'توليد']
  },
  {
    id: 'random-name-generator',
    name: 'Random Name Generator',
    arabicName: 'مولد الأسماء العشوائية',
    description: 'Generate professional business, startup, or Arabic names.',
    arabicDescription: 'ولد أسماء مشاريع، شركات ناشئة، أو أسماء عربية عشوائية بضغطة زر.',
    category: 'generators',
    iconName: 'Type',
    tags: ['name', 'brand', 'startup', 'arabic', 'أسماء', 'توليد']
  },
  {
    id: 'username-generator',
    name: 'Username Generator',
    arabicName: 'مولد أسماء المستخدمين',
    description: 'Generate catch, cool, and secure usernames for social accounts.',
    arabicDescription: 'أنشئ أسماء مستخدمين جذابة وفريدة لحساباتك الاجتماعية والألعاب.',
    category: 'generators',
    iconName: 'Type',
    isTrending: true,
    tags: ['username', 'social', 'gaming', 'handle', 'اسم مستخدم', 'يوزر']
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    arabicName: 'مولد نصوص لوريم إيبسوم',
    description: 'Generate standard dummy placeholder paragraphs or lines of text.',
    arabicDescription: 'ولد فقرات أو جمل من نص لوريم إيبسوم القياسي لاستخدامه كعنصر حجز مكان.',
    category: 'generators',
    iconName: 'FileText',
    tags: ['lorem', 'ipsum', 'placeholder', 'dummy text', 'لوريم', 'نص مؤقت']
  },
  {
    id: 'signature-generator',
    name: 'Signature Generator',
    arabicName: 'صانع التوقيعات الرقمية',
    description: 'Draw or write your custom signature and export as transparent PNG.',
    arabicDescription: 'ارسم أو اكتب توقيعك الشخصي وصدره كصورة PNG شفافة عالية الجودة.',
    category: 'generators',
    iconName: 'Type',
    isFeatured: true,
    tags: ['signature', 'sign', 'draw', 'png', 'توقيع', 'رسم', 'توقيع رقمي']
  },

  // --- Design / Image tools ---
  {
    id: 'svg-to-png',
    name: 'SVG to PNG Converter',
    arabicName: 'تحويل SVG إلى PNG',
    description: 'Convert vector SVG files into standard raster PNG images with custom sizing.',
    arabicDescription: 'حول ملفات الفيكتور SVG إلى صور PNG نقطية قياسية بأحجام مخصصة.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['svg', 'png', 'vector', 'convert', 'تحويل', 'فيكتور']
  },
  {
    id: 'css-gradient',
    name: 'CSS Gradient Generator',
    arabicName: 'مولد تدرجات الألوان CSS',
    description: 'Design beautiful linear and radial CSS gradients and grab the cross-browser code.',
    arabicDescription: 'صمم تدرجات ألوان CSS خطية أو دائرية رائعة وانسخ الكود الجاهز لمتصفحك.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['gradient', 'css', 'color', 'background', 'تدرج الألوان', 'خلفية']
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism Generator',
    arabicName: 'مولد تأثير الزجاج المضبب CSS',
    description: 'Generate CSS code for premium glassmorphic cards with blur and borders.',
    arabicDescription: 'ولد أكواد CSS لتأثير الزجاج المضبب الفاخر للبطاقات والمربعات.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['glass', 'glassmorphism', 'css', 'blur', 'زجاج مضبب', 'تأثير']
  },
  {
    id: 'box-shadow',
    name: 'CSS Box Shadow Generator',
    arabicName: 'مولد ظلال الصناديق CSS',
    description: 'Visualize and build advanced outer and inner CSS shadows with color controls.',
    arabicDescription: 'صمم ظلال متقدمة داخلية وخارجية لعناصر CSS مع التحكم بالألوان والشفافية.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['shadow', 'box shadow', 'css', 'blur', 'ظلال', 'تصميم']
  },
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    arabicName: 'مولد لوحات الألوان',
    description: 'Generate harmonious color schemes and download HEX, RGB, or HSL keys.',
    arabicDescription: 'ولد لوحات ألوان متناسقة وممتازة لمشاريعك مع أكواد HEX و RGB و HSL.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['color', 'palette', 'scheme', 'design', 'ألوان', 'لوحة']
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    arabicName: 'مولد أيقونات المواقع Favicon',
    description: 'Create standardized website favicon.ico packages from any uploaded image.',
    arabicDescription: 'أنشئ أيقونات مواقع Favicon.ico احترافية وصغيرة من أي صورة ترفعها.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['favicon', 'ico', 'icon', 'website', 'أيقونة', 'موقع']
  },
  {
    id: 'css-triangle',
    name: 'CSS Triangle Generator',
    arabicName: 'مولد المثلثات البرمجية CSS',
    description: 'Build pure CSS triangles with perfect border configurations and directional arrows.',
    arabicDescription: 'صمم مثلثات وأسهم نقية باستخدام حدود CSS وبدون صور نهائياً.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['triangle', 'css', 'arrow', 'shape', 'مثلث', 'سهم']
  },
  {
    id: 'color-blindness',
    name: 'Color Blindness Simulator',
    arabicName: 'محاكي عمى الألوان للصور',
    description: 'Upload an image and simulate deuteranopia, protanopia, or tritanopia filters.',
    arabicDescription: 'ارفع صورة وحاكِ كيف يراها المصابون بعمى الألوان كالبروتانوبيا والدوتيرانوبيا.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['blindness', 'color', 'simulate', 'accessibility', 'عمى ألوان', 'محاكاة']
  },
  {
    id: 'exif-viewer',
    name: 'Image EXIF Metadata Viewer',
    arabicName: 'قارئ بيانات EXIF للصور',
    description: 'Inspect embedded camera settings, location parameters, and EXIF tags inside pictures.',
    arabicDescription: 'افحص إعدادات الكاميرا، والعدسة، والموقع المخزن داخل صورك.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['exif', 'metadata', 'camera', 'gps', 'بيانات صور', 'تفاصيل']
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio Calculator',
    arabicName: 'حاسبة نسبة الارتفاع للعرض',
    description: 'Calculate fluid aspect ratios for visual design and screen scaling layouts.',
    arabicDescription: 'احسب نسب الأبعاد بدقة للمصممين والمطورين لتنسيق الشاشات وتناسب الصور.',
    category: 'image-tools',
    iconName: 'Minimize',
    tags: ['aspect ratio', 'width', 'height', 'scale', 'أبعاد', 'نسبة']
  },
  {
    id: 'border-radius',
    name: 'CSS Border Radius Generator',
    arabicName: 'مولد انحناء الحواف CSS',
    description: 'Interactively build custom border radius shapes and export CSS rules.',
    arabicDescription: 'صمم زوايا وحواف مائلة دائرية مخصصة لعناصر CSS مع معاينة مباشرة.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['border radius', 'css', 'corners', 'shapes', 'حواف مائلة', 'زوايا']
  },
  {
    id: 'hex-rgba',
    name: 'HEX to RGBA Converter',
    arabicName: 'محول الألوان HEX إلى RGBA',
    description: 'Convert HEX color values into RGBA with customized transparency controls.',
    arabicDescription: 'حول أكواد الألوان من HEX إلى صيغة RGBA مع تعديل الشفافية بدقة.',
    category: 'image-tools',
    iconName: 'Palette',
    tags: ['hex to rgba', 'color', 'opacity', 'css', 'تحويل ألوان', 'شفافية']
  },
  {
    id: 'metadata-stripper',
    name: 'Image Metadata Stripper',
    arabicName: 'مظفف صور من البيانات والبيانات الوصفية',
    description: 'Remove sensitive GPS, camera, and device metadata from photos before uploading.',
    arabicDescription: 'احذف تفاصيل الكاميرا والموقع الجغرافي الحساسة من الصور لحماية خصوصيتك.',
    category: 'image-tools',
    iconName: 'Minimize',
    tags: ['metadata', 'privacy', 'strip', 'gps', 'حماية الخصوصية', 'بيانات صور']
  },

  // --- Developer / Security Tools ---
  {
    id: 'epoch-converter',
    name: 'Unix Epoch Timestamp Converter',
    arabicName: 'محول الختم الزمني Unix',
    description: 'Convert seconds since 1970 to human dates, or turn human dates back into Unix Epoch.',
    arabicDescription: 'حول الثواني المتراكمة منذ عام 1970 إلى تواريخ حقيقية، أو العكس بدقة.',
    category: 'developer-tools',
    iconName: 'Calendar',
    tags: ['epoch', 'unix timestamp', 'date', 'convert', 'وقت', 'تاريخ']
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    arabicName: 'مفكك توكن JWT',
    description: 'Securely decode JSON Web Tokens offline, parsing headers and payloads.',
    arabicDescription: 'فك تشفير توكنات JWT البرمجية محلياً مع تحليل معلومات الرأس والبيانات.',
    category: 'developer-tools',
    iconName: 'Key',
    tags: ['jwt', 'token', 'decode', 'payload', 'توكن', 'فك تشفير']
  },
  {
    id: 'html-entity',
    name: 'HTML Entity Encoder / Decoder',
    arabicName: 'ترميز وفك ترميز كيانات HTML',
    description: 'Encode special characters to HTML entities, or decode them back to plain characters.',
    arabicDescription: 'حول الحروف الخاصة إلى ترميز HTMLEntities البرمجي أو العكس.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['html entity', 'encode', 'decode', 'unescape', 'ترميز كود', 'حروف']
  },
  {
    id: 'crontab',
    name: 'Crontab Expression Builder',
    arabicName: 'مولد تعبيرات وجدولة Cron',
    description: 'Build cron schedule strings visually and see detailed plain explanations.',
    arabicDescription: 'أنشئ تعبيرات جدولة مهام النظام Cron بسهولة مع تفسير تفصيلي لها.',
    category: 'developer-tools',
    iconName: 'Calendar',
    tags: ['cron', 'crontab', 'schedule', 'linux', 'جدولة مهام', 'سيرفر']
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter & Minifier',
    arabicName: 'منسق ومعالج أكواد XML',
    description: 'Pretty print nested XML strings with proper tabs, or minify them for release.',
    arabicDescription: 'نسق ورتب أكواد XML بمسافات بادئة، أو قلص حجمها لسرعة التحميل.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['xml', 'format', 'minify', 'pretty print', 'تنسيق', 'كود']
  },
  {
    id: 'yaml-json',
    name: 'YAML to JSON Converter',
    arabicName: 'محول YAML إلى JSON',
    description: 'Convert YAML configuration properties into clean, nested JSON strings.',
    arabicDescription: 'حول ملفات وإعدادات YAML البرمجية إلى كود JSON منظم.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['yaml', 'json', 'convert', 'config', 'تحويل', 'برمجة']
  },
  {
    id: 'json-yaml',
    name: 'JSON to YAML Converter',
    arabicName: 'محول JSON إلى YAML',
    description: 'Convert structural JSON files into clean and legible indented YAML strings.',
    arabicDescription: 'حول ملفات JSON البرمجية إلى صيغة YAML المقروءة والمنسقة.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['json', 'yaml', 'convert', 'config', 'تحويل', 'برمجة']
  },
  {
    id: 'hmac-generator',
    name: 'HMAC Keyed-Hash Generator',
    arabicName: 'مولد توقيع الهاش المفوّض HMAC',
    description: 'Compute custom cryptographic HMAC signatures using SHA-256 or SHA-1 hashes.',
    arabicDescription: 'احسب توقيع HMAC المشفّر باستخدام هاش SHA-256 أو SHA-1 للمطابقة الآمنة.',
    category: 'security-tools',
    iconName: 'Hash',
    tags: ['hmac', 'sha256', 'cryptography', 'signature', 'توقيع مشفر', 'هاش']
  },
  {
    id: 'markdown-table',
    name: 'Markdown Table Generator',
    arabicName: 'مولد جداول ماركداون',
    description: 'Configure column and row sizes and instantly generate responsive Markdown tables.',
    arabicDescription: 'حدد عدد الأسطر والأعمدة لتوليد جداول ماركداون منسقة ومستعدة للمقالات.',
    category: 'developer-tools',
    iconName: 'FileText',
    tags: ['markdown', 'table', 'generator', 'editor', 'ماركداون', 'جدول']
  },
  {
    id: 'http-status',
    name: 'HTTP Status Codes Finder',
    arabicName: 'قاموس رموز حالة شبكة HTTP',
    description: 'Search and inspect all standard HTTP status responses, client, and server errors.',
    arabicDescription: 'ابحث في كافة رموز وتفاصيل ردود السيرفر وحالات الشبكة والاتصال HTTP.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['http', 'status codes', 'errors', 'network', 'شبكة اتصالات', 'سيرفر']
  },
  {
    id: 'user-agent',
    name: 'User Agent Parser',
    arabicName: 'محلل معرّفات المتصفح User Agent',
    description: 'Deconstruct user-agent browser strings to discover OS and engine layouts.',
    arabicDescription: 'حلل معرف متصفحك أو أي متصفح آخر لمعرفة نظام التشغيل وإصدار المتصفح.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['user agent', 'ua', 'browser', 'os', 'متصفح', 'نظام تشغيل']
  },
  {
    id: 'hex-ascii',
    name: 'Hex to ASCII & ASCII to Hex Converter',
    arabicName: 'محول صيغ Hex و ASCII الثنائية',
    description: 'Translate hexadecimal codes back to plain characters, or encode plain text to Hex.',
    arabicDescription: 'حول نصوصك العادية إلى نظام ست عشري Hex أو فك شفرتها فوراً.',
    category: 'developer-tools',
    iconName: 'Hash',
    tags: ['hex', 'ascii', 'convert', 'binary', 'تحويل', 'ست عشري']
  },
  {
    id: 'base32-converter',
    name: 'Base32 Encoder / Decoder',
    arabicName: 'ترميز وفك تشفير Base32',
    description: 'Translate plain strings to standardized Base32 alphabets, or parse them back.',
    arabicDescription: 'شفر نصوصك العادية باستخدام أبجدية Base32 القياسية أو العكس محلياً.',
    category: 'developer-tools',
    iconName: 'Key',
    tags: ['base32', 'encode', 'decode', 'crypt', 'تشفير', 'ترميز']
  },

  // --- Calculators ---
  {
    id: 'scientific-calc',
    name: 'Scientific Calculator',
    arabicName: 'الحاسبة العلمية المتطورة',
    description: 'Perform advanced math, trigonometry, logarithms, and square roots seamlessly.',
    arabicDescription: 'اجرِ العمليات الحسابية المتقدمة كالمثلثات، اللوغاريتمات، والجذور بسهولة.',
    category: 'calculators',
    iconName: 'Activity',
    tags: ['scientific calculator', 'math', 'trig', 'log', 'حاسبة علمية', 'رياضيات']
  },
  {
    id: 'gpa-calc',
    name: 'GPA Calculator',
    arabicName: 'حاسبة المعدل التراكمي GPA',
    description: 'Track and compute semester grades and credit hours automatically.',
    arabicDescription: 'احسب معدلك الفصلي والتراكمي بناءً على درجات المواد والساعات المعتمدة.',
    category: 'calculators',
    iconName: 'Calendar',
    tags: ['gpa', 'grades', 'college', 'semester', 'معدل تراكمي', 'جامعة']
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    arabicName: 'حاسبة الفائدة والربح المركب',
    description: 'Determine future investment growth, deposits, and compound yields.',
    arabicDescription: 'احسب نمو استثماراتك المستقبلية وإيداعاتك بناء على الفائدة المركبة.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['interest', 'compound', 'investment', 'money', 'أرباح', 'استثمار']
  },
  {
    id: 'date-calc',
    name: 'Date Adder & Subtractor',
    arabicName: 'حاسبة إضافة وخصم التواريخ',
    description: 'Determine future or past dates by adding or subtracting days seamlessly.',
    arabicDescription: 'احسب التاريخ الجديد المستقبلي أو الماضي عبر زيادة أو خصم عدد من الأيام.',
    category: 'calculators',
    iconName: 'Calendar',
    tags: ['date', 'calendar', 'days calculator', 'add date', 'تواريخ', 'أيام']
  },
  {
    id: 'bmr-tdee',
    name: 'BMR & TDEE Calculator',
    arabicName: 'حاسبة الاحتياج اليومي للسعرات TDEE',
    description: 'Determine your basal metabolic rate and exact daily caloric needs.',
    arabicDescription: 'احسب معدل الأيض الأساسي وجدول السعرات الحرارية المطلوبة يومياً حسب نشاطك.',
    category: 'calculators',
    iconName: 'Activity',
    tags: ['bmr', 'tdee', 'calories', 'fitness', 'سعرات حرارية', 'نشاط بدني']
  },
  {
    id: 'body-fat',
    name: 'US Navy Body Fat Calculator',
    arabicName: 'حاسبة نسبة دهون الجسم (البحرية الأمريكية)',
    description: 'Estimate overall body fat percentage using standard circumference measurements.',
    arabicDescription: 'احسب نسبة الدهون المقدرة بالبدن باستخدام طريقة محيط القياسات المعتمدة.',
    category: 'calculators',
    iconName: 'Activity',
    tags: ['body fat', 'navy body fat', 'fitness', 'health', 'نسبة دهون', 'لياقة']
  },
  {
    id: 'tip-calc',
    name: 'Tip & Bill Splitter',
    arabicName: 'حاسبة تقسيم الفاتورة والإكراميات',
    description: 'Determine split bill amounts, total checks, and tip shares per person.',
    arabicDescription: 'احسب حصة كل فرد من إجمالي الفاتورة ونسبة الإكراميات المخصصة بالتساوي.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['tip', 'bill split', 'restaurant', 'money', 'تقسيم فاتورة', 'مطعم']
  },
  {
    id: 'fuel-calc',
    name: 'Fuel Cost Travel Planner',
    arabicName: 'حاسبة وقود وتكلفة السفر بالسيارة',
    description: 'Estimate overall gasoline or diesel travel costs based on mileage.',
    arabicDescription: 'احسب التكلفة الإجمالية لوقود سيارتك في السفر بناءً على المسافة ومعدل الاستهلاك.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['fuel', 'gas cost', 'travel cost', 'car', 'وقود', 'سيارة', 'سفر']
  },
  {
    id: 'salary-converter',
    name: 'Salary / Hourly Pay Converter',
    arabicName: 'حاسبة تقسيم الراتب السنوي بالتفصيل',
    description: 'Convert annual wages into monthly, weekly, daily, and hourly pay metrics.',
    arabicDescription: 'حول راتبك السنوي إلى تفصيل شهري، أسبوعي، يومي، وحساب الساعة.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['salary', 'wage', 'hourly pay', 'hourly rate', 'راتب شهري', 'أجر الساعة']
  },
  {
    id: 'binary-math',
    name: 'Binary Math Calculator',
    arabicName: 'حاسبة العمليات الثنائية الرياضية',
    description: 'Perform addition, subtraction, multiplication, or division on binary streams.',
    arabicDescription: 'أجرِ الجمع، الطرح، الضرب أو القسمة مباشرة على الأرقام بالنظام الثنائي.',
    category: 'calculators',
    iconName: 'Hash',
    tags: ['binary math', 'binary calc', 'binary math', 'ثنائي', 'عمليات حسابية']
  },
  {
    id: 'fraction-calc',
    name: 'Fraction Calculator',
    arabicName: 'حاسبة الكسور الرياضية',
    description: 'Add, subtract, multiply, and divide standard math fractions with steps.',
    arabicDescription: 'احسب العمليات الحسابية الأربعة على الكسور مع تبسيط النتائج تلقائياً.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['fraction', 'math fraction', 'simplify', 'كسور', 'رياضيات']
  },
  {
    id: 'ideal-weight',
    name: 'Ideal Weight Calculator',
    arabicName: 'حاسبة الوزن المثالي',
    description: 'Estimate ideal healthy weight targets using standard Devine formulas.',
    arabicDescription: 'اعرف نطاق الوزن الصحي والمثالي المقدر لك باستخدام معادلة ديفاين.',
    category: 'calculators',
    iconName: 'Scale',
    tags: ['ideal weight', 'healthy weight', 'weight calculator', 'وزن مثالي', 'صحة']
  },
  {
    id: 'pregnancy-due',
    name: 'Pregnancy Due Date Calculator',
    arabicName: 'حاسبة موعد الولادة المتوقع والأسابيع',
    description: 'Track gestational development and predict delivery using Naegele rules.',
    arabicDescription: 'احسبي الموعد المتوقع للولادة وعمر الحمل الحالي بالأسابيع والأيام.',
    category: 'calculators',
    iconName: 'Calendar',
    tags: ['pregnancy', 'due date', 'baby due', 'gestation', 'موعد ولادة', 'حمل']
  },

  // --- Text Tools ---
  {
    id: 'find-replace',
    name: 'Find and Replace Tool',
    arabicName: 'أداة البحث والاستبدال في النصوص',
    description: 'Search for specific words or patterns inside a text and swap them instantly.',
    arabicDescription: 'ابحث عن كلمات أو عبارات محددة داخل النص واستبدلها بضغطة زر واحدة.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['find replace', 'search text', 'swap text', 'بحث واستبدال', 'نصوص']
  },
  {
    id: 'anagram-solver',
    name: 'Anagram Solver',
    arabicName: 'حل الكلمات والجمل المبعثرة',
    description: 'Rearrange mixed characters and scrambled letters to find all permutations.',
    arabicDescription: 'رتب الحروف المبعثرة بشكل متبادل لاكتشاف التراكيب والكلمات البديلة.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['anagram', 'scramble', 'letters', 'permutations', 'مبعثر', 'حروف']
  },
  {
    id: 'slug-generator',
    name: 'SEO URL Slug Generator',
    arabicName: 'مولد روابط السيو الصديقة SEO Slug',
    description: 'Generate web-friendly URL slugs for articles, pages, and dynamic SEO titles.',
    arabicDescription: 'حول عناوين المقالات لروابط صديقة لمحركات البحث (SEO Slugs) خالية من الرموز.',
    category: 'text-tools',
    iconName: 'Link',
    tags: ['slug', 'seo', 'url slug', 'website link', 'رابط موقع', 'سيو']
  },
  {
    id: 'text-repeater',
    name: 'Text Repeater',
    arabicName: 'أداة تكرار النصوص',
    description: 'Repeat words, lines, or paragraphs up to 1000 times with spaces or lines.',
    arabicDescription: 'كرر أي كلمة أو جملة حتى 1000 مرة مع تخصيص فواصل الأسطر والمسافات.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['repeater', 'duplicate text', 'multiply text', 'تكرار النص', 'نسخ']
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    arabicName: 'عكس النصوص والكلمات',
    description: 'Flip full sentences backward, reverse letters, or word orderings instantly.',
    arabicDescription: 'اعكس ترتيب الكلمات أو اقلب الحروف بالكامل لتبدأ من النهاية للبداية.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['reverse text', 'flip text', 'backward', 'عكس النصوص', 'قلب']
  },
  {
    id: 'caesar-cipher',
    name: 'Rot13 & Caesar Cipher Translator',
    arabicName: 'مشفّر قيصر الدوار Rot13',
    description: 'Encrypt or decrypt letters by rotating them according to a custom shifted key.',
    arabicDescription: 'شفر نصوصك الإنجليزية بلف أو دوران الحروف حسب مفتاح الإزاحة المحدد.',
    category: 'text-tools',
    iconName: 'Key',
    tags: ['caesar cipher', 'rot13', 'cryptography', 'cipher text', 'تشفير قيصر', 'مفتاح']
  },
  {
    id: 'regex-tester',
    name: 'Regular Expression Match Tester',
    arabicName: 'فاحص تعبيرات RegExp النمطية',
    description: 'Validate regex matching and extract matched elements from source string.',
    arabicDescription: 'افحص مدى تطابق التعبيرات النمطية واستخرج العناصر والكلمات المكتشفة.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['regex matcher', 'regular expression', 'regex tester', 'مطابقة', 'تعبير نمطي']
  },
  {
    id: 'nato-phonetic',
    name: 'NATO Phonetic Alphabet Converter',
    arabicName: 'محول الألفبائية الصوتية للناتو',
    description: 'Translate english words into international standard NATO spelling alphabets.',
    arabicDescription: 'حول الحروف الإنجليزية إلى الألفبائية الصوتية العسكرية المعتمدة للناتو.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['nato alphabet', 'spelling alphabet', 'military spell', 'ألفبائية الناتو', 'تهجئة']
  },
  {
    id: 'ascii-banner',
    name: 'Text to ASCII Banner Generator',
    arabicName: 'صانع لافتات نصوص ASCII',
    description: 'Translate simple text words into giant block ASCII art banners.',
    arabicDescription: 'حول الكلمات إلى لافتات ولوحات مرسومة برموز نظام ASCII الفنية.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['ascii art', 'ascii banner', 'letters', 'لافتة', 'فن الرموز']
  },
  {
    id: 'leetspeak',
    name: 'Leetspeak Converter',
    arabicName: 'محول لغة الألعاب ليتسبيك (1337)',
    description: 'Convert ordinary characters into standard 1337 gaming leetspeak text.',
    arabicDescription: 'حول الحروف والكلمات العادية إلى لغة الشات والألعاب ليتسبيك (1337).',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['leetspeak', '1337', 'hacker text', 'gaming text', 'ليتسبيك', 'لغة']
  },
  {
    id: 'random-choice',
    name: 'Random Choice Picker',
    arabicName: 'مختار القرارات والخيارات العشوائي',
    description: 'Solve decisions by picking a random winning item from list entries.',
    arabicDescription: 'حل حيرتك واجعل الأداة تختار خياراً أو فائزاً عشوائياً من قائمتك المرفقة.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['choice picker', 'random win', 'decider', 'اختيار عشوائي', 'قرارات']
  },
  {
    id: 'morse-code',
    name: 'Morse Code Translator',
    arabicName: 'مترجم شفرة مورس اللاسلكية',
    description: 'Translate ordinary english text into dots and dashes of Morse telegraph codes.',
    arabicDescription: 'ترجم العبارات الإنجليزية إلى النقط والشرطات المعبرة عن شفرة مورس.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['morse code', 'telegraph', 'signal', 'مورس', 'شفرة لاسلكية']
  },
  {
    id: 'binary-text',
    name: 'Binary Text Cipher',
    arabicName: 'محول النصوص للنظام الثنائي',
    description: 'Translate standard text to binary streams of ones and zeros, or parse them back.',
    arabicDescription: 'حول الكلمات إلى تيار ثنائي من الأصفار والآحاد المبرمجة أو العكس.',
    category: 'text-tools',
    iconName: 'Hash',
    tags: ['binary text', 'text to binary', 'zeros ones', 'ثنائي', 'أصفار وآحاد']
  },
  {
    id: 'ai-prompt-generator',
    name: 'AI Prompt Generator',
    arabicName: 'مولد برومبت الذكاء الاصطناعي',
    description: 'Generate optimized LLM prompts for different roles and tasks.',
    arabicDescription: 'ولد أوامر مخصصة ومحسنة لنماذج الذكاء الاصطناعي بناء على تخصصك.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['ai prompt', 'prompt engineering', 'system prompt', 'أوامر', 'برومبت']
  },
  {
    id: 'ai-text-rewriter',
    name: 'AI Text Rewriter',
    arabicName: 'صياغة النصوص بالذكاء الاصطناعي',
    description: 'Rephrase, edit, or rewrite a block of text in different tones.',
    arabicDescription: 'أعد صياغة وتحسين نصوصك بعدة نبرات تسويقية ومهنية وأكاديمية.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['rewriter', 'rephrase', 'ai rewrite', 'إعادة صياغة', 'نصوص']
  },
  {
    id: 'ai-summarizer',
    name: 'AI Summarizer',
    arabicName: 'ملخص النصوص بالذكاء الاصطناعي',
    description: 'Condense long articles and documents into concise summaries.',
    arabicDescription: 'لخص المقالات والأبحاث الطويلة في نقاط موجزة وذكية.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['summarizer', 'condensation', 'bullets summary', 'تلخيص', 'ملخص']
  },
  {
    id: 'ai-translator',
    name: 'AI Translator',
    arabicName: 'المترجم الذكي بالذكاء الاصطناعي',
    description: 'Translate text between English, Arabic, Spanish, French, and German.',
    arabicDescription: 'ترجم العبارات والمصطلحات بدقة عالية بين عدة لغات عالمية.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['translator', 'translate', 'arabic english', 'ترجمة', 'مترجم']
  },
  {
    id: 'ai-email-writer',
    name: 'AI Email Writer',
    arabicName: 'كاتب الإيميلات بالذكاء الاصطناعي',
    description: 'Write professional emails based on your target purpose and key points.',
    arabicDescription: 'اكتب مسودات إيميلات مهنية ورسمية مقنعة لمديرك أو عملائك.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['email writer', 'draft email', 'pitching', 'إيميل', 'رسالة']
  },
  {
    id: 'ai-hashtag-generator',
    name: 'AI Hashtag Generator',
    arabicName: 'مولد الهاشتاقات بالذكاء الاصطناعي',
    description: 'Generate trending, engaging hashtags for social media posts.',
    arabicDescription: 'ولد هاشتاقات نشطة ومستهدفة لمنشورات التواصل الاجتماعي لزيادة المتابعين.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['hashtags', 'instagram', 'viral tag', 'هاشتاق', 'وسم']
  },
  {
    id: 'ai-seo-generator',
    name: 'AI SEO Generator',
    arabicName: 'مولد السيو والكلمات المفتاحية',
    description: 'Generate optimized page titles, meta descriptions, and keywords.',
    arabicDescription: 'ولد عناوين وأوصاف سيو محسنة لصفحاتك لتتصدر محركات البحث.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['seo tags', 'meta descriptive', 'rank high', 'سيو', 'محركات البحث']
  },
  {
    id: 'ai-blog-generator',
    name: 'AI Blog Generator',
    arabicName: 'مولد مخططات ومقالات المدونات',
    description: 'Generate blog post outlines or full articles from a topic.',
    arabicDescription: 'ولد مخططات تفصيلية أو مقدمات مقالات لمدونتك الشخصية أو موقعك.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['blog generator', 'article outline', 'writer assistance', 'مدونة', 'مقال']
  },
  {
    id: 'ai-product-description',
    name: 'AI Product Description',
    arabicName: 'وصف المنتجات بالذكاء الاصطناعي',
    description: 'Write persuasive product descriptions based on product name and features.',
    arabicDescription: 'اكتب وصفاً تسويقياً جذاباً ومقنعاً لمنتجات متجرك الإلكتروني.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['product descriptions', 'shopify copywriting', 'sales copy', 'وصف منتج', 'تسويق']
  },
  {
    id: 'social-media-caption-generator',
    name: 'AI Social Caption Generator',
    arabicName: 'مولد تعليقات السوشيال ميديا بالذكاء الاصطناعي',
    description: 'Generate highly engaging captions for Instagram, TikTok, or Facebook.',
    arabicDescription: 'ولد عبارات تعليق تفاعلية وجذابة لحساباتك الاجتماعية.',
    category: 'ai-tools',
    iconName: 'Sparkles',
    tags: ['social caption', 'instagram captions', 'tiktok tags', 'تواصل اجتماعي', 'تعليقات']
  },
  {
    id: 'pdf-unlocker',
    name: 'PDF Unlocker',
    arabicName: 'محرر قيود ملفات الـ PDF',
    description: 'Unlock password security and restriction controls from PDF files offline.',
    arabicDescription: 'فك قيود التعديل والطباعة وحماية كلمات المرور من ملفات PDF محلياً.',
    category: 'pdf-tools',
    iconName: 'Lock',
    tags: ['pdf unlock', 'password bypass', 'remove restriction', 'فتح حماية', 'فك قيد']
  },
  {
    id: 'pdf-protector',
    name: 'PDF Protector',
    arabicName: 'حماية وتشفير ملفات الـ PDF',
    description: 'Add secure owner passwords and restriction rules to any PDF.',
    arabicDescription: 'أضف كلمة مرور قوية لحماية ملفاتك السرية ومنع العبث والفتح العشوائي.',
    category: 'pdf-tools',
    iconName: 'Lock',
    tags: ['pdf lock', 'encrypt pdf', 'password restrict', 'تأمين الملف', 'حماية']
  },
  {
    id: 'pdf-rotate',
    name: 'PDF Rotate',
    arabicName: 'تدوير وتوجيه صفحات الـ PDF',
    description: 'Rotate individual pages of your PDF document in 90, 180, or 270 degrees.',
    arabicDescription: 'أعد توجيه وتدوير صفحات ملف الـ PDF بالزوايا المناسبة لك.',
    category: 'pdf-tools',
    iconName: 'Files',
    tags: ['pdf rotate', 'change orientation', 'page angle', 'تدوير', 'تعديل الاتجاه']
  },
  {
    id: 'pdf-extract-pages',
    name: 'PDF Extract Pages',
    arabicName: 'استخراج صفحات معينة من PDF',
    description: 'Extract custom page numbers or ranges to build a separate PDF.',
    arabicDescription: 'استخرج أوراق أو صفحات محددة من الملف المرفق في مستند مستقل جديد.',
    category: 'pdf-tools',
    iconName: 'Files',
    tags: ['pdf extract', 'separate pages', 'slice document', 'استخراج', 'صفحات']
  },
  {
    id: 'pdf-remove-pages',
    name: 'PDF Remove Pages',
    arabicName: 'حذف صفحات من مستند الـ PDF',
    description: 'Delete and exclude unwanted pages from your PDF file.',
    arabicDescription: 'احذف واستبعد الصفحات غير المرغوبة أو الفارغة من ملفك.',
    category: 'pdf-tools',
    iconName: 'Files',
    tags: ['pdf delete page', 'exclude pages', 'trim pdf', 'حذف أوراق', 'تعديل']
  },
  {
    id: 'pdf-watermark',
    name: 'PDF Watermark',
    arabicName: 'إضافة علامات مائية على PDF',
    description: 'Overlay custom texts or confidentiality watermarks on PDF pages.',
    arabicDescription: 'اطبع علامات مائية أو نصوص الحفظ والسرية على كامل صفحات المستند.',
    category: 'pdf-tools',
    iconName: 'Files',
    tags: ['pdf watermark', 'confidential tag', 'stamp pages', 'علامة مائية', 'حقوق']
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    arabicName: 'تحويل مستند PDF إلى صور JPG',
    description: 'Convert every page of a PDF document into high-resolution JPG images.',
    arabicDescription: 'صدر صفحات ملف الـ PDF بالكامل إلى باقة من صور JPG عالية الجودة.',
    category: 'pdf-tools',
    iconName: 'FileImage',
    tags: ['pdf to image', 'convert pages', 'jpg export', 'تحويل', 'إلى صور']
  },
  {
    id: 'bg-remover',
    name: 'Background Remover',
    arabicName: 'مفرغ ومعالج خلفيات الصور',
    description: 'Make light or white backgrounds transparent instantly using canvas isolation.',
    arabicDescription: 'فرغ وعزل الخلفية الفاتحة للصور بضغطة واحدة وبشكل آمن تماماً.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['remove bg', 'transparent png', 'bg isolate', 'تفريغ الصور', 'خلفية شفافة']
  },
  {
    id: 'img-watermark',
    name: 'Image Watermark',
    arabicName: 'إضافة علامة مائية للصور',
    description: 'Protect your graphics by stamping custom overlay texts on images.',
    arabicDescription: 'احمِ صورك ونقش عليها نصوص الحقوق وشعارك بنسبة شفافية مرنة.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['image watermark', 'stamp photos', 'copyright stamp', 'علامة مائية', 'حقوق الصور']
  },
  {
    id: 'img-blur',
    name: 'Image Blur Filter',
    arabicName: 'تغبيش وضبابية الصور',
    description: 'Apply flexible blurring filters to focus elements or sanitize imagery.',
    arabicDescription: 'طبق مستويات تغبيش وضبابية مخصصة على الصورة لإخفاء تفاصيل معينة.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['image blur', 'defocus', 'privacy censor', 'تغبيش', 'تمويه']
  },
  {
    id: 'img-sharpen',
    name: 'Image Sharpening',
    arabicName: 'زيادة حدة ووضوح الصور',
    description: 'Reinforce edges and details on blurred graphics using local matrix sharpening.',
    arabicDescription: 'زد من حدة ووضوح تفاصل الصور ومعالمها الباهتة بنظام تباين الحواف الحوسبي.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['image sharpen', 'contrast edge', 'details reinforce', 'حدة الصور', 'توضيح']
  },
  {
    id: 'img-converter',
    name: 'Universal Image Converter',
    arabicName: 'محول صيغ الصور الشامل',
    description: 'Convert between PNG, JPG, and WEBP formats offline instantly.',
    arabicDescription: 'حول الصور بين صيغ PNG وJPG وWEBP بشكل آمن وسريع في متصفحك.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['image format convert', 'png webp', 'jpeg convert', 'تحويل صيغ', 'تعديل الصور']
  },
  {
    id: 'qr-scanner',
    name: 'QR Code Scanner',
    arabicName: 'قارئ ومحلل رموز QR',
    description: 'Scan and decode hyperlinks and text contents from QR codes instantly.',
    arabicDescription: 'امسح وحلل رموز الـ QR لفك الروابط والنصوص المشفرة بها.',
    category: 'image-tools',
    iconName: 'QrCode',
    tags: ['qr scan', 'decode qr', 'read code', 'قارئ', 'كود']
  },
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    arabicName: 'صانع ومصمم صور الميمز',
    description: 'Create customized meme layouts by stamping text overlays on images.',
    arabicDescription: 'صمم ميمز مضحكة وسريعة بكتابة نصوص علوية وسفلية على صورك.',
    category: 'image-tools',
    iconName: 'FileImage',
    tags: ['meme maker', 'custom text stamp', 'funny layout', 'ميمز', 'تصميم']
  },
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    arabicName: 'حذف وإزالة الأسطر المكررة',
    description: 'Filter your lists and strings to keep only unique text lines.',
    arabicDescription: 'نظف قوائمك ونصوصك من الأسطر المكررة وحافظ على الفريد منها.',
    category: 'text-tools',
    iconName: 'FileText',
    tags: ['deduplicate text', 'clean lists', 'unique strings', 'إزالة التكرار', 'فلترة']
  },
  {
    id: 'random-text-gen',
    name: 'Random Text Generator',
    arabicName: 'مولد النصوص العشوائية',
    description: 'Generate customized random alpha-numeric sequences or complex tokens.',
    arabicDescription: 'ولد سلاسل نصية عشوائية أو معقدة بطول مخصص لأغراض الفحص والتأمين.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['random string', 'token maker', 'string sequences', 'عشوائي', 'توليد نص']
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    arabicName: 'محلل كثافة الكلمات المفتاحية',
    description: 'Extract and analyze keyword density percentages of your articles.',
    arabicDescription: 'حلل كثافة تواتر الكلمات المفتاحية في مقالك لضمان تحسين محركات السيو.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['keyword count', 'seo density', 'phrase frequency', 'تحليل كلمات', 'سيو']
  },
  {
    id: 'reading-time',
    name: 'Reading Time Calculator',
    arabicName: 'حاسبة وقت القراءة والإلقاء',
    description: 'Determine average reading and speaking metrics of your text.',
    arabicDescription: 'احسب وقت القراءة والتحدث والخطابة المقدر لنصوصك وخطاباتك.',
    category: 'text-tools',
    iconName: 'Type',
    tags: ['reading speed', 'estimated metrics', 'speaking duration', 'وقت القراءة', 'حساب']
  },
  {
    id: 'js-formatter',
    name: 'JavaScript Formatter',
    arabicName: 'تنسيق وترتيب كود جافا سكريبت',
    description: 'Format, beautify, and auto-indent raw JavaScript code offline.',
    arabicDescription: 'رتب ونسق أكواد جافا سكريبت المضغوطة أو غير المرتبة بلمح البصر.',
    category: 'developer-tools',
    iconName: 'Braces',
    tags: ['js beautify', 'format script', 'indent code', 'تنسيق كود', 'جافاسكريبت']
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    arabicName: 'حاسبة التمويل والقروض العقارية',
    description: 'Calculate monthly payments, interest totals, and mortgages.',
    arabicDescription: 'احسب أقساط التمويل العقاري الشهري والفوائد الإجمالية المترتبة على عقارك.',
    category: 'calculators',
    iconName: 'Percent',
    tags: ['home loan', 'monthly mortgage', 'interest schedules', 'تمويل عقاري', 'حاسبة قروض']
  }
];
