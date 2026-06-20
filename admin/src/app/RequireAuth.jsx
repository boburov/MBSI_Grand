import { Navigate, Outlet } from 'react-router-dom'
import { isAuthed } from '../features/auth'

// Token bo'lmasa login sahifasiga yo'naltiradi, aks holda ichki route'larni ko'rsatadi.
export function RequireAuth() {
  if (!isAuthed()) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
