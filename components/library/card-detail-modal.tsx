"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FrameCarousel } from "@/components/analysis/frame-carousel"
import { DifficultyMeter } from "@/components/analysis/difficulty-meter"
import type { ContentCard } from "@/lib/types"

const sections = [
  { key: "hookVisual", label: "3초 후킹 영상 요소" },
  { key: "hookText", label: "3초 후킹 텍스트 요소" },
  { key: "scriptAppeal", label: "전체 스크립트 매력도" },
  { key: "captionAnalysis", label: "캡션 분석" },
  { key: "visualDirection", label: "영상미/연출" },
  { key: "engagementDevices", label: "인게이지먼트 장치" },
  { key: "contentType", label: "콘텐츠 유형 분류" },
  { key: "salesPoints", label: "세일즈/소구점" },
] as const

export function CardDetailModal({
  card,
  open,
  onOpenChange,
}: {
  card: ContentCard | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!card) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl p-0">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-lg">{card.title}</DialogTitle>
            <Badge variant="outline" className="capitalize">
              {card.platform}
            </Badge>
          </div>
          <DialogDescription className="text-xs">
            {card.dateAnalyzed} 분석됨
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(85vh-6rem)]">
          <div className="flex flex-col gap-6 px-6 pb-6">
            <FrameCarousel frames={card.frames} />
            <Separator />
            {sections.map(({ key, label }) => (
              <div key={key}>
                <h3 className="mb-1.5 text-sm font-semibold">{label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.analysis[key]}
                </p>
              </div>
            ))}
            <Separator />
            <div>
              <h3 className="mb-3 text-sm font-semibold">제작 난이도</h3>
              <DifficultyMeter difficulty={card.analysis.difficulty} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
