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

  // Slot A: pre-selected from library page or user picks from dialog
  const [slotA, setSlotA] = useState<ContentCard | null>(selectedCardA)
  // Slot B: always starts empty, user picks from dialog
  const [slotB, setSlotB] = useState<ContentCard | null>(null)

  // Dialog state
  const [pickerSlot, setPickerSlot] = useState<"A" | "B" | null>(null)

  function openPicker(slot: "A" | "B") {
    setPickerSlot(slot)
  }

  function handleSelect(card: ContentCard) {
    if (pickerSlot === "A") {
      setSlotA(card)
      // If B was the same card, clear B
      if (slotB?.id === card.id) setSlotB(null)
    } else {
      setSlotB(card)
      // If A was the same card, clear A
      if (slotA?.id === card.id) setSlotA(null)
    }
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          {t.synapseTitle}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.synapseDesc}</p>
      </div>

      <div
        className="grid flex-1 gap-4 overflow-hidden md:grid-cols-3"
        style={{ minHeight: 0 }}
      >
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
            <EmptyCardSlot
              label="Card A"
              onClick={() => openPicker("A")}
            />
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
            <EmptyCardSlot
              label="Card B"
              onClick={() => openPicker("B")}
            />
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
        onOpenChange={(open) => {
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
