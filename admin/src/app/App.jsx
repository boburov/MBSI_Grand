import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/login/LoginPage'
import { LeadsPage } from '../pages/leads/LeadsPage'
import { RequireAuth } from './RequireAuth'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<LeadsPage />} />
        </Route>
        {/* Noma'lum manzillar bosh sahifaga */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
