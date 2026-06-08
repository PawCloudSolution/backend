import { Breed } from '../../../domain/breed/breed';
import { IBreedRepository } from '../ports/breed.repository.interface';

export class GetBreedsUseCase {
  constructor(private readonly breedRepository: IBreedRepository) {}

  public async execute(): Promise<Breed[]> {
    return this.breedRepository.findAll();
  }
}
