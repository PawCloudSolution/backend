import { Breed } from '../../../domain/breed/breed';

export interface IBreedRepository {
  save(breed: Breed): Promise<void>;
  findById(id: string): Promise<Breed | null>;
  findAll(): Promise<Breed[]>;
}
