import { getDashboardStats } from './actions'
import DashboardClient from './dashboard-client'

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  return <DashboardClient stats={stats} />
}
