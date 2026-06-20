import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../widgets/layout'
import { HomePage } from '../pages/home'
import { ApplyPage } from '../pages/apply'
import { ResultsPage } from '../pages/results'
import { AboutPage } from '../pages/about'
import { AdminLoginPage } from '../pages/admin-login'
import { AdminLeadsPage } from '../pages/admin-leads'
import { RequireAuth } from './RequireAuth'
import './styles/global.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ariza" element={<ApplyPage />} />
          <Route path="/natijalar" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Admin panel — public Layout'dan tashqarida (Header/Footer ko'rsatilmaydi) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLeadsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
