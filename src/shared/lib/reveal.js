// Scroll paydo bo'lish (reveal) animatsiyasi — yengil IntersectionObserver.
// AOS o'rnini bosadi: mavjud [data-aos] atributli elementlar ekranga kirganda
// ".aos-animate" olib, nozik fade-up bilan paydo bo'ladi. Komponentlardagi
// data-aos / data-aos-delay atributlari shundayligicha ishlatiladi.
//
// Muhim: element hech qachon ko'rinmas holatda "qotib" qolmaydi —
// IntersectionObserver qo'llab-quvvatlanmasa yoki reduced-motion bo'lsa,
// barcha elementlar darrov to'liq ko'rinadigan qilib belgilanadi.

const VISIBLE_CLASS = 'aos-animate'

let observer = null

function revealNow(el) {
  // data-aos-delay bo'lsa — uni transition kechikishiga aylantiramiz (stagger)
  const delay = el.getAttribute('data-aos-delay')
  if (delay) {
    el.style.transitionDelay = `${delay}ms`
  }
  el.classList.add(VISIBLE_CLASS)
}

function ensureObserver() {
  if (observer) return observer

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // IntersectionObserver yo'q yoki harakat kamaytirilgan bo'lsa — observer yaratmaymiz.
  if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
    return null
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          revealNow(entry.target)
          observer.unobserve(entry.target) // bir marta animatsiya (once)
        }
      }
    },
    {
      // Element pastdan biroz ko'ringanda ishga tushsin (60px oldin)
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05,
    },
  )

  return observer
}

// Hozir DOM'dagi barcha [data-aos] elementlarini kuzatishni boshlaydi.
// Route o'zgargandan keyin chaqiriladi (yangi elementlar uchun).
export function observeReveals() {
  if (typeof document === 'undefined') return

  const els = document.querySelectorAll('[data-aos]:not(.aos-animate)')
  const obs = ensureObserver()

  if (!obs) {
    // Fallback: animatsiyasiz darrov ko'rsatamiz.
    els.forEach((el) => el.classList.add(VISIBLE_CLASS))
    return
  }

  els.forEach((el) => obs.observe(el))
}
