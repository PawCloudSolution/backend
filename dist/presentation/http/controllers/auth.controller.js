var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Body, HttpException, HttpStatus, Inject, Res, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/register.use-case';
import { LoginUserUseCase } from '../../../application/auth/use-cases/login.use-case';
import { RefreshUserTokenUseCase } from '../../../application/auth/use-cases/refresh-token.use-case';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto, LoginResponseDto, UserPayloadDto } from '../dtos/auth.dto';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';
let AuthController = class AuthController {
    constructor(registerUserUseCase, loginUserUseCase, refreshUserTokenUseCase, userRepository, tokenService) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.refreshUserTokenUseCase = refreshUserTokenUseCase;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    async register(body) {
        try {
            const user = await this.registerUserUseCase.execute(body);
            return { message: 'User registered successfully', userId: user.getId() };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async login(body, res) {
        try {
            const result = await this.loginUserUseCase.execute(body);
            res.cookie('accessToken', result.tokens.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
            });
            res.cookie('refreshToken', result.tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
            });
            return { user: result.user };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }
    }
    async logout(res) {
        res.clearCookie('accessToken', { path: '/' });
        res.clearCookie('refreshToken', { path: '/' });
        return { message: 'Logged out successfully' };
    }
    async me(req) {
        const token = req.cookies['accessToken'];
        if (!token) {
            throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
        }
        try {
            const payload = this.tokenService.verifyAccessToken(token);
            const user = await this.userRepository.findById(payload.userId);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
            }
            return {
                id: user.getId(),
                email: user.getEmail(),
                role: user.getRole().toString(),
                organizationId: user.getOrganizationId()
            };
        }
        catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
    async refresh(req, res) {
        const token = req.cookies['refreshToken'];
        if (!token) {
            throw new HttpException('No refresh token provided', HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.refreshUserTokenUseCase.execute(token);
            res.cookie('accessToken', result.tokens.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
            });
            res.cookie('refreshToken', result.tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
            });
            return { user: result.user };
        }
        catch (e) {
            res.clearCookie('accessToken', { path: '/' });
            res.clearCookie('refreshToken', { path: '/' });
            throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
        }
    }
};
__decorate([
    Post('register'),
    Throttle({ default: { limit: process.env.NODE_ENV === 'test' ? 100 : 5, ttl: 60000 } }),
    ApiOperation({ summary: 'Register a new user' }),
    ApiBody({ type: RegisterUserDto }),
    ApiResponse({ status: 201, description: 'User registered successfully' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post('login'),
    Throttle({ default: { limit: process.env.NODE_ENV === 'test' ? 100 : 5, ttl: 60000 } }),
    ApiOperation({ summary: 'Login an existing user' }),
    ApiBody({ type: LoginUserDto }),
    ApiResponse({ status: 200, description: 'Successfully logged in, returns tokens', type: LoginResponseDto }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('logout'),
    ApiOperation({ summary: 'Logout user (clears cookie)' }),
    ApiResponse({ status: 200, description: 'Successfully logged out' }),
    __param(0, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Get('me'),
    ApiOperation({ summary: 'Get current user profile from cookie' }),
    ApiResponse({ status: 200, description: 'Current user profile', type: UserPayloadDto }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    Post('refresh'),
    ApiOperation({ summary: 'Refresh access token' }),
    ApiResponse({ status: 200, description: 'Tokens refreshed successfully', type: LoginResponseDto }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    ApiTags('Auth'),
    Controller('api/v1/auth'),
    __param(0, Inject(RegisterUserUseCase)),
    __param(1, Inject(LoginUserUseCase)),
    __param(2, Inject(RefreshUserTokenUseCase)),
    __param(3, Inject(USER_REPOSITORY_TOKEN)),
    __param(4, Inject('TOKEN_SERVICE')),
    __metadata("design:paramtypes", [RegisterUserUseCase,
        LoginUserUseCase,
        RefreshUserTokenUseCase, Object, Object])
], AuthController);
export { AuthController };
