var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AnimalModule = class AnimalModule {
};
AnimalModule = __decorate([
    Module({
        imports: [DatabaseModule],
        controllers: [BreedController, DogController],
        providers: [
            {
                provide: CreateBreedUseCase,
                useFactory: (breedRepo, userRepo, orgRepo) => {
                    return new CreateBreedUseCase(breedRepo, userRepo, orgRepo);
                },
                inject: [BREED_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN]
            },
            {
                provide: SubmitBreedApplicationUseCase,
                useFactory: (breedAppRepo, userRepo, orgRepo) => {
                    return new SubmitBreedApplicationUseCase(breedAppRepo, userRepo, orgRepo);
                },
                inject: [BREED_APPLICATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN]
            },
            {
                provide: ApproveBreedApplicationUseCase,
                useFactory: (breedAppRepo, breedRepo, userRepo, orgRepo) => {
                    return new ApproveBreedApplicationUseCase(breedAppRepo, breedRepo, userRepo, orgRepo);
                },
                inject: [BREED_APPLICATION_REPOSITORY_TOKEN, BREED_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN]
            },
            {
                provide: GetBreedsUseCase,
                useFactory: (breedRepo) => {
                    return new GetBreedsUseCase(breedRepo);
                },
                inject: [BREED_REPOSITORY_TOKEN]
            },
            {
                provide: RegisterDogUseCase,
                useFactory: (dogRepo, breedRepo, userRepo) => {
                    return new RegisterDogUseCase(dogRepo, breedRepo, userRepo);
                },
                inject: [DOG_REPOSITORY_TOKEN, BREED_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN]
            },
            {
                provide: GetDogsUseCase,
                useFactory: (dogRepo) => {
                    return new GetDogsUseCase(dogRepo);
                },
                inject: [DOG_REPOSITORY_TOKEN]
            }
        ],
    })
], AnimalModule);
export { AnimalModule };
