var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { InternationalController } from '../controllers/international.controller';
import { HqController } from '../controllers/hq.controller';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { SubmitOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/submit-hq-application.use-case';
import { ApproveOrganizationApplicationUseCase } from '../../../application/onboarding/use-cases/approve-hq-application.use-case';
import { GetPendingApplicationsUseCase } from '../../../application/onboarding/use-cases/get-pending-applications.use-case';
import { BcryptPasswordHasher } from '../../../infrastructure/auth/bcrypt-password-hasher';
import { DatabaseModule, ORGANIZATION_APPLICATION_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, } from './database.module';
let OnboardingModule = class OnboardingModule {
};
OnboardingModule = __decorate([
    Module({
        imports: [DatabaseModule],
        controllers: [InternationalController, HqController],
        providers: [
            {
                provide: GetOrganizationsUseCase,
                useFactory: (orgRepo) => new GetOrganizationsUseCase(orgRepo),
                inject: [ORGANIZATION_REPOSITORY_TOKEN],
            },
            {
                provide: 'PASSWORD_HASHER',
                useFactory: () => new BcryptPasswordHasher(),
            },
            {
                provide: SubmitOrganizationApplicationUseCase,
                useFactory: (appRepo, hasher) => new SubmitOrganizationApplicationUseCase(appRepo, hasher),
                inject: [ORGANIZATION_APPLICATION_REPOSITORY_TOKEN, 'PASSWORD_HASHER'],
            },
            {
                provide: ApproveOrganizationApplicationUseCase,
                useFactory: (appRepo, orgRepo, userRepo) => new ApproveOrganizationApplicationUseCase(appRepo, orgRepo, userRepo),
                inject: [ORGANIZATION_APPLICATION_REPOSITORY_TOKEN, ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN],
            },
            {
                provide: GetPendingApplicationsUseCase,
                useFactory: (appRepo) => new GetPendingApplicationsUseCase(appRepo),
                inject: [ORGANIZATION_APPLICATION_REPOSITORY_TOKEN],
            },
        ],
    })
], OnboardingModule);
export { OnboardingModule };
