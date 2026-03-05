import type { ContentCard, FeatureRequest } from "./types"

const gradients = [
  "from-blue-600 to-violet-600",
  "from-rose-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-yellow-400",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-fuchsia-500",
]

function generateFrames(seed: number) {
  const frameGradients = [
    "from-slate-700 to-slate-900",
    "from-zinc-700 to-zinc-900",
    "from-neutral-700 to-neutral-800",
    "from-stone-700 to-stone-900",
    "from-gray-700 to-gray-900",
    "from-slate-600 to-zinc-800",
    "from-neutral-600 to-stone-800",
    "from-zinc-600 to-slate-800",
    "from-stone-600 to-neutral-800",
    "from-gray-600 to-zinc-800",
    "from-slate-800 to-neutral-900",
    "from-zinc-800 to-gray-900",
    "from-neutral-800 to-slate-900",
    "from-stone-800 to-zinc-900",
    "from-gray-800 to-stone-900",
  ]
  return frameGradients.map((g, i) => ({
    id: seed * 100 + i,
    gradient: g,
    label: `프레임 ${i + 1}`,
  }))
}

export const mockContentCards: ContentCard[] = [
  {
    id: "card-1",
    title: "30초 만에 완판! 이 립밤의 비밀",
    platform: "instagram",
    url: "https://www.instagram.com/reel/example1",
    thumbnailGradient: gradients[0],
    dateAnalyzed: "2026-02-20",
    frames: generateFrames(1),
    tags: ["뷰티", "제품리뷰", "바이럴"],
    analysis: {
      hookVisual:
        "첫 프레임에서 제품을 클로즈업하며 반짝이는 질감을 강조. 손가락으로 립밤을 바르는 ASMR 스타일의 시각적 요소가 시청자의 감각을 자극합니다. 배경은 미니멀한 파스텔톤으로 제품에 시선이 집중됩니다.",
      hookText:
        "\"이거 하나로 인생 입술 됨\" — 직관적이고 과장된 표현으로 호기심을 유발. 개인 경험을 전달하는 1인칭 서술이 신뢰감을 줍니다.",
      scriptAppeal:
        "문제 제기 → 솔루션 제시 → 결과 증명의 3단 구조. \"건조한 입술 때문에 고민이었는데\" → \"이 립밤 발견하고\" → \"보습력 미쳤다\" 순서로 설득력 있는 스토리를 전개합니다.",
      captionAnalysis:
        "짧고 임팩트 있는 캡션 구성. 해시태그 7개 사용으로 발견성을 높이고, \"저장 필수\" 같은 CTA로 인게이지먼트를 유도합니다.",
      visualDirection:
        "자연광 활용, 클로즈업 위주의 촬영. 색감 보정은 따뜻한 톤으로 통일. 전환은 스무스하게 처리되어 시청 흐름이 끊기지 않습니다.",
      engagementDevices:
        "질문형 자막 (\"너도 써봤어?\"), 댓글 유도 (\"어떤 색상이 최고인지 알려줘\"), 저장 유도 (\"나중에 볼 사람 저장\"). 팔로우 CTA는 마지막에 자연스럽게 삽입.",
      contentType: "제품 리뷰 / 뷰티 바이럴",
      salesPoints:
        "가격 대비 성능(가성비) 강조, 실제 사용 전후 비교로 시각적 증거 제공. 한정 수량 언급으로 희소성 자극.",
      difficulty: { planning: 2, filming: 3, editing: 3 },
    },
  },
  {
    id: "card-2",
    title: "카페 사장님이 알려주는 라떼아트 꿀팁",
    platform: "tiktok",
    url: "https://www.tiktok.com/@example/video/2",
    thumbnailGradient: gradients[1],
    dateAnalyzed: "2026-02-19",
    frames: generateFrames(2),
    tags: ["카페", "라떼아트", "교육"],
    analysis: {
      hookVisual:
        "우유 거품이 커피 위로 부어지는 슬로우 모션 장면으로 시작. 하트 모양이 완성되는 순간의 만족감을 극대화합니다.",
      hookText:
        "\"카페 사장 10년차가 알려주는\" — 전문가 포지셔닝을 통해 콘텐츠의 신뢰도를 높입니다. 숫자(10년)를 활용한 구체적 권위 표현.",
      scriptAppeal:
        "스텝 바이 스텝 튜토리얼 형식. 각 단계를 명확하게 구분하고 실패 사례와 성공 사례를 대비하여 학습 효과를 극대화합니다.",
      captionAnalysis:
        "\"라떼아트 배우고 싶은 사람? 👋\" 으로 타겟 시청자를 명확하게 호출. 댓글에서 다음 영상 주제를 투표하도록 유도합니다.",
      visualDirection:
        "탑다운 앵글 고정 촬영으로 라떼아트 과정을 선명하게 보여줌. 자막은 각 단계에 동기화되어 사운드 없이도 학습 가능합니다.",
      engagementDevices:
        "시리즈 예고 (\"다음 편은 로제타\"), 난이도 표시로 도전 욕구 자극, 듀엣 유도 (\"성공하면 태그해줘\").",
      contentType: "튜토리얼 / 교육 콘텐츠",
      salesPoints:
        "전문 기술의 대중화를 통해 브랜드 친밀도를 높이는 전략. 카페 방문 동기를 간접적으로 부여합니다.",
      difficulty: { planning: 3, filming: 4, editing: 3 },
    },
  },
  {
    id: "card-3",
    title: "월세 50만원 원룸을 호텔처럼 꾸미기",
    platform: "youtube",
    url: "https://www.youtube.com/shorts/example3",
    thumbnailGradient: gradients[2],
    dateAnalyzed: "2026-02-18",
    frames: generateFrames(3),
    tags: ["인테리어", "원룸", "셀프인테리어"],
    analysis: {
      hookVisual:
        "Before/After 비포 앤 애프터 화면 분할로 극적인 변화를 한눈에 보여줍니다. 어둡고 좁아 보이던 원룸이 밝고 세련된 공간으로 변신하는 대비가 강렬합니다.",
      hookText:
        "\"50만원 원룸이 이렇게 변한다고?\" — 금액을 구체적으로 명시하여 타겟 공감대를 형성합니다. 놀라움을 유도하는 의문형 구조.",
      scriptAppeal:
        "제한된 예산과 공간이라는 제약 조건을 명시한 후, 창의적 솔루션을 제시하는 도전형 스토리. 시청자가 \"나도 할 수 있겠다\"는 동기를 느끼도록 설계되었습니다.",
      captionAnalysis:
        "구체적인 제품 리스트와 총 비용을 캡션에 포함하여 실용적 가치를 제공. 제품 링크 유도를 통해 수익화 가능성도 확보합니다.",
      visualDirection:
        "타임랩스로 변화 과정을 압축하고, 완성 후에는 시네마틱한 슬라이딩 샷으로 공간의 넓이감을 강조합니다.",
      engagementDevices:
        "비포 사진 공유 이벤트, 인테리어 고민 상담 댓글 유도, \"어떤 존이 제일 마음에 드는지\" 투표 유도.",
      contentType: "라이프스타일 / 인테리어 변신",
      salesPoints:
        "저예산이라는 진입장벽을 낮추고, 구체적인 아이템 추천으로 제휴 마케팅 연결. 실용적 정보 제공을 통한 신뢰 구축.",
      difficulty: { planning: 4, filming: 4, editing: 5 },
    },
  },
  {
    id: "card-4",
    title: "10초 만에 매출 올리는 릴스 공식",
    platform: "instagram",
    url: "https://www.instagram.com/reel/example4",
    thumbnailGradient: gradients[3],
    dateAnalyzed: "2026-02-17",
    frames: generateFrames(4),
    tags: ["마케팅", "릴스", "비즈니스"],
    analysis: {
      hookVisual:
        "화면에 큰 글씨로 \"매출 3배\" 텍스트가 팝업되며 시작. 숫자와 그래프 애니메이션이 시각적으로 성과를 강조합니다.",
      hookText:
        "\"릴스 하나로 매출 3배 올린 방법\" — 구체적인 결과(3배)를 제시하여 관심을 끌고, 방법론을 약속하여 시청 지속을 유도합니다.",
      scriptAppeal:
        "데이터 기반 설득 구조. 실제 인사이트 데이터를 보여주며 분석 결과를 공유하고, 실행 가능한 3단계 공식을 제시합니다.",
      captionAnalysis:
        "\"사업하는 사람 필독\" 으로 직접적인 타겟 호출. CTA가 명확하고, 프로필 링크로의 유도가 자연스럽습니다.",
      visualDirection:
        "빠른 컷 전환과 텍스트 오버레이 중심의 편집. 말하는 모습과 데이터 화면을 번갈아 보여주어 정보 전달 효율을 높입니다.",
      engagementDevices:
        "무료 가이드 제공 (DM 유도), 업종별 맞춤 조언 댓글 유도, 성공 사례 공유 챌린지.",
      contentType: "비즈니스 / 마케팅 팁",
      salesPoints:
        "무료 가이드 → 유료 컨설팅 퍼널. 전문성을 보여주면서 자연스럽게 서비스로 연결합니다.",
      difficulty: { planning: 3, filming: 2, editing: 4 },
    },
  },
  {
    id: "card-5",
    title: "요즘 MZ세대가 진짜 먹는 건강식",
    platform: "tiktok",
    url: "https://www.tiktok.com/@example/video/5",
    thumbnailGradient: gradients[4],
    dateAnalyzed: "2026-02-16",
    frames: generateFrames(5),
    tags: ["건강", "MZ세대", "푸드"],
    analysis: {
      hookVisual:
        "컬러풀한 식재료들이 도마 위에 하나씩 ��어지는 스톱모션 장면으로 시작. 시각적으로 건강하고 신선한 이미지를 전달합니다.",
      hookText:
        "\"건강식이 맛없다는 편견, 깨드립니다\" — 고정관념을 부정하며 호기심을 유발합니다. 도전적인 톤이 MZ세대의 반응을 이끌어냅니다.",
      scriptAppeal:
        "편견 파괴 → 실제 맛 테스트 → 영양 정보 제공의 흐름. 재미와 정보를 동시에 제공하는 에듀테인먼트 구조입니다.",
      captionAnalysis:
        "\"진짜 맛있는 건강식 레시피 3가지\" 로 구체적인 내용 예고. 숫자를 사용하여 시청 전 기대감을 설정합니다.",
      visualDirection:
        "밝은 자연광, 화이트 배경에서 식재료 컬러가 돋보이는 촬영. ASMR 요소(재료 썰기, 그릇 담기)를 시각적으로 활용합니다.",
      engagementDevices:
        "맛 평가 투표, 레시피 저장 유도, \"내일 아침 이거 먹을 사람?\" 댓글 유도.",
      contentType: "푸드 / 건강 라이프스타일",
      salesPoints:
        "건강식 배달 서비스나 식재료 브랜드와의 제휴 가능성. 레시피 전자책 판매로 확장 가능한 콘텐츠 구조.",
      difficulty: { planning: 2, filming: 3, editing: 4 },
    },
  },
  {
    id: "card-6",
    title: "직장인 퇴근 후 1인 미디어 루틴",
    platform: "youtube",
    url: "https://www.youtube.com/shorts/example6",
    thumbnailGradient: gradients[5],
    dateAnalyzed: "2026-02-15",
    frames: generateFrames(6),
    tags: ["브이로그", "직장인", "크리에이터"],
    analysis: {
      hookVisual:
        "회사에서 퇴근하는 장면에서 시작, 집에 돌아와 촬영 장비를 세팅하는 모습으로 전환. 일상과 크리에이터 생활의 이중 정체성을 보여줍니다.",
      hookText:
        "\"낮에는 직장인, 밤에는 크리에이터\" — 많은 직장인의 꿈을 대변하는 한 줄. 공감과 동경을 동시에 불러일으킵니다.",
      scriptAppeal:
        "하루 루틴 브이로그 형식으로 진입장벽을 낮추면서, 각 단계에서 실용적인 팁을 삽입합니다. \"퇴근 후 2시간으로 영상 1개 완성\"이라는 구체적 목표를 제시합니다.",
      captionAnalysis:
        "직장인 크리에이터 도전기를 시리즈로 운영. 회차 번호를 포함하여 연속 시청을 유도합니다.",
      visualDirection:
        "핸드헬드 촬영으로 리얼리티를 강조하고, 편집 과정을 타임랩스로 보여주어 \"나도 할 수 있다\"는 느낌을 전달합니다.",
      engagementDevices:
        "\"퇴근 후 뭐 하세요?\" 공감 댓글 유도, 장비 리스트 요청 유도, 1인 미디어 도전 챌린지.",
      contentType: "브이로그 / 동기부여",
      salesPoints:
        "장비 리뷰로 확장 가능, 온라인 강의/멘토링 서비스 연결. 직장인 타겟의 시간 관리 콘텐츠로 확장 가능합니다.",
      difficulty: { planning: 2, filming: 2, editing: 3 },
    },
  },
]

