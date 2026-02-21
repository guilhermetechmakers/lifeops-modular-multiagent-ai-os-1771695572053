import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
}

function Progress({ value, max = 100, variant = 'default', size = 'md', className, showLabel }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn('w-full overflow-hidden rounded-full bg-muted', {
          'h-1.5': size === 'sm',
          'h-2.5': size === 'md',
          'h-4': size === 'lg',
        })}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', {
            'bg-primary': variant === 'default',
            'bg-success': variant === 'success',
            'bg-warning': variant === 'warning',
            'bg-destructive': variant === 'destructive',
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { Progress, type ProgressProps }
