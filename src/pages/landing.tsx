import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Zap,
  FolderKanban,
  FileText,
  DollarSign,
  Heart,
  Clock,
  CheckSquare,
  Shield,
  ArrowRight,
  Play,
  Star,
  ChevronRight,
  Workflow,
  Eye,
  RotateCcw,
} from 'lucide-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <FeaturesOverview />
      <CronjobsSnapshot />
      <UseCases />
      <PricingTeaser />
      <Footer />
    </div>
  )
}

function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">LifeOps</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#automation" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Automation</a>
          <a href="#use-cases" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Use Cases</a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
          <Link to="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Docs</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-success/3 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255,115,0,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="animate-fade-in">
          <Badge className="mb-6 px-4 py-1.5">
            <Zap className="mr-1.5 h-3 w-3" />
            Powered by GPT-5 Multi-Agent Orchestration
          </Badge>
        </div>

        <h1 className="animate-fade-in-up mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Your AI{' '}
          <span className="gradient-text">Operating System</span>{' '}
          for Life & Work
        </h1>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl" style={{ animationDelay: '0.2s' }}>
          Automate projects, content, finances, and health through coordinated AI agents.
          Every action is explainable, permissioned, and reversible.
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" style={{ animationDelay: '0.4s' }}>
          <Link to="/signup">
            <Button size="lg" className="px-8">
              Try Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8">
            <Play className="h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        <div className="animate-fade-in-up mt-16" style={{ animationDelay: '0.6s' }}>
          <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card/50 p-2 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl bg-secondary/80 p-1">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-warning/60" />
                  <div className="h-3 w-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">LifeOps — Master Dashboard</span>
              </div>
              <div className="grid grid-cols-4 gap-3 p-4">
                {[
                  { label: 'Active Agents', value: '12', color: 'text-primary' },
                  { label: 'Runs Today', value: '47', color: 'text-success' },
                  { label: 'Pending Approvals', value: '3', color: 'text-warning' },
                  { label: 'Uptime', value: '99.9%', color: 'text-accent' },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-background/50 p-4 text-center">
                    <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 px-4 pb-4">
                <div className="col-span-2 rounded-lg bg-background/50 p-4 h-32">
                  <p className="text-xs text-muted-foreground mb-2">Agent Activity</p>
                  <div className="flex items-end gap-1 h-16">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-primary/60"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-background/50 p-4 h-32">
                  <p className="text-xs text-muted-foreground mb-2">Next Cronjobs</p>
                  <div className="space-y-2">
                    {['PR Triage', 'Content Publish', 'Finance Close'].map((j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-success" />
                        <span className="text-xs">{j}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesOverview() {
  const modules = [
    {
      icon: FolderKanban,
      title: 'Projects',
      description: 'Automate roadmaps, ticket triage, PR reviews, and release orchestration with developer-centric agents.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: FileText,
      title: 'Content',
      description: 'End-to-end content pipeline from ideation to publishing with AI-powered drafting and scheduling.',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: DollarSign,
      title: 'Finance',
      description: 'Automated bookkeeping, anomaly detection, forecasting, and month-end close with full audit trails.',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: Heart,
      title: 'Health',
      description: 'Personalized training plans, habit tracking, nutrition planning, and recovery optimization.',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ]

  return (
    <section id="features" className="py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Modules</Badge>
          <h2 className="text-3xl font-bold md:text-5xl">
            Four domains.{' '}
            <span className="gradient-text">One platform.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized agents for each domain communicate through an ordered message bus, sharing context and coordinating actions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((mod, i) => {
            const Icon = mod.icon
            return (
              <div
                key={mod.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-card-hover hover:border-border/80"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`mb-4 inline-flex rounded-xl ${mod.bgColor} p-3`}>
                  <Icon className={`h-6 w-6 ${mod.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{mod.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{mod.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Explore module <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CronjobsSnapshot() {
  const features = [
    {
      icon: Clock,
      title: 'First-Class Cronjobs',
      description: 'Schedule agents with cron expressions, event triggers, or conditional logic. Full payload templating and timezone support.',
    },
    {
      icon: Shield,
      title: 'Safety Rails & Constraints',
      description: 'Set max actions, spend limits, and allowed tools per job. Four automation levels from suggest-only to bounded autopilot.',
    },
    {
      icon: CheckSquare,
      title: 'Human-in-the-Loop Approvals',
      description: 'Review diffs, artifacts, and rationales before execution. SLA timers, threaded comments, and partial modifications.',
    },
    {
      icon: Eye,
      title: 'Full Explainability',
      description: 'Every action stores its rationale, schema-validated outputs, and immutable audit logs for complete traceability.',
    },
    {
      icon: RotateCcw,
      title: 'Reversible Actions',
      description: 'Automated diff generation and rollback scripts. Dry-run simulations before reversal with permission checks.',
    },
    {
      icon: Workflow,
      title: 'Multi-Agent Orchestration',
      description: 'Agents negotiate, handoff, and reach consensus through ordered message bus with scoped shared memory.',
    },
  ]

  return (
    <section id="automation" className="py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Automation Engine</Badge>
          <h2 className="text-3xl font-bold md:text-5xl">
            Safe, auditable{' '}
            <span className="gradient-text">autonomy</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Cronjobs as first-class objects with rich constraints, safety rails, and approval levels.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card-hover hover:border-border/80"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 inline-flex rounded-lg bg-muted p-2.5">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const cases = [
    {
      role: 'Developer',
      title: 'Automate PR triage & releases',
      description: 'Agents review PRs nightly, auto-label, suggest reviewers, and orchestrate releases with approval gates.',
      tags: ['GitHub', 'CI/CD', 'Projects'],
    },
    {
      role: 'Content Creator',
      title: 'AI-powered content pipeline',
      description: 'From ideation to publishing — agents draft, edit, schedule, and analyze content performance.',
      tags: ['CMS', 'Social', 'Analytics'],
    },
    {
      role: 'Finance Manager',
      title: 'Automated month-end close',
      description: 'Agents categorize transactions, detect anomalies, and prepare close packages with full audit trails.',
      tags: ['Banking', 'Ledger', 'Compliance'],
    },
    {
      role: 'Coach / Athlete',
      title: 'Personalized training plans',
      description: 'Agents analyze fitness data, generate adaptive plans, and balance recovery with performance goals.',
      tags: ['Wearables', 'Calendar', 'Health'],
    },
  ]

  return (
    <section id="use-cases" className="py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Use Cases</Badge>
          <h2 className="text-3xl font-bold md:text-5xl">
            Built for{' '}
            <span className="gradient-text">every workflow</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Badge variant="secondary" className="mb-4">{c.role}</Badge>
              <h3 className="mb-2 text-xl font-semibold">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingTeaser() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'For individuals exploring AI automation',
      features: ['2 active agents', '100 runs/month', '1 module', 'Community support'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For power users and small teams',
      features: ['10 active agents', 'Unlimited runs', 'All modules', 'Priority support', 'Custom workflows'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations with compliance needs',
      features: ['Unlimited agents', 'SAML SSO', 'On-prem runners', 'SLA guarantee', 'Dedicated support'],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl font-bold md:text-5xl">
            Start free.{' '}
            <span className="gradient-text">Scale with trust.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 transition-all duration-300 hover:shadow-card-hover ${
                plan.highlighted
                  ? 'border-primary bg-card shadow-glow'
                  : 'border-border bg-card'
              }`}
            >
              {plan.highlighted && (
                <Badge className="mb-4">
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="mt-8 block">
                <Button
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Developers: ['Documentation', 'API Reference', 'SDKs', 'Status'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: [
      { label: 'Privacy', path: '/privacy' },
      { label: 'Terms', path: '/terms' },
      { label: 'Cookies', path: '/cookies' },
    ],
  }

  return (
    <footer className="border-t border-border/50 bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">LifeOps</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The AI operating system for automating projects, content, finances, and health with safe, auditable multi-agent orchestration.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="mb-4 text-sm font-semibold">{group}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => {
                  const label = typeof item === 'string' ? item : item.label
                  const path = typeof item === 'string' ? '#' : item.path
                  return (
                    <li key={label}>
                      <Link to={path} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LifeOps. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default LandingPage
