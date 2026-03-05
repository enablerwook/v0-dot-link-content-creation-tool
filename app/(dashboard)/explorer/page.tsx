"use client"

import { useState, useCallback } from "react"
import {
  Compass,
  RefreshCw,
  BookmarkPlus,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DifficultyMeter } from "@/components/analysis/difficulty-meter"
import { useAppContext } from "@/lib/app-context"
import { useLocale } from "@/lib/locale-context"
import { explorerContentCards } from "@/lib/mock-data"
import type { ContentCard } from "@/lib/types"

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/20 text-pink-400",
  tiktok: "bg-cyan-500/20 text-cyan-400",
  youtube: "bg-red-500/20 text-red-400",
}

const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
}

function shuffleAndPick(cards: ContentCard[], count: number): ContentCard[] {
  const shuffled = [...cards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function ExplorerCard({
  card,
  isSaved,
  onSave,
}: {
  card: ContentCard
  isSaved: boolean
  onSave: (card: ContentCard) => void
}) {
  const { t } = useLocale()
  const [frameIndex, setFrameIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const analysisSections = [
    { key: "contentType", label: t.explorerContentType },
    { key: "hookVisual", label: t.explorerHook },
    { key: "scriptAppeal", label: t.explorerScriptAppeal },
    { key: "captionAnalysis", label: t.explorerCaptionAnalysis },
    { key: "visualDirection", label: t.explorerDirection },
    { key: "engagementDevices", label: t.explorerEngagement },
    { key: "salesPoints", label: t.explorerSalesPoints },
  ] as const

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-colors hover:border-border">
      {/* Frame carousel area */}
      <div
        className="relative cursor-pointer"
        style={{ aspectRatio: "9/12" }}
        onClick={() => setIsFlipped(true)}
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
          aria-label="Previous frame"
        >
          <ChevronLeft className="size-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFrameIndex((i) => (i === card.frames.length - 1 ? 0 : i + 1))
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Next frame"
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

        {/* Platform badge */}
        <Badge
          className={cn(
            "absolute top-2 left-2 border-0 text-[10px] capitalize",
            platformColors[card.platform],
          )}
        >
          {platformLabels[card.platform]}
        </Badge>

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
          {/* Close button */}
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute top-2 right-2 z-10 rounded-full bg-foreground/10 p-1 transition-colors hover:bg-foreground/20"
            aria-label="Close"
          >
            <X className="size-3.5" />
          </button>

          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2.5 p-3 pt-8">
              <h4 className="text-xs font-bold text-foreground">{card.title}</h4>

              {analysisSections.map(({ key, label }) => (
                <div key={key}>
                  <p className="mb-0.5 text-xs font-semibold text-primary">{label}</p>
                  <p className="text-xs leading-relaxed text-foreground/80">
                    {card.analysis[key]}
                  </p>
                </div>
              ))}

              <div>
                <p className="mb-1 text-xs font-semibold text-primary">{t.explorerDifficulty}</p>
                <DifficultyMeter difficulty={card.analysis.difficulty} />
              </div>

              <div className="flex flex-wrap gap-1">
                {card.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-[9px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Card info + actions */}
      <div className="flex flex-col gap-2 p-3">
        <h3
          className="cursor-pointer truncate text-sm font-medium hover:text-primary"
          onClick={() => setIsFlipped(true)}
        >
          {card.title}
        </h3>
        <p className="text-xs text-muted-foreground">{card.dateAnalyzed}</p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
            <a href={card.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-3.5" />
              {t.explorerViewVideo}
            </a>
          </Button>
          <Button
            variant={isSaved ? "secondary" : "outline"}
            size="sm"
            className="flex-1 gap-1.5 text-xs"
            disabled={isSaved}
            onClick={() => onSave(card)}
          >
            {isSaved ? (
              <>
                <Check className="size-3.5" />
                {t.analysisSaved}
              </>
            ) : (
              <>
                <BookmarkPlus className="size-3.5" />
                {t.analysisSaveToLibrary}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ExplorerPage() {
  const { t } = useLocale()
  const { libraryCards, addCardToLibrary } = useAppContext()
  const [recommendations, setRecommendations] = useState<ContentCard[]>([])
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [hasExplored, setHasExplored] = useState(false)

  const handleExplore = useCallback(() => {
    const libraryIds = new Set(libraryCards.map((c) => c.id))
    const available = explorerContentCards.filter(
      (c) => !libraryIds.has(c.id) && !savedIds.has(c.id),
    )
    const picks = shuffleAndPick(
      available.length >= 5
        ? available
        : explorerContentCards.filter((c) => !libraryIds.has(c.id)),
      5,
    )
    setRecommendations(picks)
    setHasExplored(true)
  }, [libraryCards, savedIds])

  const handleSave = useCallback(
    (card: ContentCard) => {
      addCardToLibrary(card)
      setSavedIds((prev) => new Set(prev).add(card.id))
    },
    [addCardToLibrary],
  )

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{t.explorerTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.explorerDesc}
        </p>
      </div>

      {!hasExplored ? (
        <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-border/60 bg-card/40 px-6 py-16">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Compass className="size-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {t.explorerEmptyTitle}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.explorerEmptyDesc}
            </p>
          </div>
          <Button onClick={handleExplore} size="lg" className="gap-2">
            <Compass className="size-4" />
            {t.explorerExploreBtn}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t.explorerRecommended}{" "}
              <span className="font-semibold text-foreground">
                {recommendations.length}
              </span>
              {t.explorerCount}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExplore}
              className="gap-2"
            >
              <RefreshCw className="size-3.5" />
              {t.explorerRefresh}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommendations.map((card) => {
              const isSaved =
                savedIds.has(card.id) ||
                libraryCards.some((c) => c.id === card.id)
              return (
                <ExplorerCard
                  key={card.id}
                  card={card}
                  isSaved={isSaved}
                  onSave={handleSave}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
