import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'List pending employees for an organization (Manager/President only)' })
  @ApiQuery({ name: 'organizationId', required: true, description: 'ID of the organization' })
  @ApiQuery({ name: 'requesterId', required: true, description: 'ID of the user making the request (Manager)' })
  @ApiResponse({ status: 200, description: 'List of pending employees' })
  public async getPendingEmployees(@Query() query: GetPendingEmployeesDtoHttp) {
    try {
      const users = await this.getPendingEmployeesUseCase.execute(query.organizationId, query.requesterId);
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
  @ApiOperation({ summary: 'Approve a pending employee' })
  @ApiBody({ type: ApproveEmployeeDtoHttp })
  @ApiResponse({ status: 201, description: 'Employee approved successfully' })
  public async approveEmployee(@Param('id') id: string, @Body() body: ApproveEmployeeDtoHttp) {
    try {
      await this.approveEmployeeUseCase.execute(id, body.approverId);
      return { message: 'Employee approved successfully' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
