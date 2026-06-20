import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Admin panel landing'dan alohida portda ishlaydi.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
})
