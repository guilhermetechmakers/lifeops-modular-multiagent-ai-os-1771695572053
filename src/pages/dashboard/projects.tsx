import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/ui/metric-card'
import { cn } from '@/lib/utils'
import {
  FolderKanban,
  GitPullRequest,
  Rocket,
  Bug,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronRight,
  GitBranch,
  Plug,
} from 'lucide-react'

const tickets = [
  { id: 'LO-142', title: 'Implement agent memory persistence', status: 'in-progress', priority: 'high', assignee: 'PR Triage Agent', tags: ['backend', 'agents'] },
  { id: 'LO-141', title: 'Add webhook retry logic', status: 'todo', priority: 'medium', assignee: 'Unassigned', tags: ['backend'] },
  { id: 'LO-140', title: 'Dashboard chart animations', status: 'in-review', priority: 'low', assignee: 'Release Orchestrator', tags: ['frontend', 'ui'] },
  { id: 'LO-139', title: 'Fix cron timezone calculation', status: 'done', priority: 'high', assignee: 'PR Triage Agent', tags: ['backend', 'cron'] },
  { id: 'LO-138', title: 'Add RBAC policy editor', status: 'todo', priority: 'high', assignee: 'Unassigned', tags: ['security'] },
  { id: 'LO-137', title: 'Content module analytics', status: 'in-progress', priority: 'medium', assignee: 'Release Orchestrator', tags: ['frontend'] },
]

const pullRequests = [
  { id: '#234', title: 'feat: agent memory scoping', author: 'PR Triage Agent', status: 'open', reviews: 2, checks: 'passing' },
  { id: '#233', title: 'fix: cron next-run calculation', author: 'alex-chen', status: 'merged', reviews: 3, checks: 'passing' },
  { id: '#232', title: 'chore: update dependencies', author: 'dependabot', status: 'open', reviews: 0, checks: 'failing' },
]

const columns = ['todo', 'in-progress', 'in-review', 'done'] as const

function ProjectsPage() {
  const [activeView, setActiveView] = useState<'board' | 'timeline'>('board')

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Developer-centric automation for roadmaps, tickets, and CI</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground">
            <option>Project Alpha</option>
            <option>Project Beta</option>
            <option>LifeOps Core</option>
          </select>
          <Button>
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Open Tickets" value={14} change={-3} trend="down" icon={<Bug className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="PRs Open" value={5} change={2} trend="up" icon={<GitPullRequest className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Sprint Velocity" value="32 pts" change={8} trend="up" icon={<Rocket className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Agent Actions" value={67} change={15} trend="up" icon={<FolderKanban className="h-5 w-5" />} accentColor="default" />
      </div>

      <div className="flex items-center gap-2 border-b border-border">
        {['board', 'timeline'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as 'board' | 'timeline')}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize',
              activeView === view ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {view}
          </button>
        ))}
      </div>

      {activeView === 'board' && (
        <div className="grid gap-4 lg:grid-cols-4">
          {columns.map((col) => {
            const colTickets = tickets.filter((t) => t.status === col)
            return (
              <div key={col} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold capitalize">{col.replace('-', ' ')}</h3>
                    <Badge variant="outline" className="text-[10px]">{colTickets.length}</Badge>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {colTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-card-hover hover:border-border/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground font-mono">{ticket.id}</span>
                      <div className={cn('h-1.5 w-1.5 rounded-full', {
                        'bg-destructive': ticket.priority === 'high',
                        'bg-warning': ticket.priority === 'medium',
                        'bg-muted-foreground': ticket.priority === 'low',
                      })} />
                    </div>
                    <p className="text-sm font-medium mb-3">{ticket.title}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ticket.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{ticket.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {activeView === 'timeline' && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Roadmap Timeline</h3>
          <div className="space-y-4">
            {[
              { phase: 'Q1 2026', items: ['Agent Memory v2', 'Cronjob Templates', 'RBAC Policies'], status: 'current' },
              { phase: 'Q2 2026', items: ['Multi-tenant Support', 'SDK v2', 'Marketplace'], status: 'planned' },
              { phase: 'Q3 2026', items: ['On-prem Runners', 'SAML SSO', 'Advanced Analytics'], status: 'planned' },
            ].map((phase) => (
              <div key={phase.phase} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn('h-3 w-3 rounded-full', phase.status === 'current' ? 'bg-primary' : 'bg-muted')} />
                  <div className="w-px flex-1 bg-border" />
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{phase.phase}</h4>
                    <Badge variant={phase.status === 'current' ? 'default' : 'outline'}>{phase.status}</Badge>
                  </div>
                  <div className="space-y-1.5">
                    {phase.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="h-3 w-3" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-accent" />
              Pull Requests
            </h3>
          </div>
          <div className="space-y-3">
            {pullRequests.map((pr) => (
              <div key={pr.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <GitBranch className={cn('h-4 w-4', pr.status === 'merged' ? 'text-accent' : 'text-success')} />
                  <div>
                    <p className="text-sm font-medium">{pr.title}</p>
                    <p className="text-xs text-muted-foreground">{pr.id} by {pr.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {pr.checks === 'passing' ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  <Badge variant={pr.status === 'merged' ? 'secondary' : 'success'}>{pr.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Plug className="h-4 w-4 text-primary" />
              Integrations
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'GitHub', status: 'connected', lastSync: '2m ago' },
              { name: 'Jenkins CI', status: 'connected', lastSync: '15m ago' },
              { name: 'Jira', status: 'disconnected', lastSync: 'Never' },
              { name: 'Slack', status: 'connected', lastSync: '1m ago' },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn('h-2 w-2 rounded-full', integration.status === 'connected' ? 'bg-success' : 'bg-muted-foreground')} />
                  <div>
                    <p className="text-sm font-medium">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                  </div>
                </div>
                <Badge variant={integration.status === 'connected' ? 'success' : 'secondary'}>{integration.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage
