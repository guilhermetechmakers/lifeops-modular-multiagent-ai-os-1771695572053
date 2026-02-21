import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Bot,
  FolderKanban,
  FileText,
  DollarSign,
  Heart,
  Clock,
  Workflow,
  CheckSquare,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  BookOpen,
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const navGroups = [
  {
    label: 'Overview',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/dashboard/agents', label: 'Agents', icon: Bot },
    ],
  },
  {
    label: 'Modules',
    items: [
      { path: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
      { path: '/dashboard/content', label: 'Content', icon: FileText },
      { path: '/dashboard/finance', label: 'Finance', icon: DollarSign },
      { path: '/dashboard/health', label: 'Health', icon: Heart },
    ],
  },
  {
    label: 'Automation',
    items: [
      { path: '/dashboard/cronjobs', label: 'Cronjobs', icon: Clock },
      { path: '/dashboard/workflows', label: 'Workflows', icon: Workflow },
      { path: '/dashboard/approvals', label: 'Approvals', icon: CheckSquare },
    ],
  },
  {
    label: 'System',
    items: [
      { path: '/dashboard/integrations', label: 'Integrations', icon: Plug },
      { path: '/dashboard/admin', label: 'Admin', icon: Shield },
      { path: '/dashboard/docs', label: 'Docs', icon: BookOpen },
      { path: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        isCollapsed ? 'w-[68px]' : 'w-[260px]'
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">LifeOps</span>
          </Link>
        )}
        {isCollapsed && (
          <Link to="/dashboard" className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </Link>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!isCollapsed && (
              <p className="mb-2 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5 px-2">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-sidebar-accent text-primary'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                      isCollapsed && 'justify-center px-2'
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <Icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                    {isCollapsed && hoveredItem === item.path && (
                      <div className="absolute left-full ml-2 z-50 rounded-lg bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-lg border border-border whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  )
}

export { Sidebar }
