"use client"

import { useState } from "react"
import { X, ZoomIn, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ContentCard } from "@/lib/types"

/* Like-ratio grading */
function getLikeGrade(ratio: number) {
  if (ratio <= 0.1) return { grade: "Bad", color: "text-red-500" }
  if (ratio <= 0.5) return { grade: "Normal", color: "text-slate-500" }
  if (ratio <= 1.0) return { grade: "Good", color: "text-emerald-500" }
  if (ratio <= 2.0) return { grade: "Great", color: "text-blue-500" }
  return { grade: "Excellent", color: "text-amber-500" }
}

export function DataAnalysisCard({
  card,
  onExpandClick,
}: {
  card: ContentCard
  onExpandClick: (card: ContentCard) => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  const viewsRaw = 367951
  const likesRaw = 5997
  const commentsRaw = 313
  const ratio = (likesRaw / viewsRaw) * 100
  const ratioStr = ratio.toFixed(1)
  const { grade, color: gradeColor } = getLikeGrade(ratio)

  const avgDiff = (
    (card.analysis.difficulty.planning +
      card.analysis.difficulty.filming +
      card.analysis.difficulty.editing) /
    3
  ).toFixed(1)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-amber-100/80 shadow-lg shadow-amber-200/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-200/50 px-4 py-3">
        <h3 className="truncate text-sm font-bold text-amber-900">{card.title}</h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-amber-700 hover:bg-amber-200/50 hover:text-amber-900"
            onClick={() => onExpandClick(card)}
            title="크게 보기"
          >
            <ZoomIn className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-amber-700 hover:bg-amber-200/50 hover:text-amber-900"
            onClick={() => setIsExpanded(false)}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="mb-3 h-9 w-full justify-start rounded-xl bg-amber-200/50 p-1">
            <TabsTrigger 
              value="summary" 
              className="rounded-lg px-4 text-xs text-amber-800 data-[state=active]:bg-white data-[state=active]:text-amber-900 data-[state=active]:shadow-sm"
            >
              분석 요약
            </TabsTrigger>
            <TabsTrigger 
              value="full" 
              className="rounded-lg px-4 text-xs text-amber-800 data-[state=active]:bg-white data-[state=active]:text-amber-900 data-[state=active]:shadow-sm"
            >
              분석 전체
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-0 flex flex-col gap-3">
            {/* Engagement Stats - Colorful stat boxes */}
            <div className="rounded-xl bg-white/60 p-3 shadow-sm">
              <p className="mb-2 text-xs font-bold text-amber-900">인게이지먼트 수치</p>
              <div className="grid grid-cols-2 gap-2">
                <StatBox label="조회수" value={viewsRaw.toLocaleString()} />
                <StatBox label="좋아요" value={likesRaw.toLocaleString()} />
                <StatBox 
                  label="좋아요 비율" 
                  value={
                    <span>
                      {ratioStr}% <span className={cn("font-semibold", gradeColor)}>{grade}</span>
                    </span>
                  } 
                />
                <StatBox label="댓글" value={commentsRaw.toLocaleString()} />
              </div>
            </div>

            {/* Content Type + Difficulty */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-emerald-100/80 p-3 shadow-sm">
                <p className="mb-1 text-xs font-bold text-emerald-900">콘텐츠 유형</p>
                <p className="text-xs text-emerald-800">{card.analysis.contentType}</p>
              </div>
              <div className="rounded-xl bg-violet-100/80 p-3 shadow-sm">
                <p className="mb-1 text-xs font-bold text-violet-900">제작 난이도</p>
                <p className="text-lg font-bold text-violet-700">{avgDiff} <span className="text-xs font-normal text-violet-600">/ 5.0</span></p>
                <p className="text-[10px] text-violet-600">
                  기획 {card.analysis.difficulty.planning}/5 · 촬영 {card.analysis.difficulty.filming}/5 · 편집 {card.analysis.difficulty.editing}/5
                </p>
              </div>
            </div>

            {/* Hooking Section */}
            <div className="rounded-xl bg-rose-100/80 p-3 shadow-sm">
              <p className="mb-1 text-xs font-bold text-rose-900">후킹 매력 요소</p>
              <p className="line-clamp-3 text-xs leading-relaxed text-rose-800">
                {card.analysis.hookVisual}
              </p>
            </div>

            {/* Script Section */}
            <div className="rounded-xl bg-sky-100/80 p-3 shadow-sm">
              <p className="mb-1 text-xs font-bold text-sky-900">스크립트 매력 요소</p>
              <p className="line-clamp-3 text-xs leading-relaxed text-sky-800">
                {card.analysis.scriptAppeal}
              </p>
            </div>

            {/* Direction Section */}
            <div className="rounded-xl bg-orange-100/80 p-3 shadow-sm">
              <p className="mb-1 text-xs font-bold text-orange-900">연출 분석</p>
              <p className="line-clamp-3 text-xs leading-relaxed text-orange-800">
                {card.analysis.visualDirection}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="full" className="mt-0 flex flex-col gap-3">
            {/* Full analysis content */}
            {[
              { label: "콘텐츠 유형", value: card.analysis.contentType, bg: "bg-emerald-100/80", text: "text-emerald-800", title: "text-emerald-900" },
              { label: "후킹 매력 요소", value: card.analysis.hookVisual, bg: "bg-rose-100/80", text: "text-rose-800", title: "text-rose-900" },
              { label: "스크립트 매력 요소", value: card.analysis.scriptAppeal, bg: "bg-sky-100/80", text: "text-sky-800", title: "text-sky-900" },
              { label: "캡션 분석", value: card.analysis.captionAnalysis, bg: "bg-amber-100/80", text: "text-amber-800", title: "text-amber-900" },
              { label: "연출 요소", value: card.analysis.visualDirection, bg: "bg-orange-100/80", text: "text-orange-800", title: "text-orange-900" },
              { label: "인게이지먼트 장치", value: card.analysis.engagementDevices, bg: "bg-violet-100/80", text: "text-violet-800", title: "text-violet-900" },
              { label: "세일즈 포인트", value: card.analysis.salesPoints, bg: "bg-pink-100/80", text: "text-pink-800", title: "text-pink-900" },
            ].map((section) => (
              <div key={section.label} className={cn("rounded-xl p-3 shadow-sm", section.bg)}>
                <p className={cn("mb-1 text-xs font-bold", section.title)}>{section.label}</p>
                <p className={cn("text-xs leading-relaxed", section.text)}>
                  {section.value}
                </p>
              </div>
            ))}

            {/* Difficulty */}
            <div className="rounded-xl bg-violet-100/80 p-3 shadow-sm">
              <p className="mb-1 text-xs font-bold text-violet-900">제작 난이도</p>
              <p className="text-xs text-violet-800">
                기획 {card.analysis.difficulty.planning}/5 · 촬영 {card.analysis.difficulty.filming}/5 · 편집 {card.analysis.difficulty.editing}/5
                (평균 {avgDiff}/5)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/* Stat box for engagement metrics */
function StatBox({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white/80 py-2 shadow-sm">
      <span className="text-sm font-bold text-amber-900">{value}</span>
      <span className="text-[10px] text-amber-700">{label}</span>
    </div>
  )
}
