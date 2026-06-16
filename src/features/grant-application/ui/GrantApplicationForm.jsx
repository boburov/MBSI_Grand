import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Input, Textarea, FileUpload } from '../../../shared/ui'
import {
  FIELD_WRAP,
  FIELD_LABEL,
  FIELD_ERROR,
} from '../../../shared/ui/fieldStyles'
import {
  validateGrantStep,
  validateGrantApplication,
} from '../lib/validation'
import { sendGrantApplication } from '../api/sendGrantApplication'

const STEPS = [
  'Shaxsiy ma‘lumotlar',
  'Akademik ma‘lumotlar',
  'Ijtimoiy faollik',
  'Selfi va yakun',
]

const initialValues = {
  // 1-bosqich
  firstName: '',
  lastName: '',
  age: '',
  fatherName: '',
  motherName: '',
  guardianName: '',
  socialRegistry: '',
  phone: '',
  // 2-bosqich
  school: '',
  academicInfo: '',
  certificates: [],
  // 3-bosqich
  socialActivity: '',
  socialCertificates: [],
  // 4-bosqich
  selfie: [],
  discount: '',
}

const DISCOUNT_OPTIONS = ['25', '50', '75', '100']

function RadioGroup({ label, name, options, value, onChange, error }) {
  return (
    <div className={FIELD_WRAP}>
      <span className={FIELD_LABEL}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <label
              key={opt.value}
              className={`flex-1 min-w-[120px] cursor-pointer rounded-sm border-[1.5px] px-3.5 py-2.5 text-[14px] text-center transition ${
                active
                  ? 'border-primary bg-primary-soft text-primary font-semibold'
                  : 'border-line text-ink-muted hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={active}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          )
        })}
      </div>
      {error && <span className={FIELD_ERROR}>{error}</span>}
    </div>
  )
}

export function GrantApplicationForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const isLastStep = step === STEPS.length - 1

  const setField = (field) => (e) => {
    const val = e?.target ? e.target.value : e
    setValues((prev) => ({ ...prev, [field]: val }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleNext = () => {
    const stepErrors = validateGrantStep(step, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const handleBack = () => {
    setSubmitError('')
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    const allErrors = validateGrantApplication(values)
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      // Xatolik bor bosqichga qaytarish
      const firstStep = [0, 1, 2, 3].find(
        (s) => Object.keys(validateGrantStep(s, values)).length > 0,
      )
      if (firstStep !== undefined) setStep(firstStep)
      return
    }

    setSubmitting(true)
    try {
      await sendGrantApplication(values)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err.message || 'Arizani yuborib bo‘lmadi. Keyinroq urinib ko‘ring.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setStep(0)
    setSubmitted(false)
    setSubmitError('')
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
        <Button variant="outline" onClick={resetForm}>
          Yana ariza qoldirish
        </Button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-lg shadow-float border border-line"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Progress qadamlar */}
      <div className="flex items-center gap-1.5">
        {STEPS.map((title, i) => (
          <div key={title} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition-colors ${
                i <= step ? 'bg-primary' : 'bg-line'
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex items-baseline justify-between -mt-2">
        <span className="text-sm font-semibold text-ink">{STEPS[step]}</span>
        <span className="text-[13px] text-ink-light">
          {step + 1} / {STEPS.length}
        </span>
      </div>

      {/* 1-BOSQICH — Shaxsiy ma'lumotlar */}
      {step === 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="Ismi"
              placeholder="Ism"
              value={values.firstName}
              onChange={setField('firstName')}
              error={errors.firstName}
            />
            <Input
              id="lastName"
              label="Familiyasi"
              placeholder="Familiya"
              value={values.lastName}
              onChange={setField('lastName')}
              error={errors.lastName}
            />
          </div>

          <Input
            id="age"
            label="Yoshi"
            type="number"
            min="5"
            max="100"
            placeholder="Masalan: 16"
            value={values.age}
            onChange={setField('age')}
            error={errors.age}
          />

          <Input
            id="fatherName"
            label="Otasining ismi"
            placeholder="Ota ismi"
            value={values.fatherName}
            onChange={setField('fatherName')}
            error={errors.fatherName}
          />

          <Input
            id="motherName"
            label="Onasining ismi"
            placeholder="Ona ismi"
            value={values.motherName}
            onChange={setField('motherName')}
            error={errors.motherName}
          />

          <Input
            id="guardianName"
            label="Ota-ona (vasiy) ismi"
            placeholder="Vasiy / qonuniy vakil ismi"
            value={values.guardianName}
            onChange={setField('guardianName')}
            error={errors.guardianName}
          />

          <RadioGroup
            label="Ijtimoiy reyestrda bormi?"
            name="socialRegistry"
            value={values.socialRegistry}
            onChange={setField('socialRegistry')}
            error={errors.socialRegistry}
            options={[
              { value: 'yes', label: 'Ha, bor' },
              { value: 'no', label: 'Yo‘q' },
            ]}
          />

          <Input
            id="phone"
            label="Telefon raqam"
            type="tel"
            placeholder="+998 90 123 45 67"
            value={values.phone}
            onChange={setField('phone')}
            error={errors.phone}
          />
        </>
      )}

      {/* 2-BOSQICH — Akademik ma'lumotlar */}
      {step === 1 && (
        <>
          <Input
            id="school"
            label="O‘qigan joyi"
            placeholder="Maktab / litsey / kollej nomi"
            value={values.school}
            onChange={setField('school')}
            error={errors.school}
          />

          <Textarea
            id="academicInfo"
            label="Akademik ma‘lumotlar"
            placeholder="Bilim darajangiz, baholaringiz, yutuqlaringiz va sertifikatlaringiz haqida yozing"
            value={values.academicInfo}
            onChange={setField('academicInfo')}
            error={errors.academicInfo}
          />

          <FileUpload
            id="certificates"
            label="Sertifikatlar va hujjatlar"
            hint="PDF, JPG, PNG — bir nechta fayl yuklash mumkin (har biri ≤10MB)"
            accept=".pdf,.jpg,.jpeg,.png,.webp,image/*,application/pdf"
            multiple
            files={values.certificates}
            onChange={setField('certificates')}
            error={errors.certificates}
          />
        </>
      )}

      {/* 3-BOSQICH — Ijtimoiy faollik */}
      {step === 2 && (
        <>
          <Textarea
            id="socialActivity"
            label="Qatnashgan tadbirlar"
            placeholder="Volontyorlik, jamoat tadbirlari, loyihalar va ijtimoiy faolligingizni yozing"
            value={values.socialActivity}
            onChange={setField('socialActivity')}
            error={errors.socialActivity}
          />

          <FileUpload
            id="socialCertificates"
            label="Ijtimoiy faollik sertifikatlari"
            hint="Tadbir sertifikatlari, rasmlar yoki tasdiqnomalar (ixtiyoriy)"
            accept=".pdf,.jpg,.jpeg,.png,.webp,image/*,application/pdf"
            multiple
            files={values.socialCertificates}
            onChange={setField('socialCertificates')}
            error={errors.socialCertificates}
          />
        </>
      )}

      {/* 4-BOSQICH — Selfi va yakun */}
      {step === 3 && (
        <>
          <FileUpload
            id="selfie"
            label="Selfi rasm"
            hint="Faqat rasm fayli qabul qilinadi (JPG, PNG)"
            accept="image/*"
            imagePreview
            files={values.selfie}
            onChange={setField('selfie')}
            error={errors.selfie}
          />

          <RadioGroup
            label="Necha foiz chegirma bo‘lsa markazimizda o‘qishga tayyorsiz?"
            name="discount"
            value={values.discount}
            onChange={setField('discount')}
            error={errors.discount}
            options={DISCOUNT_OPTIONS.map((v) => ({
              value: v,
              label: `${v}%`,
            }))}
          />
        </>
      )}

      {submitError && (
        <p className="text-[13.5px] text-red-600 bg-red-50 rounded-sm px-3 py-2 m-0 text-center">
          {submitError}
        </p>
      )}

      {/* Navigatsiya tugmalari */}
      <div className="flex items-center gap-3 mt-1">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={submitting}
          >
            <ChevronLeft size={18} />
            Orqaga
          </Button>
        )}

        {!isLastStep ? (
          <Button
            type="button"
            onClick={handleNext}
            className="flex-1"
          >
            Keyingi
            <ChevronRight size={18} />
          </Button>
        ) : (
          <Button
            type="submit"
            className="flex-1"
            disabled={submitting}
          >
            {submitting ? 'Yuborilmoqda...' : 'Arizani yuborish'}
          </Button>
        )}
      </div>

      <p className="text-[13px] text-ink-light text-center m-0">
        Ariza qoldirib, biz bilan bog‘lanishga rozilik bildirasiz.
      </p>
    </form>
  )
}
