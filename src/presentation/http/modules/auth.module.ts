import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/register.use-case';
import { LoginUserUseCase } from '../../../application/auth/use-cases/login.use-case';
import { BcryptPasswordHasher } from '../../../infrastructure/auth/bcrypt-password-hasher';
import { JwtTokenService } from '../../../infrastructure/auth/jwt-token.service';
import { DatabaseModule, USER_REPOSITORY_TOKEN } from './database.module';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'PASSWORD_HASHER',
      useFactory: () => new BcryptPasswordHasher(),
    },
    {
      provide: 'TOKEN_SERVICE',
      useFactory: () => new JwtTokenService(),
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepo: IUserRepository, hasher: BcryptPasswordHasher) => new RegisterUserUseCase(userRepo, hasher),
      inject: [USER_REPOSITORY_TOKEN, 'PASSWORD_HASHER'],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepo: IUserRepository, hasher: BcryptPasswordHasher, tokenService: JwtTokenService) => new LoginUserUseCase(userRepo, hasher, tokenService),
      inject: [USER_REPOSITORY_TOKEN, 'PASSWORD_HASHER', 'TOKEN_SERVICE'],
    },
  ],
})
export class AuthModule { }
