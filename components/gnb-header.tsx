"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useLocale } from "@/lib/locale-context"

export function GnbHeader() {
  const { t } = useLocale()

  return (
    <header className="flex h-14 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center font-[family-name:var(--font-montserrat)] text-sm font-light tracking-[0.4em] text-muted-foreground">
        <span>MOZ</span>
        <span className="font-medium text-[#9B4DCA]">AI</span>
        <span>C</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Language</span>
        <LanguageSelector />
      </div>
    </header>
  )
}
