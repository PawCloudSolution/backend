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
import { Controller, Post, Body, HttpException, HttpStatus, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { SubmitOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { SubmitHqApplicationDto, ApproveHqApplicationDto } from '../dtos/onboarding.dto';
import { GetPendingApplicationsUseCase } from '../../../application/onboarding/use-cases/get-pending-applications.use-case';
let HqController = class HqController {
    constructor(submitOrganizationApplicationUseCase, approveOrganizationApplicationUseCase, getPendingApplicationsUseCase, getOrganizationsUseCase, userRepository) {
        this.submitOrganizationApplicationUseCase = submitOrganizationApplicationUseCase;
        this.approveOrganizationApplicationUseCase = approveOrganizationApplicationUseCase;
        this.getPendingApplicationsUseCase = getPendingApplicationsUseCase;
        this.getOrganizationsUseCase = getOrganizationsUseCase;
        this.userRepository = userRepository;
    }
    async getPendingApplications(intId) {
        try {
            const allPending = await this.getPendingApplicationsUseCase.execute('headquarter');
            return allPending.filter(app => app.internationalId === intId);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async getHqs(intId) {
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
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async submitOrg(intId, body) {
        try {
            const app = await this.submitOrganizationApplicationUseCase.execute({
                ...body,
                applicationType: 'headquarter',
                internationalId: intId
            });
            return { message: 'Application submitted', id: app.getId() };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async approveOrg(user, body) {
        try {
            const { applicationId } = body;
            const approver = await this.userRepository.findById(user.id);
            if (!approver) {
                throw new HttpException('Approver not found', HttpStatus.NOT_FOUND);
            }
            await this.approveOrganizationApplicationUseCase.execute(applicationId, approver);
            return { message: 'Application approved' };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    Get('applications/pending'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin', 'internationalPresident'),
    ApiOperation({ summary: 'List all pending HQ applications for an International organization' }),
    ApiResponse({ status: 200, description: 'List of pending HQ applications' }),
    __param(0, Param('intId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HqController.prototype, "getPendingApplications", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List all active HQs under a specific International organization' }),
    ApiResponse({ status: 200, description: 'List of HQs' }),
    __param(0, Param('intId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HqController.prototype, "getHqs", null);
__decorate([
    Post('submit'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin', 'internationalPresident'),
    ApiOperation({ summary: 'Submit an application for a new HQ' }),
    ApiBody({ type: SubmitHqApplicationDto }),
    ApiResponse({ status: 201, description: 'Application submitted successfully' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    __param(0, Param('intId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SubmitHqApplicationDto]),
    __metadata("design:returntype", Promise)
], HqController.prototype, "submitOrg", null);
__decorate([
    Post('approve'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin'),
    ApiOperation({ summary: 'Approve a submitted HQ application' }),
    ApiBody({ type: ApproveHqApplicationDto }),
    ApiResponse({ status: 200, description: 'Application approved successfully' }),
    ApiResponse({ status: 404, description: 'Approver not found' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ApproveHqApplicationDto]),
    __metadata("design:returntype", Promise)
], HqController.prototype, "approveOrg", null);
HqController = __decorate([
    ApiTags('Headquarters (HQs)'),
    ApiBearerAuth(),
    ApiParam({ name: 'intId', type: 'string', description: 'International Organization ID' }),
    Controller('api/v1/internationals/:intId/hqs'),
    __param(0, Inject(SubmitOrganizationApplicationUseCase)),
    __param(1, Inject(ApproveOrganizationApplicationUseCase)),
    __param(2, Inject(GetPendingApplicationsUseCase)),
    __param(3, Inject(GetOrganizationsUseCase)),
    __param(4, Inject(USER_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [SubmitOrganizationApplicationUseCase,
        ApproveOrganizationApplicationUseCase,
        GetPendingApplicationsUseCase,
        GetOrganizationsUseCase, Object])
], HqController);
export { HqController };
