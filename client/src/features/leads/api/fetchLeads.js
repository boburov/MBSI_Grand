import { getToken, clearToken } from '../../admin-auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// 401 holatini ajratish uchun maxsus xato — sahifa login'ga yo'naltiradi.
export class UnauthorizedError extends Error {
  constructor() {
    super('Sessiya tugagan.')
    this.name = 'UnauthorizedError'
  }
}

// Leadlar ro'yxatini oladi (himoyalangan). Token yo'q/yaroqsiz bo'lsa UnauthorizedError.
export async function fetchLeads({ page = 1, limit = 50 } = {}) {
  const token = getToken()
  if (!token) throw new UnauthorizedError()

  let res
  try {
    res = await fetch(`${API_URL}/api/leads?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch {
    throw new Error('Serverga ulanib bo‘lmadi.')
  }

  if (res.status === 401) {
    clearToken()
    throw new UnauthorizedError()
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Arizalarni yuklab bo‘lmadi.')
  }

  return data // { items, total, page, limit }
}
