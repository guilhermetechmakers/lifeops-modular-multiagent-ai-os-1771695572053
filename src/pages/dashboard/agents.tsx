import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Bot,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Copy,
  Archive,
  Play,
  Pause,
  Activity,
  Cpu,
  MessageSquare,
} from 'lucide-react'

const agents = [
  {
    id: '1', name: 'PR Triage Agent', type: 'system' as const, module: 'projects' as const,
    status: 'active' as const, capabilities: ['Code Review', 'Labeling', 'Assignment'],
    memoryScope: 'project-alpha', connectors: ['GitHub', 'Slack'], lastActive: '5m ago', runsCount: 342,
  },
  {
    id: '2', name: 'Content Publisher', type: 'user' as const, module: 'content' as const,
    status: 'active' as const, capabilities: ['Drafting', 'SEO', 'Scheduling'],
    memoryScope: 'content-team', connectors: ['WordPress', 'Twitter'], lastActive: '12m ago', runsCount: 156,
  },
  {
    id: '3', name: 'Anomaly Detector', type: 'system' as const, module: 'finance' as const,
    status: 'active' as const, capabilities: ['Pattern Detection', 'Categorization', 'Alerts'],
    memoryScope: 'finance-global', connectors: ['Plaid', 'QuickBooks'], lastActive: '1h ago', runsCount: 89,
  },
  {
    id: '4', name: 'Training Planner', type: 'user' as const, module: 'health' as const,
    status: 'paused' as const, capabilities: ['Plan Generation', 'Load Balancing', 'Recovery'],
    memoryScope: 'health-personal', connectors: ['Garmin', 'Google Calendar'], lastActive: '2h ago', runsCount: 67,
  },
  {
    id: '5', name: 'Release Orchestrator', type: 'system' as const, module: 'projects' as const,
    status: 'active' as const, capabilities: ['CI/CD', 'Versioning', 'Changelog'],
    memoryScope: 'project-alpha', connectors: ['GitHub', 'Jenkins'], lastActive: '30m ago', runsCount: 201,
  },
  {
    id: '6', name: 'Nutrition Advisor', type: 'user' as const, module: 'health' as const,
    status: 'archived' as const, capabilities: ['Meal Planning', 'Macro Tracking'],
    memoryScope: 'health-personal', connectors: ['MyFitnessPal'], lastActive: '7d ago', runsCount: 23,
  },
]

const moduleColors = {
  projects: 'text-primary',
  content: 'text-success',
  finance: 'text-warning',
  health: 'text-accent',
}

function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = filterModule === 'all' || agent.module === filterModule
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus
    return matchesSearch && matchesModule && matchesStatus
  })

  const selected = agents.find((a) => a.id === selectedAgent)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agent Directory</h1>
          <p className="text-muted-foreground">Manage and monitor your AI agents</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All Modules</option>
            <option value="projects">Projects</option>
            <option value="content">Content</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className={cn('space-y-3', selected ? 'lg:col-span-2' : 'lg:col-span-3')}>
          <div className={cn('grid gap-3', selected ? 'sm:grid-cols-1 xl:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-3')}>
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                className={cn(
                  'cursor-pointer rounded-xl border bg-card p-5 transition-all duration-200 hover:shadow-card-hover',
                  selectedAgent === agent.id ? 'border-primary' : 'border-border hover:border-border/80'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', {
                      'bg-primary/10': agent.module === 'projects',
                      'bg-success/10': agent.module === 'content',
                      'bg-warning/10': agent.module === 'finance',
                      'bg-accent/10': agent.module === 'health',
                    })}>
                      <Bot className={cn('h-5 w-5', moduleColors[agent.module])} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{agent.module} &middot; {agent.type}</p>
                    </div>
                  </div>
                  <button className="rounded p-1 text-muted-foreground hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {agent.capabilities.map((cap) => (
                    <Badge key={cap} variant="outline" className="text-[10px]">{cap}</Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className={cn('h-1.5 w-1.5 rounded-full', {
                      'bg-success': agent.status === 'active',
                      'bg-warning': agent.status === 'paused',
                      'bg-muted-foreground': agent.status === 'archived',
                    })} />
                    <span className="capitalize">{agent.status}</span>
                  </div>
                  <span>{agent.runsCount} runs &middot; {agent.lastActive}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selected && (
          <div className="rounded-xl border border-border bg-card p-6 animate-slide-in-right h-fit sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Agent Details</h3>
              <button onClick={() => setSelectedAgent(null)} className="text-muted-foreground hover:text-foreground text-sm">
                Close
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', {
                  'bg-primary/10': selected.module === 'projects',
                  'bg-success/10': selected.module === 'content',
                  'bg-warning/10': selected.module === 'finance',
                  'bg-accent/10': selected.module === 'health',
                })}>
                  <Bot className={cn('h-6 w-6', moduleColors[selected.module])} />
                </div>
                <div>
                  <h4 className="font-semibold">{selected.name}</h4>
                  <Badge variant={selected.status === 'active' ? 'success' : selected.status === 'paused' ? 'warning' : 'secondary'}>
                    {selected.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <DetailRow label="Type" value={selected.type} />
                <DetailRow label="Module" value={selected.module} />
                <DetailRow label="Memory Scope" value={selected.memoryScope} />
                <DetailRow label="Total Runs" value={String(selected.runsCount)} />
                <DetailRow label="Last Active" value={selected.lastActive} />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Capabilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.capabilities.map((cap) => (
                    <Badge key={cap} variant="outline">{cap}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Connectors</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.connectors.map((con) => (
                    <Badge key={con} variant="secondary">{con}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {selected.status === 'active' ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pause className="h-3.5 w-3.5" /> Pause
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="h-3.5 w-3.5" /> Resume
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  <Copy className="h-3.5 w-3.5" /> Clone
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Archive className="h-3.5 w-3.5" /> Archive
                </Button>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Activity className="h-4 w-4" /> View Run History
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4" /> Message Traces
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Cpu className="h-4 w-4" /> Runtime Telemetry
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium capitalize">{value}</span>
    </div>
  )
}

export default AgentsPage
