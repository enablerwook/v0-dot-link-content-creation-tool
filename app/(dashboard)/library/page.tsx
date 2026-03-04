"use client"

import { useRouter } from "next/navigation"
import { ContentCardComponent } from "@/components/library/content-card"
import { useAppContext } from "@/lib/app-context"
import { useLocale } from "@/lib/locale-context"
import type { ContentCard } from "@/lib/types"

export default function LibraryPage() {
  const { t } = useLocale()
  const { libraryCards, setSelectedCardA } = useAppContext()
  const router = useRouter()

  function handleSynapseClick(card: ContentCard) {
    setSelectedCardA(card)
    router.push("/synapse")
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{t.libraryTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.libraryDesc}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {libraryCards.map((card) => (
          <ContentCardComponent
            key={card.id}
            card={card}
            onSynapseClick={handleSynapseClick}
          />
        ))}
      </div>
    </div>
  )
}
