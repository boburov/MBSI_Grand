import { Link } from 'react-router-dom'
import { Button, Container } from '../../../shared/ui'
import { ADMISSION_STEPS } from '../../../shared/config/school'

export function Admission() {
  return (
    <section className="bg-bg-soft py-12 sm:py-16 lg:py-24" id="admission">
      <Container>
        <div
          data-aos="fade-up"
          className="mx-auto mb-10 max-w-[640px] text-center sm:mb-12"
        >
          <span className="text-[15px] font-semibold text-primary">
            Qabul jarayoni
          </span>
          <h2 className="mb-3 mt-2 text-[22px] font-extrabold tracking-[-1px] text-ink sm:text-[28px] lg:text-4xl">
            Qanday qabul qilamiz?
          </h2>
          <p className="m-0 text-base text-ink-muted sm:text-lg">
            Farzandining kelajagi haqida qayg‘uradigan ota-onalar uchun oddiy va
            tushunarli qabul bosqichlari.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADMISSION_STEPS.map((step, i) => (
            <article
              key={step.title}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 100}
              className="relative flex flex-col rounded-lg border border-line bg-white p-5 sm:p-7"
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
