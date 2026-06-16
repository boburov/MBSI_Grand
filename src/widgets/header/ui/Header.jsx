import { Button, Container, Logo } from '../../../shared/ui'

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line/60 bg-white/70 backdrop-blur-xl"
      id="top"
    >
      <Container className="flex h-14 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden gap-9 md:flex">
          <a
            href="#grant"
            className="text-sm font-medium tracking-[0.01em] text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
          >
            Grant
          </a>
          <a
            href="#courses"
            className="text-sm font-medium tracking-[0.01em] text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
          >
            Yo‘nalishlar
          </a>
          <a
            href="#about"
            className="text-sm font-medium tracking-[0.01em] text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
          >
            Aloqa
          </a>
        </nav>
        <Button size="sm" onClick={() => scrollTo('apply')}>
          Ariza qoldirish
        </Button>
      </Container>
    </header>
  )
}
