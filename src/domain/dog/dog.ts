import { DogProps } from './types/dog-props.type';
import { DogCreationRawData } from './types/dog-creation-raw-data.type';
import { SexValueObject } from './value-objects/sex.value-object';
import { DateBirthValueObject } from './value-objects/date-birth.value-object';
import { Breed } from '../breed/breed';

export class Dog {
  private name: string;
  private sex: SexValueObject;
  private dateBirth: DateBirthValueObject;
  private breed: Breed;

  private constructor(props: DogProps) {
    this.name = props.name;
    this.sex = props.sex;
    this.dateBirth = props.dateBirth;
    this.breed = props.breed;
  }

  public static create(raw: DogCreationRawData): Dog {
    const props: DogProps = {
      name: raw.name,
      sex: SexValueObject.create(raw.sex),
      dateBirth: DateBirthValueObject.create(raw.dateBirth),
      breed: raw.breed,
    };

    return new Dog(props);
  }

  public getName() {
    return this.name;
  }

  public getSex() {
    return this.sex.toString();
  }

  public getDateBirth() {
    return this.dateBirth.toString();
  }

  public getBreed() {
    return this.breed;
  }
}
