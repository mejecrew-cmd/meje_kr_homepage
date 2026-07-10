import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const langs = {
  en: { html: "en", dir: "ltr", label: "EN", nav: ["Home", "About", "Works", "IP", "Process", "Knowledge", "Books"], footerHome: "Home", section: ["Chapter Plan", "Applied Projects", "Inside the Pipeline"], link: "Publication Link" },
  ja: { html: "ja", dir: "ltr", label: "JA", nav: ["ホーム", "会社情報", "実績", "IP", "プロセス", "知識", "Books"], footerHome: "ホーム", section: ["章立て", "適用事例", "パイプライン上の位置"], link: "公開先" },
  "zh-cn": { html: "zh-Hans", dir: "ltr", label: "简", nav: ["首页", "关于", "作品", "IP", "流程", "知识", "Books"], footerHome: "首页", section: ["章节计划", "应用案例", "在流程中的位置"], link: "公开链接" },
  "zh-tw": { html: "zh-Hant", dir: "ltr", label: "繁", nav: ["首頁", "關於", "作品", "IP", "流程", "知識", "Books"], footerHome: "首頁", section: ["章節規劃", "應用案例", "在流程中的位置"], link: "公開連結" },
  ar: { html: "ar", dir: "rtl", label: "AR", nav: ["الرئيسية", "عن الشركة", "الأعمال", "IP", "العملية", "المعرفة", "Books"], footerHome: "الرئيسية", section: ["خطة الفصول", "نماذج التطبيق", "الموقع داخل خط الإنتاج"], link: "رابط النشر" },
  fa: { html: "fa", dir: "rtl", label: "FA", nav: ["خانه", "درباره", "کارها", "IP", "فرآیند", "دانش", "Books"], footerHome: "خانه", section: ["طرح فصل‌ها", "نمونه‌های کاربرد", "جایگاه در خط تولید"], link: "پیوند انتشار" },
  ur: { html: "ur", dir: "rtl", label: "UR", nav: ["ہوم", "تعارف", "کام", "IP", "عمل", "علم", "Books"], footerHome: "ہوم", section: ["ابواب کا منصوبہ", "اطلاقی مثالیں", "پائپ لائن میں مقام"], link: "اشاعتی ربط" },
};

const hreflangs = { ko: "ko", en: "en", ja: "ja", "zh-cn": "zh-Hans", "zh-tw": "zh-Hant", ar: "ar", fa: "fa", ur: "ur" };
const langOrder = ["ko", "en", "ja", "zh-tw", "zh-cn", "ar", "fa", "ur"];
const langLabels = { ko: "KR", en: "EN", ja: "JA", "zh-tw": "繁", "zh-cn": "简", ar: "AR", fa: "FA", ur: "UR" };

