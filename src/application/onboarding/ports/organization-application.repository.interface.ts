import { OrganizationApplication } from '../../../domain/organization-application/organization-application';

export interface IOrganizationApplicationRepository {
  save(application: OrganizationApplication): Promise<void>;
  findById(id: string): Promise<OrganizationApplication | null>;
}
