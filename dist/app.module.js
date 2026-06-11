var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './presentation/http/modules/auth.module.js';
import { OnboardingModule } from './presentation/http/modules/onboarding.module.js';
import { OrganizationModule } from './presentation/http/modules/organization.module.js';
import { AnimalModule } from './presentation/http/modules/animal.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
], AppModule);
export { AppModule };
