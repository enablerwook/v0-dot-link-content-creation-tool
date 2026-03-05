"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Zap, ExternalLink, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import type { ContentCard } from "@/lib/types"

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/20 text-pink-400",
  tiktok: "bg-cyan-500/20 text-cyan-400",
  youtube: "bg-red-500/20 text-red-400",
}

/* Like-ratio grading */
function getLikeGrade(ratio: number) {
  if (ratio <= 0.1) return { grade: "Bad", color: "text-red-400/70" }
  if (ratio <= 0.5) return { grade: "Normal", color: "text-muted-foreground" }
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

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-colors",
        showOverlay
          ? "border-primary ring-2 ring-primary/30"
          : "border-border/50 hover:border-border",
      )}
    >
      {/* Frame carousel area - 9:12 aspect ratio */}
      <div
        className="relative cursor-pointer"
        style={{ aspectRatio: "9/12" }}
        onClick={() => setShowOverlay((v) => !v)}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            card.frames[frameIndex].gradient,
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-foreground/50">
            {card.frames[frameIndex].label}
          </span>
        </div>

        {/* Nav arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFrameIndex((i) => (i === 0 ? card.frames.length - 1 : i - 1))
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="이전 프레임"
        >
          <ChevronLeft className="size-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFrameIndex((i) => (i === card.frames.length - 1 ? 0 : i + 1))
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="다음 프레임"
        >
          <ChevronRight className="size-3.5" />
        </button>

        {/* Frame indicator */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-0.5">
          {card.frames.slice(0, 15).map((_, i) => (
            <div
              key={i}
              className={cn(
                "size-1 rounded-full transition-colors",
                i === frameIndex ? "bg-foreground" : "bg-foreground/30",
              )}
            />
          ))}
        </div>

        {/* Platform badge */}
        <Badge
          className={cn(
            "absolute top-2 left-2 border-0 text-[10px] capitalize",
            platformColors[card.platform],
          )}
        >
          {card.platform}
        </Badge>

        {/* Synapse button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSynapseClick(card)
          }}
          className="absolute top-2 right-2 rounded-full bg-primary/80 p-1.5 text-primary-foreground opacity-0 transition-opacity hover:bg-primary group-hover:opacity-100"
          aria-label="시냅스로 보내기"
        >
          <Zap className="size-3.5" />
        </button>
      </div>

      {/* Card info */}
      <div className="flex flex-col gap-1 p-3">
        <h3
          className="cursor-pointer truncate text-sm font-medium hover:text-primary"
          onClick={() => setShowOverlay((v) => !v)}
        >
          {card.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{card.dateAnalyzed}</p>
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10"
          >
            영상 보러가기
            <ExternalLink className="size-3" />
          </a>
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
      className="absolute inset-0 z-10 flex flex-col rounded-xl bg-background/85 backdrop-blur-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sticky header with close + expand */}
      <div className="flex shrink-0 items-center justify-between border-b border-border/30 px-3 py-2">
        <span className="truncate text-xs font-semibold">{card.title}</span>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={onExpandClick}
            title="크게 보기"
          >
            <ZoomIn className="size-3" />
            <span className="sr-only">크게 보기</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={onClose}
          >
            <X className="size-3" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/50">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="mb-2 h-7 w-full justify-start p-0.5">
            <TabsTrigger value="summary" className="h-6 px-2.5 text-[10px]">
              분석 요약
            </TabsTrigger>
            <TabsTrigger value="full" className="h-6 px-2.5 text-[10px]">
              분석 전체
            </TabsTrigger>
          </TabsList>

          {/* ── Summary Tab ── */}
          <TabsContent value="summary" className="mt-0 flex flex-col gap-2">
            {/* Engagement stats - 2x2 grid for compact card */}
            <div className="rounded-lg border border-border/40 p-2">
              <p className="mb-1.5 text-[10px] font-semibold text-foreground">인게이지먼트 수치</p>
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
              <MiniCard title="콘텐츠 유형">
                <p className="line-clamp-2 text-[10px] text-muted-foreground">{card.analysis.contentType}</p>
              </MiniCard>
              <MiniCard title="제작 난이도">
                <p className="text-xs font-bold text-primary">{avgDiff} <span className="text-[10px] font-normal text-muted-foreground">/ 5.0</span></p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  기획 {card.analysis.difficulty.planning}/5 &middot; 촬영 {card.analysis.difficulty.filming}/5 &middot; 편집 {card.analysis.difficulty.editing}/5
                </p>
              </MiniCard>
            </div>

            {/* Summary sections */}
            {([
              { label: "후킹 매력 요소", key: "hookVisual" as SectionKey },
              { label: "스크립트 매력 요소", key: "scriptAppeal" as SectionKey },
              { label: "캡션 분석", key: "captionAnalysis" as SectionKey },
              { label: "연출 요소", key: "visualDirection" as SectionKey },
              { label: "인게이지먼트 장치", key: "engagementDevices" as SectionKey },
              { label: "세일즈 포인트", key: "salesPoints" as SectionKey },
            ]).map((item) => (
              <MiniCard key={item.key} title={item.label}>
                <p className="line-clamp-3 text-[10px] leading-relaxed text-muted-foreground">
                  {card.analysis[item.key]}
                </p>
              </MiniCard>
            ))}
          </TabsContent>

          {/* ── Full Tab ── */}
          <TabsContent value="full" className="mt-0 flex flex-col gap-2.5">
            {/* Engagement stats */}
            <div className="rounded-lg border border-border/40 p-2">
              <p className="mb-1.5 text-[10px] font-semibold text-foreground">인게이지먼트 수치</p>
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

            {/* Full sections */}
            {fullSections.map(({ key, label }) => (
              <div key={key}>
                <p className="mb-0.5 text-[10px] font-semibold text-foreground">{label}</p>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  {card.analysis[key]}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}

            {/* Difficulty */}
            <div>
              <p className="mb-0.5 text-[10px] font-semibold text-foreground">제작 난이도</p>
              <p className="text-[10px] text-muted-foreground">
                기획 {card.analysis.difficulty.planning}/5 &middot; 촬영 {card.analysis.difficulty.filming}/5 &middot; 편집 {card.analysis.difficulty.editing}/5
                &nbsp;(평균 {avgDiff}/5)
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[9px]">
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

/* Compact stat cell */
function StatCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-border/30 py-1.5">
      <span className="text-[11px] font-bold">{value}</span>
      <span className="text-[9px] text-muted-foreground">{label}</span>
    </div>
  )
}

/* Mini card wrapper */
function MiniCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/40 p-2">
      <p className="mb-1 text-[10px] font-semibold text-foreground">{title}</p>
      {children}
    </div>
  )
}
