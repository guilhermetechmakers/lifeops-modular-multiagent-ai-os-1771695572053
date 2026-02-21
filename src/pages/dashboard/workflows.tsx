import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Search,
  Star,
  Users,
  Bot,
  ArrowRight,
} from 'lucide-react'

const templates = [
  {
    id: '1', name: 'Nightly PR Triage', description: 'Automatically review, label, and assign open PRs based on code ownership and reviewer availability.',
    module: 'projects' as const, category: 'DevOps', agents: ['PR Triage Agent', 'Reviewer Matcher'],
    rating: 4.8, usageCount: 2340, author: 'LifeOps Team', tags: ['GitHub', 'CI/CD', 'Automation'],
  },
  {
    id: '2', name: 'Content Pipeline', description: 'End-to-end content creation from ideation to publishing with SEO optimization and scheduling.',
    module: 'content' as const, category: 'Marketing', agents: ['Content Writer', 'SEO Optimizer', 'Publisher'],
    rating: 4.6, usageCount: 1890, author: 'LifeOps Team', tags: ['CMS', 'SEO', 'Social'],
  },
  {
    id: '3', name: 'Monthly Finance Close', description: 'Automated reconciliation, anomaly detection, and GL generation with approval gates.',
    module: 'finance' as const, category: 'Accounting', agents: ['Anomaly Detector', 'Reconciler', 'Report Generator'],
    rating: 4.9, usageCount: 890, author: 'LifeOps Team', tags: ['Plaid', 'QuickBooks', 'Compliance'],
  },
  {
    id: '4', name: 'Adaptive Training Plan', description: 'Generate and adjust training plans based on device data, recovery scores, and goals.',
    module: 'health' as const, category: 'Fitness', agents: ['Training Planner', 'Recovery Analyzer'],
    rating: 4.5, usageCount: 560, author: 'Community', tags: ['Garmin', 'Calendar', 'Wellness'],
  },
  {
    id: '5', name: 'Release Orchestration', description: 'Coordinate versioning, changelog generation, and multi-stage deployments with rollback.',
    module: 'projects' as const, category: 'DevOps', agents: ['Release Manager', 'Changelog Writer', 'Deploy Agent'],
    rating: 4.7, usageCount: 1200, author: 'LifeOps Team', tags: ['CI/CD', 'Versioning', 'Deploy'],
  },
  {
    id: '6', name: 'Subscription Optimizer', description: 'Track, analyze, and suggest optimizations for SaaS subscriptions and recurring costs.',
    module: 'finance' as const, category: 'Cost Management', agents: ['Subscription Tracker', 'Cost Analyzer'],
    rating: 4.3, usageCount: 340, author: 'Community', tags: ['SaaS', 'Cost', 'Optimization'],
  },
]

const moduleColors = {
  projects: 'border-l-primary',
  content: 'border-l-success',
  finance: 'border-l-warning',
  health: 'border-l-accent',
}

function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState<string>('all')

  const filtered = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = filterModule === 'all' || t.module === filterModule
    return matchesSearch && matchesModule
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workflow Templates</h1>
          <p className="text-muted-foreground">Reusable multi-agent workflow templates</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'projects', 'content', 'finance', 'health'].map((mod) => (
            <button
              key={mod}
              onClick={() => setFilterModule(mod)}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors capitalize',
                filterModule === mod ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => (
          <div
            key={template.id}
            className={cn(
              'rounded-xl border bg-card p-6 border-l-4 transition-all duration-200 hover:shadow-card-hover group',
              moduleColors[template.module]
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <Badge variant="outline" className="capitalize">{template.module}</Badge>
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                <span className="font-medium">{template.rating}</span>
              </div>
            </div>

            <h3 className="font-semibold mb-2">{template.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{template.description}</p>

            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{template.agents.length} agents</span>
              <span className="text-xs text-muted-foreground">&middot;</span>
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{template.usageCount.toLocaleString()} uses</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {template.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">by {template.author}</span>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Use Template <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkflowsPage
