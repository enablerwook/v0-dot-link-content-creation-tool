"use client"

import { useState, useMemo } from "react"
import { useAppContext } from "@/lib/app-context"
import { useLocale } from "@/lib/locale-context"
import { ComparisonCard } from "@/components/synapse/comparison-card"
import { CardStack } from "@/components/synapse/card-stack"
import { CreationCard } from "@/components/synapse/creation-card"

export default function SynapsePage() {
  const { t } = useLocale()
  const { selectedCardA, libraryCards } = useAppContext()
  const [bIndex, setBIndex] = useState(0)

  // Card A: either selected from library or fall back to first card
  const cardA = selectedCardA ?? libraryCards[0]

  // Cards for B slot: all cards except A
  const bCards = useMemo(
    () => libraryCards.filter((c) => c.id !== cardA?.id),
    [libraryCards, cardA],
  )

  function handlePrevB() {
    setBIndex((i) => (i === 0 ? bCards.length - 1 : i - 1))
  }

  function handleNextB() {
    setBIndex((i) => (i === bCards.length - 1 ? 0 : i + 1))
  }

  if (!cardA || bCards.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold">{t.synapseNeedContent}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.synapseNeedContentDesc}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{t.synapseTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.synapseDesc}
        </p>
      </div>

      <div className="grid flex-1 gap-4 overflow-hidden md:grid-cols-3" style={{ minHeight: 0 }}>
        {/* Card A */}
        <div className="min-h-0 overflow-hidden">
          <ComparisonCard card={cardA} label="Card A" />
        </div>

        {/* Card B (stacked) */}
        <div className="relative min-h-0 overflow-hidden pb-4">
          <CardStack
            cards={bCards}
            currentIndex={bIndex}
            onPrev={handlePrevB}
            onNext={handleNextB}
          />
        </div>

        {/* Creation Card */}
        <div className="min-h-0 overflow-hidden">
          <CreationCard />
        </div>
      </div>
    </div>
  )
}
