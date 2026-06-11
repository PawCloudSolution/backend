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
import { Controller, Post, Body, HttpException, HttpStatus, Inject, Get, UseGuards } from '@nestjs/common';
import { SubmitOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { USER_REPOSITORY_TOKEN } from '../modules/database.module';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SubmitInternationalApplicationDto, ApproveInternationalApplicationDto } from '../dtos/onboarding.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GetPendingApplicationsUseCase } from '../../../application/onboarding/use-cases/get-pending-applications.use-case';
let InternationalController = class InternationalController {
    constructor(submitOrganizationApplicationUseCase, approveOrganizationApplicationUseCase, getPendingApplicationsUseCase, getOrganizationsUseCase, userRepository) {
        this.submitOrganizationApplicationUseCase = submitOrganizationApplicationUseCase;
        this.approveOrganizationApplicationUseCase = approveOrganizationApplicationUseCase;
        this.getPendingApplicationsUseCase = getPendingApplicationsUseCase;
        this.getOrganizationsUseCase = getOrganizationsUseCase;
        this.userRepository = userRepository;
    }
    async getPendingApplications() {
        try {
            return await this.getPendingApplicationsUseCase.execute('international');
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async getInternationals() {
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
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async submitOrg(body) {
        try {
            const app = await this.submitOrganizationApplicationUseCase.execute({
                ...body,
                applicationType: 'international',
                internationalId: null
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
    Roles('superAdmin'),
    ApiOperation({ summary: 'List all pending International applications (SuperAdmin only)' }),
    ApiResponse({ status: 200, description: 'List of pending international applications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InternationalController.prototype, "getPendingApplications", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List all active International organizations' }),
    ApiResponse({ status: 200, description: 'List of International organizations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InternationalController.prototype, "getInternationals", null);
__decorate([
    Post('submit'),
    ApiOperation({ summary: 'Submit an application for a new International Organization' }),
    ApiBody({ type: SubmitInternationalApplicationDto }),
    ApiResponse({ status: 201, description: 'Application submitted successfully' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SubmitInternationalApplicationDto]),
    __metadata("design:returntype", Promise)
], InternationalController.prototype, "submitOrg", null);
__decorate([
    Post('approve'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin'),
    ApiOperation({ summary: 'Approve a submitted application (SuperAdmin only)' }),
    ApiBody({ type: ApproveInternationalApplicationDto }),
    ApiResponse({ status: 200, description: 'Application approved successfully' }),
    ApiResponse({ status: 404, description: 'Approver not found' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ApproveInternationalApplicationDto]),
    __metadata("design:returntype", Promise)
], InternationalController.prototype, "approveOrg", null);
InternationalController = __decorate([
    ApiTags('Internationals'),
    ApiBearerAuth(),
    Controller('api/v1/internationals'),
    __param(0, Inject(SubmitOrganizationApplicationUseCase)),
    __param(1, Inject(ApproveOrganizationApplicationUseCase)),
    __param(2, Inject(GetPendingApplicationsUseCase)),
    __param(3, Inject(GetOrganizationsUseCase)),
    __param(4, Inject(USER_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [SubmitOrganizationApplicationUseCase,
        ApproveOrganizationApplicationUseCase,
        GetPendingApplicationsUseCase,
        GetOrganizationsUseCase, Object])
], InternationalController);
export { InternationalController };
