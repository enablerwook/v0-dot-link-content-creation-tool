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
  // Analysis page
  analysisTitle: string
  analysisDesc: string
  analysisPlaceholder: string
  analysisButton: string
  analysisLoading: string
  analysisPlatform: string
  analysisSaved: string
  analysisSaveToLibrary: string
  analysisAnalyzing: string
  // Landing page
  landingBetaBadge: string
  landingHero1: string
  landingHero2: string
  landingSubtitle1: string
  landingSubtitle2: string
  landingCta: string
  landingLibrary: string
  landingHowTitle: string
  landingHowDesc: string
  landingStep1Title: string
  landingStep1Desc: string
  landingStep2Title: string
  landingStep2Desc: string
  landingStep3Title: string
  landingStep3Desc: string
  landingFeaturesTitle: string
  landingFeaturesDesc: string
  landingFeature1Title: string
  landingFeature1Desc: string
  landingFeature2Title: string
  landingFeature2Desc: string
  landingFeature3Title: string
  landingFeature3Desc: string
  landingFeature4Title: string
  landingFeature4Desc: string
  landingPricingTitle: string
  landingPricingDesc: string
  landingFooter: string
  landingNavStart: string
  landingNavTrial: string
  // Library page
  libraryTitle: string
  libraryDesc: string
  // Explorer page
  explorerTitle: string
  explorerDesc: string
  explorerEmptyTitle: string
  explorerEmptyDesc: string
  explorerExploreBtn: string
  explorerRecommended: string
  explorerCount: string
  explorerRefresh: string
  explorerViewVideo: string
  // Synapse page
  synapseTitle: string
  synapseDesc: string
  synapseNeedContent: string
  synapseNeedContentDesc: string
  // Creation Card
  creationExport: string
  creationScript: string
  creationContentType: string
  creationHook: string
  creationCaption: string
  creationDirection: string
  creationEngagement: string
  creationSalesPoints: string
  creationDifficulty: string
  creationPlaceholder: string
  // Feature Request page
  featureRequestTitle: string
  featureRequestDesc: string
  featureRequestNewTitle: string
  featureRequestFormTitle: string
  featureRequestFormTitlePlaceholder: string
  featureRequestFormDesc: string
  featureRequestFormDescPlaceholder: string
  featureRequestFormCategory: string
  featureRequestFormCategoryPlaceholder: string
  featureRequestFormPriority: string
  featureRequestPriorityLow: string
  featureRequestPriorityMedium: string
  featureRequestPriorityHigh: string
  featureRequestSubmit: string
  featureRequestListTitle: string
  featureRequestCategoryAI: string
  featureRequestCategoryAnalysis: string
  featureRequestCategoryCollab: string
  featureRequestCategoryUtility: string
  featureRequestCategoryUIUX: string
  featureRequestCategoryOther: string
  // Subscribe page
  subscribeTitle: string
  subscribeDesc: string
  subscribeRecommended: string
  subscribeFree: string
  subscribeFreeBtn: string
  subscribeBtn: string
  subscribeMonth: string
  subscribeBackToPlans: string
  subscribePaymentInfo: string
  subscribeCardName: string
  subscribeCardNumber: string
  subscribeExpiry: string
  subscribeCVC: string
  subscribeReferralCode: string
  subscribeReferralPlaceholder: string
  subscribeReferralDesc: string
  subscribeProcessing: string
  subscribePayBtn: string
  subscribeStartFree: string
  // Pricing plan names/descriptions
  planStarterName: string
  planCreatorName: string
  planProName: string
  planStarterDesc: string
  planCreatorDesc: string
  planProDesc: string
  planStarterCta: string
  planCreatorCta: string
  planProCta: string
  // Pricing features
  planFeatureAnalysis3: string
  planFeatureDNA9: string
  planFeatureLibrary10: string
  planFeatureSynapse: string
  planFeatureAnalysis30: string
  planFeatureDNAAI: string
  planFeatureLibrary1y: string
  planFeatureSynapseAI: string
  planFeatureTrendWeekly: string
  planFeatureExport: string
  planFeatureAnalysis200: string
  planFeatureDNAMultiAI: string
  planFeatureLibrary2y: string
  planFeatureSynapseUnlimited: string
  planFeatureTrendRealtime: string
  planFeatureTeam5: string
  planFeatureAPI: string
  planFeaturePrioritySupport: string
  // Settings page
  settingsTitle: string
  settingsDesc: string
  settingsProfile: string
  settingsName: string
  settingsEmail: string
  settingsSave: string
  settingsCurrentPlan: string
  settingsCurrentPlanDesc: string
  settingsChangePlan: string
  settingsReferralProgram: string
  settingsReferralDescLocked: string
  settingsReferralDescActive: string
  settingsModalTestDev: string
  settingsActivated: string
  settingsLocked: string
  settingsCongratsAmbassador: string
  settingsAnalysisHint: string
  settingsUnlockBtn: string
  settingsMoreAnalysis: string
  settingsMyCode: string
  settingsTotalSignups: string
  settingsTodayNew: string
  settingsAccumulatedReward: string
  settingsSettledReward: string
  settingsSettlementAmount: string
  settingsRequestSettlement: string
  settingsTierStatus: string
  settingsFriendDiscount: string
  settingsReferrerReward: string
  settingsSubscriberStatus: string
  settingsTableId: string
  settingsTableJoinDate: string
  settingsTableStatus: string
  settingsTableReward: string
  settingsStatusActive: string
  settingsStatusCancelled: string
  settingsMonthlyAnalysis: string
  settingsMonthlyAnalysisDesc: string
  settingsUsage: string
  settingsRemainingAnalysis: string
  settingsUsed: string
  settingsMonthlyReset: string
  settingsWelcomeTitle: string
  settingsWelcomeDesc: string
  settingsWelcomeHighlight: string
  settingsAgreeTerms: string
  settingsStartBtn: string
  // Explorer analysis section labels
  explorerContentType: string
  explorerHook: string
  explorerScriptAppeal: string
  explorerCaptionAnalysis: string
  explorerDirection: string
  explorerEngagement: string
  explorerSalesPoints: string
  explorerDifficulty: string
}

