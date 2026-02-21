import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Zap, ArrowLeft, Check } from 'lucide-react'

function ResetPasswordPage() {
  const [step, setStep] = useState<'request' | 'sent'>('request')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('sent')
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">LifeOps</span>
        </Link>

        {step === 'request' ? (
          <>
            <div>
              <h1 className="text-2xl font-bold">Reset your password</h1>
              <p className="mt-2 text-muted-foreground">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Send reset link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-muted-foreground">
              We sent a password reset link to your email address. The link expires in 1 hour.
            </p>
            <Button variant="outline" onClick={() => setStep('request')} className="w-full">
              Didn&apos;t receive it? Try again
            </Button>
          </div>
        )}

        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  )
}

export default ResetPasswordPage
