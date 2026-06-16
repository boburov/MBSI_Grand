# MBSI xususiy maktab — grant landing sahifasi

Vite + React + Tailwind CSS asosida qurilgan landing sahifa. Foydalanuvchi
grant uchun ariza qoldiradi, ariza **Telegram bot** orqali ma'lum bir shaxsning
shaxsiy chatiga yuboriladi.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ ga production build
```

## Telegram sozlash

Arizalar Telegram'ga yuborilishi uchun `.env` faylini to'ldiring
(`.env.example` dan nusxa oling):

1. Telegram'da [@BotFather](https://t.me/BotFather) ga `/newbot` yozib, bot
   yarating va **token**ni oling.
2. Yaratgan botingizga Telegram'da `/start` yozing.
3. Quyidagi havolani brauzerda oching (TOKEN o'rniga o'z tokeningizni qo'ying):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
   Javobdagi `"chat":{"id": ...}` — bu sizning **chat ID**ingiz.
4. `.env` faylini to'ldiring:

```env
VITE_TELEGRAM_BOT_TOKEN=123456789:AA...
VITE_TELEGRAM_CHAT_ID=987654321
```

5. Dev serverni qayta ishga tushiring (`.env` o'zgarishi uchun).

> ⚠️ **Xavfsizlik:** `VITE_` prefiksli o'zgaruvchilar brauzer build'iga
> kiritiladi — ya'ni bot token sahifa kodida **ochiq** ko'rinadi. Bu oddiy/test
> yondashuv. Ishonchli yechim uchun arizani serverless funksiya (masalan Vercel)
> orqali yuborib, tokenni serverda yashirin saqlash kerak.

## Struktura (Feature-Sliced Design)

```
src/
├── app/        # App, global stillar
├── pages/      # home
├── widgets/    # header, hero, grant, courses, apply-section, footer
├── features/   # leave-application (forma + Telegram yuborish)
└── shared/     # ui, config, lib
```
