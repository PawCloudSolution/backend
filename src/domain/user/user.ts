import { UserProps } from './types/user-props.type';
import { UserCreationRawData } from './types/user-creation-raw-data.type';
import { NameValueObject } from './value-objects/name.value-object';
import { SurnameValueObject } from './value-objects/surname.value-object';
import { EmailValueObject } from './value-objects/email.value-object';
import { UsernameValueObject } from './value-objects/username.value-object';
import { UserIdValueObject } from './value-objects/user-id.value-object';
import { UserRoleValueObject } from './value-objects/user-role.value-object';
import { UserRestoreRawData } from './types/user-restore-raw-data.type';
import { PasswordHashValueObject } from './value-objects/password-hash.value-object';
import { PhoneNumberValueObject } from './value-objects/phone-number.value-object';
import { CountryCodeValueObject } from '../shared/value-objects/country-code.value-object';
import { OrganizationIdValueObject } from '../organization/value-objects/organization-id.value-object';
import { UserStatusValueObject } from './value-objects/user-status.value-object';

export class User {
  private id: UserIdValueObject;
  private organizationId: OrganizationIdValueObject | null;
  private status: UserStatusValueObject;
  private name: NameValueObject;
  private surname: SurnameValueObject;
  private email: EmailValueObject;
  private username: UsernameValueObject;
  private role: UserRoleValueObject;
  private phoneNumber: PhoneNumberValueObject;
  private countryCode: CountryCodeValueObject;
  private hashedPassword: PasswordHashValueObject;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this.status = props.status;
    this.name = props.name;
    this.surname = props.surname;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.countryCode = props.countryCode;
    this.username = props.username;
    this.hashedPassword = props.hashedPassword;
    this.role = props.role;
  }

  public static register(raw: UserCreationRawData): User {
    const countryCodeVO = CountryCodeValueObject.create(raw.countryCode);
    const roleVO = UserRoleValueObject.create(raw.role);

    let orgId: OrganizationIdValueObject | null = null;
    if (raw.organizationId) {
      orgId = OrganizationIdValueObject.create(raw.organizationId);
    } else if (!roleVO.isSuperAdmin()) {
      throw new Error('Organization ID is required for non-superAdmin users');
    }

    const props: UserProps = {
      id: UserIdValueObject.generate(),
      organizationId: orgId,
      status: UserStatusValueObject.create(raw.status || 'active'),
      name: NameValueObject.create(raw.name),
      surname: SurnameValueObject.create(raw.surname),
      email: EmailValueObject.create(raw.email),
      username: UsernameValueObject.create(raw.username),
      role: roleVO,
      countryCode: countryCodeVO,
      phoneNumber: PhoneNumberValueObject.create(raw.phoneNumber, countryCodeVO),
      hashedPassword: PasswordHashValueObject.create(raw.hashedPassword),
    };

    return new User(props);
  }

  public static restore(raw: UserRestoreRawData): User {
    const countryCodeVO = CountryCodeValueObject.create(raw.countryCode);
    const roleVO = UserRoleValueObject.create(raw.role);

    let orgId: OrganizationIdValueObject | null = null;
    if (raw.organizationId) {
      orgId = OrganizationIdValueObject.create(raw.organizationId);
    }

    const props: UserProps = {
      id: UserIdValueObject.create(raw.id),
      organizationId: orgId,
      status: UserStatusValueObject.create(raw.status),
      name: NameValueObject.create(raw.name),
      surname: SurnameValueObject.create(raw.surname),
      email: EmailValueObject.create(raw.email),
      username: UsernameValueObject.create(raw.username),
      role: roleVO,
      countryCode: countryCodeVO,
      phoneNumber: PhoneNumberValueObject.create(raw.phoneNumber, countryCodeVO),
      hashedPassword: PasswordHashValueObject.create(raw.hashedPassword),
    };

    return new User(props);
  }

  public getId(): string {
    return this.id.toString();
  }

  public getOrganizationId(): string | null {
    return this.organizationId ? this.organizationId.toString() : null;
  }

  public getStatus(): string {
    return this.status.toString();
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
    return this.phoneNumber.toString();
  }

  public getRole(): UserRoleValueObject {
    return this.role;
  }

  public getHashedPassword(): string {
    return this.hashedPassword.toString();
  }

  public isRoleManager(): boolean {
    return this.role.isRoleManager();
  }

  public isSuperAdmin(): boolean {
    return this.role.isSuperAdmin();
  }

  public isEmployee(): boolean {
    return this.role.isEmployee();
  }

  public isMember(): boolean {
    return this.role.isMember();
  }

  public changeRoleBy(actor: User, newRole: UserRoleValueObject): void {
    if (!actor.isRoleManager() && !actor.isSuperAdmin()) {
      throw new Error('Only a roleManager or superAdmin can change roles');
    }

    if (this.equals(actor)) {
      throw new Error('User cannot change own role');
    }

    if (this.role.equals(newRole)) {
      throw new Error('User already has this role');
    }

    this.role = newRole;
  }

  public approve(actor: User): void {
    if (!actor.isRoleManager() && !actor.isSuperAdmin()) {
      throw new Error('Only a roleManager or superAdmin can approve users');
    }
    
    // Additional logic: a roleManager should only approve users in their own org
    // but for simplicity we assume the Application Layer checks permissions.

    this.status = UserStatusValueObject.create('active');
  }

  public suspend(actor: User): void {
    if (!actor.isRoleManager() && !actor.isSuperAdmin()) {
      throw new Error('Only a roleManager or superAdmin can suspend users');
    }
    this.status = UserStatusValueObject.create('suspended');
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

  public updatePhoneNumber(newPhoneNumber: string | null, newCountryCode: string): void {
    this.countryCode = CountryCodeValueObject.create(newCountryCode);
    this.phoneNumber = PhoneNumberValueObject.create(newPhoneNumber, this.countryCode);
  }

  public updateHashedPassword(newHashedPassword: string): void {
    this.hashedPassword = PasswordHashValueObject.create(newHashedPassword);
  }

  public equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}