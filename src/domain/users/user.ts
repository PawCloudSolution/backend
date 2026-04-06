import { UserProps } from './types/user-props.type';
import { UserCreationRawData } from './types/user-creation-raw-data.type';
import { NameValueObject } from './value-objects/name.value-object';
import { SurnameValueObject } from './value-objects/surname.value-object';
import { EmailValueObject } from './value-objects/email.value-object';
import { UsernameValueObject } from './value-objects/username.value-object';
import { UserIdValueObject } from './value-objects/user-id.value-object';
import { UserRoleValueObject } from './value-objects/user-role.value-object';
import { UserRestoreRawData } from './types/user-restore-raw-data.type';

export class User {
  private id: UserIdValueObject;
  private name: NameValueObject;
  private surname: SurnameValueObject;
  private email: EmailValueObject;
  private username: UsernameValueObject;
  private role: UserRoleValueObject;
  private hashedPassword: string;
  private phoneNumber: string | null;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.surname = props.surname;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.username = props.username;
    this.hashedPassword = props.hashedPassword;
    this.role = props.role;
  }

  public static register(raw: UserCreationRawData): User {
    const props: UserProps = {
      id: UserIdValueObject.generate(),
      name: NameValueObject.create(raw.name),
      surname: SurnameValueObject.create(raw.surname),
      email: EmailValueObject.create(raw.email),
      phoneNumber: raw.phoneNumber,
      username: UsernameValueObject.create(raw.username),
      hashedPassword: raw.hashedPassword,
      role: UserRoleValueObject.create(raw.role),
    };

    return new User(props);
  }

  public static restore(raw: UserRestoreRawData): User {
    const props: UserProps = {
      id: UserIdValueObject.create(raw.id),
      name: NameValueObject.create(raw.name),
      surname: SurnameValueObject.create(raw.surname),
      email: EmailValueObject.create(raw.email),
      phoneNumber: raw.phoneNumber,
      username: UsernameValueObject.create(raw.username),
      hashedPassword: raw.hashedPassword,
      role: UserRoleValueObject.create(raw.role),
    };

    return new User(props);
  }

  public getId(): UserIdValueObject {
    return this.id;
  }

  public getName(): string {
    return this.name.toString();
  }

  public getSurname(): string {
    return this.surname.toString();
  }

  public getEmail(): string {
    return this.email.toString();
  }

  public getUsername(): string {
    return this.username.toString();
  }

  public getPhoneNumber(): string | null {
    return this.phoneNumber;
  }

  public getRole(): UserRoleValueObject {
    return this.role;
  }

  public getHashedPassword(): string {
    return this.hashedPassword;
  }

  public isRoleManager(): boolean {
    return this.role.isRoleManager();
  }

  public isEmployee(): boolean {
    return this.role.isEmployee();
  }

  public isMember(): boolean {
    return this.role.isMember();
  }

  public changeRoleOf(target: User, newRole: UserRoleValueObject): void {
    if (!this.isRoleManager()) {
      throw new Error('Only a roleManager can change roles');
    }

    target.role = newRole;
  }

  public updateName(newName: string): void {
    this.name = NameValueObject.create(newName);
  }

  public updateSurname(newSurname: string): void {
    this.surname = SurnameValueObject.create(newSurname);
  }

  public updateEmail(newEmail: string): void {
    this.email = EmailValueObject.create(newEmail);
  }

  public updateUsername(newUsername: string): void {
    this.username = UsernameValueObject.create(newUsername);
  }

  public updatePhoneNumber(newPhoneNumber: string | null): void {
    this.phoneNumber = newPhoneNumber;
  }

  public updateHashedPassword(newHashedPassword: string): void {
    this.hashedPassword = newHashedPassword;
  }

  public equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}