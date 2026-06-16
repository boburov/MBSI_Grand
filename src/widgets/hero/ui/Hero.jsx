import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Container } from '../../../shared/ui'
import { ORG } from '../../../shared/config/org'
import { GRANT, GRANT_DIRECTIONS } from '../../../shared/config/grant'
import studentsImg from '../../../assets/students.jpg'

const STATS = [
  { value: `${GRANT_DIRECTIONS.length}`, label: 'Yo‘nalish' },
  { value: `${GRANT.winnersPerDirection}`, label: 'Har yo‘nalishdan g‘olib' },
  { value: `${GRANT_DIRECTIONS.length * GRANT.winnersPerDirection}`, label: 'Jami g‘oliblar' },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function Hero() {
  return (
    <section className="bg-[radial-gradient(circle_at_20%_0%,_#eef4ff_0%,_transparent_55%)] bg-bg pt-16 pb-20 lg:pt-28 lg:pb-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="flex flex-col items-start">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
            <GraduationCap size={16} strokeWidth={2.2} />
            {ORG.district} · {ORG.academicYear} o‘quv yili
          </span>
          <h1 className="m-0 mb-7 text-[34px] font-extrabold leading-[1.12] tracking-[-1px] text-ink sm:text-[42px] lg:text-[46px]">
            <span className="text-primary">{GRANT.totalFund}</span> grant —
            iste’dodingni namoyon et!
          </h1>
          <p className="m-0 mb-10 max-w-[500px] text-lg leading-[1.7] text-ink-muted">
            {ORG.fullName} {GRANT.totalFund} grant jamg‘armasini e’lon qiladi.
            Har bir yo‘nalishdan {GRANT.winnersPerDirection} nafar g‘olib
            aniqlanadi. Yo‘nalishingni tanla, qobiliyatingni ko‘rsat va grantga
            ariza qoldir.
          </p>
          <div className="mb-12 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4 lg:mb-14">
            <Button
              as={Link}
              to="/ariza"
              size="lg"
              className="w-full sm:w-auto"
            >
              Grantga ariza qoldirish
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
          <div className="flex items-center gap-5 sm:gap-6">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-5 sm:gap-6">
                {i > 0 && <span className="h-9 w-px bg-line" aria-hidden />}
                <div className="flex flex-col">
                  <span className="text-lg font-bold leading-none tracking-[-0.3px] text-ink">
                    {stat.value}ta
                  </span>
                  <span className="mt-1 whitespace-nowrap text-xs leading-snug text-ink-muted">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            className="block aspect-[4/5] w-full rounded-lg object-cover shadow-float sm:aspect-[4/3] lg:aspect-[5/6]"
            src={studentsImg}
            alt={`${ORG.fullName} o‘quvchilari`}
          />
          <div className="absolute bottom-5 left-5 flex flex-col rounded-md bg-bg px-5 py-4 shadow-card lg:-left-6 lg:bottom-8">
            <span className="text-xl font-extrabold leading-[1.1] tracking-[-0.5px] text-primary">
              {GRANT.totalFund}
            </span>
            <span className="text-sm text-ink-muted">grant jamg‘armasi</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
