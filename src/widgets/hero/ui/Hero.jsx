import { GraduationCap, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Container } from '../../../shared/ui'
import { ORG } from '../../../shared/config/org'
import { GRANT } from '../../../shared/config/grant'

// sodiq.school uslubidagi katta, jasur statistika
const STATS = [
  { value: '2100+', label: 'Faol o‘quvchilar' },
  { value: '1320', label: 'O‘rtacha SAT bali' },
  { value: '6.5+', label: 'O‘rtacha IELTS' },
  { value: GRANT.totalFund, label: 'Grant jamg‘armasi', wide: true },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,_#eef4ff_0%,_transparent_60%)] bg-bg pt-16 pb-16 lg:pt-24 lg:pb-20">
      <Container className="flex flex-col items-center text-center">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary-soft bg-primary-soft/60 px-4 py-2 text-sm font-semibold text-primary">
          <GraduationCap size={16} strokeWidth={2.2} />
          {ORG.district} · {ORG.academicYear} o‘quv yili
        </span>

        <h1 className="m-0 max-w-[920px] text-[32px] font-extrabold uppercase leading-[1.1] tracking-[-1px] text-ink sm:text-[44px] lg:text-[56px]">
          O‘quvchilarni dunyoning{' '}
          <span className="text-primary">TOP universitetlariga</span>{' '}
          tayyorlovchi maktab
        </h1>

        <p className="mx-auto mt-6 max-w-[640px] text-lg leading-[1.7] text-ink-muted">
          {ORG.fullName} — STEM yo‘nalishlari chuqurlashtirilgan, xalqaro
          imtihonlarga (SAT, IELTS, CEFR) tayyorlovchi zamonaviy maktab. Bu yil{' '}
          <span className="font-semibold text-ink">{GRANT.totalFund}</span> grant
          jamg‘armasi e’lon qilindi.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button as={Link} to="/ariza" size="lg" className="w-full sm:w-auto">
            Grantga ariza qoldirish
            <ArrowRight size={18} strokeWidth={2.4} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo('grant')}
            className="w-full sm:w-auto"
          >
            Yo‘nalishlar
          </Button>
        </div>

        {/* Katta jasur statistika — sodiq.school uslubi */}
        <div className="mt-14 grid w-full max-w-[900px] grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-white px-4 py-7"
            >
              <span className="text-[26px] font-extrabold leading-none tracking-[-0.5px] text-primary sm:text-[32px]">
                {stat.value}
              </span>
              <span className="mt-2 text-[13px] font-medium leading-snug text-ink-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
