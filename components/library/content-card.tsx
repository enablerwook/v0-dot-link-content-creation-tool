"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Zap, ExternalLink, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import type { ContentCard } from "@/lib/types"

const platformIcons: Record<string, { bg: string; label: string }> = {
  instagram: { bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400", label: "Instagram" },
  tiktok: { bg: "bg-black", label: "TikTok" },
  youtube: { bg: "bg-red-600", label: "YouTube" },
}

/* Like-ratio grading */
function getLikeGrade(ratio: number) {
  if (ratio <= 0.1) return { grade: "Bad", color: "text-red-400/70" }
  if (ratio <= 0.5) return { grade: "Normal", color: "text-slate-400" }
  if (ratio <= 1.0) return { grade: "Good", color: "text-emerald-400" }
  if (ratio <= 2.0) return { grade: "Great", color: "text-blue-400" }
  return { grade: "Excellent", color: "text-amber-400" }
}

/* Ordered sections for full tab */
const fullSections = [
  { key: "contentType", label: "콘텐츠 유형" },
  { key: "hookVisual", label: "후킹 매력 요소" },
  { key: "scriptAppeal", label: "스크립트 매력 요소" },
  { key: "captionAnalysis", label: "캡션 분석" },
  { key: "visualDirection", label: "연출 요소" },
  { key: "engagementDevices", label: "인게이지먼트 장치" },
  { key: "salesPoints", label: "세일즈 포인트" },
] as const

type SectionKey = (typeof fullSections)[number]["key"]

export function ContentCardComponent({
  card,
  onSynapseClick,
  onExpandClick,
}: {
  card: ContentCard
  onSynapseClick: (card: ContentCard) => void
  onExpandClick: (card: ContentCard) => void
}) {
  const [frameIndex, setFrameIndex] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)

  const platform = platformIcons[card.platform] || platformIcons.tiktok

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300",
        showOverlay
          ? "ring-2 ring-primary/50 shadow-xl"
          : "hover:shadow-xl hover:-translate-y-1",
      )}
      style={{ aspectRatio: "9/14" }}
    >
      {/* Full-bleed thumbnail area */}
      <div
        className="relative h-full w-full cursor-pointer"
        onClick={() => setShowOverlay((v) => !v)}
      >
        {/* Gradient placeholder for thumbnail */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            card.frames[frameIndex].gradient,
          )}
        />
        
        {/* Actual image would go here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-white/50">
            {card.frames[frameIndex].label}
          </span>
        </div>

        {/* Platform badge - rounded pill */}
        <div className="absolute left-3 top-3">
          <div className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-white shadow-md",
            platform.bg
          )}>
            <span className="text-xs font-medium">{platform.label}</span>
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFrameIndex((i) => (i === 0 ? card.frames.length - 1 : i - 1))
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 group-hover:opacity-100"
          aria-label="이전 프레임"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFrameIndex((i) => (i === card.frames.length - 1 ? 0 : i + 1))
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 group-hover:opacity-100"
          aria-label="다음 프레임"
        >
          <ChevronRight className="size-4" />
        </button>

        {/* Frame indicator dots */}
        <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-1">
          {card.frames.slice(0, 12).map((_, i) => (
            <div
              key={i}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                i === frameIndex ? "bg-white" : "bg-white/40",
              )}
            />
          ))}
        </div>

        {/* Synapse button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSynapseClick(card)
          }}
          className="absolute right-3 top-3 rounded-full bg-white/20 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-white/30 group-hover:opacity-100"
          aria-label="조합 모드로 보내기"
        >
          <Zap className="size-4" />
        </button>

        {/* Bottom gradient overlay with title */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-16">
          <h3 className="text-base font-semibold text-white line-clamp-2">
            {card.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-white/70">{card.dateAnalyzed}</p>
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-white/10"
            >
              영상 보러가기
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ──── In-card glass overlay ──── */}
      {showOverlay && (
        <InCardOverlay
          card={card}
          onClose={() => setShowOverlay(false)}
          onExpandClick={() => onExpandClick(card)}
        />
      )}
    </div>
  )
}

/* ──────────────────────────────────────────
   Overlay that renders INSIDE the card
   absolute inset-0 so it never changes the card size
   ────────────────────────────────────────── */
function InCardOverlay({
  card,
  onClose,
  onExpandClick,
}: {
  card: ContentCard
  onClose: () => void
  onExpandClick: () => void
}) {
  const viewsRaw = 357651
  const likesRaw = 8087
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
    <div
      className="absolute inset-0 z-10 flex flex-col rounded-2xl bg-white/95 backdrop-blur-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sticky header with close + expand */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/50 px-3 py-2">
        <span className="truncate text-sm font-semibold text-slate-900">{card.title}</span>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-6 text-slate-600 hover:text-slate-900"
            onClick={onExpandClick}
            title="크게 보기"
          >
            <ZoomIn className="size-3" />
            <span className="sr-only">크게 보기</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 text-slate-600 hover:text-slate-900"
            onClick={onClose}
          >
            <X className="size-3" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="mb-2 h-8 w-full justify-start rounded-lg bg-slate-100 p-0.5">
            <TabsTrigger value="summary" className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              분석 요약
            </TabsTrigger>
            <TabsTrigger value="full" className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              분석 전체
            </TabsTrigger>
          </TabsList>

          {/* ── Summary Tab ── */}
          <TabsContent value="summary" className="mt-0 flex flex-col gap-2">
            {/* Engagement stats - 2x2 grid */}
            <div className="rounded-xl bg-amber-50 p-2.5">
              <p className="mb-1.5 text-xs font-semibold text-amber-900">인게이지먼트 수치</p>
              <div className="grid grid-cols-2 gap-1.5">
                <StatCell label="조회수" value={viewsRaw.toLocaleString()} />
                <StatCell label="좋아요" value={likesRaw.toLocaleString()} />
                <StatCell
                  label="좋아요 비율"
                  value={
                    <>
                      {ratioStr}% <span className={`${gradeColor}`}>{grade}</span>
                    </>
                  }
                />
                <StatCell label="댓글" value={commentsRaw.toLocaleString()} />
              </div>
            </div>

            {/* Type + Difficulty */}
            <div className="grid grid-cols-2 gap-1.5">
              <MiniCard title="콘텐츠 유형" bg="bg-emerald-50" titleColor="text-emerald-900" textColor="text-emerald-800">
                <p className="line-clamp-2 text-xs">{card.analysis.contentType}</p>
              </MiniCard>
              <MiniCard title="제작 난이도" bg="bg-violet-50" titleColor="text-violet-900" textColor="text-violet-800">
                <p className="text-sm font-bold text-violet-700">{avgDiff} <span className="text-xs font-normal text-violet-600">/ 5.0</span></p>
              </MiniCard>
            </div>

            {/* Summary sections with pastel colors */}
            <MiniCard title="후킹 매력 요소" bg="bg-rose-50" titleColor="text-rose-900" textColor="text-rose-800">
              <p className="line-clamp-3 text-xs leading-relaxed">{card.analysis.hookVisual}</p>
            </MiniCard>
            <MiniCard title="스크립트 매력 요소" bg="bg-sky-50" titleColor="text-sky-900" textColor="text-sky-800">
              <p className="line-clamp-3 text-xs leading-relaxed">{card.analysis.scriptAppeal}</p>
            </MiniCard>
            <MiniCard title="캡션 분석" bg="bg-amber-50" titleColor="text-amber-900" textColor="text-amber-800">
              <p className="line-clamp-3 text-xs leading-relaxed">{card.analysis.captionAnalysis}</p>
            </MiniCard>
            <MiniCard title="연출 요소" bg="bg-orange-50" titleColor="text-orange-900" textColor="text-orange-800">
              <p className="line-clamp-3 text-xs leading-relaxed">{card.analysis.visualDirection}</p>
            </MiniCard>
          </TabsContent>

          {/* ── Full Tab ── */}
          <TabsContent value="full" className="mt-0 flex flex-col gap-2.5">
            {/* Engagement stats */}
            <div className="rounded-xl bg-amber-50 p-2.5">
              <p className="mb-1.5 text-xs font-semibold text-amber-900">인게이지먼트 수치</p>
              <div className="grid grid-cols-2 gap-1.5">
                <StatCell label="조회수" value={viewsRaw.toLocaleString()} />
                <StatCell label="좋아요" value={likesRaw.toLocaleString()} />
                <StatCell
                  label="좋아요 비율"
                  value={
                    <>
                      {ratioStr}% <span className={`${gradeColor}`}>{grade}</span>
                    </>
                  }
                />
                <StatCell label="댓글" value={commentsRaw.toLocaleString()} />
              </div>
            </div>

            {/* Full sections with pastel backgrounds */}
            {fullSections.map(({ key, label }) => {
              const colors = getSectionColors(key)
              return (
                <div key={key} className={cn("rounded-xl p-2.5", colors.bg)}>
                  <p className={cn("mb-0.5 text-xs font-semibold", colors.title)}>{label}</p>
                  <p className={cn("text-xs leading-relaxed", colors.text)}>
                    {card.analysis[key]}
                  </p>
                </div>
              )
            })}

            {/* Difficulty */}
            <div className="rounded-xl bg-violet-50 p-2.5">
              <p className="mb-0.5 text-xs font-semibold text-violet-900">제작 난이도</p>
              <p className="text-xs text-violet-800">
                기획 {card.analysis.difficulty.planning}/5 · 촬영 {card.analysis.difficulty.filming}/5 · 편집 {card.analysis.difficulty.editing}/5
                (평균 {avgDiff}/5)
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-slate-100 text-xs text-slate-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/* Get pastel color scheme for each section */
function getSectionColors(key: string) {
  const colorMap: Record<string, { bg: string; title: string; text: string }> = {
    contentType: { bg: "bg-emerald-50", title: "text-emerald-900", text: "text-emerald-800" },
    hookVisual: { bg: "bg-rose-50", title: "text-rose-900", text: "text-rose-800" },
    scriptAppeal: { bg: "bg-sky-50", title: "text-sky-900", text: "text-sky-800" },
    captionAnalysis: { bg: "bg-amber-50", title: "text-amber-900", text: "text-amber-800" },
    visualDirection: { bg: "bg-orange-50", title: "text-orange-900", text: "text-orange-800" },
    engagementDevices: { bg: "bg-violet-50", title: "text-violet-900", text: "text-violet-800" },
    salesPoints: { bg: "bg-pink-50", title: "text-pink-900", text: "text-pink-800" },
  }
  return colorMap[key] || { bg: "bg-slate-50", title: "text-slate-900", text: "text-slate-800" }
}

/* Compact stat cell */
function StatCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white/80 py-1.5 shadow-sm">
      <span className="text-sm font-bold text-slate-900">{value}</span>
      <span className="text-[10px] text-slate-600">{label}</span>
    </div>
  )
}

/* Mini card wrapper */
function MiniCard({ 
  title, 
  children, 
  bg = "bg-slate-50",
  titleColor = "text-slate-900",
  textColor = "text-slate-700"
}: { 
  title: string
  children: React.ReactNode
  bg?: string
  titleColor?: string
  textColor?: string
}) {
  return (
    <div className={cn("rounded-xl p-2.5", bg, textColor)}>
      <p className={cn("mb-1 text-xs font-semibold", titleColor)}>{title}</p>
      {children}
    </div>
  )
}
