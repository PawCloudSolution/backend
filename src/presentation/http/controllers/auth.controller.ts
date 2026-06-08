import { Controller, Post, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/register.use-case';
import { LoginUserUseCase } from '../../../application/auth/use-cases/login.use-case';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto } from '../dtos/auth.dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    @Inject(RegisterUserUseCase) private readonly registerUserUseCase: RegisterUserUseCase,
    @Inject(LoginUserUseCase) private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async register(@Body() body: RegisterUserDto) {
    try {
      await this.registerUserUseCase.execute(body);
      return { message: 'User registered successfully' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiResponse({ status: 200, description: 'Successfully logged in, returns tokens' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async login(@Body() body: LoginUserDto) {
    try {
      return await this.loginUserUseCase.execute(body);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
