var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ClubController } from '../controllers/club.controller';
import { EmployeeController } from '../controllers/employee.controller';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { CreateBranchUseCase } from '../../../application/organization/use-cases/create-branch.use-case';
import { GetPendingEmployeesUseCase } from '../../../application/organization/use-cases/get-pending-employees.use-case';
import { ApproveEmployeeUseCase } from '../../../application/organization/use-cases/approve-employee.use-case';
import { DatabaseModule, ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN } from './database.module';
let OrganizationModule = class OrganizationModule {
};
OrganizationModule = __decorate([
    Module({
        imports: [DatabaseModule],
        controllers: [ClubController, EmployeeController],
        providers: [
            {
                provide: GetOrganizationsUseCase,
                useFactory: (orgRepo) => new GetOrganizationsUseCase(orgRepo),
                inject: [ORGANIZATION_REPOSITORY_TOKEN],
            },
            {
                provide: CreateBranchUseCase,
                useFactory: (orgRepo, userRepo, hasher) => new CreateBranchUseCase(orgRepo, userRepo, hasher),
                inject: [ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN, 'PASSWORD_HASHER'],
            },
            {
                provide: GetPendingEmployeesUseCase,
                useFactory: (userRepo) => new GetPendingEmployeesUseCase(userRepo),
                inject: [USER_REPOSITORY_TOKEN],
            },
            {
                provide: ApproveEmployeeUseCase,
                useFactory: (userRepo) => new ApproveEmployeeUseCase(userRepo),
                inject: [USER_REPOSITORY_TOKEN],
            },
        ],
    })
], OrganizationModule);
export { OrganizationModule };
