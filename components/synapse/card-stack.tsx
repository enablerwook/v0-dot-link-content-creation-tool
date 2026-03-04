"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DifficultyMeter } from "@/components/analysis/difficulty-meter"
import type { ContentCard } from "@/lib/types"

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/20 text-pink-400",
  tiktok: "bg-cyan-500/20 text-cyan-400",
  youtube: "bg-red-500/20 text-red-400",
}

const analysisSections = [
  { key: "contentType", label: "콘텐츠 유형" },
  { key: "hookVisual", label: "후킹 매력 요소" },
  { key: "scriptAppeal", label: "스크립트 매력 요소" },
  { key: "captionAnalysis", label: "캡션 분석" },
  { key: "visualDirection", label: "연출 요소" },
  { key: "engagementDevices", label: "인게이지먼트 장치" },
  { key: "salesPoints", label: "세일즈 포인트" },
] as const

export function CardStack({
  cards,
  currentIndex,
  onPrev,
  onNext,
}: {
  cards: ContentCard[]
  currentIndex: number
  onPrev: () => void
  onNext: () => void
}) {
  const current = cards[currentIndex]
  const [frameIndex, setFrameIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="relative flex h-full flex-col">
      {/* Header with navigation */}
      <div className="flex items-center justify-between rounded-t-xl border-x border-t border-border/50 bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary">Card B</span>
          <Badge
            className={cn(
              "border-0 text-[10px] capitalize",
              platformColors[current.platform],
            )}
          >
            {current.platform}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setIsFlipped(false); setFrameIndex(0); onPrev() }}
            className="rounded p-1 hover:bg-accent"
            aria-label="이전 카드"
          >
            <ChevronUp className="size-4" />
          </button>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1}/{cards.length}
          </span>
          <button
            onClick={() => { setIsFlipped(false); setFrameIndex(0); onNext() }}
            className="rounded p-1 hover:bg-accent"
            aria-label="다음 카드"
          >
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {/* Image area with glass overlay */}
      <div
        className="group relative z-10 flex-1 cursor-pointer overflow-hidden rounded-b-xl border-x border-b border-border/50 bg-card"
        style={{ aspectRatio: "9/12" }}
        onClick={() => setIsFlipped(true)}
      >
        {/* Frame image */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            current.frames[frameIndex].gradient,
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-foreground/50">
            {current.frames[frameIndex].label}
          </span>
        </div>

        {/* Frame nav arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFrameIndex((i) => (i === 0 ? current.frames.length - 1 : i - 1))
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="이전 프레임"
        >
          <ChevronLeft className="size-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFrameIndex((i) => (i === current.frames.length - 1 ? 0 : i + 1))
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="다음 프레임"
        >
          <ChevronRight className="size-3.5" />
        </button>

        {/* Frame indicator dots */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-0.5">
          {current.frames.slice(0, 15).map((_, i) => (
            <div
              key={i}
              className={cn(
                "size-1 rounded-full transition-colors",
                i === frameIndex ? "bg-foreground" : "bg-foreground/30",
              )}
            />
          ))}
        </div>

        {/* Glass overlay with analysis results */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col transition-all duration-300",
            "bg-background/80 backdrop-blur-xl",
            isFlipped
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute top-2 right-2 z-10 rounded-full bg-foreground/10 p-1 transition-colors hover:bg-foreground/20"
            aria-label="닫기"
          >
            <X className="size-3.5" />
          </button>

          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2.5 p-3 pt-8">
              <h4 className="text-xs font-bold text-foreground">{current.title}</h4>

              {analysisSections.map(({ key, label }) => (
                <div key={key}>
                  <p className="mb-0.5 text-[13px] font-semibold text-primary">{label}</p>
                  <p className="text-[13px] leading-relaxed text-foreground/80">
                    {current.analysis[key]}
                  </p>
                </div>
              ))}

              <div>
                <p className="mb-1 text-[8px] font-semibold text-primary">제작 난이도</p>
                <DifficultyMeter difficulty={current.analysis.difficulty} />
              </div>

              <div className="flex flex-wrap gap-1">
                {current.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Card info */}
      <div className="relative z-10 flex flex-col gap-1 rounded-b-xl bg-card px-3 py-2">
        <h3
          className="cursor-pointer truncate text-sm font-medium hover:text-primary"
          onClick={() => setIsFlipped(true)}
        >
          {current.title}
        </h3>
        <p className="text-xs text-muted-foreground">{current.dateAnalyzed}</p>
      </div>

      {/* Next card preview - peeking from below at 50% opacity */}
      {cards.length > 1 && (
        <div className="absolute -bottom-3 left-3 right-3 z-0 h-12 rounded-b-xl border border-border/30 bg-card/50 opacity-50" />
      )}
    </div>
  )
}
