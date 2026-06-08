import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateBreedUseCase } from '../../../application/breed/use-cases/create-breed.use-case';
import { SubmitBreedApplicationUseCase } from '../../../application/breed/use-cases/submit-breed-application.use-case';
import { ApproveBreedApplicationUseCase } from '../../../application/breed/use-cases/approve-breed-application.use-case';
import { GetBreedsUseCase } from '../../../application/breed/use-cases/get-breeds.use-case';
import { CreateBreedDtoHttp, SubmitBreedApplicationDtoHttp, ApproveBreedApplicationDtoHttp } from '../dtos/breed.dto';

@ApiTags('Breeds')
@ApiBearerAuth()
@Controller('api/v1/breeds')
export class BreedController {
  constructor(
    @Inject(CreateBreedUseCase) private readonly createBreedUseCase: CreateBreedUseCase,
    @Inject(SubmitBreedApplicationUseCase) private readonly submitBreedApplicationUseCase: SubmitBreedApplicationUseCase,
    @Inject(ApproveBreedApplicationUseCase) private readonly approveBreedApplicationUseCase: ApproveBreedApplicationUseCase,
    @Inject(GetBreedsUseCase) private readonly getBreedsUseCase: GetBreedsUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all available breeds' })
  @ApiResponse({ status: 200, description: 'List of breeds' })
  public async getBreeds() {
    try {
      const breeds = await this.getBreedsUseCase.execute();
      return breeds.map(b => ({
        id: b.getId().toString(),
        names: b.getNames(),
      }));
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a breed directly (SuperAdmin or International President only)' })
  @ApiBody({ type: CreateBreedDtoHttp })
  @ApiResponse({ status: 201, description: 'Breed created successfully' })
  public async createBreed(@Body() body: CreateBreedDtoHttp) {
    try {
      const breed = await this.createBreedUseCase.execute(body);
      return { message: 'Breed created successfully', id: breed.getId().toString() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('applications')
  @ApiOperation({ summary: 'Submit a new breed application (Club Employee only)' })
  @ApiBody({ type: SubmitBreedApplicationDtoHttp })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  public async submitApplication(@Body() body: SubmitBreedApplicationDtoHttp) {
    try {
      const app = await this.submitBreedApplicationUseCase.execute(body);
      return { message: 'Application submitted successfully', id: app.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('applications/:id/approve')
  @ApiOperation({ summary: 'Approve a breed application (SuperAdmin or International President only)' })
  @ApiBody({ type: ApproveBreedApplicationDtoHttp })
  @ApiResponse({ status: 200, description: 'Application approved successfully' })
  public async approveApplication(@Param('id') id: string, @Body() body: ApproveBreedApplicationDtoHttp) {
    try {
      const breed = await this.approveBreedApplicationUseCase.execute(id, body.approverId);
      return { message: 'Application approved successfully', breedId: breed.getId().toString() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
