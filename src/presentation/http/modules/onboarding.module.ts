import { Module } from '@nestjs/common';
import { InternationalController } from '../controllers/international.controller';
import { HqController } from '../controllers/hq.controller';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { SubmitOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { BcryptPasswordHasher } from '../../../infrastructure/auth/bcrypt-password-hasher';
import {
  DatabaseModule,
  ORGANIZATION_APPLICATION_REPOSITORY_TOKEN,
  ORGANIZATION_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from './database.module';
import { IOrganizationApplicationRepository } from '../../../application/onboarding/ports/organization-application.repository.interface';
import { IOrganizationRepository } from '../../../application/organization/ports/organization.repository.interface';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [InternationalController, HqController],
  providers: [
    {
      provide: GetOrganizationsUseCase,
      useFactory: (orgRepo: IOrganizationRepository) => new GetOrganizationsUseCase(orgRepo),
      inject: [ORGANIZATION_REPOSITORY_TOKEN],
    },
    {
      provide: 'PASSWORD_HASHER',
      useFactory: () => new BcryptPasswordHasher(),
    },
    {
      provide: SubmitOrganizationApplicationUseCase,
      useFactory: (appRepo: IOrganizationApplicationRepository, hasher: BcryptPasswordHasher) => new SubmitOrganizationApplicationUseCase(appRepo, hasher),
      inject: [ORGANIZATION_APPLICATION_REPOSITORY_TOKEN, 'PASSWORD_HASHER'],
    },
    {
      provide: ApproveOrganizationApplicationUseCase,
      useFactory: (appRepo: IOrganizationApplicationRepository, orgRepo: IOrganizationRepository, userRepo: IUserRepository) => new ApproveOrganizationApplicationUseCase(appRepo, orgRepo, userRepo),
      inject: [ORGANIZATION_APPLICATION_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN],
    },
  ],
})
export class OnboardingModule { }
