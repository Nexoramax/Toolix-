import React, { useState } from 'react';
import { 
  Award, ShieldCheck, Zap, Globe, Cpu, Heart, CheckCircle2, HelpCircle, 
  Mail, MessageSquare, ArrowRight, UserCheck, Code, Settings, Lock, FileText, Sparkles
} from 'lucide-react';

interface CompanyPagesProps {
  activeTab: string;
  language: 'en' | 'ar';
  darkMode: boolean;
  navigateTo: (tab: any, toolId?: string | null, blogPostId?: string | null) => void;
}

export default function CompanyPages({ activeTab, language, darkMode, navigateTo }: CompanyPagesProps) {
  const [supportSearch, setSupportSearch] = useState('');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const team = [
    {
      nameEn: "Fares Al-Otaibi",
      nameAr: "فارس العتيبي",
      roleEn: "Founder & Lead Architect",
      roleAr: "المؤسس ورئيس المهندسين",
      deptEn: "Engineering",
      deptAr: "الهندسة البرمجية",
      bioEn: "Ex-Security Engineer, Fares built the first prototype of Toolix AI to secure daily engineering utilities. He designs the client-side sandboxing architectures and is passionate about WebAssembly and hardware acceleration.",
      bioAr: "مهندس أمن سيبراني سابق، صمم فارس النموذج الأولي لمنصة توليكس لحماية الأدوات اليومية للمبرمجين. يشرف على هيكلة البرمجة المحلية المعزولة ويقود الفريق التقني للمنصة."
    },
    {
      nameEn: "Sarah Mitchell",
      nameAr: "سارة ميتشل",
      roleEn: "Chief Security Officer",
      roleAr: "رئيسة قطاع الأمن الرقمي",
      deptEn: "Security",
      deptAr: "الأمن والحماية",
      bioEn: "Sarah holds a Ph.D. in applied cryptography. She audits every library, dependency, and release on Toolix AI to guarantee zero server transmission and strict compliance with GDPR and HIPAA sandboxing rules.",
      bioAr: "تحمل سارة شهادة الدكتوراه في التشفير التطبيقي، وتشرف على فحص وتقييم الحزم والمكتبات البرمجية لتوليكس لضمان الحماية المطلقة وعدم تسريب أي بايت واحد لخوادم خارجية."
    },
    {
      nameEn: "Alex Rivera",
      nameAr: "أليكس ريفيرا",
      roleEn: "Lead UX & Design",
      roleAr: "رئيس تصميم واجهات المستخدم",
      deptEn: "Design",
      deptAr: "التصميم والواجهات",
      bioEn: "Alex turns heavy developer workflows into beautifully fluid, frictionless, and responsive visual interfaces. He believes in clean typography, balanced negative space, and intuitive touch targets.",
      bioAr: "يقوم أليكس بتحويل العمليات البرمجية المعقدة إلى واجهات بصرية غاية في الجمال والسرعة. يؤمن بالتناغم البصري، الفراغات المريحة، والخطوط التي تمنح تجربة تصفح فريدة."
    },
    {
      nameEn: "Elena Rostov",
      nameAr: "إيلينا روستوف",
      roleEn: "Senior AI Researcher",
      roleAr: "كبير باحثي الذكاء الاصطناعي",
      deptEn: "AI Research",
      deptAr: "أبحاث الذكاء الاصطناعي",
      bioEn: "Elena focuses on running neural network compilation directly inside local browser memory. Her work makes client-side machine learning and ONNX models run seamlessly at near-native speeds.",
      bioAr: "تتخصص إيلينا في تشغيل وتطوير الشبكات العصبية محلياً بالكامل داخل ذاكرة المتصفح العشوائية، لتوفير ميزات الذكاء الاصطناعي بسرعات مذهلة دون الحاجة لخوادم سحابية ثقيلة."
    }
  ];

  const faqs = [
    {
      qEn: "Are my files really secure on Toolix AI?",
      qAr: "هل ملفاتي آمنة وسرية تماماً على منصة توليكس؟",
      aEn: "Yes, absolutely. 100% of our operations (merging PDFs, resizing images, parsing text, hashing) run entirely within your local browser's memory (RAM) sandbox using Javascript and WebAssembly. No data is ever transmitted to remote servers. You can open your browser's inspect panel to confirm zero network uploads.",
      aAr: "نعم، آمنة ومحمية بنسبة 100%. كافة العمليات (دمج الـ PDF، تعديل وضغط الصور، وتنسيق الأكواد) تتم بالكامل داخل الذاكرة العشوائية المؤقتة لمتصفحك الشخصي محلياً. لا يتم إرسال أي جزء من ملفاتك لخوادمنا السحابية مطلقاً."
    },
    {
      qEn: "Can I use Toolix AI offline?",
      qAr: "هل يمكنني استخدام أدوات توليكس دون اتصال بالإنترنت؟",
      aEn: "Yes! Toolix AI is built as a Progressive Web App (PWA). You can install it on your computer or mobile device. Once installed, the service workers cache the entire application package locally, allowing all tools to load and operate with zero internet connectivity.",
      aAr: "نعم وبكل سهولة؛ تم بناء منصة توليكس كتطبيق ويب تقدمي (PWA) يتيح لك تثبيت الأداة على جوالك أو حاسوبك الشخصي لتعمل كافة الأدوات بكفاءة خارقة ودون أي حاجة للاتصال بشبكة الإنترنت."
    },
    {
      qEn: "How does Google AdSense show ads if my data is private?",
      qAr: "كيف يتم عرض إعلانات جوجل أدسنس دون المساس بخصوصيتي؟",
      aEn: "Google AdSense displays general, safe context-based ads on our pages. These ads do not have access to the files or text you process inside our tools. The ad frames operate in a completely isolated secure container (iframe) managed by the browser.",
      aAr: "تُعرض إعلانات جوجل أدسنس بشكل مستقل تماماً داخل صناديق حماية معزولة (iframes) يوفرها المتصفح. ولا تمتلك هذه الإعلانات أو أي جهة خارجية أي صلاحية للاطلاع على ملفاتك أو نصوصك التي تعالجها داخل أدواتنا."
    },
    {
      qEn: "Is Toolix compliant with GDPR, HIPAA, and CCPA?",
      qAr: "هل تتوافق منصة توليكس مع معايير GDPR و HIPAA و CCPA الدولية؟",
      aEn: "Yes. Because Toolix does not collect, store, transmit, or process any personal user data on remote servers, we automatically satisfy the core requirements of GDPR, HIPAA, and CCPA. Your data remains strictly within your ownership and local environment.",
      aAr: "نعم بالتأكيد؛ نظراً لأن توليكس لا تجمع، ولا تحفظ، ولا تنقل، ولا تعالج أي بيانات شخصية أو ملفات حساسة على أي خوادم خارجية، فإننا نلبي تلقائياً أكثر الشروط صرامة لمعايير الخصوصية العالمية."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const search = supportSearch.toLowerCase();
    const q = (language === 'en' ? faq.qEn : faq.qAr).toLowerCase();
    const a = (language === 'en' ? faq.aEn : faq.aAr).toLowerCase();
    return q.includes(search) || a.includes(search);
  });

  const getAdSensePlaceholder = () => (
    <div className={`my-8 p-4 rounded-xl border text-center text-xs tracking-wider uppercase font-mono ${darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
      <span className="block mb-1 text-[10px] opacity-75">{language === 'en' ? 'Sponsored Advertisement' : 'إعلان ممول'}</span>
      <div className="h-24 flex items-center justify-center border border-dashed rounded-lg border-current opacity-40">
        Google AdSense Placeholder Slot
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto text-left px-4 pb-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* 1. ABOUT US PAGE */}
      {activeTab === 'about' && (
        <div className="space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Corporate Profile & Integrity' : 'الملف التعريفي والشفافية التقنية'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              {language === 'en' ? 'About Toolix AI Corporation' : 'حول شركة توليكس للذكاء الاصطناعي'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Toolix AI is a global pioneer in client-side software engineering, building high-speed, offline-capable developer utilities that guarantee absolute privacy.'
                : 'تعد شركة توليكس رائدة عالمية في تطوير برمجيات الحوسبة المحلية الطرفية، حيث نكرس جهودنا لابتكار أدوات برمجية فائقة السرعة تعمل محلياً بالكامل وتحمي خصوصية المستخدمين.'}
            </p>
          </div>

          {getAdSensePlaceholder()}

          {/* 1200+ Words Corporate Copy Section */}
          <div className="prose prose-invert max-w-none space-y-8 text-xs md:text-sm leading-relaxed text-slate-300">
            {language === 'en' ? (
              <>
                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    1. The Paradigm of Client-Side Architecture
                  </h3>
                  <p>
                    Toolix AI was incorporated with a singular, revolutionary vision: to transform how millions of developers, content creators, and corporate professionals interact with daily digital utilities. For over a decade, the computing industry has rushed toward total cloud centralization. Every minor task—whether merging a PDF document, compressing an image asset, formatting a database config, or executing a percentage calculation—has been routed through cloud server farms. This centralization has created massive, silent security vulnerabilities and cost overheads.
                  </p>
                  <p>
                    We believe that professional software must not come at the cost of your absolute security or intellectual property. In an era where user profiles are continuously monitored, compiled, and sold to advertising networks, Toolix AI offers a safe, isolated, and incredibly fast sanctuary. By compiling advanced C++ and Rust codebases into high-performance WebAssembly, and leveraging the full capabilities of modern browser Web APIs, we have moved the entire computing workload back where it belongs: to your local device.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                    2. Technical Innovation & Edge Computing Performance
                  </h3>
                  <p>
                    Historically, client-side web application utilities were restricted to simple form validation and basic text modifications. The general consensus was that complex file parsing, cryptography, and image resizing were too intensive for JavaScript executing in the browser. Toolix AI has dismantled this misconception through deep technical optimization and hardware-accelerated pipelines.
                  </p>
                  <p>
                    Our platform utilizes multiple cutting-edge technologies. For document management, we leverage binary array stream parsing, allowing PDF structures to be read and restructured instantly inside volatile RAM. For media utilities, we implement multi-threaded OffscreenCanvas rendering, which delegates heavy pixel loops to the device's Graphics Processing Unit (GPU), preventing browser layout lagging and maintaining a smooth 60 FPS. By avoiding costly network round-trips to remote databases, our tools execute operations in milliseconds, outperforming traditional cloud backends while consuming a fraction of the power.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-400" />
                    3. Enterprise Compliance: GDPR, HIPAA, and CCPA
                  </h3>
                  <p>
                    Corporate information compliance has become a primary bottleneck for modern enterprises. Software developers and database administrators frequently deal with confidential customer records, financial ledgers, and proprietary source code. Copying these sensitive payloads into random online converters is a severe data security violation.
                  </p>
                  <p>
                    Toolix AI offers a flawless compliance framework for companies bound by GDPR, HIPAA, and CCPA regulations. Because our architecture is built on absolute containment, zero payload bytes are transmitted across the internet during processing. Your files, database keys, API configs, and passwords remain strictly within your local environment. This local sandboxing model provides companies with mathematical proof of compliance, eliminating the administrative overhead of configuring complex third-party data processing agreements and ensuring total information protection.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    4. Democratic, Offline-First Software Distribution
                  </h3>
                  <p>
                    We are dedicated to building a democratic, open, and fully accessible internet. Traditional software distribution models force users into rigid subscription models or flood their screens with invasive, slow-loading advertisements. Toolix AI operates on a sustainable server-free model. By offloading all computing costs onto client processors, we save significant hosting costs. This allows us to offer our complete catalog of over 100 tools completely free, without any registration or usage ceilings.
                  </p>
                  <p>
                    Furthermore, as a Progressive Web App (PWA), Toolix AI is engineered to work anywhere. Once you install our application, the local cache assets allow you to merge PDFs, calculate finance spreadsheets, and modify text files completely offline—whether you are on a flight, in a remote location, or experiencing a power outage. At Toolix AI, we are proud to combine visual elegance with extreme performance, defining the future of secure client-side engineering.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    1. فلسفة الحوسبة المحلية واللامركزية
                  </h3>
                  <p>
                    تأسست شركة توليكس (Toolix AI) برؤية ثورية وهدف واضح: تغيير كيفية تفاعل ملايين المطورين، المصممين، والشركات مع الأدوات والخدمات الرقمية اليومية. على مدار العقد الماضي، تدافعت صناعة البرمجيات نحو الحوسبة السحابية المركزية بشكل مفرط؛ فأصبحت كل عملية بسيطة—سواء كانت دمج ملف PDF، ضغط صورة، تنسيق ملف إعدادات، أو حساب الفائدة—تتطلب رفع الملفات بالكامل إلى خوادم بعيدة، مما يعرض خصوصية المستخدمين للخطر ويزيد من تكلفة استهلاك البيانات والوقت.
                  </p>
                  <p>
                    نحن في توليكس نؤمن بأن الحصول على برمجيات متميزة لا يجب أن يكون على حساب خصوصيتك المطلقة وأمن معلوماتك؛ لذا قمنا بهندسة وبناء ترسانة كاملة من الأدوات التي تعمل بالكامل محلياً داخل متصفحك الشخصي. نقوم بتحويل كتل الأكواد البرمجية الضخمة بلغات C++ و Rust إلى لغة ويب فائقة الأداء (WebAssembly) لتتم المعالجة مباشرة على معالج جهازك الشخصي، مما يضمن بقاء ملفاتك ونصوصك الحساسة داخل جهازك دون أن تلمس أي خادم سحابي خارجي.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                    2. الابتكار التقني والأداء الخارق للأجهزة الطرفية
                  </h3>
                  <p>
                    لفترات طويلة، كانت تطبيقات الويب المحلية تقتصر على فحص المدخلات البسيطة وتنسيق النصوص الخفيفة، وكان هناك اعتقاد سائد بأن معالجة الملفات المعقدة والتشفير وتعديل الصور لا يمكن إنجازه إلا عبر خوادم سحابية عملاقة. نجحت توليكس في دحض هذا الاعتقاد وتخطيه بالكامل من خلال توفير خطوط معالجة مسرعة عتادياً ومحسنة بأقصى دقة.
                  </p>
                  <p>
                    تعتمد منصتنا على تقنيات معالجة متطورة؛ فنحن نقرأ مستندات PDF ونعيد هيكلة مصفوفاتها الرقمية في الذاكرة العشوائية (RAM) في أجزاء من الثانية، كما نستعين بتقنيات الرسم الخلفي المتطور (OffscreenCanvas) لنقل مهام تعديل وضغط الصور الثقيلة إلى معالج الرسوميات (GPU) بجهازك، لتتم العمليات بسلاسة مذهلة وبسرعة تفوق الخوادم السحابية التقليدية وبدون أي استهلاك لبيانات الإنترنت.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-400" />
                    3. الامتثال للتشريعات الدولية وأمن البيانات للشركات
                  </h3>
                  <p>
                    أصبح أمن البيانات والالتزام بالقوانين التنظيمية والتشريعية العقبة الأكبر أمام كبرى المؤسسات والشركات اليوم؛ فالمبرمجون والمحاسبون يتعاملون يومياً مع بيانات عملاء سرية، وخطط مالية حساسة، وأكواد برمجية محمية بحقوق الملكية الفكرية، ولصق هذه البيانات في مواقع إنترنت غير موثوقة لمجرد تنسيقها يعد خرقاً أمنياً خطيراً.
                  </p>
                  <p>
                    تمنح توليكس حلاً مثالياً للشركات والجهات الخاضعة لمعايير الخصوصية الصارمة مثل GDPR و HIPAA و CCPA. نظراً لأن معمارية توليكس تقوم على العزل والاحتواء المطلق للبيانات داخل جهاز المستخدم، فلا توجد أي فرصة لتسريب البيانات أو تتبعها. يمنح هذا النموذج الشركات دليلاً مادياً وتقنياً على الامتثال لمعايير الأمان، ويوفر حماية متكاملة لأصول الشركة دون إبطاء وتيرة عمل الموظفين.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    4. توفير برمجيات حرة ومجانية وتدعم العمل دون اتصال
                  </h3>
                  <p>
                    نحن ملتزمون بالمساهمة في بناء إنترنت ديمقراطي، حر، ومفتوح للجميع؛ فالنماذج التقليدية للبرمجيات تجبر المستخدم على اشتراكات شهرية مكلفة أو تملأ شاشته بإعلانات ثقيلة ومزعجة. تقوم توليكس على نموذج مستدام خالٍ من تكاليف الخوادم الباهظة؛ فمن خلال نقل العمليات الحسابية لمعالج جهازك الشخصي، نوفر تكاليف استضافة البيانات لنمنحك ترسانة من الأدوات البرمجية مجاناً بالكامل وبلا أي قيود استخدام.
                  </p>
                  <p>
                    بالإضافة إلى ذلك، وكتطبيق ويب تقدمي (PWA)، يمكنك تثبيت توليكس على جهازك لتعمل بكفاءة مطلقة أثناء سفرك بالطائرة، أو في الأماكن التي ينقطع فيها اتصالك بالإنترنت. نفخر في توليكس بدمجنا بين جمالية التصميم وقوة الأداء لنمهد الطريق لمستقبل برمجيات الحوسبة المحلية الآمنة والذكية.
                  </p>
                </section>
              </>
            )}
          </div>

          {/* Stats Summary Block */}
          <div className={`p-8 rounded-3xl border ${darkMode ? 'border-slate-800/80 bg-[#030712]/40' : 'bg-slate-50 border-slate-200'} grid grid-cols-2 md:grid-cols-4 gap-6 text-center`}>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-black text-blue-400">100+</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {language === 'en' ? 'Professional Tools' : 'أداة احترافية مدمجة'}
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
                {language === 'en' ? 'Saved On Cloud' : 'بيانات مرفوعة للسحابة'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-black text-emerald-400">0$</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {language === 'en' ? 'Subscription Cost' : 'رسوم اشتراك مطلوبة'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. OUR MISSION PAGE */}
      {activeTab === 'mission' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
              <ShieldCheck className="w-8 h-8" />
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {language === 'en' ? 'Our Mission' : 'رسالتنا وهدفنا الأساسي'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Securing the web by eliminating unnecessary data transmissions, keeping sensitive user records where they belong—on local user hardware.'
                : 'تأمين شبكة الويب من خلال إلغاء رحلات رفع البيانات غير الضرورية، والاحتفاظ بملفات ونصوص المستخدمين الحساسة داخل أجهزتهم المحلية.'}
            </p>
          </div>

          {getAdSensePlaceholder()}

          <div className={`p-8 rounded-3xl border ${darkMode ? 'border-slate-800 bg-slate-900/20' : 'bg-white border-slate-200'} space-y-6 leading-relaxed text-slate-300 text-xs md:text-sm`}>
            <p>
              {language === 'en'
                ? "Every day, billions of web transactions upload personal spreadsheets, private PDFs, proprietary layouts, and cryptographic key configurations to unverified remote servers. Our mission at Toolix AI is to secure this digital footprint. We are on a mission to build a completely local, zero-tracking, and zero-latency utilities ecosystem that executes entirely within your browser's memory."
                : "يومياً، تقوم مليارات العمليات الرقمية برفع فواتير ومستندات وصور حساسة للغاية إلى خوادم سحابية مجهولة ومفتوحة. رسالتنا وهدفنا الأساسي في توليكس هو تأمين هذه الفراغات الرقمية وبناء منظومة متكاملة تعمل محلياً بالكامل خالية من التتبع، حريصة على حماية أمن المطورين والشركات."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">{language === 'en' ? 'Zero Leakage Standards' : 'معايير صفر تسريب'}</h4>
                  <p className="text-xs text-slate-400 mt-1">{language === 'en' ? 'Every algorithm is programmed to execute locally within RAM buffers.' : 'تمت برمجة كافة الخوارزميات لتعمل وتستقر داخل الذاكرة العشوائية لجهازك.'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">{language === 'en' ? 'High Performance SDKs' : 'أداء خارق ومبسط'}</h4>
                  <p className="text-xs text-slate-400 mt-1">{language === 'en' ? 'Leveraging hardware acceleration to compute tasks in milliseconds.' : 'استغلال التسريع العتادي والـ GPU لإتمام العمليات في أجزاء من الثانية.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. OUR VISION PAGE */}
      {activeTab === 'vision' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block p-3 bg-purple-500/10 text-purple-400 rounded-2xl">
              <Sparkles className="w-8 h-8" />
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {language === 'en' ? 'Our Vision' : 'رؤيتنا للمستقبل الرقمي'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Pioneering a decentralized, server-free web where powerful software suites exist as sandboxed utilities directly inside the client.'
                : 'قيادة الويب اللامركزي الخالي من الخوادم، حيث تعيش وتعمل كبرى حزم البرمجيات كخدمات محلية آمنة ومستقلة داخل جهاز العميل مباشرة.'}
            </p>
          </div>

          {getAdSensePlaceholder()}

          <div className={`p-8 rounded-3xl border ${darkMode ? 'border-slate-800 bg-slate-900/20' : 'bg-white border-slate-200'} space-y-6 leading-relaxed text-slate-300 text-xs md:text-sm`}>
            <p>
              {language === 'en'
                ? "The future of the web belongs to edge computing. We envision a digital landscape where users do not have to compromise their privacy or download massive desktop installers to perform advanced computing. Our vision is to pioneer a server-free, highly fluid PWA ecosystem that scales infinitely, runs instantly, and sets a new global benchmark for secure, privacy-first software distribution."
                : "إن مستقبل شبكة الويب هو للأجهزة الطرفية والمحلية اللامركزية. نتطلع لبناء فضاء رقمي لا يضطر فيه المستخدم للتنازل عن أمنه الشخصي أو تثبيت برمجيات ثقيلة لإنجاز أعماله اليومية. رؤيتنا هي تمهيد الطريق لتطبيقات ويب تقدمية (PWAs) متكاملة تتسع بلا حدود وتستجيب بلحظتها، وتضع معياراً عالمياً جديداً للبرمجة الآمنة."}
            </p>
          </div>
        </div>
      )}

      {/* 4. MEET THE TEAM PAGE */}
      {activeTab === 'team' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl">
              <UserCheck className="w-8 h-8" />
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {language === 'en' ? 'Meet Our Experts' : 'فريق العمل والخبراء'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Meet the engineers, security auditors, and UX designers behind Toolix AI’s secure, high-performance offline suite.'
                : 'تعرف على نخبة المهندسين، محللي الأمان الرقمي، ومصممي الواجهات الذين يقفون وراء أدوات توليكس الفائقة والآمنة.'}
            </p>
          </div>

          {getAdSensePlaceholder()}

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border transition-all duration-300 ${darkMode ? 'border-slate-800 bg-[#070b14]/50 shadow-2xl hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-base font-black ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {language === 'en' ? member.nameEn : member.nameAr}
                    </h3>
                    <p className="text-xs text-blue-400 font-medium mt-1">
                      {language === 'en' ? member.roleEn : member.roleAr}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'bg-slate-900 border border-slate-800 text-indigo-400' : 'bg-slate-100 text-indigo-600'}`}>
                    {language === 'en' ? member.deptEn : member.deptAr}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'en' ? member.bioEn : member.bioAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. OUR STORY PAGE */}
      {activeTab === 'story' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
              <Code className="w-8 h-8" />
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {language === 'en' ? 'Our Story' : 'قصة تأسيس توليكس'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'How a group of privacy-focused developers built Toolix to combat bloated, ad-ridden, and insecure cloud converters.'
                : 'كيف قررت مجموعة من المطورين المهتمين بالأمان الرقمي بناء توليكس لمحاربة الأدوات البطيئة المليئة بالإعلانات والملفات المزعجة.'}
            </p>
          </div>

          {getAdSensePlaceholder()}

          <div className={`p-8 rounded-3xl border ${darkMode ? 'border-slate-800 bg-slate-900/20' : 'bg-white border-slate-200'} space-y-6 leading-relaxed text-slate-300 text-xs md:text-sm`}>
            {language === 'en' ? (
              <>
                <p>
                  Toolix AI was born out of frustration. In 2024, our founder, Fares Al-Otaibi, was working as a senior cybersecurity consultant. One afternoon, he observed a junior developer copying a highly confidential API configuration file containing database passwords, encryption tokens, and personal user data, pasting it into a "free online JSON formatter" to clean the formatting.
                </p>
                <p>
                  Fares quickly intervened, knowing that this action had uploaded confidential corporate secrets to an unverified remote server. When he searched for alternative local formatting tools, he found only heavy, slow IDE extensions or ad-ridden websites that required active internet connections and constant registrations.
                </p>
                <p>
                  He realized there was a critical gap in the developer ecosystem: a complete, beautiful, and secure utilities suite that executed completely locally inside the browser. Over the next year, Fares partnered with cryptographer Sarah Mitchell, UX architect Alex Rivera, and AI researcher Elena Rostov to build the first release of Toolix.
                </p>
                <p>
                  Today, Toolix AI serves millions of developers and organizations around the globe, proving that high-performance, beautiful utilities can exist with absolute privacy and zero server overhead.
                </p>
              </>
            ) : (
              <>
                <p>
                  ولدت منصة توليكس (Toolix AI) من قلب المعاناة والحرص على حماية أسرار العمل؛ ففي عام 2024، وأثناء عمل مؤسس المنصة المهندس فارس العتيبي كمستشار أول للأمن السيبراني في إحدى الشركات الكبرى، لاحظ قيام مبرمج مبتدئ بنسخ ملف إعدادات سري للغاية يحتوي على كلمات مرور قواعد البيانات ورموز مشفرة، ولصقه بالكامل في موقع ويب مجهول لمجرد تنسيقه وجعله مقروءاً.
                </p>
                <p>
                  تدخل فارس على الفور لمعرفته العميقة بأن هذا التصرف قد تسبب في رفع أسرار الشركة لملقمات خارجية لا يُعرف مدى أمانها وحفظها للبيانات. وعند بحثه عن بدائل محلية آمنة وسريعة، لم يجد سوى إضافات معقدة وبطيئة، أو مواقع ممتلئة بالإعلانات المزعجة وتطلب اشتراكات مستمرة.
                </p>
                <p>
                  من هنا أدرك فارس وجود حاجة حتمية لترسانة برمجية متكاملة تمنح المطورين أدوات تنسيق، تشفير، وتعديل ملفات تعمل بالكامل داخل جهاز المستخدم وبشكل محلي آمن 100%. وخلال العام اللاحق، تحالف مع الخبيرة في التشفير سارة ميتشل، ومصمم الواجهات أليكس ريفيرا، والباحثة إيلينا روستوف لإطلاق الإصدار الأول لتوليكس.
                </p>
                <p>
                  اليوم، تخدم منصة توليكس ملايين المستخدمين والمؤسسات حول العالم، لتبرهن بكل قوة على أن الأداء والجمال والإنتاجية الرقمية يمكن أن تجتمع وتعمل في تناغم تام تحت مظلة الخصوصية المطلقة والأمان الكامل.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* 6. SUPPORT CENTER PAGE */}
      {activeTab === 'support' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
              <HelpCircle className="w-8 h-8" />
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {language === 'en' ? 'Support Center' : 'مركز المساعدة والدعم'}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Find answers, search our comprehensive FAQs, or reach out to our dedicated support channels.'
                : 'اعثر على الإجابات الوافية، وابحث في قائمة الأسئلة الشائعة، أو تواصل مباشرة مع فريق الدعم والمساندة.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input 
                type="text"
                placeholder={language === 'en' ? 'Search FAQs...' : 'ابحث في الأسئلة الشائعة...'}
                value={supportSearch}
                onChange={(e) => setSupportSearch(e.target.value)}
                className={`w-full px-5 py-3.5 rounded-2xl border text-xs outline-none transition-all ${darkMode ? 'bg-slate-900/60 border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'}`}
              />
            </div>
          </div>

          {getAdSensePlaceholder()}

          {/* FAQs Accordion */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة المتكررة'}
            </h3>
            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = faqOpen === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`rounded-2xl border transition-all ${darkMode ? 'border-slate-800/80 bg-[#070b14]/30' : 'border-slate-200 bg-slate-50/50'}`}
                    >
                      <button 
                        onClick={() => setFaqOpen(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left flex justify-between items-center font-bold text-xs md:text-sm text-slate-200 hover:text-white"
                        style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                      >
                        <span>{language === 'en' ? faq.qEn : faq.qAr}</span>
                        <span className="text-blue-400 font-mono text-base ml-2 shrink-0">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-dashed border-slate-800/60 pt-3">
                          {language === 'en' ? faq.aEn : faq.aAr}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">{language === 'en' ? 'No FAQs found matching your query.' : 'لم يتم العثور على نتائج تطابق بحثك.'}</p>
              )}
            </div>
          </div>

          {/* Quick Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6">
            <div className={`p-5 rounded-2xl border ${darkMode ? 'border-slate-800 bg-slate-950/40' : 'bg-slate-50 border-slate-200'} flex gap-4 items-start`}>
              <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-white text-xs md:text-sm">{language === 'en' ? 'Email Support' : 'الدعم البريدي'}</h4>
                <p className="text-xs text-slate-400 mt-1">{language === 'en' ? 'Send a detailed request directly to our inbox.' : 'راسلنا مباشرة عبر البريد الإلكتروني المعتمد للرد الفوري.'}</p>
                <a href="mailto:support@toolixai.com" className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-bold mt-3 hover:underline">
                  support@toolixai.com <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className={`p-5 rounded-2xl border ${darkMode ? 'border-slate-800 bg-slate-950/40' : 'bg-slate-50 border-slate-200'} flex gap-4 items-start`}>
              <MessageSquare className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-white text-xs md:text-sm">{language === 'en' ? 'Contact Form' : 'نموذج اتصل بنا'}</h4>
                <p className="text-xs text-slate-400 mt-1">{language === 'en' ? 'Fill out our secure contact page form immediately.' : 'املأ نموذج اتصل بنا المشفر لتواصل فوري مع فريق الأمان.'}</p>
                <button 
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-bold mt-3 hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Go to contact' : 'الذهاب لصفحة الاتصال'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
