import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './presentation/http/modules/auth.module.js';
import { OnboardingModule } from './presentation/http/modules/onboarding.module.js';
import { OrganizationModule } from './presentation/http/modules/organization.module.js';
import { AnimalModule } from './presentation/http/modules/animal.module.js';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 requests per minute globally
    }]),
    AuthModule, 
    OnboardingModule, 
    OrganizationModule, 
    AnimalModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule { }
