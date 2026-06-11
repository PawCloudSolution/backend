import { Controller, Post, Get, Body, HttpException, HttpStatus, Inject, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { Throttle } from '@nestjs/throttler';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/register.use-case';
import { LoginUserUseCase } from '../../../application/auth/use-cases/login.use-case';
import { RefreshUserTokenUseCase } from '../../../application/auth/use-cases/refresh-token.use-case';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto, LoginResponseDto, UserPayloadDto } from '../dtos/auth.dto';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';
import { ITokenService } from '../../../application/auth/ports/token.service.interface';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    @Inject(RegisterUserUseCase) private readonly registerUserUseCase: RegisterUserUseCase,
    @Inject(LoginUserUseCase) private readonly loginUserUseCase: LoginUserUseCase,
    @Inject(RefreshUserTokenUseCase) private readonly refreshUserTokenUseCase: RefreshUserTokenUseCase,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository,
    @Inject('TOKEN_SERVICE') private readonly tokenService: ITokenService
  ) {}

  @Post('register')
  @Throttle({ default: { limit: process.env.NODE_ENV === 'test' ? 100 : 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async register(@Body() body: RegisterUserDto) {
    try {
      const user = await this.registerUserUseCase.execute(body);
      return { message: 'User registered successfully', userId: user.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @Throttle({ default: { limit: process.env.NODE_ENV === 'test' ? 100 : 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Successfully logged in, returns tokens', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: Response) {
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
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user (clears cookie)' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  public async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile from cookie' })
  @ApiResponse({ status: 200, description: 'Current user profile', type: UserPayloadDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async me(@Req() req: Request) {
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
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
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
    } catch (e: any) {
      res.clearCookie('accessToken', { path: '/' });
      res.clearCookie('refreshToken', { path: '/' });
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
