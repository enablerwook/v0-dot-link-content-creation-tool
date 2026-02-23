"use client"

import { useState } from "react"
import { UrlInput } from "@/components/analysis/url-input"
import { AnalysisResults } from "@/components/analysis/analysis-results"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Check } from "lucide-react"
import { mockContentCards } from "@/lib/mock-data"
import type { ContentCard, Platform } from "@/lib/types"

export default function AnalysisPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ContentCard | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  function handleAnalyze(_url: string, _platform: Platform) {
    setIsLoading(true)
    setResult(null)
    setIsSaved(false)

    // Simulate analysis delay, then return mock data
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockContentCards.length)
      setResult(mockContentCards[randomIndex])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">DNA 분석</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          숏폼 콘텐츠의 URL을 입력하면 9가지 DNA 요소를 분석합니다.
        </p>
      </div>

      <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">콘텐츠 DNA를 분석하고 있습니다...</p>
        </div>
      )}

      {result && !isLoading && (
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{result.title}</h2>
              <Badge variant="outline" className="capitalize">
                {result.platform}
              </Badge>
            </div>
            <Button
              variant={isSaved ? "secondary" : "outline"}
              size="sm"
              onClick={() => setIsSaved(true)}
              disabled={isSaved}
            >
              {isSaved ? (
                <>
                  <Check className="mr-1 size-4" />
                  저장됨
                </>
              ) : (
                <>
                  <FolderPlus className="mr-1 size-4" />
                  라이브러리에 저장
                </>
              )}
            </Button>
          </div>
          <AnalysisResults card={result} />
        </div>
      )}
    </div>
  )
}
