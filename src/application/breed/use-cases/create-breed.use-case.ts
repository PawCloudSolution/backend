import { Breed } from '../../../domain/breed/breed';
import { IBreedRepository } from '../ports/breed.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';
import { IOrganizationRepository } from '../../organization/ports/organization.repository.interface';
import { OrganizationContextService } from '../../organization/services/organization-context.service';

export interface CreateBreedDto {
  names: { [languageCode: string]: string };
  requesterId: string;
}

export class CreateBreedUseCase {
  constructor(
    private readonly breedRepository: IBreedRepository,
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository,
    private readonly organizationContextService: OrganizationContextService
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

    const internationalId = await this.organizationContextService.getInternationalIdForUser(dto.requesterId);
    if (!internationalId) {
      throw new Error('Cannot determine international organization context for breed creation');
    }

    const breed = Breed.create(dto.names, internationalId);
    await this.breedRepository.save(breed);
    
    return breed;
  }
}
