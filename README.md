# Landing — Monorepo

`client/` + `server/` ikki workspace'dan iborat npm monorepo.

| Workspace | Texnologiya | Vazifa |
|-----------|-------------|--------|
| `client/` | Vite + React | Landing sahifa va grant arizasi formasi |
| `server/` | NestJS + Prisma + PostgreSQL | Arizalarni qabul qilib DB'ga saqlaydi, admin API |

## O'rnatish

```bash
npm install            # ildizdan — barcha workspace'larga
```

## Ishga tushirish (dev)

```bash
npm run dev            # server (3000) + client (5173) birga
npm run dev:client     # faqat client
npm run dev:server     # faqat server
```

## Server (birinchi marta)

1. `server/.env` ni `server/.env.example` dan nusxalab to'ldiring (`DATABASE_URL`, `ADMIN_API_KEY`).
2. Migratsiya: `cd server && npx prisma migrate dev --name init`
3. `npm run dev:server`

Batafsil: `client/README.md` va `server/README.md`.
