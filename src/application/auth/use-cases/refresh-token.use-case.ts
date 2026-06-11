import { IUserRepository } from '../ports/user.repository.interface';
import { ITokenService, TokenPair } from '../ports/token.service.interface';

export class RefreshUserTokenUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService
  ) {}

  public async execute(refreshToken: string): Promise<{ tokens: TokenPair, user: { id: string, email: string, role: string, organizationId: string | null } }> {
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    try {
      const payload = this.tokenService.verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findById(payload.userId);
      if (!user) {
        throw new Error('User not found');
      }

      const tokens = this.tokenService.generateTokens({
        userId: user.getId(),
        role: user.getRole().toString(),
        organizationId: user.getOrganizationId()
      });

      return {
        tokens,
        user: {
          id: user.getId(),
          email: user.getEmail(),
          role: user.getRole().toString(),
          organizationId: user.getOrganizationId()
        }
      };
    } catch (e) {
      throw new Error('Invalid refresh token');
    }
  }
}
