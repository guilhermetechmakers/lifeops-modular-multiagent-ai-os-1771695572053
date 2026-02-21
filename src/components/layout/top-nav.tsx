import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  X,
} from 'lucide-react'

interface TopNavProps {
  sidebarCollapsed: boolean
}

function TopNav({ sidebarCollapsed }: TopNavProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 transition-all duration-300',
        sidebarCollapsed ? 'left-[68px]' : 'left-[260px]'
      )}
    >
      <div className="flex items-center gap-4">
        {isSearchOpen ? (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              placeholder="Search agents, runs, cronjobs..."
              className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button onClick={() => setIsSearchOpen(false)}>
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-input/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-input"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-8 rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/cronjobs"
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Quick Create</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen)
              setIsProfileOpen(false)
            }}
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <Badge variant="default">3 new</Badge>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'PR Triage completed', desc: 'Agent reviewed 12 pull requests', time: '5m ago', type: 'success' as const },
                  { title: 'Approval needed', desc: 'Monthly close requires review', time: '1h ago', type: 'warning' as const },
                  { title: 'Cronjob failed', desc: 'Content publish retry exhausted', time: '2h ago', type: 'destructive' as const },
                ].map((n, i) => (
                  <div key={i} className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
                    <div className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', {
                      'bg-success': n.type === 'success',
                      'bg-warning': n.type === 'warning',
                      'bg-destructive': n.type === 'destructive',
                    })} />
                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/dashboard/settings"
                className="mt-3 block text-center text-xs text-primary hover:underline"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen)
              setIsNotificationsOpen(false)
            }}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-muted"
          >
            <Avatar name="Alex Chen" size="sm" />
            <span className="hidden text-sm font-medium sm:inline">Alex Chen</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card py-2 shadow-lg">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium">Alex Chen</p>
                <p className="text-xs text-muted-foreground">alex@lifeops.ai</p>
              </div>
              {[
                { label: 'Profile', path: '/dashboard/profile' },
                { label: 'Organization', path: '/dashboard/organization' },
                { label: 'Settings', path: '/dashboard/settings' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border mt-1 pt-1">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-destructive transition-colors hover:bg-muted"
                >
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export { TopNav }
