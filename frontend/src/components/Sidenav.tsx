/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'

export const Sidenav = ({ pathname }: any) => {

  if (pathname === '/dashboard') {
    document.title = 'bee - dashboard'
  }

  if (pathname === '/dashboard/settings') {
    document.title = 'bee - dashboard/settings'
  }

  return (
    <section className='border-b border-zinc-800'>
      <div className='flex px-4 mx-auto gap-14 max-w-screen-2xl'>

        <div>
          <Link to='/dashboard' className={`flex gap-1.5 items-center py-4 ${pathname === '/dashboard' ? 'border-b' : 'border-none opacity-60 hover:opacity-100 transition ease-in-out'}`}>
            <img className='size-5' src="/link.svg" alt="link image" />
            Links
          </Link>
        </div>

        <div>
          <Link to='/dashboard/settings' className={`flex gap-1.5 items-center py-4 ${pathname === '/dashboard/settings' ? 'border-b' : 'border-none opacity-60 hover:opacity-100 transition ease-in-out'}`}>
            <img className='size-5' src="/setting.svg" alt="setting image" />
            Settings
          </Link>
        </div>

      </div>
    </section>
  )
}