const data = {
  en: {
    librarying: {
      title: "Librarying", subtitle: "LIBRARYING", meta: "// PROCESS 03 / SORTING · 4 STAGES",
      desc: "Librarying is a four-stage process that turns scattered IP materials into a 1,500-entry Obsidian Vault.",
      og: "A four-stage process that organizes rulebooks, short stories, design documents, and external wikis into a single source of truth.",
      lead: ["After an IP has operated for five years, rulebooks, short stories, design versions, and external wiki pages are scattered across folders and screens. Often the line between official material and working memory remains inside one person's head.", "Librarying pulls keywords out of those scattered materials, merges equivalent terms into shared entries, and builds an Obsidian-style Vault of 1,500 entries. It becomes a living dictionary built by creators and AI coworkers together."],
      input: ["Scattered Materials", "Rulebooks, short stories, planning documents, versioned drafts, external wiki pages, and reference notes accumulated during IP operation."],
      output: ["Obsidian Vault · 1,500 Entries", "A graph of 1,500 markdown entries organized by nine categories and worldbuilding axes, with 5,000 to 10,000 wikilinked nodes feeding Lorebook and Storytelling 100."],
      toc: ["14-Part Series", "Each chapter defines the input, output, acceptance line, and AI collaboration split for one part of the workflow.", ["From Glossaries to Clouds — How the Material Changed", "Creators and AI Coworkers — Building a Wiki with Two Hands", "From Input to Vault — The Four-Stage Flow", "Extract Every Keyword — The Attitude of First Extraction", "Merging into Wiki Entries — Decisions in Secondary Integration", "Two Classification Standards — Nine Categories and Worldbuilding Axes", "Skeleton Build — Turning CSV into Obsidian Files", "Hub and Leaf — Deciding the Weight of Each Entry", "Fourth-Stage Writing — Giving Life to the Vault", "Verification — Three Layers of Acceptance", "The Life of a Vault — Backflow and Operation Cycles", "The Exits of the Vault — What the Next Work Takes", "What 1,500 Entries Taught Us — The Practical Landscape", "Before an Empty Vault — What This Series Was Trying to Say"]],
      ctas: [["Publication Link", "https://brunch.co.kr/@whtdrgon"], ["MEJE Books", "https://books.meje.kr/books/meje-librarying/"]],
      appliedDesc: "Librarying is used as the first knowledge-structuring step for MEJE Works' B2B worldbuilding IP projects and internal IP operation.",
      applied: [["FEWK (Internal IP)", "A cyberpunk TRPG system. Rulebooks, short stories, and external wiki material accumulated up to the third edition were integrated into one Vault."], ["B2B Client Projects", "Scattered materials from idol groups, brands, and game IPs are consolidated into a single Vault. Client names remain undisclosed under NDA."]],
      pipeDesc: "The Vault created by Librarying becomes the input for the next production outputs.",
      cross: [["lorebook", "↓ Output", "Lorebook Process", "Vault to a B5 hardcover encyclopedia and public web edition."], ["storytelling100", "↓ Output", "Storytelling 100 Process", "Vault and character sheets to one hundred slice-of-life scenarios."], ["seoyeongak", "↑ Paired Input", "Seoyeongak Process", "Foreign-language source work to translation and adaptation assets."], ["character", "↑ Paired Input", "Character Process", "One seed line to a full character sheet that enters the Vault."]],
    },
    seoyeongak: {
      title: "Seoyeongak Process", subtitle: "SEOYEONGAK · 書淵閣", meta: "// PROCESS 01 / INPUT · 6 STEPS",
      desc: "Seoyeongak is a six-step process that turns a foreign-language source work into translation and adaptation assets.",
      og: "A six-step process for deep-reading foreign-language works before translation, using Pride and Prejudice as a practical case.",
      lead: ["An apple is not simply 'apple.' The weight of one word can decide the texture of a work. Seoyeongak is the work of reading a foreign-language source once more before translation and placing the weight of words beside the words themselves.", "About 35 assets are produced from one source work. Those assets carry tone, era, class, relationship, and adaptation cues to translators, adaptors, and writers. The 14-part series follows Pride and Prejudice end to end."],
      input: ["One Foreign-Language Source Work", "A work such as Pride and Prejudice or Romeo and Juliet, usually from a reliable text source such as Project Gutenberg."],
      output: ["About 35 Translation and Adaptation Assets", "Common references, novel-pack materials, character notes, event guides, era vocabulary, honorific tone guides, motif tracking, and adaptation-ready supporting documents."],
      toc: ["14-Part Series", "A tutorial that follows the full work rather than separating abstract procedure from practical example.", ["An Apple Is Not Simply Apple — What Seoyeongak Does", "Seoyeongak Flows Through Six Steps", "Thirty-Plus Assets — Why Pride and Prejudice Became 35 Documents", "Inside the Pride and Prejudice Work Folder", "Looking into One Segment, Unfolding One Event Group", "Where a Sentence Splits — Materials That Decide Structure in Advance", "How the 35 Assets Were Chosen", "The Skeleton of Every Work — Common Assets and the Novel Pack", "The World of the Work — Era Encyclopedia and Motif Materials", "Pride and Prejudice-Specific Supplementary Materials", "The Protagonist's Notes — Elizabeth Bennet", "The Supporting Character's Notes — Charlotte Lucas", "Minor Roles, Appendices, and the Technique of Division of Labor", "Integrity of Materials and the Final Greeting"]],
      ctas: [["Publication Link", "https://brunch.co.kr/brunchbook/mejei18n"], ["MEJE Books", "https://books.meje.kr/books/meje-seoyeongak/"]],
      appliedDesc: "Used for deep reading, multilingual translation preparation, and integrating foreign-language materials into worldbuilding pipelines.",
      applied: [["Pride and Prejudice Case", "A full 14-part lecture case where about 35 assets are generated from one novel."], ["i18n Website Operation", "Terminology and tone guides for the eight-language MEJE.kr site operation."], ["FEWK Rulebook Translation Preparation", "Pre-deciding how to translate cyberpunk-specific terms by transliteration, semantic translation, or explanation."]],
      pipeDesc: "Seoyeongak outputs flow back into the Librarying Vault and then become input materials for Lorebook and Storytelling 100.",
      cross: [["librarying", "↓ Next", "Librarying Process", "Absorbs Seoyeongak outputs into Obsidian Vault entries."], ["character", "↔ Paired Input", "Character Process", "If Character builds a person from zero, Seoyeongak captures existing people in a source work."], ["lorebook", "↓ Output", "Lorebook Process", "Translation and adaptation assets become sources for encyclopedic publication."], ["storytelling100", "↓ Output", "Storytelling 100 Process", "Era, tone, and character materials become inputs for short scenarios."]],
    },
    lorebook: {
      title: "Lorebook Process", subtitle: "LOREBOOK", meta: "// PROCESS 04 / OUTPUT · 6 PHASES",
      desc: "Lorebook turns a Vault or collected IP archive into a publishable encyclopedia and public web edition.",
      og: "A six-phase process that turns a 1,500-entry Vault into a hardcover setting encyclopedia and static web edition.",
      lead: ["Every creator eventually creates a world, and at some point wants to bind that world into a book. The Lorebook process compresses that work into a six-phase procedure.", "It takes a 1,500-entry Vault as input and produces a B5 hardcover book of roughly 450 pages together with a public web edition. The same markdown source remains the single source of truth."],
      input: ["Vault of 1,500 Entries or Collected IP Materials", "An Obsidian Vault with structured frontmatter, or a partially organized body of IP materials ready to be mapped into a book structure."],
      output: ["Print Edition + Public Web Edition", "A B5 hardcover encyclopedia and a static website deployed from the same markdown source, with quarterly update cycles when needed."],
      toc: ["14 Chapters + Appendix", "The standard encyclopedia format absorbs variations such as artbook, narrative bible, game design bible, and official comic/webtoon setting book.", ["An Encyclopedia for One IP — What a Lorebook Is", "Five Types of Lorebook", "After Librarying — From Vault to Lorebook", "Six Macro Sections and Twelve Parts — Where the Skeleton Is Set", "The Shape of One Entry — Standard Template and Frontmatter", "Nine Categories and Worldbuilding Axes — Two Coordinates Decide Parts", "Three Voices — Chronicle, Field, and Encyclopedia Styles", "Dual Description — External Analogy and Internal Law", "Short Quotes and Multilingual Material — What Enters the Main Book", "Phase 0 to 3 — The First Half from Agreement to Pilot Part", "Phase 4 to 6 — When Materials Become a Book", "With AI Coworkers — A Book Built by Two Hands", "Consistency, Versions, and Illustration — A Living Lorebook", "Five Variations and the Final Greeting", "Appendix — Term Index and Market Case Collection"]],
      ctas: [["Publication Link", "https://brunch.co.kr/@whtdrgon"], ["MEJE Books", "https://books.meje.kr/books/meje-lorebook/"]],
      appliedDesc: "Used for B2B setting-bible delivery and internal IP encyclopedia publication.",
      applied: [["FEWK World Book", "An encyclopedia for MEJE's cyberpunk TRPG system, paired with the FEWK Core Rulebook."], ["B2B Setting Bible Delivery", "Private PDF or publication-ready setting bibles for game and entertainment IPs."], ["WhtDrgon World Guide", "An integrated encyclopedia of long-running WhtDrgon creative materials."]],
      pipeDesc: "Lorebook is an output stage of the Librarying Vault. Storytelling 100 branches from the same input.",
      cross: [["librarying", "↑ Input", "Librarying Process", "The standard input: 1,500 Vault entries mapped into a twelve-part matrix."], ["storytelling100", "↔ Paired Output", "Storytelling 100 Process", "If Lorebook is the dictionary, Storytelling 100 is one hundred stories that use it."], ["seoyeongak", "↑ Paired Input", "Seoyeongak Process", "Translation assets become sources for multilingual publication."], ["character", "↑ Paired Input", "Character Process", "Character sheets become the primary material for the character encyclopedia section."]],
    },
    character: {
      title: "Character Build Process", subtitle: "CHARACTER BUILD", meta: "// PROCESS 02 / INPUT · 12 STEPS",
      desc: "Character Build moves from one seed line to a full character sheet through twelve steps.",
      og: "A 12-step process for building a convincing character from seed cards, psychological axes, scene fragments, and output formats.",
      lead: ["A character is not a database. Filling in name, age, height, and hobbies does not guarantee that a person will move on the page. The same table can produce a human in one hand and a paper doll in another.", "The Character Build process starts from a seed and moves through twelve steps until the character breathes. Creator and AI coworker build one full character in roughly 8 to 15 hours, including five medium-specific outputs."],
      input: ["A Handful of Seeds", "Keyword bundles from a client brief or five randomly drawn cards from a 30-card seed deck."],
      output: ["Integrated Sheet + Supporting Outputs + Five Media Formats", "A twelve-step integrated sheet, a 1,500-character daily-life scene, answers to 22 deep questions, five-act transition, and output formats for library, TRPG, scenario, animation, and web novel."],
      toc: ["14-Part Series", "Fourteen lectures that teach the twelve-step procedure itself while example characters appear as supporting tools.", ["A Being That Breathes Enough — Character as Human, and Who the Creator Is", "From Seed to Output — The Twelve-Step Flow", "What to Turn On and Off — Four Layers and Five Preparation Modules", "Seed Decision — Thirty Cards and Brief Seeds", "The Mirror of Self-Objectification — Scales That Abstract a Person", "Daily-Life Scenario — The Character Writes Themself", "Twist and Drama — Reverse Cliches and Body Anchors", "Flaw, Lack, and Trauma — Into the Gray Area of Morality", "Goals and Conflicts — Want, Need, and the Lie Believed", "Relationships and Cast — Five People Beside the Character", "Immersion Operation — Proust, Letters, Diaries, and Five-Act Change", "Output to Five Media — Obsidian, TRPG, Scenario, Animation, Web Novel", "Non-Typical Characters and Diversity of Works", "Five Diagnostics and the Final Greeting"]],
      ctas: [["Publication Link", "https://contents.premium.naver.com/whtdrgon/mejeworks/contents?categoryId=19dd8026462000kih"], ["MEJE Books", "https://books.meje.kr/books/meje-character-process/"]],
      appliedDesc: "Used as a standard procedure for B2B character persona design and internal IP character construction.",
      applied: [["B2B Character Persona Design", "Original character build for idol, brand, and game IPs, delivered as character sheets and design guides."], ["FEWK Short Stories", "Characters for a cyberpunk world short-story collection, with build time allocated by narrative hierarchy."]],
      pipeDesc: "Character sheets enter the Librarying Vault and later become material for Lorebook character sections and Storytelling 100 protagonists.",
      cross: [["librarying", "↓ Next", "Librarying Process", "Character sheets become person entries inside the integrated Vault."], ["seoyeongak", "↔ Paired Input", "Seoyeongak Process", "Character builds from zero; Seoyeongak captures existing characters in a source work."], ["storytelling100", "↓ Output", "Storytelling 100 Process", "Character sheets become the first input for one hundred scenarios."], ["lorebook", "↓ Output", "Lorebook Process", "Character sheets feed the character encyclopedia and NPC mini-card sections."]],
    },
    storytelling100: {
      title: "Storytelling 100 Process", subtitle: "STORYTELLING 100", meta: "// PROCESS 05 / OUTPUT · 7 STAGES",
      desc: "Storytelling 100 turns a Vault and 100 character sheets into one hundred slice-of-life scenarios.",
      og: "A seven-stage process for producing one hundred short scenarios from a worldview Vault and character sheets.",
      lead: ["Worldbuilding is explained by rulebooks, but it comes alive through stories. When one hundred characters have been defined, the Vault becomes the input for one hundred slice-of-life scenarios.", "The story does not need a giant incident. The smell of a job, the rhythm of a day, the weight of a prop, and the feeling that people live this way in this world are enough. Across one hundred pieces, the IP gains density."],
      input: ["Vault + 100 Character Sheets", "A worldbuilding dictionary created by Librarying and one hundred confirmed character sheets from Character Build."],
      output: ["100 Slice-of-Life Scenarios · Companion Short-Story Volume", "One hundred pieces in forms such as short story, sketch, dialogue, or four-panel-comic scenario, often forming a 600 to 1,000 page companion volume."],
      toc: ["14-Part Series", "Covers six quality criteria, five fun engines, coverage matrix, QA reports, and archive operation.", ["The Blank Document After the Vault — How Slice-of-Life Scenarios Complete a World", "What Makes One Piece Alive — A Map of Six Quality Criteria", "Stakes, Viewpoint, Form, and Length — Four Decisions Before Writing", "The Interface Between Vault and Writing — Single Source of Truth and Two-Way Sync", "One Hundred Protagonists — Coverage Matrix and Character Balance", "Four Paths for Finding Materials — Library Entries and Everyday Density", "Designing Body Anchors — Without a Body There Is No Reader", "Five Fun Engines — Devices That Make a Story Run", "Ending Landing and Numeral Scene-Making — What Remains at the End", "From Design Sheet to Manuscript — A Chain of Ten Decisions", "Reference Writer System — Integrating Skill, Work Routine, and Inner Sensation", "Standing Before the Acceptance Line — QA Report and Self-Correction", "Managing One Hundred Pieces — Coverage Matrix and Archive Operation", "What Practice Taught Us — What Appears at the End of One Hundred Stories"]],
      ctas: [["Publication Link", "https://brunch.co.kr/magazine/fewk"], ["MEJE Books", "https://books.meje.kr/books/meje-storytelling-100/"]],
      appliedDesc: "Used for B2B daily-content series and internal IP short-story volumes.",
      applied: [["FEWK 102 Stories", "A series of cyberpunk slice-of-life stories satirizing fashion, advertising, no-kids zones, body modification, and other real-world issues."], ["B2B Daily Content Series", "Scenario materials for fandom platforms: daily routines, relationships, props, and repeated interaction themes."]],
      pipeDesc: "Storytelling 100 is the final output stage that consumes assets from the earlier processes.",
      cross: [["librarying", "↑ Input", "Librarying Process", "The single source of truth for writing. Stories enrich the Vault through two-way sync."], ["character", "↑ Input", "Character Process", "One hundred character sheets become protagonist material."], ["lorebook", "↔ Paired Output", "Lorebook Process", "If Lorebook is the encyclopedia, Storytelling 100 is the set of stories that live inside it."], ["seoyeongak", "↑ Paired Input", "Seoyeongak Process", "Translation and adaptation materials provide tone, era, and character-reference sources."]],
    },
  },
};

