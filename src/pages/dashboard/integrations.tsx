import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Plug,
  Search,
  CheckCircle2,
  AlertCircle,
  Settings,
  RefreshCw,
  Plus,
} from 'lucide-react'

const connectors = [
  { id: '1', name: 'GitHub', category: 'vcs', provider: 'GitHub Inc.', status: 'connected' as const, lastSync: '2m ago', description: 'Source code, PRs, issues, and CI/CD' },
  { id: '2', name: 'Slack', category: 'communication', provider: 'Slack Technologies', status: 'connected' as const, lastSync: '1m ago', description: 'Team notifications and alerts' },
  { id: '3', name: 'Google Calendar', category: 'productivity', provider: 'Google', status: 'connected' as const, lastSync: '10m ago', description: 'Schedule sync and event management' },
  { id: '4', name: 'Plaid', category: 'finance', provider: 'Plaid Inc.', status: 'connected' as const, lastSync: '1h ago', description: 'Bank account aggregation and transactions' },
  { id: '5', name: 'WordPress', category: 'cms', provider: 'Automattic', status: 'connected' as const, lastSync: '30m ago', description: 'Content publishing and management' },
  { id: '6', name: 'Garmin', category: 'health', provider: 'Garmin Ltd.', status: 'connected' as const, lastSync: '5m ago', description: 'Fitness data, heart rate, and sleep' },
  { id: '7', name: 'Jenkins', category: 'ci', provider: 'Jenkins Project', status: 'error' as const, lastSync: '3h ago', description: 'CI/CD pipeline execution' },
  { id: '8', name: 'Jira', category: 'vcs', provider: 'Atlassian', status: 'disconnected' as const, lastSync: 'Never', description: 'Project management and issue tracking' },
  { id: '9', name: 'QuickBooks', category: 'finance', provider: 'Intuit', status: 'connected' as const, lastSync: '2h ago', description: 'Accounting and bookkeeping' },
  { id: '10', name: 'Stripe', category: 'finance', provider: 'Stripe Inc.', status: 'disconnected' as const, lastSync: 'Never', description: 'Payment processing and billing' },
  { id: '11', name: 'Twitter/X', category: 'cms', provider: 'X Corp.', status: 'connected' as const, lastSync: '15m ago', description: 'Social media publishing' },
  { id: '12', name: 'SendGrid', category: 'communication', provider: 'Twilio', status: 'disconnected' as const, lastSync: 'Never', description: 'Transactional email delivery' },
]

const categories = ['all', 'vcs', 'ci', 'cms', 'finance', 'health', 'communication', 'productivity']

function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const filtered = connectors.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || c.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const connected = connectors.filter((c) => c.status === 'connected').length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Integration Connectors</h1>
          <p className="text-muted-foreground">{connected} of {connectors.length} connectors active</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add Connector
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search connectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize',
                filterCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((connector) => (
          <div
            key={connector.id}
            className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-card-hover group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold', {
                  'bg-primary/10 text-primary': connector.status === 'connected',
                  'bg-destructive/10 text-destructive': connector.status === 'error',
                  'bg-muted text-muted-foreground': connector.status === 'disconnected',
                })}>
                  <Plug className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{connector.name}</h3>
                  <p className="text-xs text-muted-foreground">{connector.provider}</p>
                </div>
              </div>
              {connector.status === 'connected' ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : connector.status === 'error' ? (
                <AlertCircle className="h-5 w-5 text-destructive" />
              ) : null}
            </div>

            <p className="text-sm text-muted-foreground mb-4">{connector.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={
                  connector.status === 'connected' ? 'success' :
                  connector.status === 'error' ? 'destructive' : 'secondary'
                }>
                  {connector.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{connector.lastSync}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {connector.status === 'connected' && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )}
                {connector.status === 'disconnected' && (
                  <Button variant="outline" size="sm">Connect</Button>
                )}
                {connector.status === 'error' && (
                  <Button variant="outline" size="sm">Reconnect</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IntegrationsPage
