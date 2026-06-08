import { Module } from '@nestjs/common';
import { DatabaseModule, BREED_REPOSITORY_TOKEN, DOG_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN, BREED_APPLICATION_REPOSITORY_TOKEN } from './database.module';
import { BreedController } from '../controllers/breed.controller';
import { DogController } from '../controllers/dog.controller';
import { CreateBreedUseCase } from '../../../application/breed/use-cases/create-breed.use-case';
import { SubmitBreedApplicationUseCase } from '../../../application/breed/use-cases/submit-breed-application.use-case';
import { ApproveBreedApplicationUseCase } from '../../../application/breed/use-cases/approve-breed-application.use-case';
import { GetBreedsUseCase } from '../../../application/breed/use-cases/get-breeds.use-case';
import { RegisterDogUseCase } from '../../../application/dog/use-cases/register-dog.use-case';
import { GetDogsUseCase } from '../../../application/dog/use-cases/get-dogs.use-case';
import { IBreedRepository } from '../../../application/breed/ports/breed.repository.interface';
import { IBreedApplicationRepository } from '../../../application/breed/ports/breed-application.repository.interface';
import { IDogRepository } from '../../../application/dog/ports/dog.repository.interface';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';
import { IOrganizationRepository } from '../../../application/organization/ports/organization.repository.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [BreedController, DogController],
  providers: [
    {
      provide: CreateBreedUseCase,
      useFactory: (breedRepo: IBreedRepository, userRepo: IUserRepository, orgRepo: IOrganizationRepository) => {
        return new CreateBreedUseCase(breedRepo, userRepo, orgRepo);
      },
      inject: [BREED_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN]
    },
    {
      provide: SubmitBreedApplicationUseCase,
      useFactory: (breedAppRepo: IBreedApplicationRepository, userRepo: IUserRepository, orgRepo: IOrganizationRepository) => {
        return new SubmitBreedApplicationUseCase(breedAppRepo, userRepo, orgRepo);
      },
      inject: [BREED_APPLICATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN]
    },
    {
      provide: ApproveBreedApplicationUseCase,
      useFactory: (breedAppRepo: IBreedApplicationRepository, breedRepo: IBreedRepository, userRepo: IUserRepository, orgRepo: IOrganizationRepository) => {
        return new ApproveBreedApplicationUseCase(breedAppRepo, breedRepo, userRepo, orgRepo);
      },
      inject: [BREED_APPLICATION_REPOSITORY_TOKEN, BREED_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN]
    },
    {
      provide: GetBreedsUseCase,
      useFactory: (breedRepo: IBreedRepository) => {
        return new GetBreedsUseCase(breedRepo);
      },
      inject: [BREED_REPOSITORY_TOKEN]
    },
    {
      provide: RegisterDogUseCase,
      useFactory: (dogRepo: IDogRepository, breedRepo: IBreedRepository, userRepo: IUserRepository) => {
        return new RegisterDogUseCase(dogRepo, breedRepo, userRepo);
      },
      inject: [DOG_REPOSITORY_TOKEN, BREED_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN]
    },
    {
      provide: GetDogsUseCase,
      useFactory: (dogRepo: IDogRepository) => {
        return new GetDogsUseCase(dogRepo);
      },
      inject: [DOG_REPOSITORY_TOKEN]
    }
  ],
})
export class AnimalModule {}