data.ja = JSON.parse(JSON.stringify(data.en));
Object.assign(data.ja.librarying, {
  title: "ライブラリング", desc: "ライブラリングは、散在するIP資料を1,500項目のObsidian Vaultへ整理する4段階のプロセスです。", og: "ルールブック、短編、企画書、外部Wikiを単一の真実の供給源へまとめる4段階のプロセス。",
  lead: ["IPを5年運営すると、ルールブック、短編、企画書の版、外部Wikiがフォルダや画面のあちこちに散らばります。どこまでが公式資料で、どこからが作業記憶なのかが一人の頭の中だけに残ることも少なくありません。", "ライブラリングは、それらの資料からキーワードを取り出し、同じ意味の語を一つの見出し語へ統合し、1,500項目のObsidian型Vaultを作ります。制作者とAI作業同僚が一緒に作る、生きた辞書です。"],
  input: ["散在する資料", "ルールブック、短編、企画書、版管理された草稿、外部Wiki、IP運営中に蓄積した参照ノート。"],
  output: ["Obsidian Vault · 1,500項目", "9分類と世界観軸で整理された1,500個のMarkdown項目。5,000〜10,000のWikiリンクノードがロアブックとStorytelling 100へ接続します。"],
  toc: ["14回シリーズ", "各回で入力、出力、合格ライン、AIとの分担を明示します.", ["グロッサリーからクラウドへ — 扱う資料はどう変わったか", "制作者とAI作業同僚 — 二つの手でWikiを作る", "入力からVaultまで — 4段階の流れ", "すべてのキーワードを取り出す — 一次抽出の姿勢", "Wiki見出し語へまとめる — 二次統合の判断", "二つの分類基準 — 9分類と世界観軸", "骨格ビルド — CSVがObsidianファイルになる過程", "HubとLeaf — 見出し語の重みを決める", "第四段階の叙述 — Vaultに生命を入れる", "検証 — 三層で合格を担保する", "Vaultの一生 — 逆流と運用サイクル", "Vaultの出口 — 次工程が受け取るもの", "1,500項目を作って見えたこと — 実務の風景", "空のVaultの前で — この文章が伝えたかったこと"]],
});
Object.assign(data.ja.seoyeongak, {
  title: "書淵閣プロセス", desc: "書淵閣は、外国語原典を翻訳・翻案資料へ変換する6段階のプロセスです。", og: "『高慢と偏見』を実例に、翻訳前の深読みを行う6段階のプロセス。",
  lead: ["appleは単に「リンゴ」ではありません。一つの単語の重みが作品の手触りを決めます。書淵閣は、外国語原典を翻訳する前にもう一度深く読み、単語の横にその重みを置く作業です。", "一つの作品から約35種の資料を作ります。語感、時代、階級、関係、翻案の手がかりを翻訳者・脚色者・作家へ渡します。14回シリーズでは『高慢と偏見』を最後まで追います。"],
  input: ["外国語原典一冊", "『高慢と偏見』や『ロミオとジュリエット』のような作品。Project Gutenbergなど信頼できるテキストを起点にします。"],
  output: ["約35種の翻訳・翻案資料", "共通資料、小説パック、人物ノート、事件ガイド、時代語彙、敬称・語調ガイド、モチーフ追跡、翻案用の補助文書。"],
});
Object.assign(data.ja.lorebook, {
  title: "ロアブック・プロセス", desc: "ロアブックは、VaultまたはIP資料群を出版可能な百科事典とWeb公開版へ変換します。", og: "1,500項目のVaultをハードカバー設定百科と静的Web版に変える6フェーズのプロセス。",
  lead: ["創作者はいつか世界を作ります。そしてその世界を一冊の本にまとめたくなる時期が来ます。ロアブック・プロセスは、その作業を6フェーズへ圧縮します。", "1,500項目のVaultを入力に、約450ページのB5判ハードカバーとWeb公開版を同時に作ります。同じMarkdownソースが単一の真実の供給源になります。"],
  input: ["1,500項目のVaultまたは収集済みIP資料", "構造化frontmatterを持つObsidian Vault、または書籍構造へマッピング可能な整理済みIP資料。"],
  output: ["印刷版 + Web公開版", "B5判ハードカバー百科と、同じMarkdownソースから配信する静的Webサイト。必要に応じて四半期単位で更新します。"],
});
Object.assign(data.ja.character, {
  title: "キャラクター構築プロセス", desc: "キャラクター構築は、一行のシードから12段階でフルキャラクターシートへ進みます。", og: "シードカード、心理軸、場面断片、出力形式から説得力のある人物を作る12段階プロセス。",
  lead: ["キャラクターはデータベースではありません。名前、年齢、身長、趣味を埋めても、紙面で動く人物になるとは限りません。同じ表でも、一方は人間になり、もう一方は紙人形になります。", "キャラクター構築プロセスはシードから始まり、人物が呼吸するまで12段階を進みます。制作者とAI作業同僚が8〜15時間で一人をフルビルドし、5つの媒体別出力まで整えます。"],
  input: ["ひとつかみのシード", "クライアントブリーフのキーワード束、または30枚のシードカードから引いた5枚。"],
  output: ["統合シート + 補助成果物 + 5媒体出力", "12段階の統合シート、1,500字の日常断面、22の深い質問への回答、5幕変化、ライブラリ・TRPG・シナリオ・アニメ・Web小説向け出力。"],
});
Object.assign(data.ja.storytelling100, {
  title: "Storytelling 100プロセス", desc: "Storytelling 100は、Vaultと100人のキャラクターシートから100本の日常断面シナリオを作ります。", og: "世界観Vaultとキャラクターシートから100本の短編シナリオを作る7段階のプロセス。",
  lead: ["世界観はルールブックで説明されますが、物語で生きます。100人のキャラクターが定義されたら、Vaultは100本の日常断面シナリオの入力になります。", "巨大な事件は不要です。職業の匂い、一日のリズム、小道具の重み、この世界ではこう暮らしているという感覚。それが伝われば十分です。100本が積み上がることでIPに密度が生まれます。"],
  input: ["Vault + 100人のキャラクターシート", "ライブラリングで作った世界観辞書と、キャラクター構築で確定した100人のシート。"],
  output: ["日常断面シナリオ100本 · 別巻短編集", "短編、コント、会話劇、4コマ漫画シナリオなどの形式で100本を作り、600〜1,000ページ規模の別巻になります。"],
});

