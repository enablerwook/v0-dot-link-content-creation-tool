"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Zap, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CardDetailModal } from "@/components/library/card-detail-modal"
import type { ContentCard } from "@/lib/types"

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/20 text-pink-400",
  tiktok: "bg-cyan-500/20 text-cyan-400",
  youtube: "bg-red-500/20 text-red-400",
}

export function ContentCardComponent({
  card,
  onSynapseClick,
}: {
  card: ContentCard
  onSynapseClick: (card: ContentCard) => void
}) {
  const [frameIndex, setFrameIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-colors hover:border-border">
        {/* Frame carousel area - 9:12 aspect ratio */}
        <div
          className="relative cursor-pointer"
          style={{ aspectRatio: "9/12" }}
          onClick={() => setModalOpen(true)}
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
            onClick={() => setModalOpen(true)}
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
      </div>

      {/* Detail modal */}
      <CardDetailModal
        card={card}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
