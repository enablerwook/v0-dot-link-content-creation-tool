"use client"

import { useState } from "react"
import { UrlInput } from "@/components/analysis/url-input"
import { AnalysisResults } from "@/components/analysis/analysis-results"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Check } from "lucide-react"
import { mockContentCards } from "@/lib/mock-data"
import { useLocale } from "@/lib/locale-context"
import type { AnalysisResult, ContentCard, Platform } from "@/lib/types"

export default function AnalysisPage() {
  const { t } = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ContentCard | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  function handleUpdateAnalysis(analysis: AnalysisResult) {
    if (result) {
      setResult({ ...result, analysis })
    }
  }

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
        <h1 className="text-2xl font-bold tracking-tight">{t.analysisTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.analysisDesc}
        </p>
      </div>

      <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">{t.analysisAnalyzing}</p>
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
              variant={isSaved ? "secondary" : "default"}
              size="sm"
              onClick={() => setIsSaved(true)}
              disabled={isSaved}
            >
              {isSaved ? (
                <>
                  <Check className="mr-1 size-4" />
                  {t.analysisSaved}
                </>
              ) : (
                <>
                  <FolderPlus className="mr-1 size-4" />
                  {t.analysisSaveToLibrary}
                </>
              )}
            </Button>
          </div>
          <AnalysisResults card={result} onUpdate={handleUpdateAnalysis} />
        </div>
      )}
    </div>
  )
}
