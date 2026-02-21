import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

const LandingPage = lazy(() => import('@/pages/landing'))
const LoginPage = lazy(() => import('@/pages/auth/login'))
const SignupPage = lazy(() => import('@/pages/auth/signup'))
const VerifyEmailPage = lazy(() => import('@/pages/auth/verify-email'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password'))

const DashboardOverview = lazy(() => import('@/pages/dashboard/overview'))
const AgentsPage = lazy(() => import('@/pages/dashboard/agents'))
const ProjectsPage = lazy(() => import('@/pages/dashboard/projects'))
const ContentPage = lazy(() => import('@/pages/dashboard/content'))
const FinancePage = lazy(() => import('@/pages/dashboard/finance'))
const HealthPage = lazy(() => import('@/pages/dashboard/health'))
const CronjobsPage = lazy(() => import('@/pages/dashboard/cronjobs'))
const WorkflowsPage = lazy(() => import('@/pages/dashboard/workflows'))
const ApprovalsPage = lazy(() => import('@/pages/dashboard/approvals'))
const RunDetailsPage = lazy(() => import('@/pages/dashboard/run-details'))
const SettingsPage = lazy(() => import('@/pages/dashboard/settings'))
const ProfilePage = lazy(() => import('@/pages/dashboard/profile'))
const OrganizationPage = lazy(() => import('@/pages/dashboard/organization'))
const AdminPage = lazy(() => import('@/pages/dashboard/admin'))
const IntegrationsPage = lazy(() => import('@/pages/dashboard/integrations'))
const DocsPage = lazy(() => import('@/pages/docs'))

const PrivacyPage = lazy(() => import('@/pages/legal/privacy'))
const TermsPage = lazy(() => import('@/pages/legal/terms'))
const CookiesPage = lazy(() => import('@/pages/legal/cookies'))

const NotFoundPage = lazy(() => import('@/pages/not-found'))
const ServerErrorPage = lazy(() => import('@/pages/server-error'))

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="health" element={<HealthPage />} />
            <Route path="cronjobs" element={<CronjobsPage />} />
            <Route path="workflows" element={<WorkflowsPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="runs/:runId" element={<RunDetailsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="organization" element={<OrganizationPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="docs" element={<DocsPage />} />
          </Route>

          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgb(35, 35, 38)',
            border: '1px solid rgb(55, 55, 60)',
            color: 'rgb(229, 231, 235)',
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
