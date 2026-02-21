import { Link } from 'react-router-dom'
import { Zap, ArrowLeft } from 'lucide-react'

function CookiesPage() {
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
        <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: February 21, 2026</p>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit our platform. They help us provide a better experience by remembering your preferences and session state.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Essential Cookies</h2>
            <p>These cookies are necessary for the platform to function. They include authentication tokens, session identifiers, and security cookies. These cannot be disabled.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Preference Cookies</h2>
            <p>These cookies remember your settings like sidebar collapse state, theme preferences, and notification settings. You can disable these in your browser settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Analytics Cookies</h2>
            <p>We use analytics cookies to understand how users interact with LifeOps. This data is aggregated and anonymized. You can opt out via your account settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Managing Cookies</h2>
            <p>You can manage cookie preferences through your browser settings or our in-app cookie consent manager. Note that disabling essential cookies may affect platform functionality.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CookiesPage
