"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Zap, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CreationSaveData } from "./creation-card-list"

const STEP_META = [
  { key: "step1", title: "스크립트 작성 (초안)" },
  { key: "step2", title: "콘텐츠 유형 정의" },
  { key: "step3", title: "후킹 매력 요소 (대사)" },
  { key: "step4", title: "후킹 매력 요소 (영상)" },
  { key: "step5", title: "인게이지먼트 유도 장치" },
  { key: "step6", title: "캡션 작성" },
  { key: "step7", title: "세일즈 포인트" },
  { key: "step8", title: "연출요소" },
  { key: "step9", title: "스크립트 (최종안)" },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function CreationDetailModal({
  creation,
  open,
  onOpenChange,
}: {
  creation: CreationSaveData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!creation) return null

  const filledCount = STEP_META.filter(
    ({ key }) =>
      (creation.values[key] ?? "").trim().length > 0 ||
      (creation.droppedFrames[key]?.length ?? 0) > 0,
  ).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl p-0" showCloseButton>
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-lg">기획안 상세</DialogTitle>
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Zap className="mr-1 size-3" />
              {filledCount}/9
            </Badge>
          </div>
          <DialogDescription className="text-xs">
            {formatDate(creation.savedAt)} 저장됨
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-6rem)]">
          <div className="flex flex-col gap-5 px-6 pb-6">
            {STEP_META.map(({ key, title }, i) => {
              const text = (creation.values[key] ?? "").trim()
              const frames = creation.droppedFrames[key] ?? []
              const hasContent = text.length > 0 || frames.length > 0

              return (
                <div key={key}>
                  {i > 0 && <Separator className="mb-5" />}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        hasContent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-sm font-semibold">{title}</h3>
                  </div>

                  {text ? (
                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap pl-8">
                      {text}
                    </p>
                  ) : frames.length === 0 ? (
                    <p className="text-sm text-muted-foreground/50 pl-8 italic">
                      작성된 내용이 없습니다
                    </p>
                  ) : null}

                  {/* Dropped frames */}
                  {frames.length > 0 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto pl-8 pb-1">
                      {frames.map((frame) => (
                        <div key={frame.id} className="shrink-0">
                          <div
                            className={cn(
                              "h-20 rounded-md bg-gradient-to-br",
                              frame.gradient,
                            )}
                            style={{ aspectRatio: "9/16" }}
                            title={`${frame.sourceCard} - ${frame.label}`}
                          />
                          <p className="mt-0.5 text-center text-[8px] text-muted-foreground">
                            {frame.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
