import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Bell,
  Shield,
  Database,
  Code,
  Clock,
  Save,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

const sections = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'automation', label: 'Automation Defaults', icon: Clock },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'data', label: 'Data & Retention', icon: Database },
  { id: 'developer', label: 'Developer', icon: Code },
]

function SettingsPage() {
  const [activeSection, setActiveSection] = useState('notifications')

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings & Preferences</h1>
        <p className="text-muted-foreground">Global app settings and defaults</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6">
          {activeSection === 'notifications' && <NotificationSettings />}
          {activeSection === 'automation' && <AutomationSettings />}
          {activeSection === 'security' && <SecuritySettings />}
          {activeSection === 'data' && <DataSettings />}
          {activeSection === 'developer' && <DeveloperSettings />}
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">Configure how and when you receive notifications</p>
      </div>
      {[
        { label: 'Run completions', description: 'Notify when agent runs complete', email: true, inApp: true, slack: false },
        { label: 'Approval requests', description: 'Notify when actions need approval', email: true, inApp: true, slack: true },
        { label: 'Failures & errors', description: 'Notify on run failures or errors', email: true, inApp: true, slack: true },
        { label: 'Cronjob updates', description: 'Notify on schedule changes', email: false, inApp: true, slack: false },
        { label: 'Weekly digest', description: 'Weekly summary of all activity', email: true, inApp: false, slack: false },
      ].map((pref) => (
        <div key={pref.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
          <div>
            <p className="text-sm font-medium">{pref.label}</p>
            <p className="text-xs text-muted-foreground">{pref.description}</p>
          </div>
          <div className="flex items-center gap-4">
            {['Email', 'In-app', 'Slack'].map((channel, i) => {
              const isOn = [pref.email, pref.inApp, pref.slack][i]
              return (
                <div key={channel} className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">{channel}</span>
                  {isOn ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <Button><Save className="h-4 w-4" /> Save Preferences</Button>
    </div>
  )
}

function AutomationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Automation Defaults</h3>
        <p className="text-sm text-muted-foreground">Default settings for new cronjobs and agent runs</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Default Automation Level</label>
          <select className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground">
            <option>Suggest Only</option>
            <option>Approval Required</option>
            <option>Conditional Auto</option>
            <option>Bounded Autopilot</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Default Max Actions per Run</label>
          <Input type="number" defaultValue="20" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Default Spend Limit ($)</label>
          <Input type="number" defaultValue="10" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Approval SLA (hours)</label>
          <Input type="number" defaultValue="8" />
        </div>
      </div>
      <Button><Save className="h-4 w-4" /> Save Defaults</Button>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage security policies and access controls</p>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Require 2FA for all users', enabled: true },
          { label: 'Enforce password rotation (90 days)', enabled: false },
          { label: 'IP allowlist for API access', enabled: false },
          { label: 'Audit log retention (immutable)', enabled: true },
          { label: 'Require approval for destructive actions', enabled: true },
        ].map((policy) => (
          <div key={policy.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <span className="text-sm">{policy.label}</span>
            {policy.enabled ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
          </div>
        ))}
      </div>
      <Button><Save className="h-4 w-4" /> Save Policies</Button>
    </div>
  )
}

function DataSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Data & Retention</h3>
        <p className="text-sm text-muted-foreground">Configure data retention and export settings</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Run Artifact Retention</label>
          <select className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground">
            <option>30 days</option>
            <option>90 days</option>
            <option>1 year</option>
            <option>Indefinite</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Audit Log Retention</label>
          <select className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground">
            <option>1 year</option>
            <option>3 years</option>
            <option>7 years</option>
            <option>Indefinite</option>
          </select>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">Export All Data</Button>
        <Button variant="destructive">Delete Account Data</Button>
      </div>
    </div>
  )
}

function DeveloperSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Developer Settings</h3>
        <p className="text-sm text-muted-foreground">API configuration and developer tools</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">API Base URL</label>
          <Input defaultValue="https://api.lifeops.ai/v1" readOnly className="font-mono text-xs" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Webhook URL</label>
          <Input placeholder="https://your-server.com/webhook" className="font-mono text-xs" />
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium">Debug Mode</p>
            <p className="text-xs text-muted-foreground">Enable verbose logging for API calls</p>
          </div>
          <ToggleLeft className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <Button><Save className="h-4 w-4" /> Save Settings</Button>
    </div>
  )
}

export default SettingsPage
