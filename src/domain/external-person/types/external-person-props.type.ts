import { ExternalPersonNameValueObject } from '../value-objects/external-person-name.value-object';
import { ExternalPersonSurnameValueObject } from '../value-objects/external-person-surname.value-object';

export type ExternalPersonProps = {
  name: ExternalPersonNameValueObject;
  surname: ExternalPersonSurnameValueObject;
  phoneNumber: string | null;
  type: 'breeder' | 'previousOwner' | 'seller';
};
