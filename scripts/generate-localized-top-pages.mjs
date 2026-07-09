import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const langOrder = ["ko", "en", "ja", "zh-tw", "zh-cn", "ar", "fa", "ur"];
const labels = { ko: "KR", en: "EN", ja: "JA", "zh-tw": "繁", "zh-cn": "简", ar: "AR", fa: "FA", ur: "UR" };
const hreflang = { ko: "ko", en: "en", ja: "ja", "zh-tw": "zh-Hant", "zh-cn": "zh-Hans", ar: "ar", fa: "fa", ur: "ur" };

const langs = {
  ja: {
    html: "ja", dir: "ltr", root: "ja",
    nav: ["ホーム", "会社情報", "実績", "IP", "プロセス", "知識", "CEO", "Books"],
    legal: { terms: "利用規約", privacy: "プライバシーポリシー", notice: "法務文書は外部参照リンクを維持するため、標準文書へ移動します。", move: "標準文書を開く" },
    pages: {
      index: {
        title: "MEJE Works — 世界観IP制作スタジオ",
        desc: "世界観設計、キャラクター、ファンダム活動までを一つの制作パイプラインで扱うMEJE Worksの公式サイトです。",
        eyebrow: "WORLDVIEW IP STUDIO",
        h1: "世界観を、運用できるIPへ。",
        lead: "MEJE Worksは、IP資料の整理、翻訳・設定化、キャラクター構築、100本規模の物語制作、ファンダム活動設計までを一つの流れで扱う制作スタジオです。",
        cards: [
          ["最新プロジェクト", "Aidong World", "キャラクター、世界観、ウィキを連動させる最新プロジェクトです。", "https://idongworld.com/"],
          ["読める原稿", "MEJE Books", "制作手順と講演原稿を本の単位で読める公開サイトです。", "https://books.meje.kr/"],
          ["制作相談", "IP Partnership", "ブランド、ゲーム、エンターテインメントIPの世界観制作を相談できます。", "ip.html"],
        ],
      },
      about: {
        title: "会社情報 — MEJE Works",
        desc: "MEJE Worksは世界観戦略に基づくIP制作・運用スタジオです。",
        eyebrow: "COMPANY",
        h1: "MEJE Worksについて",
        lead: "私たちは、世界観を感覚的な設定集ではなく、制作・翻訳・物語・ファンダム運用をつなぐ知識構造として扱います。",
        cards: [["法人名", "株式会社MEJE Works"], ["代表", "Kim Dong-eun · 김동은"], ["領域", "世界観戦略 · IP企画 · K-Contents · Fandom Design"], ["連絡先", "fewk@meje.kr"]],
      },
      works: {
        title: "実績 — MEJE Works",
        desc: "MEJE Worksの自社IPと公開プロジェクトです。",
        eyebrow: "WORKS",
        h1: "プロジェクトと出版物",
        lead: "現在公開できる自社IP、出版物、ゲーム、研究・講演ラインを整理しています。",
        cards: [["Aidong World", "最新プロジェクト。キャラクターと世界観ウィキを含む公開サイトです。", "https://idongworld.com/"], ["FEWK", "サイバーパンクTRPGと102本の短編で構成された自社世界観IPです。", "universe.html"], ["Parrot Mart", "パブリッシャーテスト中の経営ゲームIPです。", "works.html"], ["MEJE Books", "公開原稿と講演稿を本単位で読むサイトです。", "https://books.meje.kr/"]],
      },
      ip: {
        title: "IP Partnership — MEJE Works",
        desc: "世界観IP制作、キャラクター設計、100日ファンダム活動のパートナーシップ。",
        eyebrow: "IP PARTNERSHIP",
        h1: "世界観IPを一緒に設計する",
        lead: "MEJE Worksは、資料整理から世界観設計、キャラクター、物語、ファンダム活動までをIP運用の入力資産として制作します。",
        cards: [["Partnership", "MEJEと共同で資源とリスクを分担するモデル。"], ["Transfer", "設定・キャラクター・文書を納品して運用を移管するモデル。"], ["Commission", "指定した作業範囲を委託制作するモデル。"]],
      },
      process: {
        title: "プロセス — MEJE Works",
        desc: "MEJE Worksの世界観IP制作プロセス。",
        eyebrow: "PROCESS",
        h1: "制作パイプライン",
        lead: "IPデータの収集からライブラリング、翻訳資料、ロアブック、キャラクター、Storytelling 100、ファンダム活動までを順に接続します。",
        cards: [["ライブラリング", "散在する資料をVaultへ整理します。", "process/librarying.html"], ["書淵閣", "外国語原典を翻訳・翻案資料へ変換します。", "process/seoyeongak.html"], ["ロアブック", "世界観資料を本とWeb公開版にまとめます。", "process/lorebook.html"], ["キャラクター構築", "一行のシードから人物シートを作ります。", "process/character.html"], ["Storytelling 100", "世界観と人物から100本の物語を作ります。", "process/storytelling100.html"]],
      },
      knowledge: {
        title: "知識体系 — MEJE Works",
        desc: "MEJEの制作知識、講演稿、公開原稿への入口です。",
        eyebrow: "KNOWLEDGE",
        h1: "MEJE Knowledge",
        lead: "制作手順、AI翻訳、世界観、ファンダム設計に関する公開原稿を整理합니다.",
        cards: [["MEJE Books", "公開原稿を本の形式で読みます。", "https://books.meje.kr/"], ["プロセス", "制作手順の公開ページです。", "process.html"], ["世界観設定", "FEWKとサンプル世界観への接続です。", "universe.html"]],
      },
      ceo: {
        title: "CEO — Kim Dong-eun",
        desc: "MEJE Works代表 Kim Dong-eunのプロフィール。",
        eyebrow: "CEO",
        h1: "Kim Dong-eun · 김동은",
        lead: "ゲーム開発、世界観設計、K-POP IP、AI翻訳実務を横断して、世界観を制作可能な構造へ翻訳してきた制作者です。",
        cards: [["MEJE Works", "代表取締役"], ["HYBE", "Worldview Library経験"], ["BTS WORLD", "開発リード経験"], ["専門領域", "世界観戦略 · IP企画 · 팬덤設計 · AI翻訳"]],
      },
      tmi: {
        title: "TMI — MEJE Works",
        desc: "MEJE.krのサイト案内です。",
        eyebrow: "DIRECTORY",
        h1: "サイト案内",
        lead: "主要ページ、外部サイト、連絡先をまとめたディレクトリです。",
        cards: [["MEJE.kr", "会社サイトのホームへ。", "index.html"], ["MEJE Books", "原稿サイトへ。", "https://books.meje.kr/"], ["Contact", "fewk@meje.kr", "mailto:fewk@meje.kr"]],
      },
    },
  },
};

