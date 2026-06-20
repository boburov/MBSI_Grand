import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateGrantApplicationDto } from './dto/create-grant-application.dto'

@Injectable()
export class GrantApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  // Yangi arizani DB'ga saqlaydi.
  create(dto: CreateGrantApplicationDto) {
    return this.prisma.grantApplication.create({ data: dto })
  }

  // Barcha arizalarni eng yangisidan boshlab qaytaradi (admin).
  findAll() {
    return this.prisma.grantApplication.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}
