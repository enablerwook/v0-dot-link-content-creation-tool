"use client"

import { useState } from "react"
import { Clipboard, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/lib/locale-context"
import type { Platform } from "@/lib/types"

const platforms: { value: Platform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
]

export function UrlInput({
  onAnalyze,
  isLoading,
}: {
  onAnalyze: (url: string, platform: Platform) => void
  isLoading: boolean
}) {
  const { t } = useLocale()
  const [url, setUrl] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram")

  function detectPlatform(value: string) {
    if (value.includes("tiktok.com")) return "tiktok"
    if (value.includes("youtube.com") || value.includes("youtu.be")) return "youtube"
    return "instagram"
  }

  function handleUrlChange(value: string) {
    setUrl(value)
    setSelectedPlatform(detectPlatform(value))
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      setSelectedPlatform(detectPlatform(text))
    } catch {
      // clipboard access denied
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Input
            placeholder={t.analysisPlaceholder}
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && url.trim() && !isLoading) {
                onAnalyze(url, selectedPlatform)
              }
            }}
            className="h-11 pr-10"
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="붙여넣기"
          >
            <Clipboard className="size-4" />
          </button>
        </div>
        <Button
          size="lg"
          onClick={() => onAnalyze(url, selectedPlatform)}
          disabled={!url.trim() || isLoading}
          className="h-11 shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {t.analysisLoading}
            </>
          ) : (
            t.analysisButton
          )}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{t.analysisPlatform}</span>
        {platforms.map((p) => (
          <Badge
            key={p.value}
            variant={selectedPlatform === p.value ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedPlatform(p.value)}
          >
            {p.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}
