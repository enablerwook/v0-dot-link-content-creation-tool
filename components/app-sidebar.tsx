"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Compass,
  CreditCard,
  FlaskConical,
  FolderOpen,
  Home,
  Lightbulb,
  Settings,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useLocale } from "@/lib/locale-context"
import type { TranslationStrings } from "@/lib/locale-context"

type NavKey = "home" | "analysis" | "library" | "synapse" | "explorer" | "featureRequest" | "subscribe" | "settings"

const navItems: { key: NavKey; href: string; icon: typeof Home }[] = [
  { key: "home", href: "/", icon: Home },
  { key: "analysis", href: "/analysis", icon: FlaskConical },
  { key: "library", href: "/library", icon: FolderOpen },
  { key: "synapse", href: "/synapse", icon: Zap },
  { key: "explorer", href: "/explorer", icon: Compass },
  { key: "featureRequest", href: "/feature-request", icon: Lightbulb },
  { key: "subscribe", href: "/subscribe", icon: CreditCard },
  { key: "settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  let t: TranslationStrings | null = null
  try {
    const locale = useLocale()
    t = locale.t
  } catch {
    // LocaleProvider not available (e.g. outside dashboard)
  }

  const getLabel = (key: NavKey): string => {
    if (!t) {
      // Fallback Korean labels when outside LocaleProvider
      const fallback: Record<NavKey, string> = {
        home: "홈",
        analysis: "분석",
        library: "라이브러리",
        synapse: "시냅스",
        explorer: "익스플로러",
        featureRequest: "기능 요청",
        subscribe: "구독",
        settings: "설정",
      }
      return fallback[key]
    }
    return t[key]
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </div>
          <span className="text-lg font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            DotLink
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t?.menu ?? "메뉴"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={getLabel(item.key)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{getLabel(item.key)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4 group-data-[collapsible=icon]:hidden">
        <p className="text-xs text-muted-foreground">DotLink v0.1 Beta</p>
      </SidebarFooter>
    </Sidebar>
  )
}
