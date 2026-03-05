"use client"

import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown, X, ImageIcon, Save, FolderOpen } from "lucide-react"
import { toast } from "sonner"
import { useLocale } from "@/lib/locale-context"
import { cn } from "@/lib/utils"

const stepKeys = [
  "step1", "step2", "step3", "step4", "step5",
  "step6", "step7", "step8", "step9",
] as const

type StepKey = (typeof stepKeys)[number]

/** Steps that support frame drag-and-drop */
const DROP_ENABLED_STEPS = new Set<StepKey>(["step4", "step8"])

const STORAGE_KEY = "dotlink-creation-save"

interface DroppedFrame {
  id: string
  gradient: string
  label: string
  sourceCard: string
}

export function CreationCard() {
  const { t } = useLocale()

  const steps: Array<{ key: StepKey; title: string; desc: string }> = [
    { key: "step1", title: t.creationStep1Title, desc: t.creationStep1Desc },
    { key: "step2", title: t.creationStep2Title, desc: t.creationStep2Desc },
    { key: "step3", title: t.creationStep3Title, desc: t.creationStep3Desc },
    { key: "step4", title: t.creationStep4Title, desc: t.creationStep4Desc },
    { key: "step5", title: t.creationStep5Title, desc: t.creationStep5Desc },
    { key: "step6", title: t.creationStep6Title, desc: t.creationStep6Desc },
    { key: "step7", title: t.creationStep7Title, desc: t.creationStep7Desc },
    { key: "step8", title: t.creationStep8Title, desc: t.creationStep8Desc },
    { key: "step9", title: t.creationStep9Title, desc: t.creationStep9Desc },
  ]

  const [values, setValues] = useState<Record<StepKey, string>>(
    Object.fromEntries(stepKeys.map((k) => [k, ""])) as Record<StepKey, string>,
  )
  const [expanded, setExpanded] = useState<Set<StepKey>>(new Set(["step1"]))
  const [droppedFrames, setDroppedFrames] = useState<Record<string, DroppedFrame[]>>({
    step4: [],
    step8: [],
  })
  const [dragOverStep, setDragOverStep] = useState<StepKey | null>(null)

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

  const handleDragOver = useCallback((e: React.DragEvent, key: StepKey) => {
    if (!e.dataTransfer.types.includes("application/x-dotlink-frame")) return
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setDragOverStep(key)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverStep(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, key: StepKey) => {
    e.preventDefault()
    setDragOverStep(null)
    const raw = e.dataTransfer.getData("application/x-dotlink-frame")
    if (!raw) return
    try {
      const frame: DroppedFrame = JSON.parse(raw)
      setDroppedFrames((prev) => {
        const existing = prev[key] ?? []
        // Prevent duplicates
        if (existing.some((f) => f.id === frame.id)) return prev
        return { ...prev, [key]: [...existing, frame] }
      })
    } catch {
      // ignore malformed data
    }
  }, [])

  function removeFrame(key: StepKey, frameId: string) {
    setDroppedFrames((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((f) => f.id !== frameId),
    }))
  }

  const filledCount = stepKeys.filter(
    (k) => values[k].trim().length > 0 || (droppedFrames[k]?.length ?? 0) > 0,
  ).length

  function handleSave() {
    try {
      const data = { values, droppedFrames }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      toast.success(t.creationSaveSuccess)
    } catch {
      toast.error("Save failed")
    }
  }

  function handleLoad() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        toast.warning(t.creationLoadEmpty)
        return
      }
      const data = JSON.parse(raw) as {
        values?: Record<StepKey, string>
        droppedFrames?: Record<string, DroppedFrame[]>
      }
      if (data.values) setValues(data.values)
      if (data.droppedFrames) setDroppedFrames(data.droppedFrames)
      toast.success(t.creationLoadSuccess)
    } catch {
      toast.error("Load failed")
    }
  }

  return (
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
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={handleSave}>
            <Save className="mr-1 size-3" />
            {t.creationSave}
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleLoad}>
            <FolderOpen className="mr-1 size-3" />
            {t.creationLoad}
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            <Download className="mr-1 size-3" />
            {t.creationExport}
          </Button>
        </div>
      </div>

      {/* Scrollable step list */}
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "hsl(var(--border)) transparent",
        }}
      >
        <div className="flex flex-col">
          {steps.map(({ key, title, desc }, i) => {
            const isOpen = expanded.has(key)
            const hasContent = values[key].trim().length > 0
            const hasDropZone = DROP_ENABLED_STEPS.has(key)
            const frames = droppedFrames[key] ?? []
            const isDragOver = dragOverStep === key

            return (
              <div key={key} className="border-b border-border/50 last:border-b-0">
                {/* Step header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(key)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50",
                    isOpen && "bg-accent/30",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                      hasContent || frames.length > 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-foreground">{title}</span>
                    {!isOpen && hasContent && (
                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                        {values[key]}
                      </p>
                    )}
                    {!isOpen && !hasContent && frames.length > 0 && (
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {frames.length} frame{frames.length > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-3.5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Collapsible body */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-1">
                    <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                    {/* Hide textarea for step4 (visual-only drop zone) */}
                    {key !== "step4" && (
                      <Textarea
                        value={values[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={t.creationPlaceholder}
                        className="min-h-[100px] resize-none text-xs leading-relaxed"
                      />
                    )}

                    {/* Drop zone for step4 & step8 */}
                    {hasDropZone && (
                      <div
                        onDragOver={(e) => handleDragOver(e, key)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, key)}
                        className={cn(
                          "mt-3 rounded-lg border-2 border-dashed p-3 transition-colors",
                          isDragOver
                            ? "border-primary bg-primary/10"
                            : "border-border/60 bg-muted/30",
                        )}
                      >
                        {/* Dropped thumbnails - horizontal scroll */}
                        {frames.length > 0 && (
                          <div className="mb-2 flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50" style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(var(--border)) hsl(0 0% 0% / 0.2)" }}>
                            {frames.map((frame) => (
                              <div key={frame.id} className="group/thumb relative shrink-0">
                                <div
                                  className={cn(
                                    "h-28 rounded-md bg-gradient-to-br object-cover",
                                    frame.gradient,
                                  )}
                                  style={{ aspectRatio: "9/16" }}
                                  title={`${frame.sourceCard} - ${frame.label}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFrame(key, frame.id)}
                                  className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover/thumb:opacity-100"
                                  aria-label="Remove frame"
                                >
                                  <X className="size-2.5" />
                                </button>
                                <p className="mt-1 w-full truncate text-center text-[8px] text-muted-foreground" style={{ maxWidth: "calc(28 * 9 / 16 * 0.25rem)" }}>
                                  {frame.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Hint text */}
                        <div
                          className={cn(
                            "flex items-center justify-center gap-1.5 py-2",
                            isDragOver ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          <ImageIcon className="size-3.5" />
                          <span className="text-[11px]">{t.creationDropHint}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
