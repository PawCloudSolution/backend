import { BreedIdValueObject } from '../value-objects/breed-id.value-object';
import { BreedNameValueObject } from '../value-objects/breed-name.value-object';

export type BreedProps = {
  id: BreedIdValueObject;
  names: { [languageCode: string]: BreedNameValueObject };
  createdAt: Date;
  updatedAt: Date;
};
