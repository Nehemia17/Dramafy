import { getSession } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  // If no session (e.g. on /admin/login), render children without admin sidebar wrapper
  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  )
}