langs["zh-cn"] = JSON.parse(JSON.stringify(langs.ja));
Object.assign(langs["zh-cn"], { html: "zh-Hans", root: "zh-cn", nav: ["首页", "关于", "作品", "IP", "流程", "知识", "CEO", "Books"] });
Object.assign(langs["zh-cn"].legal, { terms: "使用条款", privacy: "隐私政策", notice: "为保持外部引用地址，法律文件将连接到标准文档。", move: "打开标准文档" });
Object.assign(langs["zh-cn"].pages.index, { title: "MEJE Works — 世界观IP制作工作室", desc: "MEJE Works官方网站，连接世界观设计、角色、故事与粉丝活动制作。", h1: "把世界观做成可运营的IP。", lead: "MEJE Works把IP资料整理、翻译与设定、角色构建、百篇故事制作和粉丝活动设计连接成一条制作流程。" });
Object.assign(langs["zh-cn"].pages.about, { title: "关于 — MEJE Works", desc: "MEJE Works是一家基于世界观战略制作和运营IP的工作室。", h1: "关于MEJE Works", lead: "我们不把世界观看作单纯设定集，而是看作连接制作、翻译、故事和粉丝运营的知识结构。" });
Object.assign(langs["zh-cn"].pages.works, { title: "作品 — MEJE Works", h1: "项目与出版物", lead: "这里整理MEJE Works当前可公开的自有IP、出版物、游戏与讲演线。" });
Object.assign(langs["zh-cn"].pages.ip, { title: "IP合作 — MEJE Works", desc: "世界观IP制作、角色设计和粉丝活动合作。", h1: "共同设计世界观IP", lead: "从资料整理到世界观、角色、故事和粉丝活动，MEJE把它们制作成IP运营的输入资产。" });
Object.assign(langs["zh-cn"].pages.process, { title: "流程 — MEJE Works", desc: "MEJE Works的世界观IP制作流程。", h1: "制作管线", lead: "从IP数据收集、资料库化、翻译资料、Lorebook、角色、Storytelling 100到粉丝活动依次连接。" });
Object.assign(langs["zh-cn"].pages.knowledge, { title: "知识体系 — MEJE Works", desc: "连接MEJE制作知识、讲演稿和公开原稿。", h1: "MEJE Knowledge", lead: "整理关于制作流程、AI翻译、世界观与粉丝设计的公开原稿。" });
Object.assign(langs["zh-cn"].pages.ceo, { title: "CEO — Kim Dong-eun", desc: "MEJE Works代表Kim Dong-eun的简介。", h1: "Kim Dong-eun · 김동은", lead: "跨越游戏开发、世界观设计、K-POP IP与AI翻译实务，把世界观转化为可制作结构的创作者。" });
Object.assign(langs["zh-cn"].pages.tmi, { title: "TMI — MEJE Works", desc: "MEJE.kr网站导航。", h1: "网站导航", lead: "整理主要页面、外部网站和联系方式。" });

langs["zh-tw"] = JSON.parse(JSON.stringify(langs["zh-cn"]));
Object.assign(langs["zh-tw"], { html: "zh-Hant", root: "zh-tw", nav: ["首頁", "關於", "作品", "IP", "流程", "知識", "CEO", "Books"] });
Object.assign(langs["zh-tw"].legal, { terms: "使用條款", privacy: "隱私政策", notice: "為保持外部引用地址，法律文件將連接到標準文件。", move: "開啟標準文件" });
Object.assign(langs["zh-tw"].pages.index, { title: "MEJE Works — 世界觀IP製作工作室", desc: "MEJE Works官方網站，連接世界觀設計、角色、故事與粉絲活動製作。", h1: "把世界觀做成可營運的IP。", lead: "MEJE Works把IP資料整理、翻譯與設定、角色構建、百篇故事製作和粉絲活動設計連接成一條製作流程。" });
Object.assign(langs["zh-tw"].pages.about, { title: "關於 — MEJE Works", desc: "MEJE Works是一家基於世界觀戰略製作和營運IP的工作室。", h1: "關於MEJE Works", lead: "我們不把世界觀看作單純設定集，而是看作連接製作、翻譯、故事和粉絲營運的知識結構。" });

