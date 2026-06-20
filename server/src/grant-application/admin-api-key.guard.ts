import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

// Admin endpointlarni himoyalaydi: so'rovdagi `x-api-key` header
// .env dagi ADMIN_API_KEY ga teng bo'lishi shart.
@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const provided = request.header('x-api-key')
    const expected = this.config.get<string>('ADMIN_API_KEY')

    if (!expected) {
      // Server noto'g'ri sozlangan — kalit umuman yo'q bo'lsa kirishga ruxsat bermaymiz.
      throw new UnauthorizedException('Admin API key sozlanmagan')
    }
    if (!provided || provided !== expected) {
      throw new UnauthorizedException('Noto‘g‘ri yoki yo‘q API key')
    }
    return true
  }
}
