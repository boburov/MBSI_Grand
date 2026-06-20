# Server — NestJS + Prisma + PostgreSQL

Grant arizalarini qabul qilib PostgreSQL'ga saqlaydi.

## Endpointlar

| Metod | Yo'l | Himoya | Vazifa |
|-------|------|--------|--------|
| `POST` | `/api/grant-applications` | ochiq | Yangi ariza qabul qiladi (client formadan) |
| `GET`  | `/api/grant-applications` | `x-api-key` header | Barcha arizalar ro'yxati (admin) |

## Sozlash

1. `.env.example` ni `.env` ga nusxalang va to'ldiring:
   - `DATABASE_URL` — PostgreSQL ulanishi
   - `ADMIN_API_KEY` — admin GET uchun maxfiy kalit (`openssl rand -hex 32`)
   - `CLIENT_ORIGIN` — client manzili (CORS)
2. Migratsiya: `npx prisma migrate dev --name init`
3. Ishga tushirish: `npm run dev` (ildizdan `npm run dev:server`)

## Foydali

```bash
npx prisma studio        # DB'ni brauzerda ko'rish
npx prisma migrate dev   # sxema o'zgarsa yangi migratsiya
```
