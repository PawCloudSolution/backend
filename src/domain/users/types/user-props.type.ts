import { NameValueObject } from '../value-objects/name.value-object';
import { SurnameValueObject } from '../value-objects/surname.value-object';
import { EmailValueObject } from '../value-objects/email.value-object';
import { UsernameValueObject } from '../value-objects/username.value-object';

export type UserProps = {
  name: NameValueObject;
  surname: SurnameValueObject;
  email: EmailValueObject;
  username: UsernameValueObject;
  hashedPassword: string;
  phoneNumber: string | null;
  role: 'member' | 'employee' | 'roleManager';
};