// ── Korean (base) ─────────────────────────────────────────────
const ko: TranslationStrings = {
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
  analysisTitle: "DNA 분석",
  analysisDesc: "숏폼 콘텐츠의 URL을 입력하면 9가지 DNA 요소를 분석합니다.",
  analysisPlaceholder: "숏폼 콘텐츠 URL을 붙여넣기 하세요...",
  analysisButton: "분석 시작",
  analysisLoading: "분석 중...",
  analysisPlatform: "플랫폼:",
  analysisSaved: "저장됨",
  analysisSaveToLibrary: "라이브러리에 저장",
  analysisAnalyzing: "콘텐츠 DNA를 분석하고 있습니다...",
  // Landing
  landingBetaBadge: "Beta - 지금 무료로 시작하세요",
  landingHero1: "숏폼 콘텐츠의 DNA를",
  landingHero2: "분석하고 재조합하세요",
  landingSubtitle1: "좋은 예술가는 베끼고, 위대한 예술가는 훔친다.",
  landingSubtitle2: "성공한 콘텐츠의 비밀을 해독하고, 나만의 창작물로 재탄생시키세요.",
  landingCta: "지금 분석 시작하기",
  landingLibrary: "라이브러리 둘러보기",
  landingHowTitle: "어떻게 작동하나요?",
  landingHowDesc: "세 단계로 콘텐츠의 성공 DNA를 해독합니다.",
  landingStep1Title: "URL 입력",
  landingStep1Desc: "분석하고 싶은 숏폼 콘텐츠의 URL을 붙여넣기 하세요.",
  landingStep2Title: "DNA 분석",
  landingStep2Desc: "AI가 콘텐츠를 9가지 차원으로 분석하여 성공 DNA를 추출합니다.",
  landingStep3Title: "재조합 & 창작",
  landingStep3Desc: "분석된 요소들을 조합하여 나만의 새로운 콘텐츠 대본을 설계합니다.",
  landingFeaturesTitle: "핵심 기능",
  landingFeaturesDesc: "콘텐츠 분석부터 재창작까지, 필요한 모든 도구를 제공합니다.",
  landingFeature1Title: "9단계 DNA 분석",
  landingFeature1Desc: "후킹, 스크립트, 캡션, 연출, 인게이지먼트 등 9가지 핵심 요소를 깊이 분석합니다.",
  landingFeature2Title: "시냅스 비교",
  landingFeature2Desc: "두 콘텐츠를 나란히 비교하고 성공 요소를 조합하여 새로운 대본을 만듭니다.",
  landingFeature3Title: "뉴런 라이브러리",
  landingFeature3Desc: "분석한 모든 콘텐츠를 저장하고 언제든 다시 참고할 수 있습니다.",
  landingFeature4Title: "프레임 캐러셀",
  landingFeature4Desc: "영상의 핵심 15프레임을 추출하여 시각적으로 분석할 수 있습니다.",
  landingPricingTitle: "요금제",
  landingPricingDesc: "누구나 시작할 수 있는 무료 플랜부터 프로 플랜까지.",
  landingFooter: "숏폼 콘텐츠 DNA 분석 & 재조합 도구. 2026 DotLink. All rights reserved.",
  landingNavStart: "시작하기",
  landingNavTrial: "무료 체험",
  // Library
  libraryTitle: "라이브러리",
  libraryDesc: "분석된 콘텐츠를 저장하고 관리합니다. 카드를 클릭하면 상세 분석을 볼 수 있습니다.",
  // Explorer
  explorerTitle: "익스플로러",
  explorerDesc: "내가 몰랐던 다양한 콘텐츠 분석을 추천받아보세요",
  explorerEmptyTitle: "새로운 콘텐츠를 발견해 보세요",
  explorerEmptyDesc: "내가 분석하지 않았던 다양한 콘텐츠와 분석 결과를 추천받을 수 있습니다",
  explorerExploreBtn: "탐색하기",
  explorerRecommended: "추천된 콘텐츠 분석",
  explorerCount: "개",
  explorerRefresh: "다시 탐색하기",
  explorerViewVideo: "영상 보러가기",
  // Synapse
  synapseTitle: "시냅스",
  synapseDesc: "두 콘텐츠를 비교 분석하고 새로운 콘텐츠를 설계하세요.",
  synapseNeedContent: "분석된 콘텐츠가 필요합니다",
  synapseNeedContentDesc: "먼저 라이브러리에서 카드를 선택하거나 콘텐츠를 분석해주세요.",
  // Creation Card
  creationExport: "내보내기",
  creationScript: "전체 스크립트(대본)",
  creationContentType: "콘텐츠 유형",
  creationHook: "후킹 매력 요소",
  creationCaption: "캡션 분석",
  creationDirection: "연출 요소",
  creationEngagement: "인게이지먼트 장치",
  creationSalesPoints: "세일즈 포인트",
  creationDifficulty: "제작 난이도 메모",
  creationPlaceholder: "을(를) 작성하세요...",
  // Feature Request
  featureRequestTitle: "기능 요청",
  featureRequestDesc: "DotLink에 추가되었으면 하는 기능을 제안해주세요.",
  featureRequestNewTitle: "새로운 기능 제안하기",
  featureRequestFormTitle: "제목",
  featureRequestFormTitlePlaceholder: "원하는 기능의 제목을 입력하세요",
  featureRequestFormDesc: "설명",
  featureRequestFormDescPlaceholder: "기능에 대해 자세히 설명해주세요",
  featureRequestFormCategory: "카테고리",
  featureRequestFormCategoryPlaceholder: "카테고리 선택",
  featureRequestFormPriority: "우선순위",
  featureRequestPriorityLow: "낮음",
  featureRequestPriorityMedium: "보통",
  featureRequestPriorityHigh: "높음",
  featureRequestSubmit: "제출하기",
  featureRequestListTitle: "제안된 기능",
  featureRequestCategoryAI: "AI 기능",
  featureRequestCategoryAnalysis: "분석",
  featureRequestCategoryCollab: "협업",
  featureRequestCategoryUtility: "유틸리티",
  featureRequestCategoryUIUX: "UI/UX",
  featureRequestCategoryOther: "기타",
  // Subscribe
  subscribeTitle: "구독",
  subscribeDesc: "나에게 맞는 플랜을 선택하고 콘텐츠 분석을 시작하세요.",
  subscribeRecommended: "추천",
  subscribeFree: "무료",
  subscribeFreeBtn: "무료로 시작하기",
  subscribeBtn: "구독하기",
  subscribeMonth: "월",
  subscribeBackToPlans: "플랜 선택으로 돌아가기",
  subscribePaymentInfo: "결제 정보",
  subscribeCardName: "카드 소유자 이름",
  subscribeCardNumber: "카드 번호",
  subscribeExpiry: "유효기간",
  subscribeCVC: "CVC",
  subscribeReferralCode: "추천인 코드",
  subscribeReferralPlaceholder: "추천인 코드를 입력하세요 (선택사항)",
  subscribeReferralDesc: "추천인 코드를 입력하면 첫 달 20% 할인이 적용됩니다.",
  subscribeProcessing: "결제 처리 중...",
  subscribePayBtn: "결제하기",
  subscribeStartFree: "무료 플랜 시작하기",
  // Plan names
  planStarterName: "스타터",
  planCreatorName: "크리에이터",
  planProName: "프로",
  planStarterDesc: "숏폼 분석을 처음 시작하는 분들을 위한 플랜",
  planCreatorDesc: "본격적으로 콘텐츠를 제작하는 크리에이터를 위한 플랜",
  planProDesc: "팀과 에이전시를 위한 전문 플랜",
  planStarterCta: "무료로 시작하기",
  planCreatorCta: "크리에이터 시작하기",
  planProCta: "프로 시작하기",
  // Plan features
  planFeatureAnalysis3: "월 3회 콘텐츠 분석",
  planFeatureDNA9: "기본 9단계 DNA 분석",
  planFeatureLibrary10: "라이브러리 저장 (최대 10개)",
  planFeatureSynapse: "시냅스 비교 기능",
  planFeatureAnalysis30: "월 30회 콘텐츠 분석",
  planFeatureDNAAI: "고급 DNA 분석 + AI 인사이트",
  planFeatureLibrary1y: "무제한 1년 라이브러리 저장",
  planFeatureSynapseAI: "시냅스 AI 재조합 대본",
  planFeatureTrendWeekly: "트렌드 리포트 (주간)",
  planFeatureExport: "내보내기 기능",
  planFeatureAnalysis200: "월 200회 콘텐츠 분석",
  planFeatureDNAMultiAI: "최고급 DNA 분석 + 멀티 AI",
  planFeatureLibrary2y: "무제한 2년 라이브러리 저장",
  planFeatureSynapseUnlimited: "시냅스 AI 재조합 대본 (무제한)",
  planFeatureTrendRealtime: "실시간 트렌드 대시보드",
  planFeatureTeam5: "팀 협업 (최대 5명)",
  planFeatureAPI: "API 접근",
  planFeaturePrioritySupport: "우선 고객 지원",
  // Settings
  settingsTitle: "설정",
  settingsDesc: "내 계정 정보와 구독 상태를 확인하세요.",
  settingsProfile: "프로필",
  settingsName: "이름",
  settingsEmail: "이메일",
  settingsSave: "저장",
  settingsCurrentPlan: "현재 구독",
  settingsCurrentPlanDesc: "현재 이용 중인 플랜 정보입니다.",
  settingsChangePlan: "플랜 변경",
  settingsReferralProgram: "추천인 프로그램",
  settingsReferralDescLocked: "분석 기능을 10회 이상 사용하면 앰버서더 프로그램에 참여할 수 있습니다.",
  settingsReferralDescActive: "추천인 대시보드에서 리워드를 관리하세요.",
  settingsModalTestDev: "모달 테스트(DEV)",
  settingsActivated: "활성화",
  settingsLocked: "잠금",
  settingsCongratsAmbassador: "축하합니다! 앰버서더 자격을 획득하셨습니다.",
  settingsAnalysisHint: "분석 기능을 {count}회 이상 사용한 '찐팬'에게만 주어지는 특별한 혜택!",
  settingsUnlockBtn: "추천인 코드 확인하기",
  settingsMoreAnalysis: "{count}회 더 분석하면 열립니다",
  settingsMyCode: "내 추천 코드",
  settingsTotalSignups: "총 가입자",
  settingsTodayNew: "오늘 신규",
  settingsAccumulatedReward: "누적 리워드",
  settingsSettledReward: "정산 완료",
  settingsSettlementAmount: "정산 가능 금액",
  settingsRequestSettlement: "정산 신청하기",
  settingsTierStatus: "등급 현황",
  settingsFriendDiscount: "친구 할인",
  settingsReferrerReward: "추천인 적립",
  settingsSubscriberStatus: "가입자 현황",
  settingsTableId: "아이디",
  settingsTableJoinDate: "가입일",
  settingsTableStatus: "상태",
  settingsTableReward: "리워드",
  settingsStatusActive: "유지",
  settingsStatusCancelled: "해지",
  settingsMonthlyAnalysis: "월 분석 횟수",
  settingsMonthlyAnalysisDesc: "이번 달 사용량을 확인하세요.",
  settingsUsage: "사용량",
  settingsRemainingAnalysis: "남은 분석 횟수",
  settingsUsed: "사용",
  settingsMonthlyReset: "매월 1일에 분석 횟수가 초기화됩니다.",
  settingsWelcomeTitle: "DotLink 앰버서더가 되신 것을 환영합니다!",
  settingsWelcomeDesc: "추천인 프로그램의 조건을 확인하고 시작하세요.",
  settingsWelcomeHighlight: "가장 강력한 혜택: 친구가 정기 결제를 유지하는 한, 매월 평생 리워드가 누적됩니다!",
  settingsAgreeTerms: "리워드 지급 조건 및 어뷰징 정책에 동의합니다.",
  settingsStartBtn: "시작하기",
  // Explorer analysis labels
  explorerContentType: "콘텐츠 유형",
  explorerHook: "후킹 매력 요소",
  explorerScriptAppeal: "스크립트 매력 요소",
  explorerCaptionAnalysis: "캡션 분석",
  explorerDirection: "연출 요소",
  explorerEngagement: "인게이지먼트 장치",
  explorerSalesPoints: "세일즈 포인트",
  explorerDifficulty: "제작 난이도",
}

