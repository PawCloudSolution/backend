var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, Global } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/register.use-case';
import { LoginUserUseCase } from '../../../application/auth/use-cases/login.use-case';
import { RefreshUserTokenUseCase } from '../../../application/auth/use-cases/refresh-token.use-case';
import { BcryptPasswordHasher } from '../../../infrastructure/auth/bcrypt-password-hasher';
import { JwtTokenService } from '../../../infrastructure/auth/jwt-token.service';
import { DatabaseModule, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN } from './database.module';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Global(),
    Module({
        imports: [DatabaseModule],
        exports: ['TOKEN_SERVICE', 'PASSWORD_HASHER'],
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
                useFactory: (userRepo, hasher, orgRepo) => new RegisterUserUseCase(userRepo, hasher, orgRepo),
                inject: [USER_REPOSITORY_TOKEN, 'PASSWORD_HASHER', ORGANIZATION_REPOSITORY_TOKEN],
            },
            {
                provide: LoginUserUseCase,
                useFactory: (userRepo, hasher, tokenService) => new LoginUserUseCase(userRepo, hasher, tokenService),
                inject: [USER_REPOSITORY_TOKEN, 'PASSWORD_HASHER', 'TOKEN_SERVICE'],
            },
            {
                provide: RefreshUserTokenUseCase,
                useFactory: (userRepo, tokenService) => new RefreshUserTokenUseCase(userRepo, tokenService),
                inject: [USER_REPOSITORY_TOKEN, 'TOKEN_SERVICE'],
            },
        ],
    })
], AuthModule);
export { AuthModule };
