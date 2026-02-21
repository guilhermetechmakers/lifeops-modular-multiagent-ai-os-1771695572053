import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import {
  User,
  Key,
  Shield,
  Link as LinkIcon,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
} from 'lucide-react'
import { useState } from 'react'

function ProfilePage() {
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal settings and API keys</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Personal Information
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <Avatar name="Alex Chen" size="lg" />
              <div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                <Input defaultValue="Alex Chen" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input defaultValue="alex@lifeops.ai" type="email" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Role</label>
                <Input defaultValue="Admin" readOnly />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Timezone</label>
                <select className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground">
                  <option>America/New_York (EST)</option>
                  <option>America/Los_Angeles (PST)</option>
                  <option>Europe/London (GMT)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
            <Button className="mt-4"><Save className="h-4 w-4" /> Save Changes</Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              API Keys
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium">Production Key</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <code className="text-xs text-muted-foreground font-mono">
                        {showApiKey ? 'lo_prod_a1b2c3d4e5f6g7h8i9j0' : 'lo_prod_••••••••••••••••'}
                      </code>
                      <button onClick={() => setShowApiKey(!showApiKey)} className="text-muted-foreground hover:text-foreground">
                        {showApiKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Active</Badge>
                  <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Sandbox Key</p>
                  <code className="text-xs text-muted-foreground font-mono">lo_test_••••••••••••••••</code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Sandbox</Badge>
                  <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-4"><Plus className="h-4 w-4" /> Generate New Key</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Auth</p>
                  <p className="text-xs text-muted-foreground">TOTP enabled</p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 30d ago</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Active Sessions</p>
                  <p className="text-xs text-muted-foreground">2 devices</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-primary" />
              Connected Accounts
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Google', connected: true },
                { name: 'GitHub', connected: true },
                { name: 'Microsoft', connected: false },
              ].map((account) => (
                <div key={account.name} className="flex items-center justify-between">
                  <span className="text-sm">{account.name}</span>
                  {account.connected ? (
                    <Badge variant="success">Connected</Badge>
                  ) : (
                    <Button variant="outline" size="sm">Connect</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
