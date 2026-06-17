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
  { value: '2100+', label: 'Faol o‘quvchilar', Icon: Users },
  { value: '185', label: '2026 bitiruvchilari', Icon: GraduationCap },
  { value: '1320', label: 'O‘rtacha SAT bali', Icon: Trophy },
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
      <section className="bg-[radial-gradient(circle_at_20%_0%,_#eef4ff_0%,_transparent_55%)] bg-bg py-12 sm:py-16 lg:py-24">
        <Container className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-aos="fade-right" className="flex flex-col items-start">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
              <Building2 size={16} strokeWidth={2.2} />
              Biz haqimizda
            </span>
            <h1 className="m-0 mb-6 text-[24px] font-extrabold leading-[1.12] tracking-[-1px] text-ink break-words sm:text-[32px] lg:text-[40px]">
              {ORG.fullName}
            </h1>
            <p className="m-0 mb-5 max-w-[520px] text-base leading-[1.7] text-ink-muted sm:text-lg">
              {ORG.district}, Chinobod shahrida joylashgan ixtisoslashtirilgan
              STEM maktabi. 1–11-sinflar uchun chuqurlashtirilgan dasturlar
              asosida fan, texnologiya, muhandislik va matematika yo‘nalishlarida
              ta’lim beramiz.
            </p>
            <p className="m-0 mb-8 max-w-[520px] text-base leading-[1.7] text-ink-muted sm:text-lg">
              Tajribali ustozlar va zamonaviy laboratoriyalar bilan
              o‘quvchilarimizni xalqaro imtihonlarga (SAT, IELTS, CEFR) va
              yetakchi universitetlarga tayyorlaymiz.
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

          <div data-aos="fade-left" className="relative">
            <img
              className="block aspect-[4/3] w-full rounded-lg object-cover shadow-float"
              src={BUILDING_IMG}
              alt={`${ORG.fullName} binosi`}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-white px-3 py-2.5 shadow-card sm:bottom-5 sm:left-5 sm:gap-2.5 sm:px-5 sm:py-3.5 lg:-left-6">
              <MapPin size={20} className="shrink-0 text-primary" />
              <span className="text-sm font-medium leading-snug text-ink">
                Chinobod sh., {ORG.district}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistika */}
      <section className="border-y border-line bg-white py-10 sm:py-12 lg:py-16">
        <Container>
          <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-md bg-bg-blue text-primary">
                  <s.Icon size={26} strokeWidth={2} />
                </div>
                <div className="text-[24px] font-extrabold leading-none tracking-[-1px] text-ink sm:text-[30px] lg:text-[32px]">
                  {s.value}
                </div>
                <div className="mt-1.5 text-sm text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Maqsad va qarash */}
      <section className="bg-bg-soft py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
                className="rounded-lg border border-line bg-white p-5 sm:p-8"
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
      <section className="bg-white py-12 sm:py-16 lg:py-20" id="about">
        <Container>
          <div
            data-aos="fade-up"
            className="mx-auto mb-10 max-w-[560px] text-center"
          >
            <span className="text-[15px] font-semibold text-primary">Aloqa</span>
            <h2 className="mt-2 text-[24px] font-extrabold tracking-[-1px] text-ink sm:text-[26px] lg:text-[32px]">
              Biz bilan bog‘laning
            </h2>
          </div>
          <div className="mx-auto grid max-w-[840px] grid-cols-1 gap-5 sm:grid-cols-3">
            <a
              href={ORG.phoneHref}
              data-aos="fade-up"
              data-aos-delay="0"
              className="flex flex-col items-center gap-3 rounded-lg border border-line bg-bg p-5 text-center no-underline transition hover:border-primary-soft hover:shadow-card sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-bg-blue text-primary">
                <Phone size={22} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-ink-muted">Telefon</span>
              <span className="text-[15px] font-bold text-ink">{ORG.phone}</span>
            </a>
            <a
              href={`mailto:${ORG.email}`}
              data-aos="fade-up"
              data-aos-delay="100"
              className="flex flex-col items-center gap-3 rounded-lg border border-line bg-bg p-5 text-center no-underline transition hover:border-primary-soft hover:shadow-card sm:p-7"
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
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col items-center gap-3 rounded-lg border border-line bg-bg p-5 text-center no-underline transition hover:border-primary-soft hover:shadow-card sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-bg-blue text-primary">
                <MapPin size={22} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-ink-muted">Manzil</span>
              <span className="text-[15px] font-bold text-ink">
                {ORG.address}
              </span>
            </a>
          </div>

          <div className="mx-auto mt-10 max-w-[840px] overflow-hidden rounded-lg border border-line shadow-soft">
            <iframe
              src={ORG.mapEmbedUrl}
              title={`${ORG.fullName} manzili`}
              className="block h-[260px] w-full border-0 sm:h-[360px]"
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
