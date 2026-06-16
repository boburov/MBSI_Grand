import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../header'
import { Footer } from '../../footer'

export function Layout() {
  const { pathname } = useLocation()

  // Har sahifa o'zgarganda tepaga ko'tarilamiz
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
