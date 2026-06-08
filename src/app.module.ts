import { Module } from '@nestjs/common';
import { AuthModule } from './presentation/http/modules/auth.module.js';
import { OnboardingModule } from './presentation/http/modules/onboarding.module.js';

@Module({
  imports: [AuthModule, OnboardingModule],
})
export class AppModule { }
