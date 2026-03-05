"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FrameCarousel } from "./frame-carousel"
import { DifficultyMeter } from "./difficulty-meter"
import type { AnalysisResult, ContentCard } from "@/lib/types"

const analysisLabels = [
  { key: "contentType", label: "콘텐츠 유형", short: "유형" },
  { key: "hookVisual", label: "후킹 매력 요소", short: "후킹" },
  { key: "scriptAppeal", label: "스크립트 매력 요소", short: "스크립트" },
  { key: "captionAnalysis", label: "캡션 분석", short: "캡션" },
  { key: "visualDirection", label: "연출 요소", short: "연출" },
  { key: "engagementDevices", label: "인게이지먼트 장치", short: "인게이지먼트" },
  { key: "salesPoints", label: "세일즈 포인트", short: "세일즈" },
] as const

type AnalysisTextKey = (typeof analysisLabels)[number]["key"]

export function AnalysisResults({
  card,
  onUpdate,
}: {
  card: ContentCard
  onUpdate?: (analysis: AnalysisResult) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Frame carousel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">프레임 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <FrameCarousel frames={card.frames} />
        </CardContent>
      </Card>

      {/* Analysis tabs */}
      <Tabs defaultValue="contentType" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start">
            {analysisLabels.map((item) => (
              <TabsTrigger
                key={item.key}
                value={item.key}
                className="shrink-0 text-xs data-[state=active]:ring-2 data-[state=active]:ring-primary data-[state=active]:ring-offset-1 data-[state=active]:ring-offset-background"
              >
                {item.short}
              </TabsTrigger>
            ))}
            <TabsTrigger
              value="difficulty"
              className="shrink-0 text-xs data-[state=active]:ring-2 data-[state=active]:ring-primary data-[state=active]:ring-offset-1 data-[state=active]:ring-offset-background"
            >
              제작 난이도
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        {analysisLabels.map((item) => (
          <TabsContent key={item.key} value={item.key}>
            {/* Engagement stats cards */}
            {item.key === "engagementDevices" && (() => {
              const viewsRaw = 357651
              const likesRaw = 8087
              const commentsRaw = 313
              const ratio = (likesRaw / viewsRaw) * 100
              const ratioStr = ratio.toFixed(1)

              let grade: string
              let gradeColor: string
              if (ratio <= 0.1) {
                grade = "Bad"
                gradeColor = "text-red-400/70"
              } else if (ratio <= 0.5) {
                grade = "Normal"
                gradeColor = "text-muted-foreground"
              } else if (ratio <= 1.0) {
                grade = "Good"
                gradeColor = "text-emerald-400"
              } else if (ratio <= 2.0) {
                grade = "Great"
                gradeColor = "text-blue-400"
              } else {
                grade = "Excellent"
                gradeColor = "text-amber-400"
              }

              const stats = [
                { value: viewsRaw.toLocaleString(), label: "조회수", extra: null },
                { value: likesRaw.toLocaleString(), label: "좋아요", extra: { ratioStr, grade, gradeColor } },
                { value: commentsRaw.toLocaleString(), label: "댓글", extra: null },
              ]

              return (
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <Card key={stat.label} className="border-border/60">
                      <CardContent className="flex flex-col items-center justify-center px-3 py-2">
                        <span className="text-base font-bold tracking-tight text-foreground">
                          {stat.value}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{stat.label}</span>
                        {stat.extra && (
                          <span className="text-xs">
                            <span className="text-muted-foreground">{stat.extra.ratioStr}%</span>
                            {" "}
                            <span className={stat.extra.gradeColor}>{stat.extra.grade}</span>
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            })()}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.analysis[item.key]}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="difficulty">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">제작 난이도</CardTitle>
            </CardHeader>
            <CardContent>
              <DifficultyMeter difficulty={card.analysis.difficulty} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
