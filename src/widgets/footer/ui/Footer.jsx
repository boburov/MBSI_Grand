import { Link } from 'react-router-dom'
import { Container, Logo } from '../../../shared/ui'
import { ORG } from '../../../shared/config/org'

const NAV_LINKS = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/natijalar', label: 'Natijalar' },
  { to: '/about', label: 'Biz haqimizda' },
  { to: '/ariza', label: 'Ariza qoldirish' },
]

export function Footer() {
  return (
    <footer className="bg-bg border-t border-line pt-12 pb-8 sm:pt-16">
      <Container className="grid grid-cols-1 gap-8 pb-8 sm:pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
        <div>
          <Logo />
          <p className="mt-4 max-w-[320px] text-[15px] leading-[1.6] text-ink-muted">
            {ORG.fullName} — fan, texnologiya, muhandislik va matematika (STEM)
            ta’limi orqali o‘quvchilarni kelajak innovatorlari sifatida
            tarbiyalaydi.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <h4 className="mb-4 text-[15px] font-bold text-ink">Sahifalar</h4>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[15px] text-ink-muted no-underline transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <h4 className="mb-4 text-[15px] font-bold text-ink">Aloqa</h4>
          <a
            href={ORG.phoneHref}
            className="text-[15px] text-ink-muted no-underline transition-colors hover:text-primary"
          >
            {ORG.phone}
          </a>
          <a
            href={`mailto:${ORG.email}`}
            className="break-all text-[15px] text-ink-muted no-underline transition-colors hover:text-primary"
          >
            {ORG.email}
          </a>
          <span className="text-[15px] text-ink-muted">{ORG.address}</span>
          <a
            href={ORG.website}
            target="_blank"
            rel="noreferrer"
            className="text-[15px] text-ink-muted no-underline transition-colors hover:text-primary"
          >
            mbsi.school
          </a>
        </div>

        <div className="flex flex-col gap-2.5">
          <h4 className="mb-4 text-[15px] font-bold text-ink">
            Ijtimoiy tarmoqlar
          </h4>
          <a
            href="#"
            className="text-[15px] text-ink-muted no-underline transition-colors hover:text-primary"
          >
            Telegram
          </a>
          <a
            href="#"
            className="text-[15px] text-ink-muted no-underline transition-colors hover:text-primary"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-[15px] text-ink-muted no-underline transition-colors hover:text-primary"
          >
            YouTube
          </a>
        </div>
      </Container>
      <Container>
        <div className="border-t border-line pt-6 text-center text-sm text-ink-light">
          © 2026 {ORG.legalName}. Barcha huquqlar himoyalangan.
        </div>
      </Container>
    </footer>
  )
}
