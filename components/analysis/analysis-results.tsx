"use client"

import { useState } from "react"
import { Pencil, Check, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { FrameCarousel } from "./frame-carousel"
import { DifficultyMeter } from "./difficulty-meter"
import type { AnalysisResult, ContentCard, DifficultyRating } from "@/lib/types"

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

const difficultyLabels: { key: keyof DifficultyRating; label: string }[] = [
  { key: "planning", label: "기획" },
  { key: "filming", label: "촬영" },
  { key: "editing", label: "편집" },
]

export function AnalysisResults({
  card,
  onUpdate,
}: {
  card: ContentCard
  onUpdate?: (analysis: AnalysisResult) => void
}) {
  const [editingKey, setEditingKey] = useState<AnalysisTextKey | "difficulty" | null>(null)
  const [editValue, setEditValue] = useState("")
  const [editDifficulty, setEditDifficulty] = useState<DifficultyRating>({
    planning: 1,
    filming: 1,
    editing: 1,
  })

  function startTextEdit(key: AnalysisTextKey) {
    setEditingKey(key)
    setEditValue(card.analysis[key])
  }

  function startDifficultyEdit() {
    setEditingKey("difficulty")
    setEditDifficulty({ ...card.analysis.difficulty })
  }

  function saveTextEdit(key: AnalysisTextKey) {
    if (onUpdate) {
      onUpdate({ ...card.analysis, [key]: editValue })
    }
    setEditingKey(null)
  }

  function saveDifficultyEdit() {
    if (onUpdate) {
      onUpdate({ ...card.analysis, difficulty: editDifficulty })
    }
    setEditingKey(null)
  }

  function cancelEdit() {
    setEditingKey(null)
  }

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
            {item.key === "engagementDevices" && (
              <div className="mb-4 grid grid-cols-3 gap-3">
                {[
                  { value: "357,651", label: "조회수" },
                  { value: "8,087", label: "좋아요" },
                  { value: "313", label: "댓글" },
                ].map((stat) => (
                  <Card key={stat.label} className="border-border/60">
                    <CardContent className="flex flex-col items-center justify-center px-3 py-4">
                      <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                        {stat.value}
                      </span>
                      <span className="mt-0.5 text-xs text-muted-foreground">{stat.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">{item.label}</CardTitle>
                {editingKey !== item.key && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startTextEdit(item.key)}
                    className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                    수정
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {editingKey === item.key ? (
                  <div className="flex flex-col gap-3">
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={4}
                      className="text-sm leading-relaxed"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={cancelEdit} className="h-8 gap-1 text-xs">
                        <X className="size-3.5" />
                        취소
                      </Button>
                      <Button size="sm" onClick={() => saveTextEdit(item.key)} className="h-8 gap-1 text-xs">
                        <Check className="size-3.5" />
                        저장
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.analysis[item.key]}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="difficulty">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">제작 난이도</CardTitle>
              {editingKey !== "difficulty" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={startDifficultyEdit}
                  className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="size-3.5" />
                  수정
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editingKey === "difficulty" ? (
                <div className="flex flex-col gap-5">
                  {difficultyLabels.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="w-10 shrink-0 text-sm text-muted-foreground">{label}</span>
                      <Slider
                        value={[editDifficulty[key]]}
                        onValueChange={([v]) =>
                          setEditDifficulty((prev) => ({ ...prev, [key]: v }))
                        }
                        min={1}
                        max={5}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-8 text-right text-sm font-medium">
                        {editDifficulty[key]}/5
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={cancelEdit} className="h-8 gap-1 text-xs">
                      <X className="size-3.5" />
                      취소
                    </Button>
                    <Button size="sm" onClick={saveDifficultyEdit} className="h-8 gap-1 text-xs">
                      <Check className="size-3.5" />
                      저장
                    </Button>
                  </div>
                </div>
              ) : (
                <DifficultyMeter difficulty={card.analysis.difficulty} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
