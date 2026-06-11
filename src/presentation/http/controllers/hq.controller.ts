import { Controller, Post, Body, HttpException, HttpStatus, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { SubmitOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { SubmitHqApplicationDto, ApproveHqApplicationDto } from '../dtos/onboarding.dto';

import { GetPendingApplicationsUseCase } from '../../../application/onboarding/use-cases/get-pending-applications.use-case';

@ApiTags('Headquarters (HQs)')
@ApiBearerAuth()
@ApiParam({ name: 'intId', type: 'string', description: 'International Organization ID' })
@Controller('api/v1/internationals/:intId/hqs')
export class HqController {
  constructor(
    @Inject(SubmitOrganizationApplicationUseCase) private readonly submitOrganizationApplicationUseCase: SubmitOrganizationApplicationUseCase,
    @Inject(ApproveOrganizationApplicationUseCase) private readonly approveOrganizationApplicationUseCase: ApproveOrganizationApplicationUseCase,
    @Inject(GetPendingApplicationsUseCase) private readonly getPendingApplicationsUseCase: GetPendingApplicationsUseCase,
    @Inject(GetOrganizationsUseCase) private readonly getOrganizationsUseCase: GetOrganizationsUseCase,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository
  ) {}

  @Get('applications/pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'internationalPresident')
  @ApiOperation({ summary: 'List all pending HQ applications for an International organization' })
  @ApiResponse({ status: 200, description: 'List of pending HQ applications' })
  public async getPendingApplications(@Param('intId') intId: string) {
    try {
      const allPending = await this.getPendingApplicationsUseCase.execute('headquarter');
      return allPending.filter(app => app.internationalId === intId);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all active HQs under a specific International organization' })
  @ApiResponse({ status: 200, description: 'List of HQs' })
  public async getHqs(@Param('intId') intId: string) {
    try {
      const orgs = await this.getOrganizationsUseCase.execute();
      return orgs
        .filter(o => o.getType() === 'headquarter' && o.getParentOrganizationId() === intId)
        .map(o => ({
          id: o.getId(),
          name: o.getName(),
          type: o.getType(),
          countryCode: o.getCountry(),
          internationalId: o.getParentOrganizationId()
        }));
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('submit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'internationalPresident')
  @ApiOperation({ summary: 'Submit an application for a new HQ' })
  @ApiBody({ type: SubmitHqApplicationDto })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async submitOrg(@Param('intId') intId: string, @Body() body: SubmitHqApplicationDto) {
    try {
      const app = await this.submitOrganizationApplicationUseCase.execute({
        ...body,
        applicationType: 'headquarter',
        internationalId: intId
      });
      return { message: 'Application submitted', id: app.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @ApiOperation({ summary: 'Approve a submitted HQ application' })
  @ApiBody({ type: ApproveHqApplicationDto })
  @ApiResponse({ status: 200, description: 'Application approved successfully' })
  @ApiResponse({ status: 404, description: 'Approver not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async approveOrg(@CurrentUser() user: any, @Body() body: ApproveHqApplicationDto) {
    try {
      const { applicationId } = body;
      const approver = await this.userRepository.findById(user.id);
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
