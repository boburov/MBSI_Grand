# Landing — Monorepo

`client/` + `admin/` + `server/` uchta workspace'dan iborat npm monorepo.

| Workspace | Texnologiya | Port | Vazifa |
|-----------|-------------|------|--------|
| `client/` | Vite + React | 5173 | Landing sahifa va grant arizasi formasi |
| `admin/`  | Vite + React | 5174 | Alohida admin panel (login + leadlar ro'yxati) |
| `server/` | Express + MongoDB (Mongoose) | 3000 | Arizalarni qabul qiladi, fayllarni saqlaydi, Telegram kanalga yuboradi, admin API |

## O'rnatish

```bash
npm install            # ildizdan — barcha workspace'larga
```

## Server (birinchi marta)

1. MongoDB ishga tushgan bo'lsin (lokal yoki Atlas). Lokal:
   `brew services start mongodb-community` (yoki `mongod --dbpath <papka>`).
2. `server/.env` ni `server/.env.example` dan nusxalab to'ldiring:
   - `MONGODB_URI`, `JWT_SECRET` — majburiy.
   - `SERVER_URL` — fayl URL bazasi (masalan `http://localhost:3000`).
   - `CLIENT_ORIGIN` — CORS uchun ruxsat etilgan originlar (landing,admin — vergul bilan).
   - `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHANNEL_ID` — sertifikatlar tushadigan kanal
     (bo'sh qoldirilsa Telegram bosqichi o'tkazib yuboriladi, ariza baribir saqlanadi).
   - `ADMIN_USERNAME` + `ADMIN_PASSWORD` — admin panel login/parol (JWT shu credential bilan
     beriladi, alohida bazaga yozilmaydi).

## Ishga tushirish (dev)

```bash
npm run dev            # server (3000) + client (5173) + admin (5174) birga
npm run dev:client     # faqat landing client
npm run dev:admin      # faqat admin panel
npm run dev:server     # faqat server
```

## Admin panel (alohida loyiha)

Admin panel landing'dan **mustaqil** `admin/` workspace'da, alohida portda ishlaydi.

- `http://localhost:5174/login` — `server/.env`dagi `ADMIN_USERNAME`/`ADMIN_PASSWORD` bilan kiring.
- `http://localhost:5174/` — qoldirilgan barcha arizalar ro'yxati (pagination, sertifikat/selfi havolalari bilan).

`admin/.env`da faqat `VITE_API_URL` (server manzili) bo'ladi.

## Telegram

Bot kanalga admin qilib qo'shilgan bo'lishi kerak. Har bir arizadan keyin server:
1. Kanalga ariza summary'sini (barcha fayl URL'lari bilan) yuboradi;
2. Har bir faylni alohida yuklaydi (rasm → photo, PDF → document), caption'da public URL bilan —
   shu URL orqali Telegramdan faylni ochish mumkin.

Batafsil: `server/README.md`.
