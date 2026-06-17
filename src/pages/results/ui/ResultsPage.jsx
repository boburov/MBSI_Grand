import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import { Button, Container } from '../../../shared/ui'
import { ORG } from '../../../shared/config/org'
import { SCHOOL_STATS, ACHIEVEMENTS } from '../../../shared/config/achievements'

export function ResultsPage() {
  return (
    <>
      {/* Sarlavha */}
      <section className="bg-[radial-gradient(circle_at_80%_0%,_#eef4ff_0%,_transparent_55%)] bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div data-aos="fade-up" className="mx-auto max-w-[700px] text-center">
            <span className="text-[15px] font-semibold text-primary">
              Maktab yutuqlari
            </span>
            <h1 className="mt-2 mb-4 text-[26px] font-extrabold tracking-[-1px] text-ink sm:text-[30px] lg:text-[42px]">
              Bizning natijalarimiz
            </h1>
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {ORG.fullName} o‘quvchilari yillar davomida olimpiada, tanlov va
              imtihonlarda yuqori natijalarga erishib kelmoqda. Quyida maktabimiz
              statistikasi va asosiy yutuqlari keltirilgan.
            </p>
          </div>

          {/* Statistika */}
          <div className="mx-auto mt-10 grid max-w-[760px] grid-cols-2 gap-4 sm:grid-cols-4">
            {SCHOOL_STATS.map((s, i) => (
              <div
                key={s.label}
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 80}
                className="rounded-lg border border-line bg-white px-3 py-5 text-center shadow-soft sm:px-4"
              >
                <div className="text-[24px] font-extrabold leading-none tracking-[-1px] text-primary sm:text-[30px] lg:text-[36px]">
                  {s.value}
                </div>
                <div className="mt-2 text-[13px] leading-snug text-ink-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Yutuqlar */}
      <section className="bg-bg-soft py-12 sm:py-12 lg:py-16">
        <Container>
          <div
            data-aos="fade-up"
            className="mx-auto mb-10 max-w-[560px] text-center"
          >
            <span className="text-[15px] font-semibold text-primary">
              Yutuqlarimiz
            </span>
            <h2 className="mt-2 text-[24px] font-extrabold tracking-[-1px] text-ink sm:text-[26px] lg:text-[32px]">
              Maktab yutuqlari
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map((item, i) => (
              <article
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
                className="flex flex-col rounded-lg border border-line bg-white p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary-soft hover:shadow-card sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-bg-blue text-primary">
                  <Trophy size={22} strokeWidth={2} />
                </div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  {item.meta && (
                    <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-[12.5px] font-semibold text-primary">
                      {item.meta}
                    </span>
                  )}
                </div>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="mb-5 text-ink-muted">
              Siz ham maktabimiz yutuqlarining bir qismi bo‘lishni xohlaysizmi?
            </p>
            <Button as={Link} to="/ariza" size="lg">
              Grantga ariza qoldirish
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