langs.ar = {
  html: "ar", dir: "rtl", root: "ar",
  nav: ["الرئيسية", "عن الشركة", "الأعمال", "IP", "العملية", "المعرفة", "CEO", "Books"],
  legal: { terms: "شروط الاستخدام", privacy: "سياسة الخصوصية", notice: "حفاظاً على عناوين الإحالة الخارجية، تنتقل الوثائق القانونية إلى النسخة القياسية.", move: "فتح الوثيقة القياسية" },
  pages: {
    index: { title: "MEJE Works — استوديو إنتاج IP قائم على العالم", desc: "موقع MEJE Works الرسمي.", eyebrow: "WORLDVIEW IP STUDIO", h1: "نحوّل العالم إلى IP قابل للتشغيل.", lead: "تربط MEJE Works تنظيم مواد IP، الترجمة والإعداد، بناء الشخصيات، إنتاج القصص، وتصميم نشاط الجمهور في خط إنتاج واحد.", cards: [["أحدث مشروع", "Aidong World", "مشروع يربط الشخصيات والعالم والويكي.", "https://idongworld.com/"], ["MEJE Books", "قراءة المخطوطات والمحاضرات ككتب.", "https://books.meje.kr/"], ["شراكة IP", "استشارة إنتاج عوالم للعلامات والألعاب والترفيه.", "ip.html"]] },
    about: { title: "عن الشركة — MEJE Works", desc: "MEJE Works استوديو لإنتاج وتشغيل IP قائم على العالم.", eyebrow: "COMPANY", h1: "عن MEJE Works", lead: "نرى العالم بنية معرفية تربط الإنتاج والترجمة والقصص وتشغيل الجمهور، لا مجرد كتاب إعدادات.", cards: [["الشركة", "MEJE Works Corp."], ["الممثل", "Kim Dong-eun · 김동은"], ["المجالات", "استراتيجية العالم · تخطيط IP · K-Contents · تصميم الجمهور"], ["البريد", "fewk@meje.kr"]] },
    works: { title: "الأعمال — MEJE Works", desc: "مشاريع MEJE Works العامة.", eyebrow: "WORKS", h1: "المشاريع والمنشورات", lead: "نرتب مشاريع IP الداخلية والمنشورات والألعاب وخطوط المحاضرات المتاحة علناً.", cards: [["Aidong World", "أحدث مشروع عام مع شخصيات وويكي عالم.", "https://idongworld.com/"], ["FEWK", "IP سايبربنك داخلي من TRPG و102 قصة قصيرة.", "universe.html"], ["Parrot Mart", "لعبة إدارة قيد اختبار الناشر.", "works.html"], ["MEJE Books", "موقع قراءة للمخطوطات العامة.", "https://books.meje.kr/"]] },
    ip: { title: "شراكة IP — MEJE Works", desc: "شراكة لإنتاج عالم وشخصيات وتشغيل جمهور.", eyebrow: "IP PARTNERSHIP", h1: "نصمم IP العالم معاً", lead: "تنتج MEJE مواد العالم والشخصيات والقصص ونشاط الجمهور كأصول تشغيلية للـIP.", cards: [["Partnership", "نموذج مشاركة الموارد والمخاطر."], ["Transfer", "نموذج تسليم الإعدادات والشخصيات والوثائق."], ["Commission", "إنتاج نطاق محدد بتكليف."]] },
    process: { title: "العملية — MEJE Works", desc: "خط إنتاج MEJE Works.", eyebrow: "PROCESS", h1: "خط الإنتاج", lead: "يتصل جمع بيانات IP، بناء المكتبة، الترجمة، Lorebook، الشخصيات، Storytelling 100 ونشاط الجمهور بالترتيب.", cards: [["بناء المكتبة", "تنظيم المواد المتناثرة في Vault.", "process/librarying.html"], ["سيويونغاك", "تحويل الأصل الأجنبي إلى مواد ترجمة واقتباس.", "process/seoyeongak.html"], ["Lorebook", "جمع مواد العالم في كتاب ونسخة ويب.", "process/lorebook.html"], ["بناء الشخصية", "من بذرة واحدة إلى بطاقة شخصية.", "process/character.html"], ["Storytelling 100", "إنتاج 100 قصة من العالم والشخصيات.", "process/storytelling100.html"]] },
    knowledge: { title: "المعرفة — MEJE Works", desc: "مدخل إلى معرفة MEJE العامة.", eyebrow: "KNOWLEDGE", h1: "MEJE Knowledge", lead: "مخطوطات عامة حول العملية، ترجمة AI، بناء العالم وتصميم الجمهور.", cards: [["MEJE Books", "قراءة المخطوطات ككتب.", "https://books.meje.kr/"], ["العملية", "صفحات العملية العامة.", "process.html"], ["إعداد العالم", "FEWK وعينات العالم.", "universe.html"]] },
    ceo: { title: "CEO — Kim Dong-eun", desc: "ملف ممثل MEJE Works.", eyebrow: "CEO", h1: "Kim Dong-eun · 김동은", lead: "صانع يترجم العالم إلى بنية قابلة للإنتاج عبر الألعاب، K-POP IP، وتصميم العالم وترجمة AI.", cards: [["MEJE Works", "الرئيس التنفيذي"], ["HYBE", "خبرة Worldview Library"], ["BTS WORLD", "خبرة قيادة التطوير"], ["المجالات", "استراتيجية العالم · تخطيط IP · تصميم الجمهور · ترجمة AI"]] },
    tmi: { title: "TMI — MEJE Works", desc: "دليل موقع MEJE.kr.", eyebrow: "DIRECTORY", h1: "دليل الموقع", lead: "صفحات رئيسية ومواقع خارجية وبيانات اتصال.", cards: [["MEJE.kr", "العودة إلى الصفحة الرئيسية.", "index.html"], ["MEJE Books", "موقع المخطوطات.", "https://books.meje.kr/"], ["Contact", "fewk@meje.kr", "mailto:fewk@meje.kr"]] },
  },
};

