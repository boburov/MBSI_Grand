import { GrantApplicationForm } from '../../../features/grant-application'
import { Container } from '../../../shared/ui'
import { GRANT } from '../../../shared/config/grant'

const STEPS = [
  {
    title: 'Shaxsiy ma‘lumotlar',
    text: 'Ism, familiya, yosh, ota-ona ma‘lumotlari va ijtimoiy reyestr holatini kiriting.',
  },
  {
    title: 'Akademik ma‘lumotlar',
    text: 'O‘qigan joyingiz, yutuqlaringiz va sertifikatlaringizni yuklang.',
  },
  {
    title: 'Ijtimoiy faollik',
    text: 'Qatnashgan tadbirlaringiz va ularning sertifikatlarini qo‘shing.',
  },
  {
    title: 'Selfi va yakun',
    text: 'Selfi rasmingizni yuklang va arizangizni yuboring.',
  },
]

export function ApplyPage() {
  return (
    <section
      className="bg-[radial-gradient(circle_at_15%_0%,_#eef4ff_0%,_transparent_50%)] bg-bg py-12 sm:py-16 lg:py-24"
      id="apply"
    >
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-9 lg:gap-16 items-start">
        <div>
          <span className="text-primary font-semibold text-[15px]">
            Ariza qoldirish
          </span>
          <h1 className="text-[24px] sm:text-[28px] lg:text-4xl font-extrabold tracking-[-1px] text-ink mt-2 mb-4">
            Grantga ariza qoldirish
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-ink-muted mb-9">
            {GRANT.totalFund} grant jamg‘armasi. Yo‘nalishingizni tanlang,
            o‘qigan joyingiz va maxsus qobiliyatlaringizni yozib, arizangizni
            qoldiring. Har bir yo‘nalishdan {GRANT.winnersPerDirection} nafar
            g‘olib aniqlanadi.
          </p>
          <ul className="flex flex-col gap-5 list-none">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3.5">
                <span className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-primary-soft text-primary font-bold">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-base font-semibold text-ink">
                    {step.title}
                  </span>
                  <span className="block text-[15px] leading-relaxed text-ink-muted mt-0.5">
                    {step.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <GrantApplicationForm />
        </div>
      </Container>
    </section>
  )
}
