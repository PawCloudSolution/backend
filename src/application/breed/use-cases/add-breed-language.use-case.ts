import { IBreedRepository } from '../ports/breed.repository.interface';
import { OrganizationContextService } from '../../organization/services/organization-context.service';

export interface AddBreedLanguageDto {
  breedId: string;
  languageCode: string;
  name: string;
  requesterId: string;
}

export class AddBreedLanguageUseCase {
  constructor(
    private readonly breedRepository: IBreedRepository,
    private readonly organizationContextService: OrganizationContextService
  ) {}

  public async execute(dto: AddBreedLanguageDto): Promise<void> {
    const breed = await this.breedRepository.findById(dto.breedId);
    if (!breed) {
      throw new Error('Breed not found');
    }

    const internationalId = await this.organizationContextService.getInternationalIdForUser(dto.requesterId);
    
    // internationalId is null if user is a SuperAdmin.
    // If not null, ensure the user belongs to the same international organization as the breed.
    if (internationalId !== null && internationalId !== breed.getInternationalId()) {
      throw new Error('You do not have permission to modify this breed');
    }

    breed.addLanguage(dto.languageCode, dto.name);
    await this.breedRepository.save(breed);
  }
}
