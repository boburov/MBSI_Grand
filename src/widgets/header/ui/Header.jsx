import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button, Container, Logo } from '../../../shared/ui'

// Sahifa ichidagi bo'limga o'tish: avval bosh sahifaga, keyin scroll
const HASH_LINKS = [
  { id: 'grant', label: 'Grant' },
  { id: 'courses', label: 'Yo‘nalishlar' },
]

const PAGE_LINKS = [
  { to: '/natijalar', label: 'Natijalar' },
  { to: '/about', label: 'Biz haqimizda' },
]

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium tracking-[0.01em] no-underline transition-colors duration-200 hover:text-ink ${
    isActive ? 'text-primary' : 'text-ink-muted'
  }`

export function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const goToSection = (id) => {
    setOpen(false)
    navigate('/')
    // Bosh sahifa render bo'lgach scroll qilamiz
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-line/60 bg-white/70 backdrop-blur-xl"
      id="top"
    >
      <Container className="flex h-14 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden gap-9 md:flex">
          {HASH_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goToSection(link.id)}
              className="text-sm font-medium tracking-[0.01em] text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </button>
          ))}
          {PAGE_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button as={Link} to="/ariza" size="sm">
            Ariza qoldirish
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-1.5 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menyu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line/60 bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {HASH_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => goToSection(link.id)}
                className="rounded-md px-2 py-2.5 text-left text-[15px] font-medium text-ink-muted hover:bg-bg-soft"
              >
                {link.label}
              </button>
            ))}
            {PAGE_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-2 py-2.5 text-[15px] font-medium hover:bg-bg-soft ${
                    isActive ? 'text-primary' : 'text-ink-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              as={Link}
              to="/ariza"
              size="sm"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              Ariza qoldirish
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
