import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { observeReveals } from '../../../shared/lib/reveal'
import { Header } from '../../header'
import { Footer } from '../../footer'

export function Layout() {
  const { pathname } = useLocation()

  // Har sahifa o'zgarganda tepaga ko'tarilamiz va yangi elementlarni kuzatamiz.
  // requestAnimationFrame — yangi sahifa DOM'ga joylashguncha kutish uchun.
  useEffect(() => {
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => observeReveals())
    return () => cancelAnimationFrame(id)
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
