"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FrameCarousel } from "./frame-carousel"
import { DifficultyMeter } from "./difficulty-meter"
import type { ContentCard } from "@/lib/types"

const analysisLabels = [
  { key: "hookVisual", label: "3초 후킹 영상 요소", short: "후킹 영상" },
  { key: "hookText", label: "3초 후킹 텍스트 요소", short: "후킹 텍스트" },
  { key: "scriptAppeal", label: "전체 스크립트 매력도", short: "스크립트" },
  { key: "captionAnalysis", label: "캡션 분석", short: "캡션" },
  { key: "visualDirection", label: "영상미/연출", short: "연출" },
  { key: "engagementDevices", label: "인게이지먼트 장치", short: "인게이지먼트" },
  { key: "contentType", label: "콘텐츠 유형 분류", short: "유형" },
  { key: "salesPoints", label: "세일즈/소구점", short: "소구점" },
] as const

export function AnalysisResults({ card }: { card: ContentCard }) {
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
      <Tabs defaultValue="hookVisual" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start">
            {analysisLabels.map((item) => (
              <TabsTrigger key={item.key} value={item.key} className="shrink-0 text-xs">
                {item.short}
              </TabsTrigger>
            ))}
            <TabsTrigger value="difficulty" className="shrink-0 text-xs">
              난이도
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
        {analysisLabels.map((item) => (
          <TabsContent key={item.key} value={item.key}>
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