data["zh-cn"] = JSON.parse(JSON.stringify(data.ja));
Object.assign(data["zh-cn"].librarying, {
  title: "资料库化", desc: "资料库化是将分散的IP资料整理为1,500个条目的Obsidian Vault的四阶段流程。", og: "把规则书、短篇、企划文档和外部Wiki整理为单一真实来源的四阶段流程。",
  lead: ["一个IP运营五年后，规则书、短篇、企划版本和外部Wiki会散落在文件夹和屏幕中。哪些是官方资料、哪些只是工作记忆，常常只留在某个人脑中。", "资料库化从这些资料中抽取关键词，将同义概念合并为同一条目，并建立1,500个条目的Obsidian式Vault。这是一部由创作者和AI协作者共同建立的活字典。"],
  input: ["分散资料", "规则书、短篇、企划文档、版本草稿、外部Wiki，以及IP运营过程中积累的参考笔记。"],
  output: ["Obsidian Vault · 1,500个条目", "按9类和世界观轴整理的1,500个Markdown条目。5,000到10,000个Wiki链接节点连接到Lorebook和Storytelling 100。"],
});
Object.assign(data["zh-cn"].seoyeongak, {
  title: "书渊阁流程", desc: "书渊阁是把外语原作转化为翻译与改编资料的六阶段流程。", og: "以《傲慢与偏见》为案例，在翻译前进行深读的六阶段流程。",
  lead: ["apple并不只是“苹果”。一个词的重量会决定作品的质感。书渊阁是在翻译外语原作之前再次深读，把词语的重量放在词语旁边的工作。", "一部作品会产出约35种资料。这些资料把语感、时代、阶层、关系和改编线索交给译者、改编者和作者。14篇系列完整跟随《傲慢与偏见》。"],
  input: ["一部外语原作", "如《傲慢与偏见》或《罗密欧与朱丽叶》这样的作品，通常以Project Gutenberg等可靠文本为起点。"],
  output: ["约35种翻译与改编资料", "通用资料、小说包、人物笔记、事件指南、时代词汇、称谓与语气指南、母题追踪，以及可直接用于改编的辅助文档。"],
});
Object.assign(data["zh-cn"].lorebook, {
  title: "Lorebook流程", desc: "Lorebook将Vault或IP资料档案转化为可出版的百科书和公开网页版。", og: "把1,500条目的Vault转化为精装设定百科与静态网页版本的六阶段流程。",
  lead: ["每个创作者最终都会创造一个世界，也终会想把那个世界装订成一本书。Lorebook流程把这项工作压缩为六个阶段。", "它以1,500条目的Vault为输入，同时产出约450页的B5精装书和公开网页版。同一组Markdown源码保留为单一真实来源。"],
  input: ["1,500条目的Vault或已收集的IP资料", "带有结构化frontmatter的Obsidian Vault，或已经整理到可以映射为书籍结构的IP资料。"],
  output: ["印刷版 + 公开网页版", "B5精装百科和由同一Markdown源码部署的静态网站，需要时可按季度更新。"],
});
Object.assign(data["zh-cn"].character, {
  title: "角色构建流程", desc: "角色构建从一行种子出发，经十二阶段形成完整角色表。", og: "通过种子卡、心理轴、场景片段和输出格式构建可信角色的十二阶段流程。",
  lead: ["角色不是数据库。填完姓名、年龄、身高和兴趣，并不代表人物会在纸面上活动。同一张表，在一只手里会成为人，在另一只手里只会是纸偶。", "角色构建流程从种子开始，经过十二阶段直到人物能够呼吸。创作者与AI协作者通常用8到15小时完成一个完整角色，并整理五种媒介输出。"],
  input: ["一把种子", "来自客户简报的关键词组，或从30张种子卡中随机抽出的五张。"],
  output: ["综合表 + 辅助成果 + 五种媒介输出", "十二阶段综合表、1,500字日常切面、22个深层问题回答、五幕变化，以及资料库、TRPG、剧本、动画、网络小说输出格式。"],
});
Object.assign(data["zh-cn"].storytelling100, {
  title: "Storytelling 100流程", desc: "Storytelling 100把Vault和100名角色表转化为100篇日常切面剧本。", og: "从世界观Vault和角色表生产100篇短剧本的七阶段流程。",
  lead: ["世界观由规则书说明，但通过故事活起来。当100名角色已经确定，Vault就成为100篇日常切面剧本的输入。", "故事不一定需要巨大事件。职业的气味、一天的节奏、道具的重量，以及“这个世界的人就是这样生活”的感觉，已经足够。100篇累积起来，IP就获得密度。"],
  input: ["Vault + 100名角色表", "资料库化生成的世界观辞典，以及角色构建确认的100名角色表。"],
  output: ["100篇日常切面剧本 · 别册短篇集", "以短篇、短剧、对话或四格漫画剧本等形式生产100篇，常形成600到1,000页规模的别册。"],
});

data["zh-tw"] = JSON.parse(JSON.stringify(data["zh-cn"]));
for (const proc of Object.values(data["zh-tw"])) {
  proc.title = proc.title.replaceAll("资料库化", "資料庫化").replaceAll("流程", "流程");
  proc.desc = proc.desc.replaceAll("资料", "資料").replaceAll("条目", "條目").replaceAll("阶段", "階段").replaceAll("转化", "轉化").replaceAll("公开", "公開");
  proc.og = proc.og.replaceAll("资料", "資料").replaceAll("条目", "條目").replaceAll("阶段", "階段").replaceAll("转化", "轉化").replaceAll("公开", "公開");
}
Object.assign(data["zh-tw"].librarying, {
  title: "資料庫化",
  lead: ["一個IP營運五年後，規則書、短篇、企劃版本和外部Wiki會散落在資料夾和螢幕中。哪些是官方資料、哪些只是工作記憶，常常只留在某個人的腦中。", "資料庫化從這些資料中抽取關鍵詞，將同義概念合併為同一條目，並建立1,500個條目的Obsidian式Vault。這是一部由創作者和AI協作者共同建立的活字典。"],
  input: ["分散資料", "規則書、短篇、企劃文件、版本草稿、外部Wiki，以及IP營運過程中累積的參考筆記。"],
  output: ["Obsidian Vault · 1,500個條目", "按9類和世界觀軸整理的1,500個Markdown條目。5,000到10,000個Wiki連結節點連接到Lorebook和Storytelling 100。"],
});
Object.assign(data["zh-tw"].seoyeongak, {
  title: "書淵閣流程",
  lead: ["apple並不只是「蘋果」。一個詞的重量會決定作品的質感。書淵閣是在翻譯外語原作之前再次深讀，把詞語的重量放在詞語旁邊的工作。", "一部作品會產出約35種資料。這些資料把語感、時代、階層、關係和改編線索交給譯者、改編者和作者。14篇系列完整跟隨《傲慢與偏見》。"],
  input: ["一部外語原作", "如《傲慢與偏見》或《羅密歐與茱麗葉》這樣的作品，通常以Project Gutenberg等可靠文本為起點。"],
  output: ["約35種翻譯與改編資料", "通用資料、小說包、人物筆記、事件指南、時代詞彙、稱謂與語氣指南、母題追蹤，以及可直接用於改編的輔助文件。"],
});

