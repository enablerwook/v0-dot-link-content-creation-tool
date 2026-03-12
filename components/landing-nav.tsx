"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useLocale } from "@/lib/locale-context"

export function LandingNav() {
  const { t } = useLocale()

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <div className="flex items-center font-[family-name:var(--font-montserrat)] text-xl font-light tracking-[0.6em]">
            <span>MOZ</span>
            <span className="font-medium text-[#9B4DCA]">AI</span>
            <span>C</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Language</span>
          <LanguageSelector />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">{t.landingNavTrial}</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
