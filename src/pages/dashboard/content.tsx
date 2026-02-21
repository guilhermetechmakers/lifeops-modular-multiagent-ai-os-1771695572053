import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/ui/metric-card'
import { cn } from '@/lib/utils'
import {
  FileText,
  PenTool,
  Eye,
  TrendingUp,
  Calendar,
  Plus,
  Lightbulb,
  Send,
  BarChart3,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const performanceData = [
  { date: 'Mon', views: 1200, engagement: 340 },
  { date: 'Tue', views: 1800, engagement: 520 },
  { date: 'Wed', views: 2400, engagement: 680 },
  { date: 'Thu', views: 2100, engagement: 610 },
  { date: 'Fri', views: 3200, engagement: 890 },
  { date: 'Sat', views: 2800, engagement: 750 },
  { date: 'Sun', views: 1900, engagement: 490 },
]

const contentItems = [
  { id: '1', title: 'How AI Agents Transform DevOps', status: 'published', type: 'Blog Post', date: 'Feb 18', views: 2340, engagement: '12.4%' },
  { id: '2', title: 'Weekly Product Update #14', status: 'scheduled', type: 'Newsletter', date: 'Feb 22', views: 0, engagement: '-' },
  { id: '3', title: 'Multi-Agent Orchestration Guide', status: 'draft', type: 'Tutorial', date: 'Feb 20', views: 0, engagement: '-' },
  { id: '4', title: 'LifeOps vs Traditional RPA', status: 'in-review', type: 'Blog Post', date: 'Feb 21', views: 0, engagement: '-' },
]

const ideas = [
  { id: '1', title: 'Case Study: Finance Automation ROI', source: 'Content Publisher Agent', confidence: 92 },
  { id: '2', title: '5 Cronjob Patterns for Teams', source: 'Content Publisher Agent', confidence: 87 },
  { id: '3', title: 'Security Best Practices for AI Agents', source: 'User Suggestion', confidence: 78 },
]

function ContentPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content</h1>
          <p className="text-muted-foreground">End-to-end content pipeline automation</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Content
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Published" value={24} change={12} trend="up" icon={<Send className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Total Views" value="12.4K" change={23} trend="up" icon={<Eye className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Avg. Engagement" value="8.7%" change={3} trend="up" icon={<TrendingUp className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Drafts" value={6} change={-1} trend="down" icon={<PenTool className="h-5 w-5" />} accentColor="default" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-success" />
              Performance
            </h3>
            <Badge variant="outline">Last 7 days</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3FC56B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3FC56B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B16FFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#B16FFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="views" stroke="#3FC56B" fill="url(#viewsGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="engagement" stroke="#B16FFF" fill="url(#engGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" />
              Idea Inbox
            </h3>
            <Badge variant="warning">{ideas.length}</Badge>
          </div>
          <div className="space-y-3">
            {ideas.map((idea) => (
              <div key={idea.id} className="rounded-lg border border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <p className="text-sm font-medium mb-1">{idea.title}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{idea.source}</span>
                  <Badge variant="outline">{idea.confidence}% match</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Content Calendar
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">List</Button>
            <Button variant="ghost" size="sm">Calendar</Button>
          </div>
        </div>
        <div className="space-y-3">
          {contentItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', {
                  'bg-success/10': item.status === 'published',
                  'bg-primary/10': item.status === 'scheduled',
                  'bg-muted': item.status === 'draft',
                  'bg-warning/10': item.status === 'in-review',
                })}>
                  <FileText className={cn('h-5 w-5', {
                    'text-success': item.status === 'published',
                    'text-primary': item.status === 'scheduled',
                    'text-muted-foreground': item.status === 'draft',
                    'text-warning': item.status === 'in-review',
                  })} />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.type}</span>
                    <span>&middot;</span>
                    <Clock className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {item.views > 0 && (
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.views.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{item.engagement} eng.</p>
                  </div>
                )}
                <Badge variant={
                  item.status === 'published' ? 'success' :
                  item.status === 'scheduled' ? 'default' :
                  item.status === 'in-review' ? 'warning' : 'secondary'
                }>
                  {item.status}
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentPage
