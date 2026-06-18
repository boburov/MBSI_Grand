/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          soft: '#f5f8ff',
          blue: '#eef4ff',
        },
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          soft: '#dbeafe',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
          light: '#94a3b8',
        },
        line: '#e2e8f0',
        gold: '#f5b301',
        silver: '#9aa5b1',
        bronze: '#cd7f32',
      },
      fontFamily: {
        // mbsi.school platformasidagi font stacki
        sans: [
          'var(--default-font-family, ui-sans-serif, system-ui, sans-serif)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        // Sarlavhalar uchun Poppins
        heading: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15, 23, 42, 0.08)',
        card: '0 8px 24px rgba(37, 99, 235, 0.12)',
        float: '0 20px 50px rgba(37, 99, 235, 0.18)',
      },
      maxWidth: {
        container: '1140px',
      },
    },
  },
  plugins: [],
}
