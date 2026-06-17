import { Wallet, GraduationCap, BookOpen, Users, Award, Rocket } from 'lucide-react'
import { Container } from '../../../shared/ui'
import { GRANT_BENEFITS } from '../../../shared/config/grant'

const ICONS = {
  wallet: Wallet,
  graduation: GraduationCap,
  book: BookOpen,
  users: Users,
  award: Award,
  rocket: Rocket,
}

export function Benefits() {
  return (
    <section className="bg-white py-16 lg:py-24" id="benefits">
      <Container>
        <div className="mx-auto mb-12 max-w-[620px] text-center">
          <span className="text-[15px] font-semibold text-primary">
            Grant imkoniyatlari
          </span>
          <h2 className="mb-3 mt-2 text-[28px] font-extrabold tracking-[-1px] text-ink lg:text-4xl">
            Grant yutsangiz nimaga ega bo‘lasiz?
          </h2>
          <p className="m-0 text-lg text-ink-muted">
            Grant g‘oliblari uchun moliyaviy mukofotdan tashqari ko‘plab ta’limiy
            va rivojlanish imkoniyatlari taqdim etiladi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GRANT_BENEFITS.map((b) => {
            const Icon = ICONS[b.icon] ?? Award
            return (
              <article
                key={b.title}
                className="flex flex-col items-start rounded-lg border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary-soft hover:shadow-card"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-bg-blue text-primary">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{b.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  {b.text}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
