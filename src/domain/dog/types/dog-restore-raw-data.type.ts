import { Breed } from '../../breed/breed';

export interface DogRestoreRawData {
  id: string;
  ownerId: string;
  breederId: string;
  organizationId: string;
  name: string;
  sex: string;
  dateBirth: string;
  breed: Breed;
}
