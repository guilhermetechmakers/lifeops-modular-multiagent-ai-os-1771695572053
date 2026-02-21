import { useParams, Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Activity,
  FileText,
  RotateCcw,
  MessageSquare,
  Download,
  Eye,
  Zap,
  AlertTriangle,
} from 'lucide-react'

const runData = {
  id: 'run-234',
  cronJobName: 'Nightly PR Triage',
  agentName: 'PR Triage Agent',
  module: 'projects' as const,
  status: 'completed' as const,
  startedAt: '2026-02-21T02:00:00Z',
  completedAt: '2026-02-21T02:04:32Z',
  duration: 272,
  actionsCount: 12,
  rationale: 'Reviewed 12 open PRs. Auto-labeled 8 based on file changes. Suggested reviewers for 4 PRs needing human review. No security issues detected.',
  messageTrace: [
    { id: '1', from: 'Scheduler', to: 'PR Triage Agent', message: 'Trigger: Nightly PR Triage (cron: 0 2 * * *)', timestamp: '02:00:00' },
    { id: '2', from: 'PR Triage Agent', to: 'GitHub Connector', message: 'Fetch open PRs for project-alpha', timestamp: '02:00:01' },
    { id: '3', from: 'GitHub Connector', to: 'PR Triage Agent', message: 'Returned 12 open PRs', timestamp: '02:00:03' },
    { id: '4', from: 'PR Triage Agent', to: 'Memory Store', message: 'Load CODEOWNERS and reviewer history', timestamp: '02:00:04' },
    { id: '5', from: 'PR Triage Agent', to: 'GitHub Connector', message: 'Apply labels to 8 PRs (auto-categorized)', timestamp: '02:01:15' },
    { id: '6', from: 'PR Triage Agent', to: 'Approvals Queue', message: 'Submit 4 reviewer assignments for approval', timestamp: '02:03:42' },
    { id: '7', from: 'PR Triage Agent', to: 'Slack Connector', message: 'Notify #dev-team: triage complete', timestamp: '02:04:30' },
    { id: '8', from: 'Scheduler', to: 'Audit Log', message: 'Run completed successfully. 12 actions, 0 errors.', timestamp: '02:04:32' },
  ],
  artifacts: [
    { id: '1', type: 'report', name: 'triage-summary.json', size: 4200 },
    { id: '2', type: 'diff', name: 'label-changes.diff', size: 1800 },
    { id: '3', type: 'log', name: 'agent-trace.log', size: 12400 },
    { id: '4', type: 'snapshot', name: 'memory-snapshot.json', size: 8600 },
  ],
  actionDiffs: [
    { action: 'Label PR #230', before: 'No labels', after: 'enhancement, backend', type: 'add' },
    { action: 'Label PR #231', before: 'No labels', after: 'bug, frontend', type: 'add' },
    { action: 'Suggest reviewer for PR #232', before: 'No reviewer', after: '@sarah-dev (85% match)', type: 'add' },
  ],
}

function RunDetailsPage() {
  const { runId } = useParams()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="rounded-lg p-2 hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Run {runId || runData.id}</h1>
            <Badge variant="success">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {runData.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{runData.cronJobName} &middot; {runData.agentName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <RotateCcw className="h-4 w-4" />
            Rollback
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Duration', value: `${Math.floor(runData.duration / 60)}m ${runData.duration % 60}s`, icon: Clock },
          { label: 'Actions', value: String(runData.actionsCount), icon: Activity },
          { label: 'Artifacts', value: String(runData.artifacts.length), icon: FileText },
          { label: 'Errors', value: '0', icon: AlertTriangle },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Rationale</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{runData.rationale}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-accent" />
            <h3 className="font-semibold">Message Trace</h3>
          </div>
          <div className="space-y-0">
            {runData.messageTrace.map((msg, i) => (
              <div key={msg.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={cn('h-3 w-3 rounded-full border-2', i === runData.messageTrace.length - 1 ? 'border-success bg-success/20' : 'border-primary bg-primary/20')} />
                  {i < runData.messageTrace.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-primary">{msg.from}</span>
                    <span className="text-xs text-muted-foreground">&rarr;</span>
                    <span className="text-xs font-semibold">{msg.to}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Action Diffs</h3>
            </div>
            <div className="space-y-3">
              {runData.actionDiffs.map((diff, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-medium mb-2">{diff.action}</p>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">{diff.before}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-success">+</span>
                      <span className="text-success">{diff.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Artifacts</h3>
            </div>
            <div className="space-y-2">
              {runData.artifacts.map((artifact) => (
                <div key={artifact.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[10px]">{artifact.type}</Badge>
                    <span className="text-sm font-mono">{artifact.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{(artifact.size / 1024).toFixed(1)} KB</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RunDetailsPage
