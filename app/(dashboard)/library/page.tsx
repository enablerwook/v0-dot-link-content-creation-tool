"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ContentCardComponent } from "@/components/library/content-card"
import { CreationCardList } from "@/components/library/creation-card-list"
import { CardDetailModal } from "@/components/library/card-detail-modal"
import { useAppContext } from "@/lib/app-context"
import { useLocale } from "@/lib/locale-context"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FlaskConical, Zap } from "lucide-react"
import type { ContentCard } from "@/lib/types"

export default function LibraryPage() {
  const { t } = useLocale()
  const { libraryCards, setSelectedCardA } = useAppContext()
  const router = useRouter()

  const [expandedCard, setExpandedCard] = useState<ContentCard | null>(null)

  function handleSynapseClick(card: ContentCard) {
    setSelectedCardA(card)
    router.push("/synapse")
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{t.libraryTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.libraryDesc}
        </p>
      </div>

      <Tabs defaultValue="analysis" className="gap-4">
        <TabsList>
          <TabsTrigger value="analysis" className="gap-1.5 px-4">
            <FlaskConical className="size-3.5" />
            분석 카드
          </TabsTrigger>
          <TabsTrigger value="creation" className="gap-1.5 px-4">
            <Zap className="size-3.5" />
            크리에이션 카드
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {libraryCards.map((card) => (
              <ContentCardComponent
                key={card.id}
                card={card}
                onSynapseClick={handleSynapseClick}
                onExpandClick={(c) => setExpandedCard(c)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creation">
          <CreationCardList />
        </TabsContent>
      </Tabs>

      {/* "크게 보기" full modal */}
      <CardDetailModal
        card={expandedCard}
        open={!!expandedCard}
        onOpenChange={(open) => { if (!open) setExpandedCard(null) }}
      />
    </div>
  )
}
