import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppProvider } from "@/lib/app-context"
import { mockContentCards } from "@/lib/mock-data"
import { Separator } from "@/components/ui/separator"
import { GnbHeader } from "@/components/gnb-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider initialCards={mockContentCards}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <GnbHeader />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AppProvider>
  )
}
