import Link from "next/link"
import { Home, Search, Plus, BarChart, MessagesSquare, Bell, Settings, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="h-8 w-8 bg-primary rounded-lg" />
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Search className="h-5 w-5" />
              Search
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
            >
              <Plus className="h-5 w-5" />
              Create
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <BarChart className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <MessagesSquare className="h-5 w-5" />
              Messages
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              Notifications
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid gap-1">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <HelpCircle className="h-5 w-5" />
              Help
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

