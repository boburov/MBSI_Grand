import { ApplicationForm } from '../../../features/leave-application'
import { Container } from '../../../shared/ui'
import { GRANT } from '../../../shared/config/grant'

const STEPS = [
  'Yo‘nalishni tanlang',
  'Qobiliyatlaringizni yozing',
  'Aloqa ma‘lumotlarini qoldiring',
]

export function ApplySection() {
  return (
    <section
      className="bg-[radial-gradient(circle_at_15%_0%,_#eef4ff_0%,_transparent_50%)] bg-bg py-16 lg:py-24"
      id="apply"
    >
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-start">
        <div>
          <span className="text-primary font-semibold text-[15px]">Ariza qoldirish</span>
          <h2 className="text-[28px] lg:text-4xl font-extrabold tracking-[-1px] text-ink mt-2 mb-4">
            Grantga ariza qoldirish
          </h2>
          <p className="text-lg leading-relaxed text-ink-muted mb-9">
            {GRANT.totalFund} grant jamg‘armasi. Yo‘nalishingizni tanlang,
            o‘qigan joyingiz va maxsus qobiliyatlaringizni yozib, arizangizni
            qoldiring.
          </p>
          <ul className="flex flex-col gap-[18px] list-none">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-3.5 text-base font-medium text-ink"
              >
                <span className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-primary-soft text-primary font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ApplicationForm />
        </div>
      </Container>
    </section>
  )
}
