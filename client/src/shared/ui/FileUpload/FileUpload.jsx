import { useRef } from 'react'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import { FIELD_WRAP, FIELD_LABEL, FIELD_ERROR } from '../fieldStyles'

const MAX_FILE_MB = 10

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Ko'p faylli yoki faqat rasm (selfi) yuklash uchun maydon.
// files — File obyektlari massivi, onChange(nextFiles) bilan boshqariladi.
export function FileUpload({
  label,
  id,
  files = [],
  onChange,
  error,
  accept = '',
  multiple = false,
  hint,
  imagePreview = false,
}) {
  const inputRef = useRef(null)

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).filter(
      (f) => f.size <= MAX_FILE_MB * 1024 * 1024,
    )
    onChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1))
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleInput = (e) => {
    if (e.target.files?.length) addFiles(e.target.files)
  }

  const removeFile = (index) => {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className={FIELD_WRAP}>
      {label && (
        <label className={FIELD_LABEL} htmlFor={id}>
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 w-full rounded-sm border-[1.5px] border-dashed px-4 py-7 text-center transition cursor-pointer hover:border-primary hover:bg-primary-soft/40 ${
          error ? 'border-red-500' : 'border-line'
        }`}
      >
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary-soft text-primary">
          <Upload size={20} />
        </span>
        <span className="text-sm font-medium text-ink">
          Faylni tanlash uchun bosing
        </span>
        {hint && (
          <span className="text-[13px] text-ink-light">{hint}</span>
        )}
      </button>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInput}
        className="hidden"
      />

      {files.length > 0 && (
        <ul className="flex flex-col gap-2 list-none mt-1">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-sm border border-line bg-white px-3 py-2"
            >
              {imagePreview && file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-10 h-10 rounded-sm object-cover shrink-0"
                  onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
              ) : (
                <span className="flex items-center justify-center w-9 h-9 rounded-sm bg-primary-soft text-primary shrink-0">
                  {file.type.startsWith('image/') ? (
                    <ImageIcon size={18} />
                  ) : (
                    <FileText size={18} />
                  )}
                </span>
              )}
              <span className="flex-1 min-w-0">
                <span className="block text-sm text-ink truncate">
                  {file.name}
                </span>
                <span className="block text-[12px] text-ink-light">
                  {formatSize(file.size)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="flex items-center justify-center w-7 h-7 rounded-full text-ink-light hover:text-red-500 hover:bg-red-50 transition shrink-0"
                aria-label="Faylni o‘chirish"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <span className={FIELD_ERROR}>{error}</span>}
    </div>
  )
}
