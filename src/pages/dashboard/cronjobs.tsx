import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Clock,
  Plus,
  Search,
  Play,
  Pause,
  MoreVertical,
  Calendar,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Settings,
  RotateCcw,
} from 'lucide-react'

const cronjobs = [
  {
    id: '1', name: 'Nightly PR Triage', description: 'Review and label open PRs, suggest reviewers',
    schedule: '0 2 * * *', scheduleLabel: 'Every day at 2:00 AM', timezone: 'UTC',
    module: 'projects' as const, automationLevel: 'approval-required' as const,
    status: 'active' as const, agentName: 'PR Triage Agent',
    nextRun: '2026-02-22T02:00:00Z', lastRun: '2026-02-21T02:00:00Z',
    lastOutcome: 'success' as const, runsCount: 142,
    constraints: { maxActions: 20, spendLimit: 5, allowedTools: ['GitHub', 'Slack'], requireApproval: true },
  },
  {
    id: '2', name: 'Weekly Content Digest', description: 'Compile and send weekly content performance report',
    schedule: '0 9 * * 1', scheduleLabel: 'Every Monday at 9:00 AM', timezone: 'America/New_York',
    module: 'content' as const, automationLevel: 'conditional-auto' as const,
    status: 'active' as const, agentName: 'Content Publisher',
    nextRun: '2026-02-23T14:00:00Z', lastRun: '2026-02-16T14:00:00Z',
    lastOutcome: 'success' as const, runsCount: 24,
    constraints: { maxActions: 10, allowedTools: ['WordPress', 'Analytics'], requireApproval: false },
  },
  {
    id: '3', name: 'Monthly Finance Close', description: 'Reconcile accounts, generate GL, flag anomalies',
    schedule: '0 6 1 * *', scheduleLabel: '1st of month at 6:00 AM', timezone: 'UTC',
    module: 'finance' as const, automationLevel: 'approval-required' as const,
    status: 'active' as const, agentName: 'Anomaly Detector',
    nextRun: '2026-03-01T06:00:00Z', lastRun: '2026-02-01T06:00:00Z',
    lastOutcome: 'success' as const, runsCount: 8,
    constraints: { maxActions: 50, spendLimit: 0, allowedTools: ['Plaid', 'QuickBooks'], requireApproval: true },
  },
  {
    id: '4', name: 'Daily Health Check-in', description: 'Sync device data, adjust training plan',
    schedule: '0 7 * * *', scheduleLabel: 'Every day at 7:00 AM', timezone: 'America/Los_Angeles',
    module: 'health' as const, automationLevel: 'suggest-only' as const,
    status: 'paused' as const, agentName: 'Training Planner',
    nextRun: '-', lastRun: '2026-02-19T15:00:00Z',
    lastOutcome: 'success' as const, runsCount: 45,
    constraints: { maxActions: 5, allowedTools: ['Garmin', 'Google Calendar'], requireApproval: false },
  },
  {
    id: '5', name: 'Content Publish Pipeline', description: 'Auto-publish approved content to CMS and social',
    schedule: '0 10 * * 1-5', scheduleLabel: 'Weekdays at 10:00 AM', timezone: 'UTC',
    module: 'content' as const, automationLevel: 'bounded-autopilot' as const,
    status: 'active' as const, agentName: 'Content Publisher',
    nextRun: '2026-02-23T10:00:00Z', lastRun: '2026-02-21T10:00:00Z',
    lastOutcome: 'failure' as const, runsCount: 67,
    constraints: { maxActions: 15, allowedTools: ['WordPress', 'Twitter', 'LinkedIn'], requireApproval: false },
  },
]

const automationLevelColors = {
  'suggest-only': 'bg-muted text-muted-foreground',
  'approval-required': 'bg-warning/20 text-warning',
  'conditional-auto': 'bg-primary/20 text-primary',
  'bounded-autopilot': 'bg-success/20 text-success',
}

const moduleColors = {
  projects: 'border-l-primary',
  content: 'border-l-success',
  finance: 'border-l-warning',
  health: 'border-l-accent',
}

function CronjobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  const filteredJobs = cronjobs.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selected = cronjobs.find((j) => j.id === selectedJob)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cronjobs Manager</h1>
          <p className="text-muted-foreground">Schedule and manage automated workflows</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Create Cronjob
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Active', value: cronjobs.filter((j) => j.status === 'active').length, icon: Play, color: 'text-success' },
          { label: 'Paused', value: cronjobs.filter((j) => j.status === 'paused').length, icon: Pause, color: 'text-warning' },
          { label: 'Total Runs', value: cronjobs.reduce((s, j) => s + j.runsCount, 0), icon: RotateCcw, color: 'text-primary' },
          { label: 'Failures (7d)', value: 2, icon: AlertTriangle, color: 'text-destructive' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Icon className={cn('h-4 w-4', stat.color)} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search cronjobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className={cn('space-y-3', selected ? 'lg:col-span-2' : 'lg:col-span-3')}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
              className={cn(
                'cursor-pointer rounded-xl border bg-card p-5 border-l-4 transition-all duration-200 hover:shadow-card-hover',
                moduleColors[job.module],
                selectedJob === job.id ? 'ring-1 ring-primary' : ''
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{job.name}</h3>
                    <Badge variant={job.status === 'active' ? 'success' : 'warning'}>{job.status}</Badge>
                    <Badge className={automationLevelColors[job.automationLevel]}>
                      {job.automationLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {job.scheduleLabel}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5" />
                      {job.agentName}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {job.lastOutcome === 'success' ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-destructive" />
                      )}
                      Last: {job.lastOutcome}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-muted">
                    {job.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button className="rounded p-1.5 text-muted-foreground hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="rounded-xl border border-border bg-card p-6 animate-slide-in-right h-fit sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Cronjob Details</h3>
              <button onClick={() => setSelectedJob(null)} className="text-muted-foreground hover:text-foreground text-sm">
                Close
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-lg">{selected.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{selected.description}</p>
              </div>

              <div className="space-y-3">
                <DetailRow label="Schedule" value={selected.scheduleLabel} />
                <DetailRow label="Cron Expression" value={selected.schedule} />
                <DetailRow label="Timezone" value={selected.timezone} />
                <DetailRow label="Agent" value={selected.agentName} />
                <DetailRow label="Module" value={selected.module} />
                <DetailRow label="Total Runs" value={String(selected.runsCount)} />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Automation Level</p>
                <Badge className={cn('text-sm', automationLevelColors[selected.automationLevel])}>
                  {selected.automationLevel}
                </Badge>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Safety Constraints
                </p>
                <div className="space-y-2 rounded-lg border border-border p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Actions</span>
                    <span className="font-medium">{selected.constraints.maxActions}</span>
                  </div>
                  {selected.constraints.spendLimit !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spend Limit</span>
                      <span className="font-medium">${selected.constraints.spendLimit}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Require Approval</span>
                    <span className="font-medium">{selected.constraints.requireApproval ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Allowed Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.constraints.allowedTools.map((tool) => (
                    <Badge key={tool} variant="outline">{tool}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="h-3.5 w-3.5" /> Run Now
                </Button>
              </div>

              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Calendar className="h-4 w-4" /> View Run History
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
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
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

export default CronjobsPage
