import { NameValueObject } from './value-objects/name.value-object';
import { SurnameValueObject } from './value-objects/surname.value-object';
import { EmailValueObject } from './value-objects/email.value-object';
import { UsernameValueObject } from './value-objects/username.value-object';
import { UserIdValueObject } from './value-objects/user-id.value-object';
import { UserRoleValueObject } from './value-objects/user-role.value-object';
import { PasswordHashValueObject } from './value-objects/password-hash.value-object';
import { PhoneNumberValueObject } from './value-objects/phone-number.value-object';
import { CountryCodeValueObject } from '../shared/value-objects/country-code.value-object';
import { OrganizationIdValueObject } from '../organization/value-objects/organization-id.value-object';
import { UserStatusValueObject } from './value-objects/user-status.value-object';
export class User {
    constructor(props) {
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
    static register(raw) {
        const countryCodeVO = CountryCodeValueObject.create(raw.countryCode);
        const roleVO = UserRoleValueObject.create(raw.role);
        let orgId = null;
        if (raw.organizationId) {
            orgId = OrganizationIdValueObject.create(raw.organizationId);
        }
        else if (!roleVO.isSuperAdmin()) {
            throw new Error('Organization ID is required for non-superAdmin users');
        }
        const props = {
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
    static restore(raw) {
        const countryCodeVO = CountryCodeValueObject.create(raw.countryCode);
        const roleVO = UserRoleValueObject.create(raw.role);
        let orgId = null;
        if (raw.organizationId) {
            orgId = OrganizationIdValueObject.create(raw.organizationId);
        }
        const props = {
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
    getId() {
        return this.id.toString();
    }
    getOrganizationId() {
        return this.organizationId ? this.organizationId.toString() : null;
    }
    getStatus() {
        return this.status.toString();
    }
    getName() {
        return this.name.toString();
    }
    getSurname() {
        return this.surname.toString();
    }
    getEmail() {
        return this.email.toString();
    }
    getUsername() {
        return this.username.toString();
    }
    getCountryCode() {
        return this.countryCode.toString();
    }
    getPhoneNumber() {
        return this.phoneNumber.toString();
    }
    getRole() {
        return this.role;
    }
    getHashedPassword() {
        return this.hashedPassword.toString();
    }
    isAnyPresident() {
        return this.role.isAnyPresident();
    }
    isInternationalPresident() {
        return this.role.isInternationalPresident();
    }
    isNationalPresident() {
        return this.role.isNationalPresident();
    }
    isBranchPresident() {
        return this.role.isBranchPresident();
    }
    isSuperAdmin() {
        return this.role.isSuperAdmin();
    }
    isEmployee() {
        return this.role.isEmployee();
    }
    isMember() {
        return this.role.isMember();
    }
    changeRoleBy(actor, newRole) {
        if (!actor.isAnyPresident() && !actor.isSuperAdmin()) {
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
    approve(actor) {
        if (!actor.isAnyPresident() && !actor.isSuperAdmin()) {
            throw new Error('Only a roleManager or superAdmin can approve users');
        }
        // Additional logic: a roleManager should only approve users in their own org
        // but for simplicity we assume the Application Layer checks permissions.
        this.status = UserStatusValueObject.create('active');
    }
    suspend(actor) {
        if (!actor.isAnyPresident() && !actor.isSuperAdmin()) {
            throw new Error('Only a roleManager or superAdmin can suspend users');
        }
        this.status = UserStatusValueObject.create('suspended');
    }
    updateName(newName) {
        this.name = NameValueObject.create(newName);
    }
    updateSurname(newSurname) {
        this.surname = SurnameValueObject.create(newSurname);
    }
    updateEmail(newEmail) {
        this.email = EmailValueObject.create(newEmail);
    }
    updateUsername(newUsername) {
        this.username = UsernameValueObject.create(newUsername);
    }
    updatePhoneNumber(newPhoneNumber, newCountryCode) {
        this.countryCode = CountryCodeValueObject.create(newCountryCode);
        this.phoneNumber = PhoneNumberValueObject.create(newPhoneNumber, this.countryCode);
    }
    updateHashedPassword(newHashedPassword) {
        this.hashedPassword = PasswordHashValueObject.create(newHashedPassword);
    }
    equals(other) {
        return this.id.equals(other.id);
    }
}
