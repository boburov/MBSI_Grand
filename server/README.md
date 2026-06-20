# Server — Express + MongoDB

Grant arizalarini qabul qiladi, fayllarni diskka saqlaydi, Telegram kanalga yuboradi va
JWT bilan himoyalangan admin API beradi.

## Stack
- Express — HTTP server, routing, static fayllar (`/uploads`)
- Mongoose — MongoDB ODM (`Lead`, `Admin` modellar)
- Multer — `multipart/form-data` fayl yuklash (diskka)
- jsonwebtoken + bcryptjs — admin auth
- axios + form-data — Telegram Bot API'ga fayl yuklash

## Sozlash

1. `.env` ni `.env.example` dan nusxalang va to'ldiring.
2. MongoDB ishga tushgan bo'lsin.
3. Birinchi admin:
   ```bash
   npm run seed
   ```

## Scriptlar
```bash
npm run dev     # nodemon bilan (avtoqayta yuklash)
npm start       # ishlab chiqarish
npm run seed    # ADMIN_SEED_* dan admin yaratadi/yangilaydi (idempotent)
```

## API

| Metod | Yo'l | Himoya | Tavsif |
|-------|------|--------|--------|
| GET | `/api/health` | — | Status + DB holati |
| POST | `/api/grant-applications` | — | Yangi ariza (multipart). Dublikat telefon → 409 |
| POST | `/api/auth/login` | — | `{username, password}` → `{token, admin}` |
| GET | `/api/leads?page&limit&status` | Bearer | Arizalar ro'yxati (eng yangisi birinchi) |
| GET | `/api/leads/:id` | Bearer | Bitta ariza |

Fayllar `${SERVER_URL}/uploads/<filename>` orqali ochiladi va shu URL MongoDB'ga yoziladi.

## Tuzilma
```
src/
├── index.js              # entrypoint (DB connect, uploads mkdir, listen)
├── app.js                # express app (cors, json, static, routes, errorHandler)
├── seed.js               # admin seed
├── config/{env,db}.js
├── models/{Lead,Admin}.js
├── middleware/{auth,upload,errorHandler}.js
├── services/telegram.js
├── controllers/{grant,auth,lead}Controller.js
├── routes/{index,grant,auth,lead}Routes.js
└── utils/{phone,asyncHandler}.js
```
