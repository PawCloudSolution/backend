import { Organization } from '../../../domain/organization/organization';

export interface IOrganizationRepository {
  save(organization: Organization): Promise<void>;
  findById(id: string): Promise<Organization | null>;
  findAll(): Promise<Organization[]>;
}
