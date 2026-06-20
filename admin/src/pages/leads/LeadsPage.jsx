import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../shared/ui'
import { fetchLeads, UnauthorizedError } from '../../features/leads'
import { clearToken } from '../../features/auth'

const PAGE_SIZE = 20
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

// Sertifikat/selfi havolalari ro'yxati (yangi tabda ochiladi).
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
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary-hover whitespace-nowrap"
        >
          Fayl {i + 1}
        </a>
      ))}
    </div>
  )
}

function PageBtn({ p, active, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(p)}
      className={`min-w-9 h-9 px-2.5 rounded-sm text-sm font-semibold transition ${
        active
          ? 'bg-primary text-white'
          : 'border border-line text-ink-muted hover:border-primary/50'
      }`}
    >
      {p}
    </button>
  )
}

// Sahifa raqamlari (Oldingi / 1 2 3 ... / Keyingi).
function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)
  for (let p = start; p <= end; p++) pages.push(p)

  return (
    <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        <ChevronLeft size={16} />
        Oldingi
      </Button>

      {start > 1 && (
        <>
          <PageBtn p={1} active={page === 1} onChange={onChange} />
          {start > 2 && <span className="px-1 text-ink-light">…</span>}
        </>
      )}

      {pages.map((p) => (
        <PageBtn key={p} p={p} active={p === page} onChange={onChange} />
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-1 text-ink-light">…</span>
          )}
          <PageBtn
            p={totalPages}
            active={page === totalPages}
            onChange={onChange}
          />
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Keyingi
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}

export function LeadsPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await fetchLeads({ page, limit: PAGE_SIZE })
        if (!active) return
        setItems(data.items)
        setTotal(data.total)
      } catch (err) {
        if (!active) return
        if (err instanceof UnauthorizedError) {
          navigate('/login', { replace: true })
          return
        }
        setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [page, navigate])

  const handlePageChange = (next) => {
    if (next < 1 || next > totalPages || next === page) return
    setPage(next)
    window.scrollTo({ top: 0 })
  }

  const handleLogout = () => {
    clearToken()
    navigate('/login', { replace: true })
  }

  const startIndex = (page - 1) * PAGE_SIZE

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
          <>
            <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-card">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-primary-soft/40 text-ink-muted">
                  <tr>
                    <th className="px-3 py-2.5 font-semibold">#</th>
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
                  {items.map((lead, i) => (
                    <tr
                      key={lead._id}
                      className="border-t border-line align-top hover:bg-bg/60"
                    >
                      <td className="px-3 py-2.5 text-ink-light">
                        {startIndex + i + 1}
                      </td>
                      <td className="px-3 py-2.5 text-ink-muted whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-3 py-2.5 text-ink font-medium whitespace-nowrap">
                        {[lead.firstName, lead.lastName]
                          .filter(Boolean)
                          .join(' ') || '—'}
                      </td>
                      <td className="px-3 py-2.5 text-ink-muted">
                        {lead.age ?? '—'}
                      </td>
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

            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  )
}
