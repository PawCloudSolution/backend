import { Controller, Post, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { SubmitHqApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveHqApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';

@Controller('api/v1/onboarding')
export class OnboardingController {
  constructor(
    private readonly submitHqApplicationUseCase: SubmitHqApplicationUseCase,
    private readonly approveHqApplicationUseCase: ApproveHqApplicationUseCase,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository
  ) {}

  @Post('hq/submit')
  public async submitHq(@Body() body: any) {
    try {
      const app = await this.submitHqApplicationUseCase.execute(body);
      return { message: 'Application submitted', id: app.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('hq/approve')
  public async approveHq(@Body() body: any) {
    try {
      const { applicationId, approverId } = body;
      const approver = await this.userRepository.findById(approverId);
      if (!approver) {
        throw new HttpException('Approver not found', HttpStatus.NOT_FOUND);
      }
      await this.approveHqApplicationUseCase.execute(applicationId, approver);
      return { message: 'Application approved' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
