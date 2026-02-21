import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  Users,
  Shield,
  CreditCard,
  Building,
  Plus,
  MoreVertical,
  Crown,
} from 'lucide-react'

const teamMembers = [
  { name: 'Alex Chen', email: 'alex@lifeops.ai', role: 'Owner', status: 'active', lastActive: '2m ago' },
  { name: 'Sarah Dev', email: 'sarah@lifeops.ai', role: 'Admin', status: 'active', lastActive: '1h ago' },
  { name: 'Mike Eng', email: 'mike@lifeops.ai', role: 'Member', status: 'active', lastActive: '3h ago' },
  { name: 'Lisa Ops', email: 'lisa@lifeops.ai', role: 'Member', status: 'active', lastActive: '1d ago' },
  { name: 'Tom Viewer', email: 'tom@lifeops.ai', role: 'Viewer', status: 'invited', lastActive: 'Never' },
]

const rbacPolicies = [
  { role: 'Owner', permissions: 'Full access to all resources, billing, and team management' },
  { role: 'Admin', permissions: 'Manage agents, cronjobs, and approvals. Cannot manage billing.' },
  { role: 'Member', permissions: 'Create and run agents, manage own cronjobs, submit approvals.' },
  { role: 'Viewer', permissions: 'Read-only access to dashboards and run history.' },
]

function OrganizationPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Organization</h1>
          <p className="text-muted-foreground">Manage teams, roles, and billing</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Team Members', value: '5', icon: Users },
          { label: 'Active Agents', value: '12', icon: Shield },
          { label: 'Plan', value: 'Pro', icon: Crown },
          { label: 'Monthly Usage', value: '$29', icon: CreditCard },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2"><Icon className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Team Roster
          </h3>
        </div>
        <div className="space-y-2">
          {teamMembers.map((member) => (
            <div key={member.email} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Avatar name={member.name} size="sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{member.name}</p>
                    {member.role === 'Owner' && <Crown className="h-3.5 w-3.5 text-warning" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{member.lastActive}</span>
                <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>{member.status}</Badge>
                <Badge variant="outline">{member.role}</Badge>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            RBAC Policies
          </h3>
          <div className="space-y-3">
            {rbacPolicies.map((policy) => (
              <div key={policy.role} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{policy.role}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{policy.permissions}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            Billing
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-primary bg-primary/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Pro Plan</span>
                <Badge>Current</Badge>
              </div>
              <p className="text-2xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <p className="text-xs text-muted-foreground mt-1">10 agents, unlimited runs, all modules</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium">Mar 1, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-medium">Visa ****4242</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Update Payment</Button>
              <Button variant="outline" size="sm">View Invoices</Button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Enterprise Options
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>SAML SSO, on-prem runners, and dedicated support available on Enterprise plan.</p>
              <Button variant="outline" size="sm">Contact Sales</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationPage
