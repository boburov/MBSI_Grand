import { Header } from '../../../widgets/header'
import { Hero } from '../../../widgets/hero'
import { Grant } from '../../../widgets/grant'
import { Courses } from '../../../widgets/courses'
import { ApplySection } from '../../../widgets/apply-section'
import { Footer } from '../../../widgets/footer'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Grant />
        <Courses />
        <ApplySection />
      </main>
      <Footer />
    </>
  )
}
