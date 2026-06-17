import { Link } from 'react-router-dom'
import { ORG } from '../../config/org'

export function Logo() {
  return (
    <Link to="/" className="inline-flex min-w-0 items-center gap-2 no-underline sm:gap-2.5">
      <img
        className="block h-9 w-9 shrink-0 rounded-md bg-bg-blue p-1.5"
        src="/MBSI.svg"
        alt={`${ORG.shortName} logosi`}
      />
      <span className="flex min-w-0 flex-col leading-[1.1]">
        <span className="truncate text-[15px] font-bold tracking-[-0.3px] text-ink sm:text-[17px]">
          {ORG.shortName}
        </span>
        <span className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Xususiy maktab
        </span>
      </span>
    </Link>
  )
}
