import { useLocation } from 'react-router-dom'
import { Sidenav } from '../components/Sidenav'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {

  const location = useLocation()

  return (
    <section className="flex flex-col min-h-full text-black dark:text-white">
      <Sidenav pathname={location.pathname} />
      <Outlet />
    </section>
  )
}
