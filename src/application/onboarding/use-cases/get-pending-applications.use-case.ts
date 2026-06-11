import { Injectable, Inject } from '@nestjs/common';
import { IOrganizationApplicationRepository } from '../ports/organization-application.repository.interface';
import { ORGANIZATION_APPLICATION_REPOSITORY_TOKEN } from '../../../presentation/http/modules/database.module';

@Injectable()
export class GetPendingApplicationsUseCase {
  constructor(
    @Inject(ORGANIZATION_APPLICATION_REPOSITORY_TOKEN)
    private readonly orgAppRepository: IOrganizationApplicationRepository
  ) {}

  public async execute(type?: string) {
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
}
