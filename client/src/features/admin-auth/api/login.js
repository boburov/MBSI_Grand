import { setToken } from '../lib/token'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Admin login — muvaffaqiyatda tokenni saqlaydi va admin obyektini qaytaradi.
// Xatolikda Error tashlaydi (server xabari bilan).
export async function login({ username, password }) {
  let res
  try {
    res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  } catch {
    throw new Error('Serverga ulanib bo‘lmadi. Internetni tekshiring.')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Kirishda xatolik.')
  }

  setToken(data.token)
  return data.admin
}
