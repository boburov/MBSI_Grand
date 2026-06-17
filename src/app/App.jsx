import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Layout } from '../widgets/layout'
import { HomePage } from '../pages/home'
import { ApplyPage } from '../pages/apply'
import { ResultsPage } from '../pages/results'
import { AboutPage } from '../pages/about'
import './styles/global.css'

export function App() {
  useEffect(() => {
    AOS.init({
      duration: 650, // animatsiya davomiyligi (ms)
      easing: 'ease-out-cubic',
      once: true, // har element bir marta animatsiya qiladi
      offset: 80, // elementdan qancha oldin ishga tushsin
      disable: () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ariza" element={<ApplyPage />} />
          <Route path="/natijalar" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
