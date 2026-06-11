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
import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GetPendingEmployeesUseCase } from '../../../application/organization/use-cases/get-pending-employees.use-case';
import { ApproveEmployeeUseCase } from '../../../application/organization/use-cases/approve-employee.use-case';
import { ApproveEmployeeDtoHttp, GetPendingEmployeesDtoHttp } from '../dtos/employee.dto';
let EmployeeController = class EmployeeController {
    constructor(getPendingEmployeesUseCase, approveEmployeeUseCase) {
        this.getPendingEmployeesUseCase = getPendingEmployeesUseCase;
        this.approveEmployeeUseCase = approveEmployeeUseCase;
    }
    async getPendingEmployees(user, query) {
        try {
            const users = await this.getPendingEmployeesUseCase.execute(query.organizationId, user.id);
            return users.map(user => ({
                id: user.getId(),
                name: user.getName(),
                surname: user.getSurname(),
                email: user.getEmail(),
                role: user.getRole().toString()
            }));
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async approveEmployee(user, id, body) {
        try {
            await this.approveEmployeeUseCase.execute(id, user.id);
            return { message: 'Employee approved successfully' };
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    Get('pending'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin', 'internationalPresident', 'nationalPresident', 'branchPresident'),
    ApiOperation({ summary: 'List pending employees for an organization (Manager/President only)' }),
    ApiQuery({ name: 'organizationId', required: true, description: 'ID of the organization' }),
    ApiResponse({ status: 200, description: 'List of pending employees' }),
    __param(0, CurrentUser()),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GetPendingEmployeesDtoHttp]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getPendingEmployees", null);
__decorate([
    Post(':id/approve'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('superAdmin', 'internationalPresident', 'nationalPresident', 'branchPresident'),
    ApiOperation({ summary: 'Approve a pending employee' }),
    ApiParam({ name: 'id', type: 'string', description: 'Employee User ID' }),
    ApiBody({ type: ApproveEmployeeDtoHttp }),
    ApiResponse({ status: 201, description: 'Employee approved successfully' }),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ApproveEmployeeDtoHttp]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "approveEmployee", null);
EmployeeController = __decorate([
    ApiTags('Employees'),
    ApiBearerAuth(),
    Controller('api/v1/employees'),
    __param(0, Inject(GetPendingEmployeesUseCase)),
    __param(1, Inject(ApproveEmployeeUseCase)),
    __metadata("design:paramtypes", [GetPendingEmployeesUseCase,
        ApproveEmployeeUseCase])
], EmployeeController);
export { EmployeeController };
