import { Link } from 'react-router-dom'
import { MetricCard } from '@/components/ui/metric-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Bot,
  Play,
  CheckSquare,
  Clock,
  AlertTriangle,
  ArrowRight,
  Activity,
  Shield,
  Zap,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const activityData = [
  { time: '00:00', runs: 12, approvals: 2 },
  { time: '04:00', runs: 8, approvals: 1 },
  { time: '08:00', runs: 32, approvals: 5 },
  { time: '12:00', runs: 45, approvals: 8 },
  { time: '16:00', runs: 38, approvals: 6 },
  { time: '20:00', runs: 22, approvals: 3 },
  { time: 'Now', runs: 28, approvals: 4 },
]

const moduleActivity = [
  { module: 'Projects', runs: 45 },
  { module: 'Content', runs: 32 },
  { module: 'Finance', runs: 18 },
  { module: 'Health', runs: 24 },
]

const recentRuns = [
  { id: '1', agent: 'PR Triage Agent', module: 'projects' as const, status: 'completed' as const, time: '5m ago', actions: 12 },
  { id: '2', agent: 'Content Publisher', module: 'content' as const, status: 'running' as const, time: '12m ago', actions: 3 },
  { id: '3', agent: 'Anomaly Detector', module: 'finance' as const, status: 'pending-approval' as const, time: '1h ago', actions: 1 },
  { id: '4', agent: 'Training Planner', module: 'health' as const, status: 'completed' as const, time: '2h ago', actions: 8 },
  { id: '5', agent: 'Release Orchestrator', module: 'projects' as const, status: 'failed' as const, time: '3h ago', actions: 0 },
]

const upcomingCronjobs = [
  { id: '1', name: 'Nightly PR Triage', schedule: 'Every day at 2:00 AM', nextRun: 'In 4h 23m', status: 'active' as const },
  { id: '2', name: 'Weekly Content Digest', schedule: 'Every Monday at 9:00 AM', nextRun: 'In 2d 8h', status: 'active' as const },
  { id: '3', name: 'Monthly Finance Close', schedule: '1st of month at 6:00 AM', nextRun: 'In 9d', status: 'active' as const },
  { id: '4', name: 'Daily Health Check-in', schedule: 'Every day at 7:00 AM', nextRun: 'In 12h', status: 'paused' as const },
]

const alerts = [
  { id: '1', type: 'warning' as const, message: 'Content Publisher retry limit approaching (4/5)', time: '15m ago' },
  { id: '2', type: 'error' as const, message: 'Release Orchestrator failed — CI pipeline timeout', time: '3h ago' },
  { id: '3', type: 'info' as const, message: 'New workflow template available: Q1 Planning', time: '6h ago' },
]

function DashboardOverview() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Master Dashboard</h1>
          <p className="text-muted-foreground">System overview and orchestration command center</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            All systems operational
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Active Agents"
          value={12}
          change={8}
          changeLabel="vs last week"
          trend="up"
          icon={<Bot className="h-5 w-5" />}
          accentColor="orange"
        />
        <MetricCard
          label="Runs Today"
          value={47}
          change={12}
          changeLabel="vs yesterday"
          trend="up"
          icon={<Play className="h-5 w-5" />}
          accentColor="green"
        />
        <MetricCard
          label="Pending Approvals"
          value={3}
          change={-2}
          changeLabel="vs yesterday"
          trend="down"
          icon={<CheckSquare className="h-5 w-5" />}
          accentColor="purple"
        />
        <MetricCard
          label="Scheduled Cronjobs"
          value={8}
          change={0}
          changeLabel="no change"
          trend="neutral"
          icon={<Clock className="h-5 w-5" />}
          accentColor="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Agent Activity</h3>
            <Badge variant="outline">Last 24h</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="runGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF7300" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF7300" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="approvalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B16FFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#B16FFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#232326',
                  border: '1px solid #37373C',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="runs" stroke="#FF7300" fill="url(#runGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="approvals" stroke="#B16FFF" fill="url(#approvalGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              Runs
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-accent" />
              Approvals
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Module Activity</h3>
            <Badge variant="outline">Today</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={moduleActivity} layout="vertical">
              <XAxis type="number" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="module" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} width={70} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#232326',
                  border: '1px solid #37373C',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="runs" fill="#FF7300" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Active Runs
            </h3>
            <Link to="/dashboard/cronjobs" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentRuns.map((run) => (
              <Link
                key={run.id}
                to={`/dashboard/runs/${run.id}`}
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('h-2 w-2 rounded-full', {
                    'bg-success': run.status === 'completed',
                    'bg-primary animate-pulse': run.status === 'running',
                    'bg-warning': run.status === 'pending-approval',
                    'bg-destructive': run.status === 'failed',
                  })} />
                  <div>
                    <p className="text-sm font-medium">{run.agent}</p>
                    <p className="text-xs text-muted-foreground">{run.actions} actions &middot; {run.time}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    run.status === 'completed' ? 'success' :
                    run.status === 'running' ? 'default' :
                    run.status === 'pending-approval' ? 'warning' : 'destructive'
                  }
                >
                  {run.status}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Upcoming Cronjobs
            </h3>
            <Link to="/dashboard/cronjobs" className="text-xs text-primary hover:underline flex items-center gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingCronjobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="text-sm font-medium">{job.name}</p>
                  <p className="text-xs text-muted-foreground">{job.schedule}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-primary">{job.nextRun}</p>
                  <Badge variant={job.status === 'active' ? 'success' : 'secondary'} className="mt-1">
                    {job.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Alerts
            </h3>
            <Badge variant="warning">{alerts.length}</Badge>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-border p-3">
                <div className="flex items-start gap-2">
                  <div className={cn('mt-0.5 h-2 w-2 shrink-0 rounded-full', {
                    'bg-warning': alert.type === 'warning',
                    'bg-destructive': alert.type === 'error',
                    'bg-primary': alert.type === 'info',
                  })} />
                  <div>
                    <p className="text-sm">{alert.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              Audit Snapshot
            </h3>
            <Badge variant="outline">Last 24h</Badge>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Total Actions', value: '156', color: 'text-foreground' },
              { label: 'Auto-approved', value: '89', color: 'text-success' },
              { label: 'Human-approved', value: '64', color: 'text-primary' },
              { label: 'Rejected', value: '3', color: 'text-destructive' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className={`text-sm font-semibold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Quick Create
            </h3>
          </div>
          <div className="space-y-2">
            {[
              { label: 'New Cronjob', path: '/dashboard/cronjobs' },
              { label: 'New Agent', path: '/dashboard/agents' },
              { label: 'New Workflow', path: '/dashboard/workflows' },
              { label: 'New Integration', path: '/dashboard/integrations' },
            ].map((item) => (
              <Link key={item.label} to={item.path}>
                <Button variant="ghost" className="w-full justify-start">
                  {item.label}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
