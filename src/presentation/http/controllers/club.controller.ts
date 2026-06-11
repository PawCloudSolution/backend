import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { CreateBranchUseCase } from '../../../application/organization/use-cases/create-branch.use-case';
import { CreateClubDtoHttp } from '../dtos/organization.dto';

@ApiTags('Clubs')
@ApiBearerAuth()
@ApiParam({ name: 'hqId', type: 'string', description: 'Headquarters ID' })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'nationalPresident')
  @ApiOperation({ summary: 'Create a new Club (Branch) under a Headquarter' })
  @ApiBody({ type: CreateClubDtoHttp })
  @ApiResponse({ status: 201, description: 'Club created successfully' })
  public async createClub(@CurrentUser() user: any, @Param('hqId') hqId: string, @Body() body: CreateClubDtoHttp) {
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
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
