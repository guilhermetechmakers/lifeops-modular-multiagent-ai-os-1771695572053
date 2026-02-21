import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Zap,
  Code,
  Workflow,
  Shield,
  Bot,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

const docSections = [
  {
    title: 'Getting Started',
    icon: Zap,
    items: [
      { title: 'Quick Start Guide', description: 'Set up your first agent in 5 minutes' },
      { title: 'Core Concepts', description: 'Agents, Cronjobs, Runs, and Approvals' },
      { title: 'Architecture Overview', description: 'How LifeOps components work together' },
    ],
  },
  {
    title: 'Agents',
    icon: Bot,
    items: [
      { title: 'Creating Agents', description: 'Configure capabilities, memory, and connectors' },
      { title: 'Agent Communication', description: 'Message bus and shared memory' },
      { title: 'Agent Templates', description: 'Pre-built agents for common tasks' },
    ],
  },
  {
    title: 'Cronjobs',
    icon: Clock,
    items: [
      { title: 'Schedule Builder', description: 'Cron expressions and event triggers' },
      { title: 'Automation Levels', description: 'From suggest-only to bounded autopilot' },
      { title: 'Safety Constraints', description: 'Max actions, spend limits, and tools' },
    ],
  },
  {
    title: 'Workflows',
    icon: Workflow,
    items: [
      { title: 'Multi-Agent Workflows', description: 'Orchestrate complex multi-step processes' },
      { title: 'Template Library', description: 'Browse and customize workflow templates' },
      { title: 'Approval Gates', description: 'Human-in-the-loop review points' },
    ],
  },
  {
    title: 'API Reference',
    icon: Code,
    items: [
      { title: 'REST API', description: 'Endpoints for agents, runs, and cronjobs' },
      { title: 'Webhooks', description: 'Event-driven integrations' },
      { title: 'SDKs', description: 'Node.js, Python, and Go client libraries' },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    items: [
      { title: 'Authentication', description: 'OAuth, SAML, and API key management' },
      { title: 'RBAC', description: 'Role-based access control policies' },
      { title: 'Audit Logging', description: 'Immutable, tamper-evident audit trails' },
    ],
  },
]

function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">Guides, tutorials, and API reference</p>
        </div>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4" />
          Full Docs Site
        </Button>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docSections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title} className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{section.title}</h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.title} className="group flex items-center justify-between rounded-lg p-2 -mx-2 hover:bg-muted transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Tutorials</h3>
          <div className="space-y-3">
            {[
              { title: 'Build a PR Triage Bot', time: '15 min', level: 'Beginner' },
              { title: 'Automate Monthly Finance Close', time: '25 min', level: 'Intermediate' },
              { title: 'Custom Agent with SDK', time: '30 min', level: 'Advanced' },
            ].map((tutorial) => (
              <div key={tutorial.title} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium">{tutorial.title}</p>
                  <p className="text-xs text-muted-foreground">{tutorial.time} read</p>
                </div>
                <Badge variant="outline">{tutorial.level}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Support & Resources</h3>
          <div className="space-y-3">
            {[
              { title: 'Community Discord', description: 'Join the LifeOps community' },
              { title: 'GitHub Discussions', description: 'Report issues and feature requests' },
              { title: 'Status Page', description: 'Check system status and uptime' },
              { title: 'Changelog', description: 'Latest updates and releases' },
            ].map((resource) => (
              <div key={resource.title} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium">{resource.title}</p>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
