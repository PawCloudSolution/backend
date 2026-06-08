import { Module } from '@nestjs/common';
import { OrganizationController } from '../controllers/organization.controller';
import { EmployeeController } from '../controllers/employee.controller';
import { GetOrganizationsUseCase } from '../../../application/organization/use-cases/get-organizations.use-case';
import { CreateBranchUseCase } from '../../../application/organization/use-cases/create-branch.use-case';
import { GetPendingEmployeesUseCase } from '../../../application/organization/use-cases/get-pending-employees.use-case';
import { ApproveEmployeeUseCase } from '../../../application/organization/use-cases/approve-employee.use-case';
import { DatabaseModule, ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN } from './database.module';
import { IOrganizationRepository } from '../../../application/organization/ports/organization.repository.interface';
import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController, EmployeeController],
  providers: [
    {
      provide: GetOrganizationsUseCase,
      useFactory: (orgRepo: IOrganizationRepository) => new GetOrganizationsUseCase(orgRepo),
      inject: [ORGANIZATION_REPOSITORY_TOKEN],
    },
    {
      provide: CreateBranchUseCase,
      useFactory: (orgRepo: IOrganizationRepository, userRepo: IUserRepository) => new CreateBranchUseCase(orgRepo, userRepo),
      inject: [ORGANIZATION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN],
    },
    {
      provide: GetPendingEmployeesUseCase,
      useFactory: (userRepo: IUserRepository) => new GetPendingEmployeesUseCase(userRepo),
      inject: [USER_REPOSITORY_TOKEN],
    },
    {
      provide: ApproveEmployeeUseCase,
      useFactory: (userRepo: IUserRepository) => new ApproveEmployeeUseCase(userRepo),
      inject: [USER_REPOSITORY_TOKEN],
    },
  ],
})
export class OrganizationModule {}
