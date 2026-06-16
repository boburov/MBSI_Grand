import {
  Trophy,
  Dumbbell,
  Users,
  Award,
  Clapperboard,
  BrainCircuit,
  Star,
  CheckCircle2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Container } from '../../../shared/ui'
import {
  GRANT,
  GRANT_DIRECTIONS,
  GRANT_PRIZES,
} from '../../../shared/config/grant'

const ICONS = {
  sport: Dumbbell,
  'social-activity': Users,
  certificate: Award,
  creativity: Clapperboard,
  olympiad: BrainCircuit,
  'social-rating': Star,
}

const TIER = {
  gold: 'border-gold text-[#b07d00] bg-[#fffaf0]',
  silver: 'border-silver text-[#5a6572] bg-[#f7f8fa]',
  bronze: 'border-bronze text-[#9a5a1e] bg-[#fdf6ef]',
}

export function Grant() {
  return (
    <section
      id="grant"
      className="py-16 lg:py-24 bg-[radial-gradient(circle_at_80%_0%,_#eef4ff_0%,_transparent_55%)] bg-white"
    >
      <Container>
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <span className="text-primary font-semibold text-[15px]">
            Grant dasturi
          </span>
          <h2 className="text-[28px] lg:text-4xl font-extrabold tracking-[-1px] text-ink mt-2 mb-3">
            <span className="text-primary">{GRANT.totalFund}</span> grant
            jamg‘armasi
          </h2>
          <p className="text-lg text-ink-muted m-0">
            {GRANT_DIRECTIONS.length} ta yo‘nalish bo‘yicha tanlov o‘tkaziladi.
            Har bir yo‘nalishdan {GRANT.winnersPerDirection} nafar g‘olib
            aniqlanadi va quyidagi mukofotlar bilan taqdirlanadi.
          </p>
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 mb-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {GRANT_PRIZES.map((prize) => (
            <div
              key={prize.place}
              className={`flex items-center gap-2.5 font-bold text-[15px] py-3.5 px-6 rounded-md border-[1.5px] sm:inline-flex ${TIER[prize.tier]}`}
            >
              <Trophy size={22} strokeWidth={2} className="shrink-0" />
              <span>{prize.label}</span>
              <span className="ml-auto text-[17px] font-extrabold sm:ml-0">
                {prize.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GRANT_DIRECTIONS.map((dir) => {
            const IconComponent = ICONS[dir.value]
            return (
              <article
                key={dir.value}
                className="flex flex-col items-start bg-white border border-line rounded-lg p-7 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-card hover:border-primary-soft"
              >
                <div className="flex items-center justify-between w-full mb-[18px]">
                  <div className="w-[52px] h-[52px] rounded-md bg-bg-blue text-primary flex items-center justify-center">
                    <IconComponent size={26} strokeWidth={2} />
                  </div>
                  <span className="text-[13px] font-semibold text-primary bg-primary-soft py-1 px-3 rounded-full">
                    {GRANT.winnersPerDirection} g‘olib
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">{dir.label}</h3>
                <p className="text-[15px] leading-relaxed text-ink-muted mb-4">
                  {dir.description}
                </p>
                <div className="flex items-start gap-2 text-[13.5px] leading-normal text-ink mt-auto pt-3.5 border-t border-line w-full">
                  <CheckCircle2
                    size={16}
                    strokeWidth={2}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span>{dir.requirement}</span>
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button as={Link} to="/ariza" size="lg">
            Grantga ariza qoldirish
          </Button>
        </div>
      </Container>
    </section>
  )
}
