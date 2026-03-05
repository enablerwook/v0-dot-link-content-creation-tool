"use client"

import { useState } from "react"
import { useAppContext } from "@/lib/app-context"
import { useLocale } from "@/lib/locale-context"
import { ComparisonCard } from "@/components/synapse/comparison-card"
import { CreationCard } from "@/components/synapse/creation-card"
import { LibraryPickerDialog } from "@/components/synapse/library-picker-dialog"
import { EmptyCardSlot } from "@/components/synapse/empty-card-slot"
import type { ContentCard } from "@/lib/types"

export default function SynapsePage() {
  const { t } = useLocale()
  const { selectedCardA, libraryCards } = useAppContext()

  const [slotA, setSlotA] = useState<ContentCard | null>(selectedCardA)
  const [slotB, setSlotB] = useState<ContentCard | null>(null)
  const [pickerSlot, setPickerSlot] = useState<"A" | "B" | null>(null)

  function openPicker(slot: "A" | "B") {
    setPickerSlot(slot)
  }

  function handleSelect(card: ContentCard) {
    if (pickerSlot === "A") {
      setSlotA(card)
      if (slotB?.id === card.id) setSlotB(null)
    } else {
      setSlotB(card)
      if (slotA?.id === card.id) setSlotA(null)
    }
  }

  return (
    <div className="flex h-full flex-col px-4 py-6" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* Title */}
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          {t.synapseTitle}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.synapseDesc}</p>
      </div>

      {/* 3-column grid */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-3">
        {/* Card A */}
        <div className="min-h-0 overflow-hidden">
          {slotA ? (
            <ComparisonCard
              card={slotA}
              label="Card A"
              onChangeCard={() => openPicker("A")}
              changeLabel={t.synapseChangeCard}
            />
          ) : (
            <EmptyCardSlot label="Card A" onClick={() => openPicker("A")} />
          )}
        </div>

        {/* Card B */}
        <div className="min-h-0 overflow-hidden">
          {slotB ? (
            <ComparisonCard
              card={slotB}
              label="Card B"
              onChangeCard={() => openPicker("B")}
              changeLabel={t.synapseChangeCard}
            />
          ) : (
            <EmptyCardSlot label="Card B" onClick={() => openPicker("B")} />
          )}
        </div>

        {/* Creation Card */}
        <div className="min-h-0 overflow-hidden">
          <CreationCard />
        </div>
      </div>

      {/* Library Picker Dialog */}
      <LibraryPickerDialog
        open={pickerSlot !== null}
        onOpenChange={(open: boolean) => {
          if (!open) setPickerSlot(null)
        }}
        cards={libraryCards}
        onSelect={handleSelect}
        excludeCardId={pickerSlot === "A" ? slotB?.id : slotA?.id}
        slotLabel={pickerSlot === "A" ? "Card A" : "Card B"}
      />
    </div>
  )
}
