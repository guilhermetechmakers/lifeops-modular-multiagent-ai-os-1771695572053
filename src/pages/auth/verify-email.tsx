import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Zap, Mail, RefreshCw } from 'lucide-react'

function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isResending, setIsResending] = useState(false)

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleResend = () => {
    setIsResending(true)
    setTimeout(() => setIsResending(false), 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">LifeOps</span>
        </Link>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="mt-2 text-muted-foreground">
            We sent a verification code to <span className="font-medium text-foreground">alex@example.com</span>
          </p>
        </div>

        <div className="flex justify-center gap-3">
          {code.map((digit, i) => (
            <input
              key={i}
              id={`code-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(i, e.target.value)}
              className="h-12 w-12 rounded-lg border border-border bg-input text-center text-lg font-bold text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
            />
          ))}
        </div>

        <Button className="w-full" disabled={code.some((d) => !d)}>
          Verify Email
        </Button>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isResending ? 'animate-spin' : ''}`} />
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        </div>

        <Link to="/login" className="block text-sm text-muted-foreground hover:text-foreground">
          Back to sign in
        </Link>
      </div>
    </div>
  )
}

export default VerifyEmailPage
