import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/ui/metric-card'
import {
  Users,
  Activity,
  Server,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Settings,
  Database,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const systemHealth = [
  { time: '00:00', cpu: 32, memory: 58, requests: 120 },
  { time: '04:00', cpu: 18, memory: 52, requests: 45 },
  { time: '08:00', cpu: 65, memory: 71, requests: 890 },
  { time: '12:00', cpu: 78, memory: 76, requests: 1200 },
  { time: '16:00', cpu: 72, memory: 74, requests: 980 },
  { time: '20:00', cpu: 45, memory: 62, requests: 340 },
  { time: 'Now', cpu: 38, memory: 60, requests: 210 },
]

function AdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System administration and monitoring</p>
        </div>
        <Badge variant="success" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          All systems healthy
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Users" value={48} change={5} trend="up" icon={<Users className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="API Requests (24h)" value="4.2K" change={12} trend="up" icon={<Activity className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Uptime" value="99.97%" trend="up" icon={<Server className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Active Alerts" value={1} change={-2} trend="down" icon={<AlertTriangle className="h-5 w-5" />} accentColor="default" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            System Health
          </h3>
          <Badge variant="outline">Last 24h</Badge>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={systemHealth}>
            <defs>
              <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF7300" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF7300" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B16FFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#B16FFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} unit="%" />
            <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="cpu" stroke="#FF7300" fill="url(#cpuGrad)" strokeWidth={2} name="CPU" />
            <Area type="monotone" dataKey="memory" stroke="#B16FFF" fill="url(#memGrad)" strokeWidth={2} name="Memory" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            User Management
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Total Users', value: '48' },
              { label: 'Active (7d)', value: '34' },
              { label: 'Admins', value: '3' },
              { label: 'Pending Invites', value: '2' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-sm font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full">Manage Users</Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            Policy Management
          </h3>
          <div className="space-y-3">
            {[
              { policy: 'Max agents per user', value: '10', status: 'enforced' },
              { policy: 'Run rate limit', value: '100/hour', status: 'enforced' },
              { policy: 'Audit log retention', value: '3 years', status: 'enforced' },
              { policy: 'IP allowlist', value: 'Disabled', status: 'inactive' },
            ].map((p) => (
              <div key={p.policy} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm">{p.policy}</p>
                  <p className="text-xs text-muted-foreground">{p.value}</p>
                </div>
                <Badge variant={p.status === 'enforced' ? 'success' : 'secondary'}>{p.status}</Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full">Edit Policies</Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" />
          System Services
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Agent Runtime', status: 'healthy', latency: '12ms' },
            { name: 'Message Bus', status: 'healthy', latency: '3ms' },
            { name: 'Cron Scheduler', status: 'healthy', latency: '8ms' },
            { name: 'Secrets Vault', status: 'healthy', latency: '15ms' },
            { name: 'Audit Store', status: 'healthy', latency: '5ms' },
            { name: 'Search Index', status: 'healthy', latency: '22ms' },
            { name: 'Connector Hub', status: 'degraded', latency: '145ms' },
            { name: 'Backup Service', status: 'healthy', latency: '—' },
          ].map((service) => (
            <div key={service.name} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{service.name}</span>
                {service.status === 'healthy' ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Badge variant={service.status === 'healthy' ? 'success' : 'warning'} className="text-[10px]">{service.status}</Badge>
                <span>{service.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
