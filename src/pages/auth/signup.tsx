import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Zap, Eye, EyeOff, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 lg:flex lg:flex-col lg:justify-between bg-secondary/50 p-12 border-r border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">LifeOps</span>
        </Link>
        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Start automating with{' '}
            <span className="gradient-text">AI agents</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Join thousands of teams using LifeOps to automate projects, content, finances, and health.
          </p>
          <div className="mt-8 space-y-3">
            {['Multi-agent orchestration', 'Explainable & reversible actions', 'Enterprise-grade security'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20">
                  <Check className="h-3 w-3 text-success" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LifeOps</p>
      </div>

      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">LifeOps</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-2 text-muted-foreground">Get started with LifeOps for free</p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Sign up with Google', icon: 'G' },
              { label: 'Sign up with GitHub', icon: 'GH' },
            ].map((provider) => (
              <button
                key={provider.label}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded text-xs font-bold bg-muted">
                  {provider.icon}
                </span>
                {provider.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-4 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Full name</label>
              <Input type="text" placeholder="Alex Chen" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={cn('h-1 flex-1 rounded-full', {
                          'bg-destructive': passwordStrength >= level && passwordStrength <= 1,
                          'bg-warning': passwordStrength >= level && passwordStrength === 2,
                          'bg-primary': passwordStrength >= level && passwordStrength === 3,
                          'bg-success': passwordStrength >= level && passwordStrength >= 4,
                          'bg-muted': passwordStrength < level,
                        })}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {passwordStrength <= 1 && 'Weak'}
                    {passwordStrength === 2 && 'Fair'}
                    {passwordStrength === 3 && 'Strong'}
                    {passwordStrength >= 4 && 'Very strong'}
                  </p>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border bg-input accent-primary"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <Button type="submit" className="w-full" isLoading={isLoading} disabled={!agreedToTerms}>
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function getPasswordStrength(password: string): number {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return strength
}

export default SignupPage
