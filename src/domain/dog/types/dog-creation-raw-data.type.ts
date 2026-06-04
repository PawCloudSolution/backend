import { Breed } from '../../breed/breed';

export type DogCreationRawData = {
  name: string;
  sex: string;
  dateBirth: string;
  breed: Breed;
};
