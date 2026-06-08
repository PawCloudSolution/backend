import { Module } from '@nestjs/common';
import { TypeOrmUserRepository } from '../../../infrastructure/database/repositories/typeorm-user.repository';
import { TypeOrmOrganizationRepository } from '../../../infrastructure/database/repositories/typeorm-organization.repository';
import { TypeOrmOrganizationApplicationRepository } from '../../../infrastructure/database/repositories/typeorm-organization-application.repository';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';
export const ORGANIZATION_REPOSITORY_TOKEN = 'ORGANIZATION_REPOSITORY';
export const ORGANIZATION_APPLICATION_REPOSITORY_TOKEN = 'ORGANIZATION_APPLICATION_REPOSITORY';

@Module({
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
  ],
  exports: [USER_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN, ORGANIZATION_APPLICATION_REPOSITORY_TOKEN],
})
export class DatabaseModule { }
