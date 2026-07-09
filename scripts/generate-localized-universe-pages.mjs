import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const langOrder = ["ko", "en", "ja", "zh-tw", "zh-cn", "ar", "fa", "ur"];
const labels = { ko: "KR", en: "EN", ja: "JA", "zh-tw": "繁", "zh-cn": "简", ar: "AR", fa: "FA", ur: "UR" };
const hreflang = { ko: "ko", en: "en", ja: "ja", "zh-tw": "zh-Hant", "zh-cn": "zh-Hans", ar: "ar", fa: "fa", ur: "ur" };

const sources = [
  {
    kicker: "PUBLIC WIKI",
    title: "MEJEwiki",
    url: "https://whtdrgongmail.github.io/MEJEwiki/",
  },
  {
    kicker: "ONLINE RULEBOOK",
    title: "FEWKbooks3rd",
    url: "https://whtdrgongmail.github.io/FEWKbooks3rd/#home",
  },
  {
    kicker: "GITHUB",
    title: "whtdrgongmail/MEJEwiki",
    url: "https://github.com/whtdrgongmail/MEJEwiki",
  },
  {
    kicker: "GITHUB",
    title: "whtdrgongmail/FEWKbooks3rd",
    url: "https://github.com/whtdrgongmail/FEWKbooks3rd",
  },
];

const samples = [
  ["h1-gongdong", "h1-gongdong-hero.png"],
  ["h2-hyanggung", "h2-hyanggung-hero.png"],
  ["h3-seongra-gangho", "h3-seongra-gangho-hero.png"],
  ["h4-gyunsahae", "h4-gyunsahae-hero.png"],
  ["h5-sangyeoho", "h5-sangyeoho-hero.png"],
  ["h6-rosy-hollow", "h6-rosy-hollow-hero.png"],
  ["h7-jeonsuseo", "h7-jeonsuseo-hero.png"],
  ["h8-nubi", "h8-nubi-hero.png"],
  ["h9-usabu", "h9-usabu-hero.png"],
  ["h10-daesu", "h10-daesu-hero.png"],
];

