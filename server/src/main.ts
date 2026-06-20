import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  // CORS — client origin(lar)i uchun. Vergul bilan bir nechta yozish mumkin.
  const origins = (config.get<string>('CLIENT_ORIGIN') ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  app.enableCors({
    origin: origins.length ? origins : true,
  })

  // Global validatsiya: DTO'da bo'lmagan maydonlarni olib tashlaydi,
  // string -> number kabi o'zgartirishlarni amalga oshiradi.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  const port = config.get<number>('PORT') ?? 3000
  await app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`Server ishga tushdi: http://localhost:${port}`)
}

void bootstrap()
