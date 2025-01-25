import Link from "next/link"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Leads
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Projects
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Teams
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            News
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Library
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Contacts
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Bell className="h-5 w-5" />
        <Button variant="outline" size="sm">
          Manage
        </Button>
      </div>
    </header>
  )
}

