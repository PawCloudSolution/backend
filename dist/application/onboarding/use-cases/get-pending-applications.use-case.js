var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_APPLICATION_REPOSITORY_TOKEN } from '../../../presentation/http/modules/database.module';
let GetPendingApplicationsUseCase = class GetPendingApplicationsUseCase {
    constructor(orgAppRepository) {
        this.orgAppRepository = orgAppRepository;
    }
    async execute(type) {
        const apps = await this.orgAppRepository.findPending(type);
        return apps.map(app => ({
            id: app.getId(),
            type: app.getApplicationType(),
            organizationName: app.getOrganizationName(),
            countryCode: app.getCountryCode(),
            taxNumber: app.getTaxNumber(),
            registrationNumber: app.getRegistrationNumber(),
            presidentName: app.getPresidentName(),
            presidentSurname: app.getPresidentSurname(),
            presidentEmail: app.getPresidentEmail(),
            internationalId: app.getInternationalId()
        }));
    }
};
GetPendingApplicationsUseCase = __decorate([
    Injectable(),
    __param(0, Inject(ORGANIZATION_APPLICATION_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [Object])
], GetPendingApplicationsUseCase);
export { GetPendingApplicationsUseCase };
