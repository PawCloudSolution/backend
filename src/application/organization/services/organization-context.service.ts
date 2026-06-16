import { IUserRepository } from '../../auth/ports/user.repository.interface';
import { IOrganizationRepository } from '../ports/organization.repository.interface';

export class OrganizationContextService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  public async getInternationalIdForUser(userId: string): Promise<string | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let internationalId: string | null = null;
    let orgId = user.getOrganizationId();
    
    if (orgId) {
      let currentOrg = await this.organizationRepository.findById(orgId);
      while (currentOrg) {
        if (currentOrg.getType() === 'international') {
          internationalId = currentOrg.getId();
          break;
        }
        const parentId = currentOrg.getParentOrganizationId();
        if (!parentId) break;
        currentOrg = await this.organizationRepository.findById(parentId);
      }
    }

    if (!internationalId) {
      if (user.isSuperAdmin()) {
        return null;
      }
      throw new Error('Cannot determine international organization context for user');
    }

    return internationalId;
  }
}
