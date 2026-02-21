import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

function ServerErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-6xl font-bold text-destructive mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-2">Server Error</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Something went wrong on our end. Our team has been notified and is working on a fix. Please try again shortly.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Link to="/">
          <Button>
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        If the problem persists, contact{' '}
        <a href="mailto:support@lifeops.ai" className="text-primary hover:underline">support@lifeops.ai</a>
      </p>
    </div>
  )
}

export default ServerErrorPage
