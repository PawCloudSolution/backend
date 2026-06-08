import { Controller, Post, Body, HttpException, HttpStatus, Inject, Get } from '@nestjs/common';
import { SubmitOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SubmitInternationalApplicationDto, ApproveInternationalApplicationDto } from '../dtos/onboarding.dto';

@ApiTags('Internationals')
@ApiBearerAuth()
@Controller('api/v1/internationals')
export class InternationalController {
  constructor(
    @Inject(SubmitOrganizationApplicationUseCase) private readonly submitOrganizationApplicationUseCase: SubmitOrganizationApplicationUseCase,
    @Inject(ApproveOrganizationApplicationUseCase) private readonly approveOrganizationApplicationUseCase: ApproveOrganizationApplicationUseCase,
    @Inject(GetOrganizationsUseCase) private readonly getOrganizationsUseCase: GetOrganizationsUseCase,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all active International organizations' })
  @ApiResponse({ status: 200, description: 'List of International organizations' })
  public async getInternationals() {
    try {
      const orgs = await this.getOrganizationsUseCase.execute();
      return orgs
        .filter(o => o.getType() === 'international')
        .map(o => ({
          id: o.getId(),
          name: o.getName(),
          type: o.getType(),
          countryCode: o.getCountry()
        }));
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('submit')
  @ApiOperation({ summary: 'Submit an application for a new International Organization' })
  @ApiBody({ type: SubmitInternationalApplicationDto })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async submitOrg(@Body() body: SubmitInternationalApplicationDto) {
    try {
      const app = await this.submitOrganizationApplicationUseCase.execute({
        ...body,
        applicationType: 'international',
        internationalId: null
      });
      return { message: 'Application submitted', id: app.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('approve')
  @ApiOperation({ summary: 'Approve a submitted International application (SuperAdmin only)' })
  @ApiBody({ type: ApproveInternationalApplicationDto })
  @ApiResponse({ status: 200, description: 'Application approved successfully' })
  @ApiResponse({ status: 404, description: 'Approver not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async approveOrg(@Body() body: ApproveInternationalApplicationDto) {
    try {
      const { applicationId, approverId } = body;
      const approver = await this.userRepository.findById(approverId);
      if (!approver) {
        throw new HttpException('Approver not found', HttpStatus.NOT_FOUND);
      }
      await this.approveOrganizationApplicationUseCase.execute(applicationId, approver);
      return { message: 'Application approved' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
