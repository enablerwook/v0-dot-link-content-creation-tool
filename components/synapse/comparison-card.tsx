"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { DifficultyMeter } from "@/components/analysis/difficulty-meter"
import type { ContentCard } from "@/lib/types"

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/20 text-pink-400",
  tiktok: "bg-cyan-500/20 text-cyan-400",
  youtube: "bg-red-500/20 text-red-400",
}

const analysisSections = [
  { key: "hookVisual", label: "3초 후킹 영상" },
  { key: "hookText", label: "3초 후킹 텍스트" },
  { key: "scriptAppeal", label: "스크립트 매력도" },
  { key: "captionAnalysis", label: "캡션 분석" },
  { key: "visualDirection", label: "영상미/연출" },
  { key: "engagementDevices", label: "인게이지먼트" },
  { key: "contentType", label: "콘텐츠 유형" },
  { key: "salesPoints", label: "세일즈/소구점" },
] as const

export function ComparisonCard({
  card,
  label,
}: {
  card: ContentCard
  label: string
}) {
  const [frameIndex, setFrameIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card">
      {/* Label header */}
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <span className="text-xs font-semibold text-primary">{label}</span>
        <Badge
          className={cn(
            "border-0 text-[10px] capitalize",
            platformColors[card.platform],
          )}
        >
          {card.platform}
        </Badge>
      </div>

      {/* Image area with glass overlay */}
      <div
        className="group relative flex-1 cursor-pointer"
        style={{ aspectRatio: "9/12" }}
        onClick={() => setIsFlipped(true)}
      >
        {/* Frame image */}
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

        {/* Frame nav arrows */}
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

        {/* Frame indicator dots */}
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
              <h4 className="text-xs font-bold text-foreground">{card.title}</h4>

              {analysisSections.map(({ key, label: sLabel }) => (
                <div key={key}>
                  <p className="mb-0.5 text-[13px] font-semibold text-primary">{sLabel}</p>
                  <p className="text-[13px] leading-relaxed text-foreground/80">
                    {card.analysis[key]}
                  </p>
                </div>
              ))}

              <div>
                <p className="mb-1 text-[8px] font-semibold text-primary">제작 난이도</p>
                <DifficultyMeter difficulty={card.analysis.difficulty} />
              </div>

              <div className="flex flex-wrap gap-1">
                {card.tags.map((tag) => (
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
      <div className="flex flex-col gap-1 p-3">
        <h3
          className="cursor-pointer truncate text-sm font-medium hover:text-primary"
          onClick={() => setIsFlipped(true)}
        >
          {card.title}
        </h3>
        <p className="text-xs text-muted-foreground">{card.dateAnalyzed}</p>
      </div>
    </div>
  )
}