langs.fa = JSON.parse(JSON.stringify(langs.ar));
Object.assign(langs.fa, { html: "fa", root: "fa", nav: ["خانه", "درباره", "کارها", "IP", "فرآیند", "دانش", "CEO", "Books"] });
Object.assign(langs.fa.legal, { terms: "شرایط استفاده", privacy: "سیاست حریم خصوصی", notice: "برای حفظ آدرس‌های ارجاع خارجی، اسناد حقوقی به نسخه استاندارد منتقل می‌شوند.", move: "باز کردن سند استاندارد" });
Object.assign(langs.fa.pages.index, { title: "MEJE Works — استودیوی تولید IP جهان‌محور", desc: "وب‌سایت رسمی MEJE Works برای تولید جهان، شخصیت، داستان و فعالیت هواداری.", h1: "جهان را به IP قابل اجرا تبدیل می‌کنیم.", lead: "MEJE Works سازمان‌دهی مواد IP، ترجمه و تنظیم، ساخت شخصیت، تولید داستان و طراحی فعالیت هواداری را در یک خط تولید واحد وصل می‌کند.", cards: [["تازه‌ترین پروژه", "Aidong World", "پروژه تازه با شخصیت‌ها، جهان و ویکی.", "https://idongworld.com/"], ["متن‌های خواندنی", "MEJE Books", "خواندن متن‌ها و سخنرانی‌ها به شکل کتاب.", "https://books.meje.kr/"], ["مشاوره تولید", "IP Partnership", "مشاوره ساخت جهان برای برند، بازی و سرگرمی.", "ip.html"]] });
Object.assign(langs.fa.pages.about, { title: "درباره — MEJE Works", desc: "MEJE Works استودیوی تولید و عملیات IP بر پایه استراتژی جهان است.", h1: "درباره MEJE Works", lead: "ما جهان را نه فقط کتاب تنظیمات، بلکه ساختار دانشی می‌دانیم که تولید، ترجمه، داستان و عملیات هواداری را به هم وصل می‌کند.", cards: [["شرکت", "MEJE Works Corp."], ["نماینده", "Kim Dong-eun · 김동은"], ["حوزه‌ها", "استراتژی جهان · برنامه‌ریزی IP · K-Contents · طراحی هواداری"], ["ایمیل", "fewk@meje.kr"]] });

langs.ur = JSON.parse(JSON.stringify(langs.ar));
Object.assign(langs.ur, { html: "ur", root: "ur", nav: ["ہوم", "تعارف", "کام", "IP", "عمل", "علم", "CEO", "Books"] });
Object.assign(langs.ur.legal, { terms: "استعمال کی شرائط", privacy: "رازداری پالیسی", notice: "بیرونی حوالہ جاتی پتے برقرار رکھنے کے لیے قانونی دستاویزات معیاری نسخے کی طرف جاتی ہیں۔", move: "معیاری دستاویز کھولیں" });
Object.assign(langs.ur.pages.index, { title: "MEJE Works — ورلڈ ویو IP پروڈکشن اسٹوڈیو", desc: "MEJE Works کی سرکاری ویب سائٹ، جہاں دنیا، کردار، کہانی اور فینڈم سرگرمی تیار ہوتی ہے۔", h1: "ہم دنیا کو قابل عمل IP میں بدلتے ہیں۔", lead: "MEJE Works IP مواد کی تنظیم، ترجمہ و سیٹنگ، کردار سازی، کہانی پیداوار اور فینڈم سرگرمی ڈیزائن کو ایک ہی پیداوار لائن میں جوڑتا ہے۔", cards: [["تازہ منصوبہ", "Aidong World", "کردار، دنیا اور وکی کو جوڑنے والا تازہ منصوبہ۔", "https://idongworld.com/"], ["قابل مطالعہ متن", "MEJE Books", "متن اور لیکچر کو کتابی شکل میں پڑھیں۔", "https://books.meje.kr/"], ["پروڈکشن مشاورت", "IP Partnership", "برانڈ، گیم اور تفریحی IP کے لیے ورلڈ پروڈکشن مشاورت۔", "ip.html"]] });
Object.assign(langs.ur.pages.about, { title: "تعارف — MEJE Works", desc: "MEJE Works ورلڈ ویو اسٹریٹیجی پر مبنی IP پیداوار اور آپریشن اسٹوڈیو ہے۔", h1: "MEJE Works کا تعارف", lead: "ہم دنیا کو صرف سیٹنگ بک نہیں بلکہ ایسا علمی ڈھانچہ سمجھتے ہیں جو پیداوار، ترجمہ، کہانی اور فینڈم آپریشن کو جوڑتا ہے۔", cards: [["کمپنی", "MEJE Works Corp."], ["نمائندہ", "Kim Dong-eun · 김동은"], ["شعبے", "ورلڈ اسٹریٹیجی · IP منصوبہ بندی · K-Contents · فینڈم ڈیزائن"], ["ای میل", "fewk@meje.kr"]] });

