import { Dog } from '../../../domain/dog/dog';

export interface IDogRepository {
  save(dog: Dog): Promise<void>;
  findById(id: string): Promise<Dog | null>;
  findByOwnerId(ownerId: string): Promise<Dog[]>;
  findByOrganizationId(organizationId: string): Promise<Dog[]>;
}