const sampleText = {
  en: {
    titles: ["Gongdong", "Hyanggung", "Seongra Gangho", "Gyunsahae", "Sangyeoho", "Rosy Hollow", "Jeonsuseo", "Land of Nubi", "Usabu", "Light of Daesu"],
    descs: [
      "A hunter-style world about gates, rank society, and the anomaly of having no trait.",
      "A world where scent, mana, the imperial court, and perfumer guilds organize power.",
      "A martial world where celestial signs, stars, true names, and old debts intersect.",
      "An ecological world about mycelial networks, connection, symbiosis, and decay.",
      "A world of waterborne rites, memory, and navigation for the dead.",
      "A lorebook sample for the Rosy Hollow world.",
      "A lorebook sample for the Jeonsuseo world.",
      "A lorebook sample for the Land of Nubi.",
      "A lorebook sample for the Usabu world.",
      "A world of villages and promises on the back of a great beast.",
    ],
  },
  ja: {
    titles: ["共同", "香宮", "星羅江湖", "菌糸海", "喪輿湖", "ロジーホロウ", "伝授書", "ヌビの地", "ウサブ", "大獣の灯"],
    descs: [
      "ゲート、等級社会、無特性という変則を扱うハンター型世界観。",
      "香り、マナ、皇室、調香ギルドが権力を構成する世界観。",
      "天機、星、本命星、江湖の恩怨が交差する武侠世界観。",
      "菌糸網、接続、共生と腐敗の倫理を扱う生態型世界観。",
      "水上の儀礼、記憶、亡者の航法を扱う世界観。",
      "ロジーホロウ世界観のロアブックサンプル。",
      "伝授書世界観のロアブックサンプル。",
      "ヌビの地のロアブックサンプル。",
      "ウサブ世界観のロアブックサンプル。",
      "巨大な獣の背で生きる村と約束の世界観。",
    ],
  },
  "zh-tw": {
    titles: ["共同", "香宮", "星羅江湖", "菌絲海", "喪輿湖", "Rosy Hollow", "傳授書", "Nubi之地", "Usabu", "大獸之燈"],
    descs: [
      "處理門、等級社會與無特性變則的獵人型世界觀。",
      "以香氣、魔力、皇室與調香公會構成權力的世界觀。",
      "天機、星辰、本命星與江湖恩怨交錯的武俠世界觀。",
      "處理菌絲網、連接、共生與腐敗倫理的生態型世界觀。",
      "處理水上儀式、記憶與亡者航法的世界觀。",
      "Rosy Hollow世界觀的Lorebook樣例。",
      "傳授書世界觀的Lorebook樣例。",
      "Nubi之地的Lorebook樣例。",
      "Usabu世界觀的Lorebook樣例。",
      "在巨大野獸背上生活的村落與約定的世界觀。",
    ],
  },
  "zh-cn": {
    titles: ["共同", "香宫", "星罗江湖", "菌丝海", "丧舆湖", "Rosy Hollow", "传授书", "Nubi之地", "Usabu", "大兽之灯"],
    descs: [
      "处理门、等级社会与无特性变则的猎人型世界观。",
      "以香气、魔力、皇室与调香公会构成权力的世界观。",
      "天机、星辰、本命星与江湖恩怨交错的武侠世界观。",
      "处理菌丝网、连接、共生与腐败伦理的生态型世界观。",
      "处理水上仪式、记忆与亡者航法的世界观。",
      "Rosy Hollow世界观的Lorebook样例。",
      "传授书世界观的Lorebook样例。",
      "Nubi之地的Lorebook样例。",
      "Usabu世界观的Lorebook样例。",
      "在巨大野兽背上生活的村落与约定的世界观。",
    ],
  },
  ar: {
    titles: ["Gongdong", "Hyanggung", "Seongra Gangho", "Gyunsahae", "Sangyeoho", "Rosy Hollow", "Jeonsuseo", "Land of Nubi", "Usabu", "Light of Daesu"],
    descs: [
      "عالم صيادين عن البوابات، مجتمع الرتب، وحالة بلا صفة.",
      "عالم تنظمه الروائح والمانا والبلاط الإمبراطوري ونقابات العطارين.",
      "عالم فنون قتالية تتقاطع فيه النجوم والأسماء الحقيقية والديون القديمة.",
      "عالم بيئي عن شبكات الفطر والاتصال والتعايش والتحلل.",
      "عالم عن طقوس الماء والذاكرة وملاحة الموتى.",
      "عينة Lorebook لعالم Rosy Hollow.",
      "عينة Lorebook لعالم Jeonsuseo.",
      "عينة Lorebook لعالم Land of Nubi.",
      "عينة Lorebook لعالم Usabu.",
      "عالم قرى ووعود فوق ظهر وحش عظيم.",
    ],
  },
  fa: {
    titles: ["Gongdong", "Hyanggung", "Seongra Gangho", "Gyunsahae", "Sangyeoho", "Rosy Hollow", "Jeonsuseo", "Land of Nubi", "Usabu", "Light of Daesu"],
    descs: [
      "جهان شکارچیان درباره دروازه‌ها، جامعه رتبه‌ای و ناهنجاری بی‌ویژگی.",
      "جهانی که بو، مانا، دربار و انجمن‌های عطرساز قدرت را می‌سازند.",
      "جهان رزمی با نشانه‌های آسمانی، ستاره‌ها، نام حقیقی و بدهی‌های قدیمی.",
      "جهان بوم‌شناختی درباره شبکه قارچی، اتصال، همزیستی و زوال.",
      "جهانی درباره آیین‌های آبی، حافظه و ناوبری مردگان.",
      "نمونه Lorebook برای جهان Rosy Hollow.",
      "نمونه Lorebook برای جهان Jeonsuseo.",
      "نمونه Lorebook برای Land of Nubi.",
      "نمونه Lorebook برای جهان Usabu.",
      "جهان روستاها و پیمان‌ها بر پشت یک جانور عظیم.",
    ],
  },
  ur: {
    titles: ["Gongdong", "Hyanggung", "Seongra Gangho", "Gyunsahae", "Sangyeoho", "Rosy Hollow", "Jeonsuseo", "Land of Nubi", "Usabu", "Light of Daesu"],
    descs: [
      "دروازوں، درجے دار معاشرے، اور بے صفتی کی غیر معمولی حالت پر مبنی ہنٹر طرز دنیا۔",
      "ایک دنیا جہاں خوشبو، مانا، شاہی دربار اور عطر ساز گلڈ طاقت بناتے ہیں۔",
      "مارشل دنیا جہاں آسمانی نشان، ستارے، اصل نام اور پرانے قرض ملتے ہیں۔",
      "فنگل نیٹ ورک، تعلق، باہمی زندگی اور زوال کی اخلاقیات پر مبنی ماحولیاتی دنیا۔",
      "پانی کی رسومات، یاد اور مردوں کی جہازرانی پر مبنی دنیا۔",
      "Rosy Hollow دنیا کا Lorebook نمونہ۔",
      "Jeonsuseo دنیا کا Lorebook نمونہ۔",
      "Land of Nubi کا Lorebook نمونہ۔",
      "Usabu دنیا کا Lorebook نمونہ۔",
      "ایک عظیم جانور کی پشت پر بسے دیہات اور وعدوں کی دنیا۔",
    ],
  },
};

