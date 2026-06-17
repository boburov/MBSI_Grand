import { Award } from 'lucide-react'
import { Container } from '../../../shared/ui'
import { STUDENT_RESULTS } from '../../../shared/config/students'

const getInitials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

function ResultCard({ student }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-white p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary-soft hover:shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${student.color}`}
        >
          {getInitials(student.name)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[15px] font-bold text-ink">
            {student.name}
          </div>
          <div className="text-[13px] text-ink-muted">{student.grade}</div>
        </div>
      </div>

      <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[13px] font-bold text-primary">
        <Award size={14} strokeWidth={2.4} />
        {student.result}
      </div>

      <p className="text-[14px] leading-snug text-ink-muted">{student.detail}</p>
    </article>
  )
}

export function StudentResults() {
  if (!STUDENT_RESULTS?.length) return null

  return (
    <section className="bg-white py-16 lg:py-24" id="student-results">
      <Container>
        <div className="mx-auto mb-12 max-w-[620px] text-center">
          <span className="text-[15px] font-semibold text-primary">
            O‘quvchilar natijalari
          </span>
          <h2 className="mb-3 mt-2 text-[28px] font-extrabold tracking-[-1px] text-ink lg:text-4xl">
            O‘quvchilarimiz yutuqlari
          </h2>
          <p className="m-0 text-lg text-ink-muted">
            Maktabimiz o‘quvchilari olimpiada, imtihon va tanlovlarda
            erishgan natijalar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STUDENT_RESULTS.map((student) => (
            <ResultCard key={student.name} student={student} />
          ))}
        </div>
      </Container>
    </section>
  )
}