// ── English ───────────────────────────────────────────────────
const en: TranslationStrings = {
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
  analysisTitle: "DNA Analysis",
  analysisDesc: "Enter a short-form content URL to analyze 9 DNA elements.",
  analysisPlaceholder: "Paste a short-form content URL...",
  analysisButton: "Start Analysis",
  analysisLoading: "Analyzing...",
  analysisPlatform: "Platform:",
  analysisSaved: "Saved",
  analysisSaveToLibrary: "Save to Library",
  analysisAnalyzing: "Analyzing content DNA...",
  // Landing
  landingBetaBadge: "Beta - Start free today",
  landingHero1: "Analyze and recombine",
  landingHero2: "short-form content DNA",
  landingSubtitle1: "Good artists copy, great artists steal.",
  landingSubtitle2: "Decode the secrets of successful content and recreate them as your own.",
  landingCta: "Start Analyzing Now",
  landingLibrary: "Browse Library",
  landingHowTitle: "How does it work?",
  landingHowDesc: "Decode the success DNA of content in three steps.",
  landingStep1Title: "Enter URL",
  landingStep1Desc: "Paste the URL of the short-form content you want to analyze.",
  landingStep2Title: "DNA Analysis",
  landingStep2Desc: "AI analyzes the content across 9 dimensions to extract success DNA.",
  landingStep3Title: "Recombine & Create",
  landingStep3Desc: "Combine analyzed elements to design your own new content script.",
  landingFeaturesTitle: "Core Features",
  landingFeaturesDesc: "All the tools you need, from content analysis to recreation.",
  landingFeature1Title: "9-Step DNA Analysis",
  landingFeature1Desc: "Deep analysis of 9 key elements including hooks, scripts, captions, and engagement.",
  landingFeature2Title: "Synapse Comparison",
  landingFeature2Desc: "Compare two contents side by side and combine success factors into a new script.",
  landingFeature3Title: "Neuron Library",
  landingFeature3Desc: "Save all analyzed content and reference them anytime.",
  landingFeature4Title: "Frame Carousel",
  landingFeature4Desc: "Extract and visually analyze the key 15 frames of a video.",
  landingPricingTitle: "Pricing",
  landingPricingDesc: "From free plans for everyone to professional plans.",
  landingFooter: "Short-form Content DNA Analysis & Recombination Tool. 2026 DotLink. All rights reserved.",
  landingNavStart: "Get Started",
  landingNavTrial: "Free Trial",
  // Library
  libraryTitle: "Library",
  libraryDesc: "Save and manage analyzed content. Click a card to view detailed analysis.",
  // Explorer
  explorerTitle: "Explorer",
  explorerDesc: "Discover content analyses you haven't seen before",
  explorerEmptyTitle: "Discover new content",
  explorerEmptyDesc: "Get recommendations for diverse content and analyses you haven't explored",
  explorerExploreBtn: "Explore",
  explorerRecommended: "Recommended content analyses",
  explorerCount: "",
  explorerRefresh: "Explore Again",
  explorerViewVideo: "Watch Video",
  // Synapse
  synapseTitle: "Synapse",
  synapseDesc: "Compare and analyze two contents to design new content.",
  synapseNeedContent: "Analyzed content required",
  synapseNeedContentDesc: "Please select a card from the library or analyze content first.",
  // Creation Card
  creationExport: "Export",
  creationScript: "Full Script",
  creationContentType: "Content Type",
  creationHook: "Hook Elements",
  creationCaption: "Caption Analysis",
  creationDirection: "Direction Elements",
  creationEngagement: "Engagement Devices",
  creationSalesPoints: "Sales Points",
  creationDifficulty: "Difficulty Notes",
  creationPlaceholder: "Write here...",
  // Feature Request
  featureRequestTitle: "Feature Request",
  featureRequestDesc: "Suggest features you'd like to see added to DotLink.",
  featureRequestNewTitle: "Suggest a New Feature",
  featureRequestFormTitle: "Title",
  featureRequestFormTitlePlaceholder: "Enter the title of the feature you want",
  featureRequestFormDesc: "Description",
  featureRequestFormDescPlaceholder: "Describe the feature in detail",
  featureRequestFormCategory: "Category",
  featureRequestFormCategoryPlaceholder: "Select category",
  featureRequestFormPriority: "Priority",
  featureRequestPriorityLow: "Low",
  featureRequestPriorityMedium: "Medium",
  featureRequestPriorityHigh: "High",
  featureRequestSubmit: "Submit",
  featureRequestListTitle: "Suggested Features",
  featureRequestCategoryAI: "AI Features",
  featureRequestCategoryAnalysis: "Analysis",
  featureRequestCategoryCollab: "Collaboration",
  featureRequestCategoryUtility: "Utility",
  featureRequestCategoryUIUX: "UI/UX",
  featureRequestCategoryOther: "Other",
  // Subscribe
  subscribeTitle: "Subscribe",
  subscribeDesc: "Choose a plan that fits your needs and start analyzing content.",
  subscribeRecommended: "Recommended",
  subscribeFree: "Free",
  subscribeFreeBtn: "Start for Free",
  subscribeBtn: "Subscribe",
  subscribeMonth: "mo",
  subscribeBackToPlans: "Back to Plans",
  subscribePaymentInfo: "Payment Information",
  subscribeCardName: "Cardholder Name",
  subscribeCardNumber: "Card Number",
  subscribeExpiry: "Expiry",
  subscribeCVC: "CVC",
  subscribeReferralCode: "Referral Code",
  subscribeReferralPlaceholder: "Enter referral code (optional)",
  subscribeReferralDesc: "Get 20% off your first month with a referral code.",
  subscribeProcessing: "Processing payment...",
  subscribePayBtn: "Pay",
  subscribeStartFree: "Start Free Plan",
  // Plan names
  planStarterName: "Starter",
  planCreatorName: "Creator",
  planProName: "Pro",
  planStarterDesc: "For those just starting short-form analysis",
  planCreatorDesc: "For creators actively producing content",
  planProDesc: "Professional plan for teams and agencies",
  planStarterCta: "Start for Free",
  planCreatorCta: "Start as Creator",
  planProCta: "Start as Pro",
  // Plan features
  planFeatureAnalysis3: "3 content analyses/month",
  planFeatureDNA9: "Basic 9-step DNA analysis",
  planFeatureLibrary10: "Library storage (up to 10)",
  planFeatureSynapse: "Synapse comparison",
  planFeatureAnalysis30: "30 content analyses/month",
  planFeatureDNAAI: "Advanced DNA analysis + AI insights",
  planFeatureLibrary1y: "Unlimited 1-year library storage",
  planFeatureSynapseAI: "Synapse AI recombination scripts",
  planFeatureTrendWeekly: "Weekly trend reports",
  planFeatureExport: "Export feature",
  planFeatureAnalysis200: "200 content analyses/month",
  planFeatureDNAMultiAI: "Premium DNA analysis + Multi AI",
  planFeatureLibrary2y: "Unlimited 2-year library storage",
  planFeatureSynapseUnlimited: "Synapse AI scripts (unlimited)",
  planFeatureTrendRealtime: "Real-time trend dashboard",
  planFeatureTeam5: "Team collaboration (up to 5)",
  planFeatureAPI: "API access",
  planFeaturePrioritySupport: "Priority customer support",
  // Settings
  settingsTitle: "Settings",
  settingsDesc: "Check your account info and subscription status.",
  settingsProfile: "Profile",
  settingsName: "Name",
  settingsEmail: "Email",
  settingsSave: "Save",
  settingsCurrentPlan: "Current Subscription",
  settingsCurrentPlanDesc: "Your current plan information.",
  settingsChangePlan: "Change Plan",
  settingsReferralProgram: "Referral Program",
  settingsReferralDescLocked: "Use the analysis feature 10+ times to join the Ambassador program.",
  settingsReferralDescActive: "Manage your rewards in the referral dashboard.",
  settingsModalTestDev: "Modal Test (DEV)",
  settingsActivated: "Active",
  settingsLocked: "Locked",
  settingsCongratsAmbassador: "Congratulations! You've earned Ambassador status.",
  settingsAnalysisHint: "A special benefit only for true fans who've used analysis {count}+ times!",
  settingsUnlockBtn: "View Referral Code",
  settingsMoreAnalysis: "Unlocks after {count} more analyses",
  settingsMyCode: "My Referral Code",
  settingsTotalSignups: "Total Signups",
  settingsTodayNew: "Today New",
  settingsAccumulatedReward: "Accumulated Rewards",
  settingsSettledReward: "Settled",
  settingsSettlementAmount: "Available for Settlement",
  settingsRequestSettlement: "Request Settlement",
  settingsTierStatus: "Tier Status",
  settingsFriendDiscount: "Friend Discount",
  settingsReferrerReward: "Referrer Reward",
  settingsSubscriberStatus: "Subscriber Status",
  settingsTableId: "ID",
  settingsTableJoinDate: "Join Date",
  settingsTableStatus: "Status",
  settingsTableReward: "Reward",
  settingsStatusActive: "Active",
  settingsStatusCancelled: "Cancelled",
  settingsMonthlyAnalysis: "Monthly Analyses",
  settingsMonthlyAnalysisDesc: "Check this month's usage.",
  settingsUsage: "Usage",
  settingsRemainingAnalysis: "Remaining Analyses",
  settingsUsed: "used",
  settingsMonthlyReset: "Analysis count resets on the 1st of each month.",
  settingsWelcomeTitle: "Welcome to the DotLink Ambassador Program!",
  settingsWelcomeDesc: "Review the referral program terms and get started.",
  settingsWelcomeHighlight: "Top benefit: As long as your friend maintains their subscription, you earn monthly rewards for life!",
  settingsAgreeTerms: "I agree to the reward payment terms and abuse policy.",
  settingsStartBtn: "Get Started",
  // Explorer analysis labels
  explorerContentType: "Content Type",
  explorerHook: "Hook Elements",
  explorerScriptAppeal: "Script Appeal",
  explorerCaptionAnalysis: "Caption Analysis",
  explorerDirection: "Direction",
  explorerEngagement: "Engagement Devices",
  explorerSalesPoints: "Sales Points",
  explorerDifficulty: "Production Difficulty",
}

