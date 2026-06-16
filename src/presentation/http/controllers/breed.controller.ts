import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateBreedUseCase } from '../../../application/breed/use-cases/create-breed.use-case';
import { SubmitBreedApplicationUseCase } from '../../../application/breed/use-cases/submit-breed-application.use-case';
import { ApproveBreedApplicationUseCase } from '../../../application/breed/use-cases/approve-breed-application.use-case';
import { GetBreedsUseCase } from '../../../application/breed/use-cases/get-breeds.use-case';
import { AddBreedLanguageUseCase } from '../../../application/breed/use-cases/add-breed-language.use-case';
import { CreateBreedDtoHttp, SubmitBreedApplicationDtoHttp, ApproveBreedApplicationDtoHttp, AddBreedLanguageDtoHttp } from '../dtos/breed.dto';

@ApiTags('Breeds')
@ApiBearerAuth()
@Controller('api/v1/breeds')
export class BreedController {
  constructor(
    @Inject(CreateBreedUseCase) private readonly createBreedUseCase: CreateBreedUseCase,
    @Inject(SubmitBreedApplicationUseCase) private readonly submitBreedApplicationUseCase: SubmitBreedApplicationUseCase,
    @Inject(ApproveBreedApplicationUseCase) private readonly approveBreedApplicationUseCase: ApproveBreedApplicationUseCase,
    @Inject(GetBreedsUseCase) private readonly getBreedsUseCase: GetBreedsUseCase,
    @Inject(AddBreedLanguageUseCase) private readonly addBreedLanguageUseCase: AddBreedLanguageUseCase
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all available breeds for user organization' })
  @ApiResponse({ status: 200, description: 'List of breeds' })
  public async getBreeds(@CurrentUser() user: any) {
    try {
      const breeds = await this.getBreedsUseCase.execute(user.id);
      return breeds.map(b => ({
        id: b.getId().toString(),
        names: b.getNames(),
      }));
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'internationalPresident')
  @ApiOperation({ summary: 'Create a breed directly (SuperAdmin or International President only)' })
  @ApiBody({ type: CreateBreedDtoHttp })
  @ApiResponse({ status: 201, description: 'Breed created successfully' })
  public async createBreed(@CurrentUser() user: any, @Body() body: CreateBreedDtoHttp) {
    try {
      const breed = await this.createBreedUseCase.execute({
        names: body.names,
        requesterId: user.id
      });
      return { message: 'Breed created successfully', id: breed.getId().toString() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employee', 'internationalPresident', 'nationalPresident', 'branchPresident')
  @ApiOperation({ summary: 'Submit an application to create a new breed' })
  @ApiBody({ type: SubmitBreedApplicationDtoHttp })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  public async submitApplication(@CurrentUser() user: any, @Body() body: SubmitBreedApplicationDtoHttp) {
    try {
      const app = await this.submitBreedApplicationUseCase.execute({
        names: body.names,
        requesterId: user.id
      });
      return { message: 'Application submitted successfully', id: app.getId() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('applications/:id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'internationalPresident')
  @ApiOperation({ summary: 'Approve a breed application (SuperAdmin or International President only)' })
  @ApiParam({ name: 'id', type: 'string', description: 'Application ID' })
  @ApiBody({ type: ApproveBreedApplicationDtoHttp })
  @ApiResponse({ status: 200, description: 'Application approved successfully' })
  public async approveApplication(@CurrentUser() user: any, @Param('id') id: string, @Body() body: ApproveBreedApplicationDtoHttp) {
    try {
      const breed = await this.approveBreedApplicationUseCase.execute(id, user.id);
      return { message: 'Application approved successfully', breedId: breed.getId().toString() };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/languages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin', 'internationalPresident')
  @ApiOperation({ summary: 'Add or update a language translation for a breed' })
  @ApiParam({ name: 'id', type: 'string', description: 'Breed ID' })
  @ApiBody({ type: AddBreedLanguageDtoHttp })
  @ApiResponse({ status: 200, description: 'Language added successfully' })
  public async addLanguage(@CurrentUser() user: any, @Param('id') id: string, @Body() body: AddBreedLanguageDtoHttp) {
    try {
      await this.addBreedLanguageUseCase.execute({
        breedId: id,
        languageCode: body.languageCode,
        name: body.name,
        requesterId: user.id
      });
      return { message: 'Language added successfully' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
