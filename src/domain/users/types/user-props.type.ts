import { NameValueObject } from '../value-objects/name.value-object';
import { SurnameValueObject } from '../value-objects/surname.value-object';
import { EmailValueObject } from '../value-objects/email.value-object';
import { UsernameValueObject } from '../value-objects/username.value-object';
import { UserIdValueObject } from '../value-objects/user-id.value-object';
import { UserRoleValueObject } from '../value-objects/user-role.value-object';
import { PhoneNumberValueObject } from '../value-objects/phone-number.value-object';
import { PasswordHashValueObject } from '../value-objects/password-hash.value-object';

export type UserProps = {
  id: UserIdValueObject;
  name: NameValueObject;
  surname: SurnameValueObject;
  email: EmailValueObject;
  phoneNumber: PhoneNumberValueObject;
  username: UsernameValueObject;
  hashedPassword: PasswordHashValueObject;
  role: UserRoleValueObject;
};