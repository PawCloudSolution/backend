import { NameValueObject } from '../value-objects/name.value-object';
import { SurnameValueObject } from '../value-objects/surname.value-object';
import { EmailValueObject } from '../value-objects/email.value-object';
import { UsernameValueObject } from '../value-objects/username.value-object';
import { UserIdValueObject } from '../value-objects/user-id.value-object';
import { UserRoleValueObject } from '../value-objects/user-role.value-object';
import { PhoneNumberValueObject } from '../value-objects/phone-number.value-object';
import { PasswordHashValueObject } from '../value-objects/password-hash.value-object';
import { CountryCodeValueObject } from '../../shared/value-objects/country-code.value-object';
import { OrganizationIdValueObject } from '../../organization/value-objects/organization-id.value-object';
import { UserStatusValueObject } from '../value-objects/user-status.value-object';

export type UserProps = {
  id: UserIdValueObject;
  organizationId: OrganizationIdValueObject | null;
  status: UserStatusValueObject;
  name: NameValueObject;
  surname: SurnameValueObject;
  email: EmailValueObject;
  phoneNumber: PhoneNumberValueObject;
  countryCode: CountryCodeValueObject;
  username: UsernameValueObject;
  hashedPassword: PasswordHashValueObject;
  role: UserRoleValueObject;
};