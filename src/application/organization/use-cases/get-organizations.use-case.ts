import { Organization } from '../../../domain/organization/organization';
import { IOrganizationRepository } from '../ports/organization.repository.interface';

export class GetOrganizationsUseCase {
  constructor(private readonly organizationRepository: IOrganizationRepository) {}

  public async execute(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }
}
