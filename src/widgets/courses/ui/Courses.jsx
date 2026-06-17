import {
  Sigma,
  Atom,
  Code2,
  Languages,
  FlaskConical,
  Dna,
} from 'lucide-react'
import { Container } from '../../../shared/ui'
import { COURSES } from '../../../shared/config/courses'

const ICONS = {
  math: Sigma,
  physics: Atom,
  informatics: Code2,
  english: Languages,
  chemistry: FlaskConical,
  biology: Dna,
}

const DESCRIPTIONS = {
  math: 'Chuqurlashtirilgan matematika va olimpiadalarga tayyorgarlik.',
  physics: 'Nazariy va amaliy fizika, laboratoriya mashg‘ulotlari.',
  informatics: 'Algoritmlar, dasturlash va zamonaviy texnologiyalar.',
  english: 'SAT va IELTS imtihonlariga yo‘naltirilgan ingliz tili.',
  chemistry: 'Organik va anorganik kimyo, tajriba asosida o‘qitish.',
  biology: 'Tirik organizmlar, genetika va tibbiyotga kirish asoslari.',
}

export function Courses() {
  return (
    <section className="bg-bg-soft py-12 sm:py-16 lg:py-24" id="courses">
      <Container>
        <div
          data-aos="fade-up"
          className="mx-auto mb-10 max-w-[600px] text-center sm:mb-14"
        >
          <span className="text-[15px] font-semibold text-primary">
            Bizning dasturlar
          </span>
          <h2 className="mb-3 mt-2 text-[22px] font-extrabold tracking-[-1px] text-ink sm:text-3xl lg:text-[36px]">
            Fanlar bo‘yicha ixtisoslashuv
          </h2>
          <p className="text-base text-ink-muted sm:text-lg">
            Har bir bosqichda yuqori sifatli ta’lim va amaliy innovatsiya —
            chuqurlashtirilgan dasturlar asosida.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => {
            const IconComponent = ICONS[course.value]
            return (
              <article
                key={course.value}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
                className="rounded-lg border border-line bg-bg p-5 transition hover:-translate-y-1 hover:border-primary-soft hover:shadow-card sm:p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-bg-blue text-primary">
                  <IconComponent size={28} strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-ink">
                  {course.label}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  {DESCRIPTIONS[course.value]}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
