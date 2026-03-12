"use client"

import { useState } from "react"
import { Plus, ChevronLeft, ChevronRight, Sparkles, ChevronDown, X, Save, FolderOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/lib/locale-context"
import { useAppContext } from "@/lib/app-context"
import { LibraryPickerDialog } from "@/components/synapse/library-picker-dialog"
import type { ContentCard } from "@/lib/types"
import { cn } from "@/lib/utils"

// Example pre-filled script with highlighted blanks
const PREFILLED_SCRIPT = `저는 [초등학교] 때 자주 [돈]을 뺏겨봤습니다. 그때마다 너무 억울하고 분했죠.

그래서 저는 결심했습니다. 언젠가는 꼭 좋은 것을 만들어서 사람들에게 정당한 가격에 제공하겠다고요.

10년이 지난 지금, 드디어 그 약속을 지킬 수 있게 되었습니다.

이제 유통 마진 없이 [제주도 당근]을 직접 보내드리겠습니다.

저랑 지인 하실 분 [댓글] 달아주세요.`

// Parse script to highlight bracketed words
function parseScript(text: string) {
  const parts: Array<{ type: "text" | "highlight"; content: string }> = []
  const regex = /\[([^\]]+)\]/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: "highlight", content: `[${match[1]}]` })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) })
  }

  return parts
}

const stepKeys = ["step1", "step2", "step3", "step4", "step5", "step6", "step7", "step8", "step9"] as const
type StepKey = (typeof stepKeys)[number]

