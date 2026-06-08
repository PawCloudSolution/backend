import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { CreateBranchUseCase } from '../../../application/organization/use-cases/create-branch.use-case';
import { CreateBranchDtoHttp } from '../dtos/organization.dto';

@ApiTags('Organizations')
@ApiBearerAuth()
@Controller('api/v1/organizations')
export class OrganizationController {
  constructor(
    @Inject(GetOrganizationsUseCase) private readonly getOrganizationsUseCase: GetOrganizationsUseCase,
    @Inject(CreateBranchUseCase) private readonly createBranchUseCase: CreateBranchUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all active organizations' })
  @ApiResponse({ status: 200, description: 'List of organizations' })
  public async getOrganizations() {
    try {
      const orgs = await this.getOrganizationsUseCase.execute();
      return orgs.map(o => ({
        id: o.getId(),
        name: o.getName(),
        type: o.getType(),
        parentOrganizationId: o.getParentOrganizationId(),
        countryCode: o.getCountry()
      }));
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/branches')
  @ApiOperation({ summary: 'Create a club branch under an HQ' })
  @ApiBody({ type: CreateBranchDtoHttp })
  @ApiResponse({ status: 201, description: 'Branch created successfully' })
  public async createBranch(@Param('id') id: string, @Body() body: CreateBranchDtoHttp) {
    try {
      const branch = await this.createBranchUseCase.execute({
        parentOrganizationId: id,
        name: body.name,
        countryCode: body.countryCode,
        taxNumber: body.taxNumber,
        registrationNumber: body.registrationNumber,
        requesterId: body.requesterId
      });
      return { message: 'Branch created successfully', id: branch.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
