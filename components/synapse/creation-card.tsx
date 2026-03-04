"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const fieldKeys = [
  "script",
  "contentType",
  "hookVisual",
  "caption",
  "storyboard",
  "engagement",
  "salesPoints",
  "difficulty",
] as const

type FieldKey = (typeof fieldKeys)[number]

export function CreationCard() {
  const { t } = useLocale()

  const fields: { key: FieldKey; label: string }[] = [
    { key: "script", label: t.creationScript },
    { key: "contentType", label: t.creationContentType },
    { key: "hookVisual", label: t.creationHook },
    { key: "caption", label: t.creationCaption },
    { key: "storyboard", label: t.creationDirection },
    { key: "engagement", label: t.creationEngagement },
    { key: "salesPoints", label: t.creationSalesPoints },
    { key: "difficulty", label: t.creationDifficulty },
  ]

  const [values, setValues] = useState<Record<FieldKey, string>>(
    Object.fromEntries(fieldKeys.map((f) => [f, ""])) as Record<FieldKey, string>,
  )

  function handleChange(key: FieldKey, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-primary/30 bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-xs font-semibold text-primary">Creation Card</span>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          <Download className="mr-1 size-3" />
          {t.creationExport}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {label}
              </label>
              <Textarea
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`${label}${t.creationPlaceholder}`}
                className="min-h-[80px] resize-none text-xs"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