function arabicBase(langName) {
  const isFa = langName === "fa";
  const isUr = langName === "ur";
  const t = {
    librarying: {
      title: isFa ? "لایبررینگ" : isUr ? "لائبریرنگ" : "بناء المكتبة المعرفية",
      desc: isFa ? "فرآیندی چهارمرحله‌ای که مواد پراکنده IP را به یک Vault در Obsidian با ۱۵۰۰ مدخل تبدیل می‌کند." : isUr ? "چار مرحلوں کا عمل جو بکھرے ہوئے IP مواد کو Obsidian Vault کے 1,500 اندراجات میں بدلتا ہے۔" : "عملية من أربع مراحل تحول مواد الملكية الفكرية المتناثرة إلى Vault في Obsidian يضم 1500 مدخل.",
      og: isFa ? "فرآیندی برای تبدیل دفترچه‌ها، داستان‌ها، اسناد طراحی و ویکی‌ها به منبع واحد حقیقت." : isUr ? "رول بکس، مختصر کہانیوں، ڈیزائن دستاویزات اور خارجی وکی کو ایک واحد مستند ماخذ میں بدلنے کا عمل۔" : "عملية تجمع كتب القواعد والقصص والوثائق والويكيات الخارجية في مصدر حقيقة واحد.",
      lead: isFa ? ["وقتی یک IP چند سال کار می‌کند، کتابچه‌ها، داستان‌ها، نسخه‌های طراحی و ویکی‌های بیرونی در پوشه‌ها پراکنده می‌شوند. مرز میان سند رسمی و حافظه کاری اغلب فقط در ذهن یک نفر می‌ماند.", "لایبررینگ از این مواد کلیدواژه استخراج می‌کند، واژه‌های هم‌معنا را در یک مدخل ادغام می‌کند و Vault زنده‌ای با ۱۵۰۰ مدخل می‌سازد؛ فرهنگ‌نامه‌ای که خالق و همکار AI با هم می‌سازند."] : isUr ? ["کسی IP کو کئی سال چلانے کے بعد رول بکس، کہانیاں، ڈیزائن ورژن اور بیرونی وکی مختلف فولڈروں میں بکھر جاتے ہیں۔ سرکاری مواد اور کام کی یادداشت کی حد اکثر صرف ایک شخص کے ذہن میں رہتی ہے۔", "لائبریرنگ ان مواد سے کلیدی الفاظ نکالتا ہے، ہم معنی اصطلاحات کو ایک اندراج میں ملاتا ہے اور 1,500 اندراجات کا Obsidian طرز Vault بناتا ہے؛ ایک زندہ لغت جو تخلیق کار اور AI ساتھی مل کر بناتے ہیں۔"] : ["بعد سنوات من تشغيل IP واحد، تتناثر كتب القواعد والقصص ونسخ التصميم وصفحات الويكي في المجلدات والشاشات. وغالباً يبقى الحد الفاصل بين المادة الرسمية وذاكرة العمل داخل رأس شخص واحد.", "تسحب هذه العملية الكلمات المفتاحية من تلك المواد، وتدمج المصطلحات المتقاربة في مدخل واحد، وتبني Vault بأسلوب Obsidian من 1500 مدخل؛ قاموساً حياً يصنعه المبدع وزميله العامل بالذكاء الاصطناعي."],
      input: [isFa ? "مواد پراکنده" : isUr ? "بکھرا ہوا مواد" : "مواد متناثرة", isFa ? "کتابچه‌ها، داستان‌ها، اسناد طراحی، پیش‌نویس‌های نسخه‌دار، ویکی‌های بیرونی و یادداشت‌های مرجع." : isUr ? "رول بکس، مختصر کہانیاں، منصوبہ بندی دستاویزات، ورژن شدہ مسودے، بیرونی وکی اور حوالہ نوٹس۔" : "كتب قواعد، قصص قصيرة، وثائق تخطيط، مسودات متعددة النسخ، صفحات ويكي خارجية وملاحظات مرجعية."],
      output: [isFa ? "Obsidian Vault · ۱۵۰۰ مدخل" : isUr ? "Obsidian Vault · 1,500 اندراجات" : "Obsidian Vault · 1500 مدخل", isFa ? "۱۵۰۰ فایل Markdown که با ۹ دسته و محورهای جهان‌سازی مرتب شده و به Lorebook و Storytelling 100 وصل می‌شوند." : isUr ? "نو زمروں اور ورلڈ بلڈنگ محوروں سے منظم 1,500 Markdown اندراجات جو Lorebook اور Storytelling 100 کو مواد دیتے ہیں۔" : "1500 ملف Markdown منظّم بتسع فئات ومحاور بناء العالم، ويغذي Lorebook وStorytelling 100."],
    },
    seoyeongak: {
      title: isFa ? "فرآیند سئویونگاک" : isUr ? "سویونگاک عمل" : "عملية سيويونغاك",
      desc: isFa ? "فرآیندی شش‌مرحله‌ای برای تبدیل متن اصلی خارجی به مواد ترجمه و اقتباس." : isUr ? "چھ مرحلوں کا عمل جو غیر ملکی متن کو ترجمہ اور اقتباس کے مواد میں بدلتا ہے۔" : "عملية من ست مراحل تحول عملاً أجنبياً إلى مواد للترجمة والاقتباس.",
      og: isFa ? "خوانش عمیق پیش از ترجمه با نمونه Pride and Prejudice." : isUr ? "ترجمے سے پہلے گہرا مطالعہ، Pride and Prejudice کو عملی مثال بنا کر۔" : "قراءة عميقة قبل الترجمة، مع Pride and Prejudice كحالة عملية.",
      lead: isFa ? ["apple فقط «سیب» نیست. وزن یک کلمه می‌تواند بافت اثر را تعیین کند. سئویونگاک پیش از ترجمه، متن خارجی را یک بار دیگر عمیق می‌خواند و وزن واژه‌ها را کنار خود واژه‌ها می‌گذارد.", "از یک اثر حدود ۳۵ دارایی تولید می‌شود. این دارایی‌ها لحن، دوره، طبقه، رابطه و نشانه‌های اقتباس را به مترجم، اقتباس‌گر و نویسنده منتقل می‌کنند."] : isUr ? ["apple صرفاً 'سیب' نہیں۔ ایک لفظ کا وزن پوری تخلیق کا لمس بدل سکتا ہے۔ سویونگاک ترجمے سے پہلے متن کو دوبارہ گہرائی سے پڑھتا ہے اور لفظ کے ساتھ اس کا وزن بھی رکھتا ہے۔", "ایک متن سے تقریباً 35 اثاثے بنتے ہیں۔ یہ اثاثے لہجہ، دور، طبقہ، رشتے اور اقتباس کے اشارے مترجم، مصنف اور ایڈیٹر تک پہنچاتے ہیں۔"] : ["التفاحة ليست مجرد apple. وزن كلمة واحدة قد يحدد ملمس العمل. سيويونغاك يقرأ النص الأجنبي بعمق مرة أخرى قبل الترجمة، ويضع وزن الكلمات بجانب الكلمات نفسها.", "ينتج عن عمل واحد نحو 35 مادة. تحمل هذه المواد النبرة والزمن والطبقة والعلاقات وإشارات الاقتباس إلى المترجمين والمقتبسين والكتاب."],
      input: [isFa ? "یک اثر اصلی خارجی" : isUr ? "ایک غیر ملکی اصل متن" : "عمل أجنبي واحد", isFa ? "آثاری مانند Pride and Prejudice یا Romeo and Juliet، معمولاً از متن معتبر." : isUr ? "Pride and Prejudice یا Romeo and Juliet جیسا متن، عموماً معتبر ٹیکسٹ ماخذ سے۔" : "عمل مثل Pride and Prejudice أو Romeo and Juliet، عادة من مصدر نصي موثوق."],
      output: [isFa ? "حدود ۳۵ ماده ترجمه و اقتباس" : isUr ? "تقریباً 35 ترجمہ و اقتباس مواد" : "نحو 35 مادة للترجمة والاقتباس", isFa ? "راهنماهای شخصیت، رویداد، واژگان دوره، لحن و منابع آماده اقتباس." : isUr ? "کردار نوٹس، واقعہ گائیڈ، دور کی لغت، لہجہ رہنما اور اقتباس کے لیے تیار معاون دستاویزات۔" : "ملاحظات شخصيات، أدلة أحداث، مفردات عصر، أدلة نبرة ومواد مساعدة جاهزة للاقتباس."],
    },
  };
  t.lorebook = {
    title: isFa ? "فرآیند لوربوک" : isUr ? "لوربک عمل" : "عملية Lorebook",
    desc: isFa ? "Vault یا آرشیو IP را به دانشنامه قابل انتشار و نسخه وب عمومی تبدیل می‌کند." : isUr ? "Vault یا جمع شدہ IP مواد کو قابل اشاعت انسائیکلوپیڈیا اور عوامی ویب نسخے میں بدلتا ہے۔" : "تحول Vault أو أرشيف IP إلى موسوعة قابلة للنشر ونسخة ويب عامة.",
    og: isFa ? "شش فاز برای تبدیل Vault با ۱۵۰۰ مدخل به کتاب تنظیمات و وب‌سایت." : isUr ? "1,500 اندراجات کے Vault کو سیٹنگ انسائیکلوپیڈیا اور ویب ایڈیشن میں بدلنے کے چھ مراحل۔" : "ست مراحل لتحويل Vault من 1500 مدخل إلى موسوعة إعدادات ونسخة ويب.",
    lead: isFa ? ["هر خالق در نهایت جهانی می‌سازد و روزی می‌خواهد آن را در یک کتاب ببندد. فرآیند لوربوک این کار را به شش فاز فشرده می‌کند.", "ورودی آن Vault با ۱۵۰۰ مدخل است و خروجی آن کتاب B5 حدود ۴۵۰ صفحه‌ای و نسخه عمومی وب است. همان Markdown منبع واحد حقیقت باقی می‌ماند."] : isUr ? ["ہر تخلیق کار آخرکار ایک دنیا بناتا ہے اور کبھی نہ کبھی اسے کتاب میں باندھنا چاہتا ہے۔ لوربک عمل اس کام کو چھ مراحل میں سمیٹتا ہے۔", "یہ 1,500 اندراجات کے Vault کو ان پٹ بناتا ہے اور تقریباً 450 صفحات کی B5 کتاب کے ساتھ عوامی ویب ایڈیشن بناتا ہے۔ وہی Markdown واحد مستند ماخذ رہتا ہے۔"] : ["كل مبدع يبني عالماً في النهاية، ثم يرغب في جمعه في كتاب. عملية Lorebook تضغط هذا العمل في ست مراحل.", "تأخذ Vault من 1500 مدخل وتنتج كتاباً مطبوعاً بحجم B5 يقارب 450 صفحة مع نسخة ويب عامة. يبقى مصدر Markdown نفسه هو مصدر الحقيقة الواحد."],
    input: [isFa ? "Vault با ۱۵۰۰ مدخل یا مواد گردآوری‌شده IP" : isUr ? "1,500 اندراجات کا Vault یا جمع شدہ IP مواد" : "Vault من 1500 مدخل أو مواد IP مجمعة", isFa ? "Obsidian Vault ساختاریافته یا بدنه‌ای از مواد IP آماده نگاشت به ساختار کتاب." : isUr ? "ساختہ frontmatter والا Obsidian Vault یا کتابی ساخت میں ڈھلنے کے لیے تیار IP مواد۔" : "Obsidian Vault بواجهة منظمة، أو مواد IP جاهزة للربط ببنية كتاب."],
    output: [isFa ? "نسخه چاپی + نسخه وب عمومی" : isUr ? "طباعتی نسخہ + عوامی ویب نسخہ" : "نسخة مطبوعة + نسخة ويب عامة", isFa ? "دانشنامه جلدسخت B5 و وب‌سایت ایستا که از همان منبع Markdown منتشر می‌شوند." : isUr ? "B5 ہارڈ کور انسائیکلوپیڈیا اور اسی Markdown سے بننے والی جامد ویب سائٹ۔" : "موسوعة بغلاف صلب B5 وموقع ثابت منشوران من مصدر Markdown نفسه."],
  };
  t.character = {
    title: isFa ? "فرآیند ساخت شخصیت" : isUr ? "کردار سازی کا عمل" : "عملية بناء الشخصية",
    desc: isFa ? "از یک خط بذر تا شیت کامل شخصیت در دوازده مرحله حرکت می‌کند." : isUr ? "ایک بیج لائن سے مکمل کردار شیٹ تک بارہ مراحل میں جاتا ہے۔" : "تنتقل من بذرة واحدة إلى بطاقة شخصية كاملة عبر اثنتي عشرة خطوة.",
    og: isFa ? "دوازده مرحله برای ساخت شخصیت باورپذیر از کارت‌های بذر و محورهای روانی." : isUr ? "بیج کارڈز، نفسیاتی محوروں اور آؤٹ پٹ فارمیٹس سے قائل کردار بنانے کے بارہ مراحل۔" : "اثنتا عشرة خطوة لبناء شخصية مقنعة من بطاقات بذور ومحاور نفسية وصيغ إخراج.",
    lead: isFa ? ["شخصیت پایگاه داده نیست. پرکردن نام، سن، قد و سرگرمی تضمین نمی‌کند که آدمی روی صفحه حرکت کند. یک جدول می‌تواند در دستی انسان و در دستی دیگر عروسک کاغذی بسازد.", "این فرآیند از بذر شروع می‌شود و تا جایی پیش می‌رود که شخصیت نفس بکشد. خالق و همکار AI در ۸ تا ۱۵ ساعت یک شخصیت کامل را با خروجی پنج رسانه می‌سازند."] : isUr ? ["کردار ڈیٹا بیس نہیں۔ نام، عمر، قد اور شوق بھر دینے سے کوئی شخص صفحے پر چلنے نہیں لگتا۔ ایک ہی جدول کسی ہاتھ میں انسان اور کسی ہاتھ میں کاغذی پتلا بن جاتا ہے۔", "کردار سازی بیج سے شروع ہو کر بارہ مرحلوں میں اس مقام تک جاتی ہے جہاں کردار سانس لینے لگتا ہے۔ تخلیق کار اور AI ساتھی 8 سے 15 گھنٹوں میں مکمل کردار اور پانچ میڈیم آؤٹ پٹ بناتے ہیں۔"] : ["الشخصية ليست قاعدة بيانات. ملء الاسم والعمر والطول والهوايات لا يضمن أن تتحرك الشخصية على الصفحة. الجدول نفسه قد يصنع إنساناً في يد ودمية ورقية في يد أخرى.", "تبدأ عملية بناء الشخصية من بذرة وتتحرك عبر اثنتي عشرة خطوة حتى تتنفس الشخصية. يبني المبدع وزميله بالذكاء الاصطناعي شخصية كاملة خلال 8 إلى 15 ساعة، مع مخرجات لخمس وسائط."],
    input: [isFa ? "مشتی بذر" : isUr ? "بیجوں کی ایک مٹھی" : "حفنة بذور", isFa ? "دسته‌ای کلیدواژه از بریف مشتری یا پنج کارت تصادفی از دسته ۳۰ کارتی." : isUr ? "کلائنٹ بریف کے کلیدی الفاظ یا 30 کارڈز کے ڈیک سے پانچ منتخب کارڈ۔" : "حزمة كلمات مفتاحية من موجز العميل أو خمس بطاقات عشوائية من رزمة من 30 بطاقة."],
    output: [isFa ? "شیت یکپارچه + خروجی‌های کمکی + پنج رسانه" : isUr ? "یکجا شیٹ + معاون نتائج + پانچ میڈیم" : "بطاقة موحدة + مخرجات مساعدة + خمس وسائط", isFa ? "شیت ۱۲ مرحله‌ای، صحنه روزمره، پاسخ به ۲۲ پرسش عمیق و قالب‌های خروجی برای پنج رسانه." : isUr ? "بارہ مرحلوں کی شیٹ، روزمرہ منظر، 22 گہرے سوالات کے جواب اور پانچ میڈیم فارمیٹس۔" : "بطاقة من 12 خطوة، مشهد يومي، إجابات عن 22 سؤالاً عميقاً وصيغ إخراج لخمس وسائط."],
  };
  t.storytelling100 = {
    title: isFa ? "فرآیند Storytelling 100" : isUr ? "Storytelling 100 عمل" : "عملية Storytelling 100",
    desc: isFa ? "Vault و شیت ۱۰۰ شخصیت را به ۱۰۰ سناریوی برشی از زندگی تبدیل می‌کند." : isUr ? "Vault اور 100 کردار شیٹس کو 100 روزمرہ منظرناموں میں بدلتا ہے۔" : "تحول Vault وبطاقات 100 شخصية إلى مئة سيناريو من الحياة اليومية.",
    og: isFa ? "فرآیندی هفت‌مرحله‌ای برای تولید ۱۰۰ سناریوی کوتاه از Vault جهان و شخصیت‌ها." : isUr ? "دنیا کے Vault اور کردار شیٹس سے 100 مختصر منظرنامے بنانے کا سات مرحلوں کا عمل۔" : "عملية من سبع مراحل لإنتاج مئة سيناريو قصير من Vault العالم وبطاقات الشخصيات.",
    lead: isFa ? ["جهان‌سازی با کتاب قانون توضیح داده می‌شود، اما با داستان زنده می‌شود. وقتی ۱۰۰ شخصیت تعریف شد، Vault ورودی ۱۰۰ سناریوی روزمره می‌شود.", "داستان به حادثه عظیم نیاز ندارد. بوی شغل، ریتم روز، وزن یک شیء و حس زندگی در این جهان کافی است. با ۱۰۰ قطعه، IP تراکم پیدا می‌کند."] : isUr ? ["ورلڈ بلڈنگ رول بک سے سمجھائی جاتی ہے، مگر کہانیوں سے زندہ ہوتی ہے۔ جب 100 کردار طے ہو جائیں، Vault 100 روزمرہ منظرناموں کا ان پٹ بنتا ہے۔", "کہانی کو بڑے واقعے کی ضرورت نہیں۔ پیشے کی بو، دن کی تال، کسی چیز کا وزن، اور یہ احساس کہ اس دنیا میں لوگ ایسے رہتے ہیں، کافی ہے۔ 100 ٹکڑوں سے IP میں کثافت آتی ہے۔"] : ["يُشرح بناء العالم في كتب القواعد، لكنه يحيا بالقصص. عندما تُحدد مئة شخصية، يصبح Vault مدخل مئة سيناريو من الحياة اليومية.", "لا تحتاج القصة إلى حادث كبير. رائحة المهنة، إيقاع اليوم، وزن أداة، وإحساس أن الناس يعيشون هكذا في هذا العالم تكفي. عبر مئة قطعة يكتسب IP كثافته."],
    input: [isFa ? "Vault + شیت ۱۰۰ شخصیت" : isUr ? "Vault + 100 کردار شیٹس" : "Vault + بطاقات 100 شخصية", isFa ? "فرهنگ جهان ساخته‌شده با لایبررینگ و ۱۰۰ شیت شخصیت قطعی." : isUr ? "لائبریرنگ سے بنی دنیا کی لغت اور کردار سازی سے طے شدہ 100 شیٹس۔" : "قاموس العالم الناتج عن بناء المكتبة و100 بطاقة شخصية مؤكدة."],
    output: [isFa ? "۱۰۰ سناریوی روزمره · جلد کوتاه‌داستان همراه" : isUr ? "100 روزمرہ منظرنامے · ساتھی مختصر کہانی جلد" : "100 سيناريو يومي · مجلد قصصي مرافق", isFa ? "۱۰۰ قطعه در قالب داستان کوتاه، گفت‌وگو، اسکچ یا سناریوی کمیک چهارخانه." : isUr ? "مختصر کہانی، خاکہ، مکالمہ یا چار خانوں والی کامک اسکرپٹ کی شکل میں 100 ٹکڑے۔" : "مئة قطعة بصيغ قصة قصيرة أو اسكتش أو حوار أو سيناريو كومكس رباعي."],
  };
  return t;
}
function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function overlay(base, patch) {
  const next = deepClone(base);
  for (const [slug, partial] of Object.entries(patch)) {
    next[slug] = { ...next[slug], ...partial };
  }
  return next;
}

