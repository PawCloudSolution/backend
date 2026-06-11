var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmUserRepository } from '../../../infrastructure/database/repositories/typeorm-user.repository';
import { TypeOrmOrganizationRepository } from '../../../infrastructure/database/repositories/typeorm-organization.repository';
import { TypeOrmOrganizationApplicationRepository } from '../../../infrastructure/database/repositories/typeorm-organization-application.repository';
import { TypeOrmBreedRepository } from '../../../infrastructure/database/repositories/typeorm-breed.repository';
import { TypeOrmDogRepository } from '../../../infrastructure/database/repositories/typeorm-dog.repository';
import { TypeOrmBreedApplicationRepository } from '../../../infrastructure/database/repositories/typeorm-breed-application.repository';
export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';
export const ORGANIZATION_REPOSITORY_TOKEN = 'ORGANIZATION_REPOSITORY';
export const ORGANIZATION_APPLICATION_REPOSITORY_TOKEN = 'ORGANIZATION_APPLICATION_REPOSITORY';
export const BREED_REPOSITORY_TOKEN = 'BREED_REPOSITORY';
export const BREED_APPLICATION_REPOSITORY_TOKEN = 'BREED_APPLICATION_REPOSITORY';
export const DOG_REPOSITORY_TOKEN = 'DOG_REPOSITORY';
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    Module({
        providers: [
            {
                provide: USER_REPOSITORY_TOKEN,
                useFactory: () => new TypeOrmUserRepository(),
            },
            {
                provide: ORGANIZATION_REPOSITORY_TOKEN,
                useFactory: () => new TypeOrmOrganizationRepository(),
            },
            {
                provide: ORGANIZATION_APPLICATION_REPOSITORY_TOKEN,
                useFactory: () => new TypeOrmOrganizationApplicationRepository(),
            },
            {
                provide: BREED_REPOSITORY_TOKEN,
                useFactory: () => new TypeOrmBreedRepository(),
            },
            {
                provide: BREED_APPLICATION_REPOSITORY_TOKEN,
                useFactory: () => new TypeOrmBreedApplicationRepository(),
            },
            {
                provide: DOG_REPOSITORY_TOKEN,
                useFactory: () => new TypeOrmDogRepository(),
            },
        ],
        exports: [
            USER_REPOSITORY_TOKEN,
            ORGANIZATION_REPOSITORY_TOKEN,
            ORGANIZATION_APPLICATION_REPOSITORY_TOKEN,
            BREED_REPOSITORY_TOKEN,
            BREED_APPLICATION_REPOSITORY_TOKEN,
            DOG_REPOSITORY_TOKEN
        ],
    })
], DatabaseModule);
export { DatabaseModule };
