import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button, Input, Textarea } from '../../../shared/ui'
import { validateApplication } from '../../../shared/lib/validation'
import { GRANT_DIRECTIONS } from '../../../shared/config/grant'
import { sendApplication } from '../api/sendApplication'
import {
  FIELD_WRAP,
  FIELD_LABEL,
  FIELD_INPUT,
  FIELD_INPUT_ERROR,
  FIELD_ERROR,
} from '../../../shared/ui/fieldStyles'

const initialValues = {
  name: '',
  direction: '',
  school: '',
  skills: '',
  phone: '',
  telegram: '',
}

export function ApplicationForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    const nextErrors = validateApplication(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    try {
      await sendApplication(values)
      setSubmitted(true)
      setValues(initialValues)
    } catch (err) {
      setSubmitError(
        err.message || 'Arizani yuborib bo‘lmadi. Keyinroq urinib ko‘ring.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-3 bg-white px-8 py-12 rounded-lg shadow-float border border-line">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-2">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 className="text-[22px] text-ink m-0">Arizangiz qabul qilindi!</h3>
        <p className="text-ink-muted m-0 mb-3">
          Tez orada qabul bo‘limimiz siz bilan bog‘lanadi.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Yana ariza qoldirish
        </Button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-[18px] bg-white p-8 rounded-lg shadow-float border border-line"
      onSubmit={handleSubmit}
      noValidate
    >
      <Input
        id="name"
        label="Ism familiya"
        placeholder="Ismingizni kiriting"
        value={values.name}
        onChange={handleChange('name')}
        error={errors.name}
      />

      <div className={FIELD_WRAP}>
        <label className={FIELD_LABEL} htmlFor="direction">
          Yo‘nalish
        </label>
        <select
          id="direction"
          className={`${FIELD_INPUT} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23475569'%20stroke-width='2'%3E%3Cpath%20d='M6%209l6%206%206-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.875rem_center] cursor-pointer pr-10 ${
            errors.direction ? FIELD_INPUT_ERROR : ''
          }`}
          value={values.direction}
          onChange={handleChange('direction')}
        >
          <option value="" disabled>
            Yo‘nalishni tanlang
          </option>
          {GRANT_DIRECTIONS.map((dir) => (
            <option key={dir.value} value={dir.value}>
              {dir.label}
            </option>
          ))}
        </select>
        {errors.direction && (
          <span className={FIELD_ERROR}>{errors.direction}</span>
        )}
      </div>

      <Input
        id="school"
        label="O‘qigan joyi"
        placeholder="Maktab / litsey / kollej nomi"
        value={values.school}
        onChange={handleChange('school')}
        error={errors.school}
      />

      <Textarea
        id="skills"
        label="Maxsus qobiliyatlaringiz"
        placeholder="Yutuqlaringiz, sertifikatlar, tajriba va boshqa qobiliyatlaringizni yozing"
        value={values.skills}
        onChange={handleChange('skills')}
        error={errors.skills}
      />

      <Input
        id="phone"
        label="Telefon raqam"
        type="tel"
        placeholder="+998 90 123 45 67"
        value={values.phone}
        onChange={handleChange('phone')}
        error={errors.phone}
      />

      <Input
        id="telegram"
        label="Telegram"
        placeholder="@username"
        value={values.telegram}
        onChange={handleChange('telegram')}
        error={errors.telegram}
      />

      {submitError && (
        <p className="text-[13.5px] text-red-600 bg-red-50 rounded-sm px-3 py-2 m-0 text-center">
          {submitError}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-1" disabled={submitting}>
        {submitting ? 'Yuborilmoqda...' : 'Grantga ariza qoldirish'}
      </Button>
      <p className="text-[13px] text-ink-light text-center m-0">
        Ariza qoldirib, biz bilan bog‘lanishga rozilik bildirasiz.
      </p>
    </form>
  )
}
