import { Breed } from '../../../domain/breed/breed';
import { IBreedRepository } from '../ports/breed.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';
import { IOrganizationRepository } from '../../organization/ports/organization.repository.interface';

export interface CreateBreedDto {
  names: { [languageCode: string]: string };
  requesterId: string;
}

export class CreateBreedUseCase {
  constructor(
    private readonly breedRepository: IBreedRepository,
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  public async execute(dto: CreateBreedDto): Promise<Breed> {
    const requester = await this.userRepository.findById(dto.requesterId);
    if (!requester) {
      throw new Error('Requester not found');
    }

    // Only superAdmin or International President can create directly
    if (!requester.isSuperAdmin()) {
      if (!requester.isInternationalPresident()) {
        throw new Error('Only international presidents and super admins can create breeds directly');
      }
      const orgId = requester.getOrganizationId();
      if (!orgId) {
        throw new Error('Requester has no organization');
      }
      const org = await this.organizationRepository.findById(orgId);
      if (!org || org.getType() !== 'international') {
        throw new Error('Only superAdmin or International President can create breeds');
      }
    }

    let internationalId: string | null = null;
    let orgId = requester.getOrganizationId();
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
      throw new Error('Cannot determine international organization context');
    }

    const breed = Breed.create(dto.names, internationalId);
    await this.breedRepository.save(breed);
    
    return breed;
  }
}
