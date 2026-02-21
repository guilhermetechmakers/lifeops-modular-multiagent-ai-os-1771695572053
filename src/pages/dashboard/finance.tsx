import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/ui/metric-card'
import { cn } from '@/lib/utils'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  PieChart,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { month: 'Sep', income: 12400, expenses: 8200 },
  { month: 'Oct', income: 13800, expenses: 9100 },
  { month: 'Nov', income: 11200, expenses: 7800 },
  { month: 'Dec', income: 15600, expenses: 10200 },
  { month: 'Jan', income: 14200, expenses: 9600 },
  { month: 'Feb', income: 16800, expenses: 11400 },
]

const categoryData = [
  { name: 'Software', value: 4200, color: '#FF7300' },
  { name: 'Infrastructure', value: 3100, color: '#B16FFF' },
  { name: 'Marketing', value: 2200, color: '#3FC56B' },
  { name: 'Payroll', value: 8400, color: '#FBBF24' },
  { name: 'Other', value: 1500, color: '#A1A1AA' },
]

const transactions = [
  { id: '1', description: 'AWS Monthly', amount: -2340, category: 'Infrastructure', date: 'Feb 20', agentSuggestion: 'Auto-categorized', confidence: 95 },
  { id: '2', description: 'Client Payment - Acme Corp', amount: 8500, category: 'Revenue', date: 'Feb 19', agentSuggestion: null, confidence: 0 },
  { id: '3', description: 'Figma Subscription', amount: -45, category: 'Software', date: 'Feb 18', agentSuggestion: 'Auto-categorized', confidence: 98 },
  { id: '4', description: 'Unknown Transfer', amount: -1200, category: 'Uncategorized', date: 'Feb 17', agentSuggestion: 'Needs review', confidence: 42 },
  { id: '5', description: 'Google Ads', amount: -890, category: 'Marketing', date: 'Feb 16', agentSuggestion: 'Auto-categorized', confidence: 91 },
]

const subscriptions = [
  { name: 'AWS', amount: 2340, renewal: 'Monthly', nextDate: 'Mar 1' },
  { name: 'GitHub Enterprise', amount: 210, renewal: 'Monthly', nextDate: 'Mar 5' },
  { name: 'Slack Business', amount: 125, renewal: 'Monthly', nextDate: 'Mar 1' },
  { name: 'Figma', amount: 45, renewal: 'Monthly', nextDate: 'Mar 18' },
]

function FinancePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finance</h1>
          <p className="text-muted-foreground">Automated bookkeeping, forecasting, and anomaly detection</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4" />
            Sync
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Revenue (MTD)" value="$16,800" change={18} trend="up" icon={<TrendingUp className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Expenses (MTD)" value="$11,400" change={12} trend="up" icon={<TrendingDown className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Net Profit" value="$5,400" change={32} trend="up" icon={<DollarSign className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Anomalies" value={2} change={-1} trend="down" icon={<AlertTriangle className="h-5 w-5" />} accentColor="default" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Income vs Expenses</h3>
            <Badge variant="outline">6 months</Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`, '']} />
              <Bar dataKey="income" fill="#3FC56B" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="expenses" fill="#FF7300" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-success" />Income</div>
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" />Expenses</div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <PieChart className="h-4 w-4 text-accent" />
              Expense Breakdown
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RPieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`, '']} />
            </RPieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="font-medium">${cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Transactions</h3>
            <Badge variant="outline">Recent</Badge>
          </div>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', tx.amount > 0 ? 'bg-success/10' : 'bg-muted')}>
                    {tx.amount > 0 ? <ArrowDownRight className="h-4 w-4 text-success" /> : <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{tx.category}</span>
                      <span>&middot;</span>
                      <span>{tx.date}</span>
                      {tx.agentSuggestion && (
                        <>
                          <span>&middot;</span>
                          <Badge variant={tx.confidence > 80 ? 'success' : 'warning'} className="text-[10px]">
                            {tx.agentSuggestion} ({tx.confidence}%)
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span className={cn('text-sm font-semibold', tx.amount > 0 ? 'text-success' : 'text-foreground')}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Subscriptions
            </h3>
          </div>
          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div key={sub.name} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
                <div>
                  <p className="text-sm font-medium">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">{sub.renewal} &middot; Next: {sub.nextDate}</p>
                </div>
                <span className="text-sm font-semibold">${sub.amount}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Monthly</span>
              <span className="text-sm font-bold">${subscriptions.reduce((s, sub) => s + sub.amount, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancePage
