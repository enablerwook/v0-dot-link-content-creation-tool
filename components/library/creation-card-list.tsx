"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, ImageIcon, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { CreationDetailModal } from "./creation-detail-modal"

/* ─── Types ───────────────────────────────────────────── */
interface DroppedFrame {
  id: string
  gradient: string
  label: string
  sourceCard: string
}

export interface CreationSaveData {
  id: string
  savedAt: string
  values: Record<string, string>
  droppedFrames: Record<string, DroppedFrame[]>
}

/* ─── Mock data (shown when localStorage is empty) ──── */
const MOCK_CREATIONS: CreationSaveData[] = [
  {
    id: "mock-1",
    savedAt: "2026-03-04T14:30:00",
    values: {
      step1: "첫 프레임에서 제품을 클로즈업하며 반짝이는 질감을 강조. 손가락으로 립밤을 바르는 ASMR 스타일의 시각적 요소가 시청자의 감각을 자극합니다. 배경은 미니멀한 파스텔톤으로 제품에 시선이 집중됩니다.",
      step2: "ASMR / 뷰티 제품 리뷰 / 감각 자극형 숏폼",
      step3: "\"이 립밤 하나로 입술이 완전히 달라졌어요\" - 후킹 대사로 시작",
      step4: "",
      step5: "영상 마지막에 \"저장해두고 나중에 꼭 써보세요!\" 멘트 삽입. 댓글에 사용 후기를 남기도록 유도.",
      step6: "겨울철 필수 립케어템 찾았다... 바르는 순간 촉촉함이 다름 #립밤추천 #ASMR #뷰티",
      step7: "제품의 보습력을 직접 보여주는 Before/After 연출. 성분 강조 자막.",
      step8: "ASMR 사운드 + 슬로우모션 클로즈업. 전환 효과: 스와이프 트랜지션.",
      step9: "첫 프레임: 제품 클로즈업 ASMR → 후킹 대사 → 사용 시연(Before/After) → 성분 소개 자막 → 인게이지먼트 유도 → 마무리 CTA",
    },
    droppedFrames: {
      step4: [
        { id: "card1-frame-1", gradient: "from-blue-900/60 to-slate-800", label: "프레임 1", sourceCard: "Card A" },
        { id: "card1-frame-3", gradient: "from-indigo-900/50 to-gray-800", label: "프레임 3", sourceCard: "Card A" },
      ],
      step8: [
        { id: "card2-frame-2", gradient: "from-gray-700 to-gray-900", label: "프레임 2", sourceCard: "Card B" },
      ],
    },
  },
  {
    id: "mock-2",
    savedAt: "2026-03-03T09:15:00",
    values: {
      step1: "30초 만에 완판된 이 컵밥의 비밀을 공개합니다. 먹방 스타일로 시작해서 제품의 차별점을 자연스럽게 노출하는 구성입니다.",
      step2: "먹방 / 편의점 리뷰 / 브이로그형 숏폼",
      step3: "\"편의점에서 이거 발견하고 진짜 놀랐어\"",
      step4: "",
      step5: "\"여러분은 어떤 맛이 제일 궁금하세요? 댓글로 알려주세요!\" 투표 유도.",
      step6: "편의점 신상 털이 시리즈 12탄 🔥 이건 진짜 사재기함 #편의점신상 #먹방 #컵밥",
      step7: "가격 대비 양과 맛을 직관적으로 비교. 가격 자막 삽입.",
      step8: "빠른 컷 전환 + 먹는 소리 강조. BGM: 신나는 비트.",
      step9: "인트로: 편의점 진열대 → 제품 발견 리액션 → 개봉 & 조리 → 먹방(소리 강조) → 솔직 리뷰 → 가격 비교 자막 → CTA(댓글 유도)",
    },
    droppedFrames: {
      step4: [
        { id: "card3-frame-1", gradient: "from-amber-900/40 to-stone-800", label: "프레임 1", sourceCard: "Card A" },
      ],
      step8: [],
    },
  },
  {
    id: "mock-3",
    savedAt: "2026-03-01T18:45:00",
    values: {
      step1: "월세 50만원 원룸을 호텔처럼 꾸미는 인테리어 팁 5가지. 저예산으로 감성 공간을 만드는 과정을 타임랩스로 보여줍니다.",
      step2: "인테리어 / 룸투어 / How-to 가이드형 숏폼",
      step3: "\"50만원 원룸이 이렇게 바뀔 수 있다고?\"",
      step4: "",
      step5: "\"이 영상 저장하고 이사할 때 꼭 참고하세요!\" 저장 유도.",
      step6: "자취생 필수 저장 콘텐츠 📌 50만원 원룸 → 호텔 변신기 #원룸인테리어 #자취꿀팁",
      step7: "사용된 가구/소품의 구매 링크와 가격 정보. 총 비용 요약.",
      step8: "타임랩스 전환 + Before/After 스플릿 스크린. BGM: 잔잔한 로파이.",
      step9: "Before 상태 → 후킹 대사 → 팁 1~5 타임랩스 → After 룸투어 → 총 비용 자막 → 소품 리스트 → CTA(저장 유도)",
    },
    droppedFrames: {
      step4: [],
      step8: [
        { id: "card4-frame-5", gradient: "from-emerald-900/40 to-slate-800", label: "프레임 5", sourceCard: "Card B" },
      ],
    },
  },
]

const STORAGE_KEY = "dotlink-creation-save"

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

const STEP_LABELS = [
  "스크립트 초안", "콘텐츠 유형", "후킹(대사)", "후킹(영상)",
  "인게이지먼트", "캡션", "세일즈", "연출요소", "최종 스크립트",
]

export function CreationCardList() {
  const [creations, setCreations] = useState<CreationSaveData[]>(MOCK_CREATIONS)
  const [selectedCreation, setSelectedCreation] = useState<CreationSaveData | null>(null)

  // Merge localStorage saves with mocks
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (data.values) {
          const lsSave: CreationSaveData = {
            id: "localstorage-save",
            savedAt: new Date().toISOString(),
            values: data.values,
            droppedFrames: data.droppedFrames ?? { step4: [], step8: [] },
          }
          // Prepend to mocks, avoid duplicates
          setCreations((prev) => {
            const filtered = prev.filter((c) => c.id !== "localstorage-save")
            return [lsSave, ...filtered]
          })
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Count filled steps (text OR dropped frames)
  function getFilledCount(c: CreationSaveData) {
    const keys = ["step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8", "step9"]
    return keys.filter(
      (k) => (c.values[k] ?? "").trim().length > 0 || (c.droppedFrames[k]?.length ?? 0) > 0,
    ).length
  }

  // Collect all dropped frame count
  function getTotalFrames(frames: Record<string, DroppedFrame[]>) {
    return Object.values(frames).reduce((sum, arr) => sum + arr.length, 0)
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {creations.map((c) => {
          const filled = getFilledCount(c)
          const totalFrames = getTotalFrames(c.droppedFrames)
          const preview = c.values.step1?.trim() || c.values.step9?.trim() || "내용 없음"
          const allFrames = [...(c.droppedFrames.step4 ?? []), ...(c.droppedFrames.step8 ?? [])]

          return (
            <Card
              key={c.id}
              className="group cursor-pointer border-border/60 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              onClick={() => setSelectedCreation(c)}
            >
              <CardContent className="flex flex-col gap-3 p-4">
                {/* Header: date + badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{formatDate(c.savedAt)}</span>
                  <Badge variant="outline" className="border-primary/30 text-[10px] text-primary">
                    <Zap className="mr-1 size-2.5" />
                    {filled}/9
                  </Badge>
                </div>

                {/* Preview text */}
                <p className="line-clamp-3 text-sm leading-relaxed text-foreground/90">
                  {preview}
                </p>

                {/* Step progress pills */}
                <div className="flex gap-1">
                  {STEP_LABELS.map((label, i) => {
                    const key = `step${i + 1}`
                    const hasFill = (c.values[key] ?? "").trim().length > 0 || (c.droppedFrames[key]?.length ?? 0) > 0
                    return (
                      <div
                        key={key}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          hasFill ? "bg-primary" : "bg-border/60",
                        )}
                        title={label}
                      />
                    )
                  })}
                </div>

                {/* Frame thumbnails */}
                {allFrames.length > 0 && (
                  <div className="flex gap-1.5 overflow-x-auto">
                    {allFrames.slice(0, 5).map((frame) => (
                      <div
                        key={frame.id}
                        className={cn("h-10 shrink-0 rounded bg-gradient-to-br", frame.gradient)}
                        style={{ aspectRatio: "9/16" }}
                        title={frame.label}
                      />
                    ))}
                    {allFrames.length > 5 && (
                      <div className="flex h-10 shrink-0 items-center justify-center rounded bg-muted px-2 text-[10px] text-muted-foreground" style={{ aspectRatio: "9/16" }}>
                        +{allFrames.length - 5}
                      </div>
                    )}
                  </div>
                )}

                {/* Footer stats */}
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="size-3" />
                    {filled}개 항목 작성
                  </span>
                  {totalFrames > 0 && (
                    <span className="flex items-center gap-1">
                      <ImageIcon className="size-3" />
                      {totalFrames}개 프레임
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <CreationDetailModal
        creation={selectedCreation}
        open={!!selectedCreation}
        onOpenChange={(open) => { if (!open) setSelectedCreation(null) }}
      />
    </>
  )
}
