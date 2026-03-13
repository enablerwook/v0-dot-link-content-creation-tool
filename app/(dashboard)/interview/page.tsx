"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { Sparkles, Plus, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppContext } from "@/lib/app-context"
import { useLocale } from "@/lib/locale-context"
import { LibraryPickerDialog } from "@/components/synapse/library-picker-dialog"
import type { ContentCard } from "@/lib/types"

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/20 text-pink-400",
  tiktok: "bg-cyan-500/20 text-cyan-400",
  youtube: "bg-red-500/20 text-red-400",
}

export default function InterviewModePage() {
  const { t } = useLocale()
  const { libraryCards } = useAppContext()

  const [selectedCard, setSelectedCard] = useState<ContentCard | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)

  const [step1, setStep1] = useState("")
  const [step2, setStep2] = useState("")
  const [step3, setStep3] = useState("")
  const [customCta, setCustomCta] = useState("")

  const ctaOptions = [
    { value: "profile", label: "프로필 링크 클릭으로 구매 유도" },
    { value: "comment", label: "댓글로 소통 유도" },
    { value: "follow", label: "계정 팔로우 유도" },
    { value: "custom", label: "직접 입력" },
  ]

  const canSubmit = step1.trim() && step2.trim() && step3

  return (
    <div className="flex h-full flex-col px-4 py-6 lg:h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">인터뷰 모드</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          레퍼런스의 성공 구조(DNA)를 바탕으로 질문에 답하고 나만의 떡상 대본을 완성하세요.
        </p>
      </div>

      {/* Main 2-column layout */}
      <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto lg:min-h-0 lg:grid-cols-5 lg:overflow-hidden">
        {/* Left: Reference Card Viewer (40%) */}
        <div className="min-h-[400px] overflow-hidden lg:col-span-2 lg:min-h-0">
          {selectedCard ? (
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">레퍼런스</span>
                  <Badge
                    className={cn(
                      "border-0 text-[10px] capitalize",
                      platformColors[selectedCard.platform],
                    )}
                  >
                    {selectedCard.platform}
                  </Badge>
                </div>
                <button
                  onClick={() => setPickerOpen(true)}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <RefreshCw className="size-3" />
                  카드 변경
                </button>
              </div>

              {/* Frame viewer */}
              <div
                className="group relative flex-1"
                style={{ aspectRatio: "9/14" }}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    selectedCard.frames[frameIndex]?.gradient || "from-slate-700 to-slate-900",
                  )}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-foreground/50">
                    {selectedCard.frames[frameIndex]?.label || "프레임"}
                  </span>
                </div>

                {/* Nav arrows */}
                <button
                  onClick={() => setFrameIndex((i) => (i === 0 ? selectedCard.frames.length - 1 : i - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="이전 프레임"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => setFrameIndex((i) => (i === selectedCard.frames.length - 1 ? 0 : i + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="다음 프레임"
                >
                  <ChevronRight className="size-4" />
                </button>

                {/* Frame dots */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                  {selectedCard.frames.slice(0, 15).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "size-1.5 rounded-full transition-colors",
                        i === frameIndex ? "bg-foreground" : "bg-foreground/30",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Card info */}
              <div className="flex flex-col gap-1 border-t p-4">
                <h3 className="truncate text-sm font-medium">{selectedCard.title}</h3>
                <p className="text-xs text-muted-foreground">{selectedCard.dateAnalyzed}</p>
              </div>
            </div>
          ) : (
            /* Empty card slot */
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/50">
              <div className="flex items-center gap-2 border-b border-dashed border-border/40 px-4 py-2">
                <span className="text-xs font-semibold text-muted-foreground">레퍼런스</span>
              </div>

              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="group flex flex-1 flex-col items-center justify-center gap-4 transition-colors hover:bg-accent/30"
              >
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 transition-all group-hover:border-primary group-hover:bg-primary/10">
                  <Plus className="size-7 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    카드를 선택해주세요
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    {t.synapsePickFromLibrary}
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Right: Interactive Q&A Form (60%) */}
        <div className="relative flex min-h-[500px] flex-col overflow-hidden lg:col-span-3 lg:min-h-0">
          <div 
            className="flex-1 overflow-y-auto pr-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.1) transparent',
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                width: 6px;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
              div::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 9999px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
              }
            `}</style>
            <div className="flex flex-col gap-6 pb-24">
              {/* Step 1: Hook & Pain Point */}
              <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary">Step 1</Badge>
                    <span className="text-sm font-semibold">훅(Hook) & 페인포인트 추출</span>
                  </div>
                  
                  {/* AI Question bubble */}
                  <div className="mt-4 rounded-xl bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                        <Sparkles className="size-3 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-medium text-primary">MOZAIC AI</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      이 레퍼런스 영상은 <strong className="text-primary">&apos;초등학교 때 돈 뺏긴 억울한 경험&apos;</strong>이라는 강렬한 스토리로 시선을 끌었습니다. 
                      대표님의 타겟 고객들이 기존 시장에서 겪고 있는 <strong>가장 억울하거나 불편한 경험(Pain Point)</strong>은 무엇인가요?
                    </p>
                  </div>

                  {/* User input */}
                  <Textarea
                    className="mt-4 min-h-28 resize-none border-border/60 bg-background/60 text-sm"
                    placeholder="예: 다이어트할 때마다 닭가슴살만 먹어야 해서 너무 물리고 억울해요..."
                    value={step1}
                    onChange={(e) => setStep1(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Step 2: Solution */}
              <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary">Step 2</Badge>
                    <span className="text-sm font-semibold">솔루션(Solution) 도출</span>
                  </div>
                  
                  {/* AI Question bubble */}
                  <div className="mt-4 rounded-xl bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                        <Sparkles className="size-3 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-medium text-primary">MOZAIC AI</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      아주 좋은 포인트입니다! 레퍼런스 영상은 중간 유통 마진을 없앤 <strong className="text-primary">&apos;당근 직거래&apos;</strong>를 해결책으로 제시했습니다. 
                      대표님의 제품/서비스가 고객의 그 불편함을 어떻게 해결해 줄 수 있는지, <strong>가장 자신 있는 장점 하나</strong>만 자랑해 주세요.
                    </p>
                  </div>

                  {/* User input */}
                  <Textarea
                    className="mt-4 min-h-28 resize-none border-border/60 bg-background/60 text-sm"
                    placeholder="예: 저희가 만든 곤약 젤리는 칼로리가 0인데 시중 과일 젤리보다 훨씬 달콤하고 식감이 쫀득해요."
                    value={step2}
                    onChange={(e) => setStep2(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Step 3: CTA */}
              <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary">Step 3</Badge>
                    <span className="text-sm font-semibold">행동 유도 (CTA)</span>
                  </div>
                  
                  {/* AI Question bubble */}
                  <div className="mt-4 rounded-xl bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                        <Sparkles className="size-3 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-medium text-primary">MOZAIC AI</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      마지막입니다! 레퍼런스는 <strong className="text-primary">&apos;저랑 지인 하실 분 댓글 달아주세요&apos;</strong>라며 친근하게 행동을 유도했습니다. 
                      시청자가 이 영상을 보고 <strong>어떤 행동을 하길 원하시나요?</strong>
                    </p>
                  </div>

                  {/* Radio options */}
                  <RadioGroup
                    value={step3}
                    onValueChange={setStep3}
                    className="mt-4 grid gap-3 sm:grid-cols-2"
                  >
                    {ctaOptions.map((opt) => (
                      <Label
                        key={opt.value}
                        htmlFor={opt.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                          step3 === opt.value
                            ? "border-primary bg-primary/10"
                            : "border-border/60 hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <span className="text-sm">{opt.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>

                  {/* Custom CTA input */}
                  {step3 === "custom" && (
                    <Textarea
                      className="mt-3 min-h-20 resize-none border-border/60 bg-background/60 text-sm"
                      placeholder="원하는 CTA를 직접 입력해 주세요..."
                      value={customCta}
                      onChange={(e) => setCustomCta(e.target.value)}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sticky CTA Button */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-background via-background to-transparent pb-4 pt-8">
            <Button
              size="lg"
              disabled={!canSubmit}
              className="relative h-12 gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30 disabled:shadow-none"
            >
              <Sparkles className="size-5" />
              AI와 함께 대본 초안 완성하기
              {/* Glow effect */}
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-primary/20 blur-xl" />
            </Button>
          </div>
        </div>
      </div>

      {/* Library Picker Dialog */}
      <LibraryPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        cards={libraryCards}
        onSelect={(card) => {
          setSelectedCard(card)
          setFrameIndex(0)
        }}
        slotLabel="레퍼런스"
      />
    </div>
  )
}
