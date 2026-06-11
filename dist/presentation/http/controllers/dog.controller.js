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
import { Controller, Get, Post, Body, Query, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RegisterDogUseCase } from '../../../application/dog/use-cases/register-dog.use-case';
import { GetDogsUseCase } from '../../../application/dog/use-cases/get-dogs.use-case';
import { RegisterDogDtoHttp } from '../dtos/dog.dto';
let DogController = class DogController {
    constructor(registerDogUseCase, getDogsUseCase) {
        this.registerDogUseCase = registerDogUseCase;
        this.getDogsUseCase = getDogsUseCase;
    }
    async registerDog(user, body) {
        try {
            const payload = {
                ...body,
                requesterId: user.id
            };
            const dog = await this.registerDogUseCase.execute(payload);
            return { message: 'Dog registered successfully', id: dog.getId().toString() };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async getDogs(ownerId, organizationId) {
        try {
            let dogs = [];
            if (ownerId) {
                dogs = await this.getDogsUseCase.executeByOwnerId(ownerId);
            }
            else if (organizationId) {
                dogs = await this.getDogsUseCase.executeByOrganizationId(organizationId);
            }
            else {
                throw new Error('Must provide either ownerId or organizationId filter');
            }
            return dogs.map(d => ({
                id: d.getId(),
                name: d.getName(),
                sex: d.getSex(),
                dateBirth: d.getDateBirth(),
                breed: d.getBreed().getNames(),
                ownerId: d.getOwnerId(),
                breederId: d.getBreederId(),
                organizationId: d.getOrganizationId()
            }));
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('employee', 'internationalPresident', 'nationalPresident', 'branchPresident', 'superAdmin'),
    ApiOperation({ summary: 'Register a new dog (creates a pending registration)' }),
    ApiBody({ type: RegisterDogDtoHttp }),
    ApiResponse({ status: 201, description: 'Dog registered successfully' }),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RegisterDogDtoHttp]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "registerDog", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List dogs by owner or organization' }),
    ApiQuery({ name: 'ownerId', required: false, description: 'Filter by owner ID' }),
    ApiQuery({ name: 'organizationId', required: false, description: 'Filter by organization ID' }),
    ApiResponse({ status: 200, description: 'List of dogs' }),
    __param(0, Query('ownerId')),
    __param(1, Query('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "getDogs", null);
DogController = __decorate([
    ApiTags('Dogs'),
    ApiBearerAuth(),
    Controller('api/v1/dogs'),
    __param(0, Inject(RegisterDogUseCase)),
    __param(1, Inject(GetDogsUseCase)),
    __metadata("design:paramtypes", [RegisterDogUseCase,
        GetDogsUseCase])
], DogController);
export { DogController };
