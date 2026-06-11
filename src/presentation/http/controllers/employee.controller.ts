import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GetPendingEmployeesUseCase } from '../../../application/organization/use-cases/get-pending-employees.use-case';
import { ApproveEmployeeUseCase } from '../../../application/organization/use-cases/approve-employee.use-case';
import { ApproveEmployeeDtoHttp, GetPendingEmployeesDtoHttp } from '../dtos/employee.dto';

@ApiTags('Employees')
@ApiBearerAuth()
@Controller('api/v1/employees')
export class EmployeeController {
  constructor(
    @Inject(GetPendingEmployeesUseCase) private readonly getPendingEmployeesUseCase: GetPendingEmployeesUseCase,
    @Inject(ApproveEmployeeUseCase) private readonly approveEmployeeUseCase: ApproveEmployeeUseCase
  ) {}

  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'internationalPresident', 'nationalPresident', 'branchPresident')
  @ApiOperation({ summary: 'List pending employees for an organization (Manager/President only)' })
  @ApiQuery({ name: 'organizationId', required: true, description: 'ID of the organization' })
  @ApiResponse({ status: 200, description: 'List of pending employees' })
  public async getPendingEmployees(@CurrentUser() user: any, @Query() query: GetPendingEmployeesDtoHttp) {
    try {
      const users = await this.getPendingEmployeesUseCase.execute(query.organizationId, user.id);
      return users.map(user => ({
        id: user.getId(),
        name: user.getName(),
        surname: user.getSurname(),
        email: user.getEmail(),
        role: user.getRole().toString()
      }));
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'internationalPresident', 'nationalPresident', 'branchPresident')
  @ApiOperation({ summary: 'Approve a pending employee' })
  @ApiParam({ name: 'id', type: 'string', description: 'Employee User ID' })
  @ApiBody({ type: ApproveEmployeeDtoHttp })
  @ApiResponse({ status: 201, description: 'Employee approved successfully' })
  public async approveEmployee(@CurrentUser() user: any, @Param('id') id: string, @Body() body: ApproveEmployeeDtoHttp) {
    try {
      await this.approveEmployeeUseCase.execute(id, user.id);
      return { message: 'Employee approved successfully' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
