import { SexValueObject } from './value-objects/sex.value-object';
import { DateBirthValueObject } from './value-objects/date-birth.value-object';
import { BreedModel } from '../breed/breed.model';

export class Dog {
  private name: string;
  private sex: SexValueObject;
  private dateBirth: DateBirthValueObject;
  private breed: BreedModel;
}
