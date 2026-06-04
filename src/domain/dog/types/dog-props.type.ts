import { Breed } from '../../breed/breed';
import { DateBirthValueObject } from '../value-objects/date-birth.value-object';
import { SexValueObject } from '../value-objects/sex.value-object';

export type DogProps = {
  name: string;
  sex: SexValueObject;
  dateBirth: DateBirthValueObject;
  breed: Breed;
};
