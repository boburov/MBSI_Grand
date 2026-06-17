import { Hero } from '../../../widgets/hero'
import { Programs } from '../../../widgets/programs'
import { Grant } from '../../../widgets/grant'
import { Benefits } from '../../../widgets/benefits'
import { Courses } from '../../../widgets/courses'
import { StudentResults } from '../../../widgets/student-results'
import { Testimonials } from '../../../widgets/testimonials'
import { WinnerVideos } from '../../../widgets/winner-videos'
import { Admission } from '../../../widgets/admission'

export function HomePage() {
  return (
    <>
      <Hero />
      <Programs />
      <Grant />
      <Benefits />
      <Courses />
      <StudentResults />
      <Testimonials />
      <WinnerVideos />
      <Admission />
    </>
  )
}
