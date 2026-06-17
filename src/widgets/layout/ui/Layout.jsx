import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AOS from 'aos'
import { Header } from '../../header'
import { Footer } from '../../footer'

export function Layout() {
  const { pathname } = useLocation()

  // Har sahifa o'zgarganda tepaga ko'tarilamiz va AOS'ni yangilaymiz
  useEffect(() => {
    window.scrollTo(0, 0)
    AOS.refreshHard()
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
