import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

await page.goto('http://localhost:5174/about', { waitUntil: 'networkidle' })

// Bino rasmi yuklandimi?
const img = page.locator('img[alt$="binosi"]')
const loaded = await img.evaluate(
  (el) => el.complete && el.naturalWidth > 0,
)
const src = await img.getAttribute('src')
console.log('Building image src:', src)
console.log('Building image loaded OK:', loaded)
await page.screenshot({ path: '/tmp/shot-about2.png' })

await browser.close()
console.log('Console errors:', errors.length ? errors : 'none')
