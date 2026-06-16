import { ORG } from '../../config/org'

export function Logo() {
  return (
    <a href="#top" className="inline-flex items-center gap-2.5 no-underline">
      <img
        className="block h-9 w-9 rounded-md bg-bg-blue p-1.5"
        src="/MBSI.svg"
        alt={`${ORG.shortName} logosi`}
      />
      <span className="flex flex-col leading-[1.1]">
        <span className="text-[17px] font-bold tracking-[-0.3px] text-ink">
          {ORG.shortName}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Xususiy maktab
        </span>
      </span>
    </a>
  )
}
