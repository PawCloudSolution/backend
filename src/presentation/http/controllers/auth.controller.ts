import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/register.use-case';
import { LoginUserUseCase } from '../../../application/auth/use-cases/login.use-case';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  @Post('register')
  public async register(@Body() body: any) {
    try {
      await this.registerUserUseCase.execute(body);
      return { message: 'User registered successfully' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  public async login(@Body() body: any) {
    try {
      return await this.loginUserUseCase.execute(body);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