export default function CopywritePage() {
  const { t } = useLocale()
  const { libraryCards } = useAppContext()

  const [selectedCard, setSelectedCard] = useState<ContentCard | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)

  // Form state - step1 is pre-filled
  const [values, setValues] = useState<Record<StepKey, string>>({
    step1: PREFILLED_SCRIPT,
    step2: "",
    step3: "",
    step4: "",
    step5: "",
    step6: "",
    step7: "",
    step8: "",
    step9: "",
  })
  const [expanded, setExpanded] = useState<Set<StepKey>>(new Set(["step1"]))

  const steps: Array<{ key: StepKey; title: string; desc: string }> = [
    { key: "step1", title: t.creationStep1Title, desc: "원본 대본이 로드되었습니다. 하이라이트 된 단어를 대표님의 아이템으로 수정해 보세요!" },
    { key: "step2", title: t.creationStep2Title, desc: t.creationStep2Desc },
    { key: "step3", title: t.creationStep3Title, desc: t.creationStep3Desc },
    { key: "step4", title: t.creationStep4Title, desc: t.creationStep4Desc },
    { key: "step5", title: t.creationStep5Title, desc: t.creationStep5Desc },
    { key: "step6", title: t.creationStep6Title, desc: t.creationStep6Desc },
    { key: "step7", title: t.creationStep7Title, desc: t.creationStep7Desc },
    { key: "step8", title: t.creationStep8Title, desc: t.creationStep8Desc },
    { key: "step9", title: t.creationStep9Title, desc: t.creationStep9Desc },
  ]

  const frames = selectedCard?.frames ?? Array.from({ length: 15 }, (_, i) => ({ id: `f${i + 1}`, label: `프레임 ${i + 1}` }))
  const totalFrames = frames.length

  function toggleExpand(key: StepKey) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function handleChange(key: StepKey, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSelect(card: ContentCard) {
    setSelectedCard(card)
    setFrameIndex(0)
  }

  const filledCount = stepKeys.filter((k) => values[k].trim().length > 0).length
  const parsedStep1 = parseScript(values.step1)

  return (
    <div className="flex h-full flex-col px-4 py-6 lg:h-[calc(100vh-3.5rem)]">
      {/* Title */}
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-balance">따라쓰기 모드</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          레퍼런스의 원본 대본을 불러와, 빈칸만 내 아이템으로 바꿔 가장 쉽게 기획안을 완성하세요.
        </p>
      </div>

      {/* 2-column grid: 40% left, 60% right */}
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto lg:min-h-0 lg:grid-cols-5 lg:overflow-hidden">
        {/* Left: Reference Card (40%) */}
        <div className="min-h-[400px] overflow-hidden lg:col-span-2 lg:min-h-0">
          {selectedCard ? (
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">레퍼런스</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {selectedCard.platform}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setPickerOpen(true)}>
                  카드 변경
                </Button>
              </div>

              {/* Frame viewer */}
              <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-slate-900/50 p-4">
                <div
                  className="relative aspect-[9/16] w-full max-w-xs overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-900"
                >
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    {frames[frameIndex]?.label ?? `프레임 ${frameIndex + 1}`}
                  </div>
                  {/* Frame counter */}
                  <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                    {frameIndex + 1}/{totalFrames}
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  type="button"
                  onClick={() => setFrameIndex((i) => Math.max(0, i - 1))}
                  disabled={frameIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white/80 transition-colors hover:bg-black/60 disabled:opacity-30"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setFrameIndex((i) => Math.min(totalFrames - 1, i + 1))}
                  disabled={frameIndex === totalFrames - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white/80 transition-colors hover:bg-black/60 disabled:opacity-30"
                >
                  <ChevronRight className="size-5" />
                </button>

                {/* Dots */}
                <div className="mt-4 flex gap-1">
                  {frames.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFrameIndex(i)}
                      className={cn(
                        "size-1.5 rounded-full transition-colors",
                        i === frameIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Card info */}
              <div className="shrink-0 border-t border-border/40 px-4 py-3">
                <h3 className="text-sm font-semibold">{selectedCard.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{selectedCard.date}</p>
              </div>
            </div>
          ) : (
            /* Empty slot */
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/50">
              <div className="flex items-center gap-2 border-b border-dashed border-border/40 px-4 py-2">
                <span className="text-xs font-semibold text-muted-foreground">레퍼런스</span>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="group flex flex-1 flex-col items-center justify-center gap-3 transition-colors hover:bg-accent/30"
              >
                <div className="flex size-14 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 transition-all group-hover:border-primary group-hover:bg-primary/10">
                  <Plus className="size-6 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    카드를 선택해주세요
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    보관함에서 따라 쓸 레퍼런스 선택
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Right: Creation Card with pre-filled script (60%) */}
        <div className="relative flex min-h-[500px] flex-col overflow-hidden lg:col-span-3 lg:min-h-0">
          <div className="flex h-full max-h-full flex-col overflow-hidden rounded-xl border border-primary/30 bg-card">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">Creation Card</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {filledCount}/{stepKeys.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <Save className="mr-1 size-3" />
                  저장하기
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <FolderOpen className="mr-1 size-3" />
                  불러오기
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <Download className="mr-1 size-3" />
                  내보내기
                </Button>
              </div>
            </div>

            {/* Scrollable step list with custom scrollbar */}
            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.1) transparent",
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
              <div className="flex flex-col pb-24">
                {steps.map(({ key, title, desc }, i) => {
                  const isOpen = expanded.has(key)
                  const hasContent = values[key].trim().length > 0
                  const isStep1 = key === "step1"

                  return (
                    <div key={key} className="border-b border-border/50 last:border-b-0">
                      {/* Step header */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(key)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50",
                          isOpen && "bg-accent/30"
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                            hasContent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-medium text-foreground">{title}</span>
                          {!isOpen && hasContent && (
                            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                              {values[key].slice(0, 50)}...
                            </p>
                          )}
                        </div>
                        <ChevronDown
                          className={cn(
                            "size-3.5 shrink-0 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Collapsible body */}
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1">
                          <p className={cn(
                            "mb-3 text-[11px] leading-relaxed",
                            isStep1 ? "text-primary" : "text-muted-foreground"
                          )}>
                            {desc}
                          </p>

                          {isStep1 ? (
                            /* Step 1: Show highlighted preview + editable textarea */
                            <div className="space-y-3">
                              {/* Highlighted preview */}
                              <div className="rounded-lg border border-border/40 bg-muted/30 p-3">
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  {parsedStep1.map((part, idx) =>
                                    part.type === "highlight" ? (
                                      <span key={idx} className="font-semibold text-primary">
                                        {part.content}
                                      </span>
                                    ) : (
                                      <span key={idx}>{part.content}</span>
                                    )
                                  )}
                                </p>
                              </div>

                              {/* Editable textarea */}
                              <Textarea
                                value={values[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                                placeholder="대괄호 안의 단어를 내 아이템으로 수정하세요..."
                                className="min-h-[150px] resize-none text-xs leading-relaxed"
                              />
                            </div>
                          ) : (
                            <Textarea
                              value={values[key]}
                              onChange={(e) => handleChange(key, e.target.value)}
                              placeholder={t.creationPlaceholder}
                              className="min-h-[100px] resize-none text-xs leading-relaxed"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sticky CTA Button */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-4 pt-8">
            <Button
              size="lg"
              className="w-full gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <Sparkles className="size-4" />
              내 대본으로 완성 및 저장
            </Button>
          </div>
        </div>
      </div>

      {/* Library Picker Dialog */}
      <LibraryPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        cards={libraryCards}
        onSelect={handleSelect}
        slotLabel="레퍼런스"
      />
    </div>
  )
}
