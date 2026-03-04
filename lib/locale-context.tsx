"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type LocaleCode = "ko" | "en" | "ja" | "es" | "fr" | "de" | "zh-CN" | "zh-TW" | "pt" | "it" | "vi" | "th" | "ru" | "ar" | "hi" | "tr" | "nl" | "pl" | "sv" | "id"

export interface TranslationStrings {
  // Sidebar nav
  menu: string
  home: string
  analysis: string
  library: string
  synapse: string
  explorer: string
  featureRequest: string
  subscribe: string
  settings: string
  // GNB
  gnbTitle: string
  // Language modal
  langModalTranslation: string
  langModalTranslationDesc: string
  langModalRecommended: string
  langModalChoose: string
}

const translations: Record<LocaleCode, TranslationStrings> = {
  ko: {
    menu: "메뉴",
    home: "홈",
    analysis: "분석",
    library: "라이브러리",
    synapse: "시냅스",
    explorer: "익스플로러",
    featureRequest: "기능 요청",
    subscribe: "구독",
    settings: "설정",
    gnbTitle: "DotLink",
    langModalTranslation: "번역",
    langModalTranslationDesc: "콘텐츠의 스크립트를 자동으로 자국어로 번역합니다.",
    langModalRecommended: "추천 언어 및 지역",
    langModalChoose: "언어와 지역을 선택하세요",
  },
  en: {
    menu: "Menu",
    home: "Home",
    analysis: "Analysis",
    library: "Library",
    synapse: "Synapse",
    explorer: "Explorer",
    featureRequest: "Feature Request",
    subscribe: "Subscribe",
    settings: "Settings",
    gnbTitle: "DotLink",
    langModalTranslation: "Translation",
    langModalTranslationDesc: "Automatically translate content scripts to your language.",
    langModalRecommended: "Suggested languages and regions",
    langModalChoose: "Choose a language and region",
  },
  ja: {
    menu: "メニュー",
    home: "ホーム",
    analysis: "分析",
    library: "ライブラリ",
    synapse: "シナプス",
    explorer: "エクスプローラー",
    featureRequest: "機能リクエスト",
    subscribe: "サブスクリプション",
    settings: "設定",
    gnbTitle: "DotLink",
    langModalTranslation: "翻訳",
    langModalTranslationDesc: "コンテンツのスクリプトを自動的に母国語に翻訳します。",
    langModalRecommended: "おすすめの言語と地域",
    langModalChoose: "言語と地域を選択してください",
  },
  es: {
    menu: "Menú",
    home: "Inicio",
    analysis: "Análisis",
    library: "Biblioteca",
    synapse: "Sinapsis",
    explorer: "Explorador",
    featureRequest: "Solicitud",
    subscribe: "Suscripción",
    settings: "Ajustes",
    gnbTitle: "DotLink",
    langModalTranslation: "Traducción",
    langModalTranslationDesc: "Traduce automáticamente los scripts de contenido a tu idioma.",
    langModalRecommended: "Idiomas y regiones sugeridos",
    langModalChoose: "Elige un idioma y región",
  },
  fr: {
    menu: "Menu",
    home: "Accueil",
    analysis: "Analyse",
    library: "Bibliothèque",
    synapse: "Synapse",
    explorer: "Explorateur",
    featureRequest: "Demande",
    subscribe: "Abonnement",
    settings: "Paramètres",
    gnbTitle: "DotLink",
    langModalTranslation: "Traduction",
    langModalTranslationDesc: "Traduit automatiquement les scripts de contenu dans votre langue.",
    langModalRecommended: "Langues et régions suggérées",
    langModalChoose: "Choisissez une langue et une région",
  },
  de: {
    menu: "Menü",
    home: "Startseite",
    analysis: "Analyse",
    library: "Bibliothek",
    synapse: "Synapse",
    explorer: "Explorer",
    featureRequest: "Anfrage",
    subscribe: "Abonnement",
    settings: "Einstellungen",
    gnbTitle: "DotLink",
    langModalTranslation: "Übersetzung",
    langModalTranslationDesc: "Übersetzt Inhaltsskripte automatisch in Ihre Sprache.",
    langModalRecommended: "Vorgeschlagene Sprachen und Regionen",
    langModalChoose: "Wählen Sie eine Sprache und Region",
  },
  "zh-CN": {
    menu: "菜单",
    home: "首页",
    analysis: "分析",
    library: "资料库",
    synapse: "突触",
    explorer: "探索",
    featureRequest: "功能请求",
    subscribe: "订阅",
    settings: "设置",
    gnbTitle: "DotLink",
    langModalTranslation: "翻译",
    langModalTranslationDesc: "自动将内容脚本翻译成您的语言。",
    langModalRecommended: "推荐语言和地区",
    langModalChoose: "选择语言和地区",
  },
  "zh-TW": {
    menu: "選單",
    home: "首頁",
    analysis: "分析",
    library: "資料庫",
    synapse: "突觸",
    explorer: "探索",
    featureRequest: "功能請求",
    subscribe: "訂閱",
    settings: "設定",
    gnbTitle: "DotLink",
    langModalTranslation: "翻譯",
    langModalTranslationDesc: "自動將內容腳本翻譯成您的語言。",
    langModalRecommended: "推薦語言和地區",
    langModalChoose: "選擇語言和地區",
  },
  pt: {
    menu: "Menu",
    home: "Início",
    analysis: "Análise",
    library: "Biblioteca",
    synapse: "Sinapse",
    explorer: "Explorador",
    featureRequest: "Solicitação",
    subscribe: "Assinatura",
    settings: "Configurações",
    gnbTitle: "DotLink",
    langModalTranslation: "Tradução",
    langModalTranslationDesc: "Traduz automaticamente os scripts de conteúdo para o seu idioma.",
    langModalRecommended: "Idiomas e regiões sugeridos",
    langModalChoose: "Escolha um idioma e região",
  },
  it: {
    menu: "Menu",
    home: "Home",
    analysis: "Analisi",
    library: "Libreria",
    synapse: "Sinapsi",
    explorer: "Esploratore",
    featureRequest: "Richiesta",
    subscribe: "Abbonamento",
    settings: "Impostazioni",
    gnbTitle: "DotLink",
    langModalTranslation: "Traduzione",
    langModalTranslationDesc: "Traduce automaticamente gli script dei contenuti nella tua lingua.",
    langModalRecommended: "Lingue e regioni suggerite",
    langModalChoose: "Scegli una lingua e una regione",
  },
  vi: {
    menu: "Menu",
    home: "Trang chủ",
    analysis: "Phân tích",
    library: "Thư viện",
    synapse: "Synapse",
    explorer: "Khám phá",
    featureRequest: "Yêu cầu",
    subscribe: "Đăng ký",
    settings: "Cài đặt",
    gnbTitle: "DotLink",
    langModalTranslation: "Dịch thuật",
    langModalTranslationDesc: "Tự động dịch nội dung sang ngôn ngữ của bạn.",
    langModalRecommended: "Ngôn ngữ và khu vực đề xuất",
    langModalChoose: "Chọn ngôn ngữ và khu vực",
  },
  th: {
    menu: "เมนู",
    home: "หน้าหลัก",
    analysis: "วิเคราะห์",
    library: "ไลบรารี",
    synapse: "ไซแนปส์",
    explorer: "สำรวจ",
    featureRequest: "คำขอ",
    subscribe: "สมัครสมาชิก",
    settings: "ตั้งค่า",
    gnbTitle: "DotLink",
    langModalTranslation: "การแปล",
    langModalTranslationDesc: "แปลสคริปต์เนื้อหาเป็นภาษาของคุณโดยอัตโนมัติ",
    langModalRecommended: "ภาษาและภูมิภาคที่แนะนำ",
    langModalChoose: "เลือกภาษาและภูมิภาค",
  },
  ru: {
    menu: "Меню",
    home: "Главная",
    analysis: "Анализ",
    library: "Библиотека",
    synapse: "Синапс",
    explorer: "Обзор",
    featureRequest: "Запрос",
    subscribe: "Подписка",
    settings: "Настройки",
    gnbTitle: "DotLink",
    langModalTranslation: "Перевод",
    langModalTranslationDesc: "Автоматический перевод контента на ваш язык.",
    langModalRecommended: "Рекомендуемые языки и регионы",
    langModalChoose: "Выберите язык и регион",
  },
  ar: {
    menu: "القائمة",
    home: "الرئيسية",
    analysis: "تحليل",
    library: "المكتبة",
    synapse: "سينابس",
    explorer: "استكشاف",
    featureRequest: "طلب",
    subscribe: "اشتراك",
    settings: "الإعدادات",
    gnbTitle: "DotLink",
    langModalTranslation: "ترجمة",
    langModalTranslationDesc: "ترجمة محتوى النصوص تلقائيًا إلى لغتك.",
    langModalRecommended: "اللغات والمناطق المقترحة",
    langModalChoose: "اختر لغة ومنطقة",
  },
  hi: {
    menu: "मेनू",
    home: "होम",
    analysis: "विश्लेषण",
    library: "लाइब्रेरी",
    synapse: "सिनैप्स",
    explorer: "एक्सप्लोरर",
    featureRequest: "अनुरोध",
    subscribe: "सदस्यता",
    settings: "सेटिंग्स",
    gnbTitle: "DotLink",
    langModalTranslation: "अनुवाद",
    langModalTranslationDesc: "सामग्री स्क्रिप्ट को स्वचालित रूप से आपकी भाषा में अनुवाद करें।",
    langModalRecommended: "सुझाई गई भाषाएँ और क्षेत्र",
    langModalChoose: "भाषा और क्षेत्र चुनें",
  },
  tr: {
    menu: "Menü",
    home: "Ana Sayfa",
    analysis: "Analiz",
    library: "Kütüphane",
    synapse: "Sinaps",
    explorer: "Keşfet",
    featureRequest: "İstek",
    subscribe: "Abonelik",
    settings: "Ayarlar",
    gnbTitle: "DotLink",
    langModalTranslation: "Çeviri",
    langModalTranslationDesc: "İçerik komut dosyalarını otomatik olarak dilinize çevirin.",
    langModalRecommended: "Önerilen diller ve bölgeler",
    langModalChoose: "Bir dil ve bölge seçin",
  },
  nl: {
    menu: "Menu",
    home: "Home",
    analysis: "Analyse",
    library: "Bibliotheek",
    synapse: "Synaps",
    explorer: "Verkenner",
    featureRequest: "Verzoek",
    subscribe: "Abonnement",
    settings: "Instellingen",
    gnbTitle: "DotLink",
    langModalTranslation: "Vertaling",
    langModalTranslationDesc: "Vertaal contentscripts automatisch naar uw taal.",
    langModalRecommended: "Voorgestelde talen en regio's",
    langModalChoose: "Kies een taal en regio",
  },
  pl: {
    menu: "Menu",
    home: "Strona główna",
    analysis: "Analiza",
    library: "Biblioteka",
    synapse: "Synapsa",
    explorer: "Eksplorator",
    featureRequest: "Żądanie",
    subscribe: "Subskrypcja",
    settings: "Ustawienia",
    gnbTitle: "DotLink",
    langModalTranslation: "Tłumaczenie",
    langModalTranslationDesc: "Automatycznie tłumacz skrypty treści na Twój język.",
    langModalRecommended: "Sugerowane języki i regiony",
    langModalChoose: "Wybierz język i region",
  },
  sv: {
    menu: "Meny",
    home: "Hem",
    analysis: "Analys",
    library: "Bibliotek",
    synapse: "Synaps",
    explorer: "Utforskare",
    featureRequest: "Begäran",
    subscribe: "Prenumeration",
    settings: "Inställningar",
    gnbTitle: "DotLink",
    langModalTranslation: "Översättning",
    langModalTranslationDesc: "Översätt automatiskt innehållsskript till ditt språk.",
    langModalRecommended: "Föreslagna språk och regioner",
    langModalChoose: "Välj ett språk och region",
  },
  id: {
    menu: "Menu",
    home: "Beranda",
    analysis: "Analisis",
    library: "Perpustakaan",
    synapse: "Sinaps",
    explorer: "Jelajah",
    featureRequest: "Permintaan",
    subscribe: "Langganan",
    settings: "Pengaturan",
    gnbTitle: "DotLink",
    langModalTranslation: "Terjemahan",
    langModalTranslationDesc: "Terjemahkan skrip konten secara otomatis ke bahasa Anda.",
    langModalRecommended: "Bahasa dan wilayah yang disarankan",
    langModalChoose: "Pilih bahasa dan wilayah",
  },
}

interface LocaleContextType {
  locale: LocaleCode
  setLocale: (code: LocaleCode) => void
  t: TranslationStrings
  autoTranslate: boolean
  setAutoTranslate: (v: boolean) => void
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>("ko")
  const [autoTranslate, setAutoTranslate] = useState(true)

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code)
  }, [])

  const t = translations[locale]

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, autoTranslate, setAutoTranslate }}>
      {children}
    </LocaleContext.Provider>
  )
}
