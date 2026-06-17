/**
 * Avtomatik aylanuvchi (cheksiz) gorizontal karusel.
 * Bolalar (children) ikki marta nusxalanadi va uzluksiz suriladi.
 * Hover qilinganda to'xtaydi.
 *
 * Props:
 *  - speed: aylanish davomiyligi (sekund). Kichik = tezroq. Default 40.
 *  - gap: kartalar orasidagi masofa (tailwind gap klassi). Default 'gap-6'.
 *  - reverse: teskari yo'nalish.
 */
export function Marquee({ children, speed = 40, gap = 'gap-6', reverse = false }) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <div className="marquee-paused group relative w-full overflow-hidden">
      {/* Chap/o'ng chetlarda yumshoq fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--marquee-fade,#fff)] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--marquee-fade,#fff)] to-transparent sm:w-20" />

      <div
        className={`animate-marquee flex w-max ${gap}`}
        style={{
          '--marquee-duration': `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {/* 1-nusxa */}
        <div className={`flex shrink-0 ${gap}`}>{items}</div>
        {/* 2-nusxa (cheksiz tasir uchun) */}
        <div className={`flex shrink-0 ${gap}`} aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  )
}