export const explorerContentCards: ContentCard[] = [
  {
    id: "explore-1",
    title: "집에서 만드는 프로급 베이글 레시피",
    platform: "youtube",
    url: "https://www.youtube.com/shorts/explore1",
    thumbnailGradient: gradients[2],
    dateAnalyzed: "2026-02-22",
    frames: generateFrames(10),
    tags: ["베이킹", "홈카페", "레시피"],
    analysis: {
      hookVisual:
        "갓 구워져 나온 베이글의 황금빛 크러스트를 클로즈업하며 시작. 김이 모락모락 피어오르는 장면이 시청자의 식욕을 자극합니다.",
      hookText:
        "\"카페 베이글 비싸서 직접 만들어봤는데, 진짜 더 맛있음\" — 가성비 포인트를 정확히 짚어 공감을 유발합니다.",
      scriptAppeal:
        "재료 준비 → 반죽 과정 → 성형 → 굽기 → 완성의 단계별 구성. 실패하기 쉬운 포인트마다 팁을 삽입하여 초보자도 따라 할 수 있게 설계했습니다.",
      captionAnalysis:
        "\"주말 베이킹 챌린지\" 해시태그를 활용한 참여 유도. 완성작 인증을 독려합니다.",
      visualDirection:
        "따뜻한 톤의 자연광 촬영, 손 클로즈업 위주로 편집. 반죽의 질감 변화를 시각적으로 강조합니다.",
      engagementDevices:
        "\"다음에 만들어볼 빵 투표\", 완성작 인증 이벤트, 실패담 공유 유도.",
      contentType: "요리 / 베이킹 튜토리얼",
      salesPoints:
        "베이킹 도구 제휴 링크, 레시피 전자책 판매 가능. 홈카페 트렌드를 타겟팅합니다.",
      difficulty: { planning: 3, filming: 3, editing: 3 },
    },
  },
  {
    id: "explore-2",
    title: "1분 안에 배우는 엑셀 단축키 TOP 10",
    platform: "tiktok",
    url: "https://www.tiktok.com/@example/video/explore2",
    thumbnailGradient: gradients[3],
    dateAnalyzed: "2026-02-21",
    frames: generateFrames(11),
    tags: ["엑셀", "직장인", "생산성"],
    analysis: {
      hookVisual:
        "화면 녹화로 마우스 없이 엑셀을 자유자재로 다루는 장면으로 시작. 빠른 속도감이 \"나도 저렇게 하고 싶다\"는 욕구를 자극합니다.",
      hookText:
        "\"이것만 알면 칼퇴 가능\" — 직장인의 가장 큰 니즈인 퇴근 시간을 직접 언급하여 즉각적인 관심을 끕니다.",
      scriptAppeal:
        "하나의 단축키를 3초 안에 시연하는 반복 구조. 템포가 빨라 지루할 틈이 없고, 숫자(TOP 10)로 완주 동기를 부여합니다.",
      captionAnalysis:
        "\"직장인 생존 스킬\" 해시태그와 함께 저장 유도 CTA를 명확히 배치합니다.",
      visualDirection:
        "깔끔한 화면 녹화에 키 입력 시 시각적 하이라이트 효과 추가. 핵심 단축키 텍스트를 화면 하단에 고정 표시합니다.",
      engagementDevices:
        "\"몰랐던 단축키 댓글로 알려줘\", 시리즈 예고, 저장 유도.",
      contentType: "교육 / 생산성 팁",
      salesPoints:
        "엑셀 온라인 강의 유도, 생산성 도구 제휴. 직장인 타겟 콘텐츠 확장 가능성이 높습니다.",
      difficulty: { planning: 2, filming: 1, editing: 3 },
    },
  },
  {
    id: "explore-3",
    title: "2만원으로 일주일 식비 해결하기",
    platform: "instagram",
    url: "https://www.instagram.com/reel/explore3",
    thumbnailGradient: gradients[0],
    dateAnalyzed: "2026-02-20",
    frames: generateFrames(12),
    tags: ["절약", "자취생", "밀프렙"],
    analysis: {
      hookVisual:
        "2만원 지폐를 카메라 앞에 펼쳐 보여주며 시작. 이후 장보기 → 요리 → 일주일치 도시락 완성까지의 타임랩스가 이어집니다.",
      hookText:
        "\"자취 5년차의 극한 절약 밀프렙\" — 경험 기반 권위와 함께 '극한'이라는 단어가 도전적 재미를 더합니다.",
      scriptAppeal:
        "예산 제시 → 마트 장보기 → 5일치 식단 구성 → 실제 조리의 현실적 플로우. 금액을 실시간으로 차감하며 보여주는 장치가 몰입감을 높입니다.",
      captionAnalysis:
        "상세 레시피와 총 지출 내역을 텍스트로 정리하여 실용적 가치를 극대화합니다.",
      visualDirection:
        "마트 촬영은 핸드헬드, 요리 과정은 고정 탑다운 앵글로 차별화. 완성된 도시락은 정면 촬영으로 정갈하게 보여줍니다.",
      engagementDevices:
        "\"나만의 절약 레시피 공유\" 챌린지, 금액 맞추기 퀴즈, 다음 예산 투표.",
      contentType: "라이프스타일 / 절약 팁",
      salesPoints:
        "밀프렙 용기 제휴, 식재료 정기배송 서비스 연결. 자취생/1인 가구 타겟 시장이 넓습니다.",
      difficulty: { planning: 3, filming: 4, editing: 4 },
    },
  },
  {
    id: "explore-4",
    title: "강아지가 주인을 사랑하는 10가지 신호",
    platform: "tiktok",
    url: "https://www.tiktok.com/@example/video/explore4",
    thumbnailGradient: gradients[4],
    dateAnalyzed: "2026-02-19",
    frames: generateFrames(13),
    tags: ["반려동물", "강아지", "정보"],
    analysis: {
      hookVisual:
        "강아지가 주인의 얼굴을 핥는 귀여운 슬로우 모션으로 시작. 감정적 연결을 즉시 형성합니다.",
      hookText:
        "\"3번은 진짜 몰랐을 걸?\" — 리스티클 형식에 호기심 유발 장치를 추가하여 끝까지 시청하게 만듭니다.",
      scriptAppeal:
        "번호를 매겨가며 하나씩 소개하는 리스티클 구조. 각 신호마다 귀여운 영상 예시를 보여줘 정보와 감동을 동시에 전달합니다.",
      captionAnalysis:
        "\"우리 강아지도 이러는 사람 손 들어\" 로 반려인의 공감을 유도합니다.",
      visualDirection:
        "다양한 견종의 영상 클립을 믹스 편집. 자막은 큰 글씨로 각 신호를 강조하며, 배경음악은 따뜻한 어쿠스틱 기타를 사용합니다.",
      engagementDevices:
        "\"우리 강아지는 몇 개 해당?\" 댓글 유도, 반려동물 영상 듀엣 챌린지.",
      contentType: "반려동물 / 정보 콘텐츠",
      salesPoints:
        "반려동물 용품 브랜드 제휴, 펫 보험 광고 연결. 감성적 콘텐츠로 높은 공유율을 기대할 수 있습니다.",
      difficulty: { planning: 2, filming: 2, editing: 3 },
    },
  },
  {
    id: "explore-5",
    title: "코딩 입문자를 위한 첫 프로젝트 가이드",
    platform: "youtube",
    url: "https://www.youtube.com/shorts/explore5",
    thumbnailGradient: gradients[5],
    dateAnalyzed: "2026-02-18",
    frames: generateFrames(14),
    tags: ["코딩", "입문", "프로젝트"],
    analysis: {
      hookVisual:
        "빈 화면에서 한 줄씩 코드가 타이핑되며 웹사이트가 만들어지는 타임랩스로 시작. 결과물이 점점 완성되어가는 과정이 성취감을 미리 보여줍니다.",
      hookText:
        "\"코딩 1도 모르던 내가 3일 만에 만든 웹사이트\" — 비전공자의 성공 스토리로 진입장벽을 낮추고 도전 의지를 자극합니다.",
      scriptAppeal:
        "환경 설정 → HTML 기초 → CSS 스타일링 → 배포까지의 완결된 워크플로우. 각 단계에서 자주 하는 실수와 해결법을 함께 제시합니다.",
      captionAnalysis:
        "\"코딩 시작하고 싶은 사람 북마크\" 로 저장 유도. 깃허브 링크를 제공하여 실질적 가치를 전달합니다.",
      visualDirection:
        "화면 녹화와 얼굴 캠을 PIP로 구성. 코드 편집기의 다크 테마가 콘텐츠의 전문적 분위기를 조성합니다.",
      engagementDevices:
        "완성작 공유 이벤트, \"다음에 배우고 싶은 언어\" 투표, 코드 리뷰 요청 유도.",
      contentType: "교육 / 코딩 튜토리얼",
      salesPoints:
        "온라인 강의 플랫폼 제휴, 코딩 부트캠프 광고. IT 취업 트렌드와 연결한 확장 콘텐츠 기획이 가능합니다.",
      difficulty: { planning: 4, filming: 2, editing: 4 },
    },
  },
  {
    id: "explore-6",
    title: "여행 짐 싸기: 백패커 미니멀 패킹법",
    platform: "instagram",
    url: "https://www.instagram.com/reel/explore6",
    thumbnailGradient: gradients[1],
    dateAnalyzed: "2026-02-17",
    frames: generateFrames(15),
    tags: ["여행", "패킹", "미니멀"],
    analysis: {
      hookVisual:
        "거대한 짐 더미가 작은 배낭 하나로 압축되는 스톱모션 장면으로 시작. 마법 같은 시각 효과가 호기심을 자극합니다.",
      hookText:
        "\"20개국 다녀온 배낭여행러의 패킹 비법\" — 풍부한 경험치를 숫자로 보여주며 전문성을 증명합니다.",
      scriptAppeal:
        "카테고리별(의류/세면/전자기기) 패킹 기술을 순서대로 시연. 각 아이템의 다용도 활용법까지 공유하여 실용성을 극대화합니다.",
      captionAnalysis:
        "전체 아이템 체크리스트를 캡션으로 정리하여 여행 준비 시 바로 참고할 수 있도록 구성합니다.",
      visualDirection:
        "위에서 내려다보는 탑다운 앵글로 패킹 과정을 선명하게 촬영. 접기 기술은 슬로우 모션으로 디테일을 보여줍니다.",
      engagementDevices:
        "\"내 패킹 필수템 공유\" 댓글 유도, 여행지 추천 투표, 패킹 챌린지.",
      contentType: "여행 / 라이프핵",
      salesPoints:
        "여행 용품 제휴(압축팩, 다용도 파우치 등), 여행 보험 광고. 시즌별 반복 소비되는 에버그린 콘텐츠입니다.",
      difficulty: { planning: 3, filming: 3, editing: 3 },
    },
  },
  {
    id: "explore-7",
    title: "3분 스트레칭으로 거북목 교정하기",
    platform: "tiktok",
    url: "https://www.tiktok.com/@example/video/explore7",
    thumbnailGradient: gradients[2],
    dateAnalyzed: "2026-02-16",
    frames: generateFrames(16),
    tags: ["건강", "스트레칭", "자세교정"],
    analysis: {
      hookVisual:
        "비포/애프터 X-ray 스타일 그래픽으로 거북목 자세와 교정된 자세를 대비합니다. 의학적 시각 자료가 신뢰도를 높입니다.",
      hookText:
        "\"하루 3분이면 거북목 탈출\" — 짧은 시간 투자로 큰 효과를 약속하여 실행 동기를 부여합니다.",
      scriptAppeal:
        "문제 인식(거북목 자가 진단) → 원인 설명 → 3가지 스트레칭 시연 → 효과 설명의 논리적 구조입니다.",
      captionAnalysis:
        "\"앉아서 일하는 사람 필수 저장\" 으로 직장인/학생 타겟의 저장 유도를 합니다.",
      visualDirection:
        "깔끔한 흰 배경에서 전신 촬영. 올바른 자세와 잘못된 자세를 화면 분할로 동시에 보여줍니다.",
      engagementDevices:
        "7일 챌린지 참여 유도, 변화 후기 댓글 독려, 알림 설정 유도.",
      contentType: "건강 / 운동 튜토리얼",
      salesPoints:
        "자세 교정 기구 제휴, 필라테스/요가 클래스 연결. 직장인 타겟 시장에서 꾸준한 수요가 있습니다.",
      difficulty: { planning: 2, filming: 2, editing: 2 },
    },
  },
  {
    id: "explore-8",
    title: "감성 브이로그 영상미의 비밀",
    platform: "youtube",
    url: "https://www.youtube.com/shorts/explore8",
    thumbnailGradient: gradients[0],
    dateAnalyzed: "2026-02-15",
    frames: generateFrames(17),
    tags: ["브이로그", "촬영팁", "영상편집"],
    analysis: {
      hookVisual:
        "감성적인 시네마틱 영상 클립 모음으로 시작. 부드러운 색감 보정과 슬로우 모션이 영화 같은 분위기를 연출합니다.",
      hookText:
        "\"폰으로 찍어도 영화 같은 영상 만드는 법\" — 장비 진입장벽을 낮추면서 퀄리티를 약속하여 폭넓은 관심을 끕니다.",
      scriptAppeal:
        "조명 활용 → 구도 잡기 → 색감 보정 → BGM 선택의 4단계 공식. 각 단계를 비포/애프터로 비교하여 효과를 명확히 보여줍니다.",
      captionAnalysis:
        "사용한 앱, 필터, BGM 리스트를 상세히 기재하여 즉시 적용 가능한 실용 정보를 제공합니다.",
      visualDirection:
        "설명 파트는 미니멀한 화면, 예시 파트는 풀 시네마틱으로 대비 효과를 줍니다.",
      engagementDevices:
        "\"이 필터로 찍은 영상 태그해줘\" 챌린지, 편집 전후 비교 공유 유도.",
      contentType: "크리에이터 교육 / 촬영 팁",
      salesPoints:
        "영상 편집 앱 제휴, 프리셋 판매, 온라인 촬영 클래스 연결. 크리에이터 지망생 시장을 타겟합니다.",
      difficulty: { planning: 3, filming: 4, editing: 5 },
    },
  },
  {
    id: "explore-9",
    title: "수학 공포증 극복! 미적분 30초 요약",
    platform: "tiktok",
    url: "https://www.tiktok.com/@example/video/explore9",
    thumbnailGradient: gradients[3],
    dateAnalyzed: "2026-02-14",
    frames: generateFrames(18),
    tags: ["수학", "교육", "수능"],
    analysis: {
      hookVisual:
        "칠판에 복잡한 수식을 휘갈겨 쓴 후 지우개로 싹 지우고, 핵심 공식 하나만 크게 쓰는 장면으로 시작. 복잡함 → 단순함의 대비가 핵심 메시지를 전달합니다.",
      hookText:
        "\"수포자도 이해하는 미적분\" — 가장 극단적인 타겟(수포자)도 가능하다는 메시지로 진입장벽을 완전히 제거합니다.",
      scriptAppeal:
        "일상 비유(자동차 속도계)로 개념을 먼저 설명한 후, 수식으로 연결하는 구조. 추상적 개념을 구체적 경험으로 변환합니다.",
      captionAnalysis:
        "\"시험 전에 보면 딱인 영상\" 으로 시의적절한 저장 유도. 시리즈 번호를 포함합니다.",
      visualDirection:
        "태블릿 필기 화면 녹화 + 얼굴 캠 PIP 구성. 컬러 코딩으로 수식의 각 부분을 직관적으로 구분합니다.",
      engagementDevices:
        "\"다음에 설명해줄 개념 투표\", 풀이 과정 공유, 오답 퀴즈.",
      contentType: "교육 / 학습 콘텐츠",
      salesPoints:
        "인강 플랫폼 제휴, 수학 문제집 광고. 수능 시즌에 폭발적 트래픽이 기대됩니다.",
      difficulty: { planning: 4, filming: 1, editing: 3 },
    },
  },
  {
    id: "explore-10",
    title: "식물 초보를 위한 죽지 않는 화분 5선",
    platform: "instagram",
    url: "https://www.instagram.com/reel/explore10",
    thumbnailGradient: gradients[4],
    dateAnalyzed: "2026-02-13",
    frames: generateFrames(19),
    tags: ["식물", "인테리어", "초보"],
    analysis: {
      hookVisual:
        "시들어가는 화분들 사이에서 유일하게 싱싱한 식물 하나를 조명하는 드라마틱한 연출로 시작합니다.",
      hookText:
        "\"식물 킬러도 살릴 수 있는 화분\" — 자조적 유머(식물 킬러)로 타겟의 고충에 공감하며 해결책을 제시합니다.",
      scriptAppeal:
        "5가지 식물을 난이도순으로 소개하며, 각 식물의 관리법을 '물 주기 주기/빛/온도' 3가지로 간결하게 정리합니다.",
      captionAnalysis:
        "각 식물의 이름, 가격대, 구매처를 정리한 리스트를 캡션에 포함하여 검색 가치를 높입니다.",
      visualDirection:
        "각 식물을 개별적으로 360도 회전 촬영하여 형태를 명확히 보여주고, 인테리어 배치 예시도 함께 제공합니다.",
      engagementDevices:
        "\"내 식물 생존기\" 댓글 유도, 식물 이름 맞추기 퀴즈, 반려식물 인증 챌린지.",
      contentType: "라이프스타일 / 식물 가이드",
      salesPoints:
        "온라인 식물 샵 제휴, 화분/흙/영양제 등 소모품 연결. 반려식물 트렌드의 지속적 성장이 기대됩니다.",
      difficulty: { planning: 2, filming: 3, editing: 3 },
    },
  },
]

