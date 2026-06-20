import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { GrantApplicationService } from './grant-application.service'
import { CreateGrantApplicationDto } from './dto/create-grant-application.dto'
import { AdminApiKeyGuard } from './admin-api-key.guard'

@Controller('api/grant-applications')
export class GrantApplicationController {
  constructor(private readonly service: GrantApplicationService) {}

  // Ochiq endpoint — client formadan ariza yuboradi.
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateGrantApplicationDto) {
    return this.service.create(dto)
  }

  // Himoyalangan — faqat to'g'ri x-api-key bilan (admin).
  @Get()
  @UseGuards(AdminApiKeyGuard)
  findAll() {
    return this.service.findAll()
  }
}
