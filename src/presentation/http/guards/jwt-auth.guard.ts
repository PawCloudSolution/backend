import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { ITokenService } from '../../../application/auth/ports/token.service.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenService: ITokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['accessToken'];
    
    if (!token) {
      throw new UnauthorizedException('Access token is missing in cookies');
    }

    try {
      const payload = this.tokenService.verifyAccessToken(token);
      // We attach the payload to the request. It contains userId, role, and organizationId.
      (request as any).user = {
        id: payload.userId,
        role: payload.role,
        organizationId: payload.organizationId
      };
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