Object.assign(langs["zh-cn"].pages.index, { cards: [["最新项目", "Aidong World", "连接角色、世界观和Wiki的最新项目。", "https://idongworld.com/"], ["可阅读原稿", "MEJE Books", "以书的形式阅读制作流程和讲演稿。", "https://books.meje.kr/"], ["制作咨询", "IP Partnership", "咨询品牌、游戏和娱乐IP的世界观制作。", "ip.html"]] });
Object.assign(langs["zh-cn"].pages.about, { cards: [["法人", "MEJE Works Corp."], ["代表", "Kim Dong-eun · 김동은"], ["领域", "世界观战略 · IP企划 · K-Contents · Fandom Design"], ["联系", "fewk@meje.kr"]] });
Object.assign(langs["zh-cn"].pages.works, { desc: "MEJE Works的自有IP和公开项目。", cards: [["Aidong World", "包含角色和世界观Wiki的最新公开项目。", "https://idongworld.com/"], ["FEWK", "由赛博朋克TRPG和102篇短篇组成的自有世界观IP。", "universe.html"], ["Parrot Mart", "正在进行发行商测试的经营游戏IP。", "works.html"], ["MEJE Books", "公开原稿和讲演稿阅读网站。", "https://books.meje.kr/"]] });
Object.assign(langs["zh-cn"].pages.ip, { cards: [["Partnership", "共同分担资源和风险的合作模式。"], ["Transfer", "交付设定、角色和文档并移交运营的模式。"], ["Commission", "按指定范围委托制作的模式。"]] });
Object.assign(langs["zh-cn"].pages.process, { cards: [["资料库化", "把分散资料整理为Vault。", "process/librarying.html"], ["书渊阁", "把外语原作转化为翻译与改编资料。", "process/seoyeongak.html"], ["Lorebook", "把世界观资料整理为书籍和公开网页版。", "process/lorebook.html"], ["角色构建", "从一行种子制作角色表。", "process/character.html"], ["Storytelling 100", "从世界观和角色制作100篇故事。", "process/storytelling100.html"]] });
Object.assign(langs["zh-cn"].pages.knowledge, { cards: [["MEJE Books", "以书的形式阅读公开原稿。", "https://books.meje.kr/"], ["流程", "公开的制作流程页面。", "process.html"], ["世界观设定", "连接FEWK和样例世界观。", "universe.html"]] });
Object.assign(langs["zh-cn"].pages.ceo, { cards: [["MEJE Works", "代表"], ["HYBE", "Worldview Library经验"], ["BTS WORLD", "开发负责人经验"], ["专业领域", "世界观战略 · IP企划 · 粉丝设计 · AI翻译"]] });
Object.assign(langs["zh-cn"].pages.tmi, { cards: [["MEJE.kr", "返回公司网站首页。", "index.html"], ["MEJE Books", "前往原稿网站。", "https://books.meje.kr/"], ["Contact", "fewk@meje.kr", "mailto:fewk@meje.kr"]] });

Object.assign(langs["zh-tw"].pages.index, { cards: [["最新專案", "Aidong World", "連接角色、世界觀和Wiki的最新專案。", "https://idongworld.com/"], ["可閱讀原稿", "MEJE Books", "以書的形式閱讀製作流程和講演稿。", "https://books.meje.kr/"], ["製作諮詢", "IP Partnership", "諮詢品牌、遊戲和娛樂IP的世界觀製作。", "ip.html"]] });
Object.assign(langs["zh-tw"].pages.about, { cards: [["法人", "MEJE Works Corp."], ["代表", "Kim Dong-eun · 김동은"], ["領域", "世界觀戰略 · IP企劃 · K-Contents · Fandom Design"], ["聯絡", "fewk@meje.kr"]] });
Object.assign(langs["zh-tw"].pages.works, { desc: "MEJE Works的自有IP和公開專案。", cards: [["Aidong World", "包含角色和世界觀Wiki的最新公開專案。", "https://idongworld.com/"], ["FEWK", "由賽博龐克TRPG和102篇短篇組成的自有世界觀IP。", "universe.html"], ["Parrot Mart", "正在進行發行商測試的經營遊戲IP。", "works.html"], ["MEJE Books", "公開原稿和講演稿閱讀網站。", "https://books.meje.kr/"]] });
Object.assign(langs["zh-tw"].pages.ip, { cards: [["Partnership", "共同分擔資源和風險的合作模式。"], ["Transfer", "交付設定、角色和文件並移交營運的模式。"], ["Commission", "按指定範圍委託製作的模式。"]] });
Object.assign(langs["zh-tw"].pages.process, { desc: "MEJE Works的世界觀IP製作流程。", cards: [["資料庫化", "把分散資料整理為Vault。", "process/librarying.html"], ["書淵閣", "把外語原作轉化為翻譯與改編資料。", "process/seoyeongak.html"], ["Lorebook", "把世界觀資料整理為書籍和公開網頁版。", "process/lorebook.html"], ["角色構建", "從一行種子製作角色表。", "process/character.html"], ["Storytelling 100", "從世界觀和角色製作100篇故事。", "process/storytelling100.html"]] });
Object.assign(langs["zh-tw"].pages.knowledge, { cards: [["MEJE Books", "以書的形式閱讀公開原稿。", "https://books.meje.kr/"], ["流程", "公開的製作流程頁面。", "process.html"], ["世界觀設定", "連接FEWK和樣例世界觀。", "universe.html"]] });
Object.assign(langs["zh-tw"].pages.ceo, { cards: [["MEJE Works", "代表"], ["HYBE", "Worldview Library經驗"], ["BTS WORLD", "開發負責人經驗"], ["專業領域", "世界觀戰略 · IP企劃 · 粉絲設計 · AI翻譯"]] });
Object.assign(langs["zh-tw"].pages.tmi, { cards: [["MEJE.kr", "返回公司網站首頁。", "index.html"], ["MEJE Books", "前往原稿網站。", "https://books.meje.kr/"], ["Contact", "fewk@meje.kr", "mailto:fewk@meje.kr"]] });

