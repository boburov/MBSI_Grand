import { GraduationCap, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Container } from '../../../shared/ui'
import { ORG } from '../../../shared/config/org'
import { GRANT } from '../../../shared/config/grant'

// sodiq.school uslubidagi katta, jasur statistika
const STATS = [
  { value: '2100+', label: 'Faol o‘quvchilar' },
  { value: '1320', label: 'O‘rtacha SAT bali' },
  { value: '6.5+', label: 'O‘rtacha IELTS bali' },
  { value: '150+', label: 'Olimpiada g‘oliblari' },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,_#eef4ff_0%,_transparent_60%)] bg-bg pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-20">
      <Container className="flex flex-col items-center text-center">
        <span
          data-aos="fade-up"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-soft bg-primary-soft/60 px-3 py-1.5 text-[13px] font-semibold text-primary sm:mb-7 sm:px-4 sm:py-2 sm:text-sm"
        >
          <GraduationCap size={16} strokeWidth={2.2} className="shrink-0" />
          {ORG.district} · {ORG.academicYear} o‘quv yili
        </span>

        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="m-0 max-w-[920px] text-[26px] font-extrabold uppercase leading-[1.12] tracking-[-0.5px] text-ink sm:text-[44px] sm:tracking-[-1px] lg:text-[56px]"
        >
          Kelajak{' '}
          <span className="text-primary">yetakchilarini</span>{' '}
          yetishtiramiz
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mx-auto mt-5 max-w-[660px] text-[15px] leading-[1.65] text-ink-muted sm:mt-6 sm:text-lg sm:leading-[1.7]"
        >
          {ORG.fullName} — aniq fanlar (STEM) yo‘nalishi bo‘yicha
          ixtisoslashgan maktab. O‘quvchilarni xalqaro imtihonlarga va
          dunyoning yetuk universitetlariga tayyorlaymiz. Bu yil{' '}
          <span className="relative inline-block overflow-hidden rounded-md bg-primary px-2 py-0.5 font-extrabold text-white shadow-card">
            <span className="relative z-10">{GRANT.totalFund}</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </span>{' '}
          grant jamg‘armasi e’lon qilindi.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4"
        >
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
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-10 grid w-full max-w-[900px] grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:mt-14 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 80}
              className="flex flex-col items-center bg-white px-2 py-6 sm:px-4 sm:py-7"
            >
              <span className="text-[22px] font-extrabold leading-none tracking-[-0.5px] text-primary sm:text-[32px]">
                {stat.value}
              </span>
              <span className="mt-2 text-center text-[12px] font-medium leading-snug text-ink-muted sm:text-[13px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
