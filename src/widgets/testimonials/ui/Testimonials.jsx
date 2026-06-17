import { Quote } from 'lucide-react'
import { Container } from '../../../shared/ui'
import { TESTIMONIALS } from '../../../shared/config/grant'

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-violet-100 text-violet-700',
  'bg-rose-100 text-rose-700',
]

const getInitials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

function TestimonialCard({ t, index }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-white p-7">
      <Quote
        size={28}
        strokeWidth={2}
        className="mb-4 text-primary-soft"
        style={{ fill: 'currentColor' }}
      />
      <p className="mb-6 flex-1 text-[15px] leading-relaxed text-ink">
        “{t.text}”
      </p>
      <div className="flex items-center gap-3 border-t border-line pt-5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${
            AVATAR_COLORS[index % AVATAR_COLORS.length]
          }`}
        >
          {getInitials(t.name)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[15px] font-bold text-ink">
            {t.name}
          </div>
          <div className="truncate text-[13px] text-ink-muted">
            {t.role}
            {t.year ? ` · ${t.year}` : ''}
          </div>
        </div>
      </div>
    </article>
  )
}

export function Testimonials() {
  if (!TESTIMONIALS?.length) return null

  return (
    <section className="bg-bg-soft py-16 lg:py-24" id="testimonials">
      <Container>
        <div className="mx-auto mb-12 max-w-[620px] text-center">
          <span className="text-[15px] font-semibold text-primary">
            G‘oliblar fikri
          </span>
          <h2 className="mb-3 mt-2 text-[28px] font-extrabold tracking-[-1px] text-ink lg:text-4xl">
            O‘tgan yilgi grant g‘oliblari
          </h2>
          <p className="m-0 text-lg text-ink-muted">
            Grant dasturida g‘olib bo‘lgan o‘quvchilar o‘z tajribalari bilan
            o‘rtoqlashadi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
