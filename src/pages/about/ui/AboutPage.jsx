import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Target,
  Eye,
  GraduationCap,
  Users,
  Trophy,
} from 'lucide-react'
import { Button, Container } from '../../../shared/ui'
import { ORG } from '../../../shared/config/org'
import buildingImg from '../../../assets/building.jpg'

// Bino rasmi — src/assets/building.jpg faylidan olinadi.
// Maktab binosining haqiqiy rasmi bilan almashtirish uchun
// src/assets/building.jpg faylini almashtiring (nom o'zgarmaydi).
const BUILDING_IMG = buildingImg

const STATS = [
  { value: '320+', label: 'O‘quvchilar', Icon: Users },
  { value: '640', label: 'Ota-ona ishonchi', Icon: Users },
  { value: '40', label: 'Tajribali ustozlar', Icon: GraduationCap },
  { value: '150+', label: 'Olimpiada g‘oliblari', Icon: Trophy },
]

const VALUES = [
  {
    Icon: Target,
    title: 'Bizning maqsadimiz',
    text: 'Har bir o‘quvchining iqtidorini ochib berish, zamonaviy STEM ta’limi va xalqaro imtihonlarga puxta tayyorlash orqali kelajak mutaxassislarini tarbiyalash.',
  },
  {
    Icon: Eye,
    title: 'Bizning qarashimiz',
    text: 'Mintaqadagi eng ilg‘or xususiy ta’lim maskaniga aylanish va o‘quvchilarni jahon darajasidagi universitetlarga tayyorlash.',
  },
]

export function AboutPage() {
  return (
    <>
      {/* Hero — bino rasmi bilan */}
      <section className="bg-[radial-gradient(circle_at_20%_0%,_#eef4ff_0%,_transparent_55%)] bg-bg py-16 lg:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
              <Building2 size={16} strokeWidth={2.2} />
              Biz haqimizda
            </span>
            <h1 className="m-0 mb-6 text-[32px] font-extrabold leading-[1.12] tracking-[-1px] text-ink sm:text-[40px]">
              {ORG.fullName}
            </h1>
            <p className="m-0 mb-5 max-w-[520px] text-lg leading-[1.7] text-ink-muted">
              {ORG.fullName} — {ORG.district}da joylashgan zamonaviy xususiy
              ta’lim maskani. Bizda STEM yo‘nalishlari chuqurlashtirilgan
              dasturlar asosida o‘qitiladi va o‘quvchilar xalqaro imtihonlarga
              (SAT, IELTS, CEFR) tayyorlanadi.
            </p>
            <p className="m-0 mb-8 max-w-[520px] text-lg leading-[1.7] text-ink-muted">
              Bizning maktab tajribali ustozlar, zamonaviy laboratoriyalar va
              qulay o‘quv muhiti bilan har bir o‘quvchining muvaffaqiyatini
              ta’minlaydi.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button as={Link} to="/ariza" size="lg">
                Grantga ariza qoldirish
              </Button>
              <Button as={Link} to="/natijalar" variant="outline" size="lg">
                Natijalarni ko‘rish
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              className="block aspect-[4/3] w-full rounded-lg object-cover shadow-float"
              src={BUILDING_IMG}
              alt={`${ORG.fullName} binosi`}
            />
            <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-md bg-white px-5 py-3.5 shadow-card lg:-left-6">
              <MapPin size={20} className="shrink-0 text-primary" />
              <span className="text-sm font-medium leading-snug text-ink">
                {ORG.district}, Chinobod sh.
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistika */}
      <section className="border-y border-line bg-white py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-md bg-bg-blue text-primary">
                  <s.Icon size={26} strokeWidth={2} />
                </div>
                <div className="text-[32px] font-extrabold leading-none tracking-[-1px] text-ink">
                  {s.value}
                </div>
                <div className="mt-1.5 text-sm text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Maqsad va qarash */}
      <section className="bg-bg-soft py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="rounded-lg border border-line bg-white p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <v.Icon size={24} strokeWidth={2} />
                </div>
                <h2 className="mb-3 text-xl font-bold text-ink">{v.title}</h2>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  {v.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Aloqa */}
      <section className="bg-white py-16 lg:py-20" id="about">
        <Container>
          <div className="mx-auto mb-10 max-w-[560px] text-center">
            <span className="text-[15px] font-semibold text-primary">Aloqa</span>
            <h2 className="mt-2 text-[26px] font-extrabold tracking-[-1px] text-ink lg:text-[32px]">
              Biz bilan bog‘laning
            </h2>
          </div>
          <div className="mx-auto grid max-w-[840px] grid-cols-1 gap-5 sm:grid-cols-3">
            <a
              href={ORG.phoneHref}
              className="flex flex-col items-center gap-3 rounded-lg border border-line bg-bg p-7 text-center no-underline transition hover:border-primary-soft hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-bg-blue text-primary">
                <Phone size={22} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-ink-muted">Telefon</span>
              <span className="text-[15px] font-bold text-ink">{ORG.phone}</span>
            </a>
            <a
              href={`mailto:${ORG.email}`}
              className="flex flex-col items-center gap-3 rounded-lg border border-line bg-bg p-7 text-center no-underline transition hover:border-primary-soft hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-bg-blue text-primary">
                <Mail size={22} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-ink-muted">Email</span>
              <span className="break-all text-[15px] font-bold text-ink">
                {ORG.email}
              </span>
            </a>
            <a
              href={ORG.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-3 rounded-lg border border-line bg-bg p-7 text-center no-underline transition hover:border-primary-soft hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-bg-blue text-primary">
                <MapPin size={22} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-ink-muted">Manzil</span>
              <span className="text-[15px] font-bold text-ink">
                {ORG.zip}, {ORG.address}
              </span>
            </a>
          </div>

          <div className="mx-auto mt-10 max-w-[840px] overflow-hidden rounded-lg border border-line shadow-soft">
            <iframe
              src={ORG.mapEmbedUrl}
              title={`${ORG.fullName} manzili`}
              className="block h-[360px] w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  )
}
