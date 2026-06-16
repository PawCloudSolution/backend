import { Breed } from '../../../domain/breed/breed';
import { IBreedRepository } from '../ports/breed.repository.interface';
import { OrganizationContextService } from '../../organization/services/organization-context.service';

export class GetBreedsUseCase {
  constructor(
    private readonly breedRepository: IBreedRepository,
    private readonly organizationContextService: OrganizationContextService
  ) {}

  public async execute(requesterId: string): Promise<Breed[]> {
    const internationalId = await this.organizationContextService.getInternationalIdForUser(requesterId);
    if (!internationalId) {
      return this.breedRepository.findAll();
    }
    return this.breedRepository.findAllByInternationalId(internationalId);
  }
}
