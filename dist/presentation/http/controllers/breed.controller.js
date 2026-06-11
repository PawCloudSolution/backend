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
import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateBreedUseCase } from '../../../application/breed/use-cases/create-breed.use-case';
import { SubmitBreedApplicationUseCase } from '../../../application/breed/use-cases/submit-breed-application.use-case';
import { ApproveBreedApplicationUseCase } from '../../../application/breed/use-cases/approve-breed-application.use-case';
import { GetBreedsUseCase } from '../../../application/breed/use-cases/get-breeds.use-case';
import { CreateBreedDtoHttp, SubmitBreedApplicationDtoHttp, ApproveBreedApplicationDtoHttp } from '../dtos/breed.dto';
let BreedController = class BreedController {
    constructor(createBreedUseCase, submitBreedApplicationUseCase, approveBreedApplicationUseCase, getBreedsUseCase) {
        this.createBreedUseCase = createBreedUseCase;
        this.submitBreedApplicationUseCase = submitBreedApplicationUseCase;
        this.approveBreedApplicationUseCase = approveBreedApplicationUseCase;
        this.getBreedsUseCase = getBreedsUseCase;
    }
    async getBreeds() {
        try {
            const breeds = await this.getBreedsUseCase.execute();
            return breeds.map(b => ({
                id: b.getId().toString(),
                names: b.getNames(),
            }));
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async createBreed(user, body) {
        try {
            const breed = await this.createBreedUseCase.execute({
                names: body.names,
                requesterId: user.id
            });
            return { message: 'Breed created successfully', id: breed.getId().toString() };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async submitApplication(user, body) {
        try {
            const app = await this.submitBreedApplicationUseCase.execute({
                names: body.names,
                requesterId: user.id
            });
            return { message: 'Application submitted successfully', id: app.getId() };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async approveApplication(user, id, body) {
        try {
            const breed = await this.approveBreedApplicationUseCase.execute(id, user.id);
            return { message: 'Application approved successfully', breedId: breed.getId().toString() };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'List all available breeds' }),
    ApiResponse({ status: 200, description: 'List of breeds' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BreedController.prototype, "getBreeds", null);
__decorate([
    Post(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin', 'internationalPresident'),
    ApiOperation({ summary: 'Create a breed directly (SuperAdmin or International President only)' }),
    ApiBody({ type: CreateBreedDtoHttp }),
    ApiResponse({ status: 201, description: 'Breed created successfully' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateBreedDtoHttp]),
    __metadata("design:returntype", Promise)
], BreedController.prototype, "createBreed", null);
__decorate([
    Post('applications'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('employee', 'internationalPresident', 'nationalPresident', 'branchPresident'),
    ApiOperation({ summary: 'Submit an application to create a new breed' }),
    ApiBody({ type: SubmitBreedApplicationDtoHttp }),
    ApiResponse({ status: 201, description: 'Application submitted successfully' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SubmitBreedApplicationDtoHttp]),
    __metadata("design:returntype", Promise)
], BreedController.prototype, "submitApplication", null);
__decorate([
    Post('applications/:id/approve'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin', 'internationalPresident'),
    ApiOperation({ summary: 'Approve a breed application (SuperAdmin or International President only)' }),
    ApiParam({ name: 'id', type: 'string', description: 'Application ID' }),
    ApiBody({ type: ApproveBreedApplicationDtoHttp }),
    ApiResponse({ status: 200, description: 'Application approved successfully' }),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ApproveBreedApplicationDtoHttp]),
    __metadata("design:returntype", Promise)
], BreedController.prototype, "approveApplication", null);
BreedController = __decorate([
    ApiTags('Breeds'),
    ApiBearerAuth(),
    Controller('api/v1/breeds'),
    __param(0, Inject(CreateBreedUseCase)),
    __param(1, Inject(SubmitBreedApplicationUseCase)),
    __param(2, Inject(ApproveBreedApplicationUseCase)),
    __param(3, Inject(GetBreedsUseCase)),
    __metadata("design:paramtypes", [CreateBreedUseCase,
        SubmitBreedApplicationUseCase,
        ApproveBreedApplicationUseCase,
        GetBreedsUseCase])
], BreedController);
export { BreedController };
