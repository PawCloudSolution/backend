import { IOrganizationRepository } from '../../../application/organization/ports/organization.repository.interface';
import { Organization } from '../../../domain/organization/organization';
import { AppDataSource } from '../data-source';
import { OrganizationEntity } from '../entities/organization.entity';

export class TypeOrmOrganizationRepository implements IOrganizationRepository {
  private repository = AppDataSource.getRepository(OrganizationEntity);

  async save(organization: Organization): Promise<void> {
    const entity = this.repository.create({
      id: organization.getId(),
      name: organization.getName(),
      type: organization.getType(),
      countryCode: organization.getCountry(),
      taxNumber: organization.getTaxNumber(),
      registrationNumber: organization.getRegistrationNumber(),
      parentOrganizationId: organization.getParentOrganizationId(),
    });
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<Organization | null> {
    const raw = await this.repository.findOneBy({ id });
    if (!raw) return null;
    throw new Error('Organization.restore() not implemented in Domain yet');
  }
}
