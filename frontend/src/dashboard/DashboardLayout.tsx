import { useLocation } from 'react-router-dom'
import { Sidenav } from '../components/Sidenav'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {

  const location = useLocation()
  // Layout dashboard with sidenav

  return (
    <section className="flex flex-col min-h-screen text-neutral-950 dark:text-neutral-100">
      <Sidenav pathname={location.pathname} />
      <Outlet />
    </section>
  )
}
