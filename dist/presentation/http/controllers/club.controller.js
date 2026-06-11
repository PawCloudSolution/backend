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
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { CreateBranchUseCase } from '../../../application/organization/use-cases/create-branch.use-case';
import { CreateClubDtoHttp } from '../dtos/organization.dto';
let ClubController = class ClubController {
    constructor(getOrganizationsUseCase, createBranchUseCase) {
        this.getOrganizationsUseCase = getOrganizationsUseCase;
        this.createBranchUseCase = createBranchUseCase;
    }
    async getClubs(hqId) {
        try {
            const orgs = await this.getOrganizationsUseCase.execute();
            return orgs
                .filter(o => o.getType() === 'club' && o.getParentOrganizationId() === hqId)
                .map(o => ({
                id: o.getId(),
                name: o.getName(),
                type: o.getType(),
                countryCode: o.getCountry(),
                hqId: o.getParentOrganizationId()
            }));
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async createClub(user, hqId, body) {
        try {
            const branch = await this.createBranchUseCase.execute({
                parentOrganizationId: hqId,
                name: body.name,
                countryCode: body.countryCode,
                taxNumber: body.taxNumber,
                registrationNumber: body.registrationNumber,
                requesterId: user.id,
                presidentName: body.presidentName,
                presidentSurname: body.presidentSurname,
                presidentEmail: body.presidentEmail,
                presidentPhone: body.presidentPhone,
                presidentPasswordPlain: body.presidentPasswordPlain
            });
            return { message: 'Club created successfully', id: branch.getId() };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'List all active clubs under a specific HQ' }),
    ApiResponse({ status: 200, description: 'List of clubs' }),
    __param(0, Param('hqId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClubController.prototype, "getClubs", null);
__decorate([
    Post(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin', 'nationalPresident'),
    ApiOperation({ summary: 'Create a new Club (Branch) under a Headquarter' }),
    ApiBody({ type: CreateClubDtoHttp }),
    ApiResponse({ status: 201, description: 'Club created successfully' }),
    __param(0, CurrentUser()),
    __param(1, Param('hqId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateClubDtoHttp]),
    __metadata("design:returntype", Promise)
], ClubController.prototype, "createClub", null);
ClubController = __decorate([
    ApiTags('Clubs'),
    ApiBearerAuth(),
    ApiParam({ name: 'hqId', type: 'string', description: 'Headquarters ID' }),
    Controller('api/v1/hqs/:hqId/clubs'),
    __param(0, Inject(GetOrganizationsUseCase)),
    __param(1, Inject(CreateBranchUseCase)),
    __metadata("design:paramtypes", [GetOrganizationsUseCase,
        CreateBranchUseCase])
], ClubController);
export { ClubController };
