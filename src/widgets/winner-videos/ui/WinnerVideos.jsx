import { useState } from 'react'
import { Play } from 'lucide-react'
import { Container } from '../../../shared/ui'
import { WINNER_VIDEOS } from '../../../shared/config/grant'

function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false)
  const thumb = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`

  return (
    <article
      data-aos="fade-up"
      data-aos-delay={(index % 3) * 100}
      className="flex flex-col overflow-hidden rounded-lg border border-line bg-white"
    >
      <div className="relative aspect-video w-full bg-ink/5">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={`${video.name} — grant g‘olibi`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${video.name} videosini ko‘rish`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={thumb}
              alt={`${video.name} videosi`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-ink/20 transition-colors group-hover:bg-ink/30" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-card transition-transform group-hover:scale-110">
              <Play size={26} strokeWidth={2.5} className="ml-1" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <div className="min-w-0 p-5">
        <h3 className="truncate text-base font-bold text-ink">{video.name}</h3>
        <p className="mt-0.5 truncate text-[13.5px] text-ink-muted">
          {video.role}
          {video.year ? ` · ${video.year}` : ''}
        </p>
      </div>
    </article>
  )
}

export function WinnerVideos() {
  if (!WINNER_VIDEOS?.length) return null

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24" id="winner-videos">
      <Container>
        <div
          data-aos="fade-up"
          className="mx-auto mb-10 max-w-[620px] text-center sm:mb-12"
        >
          <span className="text-[15px] font-semibold text-primary">
            Video chiqishlar
          </span>
          <h2 className="mb-3 mt-2 text-[22px] font-extrabold tracking-[-1px] text-ink sm:text-[28px] lg:text-4xl">
            G‘oliblar o‘z so‘zlari bilan
          </h2>
          <p className="m-0 text-base text-ink-muted sm:text-lg">
            Grant g‘oliblari tajribasi va taassurotlari haqida videolar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {WINNER_VIDEOS.map((video, i) => (
            <VideoCard key={video.youtubeId} video={video} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
