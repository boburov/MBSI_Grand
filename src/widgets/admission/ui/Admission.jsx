import { Link } from 'react-router-dom'
import { Button, Container } from '../../../shared/ui'
import { ADMISSION_STEPS } from '../../../shared/config/school'

export function Admission() {
  return (
    <section className="bg-bg-soft py-16 lg:py-24" id="admission">
      <Container>
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <span className="text-[15px] font-semibold text-primary">
            Qabul jarayoni
          </span>
          <h2 className="mb-3 mt-2 text-[28px] font-extrabold tracking-[-1px] text-ink lg:text-4xl">
            Qanday qabul qilamiz?
          </h2>
          <p className="m-0 text-lg text-ink-muted">
            Farzandining kelajagi haqida qayg‘uradigan ota-onalar uchun oddiy va
            tushunarli qabul bosqichlari.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADMISSION_STEPS.map((step, i) => (
            <article
              key={step.title}
              className="relative flex flex-col rounded-lg border border-line bg-white p-7"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[15px] font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mb-1.5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                {step.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button as={Link} to="/ariza" size="lg">
            Hoziroq ariza qoldirish
          </Button>
        </div>
      </Container>
    </section>
  )
}
