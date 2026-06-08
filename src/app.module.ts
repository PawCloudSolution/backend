import { Module } from '@nestjs/common';
import { AuthModule } from './presentation/http/modules/auth.module.js';
import { OnboardingModule } from './presentation/http/modules/onboarding.module.js';
import { OrganizationModule } from './presentation/http/modules/organization.module.js';
import { AnimalModule } from './presentation/http/modules/animal.module.js';

@Module({
  imports: [AuthModule, OnboardingModule, OrganizationModule, AnimalModule],
})
export class AppModule { }
