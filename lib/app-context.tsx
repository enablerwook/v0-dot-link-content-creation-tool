"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { ContentCard } from "@/lib/types"

interface AppContextType {
  selectedCardA: ContentCard | null
  setSelectedCardA: (card: ContentCard | null) => void
  libraryCards: ContentCard[]
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

  return (
    <AppContext.Provider
      value={{
        selectedCardA,
        setSelectedCardA,
        libraryCards: initialCards,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
