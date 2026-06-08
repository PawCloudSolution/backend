import { Controller, Get, Post, Body, Query, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RegisterDogUseCase } from '../../../application/dog/use-cases/register-dog.use-case';
import { GetDogsUseCase } from '../../../application/dog/use-cases/get-dogs.use-case';
import { RegisterDogDtoHttp } from '../dtos/dog.dto';

@ApiTags('Dogs')
@ApiBearerAuth()
@Controller('api/v1/dogs')
export class DogController {
  constructor(
    @Inject(RegisterDogUseCase) private readonly registerDogUseCase: RegisterDogUseCase,
    @Inject(GetDogsUseCase) private readonly getDogsUseCase: GetDogsUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a dog (Club Employee only)' })
  @ApiBody({ type: RegisterDogDtoHttp })
  @ApiResponse({ status: 201, description: 'Dog registered successfully' })
  public async registerDog(@Body() body: RegisterDogDtoHttp) {
    try {
      const dog = await this.registerDogUseCase.execute(body);
      return { message: 'Dog registered successfully', id: dog.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'List dogs by owner or organization' })
  @ApiQuery({ name: 'ownerId', required: false, description: 'Filter by owner ID' })
  @ApiQuery({ name: 'organizationId', required: false, description: 'Filter by organization ID' })
  @ApiResponse({ status: 200, description: 'List of dogs' })
  public async getDogs(@Query('ownerId') ownerId?: string, @Query('organizationId') organizationId?: string) {
    try {
      let dogs = [];
      if (ownerId) {
        dogs = await this.getDogsUseCase.executeByOwnerId(ownerId);
      } else if (organizationId) {
        dogs = await this.getDogsUseCase.executeByOrganizationId(organizationId);
      } else {
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
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
