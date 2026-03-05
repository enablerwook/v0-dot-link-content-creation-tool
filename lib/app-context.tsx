"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { ContentCard } from "@/lib/types"

interface AppContextType {
  selectedCardA: ContentCard | null
  setSelectedCardA: (card: ContentCard | null) => void
  libraryCards: ContentCard[]
  addCardToLibrary: (card: ContentCard) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useAppContext must be used within AppProvider")
  return ctx
}

export function AppProvider({
  children,
  initialCards,
}: {
  children: ReactNode
  initialCards: ContentCard[]
}) {
  const [selectedCardA, setSelectedCardA] = useState<ContentCard | null>(null)
  const [libraryCards, setLibraryCards] = useState<ContentCard[]>(initialCards)

  const addCardToLibrary = useCallback((card: ContentCard) => {
    setLibraryCards((prev) => {
      if (prev.some((c) => c.id === card.id)) return prev
      return [...prev, card]
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        selectedCardA,
        setSelectedCardA,
        libraryCards,
        addCardToLibrary,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
