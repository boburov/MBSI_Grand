import { Backpack, BookOpen, GraduationCap } from 'lucide-react'
import { Container } from '../../../shared/ui'
import { GRADE_PROGRAMS } from '../../../shared/config/school'

const ICONS = [Backpack, BookOpen, GraduationCap]

export function Programs() {
  return (
    <section className="bg-white py-16 lg:py-24" id="programs">
      <Container>
        <div className="mx-auto mb-12 max-w-[620px] text-center">
          <span className="text-[15px] font-semibold text-primary">
            Ta’lim bosqichlari
          </span>
          <h2 className="mb-3 mt-2 text-[28px] font-extrabold tracking-[-1px] text-ink lg:text-4xl">
            Har bir bosqich uchun dastur
          </h2>
          <p className="m-0 text-lg text-ink-muted">
            1-sinfdan 11-sinfgacha — har bir yoshga mos, izchil va sifatli
            ta’lim dasturi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {GRADE_PROGRAMS.map((p, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <article
                key={p.level}
                className="flex flex-col rounded-lg border border-line bg-white p-8 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary-soft hover:shadow-card"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-bg-blue text-primary">
                  <Icon size={28} strokeWidth={2} />
                </div>
                <div className="mb-2 flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-ink">{p.level}</h3>
                  <span className="text-[13px] font-semibold text-primary">
                    {p.grades}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  {p.text}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
