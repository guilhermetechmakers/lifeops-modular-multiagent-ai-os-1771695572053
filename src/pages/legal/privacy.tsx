import { Link } from 'react-router-dom'
import { Zap, ArrowLeft } from 'lucide-react'

function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: February 21, 2026</p>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>We collect information you provide directly, including account registration data, profile information, and content you create within the platform. We also collect usage data, device information, and log data automatically.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>We use collected information to provide and improve our services, process transactions, send notifications, and ensure platform security. Agent activity data is used to improve orchestration quality and safety.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Data Security</h2>
            <p>We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security audits. All audit logs are immutable and tamper-evident.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Data Retention</h2>
            <p>We retain your data for as long as your account is active. Run artifacts and audit logs are retained according to your organization's configured retention policies. You may request data deletion at any time.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
            <p>You have the right to access, correct, delete, and export your personal data. You may also opt out of certain data processing activities. Contact privacy@lifeops.ai for requests.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
            <p>For privacy-related inquiries, contact us at privacy@lifeops.ai or write to LifeOps Inc., 123 AI Boulevard, San Francisco, CA 94105.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
