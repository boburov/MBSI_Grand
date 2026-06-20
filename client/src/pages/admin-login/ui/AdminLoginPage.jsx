import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../../../shared/ui'
import { login, isAuthed } from '../../../features/admin-auth'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Allaqachon kirgan bo'lsa to'g'ridan-to'g'ri panelga.
  useEffect(() => {
    if (isAuthed()) {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ username, password })
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Kirishda xatolik.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-5 bg-white p-7 sm:p-8 rounded-lg shadow-float border border-line"
      >
        <div className="text-center">
          <h1 className="text-[22px] font-extrabold text-ink m-0">Admin panel</h1>
          <p className="text-ink-muted text-sm mt-1 m-0">
            Davom etish uchun tizimga kiring
          </p>
        </div>

        <Input
          id="username"
          label="Login"
          placeholder="admin"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          id="password"
          label="Parol"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-[13.5px] text-red-600 bg-red-50 rounded-sm px-3 py-2 m-0 text-center">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Kirilmoqda...' : 'Kirish'}
        </Button>
      </form>
    </div>
  )
}