const content = {
  en: {
    html: "en", root: "en", dir: "ltr",
    nav: ["Home", "About", "Works", "IP", "Process", "Knowledge", "CEO", "Books", "Universe"],
    title: "Universe Setting — FEWK & MEJEwiki | MEJE Works",
    desc: "MEJE Knowledge of Universe Setting: FEWK, MEJEwiki, FEWKbooks3rd, and ten educational world samples.",
    badge: "MEJE Knowledge",
    h1: "Universe Setting",
    lead: "MEJE Knowledge of Universe Setting connects FEWK, MEJEwiki, FEWKbooks3rd, and ten educational worldbuilding samples.",
    positionTitle: "Position in the Map",
    positionDesc: "Process is the map of production methods. Universe Setting is the public reference layer where actual settings can be read and studied.",
    steps: [["01 / WIKI", "MEJEwiki", "A public wiki for scanning settings and terms."], ["02 / RULEBOOK", "FEWKbooks3rd", "A public rulebook for the FEWK third edition."], ["03 / SAMPLES", "Ten World Samples", "Educational worldbuilding samples with images and links."], ["04 / APPLICATION", "Production Reference", "A reference layer connected to MEJE's IP production pipeline."]],
    sourcesTitle: "FEWK · MEJEwiki Public Links",
    sourcesDesc: "External public sources for reading the FEWK setting, rulebook, and source repositories.",
    sourceDescs: ["A public wiki for setting knowledge, terms, and FEWK-related references.", "The public FEWK third edition rulebook and reading entry.", "Source repository for MEJEwiki.", "Source repository for the FEWK third edition public book."],
    samplesTitle: "Ten Educational Samples",
    samplesDesc: "Each card connects to a sample world in MEJEwiki and uses the representative image from that site.",
    sourceArrow: "Open",
    worldArrow: "View World",
  },
  ja: {
    html: "ja", root: "ja", dir: "ltr",
    nav: ["ホーム", "会社情報", "実績", "IP", "プロセス", "知識", "CEO", "Books", "世界観"],
    title: "世界観設定 — FEWK & MEJEwiki | MEJE Works",
    desc: "FEWK、MEJEwiki、FEWKbooks3rd、10個の教育用世界観サンプルをまとめたページです。",
    badge: "MEJE Knowledge",
    h1: "世界観設定",
    lead: "FEWK、MEJEwiki、FEWKbooks3rd、10個の教育用世界観サンプルを、世界観設定の公開レファレンスとして整理します。",
    positionTitle: "全体マップ上の位置",
    positionDesc: "制作プロセスが制作手順の地図なら、世界観設定は実際の世界観設定を読む公開レファレンスです。",
    steps: [["01 / WIKI", "MEJEwiki", "世界観設定と用語を先に確認する公開Wiki。"], ["02 / RULEBOOK", "FEWKbooks3rd", "FEWK第3版ルールブックの公開版。"], ["03 / SAMPLES", "10個の世界観サンプル", "画像とリンクで確認できる教育用サンプル。"], ["04 / APPLICATION", "制作レファレンス", "MEJEのIP制作パイプラインに接続する参照層。"]],
    sourcesTitle: "FEWK · MEJEwiki 公開リンク",
    sourcesDesc: "FEWK設定、ルールブック、ソースリポジトリを読むための外部公開リンクです。",
    sourceDescs: ["設定知識、用語、FEWK関連資料を読む公開Wiki。", "FEWK第3版ルールブックの公開版。", "MEJEwikiのソースリポジトリ。", "FEWK第3版公開本のソースリポジトリ。"],
    samplesTitle: "10個の教育用サンプル",
    samplesDesc: "各カードはMEJEwiki内のサンプル世界観へ接続し、該当サイトの代表画像を使用します。",
    sourceArrow: "開く",
    worldArrow: "世界観を見る",
  },
  "zh-tw": {
    html: "zh-Hant", root: "zh-tw", dir: "ltr",
    nav: ["首頁", "關於", "作品", "IP", "流程", "知識", "CEO", "Books", "世界觀"],
    title: "世界觀設定 — FEWK & MEJEwiki | MEJE Works",
    desc: "整理FEWK、MEJEwiki、FEWKbooks3rd與10個教育用世界觀樣例的頁面。",
    badge: "MEJE Knowledge",
    h1: "世界觀設定",
    lead: "把FEWK、MEJEwiki、FEWKbooks3rd與10個教育用世界觀樣例整理為世界觀設定的公開參考。",
    positionTitle: "在整體地圖中的位置",
    positionDesc: "製作流程是製作方法的地圖，世界觀設定則是可以閱讀實際世界觀設定的公開參考層。",
    steps: [["01 / WIKI", "MEJEwiki", "先瀏覽設定與術語的公開Wiki。"], ["02 / RULEBOOK", "FEWKbooks3rd", "FEWK第三版規則書公開版。"], ["03 / SAMPLES", "10個世界觀樣例", "以圖片與連結確認的教育用樣例。"], ["04 / APPLICATION", "製作參考", "連接MEJE IP製作管線的參考層。"]],
    sourcesTitle: "FEWK · MEJEwiki公開連結",
    sourcesDesc: "閱讀FEWK設定、規則書與來源儲存庫的外部公開連結。",
    sourceDescs: ["閱讀設定知識、術語與FEWK相關資料的公開Wiki。", "FEWK第三版規則書公開版。", "MEJEwiki的來源儲存庫。", "FEWK第三版公開本的來源儲存庫。"],
    samplesTitle: "10個教育用樣例",
    samplesDesc: "每張卡片連接MEJEwiki中的樣例世界觀，並使用該網站的代表圖片。",
    sourceArrow: "開啟",
    worldArrow: "查看世界觀",
  },
  "zh-cn": {
    html: "zh-Hans", root: "zh-cn", dir: "ltr",
    nav: ["首页", "关于", "作品", "IP", "流程", "知识", "CEO", "Books", "世界观"],
    title: "世界观设定 — FEWK & MEJEwiki | MEJE Works",
    desc: "整理FEWK、MEJEwiki、FEWKbooks3rd与10个教育用世界观样例的页面。",
    badge: "MEJE Knowledge",
    h1: "世界观设定",
    lead: "把FEWK、MEJEwiki、FEWKbooks3rd与10个教育用世界观样例整理为世界观设定的公开参考。",
    positionTitle: "在整体地图中的位置",
    positionDesc: "制作流程是制作方法的地图，世界观设定则是可以阅读实际世界观设定的公开参考层。",
    steps: [["01 / WIKI", "MEJEwiki", "先浏览设定与术语的公开Wiki。"], ["02 / RULEBOOK", "FEWKbooks3rd", "FEWK第三版规则书公开版。"], ["03 / SAMPLES", "10个世界观样例", "以图片与链接确认的教育用样例。"], ["04 / APPLICATION", "制作参考", "连接MEJE IP制作管线的参考层。"]],
    sourcesTitle: "FEWK · MEJEwiki公开链接",
    sourcesDesc: "阅读FEWK设定、规则书与源码仓库的外部公开链接。",
    sourceDescs: ["阅读设定知识、术语与FEWK相关资料的公开Wiki。", "FEWK第三版规则书公开版。", "MEJEwiki的源码仓库。", "FEWK第三版公开本的源码仓库。"],
    samplesTitle: "10个教育用样例",
    samplesDesc: "每张卡片连接MEJEwiki中的样例世界观，并使用该网站的代表图片。",
    sourceArrow: "打开",
    worldArrow: "查看世界观",
  },
  ar: {
    html: "ar", root: "ar", dir: "rtl",
    nav: ["الرئيسية", "عن الشركة", "الأعمال", "IP", "العملية", "المعرفة", "CEO", "Books", "العوالم"],
    title: "إعداد العالم — FEWK & MEJEwiki | MEJE Works",
    desc: "صفحة تجمع FEWK وMEJEwiki وFEWKbooks3rd وعشر عينات تعليمية لبناء العالم.",
    badge: "MEJE Knowledge",
    h1: "إعداد العالم",
    lead: "تربط هذه الصفحة FEWK وMEJEwiki وFEWKbooks3rd وعشر عينات تعليمية كمرجع عام لإعداد العالم.",
    positionTitle: "الموقع داخل الخريطة",
    positionDesc: "العملية هي خريطة طرق الإنتاج، أما إعداد العالم فهو طبقة مرجعية عامة لقراءة الإعدادات الفعلية.",
    steps: [["01 / WIKI", "MEJEwiki", "ويكي عام لقراءة الإعدادات والمصطلحات."], ["02 / RULEBOOK", "FEWKbooks3rd", "النسخة العامة من كتاب قواعد FEWK الثالث."], ["03 / SAMPLES", "عشر عينات عوالم", "عينات تعليمية مع الصور والروابط."], ["04 / APPLICATION", "مرجع إنتاج", "طبقة مرجعية متصلة بخط إنتاج IP في MEJE."]],
    sourcesTitle: "روابط FEWK وMEJEwiki العامة",
    sourcesDesc: "روابط خارجية عامة لقراءة إعداد FEWK وكتاب القواعد ومستودعات المصدر.",
    sourceDescs: ["ويكي عام لمعرفة الإعدادات والمصطلحات ومراجع FEWK.", "كتاب قواعد FEWK الثالث العام.", "مستودع مصدر MEJEwiki.", "مستودع مصدر كتاب FEWK الثالث العام."],
    samplesTitle: "عشر عينات تعليمية",
    samplesDesc: "كل بطاقة تصل إلى عالم عينة داخل MEJEwiki وتستخدم الصورة التمثيلية من ذلك الموقع.",
    sourceArrow: "فتح",
    worldArrow: "عرض العالم",
  },
  fa: {
    html: "fa", root: "fa", dir: "rtl",
    nav: ["خانه", "درباره", "کارها", "IP", "فرآیند", "دانش", "CEO", "Books", "جهان‌ها"],
    title: "تنظیم جهان — FEWK & MEJEwiki | MEJE Works",
    desc: "صفحه‌ای برای FEWK، MEJEwiki، FEWKbooks3rd و ده نمونه آموزشی جهان‌سازی.",
    badge: "MEJE Knowledge",
    h1: "تنظیم جهان",
    lead: "این صفحه FEWK، MEJEwiki، FEWKbooks3rd و ده نمونه آموزشی جهان‌سازی را به‌عنوان مرجع عمومی تنظیم جهان متصل می‌کند.",
    positionTitle: "جایگاه در نقشه کلی",
    positionDesc: "فرآیند نقشه روش تولید است. تنظیم جهان لایه مرجع عمومی برای خواندن تنظیمات واقعی جهان است.",
    steps: [["01 / WIKI", "MEJEwiki", "ویکی عمومی برای دیدن تنظیمات و اصطلاحات."], ["02 / RULEBOOK", "FEWKbooks3rd", "نسخه عمومی کتاب قوانین FEWK ویرایش سوم."], ["03 / SAMPLES", "ده نمونه جهان", "نمونه‌های آموزشی با تصویر و لینک."], ["04 / APPLICATION", "مرجع تولید", "لایه مرجع متصل به خط تولید IP در MEJE."]],
    sourcesTitle: "لینک‌های عمومی FEWK و MEJEwiki",
    sourcesDesc: "لینک‌های عمومی بیرونی برای خواندن تنظیمات FEWK، کتاب قوانین و مخازن منبع.",
    sourceDescs: ["ویکی عمومی برای دانش تنظیمات، اصطلاحات و منابع FEWK.", "کتاب قوانین عمومی FEWK ویرایش سوم.", "مخزن منبع MEJEwiki.", "مخزن منبع کتاب عمومی FEWK ویرایش سوم."],
    samplesTitle: "ده نمونه آموزشی",
    samplesDesc: "هر کارت به یک جهان نمونه در MEJEwiki وصل می‌شود و تصویر نماینده همان سایت را استفاده می‌کند.",
    sourceArrow: "باز کردن",
    worldArrow: "دیدن جهان",
  },
  ur: {
    html: "ur", root: "ur", dir: "rtl",
    nav: ["ہوم", "تعارف", "کام", "IP", "عمل", "علم", "CEO", "Books", "دنیا"],
    title: "دنیا کی سیٹنگ — FEWK & MEJEwiki | MEJE Works",
    desc: "FEWK، MEJEwiki، FEWKbooks3rd اور دس تعلیمی ورلڈ بلڈنگ نمونوں کی فہرست۔",
    badge: "MEJE Knowledge",
    h1: "دنیا کی سیٹنگ",
    lead: "یہ صفحہ FEWK، MEJEwiki، FEWKbooks3rd اور دس تعلیمی ورلڈ بلڈنگ نمونوں کو عوامی حوالہ کے طور پر جوڑتا ہے۔",
    positionTitle: "کل نقشے میں مقام",
    positionDesc: "عمل پیداوار کے طریقوں کا نقشہ ہے۔ دنیا کی سیٹنگ اصل دنیاوی سیٹنگز پڑھنے کی عوامی حوالہ پرت ہے۔",
    steps: [["01 / WIKI", "MEJEwiki", "سیٹنگز اور اصطلاحات دیکھنے کے لیے عوامی وکی۔"], ["02 / RULEBOOK", "FEWKbooks3rd", "FEWK تیسرے ایڈیشن کی عوامی رول بک۔"], ["03 / SAMPLES", "دس دنیاوی نمونے", "تصاویر اور روابط کے ساتھ تعلیمی نمونے۔"], ["04 / APPLICATION", "پیداواری حوالہ", "MEJE کی IP پیداوار لائن سے جڑی حوالہ پرت۔"]],
    sourcesTitle: "FEWK اور MEJEwiki عوامی روابط",
    sourcesDesc: "FEWK سیٹنگ، رول بک اور سورس ریپوزٹریز پڑھنے کے لیے بیرونی عوامی روابط۔",
    sourceDescs: ["سیٹنگ علم، اصطلاحات اور FEWK حوالوں کے لیے عوامی وکی۔", "FEWK تیسرے ایڈیشن کی عوامی رول بک۔", "MEJEwiki کی سورس ریپوزٹری۔", "FEWK تیسرے ایڈیشن کی عوامی کتاب کی سورس ریپوزٹری۔"],
    samplesTitle: "دس تعلیمی نمونے",
    samplesDesc: "ہر کارڈ MEJEwiki میں ایک نمونہ دنیا سے جڑتا ہے اور اسی سائٹ کی نمائندہ تصویر استعمال کرتا ہے۔",
    sourceArrow: "کھولیں",
    worldArrow: "دنیا دیکھیں",
  },
};

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function canonical(lang) {
  return lang === "ko" ? "https://meje.kr/universe.html" : `https://meje.kr/${lang}/universe.html`;
}

