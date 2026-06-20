import { Module } from '@nestjs/common'
import { GrantApplicationController } from './grant-application.controller'
import { GrantApplicationService } from './grant-application.service'

@Module({
  controllers: [GrantApplicationController],
  providers: [GrantApplicationService],
})
export class GrantApplicationModule {}
