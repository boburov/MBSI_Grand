import {
  FIELD_WRAP,
  FIELD_LABEL,
  FIELD_INPUT,
  FIELD_INPUT_ERROR,
  FIELD_ERROR,
} from '../fieldStyles'

export function Textarea({ label, error, id, className = '', ...props }) {
  return (
    <div className={`${FIELD_WRAP} ${className}`}>
      {label && (
        <label className={FIELD_LABEL} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`${FIELD_INPUT} min-h-[110px] resize-y leading-relaxed ${
          error ? FIELD_INPUT_ERROR : ''
        }`}
        {...props}
      />
      {error && <span className={FIELD_ERROR}>{error}</span>}
    </div>
  )
}
