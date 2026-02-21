import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Clock,
  Check,
  X,
  Edit3,
  MessageSquare,
  Eye,
  AlertTriangle,
  Shield,
  ChevronRight,
} from 'lucide-react'

const approvals = [
  {
    id: '1', runId: 'run-234', agentName: 'PR Triage Agent', module: 'projects' as const,
    action: 'Merge PR #234 and deploy to staging', description: 'Agent reviewed code changes, all checks passing. 3 reviewers approved.',
    status: 'pending' as const, slaDeadline: '2026-02-21T18:00:00Z', slaRemaining: '4h 23m',
    createdAt: '2026-02-21T10:00:00Z', rationale: 'All CI checks pass, 3/3 reviewers approved, no security vulnerabilities detected.',
    diff: '+ Added agent memory persistence layer\n+ Updated schema validation\n- Removed deprecated API endpoints\n  Modified 12 files, +342 -89 lines',
  },
  {
    id: '2', runId: 'run-235', agentName: 'Anomaly Detector', module: 'finance' as const,
    action: 'Reclassify 3 transactions flagged as anomalies', description: 'Agent detected unusual patterns in recent transactions.',
    status: 'pending' as const, slaDeadline: '2026-02-21T20:00:00Z', slaRemaining: '6h 23m',
    createdAt: '2026-02-21T08:00:00Z', rationale: 'Three transactions deviate >2 std from category average. Confidence: 87%.',
    diff: 'Transaction #4521: $1,200 → Reclassify from "Other" to "Software"\nTransaction #4523: $890 → Flag for manual review\nTransaction #4525: $3,400 → Reclassify from "Marketing" to "Infrastructure"',
  },
  {
    id: '3', runId: 'run-230', agentName: 'Content Publisher', module: 'content' as const,
    action: 'Publish blog post to WordPress and social channels', description: 'Content passed editorial review, SEO score 92/100.',
    status: 'pending' as const, slaDeadline: '2026-02-21T16:00:00Z', slaRemaining: '2h 23m',
    createdAt: '2026-02-21T06:00:00Z', rationale: 'Post meets all editorial guidelines. SEO optimized. Scheduled for peak engagement window.',
    diff: 'Title: "How AI Agents Transform DevOps"\nPlatforms: WordPress, Twitter, LinkedIn\nScheduled: Feb 22, 10:00 AM EST',
  },
  {
    id: '4', runId: 'run-228', agentName: 'PR Triage Agent', module: 'projects' as const,
    action: 'Auto-assign reviewers to 5 new PRs', description: 'Based on code ownership and availability.',
    status: 'approved' as const, slaDeadline: '2026-02-20T18:00:00Z', slaRemaining: '-',
    createdAt: '2026-02-20T10:00:00Z', rationale: 'Assignments based on CODEOWNERS file and current workload.',
    diff: 'PR #230 → @sarah-dev\nPR #231 → @mike-eng\nPR #232 → @alex-chen\nPR #233 → @sarah-dev\nPR #234 → @mike-eng',
  },
  {
    id: '5', runId: 'run-225', agentName: 'Training Planner', module: 'health' as const,
    action: 'Adjust training plan for recovery week', description: 'High strain detected, recommending deload.',
    status: 'rejected' as const, slaDeadline: '2026-02-19T18:00:00Z', slaRemaining: '-',
    createdAt: '2026-02-19T07:00:00Z', rationale: 'Strain score 18.5 (high) for 3 consecutive days. Recovery score below 50%.',
    diff: 'Reduce volume by 40%\nReplace HIIT with Zone 2\nAdd extra rest day',
  },
]

function ApprovalsPage() {
  const [selectedApproval, setSelectedApproval] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = approvals.filter((a) => filterStatus === 'all' || a.status === filterStatus)
  const selected = approvals.find((a) => a.id === selectedApproval)
  const pendingCount = approvals.filter((a) => a.status === 'pending').length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Approvals Queue</h1>
          <p className="text-muted-foreground">Review and approve pending agent actions</p>
        </div>
        <Badge variant="warning" className="gap-1.5 text-sm px-3 py-1">
          <AlertTriangle className="h-3.5 w-3.5" />
          {pendingCount} pending
        </Badge>
      </div>

      <div className="flex gap-2">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors capitalize',
              filterStatus === status ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className={cn('space-y-3', selected ? 'lg:col-span-2' : 'lg:col-span-5')}>
          {filtered.map((approval) => (
            <div
              key={approval.id}
              onClick={() => setSelectedApproval(selectedApproval === approval.id ? null : approval.id)}
              className={cn(
                'cursor-pointer rounded-xl border bg-card p-5 transition-all duration-200 hover:shadow-card-hover',
                selectedApproval === approval.id ? 'border-primary' : 'border-border'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={
                    approval.status === 'pending' ? 'warning' :
                    approval.status === 'approved' ? 'success' : 'destructive'
                  }>
                    {approval.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">{approval.module}</Badge>
                </div>
                {approval.status === 'pending' && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="h-3.5 w-3.5 text-warning" />
                    <span className="text-warning font-medium">{approval.slaRemaining}</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold mb-1">{approval.action}</h3>
              <p className="text-sm text-muted-foreground mb-3">{approval.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                <span>{approval.agentName}</span>
                <span>&middot;</span>
                <span>{approval.runId}</span>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6 animate-slide-in-right h-fit sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Approval Details</h3>
              <button onClick={() => setSelectedApproval(null)} className="text-muted-foreground hover:text-foreground text-sm">
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold">{selected.action}</h4>
                <p className="text-sm text-muted-foreground mt-1">{selected.description}</p>
              </div>

              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Agent Rationale
                </p>
                <p className="text-sm leading-relaxed">{selected.rationale}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Diff / Changes</p>
                <pre className="rounded-lg border border-border bg-background p-4 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {selected.diff}
                </pre>
              </div>

              <div className="space-y-3">
                <DetailRow label="Agent" value={selected.agentName} />
                <DetailRow label="Module" value={selected.module} />
                <DetailRow label="Run ID" value={selected.runId} />
                <DetailRow label="SLA Deadline" value={selected.slaRemaining === '-' ? 'Resolved' : selected.slaRemaining + ' remaining'} />
              </div>

              {selected.status === 'pending' && (
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="default">
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button className="flex-1" variant="destructive">
                      <X className="h-4 w-4" /> Reject
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Edit3 className="h-4 w-4" /> Modify
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4" /> Add Comment
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                </div>
              )}
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

export default ApprovalsPage
