import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../shared/ui'
import { fetchLeads, UnauthorizedError } from '../../../features/leads'
import { clearToken } from '../../../features/admin-auth'

const REGISTRY_LABEL = { yes: 'Ha', no: 'Yo‘q' }

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Bitta fayl havolasi (yangi tabda ochiladi).
function FileLink({ url, index }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline hover:text-primary-hover whitespace-nowrap"
    >
      Fayl {index + 1}
    </a>
  )
}

// Sertifikat/selfi havolalari ro'yxati.
function FileLinks({ lead }) {
  const all = [
    ...(lead.certificateUrls || []),
    ...(lead.socialCertificateUrls || []),
    ...(lead.selfieUrl ? [lead.selfieUrl] : []),
  ]
  if (!all.length) return <span className="text-ink-light">—</span>
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {all.map((url, i) => (
        <FileLink key={url} url={url} index={i} />
      ))}
    </div>
  )
}

export function AdminLeadsPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchLeads({ page: 1, limit: 100 })
      .then((data) => {
        if (!active) return
        setItems(data.items)
        setTotal(data.total)
      })
      .catch((err) => {
        if (!active) return
        if (err instanceof UnauthorizedError) {
          navigate('/admin/login', { replace: true })
          return
        }
        setError(err.message)
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [navigate])

  const handleLogout = () => {
    clearToken()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-white border-b border-line">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-extrabold text-ink m-0">
              Qoldirilgan arizalar
            </h1>
            <p className="text-ink-muted text-sm m-0 mt-0.5">
              Jami: {total} ta ariza
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Chiqish
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-container px-4 sm:px-6 py-6">
        {loading && <p className="text-ink-muted">Yuklanmoqda...</p>}

        {error && (
          <p className="text-red-600 bg-red-50 rounded-sm px-3 py-2">{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-ink-muted">Hozircha ariza yo‘q.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-card">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-primary-soft/40 text-ink-muted">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Sana</th>
                  <th className="px-3 py-2.5 font-semibold">Ism familiya</th>
                  <th className="px-3 py-2.5 font-semibold">Yosh</th>
                  <th className="px-3 py-2.5 font-semibold">Telefon</th>
                  <th className="px-3 py-2.5 font-semibold">Maktab</th>
                  <th className="px-3 py-2.5 font-semibold">Reyestr</th>
                  <th className="px-3 py-2.5 font-semibold">Chegirma</th>
                  <th className="px-3 py-2.5 font-semibold">Fayllar</th>
                </tr>
              </thead>
              <tbody>
                {items.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-line align-top hover:bg-bg/60"
                  >
                    <td className="px-3 py-2.5 text-ink-muted whitespace-nowrap">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-3 py-2.5 text-ink font-medium whitespace-nowrap">
                      {[lead.firstName, lead.lastName].filter(Boolean).join(' ') ||
                        '—'}
                    </td>
                    <td className="px-3 py-2.5 text-ink-muted">{lead.age ?? '—'}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {lead.phoneDisplay || lead.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-primary hover:underline"
                        >
                          {lead.phoneDisplay || lead.phone}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-ink-muted">
                      {lead.school || '—'}
                    </td>
                    <td className="px-3 py-2.5 text-ink-muted">
                      {REGISTRY_LABEL[lead.socialRegistry] || '—'}
                    </td>
                    <td className="px-3 py-2.5 text-ink-muted">
                      {lead.discount ? `${lead.discount}%` : '—'}
                    </td>
                    <td className="px-3 py-2.5">
                      <FileLinks lead={lead} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