data.ar = overlay(data.en, arabicBase("ar"));
data.fa = overlay(data.en, arabicBase("fa"));
data.ur = overlay(data.en, arabicBase("ur"));

const generic = {
  ja: {
    tocTitle: "14回シリーズ",
    tocDesc: "各章はこの工程の入力、判断、出力、次工程との接続を扱います。",
    chapter: (n) => `第${n}章`,
    appendix: "付録",
    appliedDesc: "MEJE Worksの自社IP制作とB2Bプロジェクトで実際に使う制作手順です。",
    applied: [["自社IPへの適用", "FEWKなどの自社IPで、世界観資料・人物資料・物語資料を統合する工程として使います。"], ["B2Bプロジェクトへの適用", "ゲーム、ブランド、エンターテインメントIPの制作資料を納品可能な形へ整理します。"]],
    pipeDesc: "この工程はMEJEの世界観IP制作パイプライン内で前後の工程と接続されます。",
    labels: { next: "↓ 次工程", input: "↑ 入力", paired: "↔ 連携", output: "↓ 出力" },
    names: { librarying: "ライブラリング", seoyeongak: "書淵閣", lorebook: "ロアブック", character: "キャラクター構築", storytelling100: "Storytelling 100" },
    desc: "関連する制作資産を次の工程へ渡します。",
    meta: {
      librarying: "// プロセス 03 / 整理 · 4段階",
      seoyeongak: "// プロセス 01 / 入力 · 6段階",
      lorebook: "// プロセス 04 / 出力 · 6フェーズ",
      character: "// プロセス 02 / 入力 · 12段階",
      storytelling100: "// プロセス 05 / 出力 · 7段階",
    },
  },
  "zh-cn": {
    tocTitle: "14篇系列",
    tocDesc: "各章说明该流程的输入、判断、输出，以及与下一流程的连接。",
    chapter: (n) => `第${n}章`,
    appendix: "附录",
    appliedDesc: "这是MEJE Works在自有IP制作与B2B项目中实际使用的制作流程。",
    applied: [["自有IP应用", "用于FEWK等自有IP，将世界观资料、角色资料和故事资料整合为生产资产。"], ["B2B项目应用", "把游戏、品牌、娱乐IP的制作资料整理为可交付的结构。"]],
    pipeDesc: "该流程在MEJE的世界观IP生产管线中与前后流程相连。",
    labels: { next: "↓ 下一步", input: "↑ 输入", paired: "↔ 配套", output: "↓ 输出" },
    names: { librarying: "资料库化", seoyeongak: "书渊阁", lorebook: "Lorebook", character: "角色构建", storytelling100: "Storytelling 100" },
    desc: "把相关制作资产传递给下一个流程。",
    meta: {
      librarying: "// 流程 03 / 整理 · 4阶段",
      seoyeongak: "// 流程 01 / 输入 · 6阶段",
      lorebook: "// 流程 04 / 输出 · 6阶段",
      character: "// 流程 02 / 输入 · 12阶段",
      storytelling100: "// 流程 05 / 输出 · 7阶段",
    },
  },
  "zh-tw": {
    tocTitle: "14篇系列",
    tocDesc: "各章說明該流程的輸入、判斷、輸出，以及與下一流程的連接。",
    chapter: (n) => `第${n}章`,
    appendix: "附錄",
    appliedDesc: "這是MEJE Works在自有IP製作與B2B專案中實際使用的製作流程。",
    applied: [["自有IP應用", "用於FEWK等自有IP，將世界觀資料、角色資料和故事資料整合為生產資產。"], ["B2B專案應用", "把遊戲、品牌、娛樂IP的製作資料整理為可交付的結構。"]],
    pipeDesc: "該流程在MEJE的世界觀IP生產管線中與前後流程相連。",
    labels: { next: "↓ 下一步", input: "↑ 輸入", paired: "↔ 配套", output: "↓ 輸出" },
    names: { librarying: "資料庫化", seoyeongak: "書淵閣", lorebook: "Lorebook", character: "角色構建", storytelling100: "Storytelling 100" },
    desc: "把相關製作資產傳遞給下一個流程。",
    meta: {
      librarying: "// 流程 03 / 整理 · 4階段",
      seoyeongak: "// 流程 01 / 輸入 · 6階段",
      lorebook: "// 流程 04 / 輸出 · 6階段",
      character: "// 流程 02 / 輸入 · 12階段",
      storytelling100: "// 流程 05 / 輸出 · 7階段",
    },
  },
  ar: {
    tocTitle: "سلسلة من 14 فصلاً",
    tocDesc: "يعرض كل فصل مدخلات العملية وقراراتها ومخرجاتها وصلتها بالمرحلة التالية.",
    chapter: (n) => `الفصل ${n}`,
    appendix: "ملحق",
    appliedDesc: "هذه عملية إنتاج تستخدمها MEJE Works في عناوينها الداخلية ومشاريع B2B.",
    applied: [["تطبيق في IP داخلي", "تستخدم في FEWK وغيرها لربط مواد العالم والشخصيات والقصص في أصل إنتاجي واحد."], ["تطبيق في مشاريع B2B", "تنظم مواد ألعاب أو علامات أو عناوين ترفيهية في بنية قابلة للتسليم."]],
    pipeDesc: "ترتبط هذه العملية بما قبلها وما بعدها داخل خط إنتاج IP القائم على العالم.",
    labels: { next: "↓ المرحلة التالية", input: "↑ مدخلات", paired: "↔ متصل", output: "↓ مخرجات" },
    names: { librarying: "بناء المكتبة المعرفية", seoyeongak: "سيويونغاك", lorebook: "Lorebook", character: "بناء الشخصية", storytelling100: "Storytelling 100" },
    desc: "تنقل أصول الإنتاج المرتبطة إلى المرحلة التالية.",
    meta: {
      librarying: "// العملية 03 / تنظيم · 4 مراحل",
      seoyeongak: "// العملية 01 / إدخال · 6 مراحل",
      lorebook: "// العملية 04 / إخراج · 6 مراحل",
      character: "// العملية 02 / إدخال · 12 خطوة",
      storytelling100: "// العملية 05 / إخراج · 7 مراحل",
    },
  },
  fa: {
    tocTitle: "مجموعه ۱۴ بخشی",
    tocDesc: "هر بخش ورودی، تصمیم‌ها، خروجی و اتصال این فرآیند به مرحله بعدی را توضیح می‌دهد.",
    chapter: (n) => `فصل ${n}`,
    appendix: "پیوست",
    appliedDesc: "این فرآیند در تولید IP داخلی MEJE Works و پروژه‌های B2B به‌صورت عملی استفاده می‌شود.",
    applied: [["کاربرد در IP داخلی", "در FEWK و پروژه‌های مشابه برای اتصال مواد جهان، شخصیت و داستان به یک دارایی تولیدی استفاده می‌شود."], ["کاربرد در پروژه‌های B2B", "مواد تولیدی بازی، برند یا IP سرگرمی را به ساختاری قابل تحویل تبدیل می‌کند."]],
    pipeDesc: "این فرآیند در خط تولید IP جهان‌محور MEJE به مراحل قبل و بعد وصل می‌شود.",
    labels: { next: "↓ مرحله بعد", input: "↑ ورودی", paired: "↔ متصل", output: "↓ خروجی" },
    names: { librarying: "لایبررینگ", seoyeongak: "سئویونگاک", lorebook: "لوربوک", character: "ساخت شخصیت", storytelling100: "Storytelling 100" },
    desc: "دارایی‌های تولیدی مرتبط را به مرحله بعد منتقل می‌کند.",
    meta: {
      librarying: "// فرآیند 03 / سازمان‌دهی · 4 مرحله",
      seoyeongak: "// فرآیند 01 / ورودی · 6 مرحله",
      lorebook: "// فرآیند 04 / خروجی · 6 فاز",
      character: "// فرآیند 02 / ورودی · 12 مرحله",
      storytelling100: "// فرآیند 05 / خروجی · 7 مرحله",
    },
  },
  ur: {
    tocTitle: "14 ابواب کا سلسلہ",
    tocDesc: "ہر باب اس عمل کے ان پٹ، فیصلوں، آؤٹ پٹ اور اگلے مرحلے سے تعلق کو بیان کرتا ہے۔",
    chapter: (n) => `باب ${n}`,
    appendix: "ضمیمہ",
    appliedDesc: "یہ عمل MEJE Works کے داخلی IP اور B2B منصوبوں میں عملی طور پر استعمال ہوتا ہے۔",
    applied: [["داخلی IP میں استعمال", "FEWK جیسے منصوبوں میں دنیا، کردار اور کہانی کے مواد کو ایک پیداواری اثاثے میں جوڑتا ہے۔"], ["B2B منصوبوں میں استعمال", "گیم، برانڈ یا تفریحی IP کے مواد کو قابل تحویل ساخت میں منظم کرتا ہے۔"]],
    pipeDesc: "یہ عمل MEJE کی ورلڈ ویو IP پیداوار پائپ لائن میں پچھلے اور اگلے مراحل سے جڑا ہے۔",
    labels: { next: "↓ اگلا مرحلہ", input: "↑ ان پٹ", paired: "↔ منسلک", output: "↓ آؤٹ پٹ" },
    names: { librarying: "لائبریرنگ", seoyeongak: "سویونگاک", lorebook: "لوربک", character: "کردار سازی", storytelling100: "Storytelling 100" },
    desc: "متعلقہ پیداواری اثاثے اگلے مرحلے تک منتقل کرتا ہے۔",
    meta: {
      librarying: "// عمل 03 / ترتیب · 4 مراحل",
      seoyeongak: "// عمل 01 / ان پٹ · 6 مراحل",
      lorebook: "// عمل 04 / آؤٹ پٹ · 6 مراحل",
      character: "// عمل 02 / ان پٹ · 12 مراحل",
      storytelling100: "// عمل 05 / آؤٹ پٹ · 7 مراحل",
    },
  },
};