// ── Partial overrides for other languages (sidebar/modal keys) ──
// All other languages inherit from English for the new page-content keys
const jaBase: Partial<TranslationStrings> = {
  menu: "メニュー", home: "ホーム", analysis: "分析", library: "ライブラリ", synapse: "シナプス",
  explorer: "エクスプローラー", featureRequest: "機能リクエスト", subscribe: "サブスクリプション",
  settings: "設定", gnbTitle: "DotLink", langModalTranslation: "翻訳",
  langModalTranslationDesc: "コンテンツのスクリプトを自動的に母国語に翻訳します。",
  langModalRecommended: "おすすめの言語と地域", langModalChoose: "言語と地域を選択してください",
  analysisTitle: "DNA分析", analysisDesc: "ショートコンテンツのURLを入力すると9つのDNA要素を分析します。",
  analysisPlaceholder: "ショートコンテンツのURLを貼り付けてください...", analysisButton: "分析開始",
  analysisLoading: "分析中...", analysisPlatform: "プラットフォーム:", analysisSaved: "保存済み",
  analysisSaveToLibrary: "ライブラリに保存", analysisAnalyzing: "コンテンツDNAを分析しています...",
}
const esBase: Partial<TranslationStrings> = {
  menu: "Menú", home: "Inicio", analysis: "Análisis", library: "Biblioteca", synapse: "Sinapsis",
  explorer: "Explorador", featureRequest: "Solicitud", subscribe: "Suscripción", settings: "Ajustes",
  gnbTitle: "DotLink", langModalTranslation: "Traducción",
  langModalTranslationDesc: "Traduce automáticamente los scripts de contenido a tu idioma.",
  langModalRecommended: "Idiomas y regiones sugeridos", langModalChoose: "Elige un idioma y región",
  analysisTitle: "Análisis de ADN", analysisDesc: "Ingresa la URL del contenido corto para analizar 9 elementos de ADN.",
  analysisPlaceholder: "Pega la URL del contenido corto...", analysisButton: "Iniciar análisis",
  analysisLoading: "Analizando...", analysisPlatform: "Plataforma:", analysisSaved: "Guardado",
  analysisSaveToLibrary: "Guardar en biblioteca", analysisAnalyzing: "Analizando el ADN del contenido...",
}
const frBase: Partial<TranslationStrings> = {
  menu: "Menu", home: "Accueil", analysis: "Analyse", library: "Bibliothèque", synapse: "Synapse",
  explorer: "Explorateur", featureRequest: "Demande", subscribe: "Abonnement", settings: "Paramètres",
  gnbTitle: "DotLink", langModalTranslation: "Traduction",
  langModalTranslationDesc: "Traduit automatiquement les scripts de contenu dans votre langue.",
  langModalRecommended: "Langues et régions suggérées", langModalChoose: "Choisissez une langue et une région",
  analysisTitle: "Analyse ADN", analysisDesc: "Entrez l'URL du contenu court pour analyser 9 éléments ADN.",
  analysisPlaceholder: "Collez l'URL du contenu court...", analysisButton: "Lancer l'analyse",
  analysisLoading: "Analyse...", analysisPlatform: "Plateforme :", analysisSaved: "Enregistré",
  analysisSaveToLibrary: "Enregistrer", analysisAnalyzing: "Analyse de l'ADN du contenu...",
}
const deBase: Partial<TranslationStrings> = {
  menu: "Menü", home: "Startseite", analysis: "Analyse", library: "Bibliothek", synapse: "Synapse",
  explorer: "Explorer", featureRequest: "Anfrage", subscribe: "Abonnement", settings: "Einstellungen",
  gnbTitle: "DotLink", langModalTranslation: "Übersetzung",
  langModalTranslationDesc: "Übersetzt Inhaltsskripte automatisch in Ihre Sprache.",
  langModalRecommended: "Vorgeschlagene Sprachen und Regionen", langModalChoose: "Wählen Sie eine Sprache und Region",
  analysisTitle: "DNA-Analyse", analysisDesc: "Geben Sie die URL des Kurzinhalts ein, um 9 DNA-Elemente zu analysieren.",
  analysisPlaceholder: "Kurzinhalt-URL einfügen...", analysisButton: "Analyse starten",
  analysisLoading: "Analyse...", analysisPlatform: "Plattform:", analysisSaved: "Gespeichert",
  analysisSaveToLibrary: "Speichern", analysisAnalyzing: "Inhalt-DNA wird analysiert...",
}
const zhCNBase: Partial<TranslationStrings> = {
  menu: "菜单", home: "首页", analysis: "分析", library: "资料库", synapse: "突触",
  explorer: "探索", featureRequest: "功能请求", subscribe: "订阅", settings: "设置",
  gnbTitle: "DotLink", langModalTranslation: "翻译",
  langModalTranslationDesc: "自动将内容脚本翻译成您的语言。",
  langModalRecommended: "推荐语言和地区", langModalChoose: "选择语言和地区",
  analysisTitle: "DNA分析", analysisDesc: "输入短视频URL，分析9种DNA要素。",
  analysisPlaceholder: "粘贴短视频URL...", analysisButton: "开始分析",
  analysisLoading: "分析中...", analysisPlatform: "平台：", analysisSaved: "已保存",
  analysisSaveToLibrary: "保存到资料库", analysisAnalyzing: "正在分析内容DNA...",
}
const zhTWBase: Partial<TranslationStrings> = {
  menu: "選單", home: "首頁", analysis: "分析", library: "資料庫", synapse: "突觸",
  explorer: "探索", featureRequest: "功能請求", subscribe: "訂閱", settings: "設定",
  gnbTitle: "DotLink", langModalTranslation: "翻譯",
  langModalTranslationDesc: "自動將內容腳本翻譯成您的語言。",
  langModalRecommended: "推薦語言和地區", langModalChoose: "選擇語言和地區",
  analysisTitle: "DNA分析", analysisDesc: "輸入短影音URL，分析9種DNA要素。",
  analysisPlaceholder: "貼上短影音URL...", analysisButton: "開始分析",
  analysisLoading: "分析中...", analysisPlatform: "平台：", analysisSaved: "已儲存",
  analysisSaveToLibrary: "儲存到資料庫", analysisAnalyzing: "正在分析內容DNA...",
}
const ptBase: Partial<TranslationStrings> = {
  menu: "Menu", home: "Início", analysis: "Análise", library: "Biblioteca", synapse: "Sinapse",
  explorer: "Explorador", featureRequest: "Solicitação", subscribe: "Assinatura", settings: "Configurações",
  gnbTitle: "DotLink", langModalTranslation: "Tradução",
  langModalTranslationDesc: "Traduz automaticamente os scripts de conteúdo para o seu idioma.",
  langModalRecommended: "Idiomas e regiões sugeridos", langModalChoose: "Escolha um idioma e região",
}
const itBase: Partial<TranslationStrings> = {
  menu: "Menu", home: "Home", analysis: "Analisi", library: "Libreria", synapse: "Sinapsi",
  explorer: "Esploratore", featureRequest: "Richiesta", subscribe: "Abbonamento", settings: "Impostazioni",
  gnbTitle: "DotLink", langModalTranslation: "Traduzione",
  langModalTranslationDesc: "Traduce automaticamente gli script dei contenuti nella tua lingua.",
  langModalRecommended: "Lingue e regioni suggerite", langModalChoose: "Scegli una lingua e una regione",
}
const viBase: Partial<TranslationStrings> = {
  menu: "Menu", home: "Trang chủ", analysis: "Phân tích", library: "Thư viện", synapse: "Synapse",
  explorer: "Khám phá", featureRequest: "Yêu cầu", subscribe: "Đăng ký", settings: "Cài đặt",
  gnbTitle: "DotLink", langModalTranslation: "Dịch thuật",
  langModalTranslationDesc: "Tự động dịch nội dung sang ngôn ngữ của bạn.",
  langModalRecommended: "Ngôn ngữ và khu vực đề xuất", langModalChoose: "Chọn ngôn ngữ và khu vực",
}
const thBase: Partial<TranslationStrings> = {
  menu: "เมนู", home: "หน้าหลัก", analysis: "วิเคราะห์", library: "ไลบรารี", synapse: "ไซแนปส์",
  explorer: "สำรวจ", featureRequest: "คำขอ", subscribe: "สมัครสมาชิก", settings: "ตั้งค่า",
  gnbTitle: "DotLink", langModalTranslation: "การแปล",
  langModalTranslationDesc: "แปลสคริปต์เนื้อหาเป็นภาษาของคุณโดยอัตโนมัติ",
  langModalRecommended: "ภาษาและภูมิภาคที่แนะนำ", langModalChoose: "เลือกภาษาและภูมิภาค",
}
const ruBase: Partial<TranslationStrings> = {
  menu: "Меню", home: "Главная", analysis: "Анализ", library: "Библиотека", synapse: "Синапс",
  explorer: "Обзор", featureRequest: "Запрос", subscribe: "Подписка", settings: "Настройки",
  gnbTitle: "DotLink", langModalTranslation: "Перевод",
  langModalTranslationDesc: "Автоматический перевод контента на ваш язык.",
  langModalRecommended: "Рекомендуемые языки и регионы", langModalChoose: "Выберите язык и регион",
}
const arBase: Partial<TranslationStrings> = {
  menu: "القائمة", home: "الرئيسية", analysis: "تحليل", library: "المكتبة", synapse: "سينابس",
  explorer: "استكشاف", featureRequest: "طلب", subscribe: "اشتراك", settings: "الإعدادات",
  gnbTitle: "DotLink", langModalTranslation: "ترجمة",
  langModalTranslationDesc: "ترجمة محتوى النصوص تلقائيًا إلى لغتك.",
  langModalRecommended: "اللغات والمناطق المقترحة", langModalChoose: "اختر لغة ومنطقة",
}
const hiBase: Partial<TranslationStrings> = {
  menu: "मेनू", home: "होम", analysis: "विश्लेषण", library: "लाइब्रेरी", synapse: "सिनैप्स",
  explorer: "एक्सप्लोरर", featureRequest: "अनुरोध", subscribe: "सदस्यता", settings: "सेटिंग्स",
  gnbTitle: "DotLink", langModalTranslation: "अनुवाद",
  langModalTranslationDesc: "सामग्री स्क्रिप्ट को स्वचालित रूप से आपकी भाषा में अनुवाद करें।",
  langModalRecommended: "सुझाई गई भाषाएँ और क्षेत्र", langModalChoose: "भाषा और क्षेत्र चुनें",
}
const trBase: Partial<TranslationStrings> = {
  menu: "Menü", home: "Ana Sayfa", analysis: "Analiz", library: "Kütüphane", synapse: "Sinaps",
  explorer: "Keşfet", featureRequest: "İstek", subscribe: "Abonelik", settings: "Ayarlar",
  gnbTitle: "DotLink", langModalTranslation: "Çeviri",
  langModalTranslationDesc: "İçerik komut dosyalarını otomatik olarak dilinize çevirin.",
  langModalRecommended: "Önerilen diller ve bölgeler", langModalChoose: "Bir dil ve bölge seçin",
}
const nlBase: Partial<TranslationStrings> = {
  menu: "Menu", home: "Home", analysis: "Analyse", library: "Bibliotheek", synapse: "Synaps",
  explorer: "Verkenner", featureRequest: "Verzoek", subscribe: "Abonnement", settings: "Instellingen",
  gnbTitle: "DotLink", langModalTranslation: "Vertaling",
  langModalTranslationDesc: "Vertaal contentscripts automatisch naar uw taal.",
  langModalRecommended: "Voorgestelde talen en regio's", langModalChoose: "Kies een taal en regio",
}
const plBase: Partial<TranslationStrings> = {
  menu: "Menu", home: "Strona główna", analysis: "Analiza", library: "Biblioteka", synapse: "Synapsa",
  explorer: "Eksplorator", featureRequest: "Żądanie", subscribe: "Subskrypcja", settings: "Ustawienia",
  gnbTitle: "DotLink", langModalTranslation: "Tłumaczenie",
  langModalTranslationDesc: "Automatycznie tłumacz skrypty treści na Twój język.",
  langModalRecommended: "Sugerowane języki i regiony", langModalChoose: "Wybierz język i region",
}
const svBase: Partial<TranslationStrings> = {
  menu: "Meny", home: "Hem", analysis: "Analys", library: "Bibliotek", synapse: "Synaps",
  explorer: "Utforskare", featureRequest: "Begäran", subscribe: "Prenumeration", settings: "Inställningar",
  gnbTitle: "DotLink", langModalTranslation: "Översättning",
  langModalTranslationDesc: "Översätt automatiskt innehållsskript till ditt språk.",
  langModalRecommended: "Föreslagna språk och regioner", langModalChoose: "Välj ett språk och region",
}
const idBase: Partial<TranslationStrings> = {
  menu: "Menu", home: "Beranda", analysis: "Analisis", library: "Perpustakaan", synapse: "Sinaps",
  explorer: "Jelajah", featureRequest: "Permintaan", subscribe: "Langganan", settings: "Pengaturan",
  gnbTitle: "DotLink", langModalTranslation: "Terjemahan",
  langModalTranslationDesc: "Terjemahkan skrip konten secara otomatis ke bahasa Anda.",
  langModalRecommended: "Bahasa dan wilayah yang disarankan", langModalChoose: "Pilih bahasa dan wilayah",
}

// Build translations: other languages inherit English defaults, then override with their specific keys
const translations: Record<LocaleCode, TranslationStrings> = {
  ko,
  en,
  ja: { ...en, ...jaBase },
  es: { ...en, ...esBase },
  fr: { ...en, ...frBase },
  de: { ...en, ...deBase },
  "zh-CN": { ...en, ...zhCNBase },
  "zh-TW": { ...en, ...zhTWBase },
  pt: { ...en, ...ptBase },
  it: { ...en, ...itBase },
  vi: { ...en, ...viBase },
  th: { ...en, ...thBase },
  ru: { ...en, ...ruBase },
  ar: { ...en, ...arBase },
  hi: { ...en, ...hiBase },
  tr: { ...en, ...trBase },
  nl: { ...en, ...nlBase },
  pl: { ...en, ...plBase },
  sv: { ...en, ...svBase },
  id: { ...en, ...idBase },
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
