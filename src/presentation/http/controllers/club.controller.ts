import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { CreateBranchUseCase } from '../../../application/organization/use-cases/create-branch.use-case';
import { CreateClubDtoHttp } from '../dtos/organization.dto';

@ApiTags('Clubs')
@ApiBearerAuth()
@Controller('api/v1/hqs/:hqId/clubs')
export class ClubController {
  constructor(
    @Inject(GetOrganizationsUseCase) private readonly getOrganizationsUseCase: GetOrganizationsUseCase,
    @Inject(CreateBranchUseCase) private readonly createBranchUseCase: CreateBranchUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all active clubs under a specific HQ' })
  @ApiResponse({ status: 200, description: 'List of clubs' })
  public async getClubs(@Param('hqId') hqId: string) {
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
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a local club under an HQ (HQ President or SuperAdmin)' })
  @ApiBody({ type: CreateClubDtoHttp })
  @ApiResponse({ status: 201, description: 'Club created successfully' })
  public async createClub(@Param('hqId') hqId: string, @Body() body: CreateClubDtoHttp) {
    try {
      const branch = await this.createBranchUseCase.execute({
        parentOrganizationId: hqId,
        name: body.name,
        countryCode: body.countryCode,
        taxNumber: body.taxNumber,
        registrationNumber: body.registrationNumber,
        requesterId: body.requesterId
      });
      return { message: 'Club created successfully', id: branch.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
