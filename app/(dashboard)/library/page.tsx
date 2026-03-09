"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ContentCardComponent } from "@/components/library/content-card"
import { CreationCardList } from "@/components/library/creation-card-list"
import { CardDetailModal } from "@/components/library/card-detail-modal"
import { DataAnalysisCard } from "@/components/library/data-analysis-card"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-rose-50/30 to-sky-50/50 px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t.libraryTitle}</h1>
        <p className="mt-2 text-base text-muted-foreground">
          {t.libraryDesc}
        </p>
      </div>

      <Tabs defaultValue="analysis" className="gap-6">
        <TabsList className="h-11 rounded-xl bg-white/60 p-1 shadow-sm backdrop-blur-sm">
          <TabsTrigger value="analysis" className="gap-2 rounded-lg px-5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FlaskConical className="size-4" />
            분석 카드
          </TabsTrigger>
          <TabsTrigger value="creation" className="gap-2 rounded-lg px-5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Zap className="size-4" />
            크리에이션 카드
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-6">
          {/* Bento Box Masonry Grid */}
          <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Data Analysis Card - spans 2 rows */}
            {libraryCards[0] && (
              <div className="row-span-2 md:col-span-1 lg:col-span-1">
                <DataAnalysisCard 
                  card={libraryCards[0]} 
                  onExpandClick={(c) => setExpandedCard(c)}
                />
              </div>
            )}

            {/* Media Cards - tall vertical format */}
            {libraryCards.slice(1).map((card) => (
              <ContentCardComponent
                key={card.id}
                card={card}
                onSynapseClick={handleSynapseClick}
                onExpandClick={(c) => setExpandedCard(c)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creation" className="mt-6">
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
