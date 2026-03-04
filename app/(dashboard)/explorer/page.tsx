"use client"

import { useState, useCallback } from "react"
import { Compass, RefreshCw, BookmarkPlus, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/lib/app-context"
import { explorerContentCards } from "@/lib/mock-data"
import type { ContentCard } from "@/lib/types"

const platformColors: Record<string, string> = {
  instagram: "bg-pink-600/20 text-pink-400 border-pink-500/30",
  tiktok: "bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
  youtube: "bg-red-600/20 text-red-400 border-red-500/30",
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

export default function ExplorerPage() {
  const { libraryCards, addCardToLibrary } = useAppContext()
  const [recommendations, setRecommendations] = useState<ContentCard[]>([])
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [hasExplored, setHasExplored] = useState(false)

  const handleExplore = useCallback(() => {
    const libraryIds = new Set(libraryCards.map((c) => c.id))
    const available = explorerContentCards.filter((c) => !libraryIds.has(c.id) && !savedIds.has(c.id))

    const picks = shuffleAndPick(
      available.length >= 5 ? available : explorerContentCards.filter((c) => !libraryIds.has(c.id)),
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
        <h1 className="text-2xl font-bold tracking-tight">익스플로러</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          내가 몰랐던 다양한 콘텐츠 분석을 추천받아보세요
        </p>
      </div>

      {/* Explore CTA */}
      {!hasExplored ? (
        <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-border/60 bg-card/40 px-6 py-16">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Compass className="size-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              새로운 콘텐츠를 발견해 보세요
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              내가 분석하지 않았던 다양한 콘텐츠와 분석 결과를 추천받을 수 있습니다
            </p>
          </div>
          <Button onClick={handleExplore} size="lg" className="gap-2">
            <Compass className="size-4" />
            탐색하기
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Header with refresh */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              추천된 콘텐츠 분석 <span className="font-semibold text-foreground">{recommendations.length}</span>개
            </p>
            <Button variant="outline" size="sm" onClick={handleExplore} className="gap-2">
              <RefreshCw className="size-3.5" />
              다시 탐색하기
            </Button>
          </div>

          {/* Recommendation cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommendations.map((card) => {
              const isSaved = savedIds.has(card.id) || libraryCards.some((c) => c.id === card.id)

              return (
                <Card
                  key={card.id}
                  className="group overflow-hidden border-border/60 transition-colors hover:border-primary/40"
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative bg-gradient-to-br ${card.thumbnailGradient}`}
                    style={{ aspectRatio: "9/12" }}
                  >
                    <div className="absolute left-2 top-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${platformColors[card.platform]}`}
                      >
                        {platformLabels[card.platform]}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="flex flex-col gap-3 p-4">
                    {/* Title */}
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                      {card.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {card.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Analysis preview */}
                    <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {card.analysis.hookVisual}
                    </p>

                    {/* Date */}
                    <p className="text-[10px] text-muted-foreground/60">
                      {card.dateAnalyzed}
                    </p>

                    {/* Action buttons */}
                    <div className="mt-auto flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        asChild
                      >
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="size-3.5" />
                          영상 보러가기
                        </a>
                      </Button>
                      <Button
                        variant={isSaved ? "secondary" : "outline"}
                        size="sm"
                        className="flex-1 gap-1.5 text-xs"
                        disabled={isSaved}
                        onClick={() => handleSave(card)}
                      >
                        {isSaved ? (
                          <>
                            <Check className="size-3.5" />
                            저장됨
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="size-3.5" />
                            라이브러리에 저장
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
