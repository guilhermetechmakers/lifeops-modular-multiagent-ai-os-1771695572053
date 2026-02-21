import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  Heart,
  Activity,
  Flame,
  Moon,
  Dumbbell,
  Apple,
  Target,
  Calendar,
  Plus,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'

const weeklyActivity = [
  { day: 'Mon', calories: 2200, steps: 8500, sleep: 7.2 },
  { day: 'Tue', calories: 2400, steps: 12000, sleep: 6.8 },
  { day: 'Wed', calories: 1900, steps: 6200, sleep: 8.1 },
  { day: 'Thu', calories: 2600, steps: 14500, sleep: 7.5 },
  { day: 'Fri', calories: 2100, steps: 9800, sleep: 7.0 },
  { day: 'Sat', calories: 2800, steps: 16000, sleep: 8.5 },
  { day: 'Sun', calories: 2000, steps: 5400, sleep: 9.0 },
]

const fitnessRadar = [
  { metric: 'Strength', value: 78 },
  { metric: 'Cardio', value: 85 },
  { metric: 'Flexibility', value: 62 },
  { metric: 'Recovery', value: 90 },
  { metric: 'Nutrition', value: 72 },
  { metric: 'Sleep', value: 88 },
]

const habits = [
  { name: 'Morning Meditation', streak: 14, target: 30, completed: true },
  { name: 'Drink 3L Water', streak: 7, target: 30, completed: true },
  { name: '10K Steps', streak: 3, target: 30, completed: false },
  { name: 'Read 30 min', streak: 21, target: 30, completed: true },
  { name: 'No Sugar', streak: 5, target: 14, completed: false },
]

const trainingPlan = [
  { day: 'Monday', workout: 'Upper Body Strength', duration: '60 min', intensity: 'high', completed: true },
  { day: 'Tuesday', workout: 'Zone 2 Cardio', duration: '45 min', intensity: 'low', completed: true },
  { day: 'Wednesday', workout: 'Rest / Mobility', duration: '30 min', intensity: 'low', completed: true },
  { day: 'Thursday', workout: 'Lower Body Strength', duration: '60 min', intensity: 'high', completed: false },
  { day: 'Friday', workout: 'HIIT Circuit', duration: '30 min', intensity: 'high', completed: false },
  { day: 'Saturday', workout: 'Long Run', duration: '90 min', intensity: 'medium', completed: false },
  { day: 'Sunday', workout: 'Active Recovery', duration: '30 min', intensity: 'low', completed: false },
]

function HealthPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Health</h1>
          <p className="text-muted-foreground">Habits, training plans, and recovery optimization</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Goal
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Active Calories" value="2,100" change={8} trend="up" icon={<Flame className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Steps Today" value="9,800" change={-5} trend="down" icon={<Activity className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Sleep Score" value="87" change={4} trend="up" icon={<Moon className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Recovery" value="92%" change={6} trend="up" icon={<Heart className="h-5 w-5" />} accentColor="default" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Weekly Activity
            </h3>
            <Badge variant="outline">This week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weeklyActivity}>
              <defs>
                <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF7300" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF7300" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="stepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3FC56B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3FC56B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="steps" stroke="#3FC56B" fill="url(#stepGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="calories" stroke="#FF7300" fill="url(#calGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Fitness Profile
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={fitnessRadar}>
              <PolarGrid stroke="#37373C" />
              <PolarAngleAxis dataKey="metric" stroke="#A1A1AA" fontSize={11} />
              <PolarRadiusAxis stroke="#37373C" fontSize={10} />
              <Radar dataKey="value" stroke="#FF7300" fill="#FF7300" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Habits & Goals
            </h3>
          </div>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors',
                      habit.completed ? 'border-success bg-success/20' : 'border-border'
                    )}>
                      {habit.completed && <div className="h-2 w-2 rounded-full bg-success" />}
                    </div>
                    <span className="text-sm font-medium">{habit.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium">{habit.streak} day streak</span>
                  </div>
                </div>
                <Progress value={habit.streak} max={habit.target} size="sm" variant={habit.streak >= habit.target * 0.7 ? 'success' : 'default'} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-primary" />
              Training Plan
            </h3>
            <Badge variant="outline">Week 6</Badge>
          </div>
          <div className="space-y-2">
            {trainingPlan.map((session) => (
              <div
                key={session.day}
                className={cn(
                  'flex items-center justify-between rounded-lg p-3 transition-colors',
                  session.completed ? 'bg-muted/50' : 'hover:bg-muted'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold',
                    session.completed ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                  )}>
                    {session.day.slice(0, 2)}
                  </div>
                  <div>
                    <p className={cn('text-sm font-medium', session.completed && 'line-through text-muted-foreground')}>
                      {session.workout}
                    </p>
                    <p className="text-xs text-muted-foreground">{session.duration}</p>
                  </div>
                </div>
                <Badge variant={
                  session.intensity === 'high' ? 'destructive' :
                  session.intensity === 'medium' ? 'warning' : 'secondary'
                }>
                  {session.intensity}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Apple className="h-4 w-4 text-success" />
              Nutrition Today
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Protein', value: 142, target: 160, unit: 'g', color: 'bg-primary' },
              { label: 'Carbs', value: 220, target: 250, unit: 'g', color: 'bg-success' },
              { label: 'Fat', value: 65, target: 70, unit: 'g', color: 'bg-accent' },
            ].map((macro) => (
              <div key={macro.label} className="text-center space-y-2">
                <div className="relative mx-auto h-20 w-20">
                  <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgb(var(--muted))" strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke={macro.color === 'bg-primary' ? '#FF7300' : macro.color === 'bg-success' ? '#3FC56B' : '#B16FFF'}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${(macro.value / macro.target) * 213.6} 213.6`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{Math.round((macro.value / macro.target) * 100)}%</span>
                  </div>
                </div>
                <p className="text-xs font-medium">{macro.label}</p>
                <p className="text-xs text-muted-foreground">{macro.value}/{macro.target}{macro.unit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Device Integrations
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Garmin Watch', status: 'connected', lastSync: '5m ago', data: 'HR, Steps, Sleep' },
              { name: 'Apple Health', status: 'connected', lastSync: '1h ago', data: 'Workouts, Nutrition' },
              { name: 'Whoop', status: 'disconnected', lastSync: 'Never', data: 'Recovery, Strain' },
              { name: 'Google Calendar', status: 'connected', lastSync: '10m ago', data: 'Schedule sync' },
            ].map((device) => (
              <div key={device.name} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn('h-2 w-2 rounded-full', device.status === 'connected' ? 'bg-success' : 'bg-muted-foreground')} />
                  <div>
                    <p className="text-sm font-medium">{device.name}</p>
                    <p className="text-xs text-muted-foreground">{device.data}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={device.status === 'connected' ? 'success' : 'secondary'}>{device.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{device.lastSync}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthPage
