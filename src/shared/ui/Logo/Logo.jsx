import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="inline-flex min-w-0 items-center gap-2 no-underline sm:gap-2.5">
      <img
        className="block h-[46px] w-[46px] shrink-0"
        src="/MBSI.svg"
        alt="MBSI school logosi"
      />
      <span className="flex min-w-0 flex-col leading-[1.1]">
        <span className="truncate text-[15px] font-bold tracking-[-0.3px] text-ink sm:text-[17px]">
          MBSI
        </span>
        <span className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          School
        </span>
      </span>
    </Link>
  )
}
