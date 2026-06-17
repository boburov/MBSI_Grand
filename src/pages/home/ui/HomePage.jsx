import { Hero } from '../../../widgets/hero'
import { Grant } from '../../../widgets/grant'
import { Benefits } from '../../../widgets/benefits'
import { StudentResults } from '../../../widgets/student-results'
import { Testimonials } from '../../../widgets/testimonials'
import { WinnerVideos } from '../../../widgets/winner-videos'
import { Courses } from '../../../widgets/courses'

export function HomePage() {
  return (
    <>
      <Hero />
      <Grant />
      <Benefits />
      <StudentResults />
      <Testimonials />
      <WinnerVideos />
      <Courses />
    </>
  )
}
