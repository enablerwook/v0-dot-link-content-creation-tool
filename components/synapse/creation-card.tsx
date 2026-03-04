"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const fields = [
  { key: "script", label: "전체 스크립트(대본)" },
  { key: "contentType", label: "콘텐츠 유형" },
  { key: "hookVisual", label: "후킹 매력 요소" },
  { key: "caption", label: "캡션 분석" },
  { key: "storyboard", label: "연출 요소" },
  { key: "engagement", label: "인게이지먼트 장치" },
  { key: "salesPoints", label: "세일즈 포인트" },
  { key: "difficulty", label: "제작 난이도 메모" },
] as const

type FieldKey = (typeof fields)[number]["key"]

export function CreationCard() {
  const [values, setValues] = useState<Record<FieldKey, string>>(
    Object.fromEntries(fields.map((f) => [f.key, ""])) as Record<FieldKey, string>,
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
          내보내기
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
                placeholder={`${label}을(를) 작성하세요...`}
                className="min-h-[80px] resize-none text-xs"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
