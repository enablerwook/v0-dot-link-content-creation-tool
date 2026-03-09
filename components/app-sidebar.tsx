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
  MessageSquare,
  PenLine,
  Settings,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useLocale } from "@/lib/locale-context"
import type { TranslationStrings } from "@/lib/locale-context"

type NavKey = "home" | "analysis" | "library" | "synapse" | "interview" | "copywrite" | "explorer" | "featureRequest" | "subscribe" | "settings"

type NavItem = { key: NavKey; href: string; icon: typeof Home }

// Home (standalone)
const homeItem: NavItem = { key: "home", href: "/", icon: Home }

// Reference Discovery
const referenceItems: NavItem[] = [
  { key: "explorer", href: "/explorer", icon: Compass },
  { key: "analysis", href: "/analysis", icon: FlaskConical },
]

// Content Creation
const creationItems: NavItem[] = [
  { key: "copywrite", href: "/copywrite", icon: PenLine },
  { key: "interview", href: "/interview", icon: MessageSquare },
  { key: "synapse", href: "/synapse", icon: Zap },
]

// My Workspace
const workspaceItems: NavItem[] = [
  { key: "library", href: "/library", icon: FolderOpen },
]

// Support & Settings
const supportItems: NavItem[] = [
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
      const fallback: Record<NavKey, string> = {
        home: "홈",
        analysis: "분석",
        library: "보관함",
        explorer: "탐색",
        copywrite: "따라쓰기 모드",
        interview: "인터뷰 모드",
        synapse: "조합 모드",
        featureRequest: "기능 요청",
        subscribe: "구독",
        settings: "설정",
      }
      return fallback[key]
    }
    return t[key]
  }

  const renderNavItem = (item: NavItem) => (
    <SidebarMenuItem key={item.href}>
      <SidebarMenuButton
        asChild
        isActive={pathname === item.href}
        tooltip={getLabel(item.key)}
        className="text-sidebar-foreground/90 hover:bg-white/20 hover:text-sidebar-foreground data-[active=true]:bg-white/25 data-[active=true]:text-sidebar-foreground data-[active=true]:font-semibold"
      >
        <Link href={item.href}>
          <item.icon className="opacity-80" />
          <span>{getLabel(item.key)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
      {children}
    </p>
  )

  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon"
      className="border-r-0 [&_[data-slot=sidebar-inner]]:bg-gradient-to-b [&_[data-slot=sidebar-inner]]:from-[#E8A598] [&_[data-slot=sidebar-inner]]:via-[#D4847A] [&_[data-slot=sidebar-inner]]:to-[#C27066]"
    >
      <SidebarHeader className="px-4 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/25 text-sidebar-foreground shadow-sm backdrop-blur-sm">
            <Zap className="size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            DotLink
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home - standalone */}
              {renderNavItem(homeItem)}

              {/* Reference Discovery */}
              <SectionLabel>레퍼런스 발굴</SectionLabel>
              {referenceItems.map(renderNavItem)}

              {/* Content Creation */}
              <SectionLabel>콘텐츠 제작</SectionLabel>
              {creationItems.map(renderNavItem)}

              {/* My Workspace */}
              <SectionLabel>내 작업실</SectionLabel>
              {workspaceItems.map(renderNavItem)}

              {/* Support & Settings */}
              <SectionLabel>지원 및 설정</SectionLabel>
              {supportItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4 group-data-[collapsible=icon]:hidden">
        <p className="text-xs font-medium text-sidebar-foreground/50">DotLink v0.1 Beta</p>
      </SidebarFooter>
    </Sidebar>
  )
}
