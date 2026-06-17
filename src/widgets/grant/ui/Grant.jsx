import { useState } from 'react'
import {
  Trophy,
  Dumbbell,
  Users,
  Award,
  Clapperboard,
  BrainCircuit,
  Star,
  CheckCircle2,
  ChevronDown,
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

function DirectionItem({ dir, isOpen, onToggle }) {
  const IconComponent = ICONS[dir.value]

  return (
    <div
      className={`overflow-hidden rounded-lg border bg-white transition-colors ${
        isOpen ? 'border-primary-soft shadow-card' : 'border-line'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-bg-blue text-primary">
          <IconComponent size={24} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-ink">{dir.label}</h3>
          <p className="mt-0.5 truncate text-[13.5px] text-ink-muted">
            {dir.description}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-[12.5px] font-semibold text-primary max-sm:hidden">
          {GRANT.winnersPerDirection} g‘olib
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2.2}
          className={`shrink-0 text-ink-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line px-5 pb-6 pt-5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-ink">
                  <CheckCircle2 size={16} strokeWidth={2.2} className="text-primary" />
                  Qatnashish shartlari
                </h4>
                <ul className="flex flex-col gap-2">
                  {dir.conditions.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14px] leading-snug text-ink-muted"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-ink">
                  <Trophy size={16} strokeWidth={2.2} className="text-primary" />
                  Qanday grant yutish mumkin
                </h4>
                <ul className="flex flex-col gap-2">
                  {dir.howToWin.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14px] leading-snug text-ink-muted"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <Button as={Link} to="/ariza" size="sm">
                Shu yo‘nalishda ariza
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Grant() {
  const [openValue, setOpenValue] = useState(GRANT_DIRECTIONS[0]?.value ?? null)

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
            {GRANT_DIRECTIONS.length} ta yo‘nalish, har biridan{' '}
            {GRANT.winnersPerDirection} nafar g‘olib.
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
              <span className="ml-auto text-[17px] font-extrabold text-primary sm:ml-0">
                {prize.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto mb-6 max-w-[760px] text-center">
          <h3 className="text-xl font-bold text-ink">Yo‘nalishlar</h3>
          <p className="mt-1.5 text-[15px] text-ink-muted">
            Yo‘nalishni tanlang va shartlar bilan tanishing.
          </p>
        </div>

        <div className="mx-auto flex max-w-[760px] flex-col gap-3">
          {GRANT_DIRECTIONS.map((dir) => (
            <DirectionItem
              key={dir.value}
              dir={dir}
              isOpen={openValue === dir.value}
              onToggle={() =>
                setOpenValue((prev) => (prev === dir.value ? null : dir.value))
              }
            />
          ))}
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
