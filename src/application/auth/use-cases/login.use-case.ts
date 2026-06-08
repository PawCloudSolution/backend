import { IPasswordHasher } from '../ports/password-hasher.interface';
import { IUserRepository } from '../ports/user.repository.interface';
import { ITokenService, TokenPair } from '../ports/token.service.interface';

export interface LoginUserDto {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService
  ) {}

  public async execute(dto: LoginUserDto): Promise<TokenPair> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await this.passwordHasher.compare(dto.password, user.getHashedPassword());
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return this.tokenService.generateTokens({
      userId: user.getId(),
      organizationId: user.getOrganizationId()
    });
  }
}