export const mockFeatureRequests: FeatureRequest[] = [
  {
    id: "fr-1",
    title: "AI 자동 대본 생성 기능",
    description:
      "분석된 DNA를 기반으로 AI가 자동으로 새로운 대본을 생성해주는 기능이 있으면 좋겠습니다. 카드 A와 B의 요소를 조합하여 완전히 새로운 대본을 만들어주세요.",
    category: "AI 기능",
    priority: "high",
    upvotes: 47,
    author: "크리에이터A",
    dateSubmitted: "2026-02-18",
    hasUpvoted: false,
  },
  {
    id: "fr-2",
    title: "팀 협업 기능",
    description:
      "여러 팀원이 함께 라이브러리를 공유하고 시냅스 작업을 할 수 있는 협업 기능을 요청합니다.",
    category: "협업",
    priority: "medium",
    upvotes: 32,
    author: "마케터B",
    dateSubmitted: "2026-02-15",
    hasUpvoted: true,
  },
  {
    id: "fr-3",
    title: "트렌드 대시보드",
    description:
      "현재 인기 있는 콘텐츠 트렌드를 실시간으로 분석하여 대시보드로 보여주는 기능을 추가해주세요.",
    category: "분석",
    priority: "high",
    upvotes: 28,
    author: "인플루언서C",
    dateSubmitted: "2026-02-12",
    hasUpvoted: false,
  },
  {
    id: "fr-4",
    title: "내보내기 (PDF/노션)",
    description:
      "분석 결과와 작성한 대본을 PDF나 노션으로 내보낼 수 있는 기능이 필요합니다.",
    category: "유틸리티",
    priority: "medium",
    upvotes: 21,
    author: "프리랜서D",
    dateSubmitted: "2026-02-10",
    hasUpvoted: false,
  },
  {
    id: "fr-5",
    title: "경쟁사 분석 비교",
    description:
      "같은 카테고리의 경쟁 계정 콘텐츠를 자동으로 분석하고 비교해주는 기능을 추가해주세요.",
    category: "분석",
    priority: "low",
    upvotes: 15,
    author: "스타트업E",
    dateSubmitted: "2026-02-08",
    hasUpvoted: true,
  },
]

