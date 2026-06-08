import { Module } from '@nestjs/common';
import { OnboardingController } from '../controllers/onboarding.controller';
import { SubmitHqApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveHqApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
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
  controllers: [OnboardingController],
  providers: [
    {
      provide: 'PASSWORD_HASHER',
      useFactory: () => new BcryptPasswordHasher(),
    },
    {
      provide: SubmitHqApplicationUseCase,
      useFactory: (appRepo: IOrganizationApplicationRepository, hasher: BcryptPasswordHasher) => new SubmitHqApplicationUseCase(appRepo, hasher),
      inject: [ORGANIZATION_APPLICATION_REPOSITORY_TOKEN, 'PASSWORD_HASHER'],
    },
    {
      provide: ApproveHqApplicationUseCase,
      useFactory: (appRepo: IOrganizationApplicationRepository, orgRepo: IOrganizationRepository, userRepo: IUserRepository) => new ApproveHqApplicationUseCase(appRepo, orgRepo, userRepo),
      inject: [ORGANIZATION_APPLICATION_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN],
    },
  ],
})
export class OnboardingModule { }
