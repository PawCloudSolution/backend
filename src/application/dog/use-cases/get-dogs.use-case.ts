import { Dog } from '../../../domain/dog/dog';
import { IDogRepository } from '../ports/dog.repository.interface';

export class GetDogsUseCase {
  constructor(private readonly dogRepository: IDogRepository) {}

  public async executeByOwnerId(ownerId: string): Promise<Dog[]> {
    return this.dogRepository.findByOwnerId(ownerId);
  }

  public async executeByOrganizationId(organizationId: string): Promise<Dog[]> {
    return this.dogRepository.findByOrganizationId(organizationId);
  }
}