function pageHref(lang) {
  return lang === "ko" ? "../universe.html" : `../${lang}/universe.html`;
}

function alternates() {
  return langOrder.map((lang) => `<link rel="alternate" hreflang="${hreflang[lang]}" href="${canonical(lang)}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${canonical("ko")}">`;
}

function langBar(active) {
  return langOrder.map((lang) => `<a href="${pageHref(lang)}"${lang === active ? ' class="active"' : ""}>${labels[lang]}</a>`).join('<span class="sep">&middot;</span>');
}

function renderSteps(items) {
  return items.map(([num, title, desc]) => `<div class="read-step">
      <p class="read-step-num">${esc(num)}</p>
      <h3 class="read-step-title">${esc(title)}</h3>
      <p class="read-step-desc">${esc(desc)}</p>
    </div>`).join("\n");
}

function renderSources(langKey, data) {
  return sources.map((source, index) => `<a href="${source.url}" target="_blank" rel="noopener" class="universe-card ${index < 2 ? "featured" : "source"}">
      <span class="universe-card-kicker">${esc(source.kicker)}</span>
      <span class="universe-card-title">${esc(source.title)}</span>
      <p class="universe-card-desc">${esc(data.sourceDescs[index])}</p>
      <span class="universe-card-arrow">${esc(data.sourceArrow)} &rarr;</span>
    </a>`).join("\n");
}

function renderSamples(langKey, data) {
  const names = sampleText[langKey].titles;
  const descs = sampleText[langKey].descs;
  return samples.map(([slug, image], index) => {
    const title = names[index];
    return `<a href="https://whtdrgongmail.github.io/MEJEwiki/worlds/${slug}/" target="_blank" rel="noopener" class="universe-card world-card">
      <img class="world-card-image" src="https://whtdrgongmail.github.io/MEJEwiki/assets/worlds/${image}" alt="${esc(title)}" loading="lazy">
      <span class="world-card-body">
        <span class="universe-card-kicker">WORLD SAMPLE ${String(index + 1).padStart(2, "0")}</span>
        <span class="universe-card-title">${esc(title)}</span>
        <span class="universe-card-desc">${esc(descs[index])}</span>
        <span class="universe-card-arrow">${esc(data.worldArrow)} &rarr;</span>
      </span>
    </a>`;
  }).join("\n");
}

function renderUniverse(langKey, data) {
  const dir = data.dir === "rtl" ? ' dir="rtl"' : "";
  return `<!DOCTYPE html>
<html lang="${data.html}"${dir}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${esc(data.desc)}">
<title>${esc(data.title)}</title>
<meta property="og:title" content="${esc(data.title)}">
<meta property="og:description" content="${esc(data.desc)}">
<meta property="og:image" content="https://meje.kr/img/og-cover.png">
<meta property="og:url" content="${canonical(langKey)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
${alternates()}
<link rel="icon" type="image/svg+xml" href="../img/favicon.svg">
<link rel="apple-touch-icon" href="../img/logo.png">
<link rel="stylesheet" href="../css/style.css">
<style>
.lang-bar { display:flex; gap:8px; align-items:center; }
.lang-bar a { font-family:var(--mono); font-size:10px; color:var(--text-dim); text-decoration:none; letter-spacing:0.04em; }
.lang-bar a.active { color:var(--accent); }
.lang-bar .sep { color:var(--text-dim); opacity:0.45; font-size:8px; }
#universe-hero { padding:120px 40px 80px; border-bottom:1px solid var(--border-dim); text-align:center; }
.universe-hero-badge { font-family:var(--mono); font-size:13px; color:var(--accent); border:1px solid var(--accent-dim); padding:3px 10px; display:inline-block; margin-bottom:24px; letter-spacing:0.1em; }
.universe-hero-title { font-family:var(--display); font-size:clamp(36px, 6vw, 64px); font-weight:700; color:var(--text); margin-bottom:16px; }
.universe-hero-desc { font-family:var(--sans); font-size:16px; color:var(--text-muted); max-width:760px; margin:0 auto; line-height:1.9; }
.universe-section { padding:64px 40px 48px; border-bottom:1px solid var(--border-dim); }
.universe-label { font-family:var(--mono); font-size:12px; color:var(--accent); letter-spacing:0.14em; margin-bottom:6px; }
.universe-title { font-family:var(--display); font-size:clamp(22px, 3vw, 32px); font-weight:700; color:var(--text); margin-bottom:10px; }
.universe-desc { font-size:15px; color:var(--text-muted); margin-bottom:32px; max-width:820px; line-height:1.9; }
.universe-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:2px; }
.universe-card { background:var(--bg-2); border:1px solid var(--border-dim); padding:28px 24px; display:flex; flex-direction:column; gap:10px; min-height:220px; text-decoration:none; transition:background 0.2s, border-color 0.2s; }
.universe-card:hover { background:var(--bg-3); border-color:var(--border); }
.universe-card.featured { border-left:2px solid var(--green); }
.universe-card.source { border-left:2px solid var(--accent-dim); }
[dir="rtl"] .universe-card.featured, [dir="rtl"] .universe-card.source { border-left:1px solid var(--border-dim); border-right:2px solid var(--accent-dim); }
.universe-card-kicker { font-family:var(--mono); font-size:11px; color:var(--text-dim); letter-spacing:0.1em; }
.universe-card-title { font-family:var(--display); font-size:18px; font-weight:700; color:var(--text); line-height:1.4; }
.universe-card-desc { font-size:14px; color:var(--text-muted); line-height:1.85; flex:1; }
.universe-card-arrow { font-family:var(--mono); font-size:12px; color:var(--accent-dim); }
.world-card { padding:0; gap:0; min-height:auto; overflow:hidden; }
.world-card-image { width:100%; aspect-ratio:16 / 9; object-fit:cover; display:block; background:var(--bg); border-bottom:1px solid var(--border-dim); }
.world-card-body { padding:22px 24px 24px; display:flex; flex:1; flex-direction:column; gap:10px; }
.read-order { display:grid; grid-template-columns:repeat(4, 1fr); gap:2px; }
.read-step { background:var(--bg-2); border:1px solid var(--border-dim); padding:24px; }
.read-step-num { font-family:var(--mono); color:var(--accent); font-size:12px; letter-spacing:0.12em; margin-bottom:12px; }
.read-step-title { font-family:var(--display); font-size:17px; color:var(--text); margin-bottom:8px; }
.read-step-desc { font-size:14px; line-height:1.75; color:var(--text-muted); }
@media (max-width:900px) { .read-order { grid-template-columns:repeat(2, 1fr); } }
@media (max-width:768px) { #universe-hero { padding:100px 20px 60px; } .universe-section { padding:48px 20px 40px; } .universe-grid, .read-order { grid-template-columns:1fr; } }
</style>
</head>
<body>
<div id="scroll-progress"></div>
<nav class="site-nav">
  <a href="index.html" class="nav-logo">MEJE<span>.</span>KR</a>
  <div class="lang-bar">${langBar(langKey)}</div>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')">MENU</button>
  <ul class="nav-links">
    <li><a href="index.html">${esc(data.nav[0])}</a></li>
    <li><a href="about.html">${esc(data.nav[1])}</a></li>
    <li><a href="works.html">${esc(data.nav[2])}</a></li>
    <li><a href="ip.html">${esc(data.nav[3])}</a></li>
    <li><a href="process.html">${esc(data.nav[4])}</a></li>
    <li><a href="knowledge.html">${esc(data.nav[5])}</a></li>
    <li><a href="ceo.html">${esc(data.nav[6])}</a></li>
    <li><a href="https://books.meje.kr/" target="_blank" rel="noopener">${esc(data.nav[7])}</a></li>
    <li><a href="universe.html" class="active">${esc(data.nav[8])}</a></li>
  </ul>
  <span class="nav-badge">${esc(data.nav[8])}</span>
</nav>
<main>
  <section id="universe-hero">
    <span class="universe-hero-badge">${esc(data.badge)}</span>
    <h1 class="universe-hero-title">${esc(data.h1)}</h1>
    <p class="universe-hero-desc">${esc(data.lead)}</p>
  </section>
  <section class="universe-section reveal" id="position">
    <p class="universe-label">// position</p>
    <h2 class="universe-title">${esc(data.positionTitle)}</h2>
    <p class="universe-desc">${esc(data.positionDesc)}</p>
    <div class="read-order">${renderSteps(data.steps)}</div>
  </section>
  <section class="universe-section reveal" id="fewk">
    <p class="universe-label">// public_sources</p>
    <h2 class="universe-title">${esc(data.sourcesTitle)}</h2>
    <p class="universe-desc">${esc(data.sourcesDesc)}</p>
    <div class="universe-grid">${renderSources(langKey, data)}</div>
  </section>
  <section class="universe-section reveal" id="samples">
    <p class="universe-label">// educational_samples</p>
    <h2 class="universe-title">${esc(data.samplesTitle)}</h2>
    <p class="universe-desc">${esc(data.samplesDesc)}</p>
    <div class="universe-grid">${renderSamples(langKey, data)}</div>
  </section>
</main>
<footer>
  <p class="footer-logo">MEJE<span>.</span>KR</p>
  <div class="footer-contact">MEJE Works Corp. ｜ Kim Dong-eun ｜ 772-87-02365<br>503, 217, Yeoksam-ro, Gangnam-gu, Seoul ｜ 0507-1420-1205</div>
  <div class="footer-links">
    <a href="index.html">${esc(data.nav[0])}</a>
    <a href="works.html">${esc(data.nav[2])}</a>
    <a href="process.html">${esc(data.nav[4])}</a>
    <a href="knowledge.html">${esc(data.nav[5])}</a>
    <a href="universe.html">${esc(data.nav[8])}</a>
  </div>
  <p class="footer-copy">&copy; MEJE Works Corp. All Rights Reserved.</p>
</footer>
<script>
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  const progress = document.getElementById('scroll-progress');
  if (progress) progress.style.width = scrolled + '%';
});
</script>
</body>
</html>`;
}

for (const [langKey, data] of Object.entries(content)) {
  fs.writeFileSync(path.join(root, data.root, "universe.html"), renderUniverse(langKey, data));
}

console.log("Localized universe pages generated.");
