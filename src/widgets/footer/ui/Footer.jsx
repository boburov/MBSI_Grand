import { Container, Logo } from '../../../shared/ui'
import { ORG } from '../../../shared/config/org'

export function Footer() {
  return (
    <footer className="bg-bg border-t border-line pt-16 pb-8" id="about">
      <Container className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-8 md:gap-10 pb-10">
        <div>
          <Logo />
          <p className="mt-4 text-ink-muted text-[15px] leading-[1.6] max-w-[320px]">
            {ORG.fullName}. Zamonaviy STEM ta’limi va xalqaro imtihonlarga
            tayyorgarlik maskani.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <h4 className="text-[15px] font-bold text-ink mb-4">Aloqa</h4>
          <a
            href={ORG.phoneHref}
            className="text-ink-muted text-[15px] no-underline transition-colors hover:text-primary"
          >
            {ORG.phone}
          </a>
          <a
            href={`mailto:${ORG.email}`}
            className="text-ink-muted text-[15px] no-underline transition-colors hover:text-primary"
          >
            {ORG.email}
          </a>
          <span className="text-ink-muted text-[15px]">
            {ORG.zip}, {ORG.address}
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          <h4 className="text-[15px] font-bold text-ink mb-4">
            Ijtimoiy tarmoqlar
          </h4>
          <a
            href="#"
            className="text-ink-muted text-[15px] no-underline transition-colors hover:text-primary"
          >
            Telegram
          </a>
          <a
            href="#"
            className="text-ink-muted text-[15px] no-underline transition-colors hover:text-primary"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-ink-muted text-[15px] no-underline transition-colors hover:text-primary"
          >
            YouTube
          </a>
        </div>
      </Container>
      <Container>
        <div className="border-t border-line pt-6 text-ink-light text-sm text-center">
          © 2026 {ORG.legalName}. Barcha huquqlar himoyalangan.
        </div>
      </Container>
    </footer>
  )
}
