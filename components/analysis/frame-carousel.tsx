"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FrameData } from "@/lib/types"

export function FrameCarousel({ frames }: { frames: FrameData[] }) {
  const [current, setCurrent] = useState(0)

  function prev() {
    setCurrent((c) => (c === 0 ? frames.length - 1 : c - 1))
  }

  function next() {
    setCurrent((c) => (c === frames.length - 1 ? 0 : c + 1))
  }

  return (
    <div className="flex w-[200px] flex-col gap-2">
      <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "9/12" }}>
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            frames[current].gradient,
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-foreground/70">
            {frames[current].label}
          </span>
        </div>
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1 hover:bg-background/80"
          aria-label="이전 프레임"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1 hover:bg-background/80"
          aria-label="다음 프레임"
        >
          <ChevronRight className="size-4" />
        </button>
        <div className="absolute bottom-2 right-2 rounded bg-background/60 px-2 py-0.5 text-xs">
          {current + 1}/{frames.length}
        </div>
      </div>
      {/* Thumbnail strip */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {frames.map((frame, i) => (
          <button
            key={frame.id}
            onClick={() => setCurrent(i)}
            className={cn(
              "size-10 shrink-0 rounded bg-gradient-to-br transition-all",
              frame.gradient,
              i === current
                ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                : "opacity-50 hover:opacity-80",
            )}
            aria-label={`프레임 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
