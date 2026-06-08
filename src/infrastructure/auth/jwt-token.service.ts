import jwt from 'jsonwebtoken';
import { ITokenService, TokenPair, TokenPayload } from '../../application/auth/ports/token.service.interface';

export class JwtTokenService implements ITokenService {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret';
  private readonly refreshSecret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';
  
  private readonly accessExpiresIn = '15m';
  private readonly refreshExpiresIn = '7d';

  public generateTokens(payload: TokenPayload): TokenPair {
    const accessToken = jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpiresIn });
    const refreshToken = jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn });

    return { accessToken, refreshToken };
  }

  public verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.accessSecret) as jwt.JwtPayload;
      return {
        userId: decoded.userId,
        organizationId: decoded.organizationId
      };
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  public verifyRefreshToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.refreshSecret) as jwt.JwtPayload;
      return {
        userId: decoded.userId,
        organizationId: decoded.organizationId
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}