Object.assign(langs.fa.pages.works, { title: "کارها — MEJE Works", desc: "پروژه‌ها و IPهای عمومی MEJE Works.", h1: "پروژه‌ها و انتشارات", lead: "IPهای داخلی، بازی‌ها، انتشارات و خط‌های سخنرانی عمومی MEJE Works.", cards: [["Aidong World", "پروژه عمومی تازه با شخصیت‌ها و ویکی جهان.", "https://idongworld.com/"], ["FEWK", "IP سایبرپانک داخلی با TRPG و ۱۰۲ داستان کوتاه.", "universe.html"], ["Parrot Mart", "IP بازی مدیریتی در مرحله تست ناشر.", "works.html"], ["MEJE Books", "سایت خواندن متن‌های عمومی.", "https://books.meje.kr/"]] });
Object.assign(langs.fa.pages.ip, { title: "همکاری IP — MEJE Works", desc: "همکاری برای تولید جهان، شخصیت و فعالیت هواداری.", h1: "طراحی مشترک IP جهان‌محور", lead: "MEJE مواد جهان، شخصیت، داستان و فعالیت هواداری را به دارایی عملیاتی IP تبدیل می‌کند.", cards: [["Partnership", "مدل تقسیم منابع و ریسک."], ["Transfer", "تحویل تنظیمات، شخصیت‌ها و اسناد."], ["Commission", "تولید محدوده مشخص به سفارش."]] });
Object.assign(langs.fa.pages.process, { title: "فرآیند — MEJE Works", desc: "خط تولید IP جهان‌محور MEJE Works.", h1: "خط تولید", lead: "گردآوری داده IP، لایبررینگ، ترجمه، لوربوک، شخصیت، Storytelling 100 و فعالیت هواداری به‌ترتیب متصل می‌شوند.", cards: [["لایبررینگ", "مواد پراکنده را در Vault سازمان می‌دهد.", "process/librarying.html"], ["سئویونگاک", "متن خارجی را به مواد ترجمه و اقتباس تبدیل می‌کند.", "process/seoyeongak.html"], ["لوربوک", "مواد جهان را به کتاب و نسخه وب تبدیل می‌کند.", "process/lorebook.html"], ["ساخت شخصیت", "از یک بذر، شیت شخصیت می‌سازد.", "process/character.html"], ["Storytelling 100", "از جهان و شخصیت‌ها ۱۰۰ داستان می‌سازد.", "process/storytelling100.html"]] });
Object.assign(langs.fa.pages.knowledge, { title: "دانش — MEJE Works", h1: "MEJE Knowledge", lead: "متن‌های عمومی درباره فرآیند، ترجمه AI، جهان‌سازی و طراحی هواداری.", cards: [["MEJE Books", "خواندن متن‌ها به شکل کتاب.", "https://books.meje.kr/"], ["فرآیند", "صفحات عمومی فرآیند.", "process.html"], ["تنظیم جهان", "اتصال به FEWK و نمونه‌های جهان.", "universe.html"]] });
Object.assign(langs.fa.pages.ceo, { title: "CEO — Kim Dong-eun", h1: "Kim Dong-eun · 김동은", lead: "سازنده‌ای که جهان را از مسیر بازی، K-POP IP، طراحی جهان و ترجمه AI به ساختار قابل تولید تبدیل می‌کند.", cards: [["MEJE Works", "مدیرعامل"], ["HYBE", "تجربه Worldview Library"], ["BTS WORLD", "تجربه رهبری توسعه"], ["حوزه‌ها", "استراتژی جهان · برنامه‌ریزی IP · طراحی هواداری · ترجمه AI"]] });
Object.assign(langs.fa.pages.tmi, { title: "TMI — MEJE Works", h1: "راهنمای سایت", lead: "صفحات اصلی، سایت‌های بیرونی و راه‌های تماس.", cards: [["MEJE.kr", "بازگشت به صفحه اصلی.", "index.html"], ["MEJE Books", "سایت متن‌ها.", "https://books.meje.kr/"], ["Contact", "fewk@meje.kr", "mailto:fewk@meje.kr"]] });