export const pricingPlans = [
  {
    name: "Starter",
    nameKo: "스타터",
    price: "무료",
    description: "숏폼 분석을 처음 시작하는 분들을 위한 플랜",
    features: [
      "월 3회 콘텐츠 분석",
      "기본 9단계 DNA 분석",
      "라이브러리 저장 (최대 10개)",
      "시냅스 비교 기능",
    ],
    cta: "무료로 시작하기",
    highlighted: false,
  },
  {
    name: "Creator",
    nameKo: "크리에이터",
    price: "20$",
    period: "월",
    description: "본격적으로 콘텐츠를 제작하는 크리에이터를 위한 플랜",
    features: [
      "월 30회 콘텐츠 분석",
      "고급 DNA 분석 + AI 인사이트",
      "무제한 1년 라이브러리 저장",
      "시냅스 AI 재조합 대본",
      "트렌드 리포트 (주간)",
      "내보내기 기능",
    ],
    cta: "크리에이터 시작하기",
    highlighted: true,
  },
  {
    name: "Pro",
    nameKo: "프로",
    price: "60$",
    period: "월",
    description: "팀과 에이전시를 위한 전문 플랜",
    features: [
      "월 200회 콘텐츠 분석",
      "최고급 DNA 분석 + 멀티 AI",
      "무제한 2년 라이브러리 저장",
      "시냅스 AI 재조합 대본 (무제한)",
      "실시간 트렌드 대시보드",
      "팀 협업 (최대 5명)",
      "API 접근",
      "우선 고객 지원",
    ],
    cta: "프로 시작하기",
    highlighted: false,
  },
]
