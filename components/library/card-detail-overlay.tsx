"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FrameCarousel } from "@/components/analysis/frame-carousel"
import { DifficultyMeter } from "@/components/analysis/difficulty-meter"
import { X, ZoomIn } from "lucide-react"
import type { ContentCard } from "@/lib/types"

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

function getLikeGrade(ratio: number) {
  if (ratio <= 0.1) return { grade: "Bad", color: "text-red-400/70" }
  if (ratio <= 0.5) return { grade: "Normal", color: "text-muted-foreground" }
  if (ratio <= 1.0) return { grade: "Good", color: "text-emerald-400" }
  if (ratio <= 2.0) return { grade: "Great", color: "text-blue-400" }
  return { grade: "Excellent", color: "text-amber-400" }
}

/* Summary cards (shared between tabs) */
function EngagementStatsGrid() {
  const viewsRaw = 357651
  const likesRaw = 8087
  const commentsRaw = 313
  const ratio = (likesRaw / viewsRaw) * 100
  const ratioStr = ratio.toFixed(1)
  const { grade, color: gradeColor } = getLikeGrade(ratio)

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">인게이지먼트 수치</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center rounded-lg border border-border/40 px-2 py-2">
            <span className="text-sm font-bold">{viewsRaw.toLocaleString()}</span>
            <span className="text-[11px] text-muted-foreground">조회수</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border/40 px-2 py-2">
            <span className="text-sm font-bold">{likesRaw.toLocaleString()}</span>
            <span className="text-[11px] text-muted-foreground">좋아요</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border/40 px-2 py-2">
            <span className="text-sm font-bold">
              {ratioStr}% <span className={`text-xs ${gradeColor}`}>{grade}</span>
            </span>
            <span className="text-[11px] text-muted-foreground">좋아요 비율</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border/40 px-2 py-2">
            <span className="text-sm font-bold">{commentsRaw.toLocaleString()}</span>
            <span className="text-[11px] text-muted-foreground">댓글</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CardDetailOverlay({
  card,
  onClose,
  onExpandClick,
}: {
  card: ContentCard
  onClose: () => void
  onExpandClick: () => void
}) {
  const avgDiff = (
    (card.analysis.difficulty.planning +
      card.analysis.difficulty.filming +
      card.analysis.difficulty.editing) /
    3
  ).toFixed(1)

  return (
    <div className="relative rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">{card.title}</h2>
          <Badge variant="outline" className="capitalize">
            {card.platform}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs text-muted-foreground"
            onClick={onExpandClick}
          >
            <ZoomIn className="size-3.5" />
            크게 보기
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={onClose}
          >
            <X className="size-4" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>
      </div>

      {/* Content with scroll */}
      <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
        {/* Frame carousel */}
        <div className="mb-4">
          <FrameCarousel frames={card.frames} />
        </div>

        {/* Inner tabs */}
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger
              value="summary"
              className="text-xs data-[state=active]:ring-2 data-[state=active]:ring-primary data-[state=active]:ring-offset-1 data-[state=active]:ring-offset-background"
            >
              분석 요약
            </TabsTrigger>
            <TabsTrigger
              value="full"
              className="text-xs data-[state=active]:ring-2 data-[state=active]:ring-primary data-[state=active]:ring-offset-1 data-[state=active]:ring-offset-background"
            >
              분석 전체
            </TabsTrigger>
          </TabsList>

          {/* === Summary Tab === */}
          <TabsContent value="summary" className="flex flex-col gap-4">
            <EngagementStatsGrid />

            {/* Content type + Difficulty */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">콘텐츠 유형</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{card.analysis.contentType}</p>
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">제작 난이도</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">{avgDiff}</span>
                    <span className="text-xs text-muted-foreground">/ 5.0 평균</span>
                  </div>
                  <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                    <span>기획 {card.analysis.difficulty.planning}/5</span>
                    <span>촬영 {card.analysis.difficulty.filming}/5</span>
                    <span>편집 {card.analysis.difficulty.editing}/5</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Remaining summary cards */}
            {([
              { label: "후킹 매력 요소", key: "hookVisual" as SectionKey },
              { label: "스크립트 매력 요소", key: "scriptAppeal" as SectionKey },
              { label: "캡션 분석", key: "captionAnalysis" as SectionKey },
              { label: "연출 요소", key: "visualDirection" as SectionKey },
              { label: "인게이지먼트 장치", key: "engagementDevices" as SectionKey },
              { label: "세일즈 포인트", key: "salesPoints" as SectionKey },
            ]).map((item) => (
              <Card key={item.key} className="border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {card.analysis[item.key]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* === Full Tab === */}
          <TabsContent value="full" className="flex flex-col gap-6">
            <EngagementStatsGrid />

            {fullSections.map(({ key, label }) => (
              <div key={key}>
                <h3 className="mb-2 text-sm font-semibold">{label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.analysis[key]}
                </p>
                <Separator className="mt-4" />
              </div>
            ))}

            {/* Difficulty at end */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">제작 난이도</h3>
              <DifficultyMeter difficulty={card.analysis.difficulty} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
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
