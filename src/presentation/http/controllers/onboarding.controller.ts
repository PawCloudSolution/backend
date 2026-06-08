import { Controller, Post, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { SubmitHqApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveHqApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SubmitHqApplicationDto, ApproveHqApplicationDto } from '../dtos/onboarding.dto';

@ApiTags('Onboarding')
@ApiBearerAuth()
@Controller('api/v1/onboarding')
export class OnboardingController {
  constructor(
    @Inject(SubmitHqApplicationUseCase) private readonly submitHqApplicationUseCase: SubmitHqApplicationUseCase,
    @Inject(ApproveHqApplicationUseCase) private readonly approveHqApplicationUseCase: ApproveHqApplicationUseCase,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository
  ) {}

  @Post('hq/submit')
  @ApiOperation({ summary: 'Submit an application for a new Headquarter' })
  @ApiBody({ type: SubmitHqApplicationDto })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async submitHq(@Body() body: SubmitHqApplicationDto) {
    try {
      const app = await this.submitHqApplicationUseCase.execute(body);
      return { message: 'Application submitted', id: app.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('hq/approve')
  @ApiOperation({ summary: 'Approve a submitted HQ application (SuperAdmin only)' })
  @ApiBody({ type: ApproveHqApplicationDto })
  @ApiResponse({ status: 200, description: 'Application approved successfully' })
  @ApiResponse({ status: 404, description: 'Approver not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async approveHq(@Body() body: ApproveHqApplicationDto) {
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
