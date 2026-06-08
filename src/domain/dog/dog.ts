import { DogProps } from './types/dog-props.type';
import { DogCreationRawData } from './types/dog-creation-raw-data.type';
import { DogRestoreRawData } from './types/dog-restore-raw-data.type';
import { SexValueObject } from './value-objects/sex.value-object';
import { DateBirthValueObject } from './value-objects/date-birth.value-object';
import { DogIdValueObject } from './value-objects/dog-id.value-object';
import { UserIdValueObject } from '../user/value-objects/user-id.value-object';
import { OrganizationIdValueObject } from '../organization/value-objects/organization-id.value-object';
import { Breed } from '../breed/breed';

export class Dog {
  private id: DogIdValueObject;
  private ownerId: UserIdValueObject;
  private breederId: UserIdValueObject;
  private organizationId: OrganizationIdValueObject;
  private name: string;
  private sex: SexValueObject;
  private dateBirth: DateBirthValueObject;
  private breed: Breed;

  private constructor(props: DogProps) {
    this.id = props.id;
    this.ownerId = props.ownerId;
    this.breederId = props.breederId;
    this.organizationId = props.organizationId;
    this.name = props.name;
    this.sex = props.sex;
    this.dateBirth = props.dateBirth;
    this.breed = props.breed;
  }

  public static create(raw: DogCreationRawData): Dog {
    const props: DogProps = {
      id: DogIdValueObject.generate(),
      ownerId: UserIdValueObject.create(raw.ownerId),
      breederId: UserIdValueObject.create(raw.breederId),
      organizationId: OrganizationIdValueObject.create(raw.organizationId),
      name: raw.name,
      sex: SexValueObject.create(raw.sex),
      dateBirth: DateBirthValueObject.create(raw.dateBirth),
      breed: raw.breed,
    };

    return new Dog(props);
  }

  public static restore(raw: DogRestoreRawData): Dog {
    const props: DogProps = {
      id: DogIdValueObject.create(raw.id),
      ownerId: UserIdValueObject.create(raw.ownerId),
      breederId: UserIdValueObject.create(raw.breederId),
      organizationId: OrganizationIdValueObject.create(raw.organizationId),
      name: raw.name,
      sex: SexValueObject.create(raw.sex),
      dateBirth: DateBirthValueObject.create(raw.dateBirth),
      breed: raw.breed,
    };

    return new Dog(props);
  }

  public getId(): string {
    return this.id.toString();
  }

  public getOwnerId(): string {
    return this.ownerId.toString();
  }

  public getBreederId(): string {
    return this.breederId.toString();
  }

  public getOrganizationId(): string {
    return this.organizationId.toString();
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