Object.assign(langs.ur.pages.works, { title: "کام — MEJE Works", desc: "MEJE Works کے عوامی منصوبے اور IP۔", h1: "منصوبے اور اشاعتیں", lead: "MEJE Works کے داخلی IP، کھیل، اشاعتیں اور عوامی لیکچر لائنیں۔", cards: [["Aidong World", "کرداروں اور ورلڈ وکی کے ساتھ تازہ عوامی منصوبہ۔", "https://idongworld.com/"], ["FEWK", "TRPG اور 102 مختصر کہانیوں پر مشتمل داخلی سائبر پنک IP۔", "universe.html"], ["Parrot Mart", "پبلشر ٹیسٹ میں مینجمنٹ گیم IP۔", "works.html"], ["MEJE Books", "عوامی متن پڑھنے کی سائٹ۔", "https://books.meje.kr/"]] });
Object.assign(langs.ur.pages.ip, { title: "IP شراکت — MEJE Works", desc: "دنیا، کردار اور فینڈم سرگرمی کی پیداوار کے لیے شراکت۔", h1: "ورلڈ ویو IP کو مل کر ڈیزائن کرنا", lead: "MEJE دنیا، کردار، کہانی اور فینڈم سرگرمی کو IP آپریشن کے اثاثوں میں بدلتا ہے۔", cards: [["Partnership", "وسائل اور خطرے کی مشترکہ تقسیم۔"], ["Transfer", "سیٹنگ، کردار اور دستاویزات کی حوالگی۔"], ["Commission", "مقررہ دائرے کی کمیشنڈ پیداوار۔"]] });
Object.assign(langs.ur.pages.process, { title: "عمل — MEJE Works", desc: "MEJE Works کی ورلڈ ویو IP پیداوار لائن۔", h1: "پیداوار لائن", lead: "IP ڈیٹا جمع کرنا، لائبریرنگ، ترجمہ، لوربک، کردار، Storytelling 100 اور فینڈم سرگرمی ترتیب سے جڑتے ہیں۔", cards: [["لائبریرنگ", "بکھرے مواد کو Vault میں منظم کرتا ہے۔", "process/librarying.html"], ["سویونگاک", "غیر ملکی متن کو ترجمہ و اقتباس مواد میں بدلتا ہے۔", "process/seoyeongak.html"], ["لوربک", "دنیا کے مواد کو کتاب اور ویب نسخے میں بدلتا ہے۔", "process/lorebook.html"], ["کردار سازی", "ایک بیج سے کردار شیٹ بناتا ہے۔", "process/character.html"], ["Storytelling 100", "دنیا اور کرداروں سے 100 کہانیاں بناتا ہے۔", "process/storytelling100.html"]] });
Object.assign(langs.ur.pages.knowledge, { title: "علم — MEJE Works", h1: "MEJE Knowledge", lead: "عمل، AI ترجمہ، ورلڈ بلڈنگ اور فینڈم ڈیزائن پر عوامی متن۔", cards: [["MEJE Books", "متن کو کتابوں کی صورت پڑھیں۔", "https://books.meje.kr/"], ["عمل", "عوامی عمل صفحات۔", "process.html"], ["دنیا کی سیٹنگ", "FEWK اور نمونہ دنیاوں تک رسائی۔", "universe.html"]] });
Object.assign(langs.ur.pages.ceo, { title: "CEO — Kim Dong-eun", h1: "Kim Dong-eun · 김동은", lead: "ایسا تخلیق کار جو کھیل، K-POP IP، ورلڈ ڈیزائن اور AI ترجمہ سے دنیا کو قابل پیداوار ساخت میں بدلتا ہے۔", cards: [["MEJE Works", "CEO"], ["HYBE", "Worldview Library تجربہ"], ["BTS WORLD", "ترقیاتی قیادت کا تجربہ"], ["حوزه‌ها", "ورلڈ اسٹریٹیجی · IP منصوبہ بندی · فینڈم ڈیزائن · AI ترجمہ"]] });
Object.assign(langs.ur.pages.tmi, { title: "TMI — MEJE Works", h1: "سائٹ رہنما", lead: "اہم صفحات، بیرونی سائٹس اور رابطہ معلومات۔", cards: [["MEJE.kr", "مرکزی صفحے پر واپس۔", "index.html"], ["MEJE Books", "متن کی سائٹ۔", "https://books.meje.kr/"], ["Contact", "fewk@meje.kr", "mailto:fewk@meje.kr"]] });

function href(lang, page) {
  if (lang === "ko") return page === "index" ? "../index.html" : `../${page}.html`;
  if (lang === "en") return page === "index" ? "../en/index.html" : `../en/${page}.html`;
  return page === "index" ? `../${lang}/index.html` : `../${lang}/${page}.html`;
}

