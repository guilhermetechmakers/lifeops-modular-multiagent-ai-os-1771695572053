import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Zap, Home, ArrowLeft } from 'lucide-react'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Zap className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to="/">
          <Button variant="outline">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button>
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
