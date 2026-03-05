"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { cn } from "@/lib/utils"

const stepKeys = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
  "step6",
  "step7",
  "step8",
  "step9",
] as const

type StepKey = (typeof stepKeys)[number]

export function CreationCard() {
  const { t } = useLocale()
  const steps: { key: StepKey; title: string; desc: string }[] = [
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

  // Track which steps are expanded (step1 open by default)
  const [expanded, setExpanded] = useState<Set<StepKey>>(new Set(["step1"]))

  function toggleExpand(key: StepKey) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  function handleChange(key: StepKey, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const filledCount = stepKeys.filter((k) => values[k].trim().length > 0).length

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden rounded-xl border border-primary/30 bg-card">
      {/* Header - fixed at top */}
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary">Creation Card</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            {filledCount}/{stepKeys.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          <Download className="mr-1 size-3" />
          {t.creationExport}
        </Button>
      </div>

      {/* Scrollable step list */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40">
        <div className="flex flex-col">
          {steps.map(({ key, title, desc }, i) => {
            const isOpen = expanded.has(key)
            const hasContent = values[key].trim().length > 0

            return (
              <div key={key} className="border-b border-border/50 last:border-b-0">
                {/* Step header - always visible */}
                <button
                  type="button"
                  onClick={() => toggleExpand(key)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50",
                    isOpen && "bg-accent/30",
                  )}
                >
                  {/* Step number badge */}
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                      hasContent
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>

                  {/* Title and preview */}
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-foreground">{title}</span>
                    {!isOpen && hasContent && (
                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                        {values[key]}
                      </p>
                    )}
                  </div>

                  {/* Expand icon */}
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
                    <Textarea
                      value={values[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder={t.creationPlaceholder}
                      className="min-h-[100px] resize-none text-xs leading-relaxed"
                    />
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
