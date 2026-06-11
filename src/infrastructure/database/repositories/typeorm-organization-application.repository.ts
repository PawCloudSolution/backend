import { IOrganizationApplicationRepository } from '../../../application/onboarding/ports/organization-application.repository.interface';
import { OrganizationApplication } from '../../../domain/organization-application/organization-application';
import { AppDataSource } from '../data-source';
import { OrganizationApplicationEntity } from '../entities/organization-application.entity';

export class TypeOrmOrganizationApplicationRepository implements IOrganizationApplicationRepository {
  private repository = AppDataSource.getRepository(OrganizationApplicationEntity);

  async save(application: OrganizationApplication): Promise<void> {
    const entity = this.repository.create({
      id: application.getId(),
      status: application.getStatus(),
      applicationType: application.getApplicationType(),
      internationalId: application.getInternationalId(),
      documents: application.getDocuments(),
      organizationName: application.getOrganizationName(),
      countryCode: application.getCountryCode(),
      taxNumber: application.getTaxNumber(),
      registrationNumber: application.getRegistrationNumber(),
      presidentName: application.getPresidentName(),
      presidentSurname: application.getPresidentSurname(),
      presidentEmail: application.getPresidentEmail(),
      presidentPhone: application.getPresidentPhone(),
      presidentPasswordHash: application.getPresidentPasswordHash(),
    });
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<OrganizationApplication | null> {
    const raw = await this.repository.findOneBy({ id });
    if (!raw) return null;
    return OrganizationApplication.restore(raw);
  }

  async findPending(type?: string): Promise<OrganizationApplication[]> {
    const query: any = { status: 'pending' };
    if (type) {
      query.applicationType = type;
    }
    const rawList = await this.repository.find({ where: query });
    return rawList.map(raw => OrganizationApplication.restore(raw));
  }
}