function canonical(lang, page) {
  if (lang === "ko") return page === "index" ? "https://meje.kr/" : `https://meje.kr/${page}.html`;
  if (lang === "en") return page === "index" ? "https://meje.kr/en/" : `https://meje.kr/en/${page}.html`;
  return page === "index" ? `https://meje.kr/${lang}/` : `https://meje.kr/${lang}/${page}.html`;
}

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function alternates(page) {
  return langOrder.map((lang) => `<link rel="alternate" hreflang="${hreflang[lang]}" href="${canonical(lang, page)}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${canonical("ko", page)}">`;
}

function langBar(active, page) {
  return langOrder.map((lang) => `<a href="${href(lang, page)}"${lang === active ? ' class="active"' : ""}>${labels[lang]}</a>`).join('<span class="sep">&middot;</span>');
}

function cardHtml(cards) {
  return cards.map((card) => {
    const title = card.length === 4 ? `${card[0]} · ${card[1]}` : card[0];
    const desc = card.length === 4 ? card[2] : card[1];
    const url = card.length === 4 ? card[3] : card[2];
    const tag = url ? "a" : "div";
    const hrefAttr = url ? ` href="${url}"${url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}` : "";
    return `<${tag} class="loc-card"${hrefAttr}>
      <h2>${esc(title)}</h2>
      <p>${esc(desc)}</p>
    </${tag}>`;
  }).join("\n");
}

function renderPage(langKey, page, content) {
  const lang = langs[langKey];
  const dir = lang.dir === "rtl" ? ' dir="rtl"' : "";
  return `<!DOCTYPE html>
<html lang="${lang.html}"${dir}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${esc(content.desc)}">
<title>${esc(content.title)}</title>
<meta property="og:title" content="${esc(content.title)}">
<meta property="og:description" content="${esc(content.desc)}">
<meta property="og:image" content="https://meje.kr/img/og-cover.png">
<meta property="og:url" content="${canonical(langKey, page)}">
<meta property="og:type" content="website">
${alternates(page)}
<link rel="icon" type="image/svg+xml" href="../img/favicon.svg">
<link rel="apple-touch-icon" href="../img/logo.png">
<link rel="stylesheet" href="../css/style.css">
<style>
.lang-bar { display:flex; gap:8px; align-items:center; }
.lang-bar a { font-family:var(--mono); font-size:10px; color:var(--text-dim); text-decoration:none; letter-spacing:0.04em; }
.lang-bar a.active { color:var(--accent); }
.lang-bar .sep { color:var(--text-dim); opacity:0.45; font-size:8px; }
.loc-main { padding: 120px 40px 80px; max-width: 1180px; margin: 0 auto; }
.loc-hero { padding: 80px 0 64px; border-bottom: 1px solid var(--border-dim); }
.loc-eyebrow { font-family:var(--mono); color:var(--accent); font-size:12px; letter-spacing:0.16em; margin-bottom:18px; }
.loc-title { font-family:var(--display); font-size:clamp(36px, 6vw, 72px); line-height:1.05; margin-bottom:22px; color:var(--text); }
.loc-lead { max-width:760px; color:var(--text-muted); line-height:2; font-size:16px; }
.loc-grid { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:2px; margin-top:48px; }
.loc-card { display:block; min-height:180px; padding:28px; background:var(--bg-2); border:1px solid var(--border-dim); text-decoration:none; color:var(--text); }
.loc-card h2 { font-family:var(--display); font-size:21px; margin-bottom:12px; color:var(--text); }
.loc-card p { color:var(--text-muted); line-height:1.8; font-size:14px; }
.loc-card[href]:hover { border-color:var(--accent-dim); background:var(--bg-3); }
@media (max-width: 820px) { .loc-main { padding:96px 20px 56px; } .loc-grid { grid-template-columns:1fr; } }
</style>
</head>
<body>
<nav class="site-nav">
  <a href="index.html" class="nav-logo">MEJE<span>.</span>KR</a>
  <div class="lang-bar">${langBar(langKey, page)}</div>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')">MENU</button>
  <ul class="nav-links">
    <li><a href="index.html"${page === "index" ? ' class="active"' : ""}>${esc(lang.nav[0])}</a></li>
    <li><a href="about.html"${page === "about" ? ' class="active"' : ""}>${esc(lang.nav[1])}</a></li>
    <li><a href="works.html"${page === "works" ? ' class="active"' : ""}>${esc(lang.nav[2])}</a></li>
    <li><a href="ip.html"${page === "ip" ? ' class="active"' : ""}>${esc(lang.nav[3])}</a></li>
    <li><a href="process.html"${page === "process" ? ' class="active"' : ""}>${esc(lang.nav[4])}</a></li>
    <li><a href="knowledge.html"${page === "knowledge" ? ' class="active"' : ""}>${esc(lang.nav[5])}</a></li>
    <li><a href="ceo.html"${page === "ceo" ? ' class="active"' : ""}>${esc(lang.nav[6])}</a></li>
    <li><a href="https://books.meje.kr/" target="_blank" rel="noopener">${esc(lang.nav[7])}</a></li>
  </ul>
  <span class="nav-badge">${esc(content.eyebrow)}</span>
</nav>
<main class="loc-main">
  <section class="loc-hero">
    <p class="loc-eyebrow">${esc(content.eyebrow)}</p>
    <h1 class="loc-title">${esc(content.h1)}</h1>
    <p class="loc-lead">${esc(content.lead)}</p>
  </section>
  <section class="loc-grid">${cardHtml(content.cards)}</section>
</main>
<footer>
  <p class="footer-logo">MEJE<span>.</span>KR</p>
  <div class="footer-contact">MEJE Works Corp. ｜ Kim Dong-eun ｜ 772-87-02365<br>503, 217, Yeoksam-ro, Gangnam-gu, Seoul ｜ 0507-1420-1205</div>
  <div class="footer-links">
    <a href="index.html">${esc(lang.nav[0])}</a>
    <a href="about.html">${esc(lang.nav[1])}</a>
    <a href="works.html">${esc(lang.nav[2])}</a>
    <a href="process.html">${esc(lang.nav[4])}</a>
    <a href="knowledge.html">${esc(lang.nav[5])}</a>
    <a href="https://books.meje.kr/" target="_blank" rel="noopener">${esc(lang.nav[7])}</a>
  </div>
  <p class="footer-copy">&copy; MEJE Works Corp. All Rights Reserved.</p>
</footer>
</body>
</html>`;
}

function renderLegal(langKey, kind) {
  const lang = langs[langKey];
  const title = kind === "terms" ? lang.legal.terms : lang.legal.privacy;
  const target = `../${kind}.html`;
  const dir = lang.dir === "rtl" ? ' dir="rtl"' : "";
  return `<!DOCTYPE html>
<html lang="${lang.html}"${dir}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="refresh" content="0; url=${target}">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="https://meje.kr/${kind}.html">
<title>${esc(title)} | MEJE WORKS</title>
</head>
<body>
<p>${esc(lang.legal.notice)}</p>
<p><a href="${target}">${esc(lang.legal.move)}</a></p>
</body>
</html>`;
}

for (const [langKey, lang] of Object.entries(langs)) {
  for (const [page, content] of Object.entries(lang.pages)) {
    fs.writeFileSync(path.join(root, lang.root, `${page}.html`), renderPage(langKey, page, content));
  }
  fs.writeFileSync(path.join(root, lang.root, "terms.html"), renderLegal(langKey, "terms"));
  fs.writeFileSync(path.join(root, lang.root, "privacy.html"), renderLegal(langKey, "privacy"));
}

console.log("Localized top pages generated.");
