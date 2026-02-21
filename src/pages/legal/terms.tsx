import { Link } from 'react-router-dom'
import { Zap, ArrowLeft } from 'lucide-react'

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">LifeOps</span>
          </Link>
        </div>
      </nav>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: February 21, 2026</p>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using LifeOps, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Service Description</h2>
            <p>LifeOps provides a multi-agent AI orchestration platform for automating workflows across projects, content, finance, and health domains. The platform includes agent management, cronjob scheduling, approval workflows, and integration connectors.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities</h2>
            <p>You are responsible for maintaining the security of your account, configuring appropriate automation levels and safety constraints, and reviewing agent actions that require approval.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Acceptable Use</h2>
            <p>You agree not to use LifeOps for any unlawful purpose, to interfere with the platform's operation, or to bypass safety constraints and approval mechanisms.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
            <p>LifeOps provides tools for automation with safety rails and explainability. However, users are ultimately responsible for reviewing and approving automated actions. LifeOps is not liable for damages resulting from approved automated actions.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Contact</h2>
            <p>For questions about these terms, contact legal@lifeops.ai.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