function applyGenericLocalized(langKey) {
  if (langKey === "en") return;
  const g = generic[langKey];
  const processOrder = Object.keys(data.en);
  for (const slug of processOrder) {
    const p = data[langKey][slug];
    const baseChapters = data.en[slug].toc[2];
    p.meta = g.meta[slug];
    p.toc = [
      slug === "lorebook" ? `${g.tocTitle} + ${g.appendix}` : g.tocTitle,
      g.tocDesc,
      baseChapters.map((_, index) => (slug === "lorebook" && index === baseChapters.length - 1 ? g.appendix : g.chapter(String(index + 1).padStart(2, "0")))),
    ];
    p.appliedDesc = g.appliedDesc;
    p.applied = g.applied;
    p.pipeDesc = g.pipeDesc;
    p.cross = data.en[slug].cross.map(([target, label]) => {
      const key = label.includes("Next") ? "next" : label.includes("Input") ? "input" : label.includes("Output") ? "output" : "paired";
      return [target, g.labels[key], g.names[target], g.desc];
    });
  }
}

Object.keys(langs).forEach(applyGenericLocalized);

function href(lang, slug) {
  if (lang === "ko") return `../../process/${slug}.html`;
  return `../../${lang}/process/${slug}.html`;
}

function canonical(lang, slug) {
  if (lang === "ko") return `https://meje.kr/process/${slug}.html`;
  return `https://meje.kr/${lang}/process/${slug}.html`;
}

function escapeHtml(v) {
  return String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function alternates(slug) {
  return langOrder.map((lang) => `<link rel="alternate" hreflang="${hreflangs[lang]}" href="${canonical(lang, slug)}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="https://meje.kr/process/${slug}.html">`;
}

function langBar(active, slug) {
  return langOrder.map((lang) => `<a href="${href(lang, slug)}"${lang === active ? ' class="active"' : ""}>${langLabels[lang]}</a>`).join('<span class="sep">&middot;</span>');
}

function render(langKey, slug, p) {
  const lang = langs[langKey];
  const dir = lang.dir === "rtl" ? ' dir="rtl"' : "";
  const [tocTitle, tocDesc, chapters] = p.toc || data.en[slug].toc;
  const chapterHtml = chapters.map((title, idx) => {
    const num = title.startsWith("Appendix") || title.startsWith("부록") ? "+" : String(idx + 1).padStart(2, "0");
    return `<div class="chapter-item"><div class="chapter-num">${num}</div><div class="chapter-title">${escapeHtml(title)}</div></div>`;
  }).join("\n    ");
  const ctas = (p.ctas || data.en[slug].ctas).map(([label, url]) => {
    const text = label === "MEJE Books" ? "MEJE Books" : lang.link;
    return `<a href="${url}" target="_blank" rel="noopener" class="proc-cta">${escapeHtml(text)} →</a>`;
  }).join("\n  ");
  const applied = (p.applied || data.en[slug].applied).map(([name, desc]) => `
    <div class="applied-row">
      <div class="applied-name">${escapeHtml(name)}</div>
      <div class="applied-desc">${escapeHtml(desc)}</div>
    </div>`).join("");
  const cross = (p.cross || data.en[slug].cross).map(([target, label, title, desc]) => `
    <a href="${target}.html" class="cross-card">
      <div class="cross-card-label">${escapeHtml(label)}</div>
      <div class="cross-card-title">${escapeHtml(title)}</div>
      <p class="cross-card-desc">${escapeHtml(desc)}</p>
    </a>`).join("");
  return `<!DOCTYPE html>
<html lang="${lang.html}"${dir}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${escapeHtml(p.desc)}">
<title>${escapeHtml(p.title)} | MEJE WORKS</title>
<meta property="og:title" content="${escapeHtml(p.title)} | MEJE WORKS">
<meta property="og:description" content="${escapeHtml(p.og)}">
<meta property="og:image" content="https://meje.kr/img/og-cover.png">
<meta property="og:url" content="${canonical(langKey, slug)}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
${alternates(slug)}
<link rel="icon" type="image/svg+xml" href="../../img/favicon.svg">
<link rel="apple-touch-icon" href="../../img/logo.png">
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../css/style.css">
<style>
.proc-cta + .proc-cta { margin-left: 10px; }
[dir="rtl"] .proc-cta + .proc-cta { margin-left: 0; margin-right: 10px; }
@media (max-width: 640px) {
  .proc-cta + .proc-cta { margin-left: 0; margin-top: 10px; }
  [dir="rtl"] .proc-cta + .proc-cta { margin-right: 0; }
}
</style>
</head>
<body>
<div id="scroll-progress"></div>
<nav class="site-nav">
  <a href="../index.html" class="nav-logo">MEJE<span>.</span>KR</a>
  <div class="lang-bar">${langBar(langKey, slug)}</div>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')">MENU</button>
  <ul class="nav-links">
    <li><a href="../index.html">${escapeHtml(lang.nav[0])}</a></li>
    <li><a href="../about.html">${escapeHtml(lang.nav[1])}</a></li>
    <li><a href="../works.html">${escapeHtml(lang.nav[2])}</a></li>
    <li><a href="../ip.html">${escapeHtml(lang.nav[3])}</a></li>
    <li><a href="../process.html" class="active">${escapeHtml(lang.nav[4])}</a></li>
    <li><a href="../knowledge.html">${escapeHtml(lang.nav[5])}</a></li>
    <li><a href="https://books.meje.kr/" target="_blank" rel="noopener">${escapeHtml(lang.nav[6])}</a></li>
  </ul>
  <span class="nav-badge">${escapeHtml(p.subtitle)}</span>
</nav>
<main>
<section class="proc-hero">
  <div class="proc-hero-meta">${escapeHtml(p.meta)}</div>
  <h1 class="proc-hero-title">${escapeHtml(p.title)}</h1>
  <p class="proc-hero-en">${escapeHtml(p.subtitle)}</p>
  <p class="proc-hero-lead">${p.lead.map(escapeHtml).join("<br><br>")}</p>
</section>
<section class="proc-io">
  <div class="proc-io-grid">
    <div class="proc-io-box">
      <div class="proc-io-box-label">INPUT</div>
      <div class="proc-io-box-title">${escapeHtml(p.input[0])}</div>
      <p class="proc-io-box-desc">${escapeHtml(p.input[1])}</p>
    </div>
    <div class="proc-io-arrow">→</div>
    <div class="proc-io-box">
      <div class="proc-io-box-label">OUTPUT</div>
      <div class="proc-io-box-title">${escapeHtml(p.output[0])}</div>
      <p class="proc-io-box-desc">${escapeHtml(p.output[1])}</p>
    </div>
  </div>
</section>
<section class="proc-section">
  <p class="proc-section-label">// table_of_contents</p>
  <h2 class="proc-section-title">${escapeHtml(tocTitle)}</h2>
  <p class="proc-section-desc">${escapeHtml(tocDesc)}</p>
  <div class="chapter-list">${chapterHtml}</div>
  ${ctas}
</section>
<section class="proc-section">
  <p class="proc-section-label">// applied_projects</p>
  <h2 class="proc-section-title">${escapeHtml(lang.section[1])}</h2>
  <p class="proc-section-desc">${escapeHtml(p.appliedDesc || data.en[slug].appliedDesc)}</p>
  <div class="applied-list">${applied}
  </div>
</section>
<section class="proc-section">
  <p class="proc-section-label">// next_in_pipeline</p>
  <h2 class="proc-section-title">${escapeHtml(lang.section[2])}</h2>
  <p class="proc-section-desc">${escapeHtml(p.pipeDesc || data.en[slug].pipeDesc)}</p>
  <div class="cross-grid">${cross}
  </div>
</section>
</main>
<footer>
  <p class="footer-logo">MEJE<span>.</span>KR</p>
  <div class="footer-contact">MEJE Works Corp. ｜ Kim Dong-eun ｜ 772-87-02365<br>503, 217, Yeoksam-ro, Gangnam-gu, Seoul ｜ 0507-1420-1205</div>
  <div class="footer-links">
    <a href="../index.html">&larr; ${escapeHtml(lang.footerHome)}</a>
    <a href="../about.html">${escapeHtml(lang.nav[1])}</a>
    <a href="../works.html">${escapeHtml(lang.nav[2])}</a>
    <a href="../process.html">${escapeHtml(lang.nav[4])}</a>
    <a href="../knowledge.html">${escapeHtml(lang.nav[5])}</a>
    <a href="https://books.meje.kr/" target="_blank" rel="noopener">${escapeHtml(lang.nav[6])}</a>
  </div>
  <p class="footer-copy">&copy; MEJE Works Corp. All Rights Reserved.</p>
</footer>
<script>
const prog = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const st = document.documentElement.scrollTop;
  const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  prog.style.width = (sh > 0 ? (st / sh) * 100 : 0) + '%';
}, { passive: true });
</script>
</body>
</html>
`;
}

for (const lang of Object.keys(langs)) {
  for (const slug of Object.keys(data.en)) {
    const p = data[lang][slug];
    fs.writeFileSync(path.join(root, lang, "process", `${slug}.html`), render(lang, slug, p));
  }
}

console.log("Localized process detail pages generated.");
