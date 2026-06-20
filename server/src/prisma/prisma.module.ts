import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

// Global modul — PrismaService'ni har bir modulga qayta import qilmaslik uchun.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
