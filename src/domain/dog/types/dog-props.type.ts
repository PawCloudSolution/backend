import { Breed } from '../../breed/breed';
import { DateBirthValueObject } from '../value-objects/date-birth.value-object';
import { SexValueObject } from '../value-objects/sex.value-object';
import { DogIdValueObject } from '../value-objects/dog-id.value-object';
import { UserIdValueObject } from '../../user/value-objects/user-id.value-object';
import { OrganizationIdValueObject } from '../../organization/value-objects/organization-id.value-object';

export interface DogProps {
  id: DogIdValueObject;
  ownerId: UserIdValueObject;
  breederId: UserIdValueObject;
  organizationId: OrganizationIdValueObject;
  name: string;
  sex: SexValueObject;
  dateBirth: DateBirthValueObject;
  breed: Breed;
};
