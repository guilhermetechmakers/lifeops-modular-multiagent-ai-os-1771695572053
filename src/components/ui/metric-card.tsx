import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: ReactNode
  accentColor?: 'orange' | 'green' | 'purple' | 'default'
  className?: string
}

function MetricCard({
  label,
  value,
  change,
  changeLabel,
  trend,
  icon,
  accentColor = 'default',
  className,
}: MetricCardProps) {
  const accentClasses = {
    orange: 'border-l-primary',
    green: 'border-l-success',
    purple: 'border-l-accent',
    default: 'border-l-border',
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-card-hover hover:border-border/80 border-l-4',
        accentClasses[accentColor],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {trend === 'up' && <TrendingUp className="h-3.5 w-3.5 text-success" />}
              {trend === 'down' && <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
              {trend === 'neutral' && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
              <span
                className={cn('text-xs font-medium', {
                  'text-success': trend === 'up',
                  'text-destructive': trend === 'down',
                  'text-muted-foreground': trend === 'neutral',
                })}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="rounded-lg bg-muted p-2.5 text-muted-foreground">
          {icon}
        </div>
      </div>
    </div>
  )
}

export { MetricCard, type MetricCardProps }
