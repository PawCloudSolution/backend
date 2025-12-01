import { UserProps } from './types/user-props.type';
import { NameValueObject } from './value-objects/name.value-object';
import { SurnameValueObject } from './value-objects/surname.value-object';
import { EmailValueObject } from './value-objects/email.value-object';
import { UsernameValueObject } from './value-objects/username.value-object';
import { UserCreationRawData } from './types/user-creation-raw-data.type';

export class UserModel {
  private name: NameValueObject;
  private surname: SurnameValueObject;
  private email: EmailValueObject;
  private phoneNumber: string | null;
  private username: UsernameValueObject;
  private hashedPassword: string;
  private role: 'member' | 'employee' | 'roleManager';

  private constructor(props: UserProps) {
    this.name = props.name;
    this.surname = props.surname;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.username = props.username;
    this.hashedPassword = props.hashedPassword;
    this.role = props.role;
  }

  public static create(raw: UserCreationRawData) {
    const props: UserProps = {
      name: NameValueObject.create(raw.name),
      surname: SurnameValueObject.create(raw.surname),
      email: EmailValueObject.create(raw.email),
      username: UsernameValueObject.create(raw.username),
      hashedPassword: raw.hashedPassword,
      phoneNumber: raw.phoneNumber,
      role: raw.role,
    };

    return new UserModel(props);
  }

  public getName() {
    return this.name.toString();
  }

  public getSurname() {
    return this.surname.toString();
  }

  public getEmail() {
    return this.email.toString();
  }

  public getUsername() {
    return this.username.toString();
  }

  public getPhoneNumber() {
    return this.phoneNumber;
  }

  public getRole() {
    return this.role;
  }

  public getHashedPassword() {
    return this.hashedPassword;
  }

  public isRoleManager() {
    return this.role === 'roleManager';
  }

  public isEmployee() {
    return this.role === 'employee';
  }

  public isMember() {
    return this.role === 'member';
  }

  public changeRoleOf(target: UserModel, newRole: 'member' | 'employee' | 'roleManager') {
    if (!this.isRoleManager()) {
      throw new Error('Only a roleManager can change roles');
    }

    target.role = newRole;
  }

  public updateName(newName: string) {
    this.name = NameValueObject.create(newName);
  }

  public updateSurname(newSurname: string) {
    this.surname = SurnameValueObject.create(newSurname);
  }

  public updateEmail(newEmail: string) {
    this.email = EmailValueObject.create(newEmail);
  }

  public updateUsername(newUsername: string) {
    this.username = UsernameValueObject.create(newUsername);
  }

  public updatePhoneNumber(newPhoneNumber: string | null) {
    this.phoneNumber = newPhoneNumber;
  }

  public updateHashedPassword(newHashedPassword: string) {
    this.hashedPassword = newHashedPassword;
  }
}
