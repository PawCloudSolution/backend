import { OrganizationApplicationIdValueObject } from './value-objects/organization-application-id.value-object';
import { ApplicationStatusValueObject } from './value-objects/application-status.value-object';
import { DocumentLinksValueObject } from './value-objects/document-links.value-object';
import { OrganizationNameValueObject } from '../organization/value-objects/organization-name.value-object';
import { CountryCodeValueObject } from '../shared/value-objects/country-code.value-object';
import { TaxNumberValueObject } from '../organization/value-objects/tax-number.value-object';
import { RegistrationNumberValueObject } from '../organization/value-objects/registration-number.value-object';
import { NameValueObject } from '../user/value-objects/name.value-object';
import { SurnameValueObject } from '../user/value-objects/surname.value-object';
import { EmailValueObject } from '../user/value-objects/email.value-object';
import { PhoneNumberValueObject } from '../user/value-objects/phone-number.value-object';
import { PasswordHashValueObject } from '../user/value-objects/password-hash.value-object';
export class OrganizationApplication {
    constructor(props) {
        this.id = props.id;
        this.status = props.status;
        this.documents = props.documents;
        this.organizationName = props.organizationName;
        this.countryCode = props.countryCode;
        this.taxNumber = props.taxNumber;
        this.registrationNumber = props.registrationNumber;
        this.presidentName = props.presidentName;
        this.presidentSurname = props.presidentSurname;
        this.presidentEmail = props.presidentEmail;
        this.presidentPhone = props.presidentPhone;
        this.presidentPasswordHash = props.presidentPasswordHash;
        this.applicationType = props.applicationType;
        this.internationalId = props.internationalId;
    }
    static submit(raw) {
        const countryCodeVO = CountryCodeValueObject.create(raw.countryCode);
        const props = {
            id: OrganizationApplicationIdValueObject.generate(),
            status: ApplicationStatusValueObject.create('pending'),
            documents: DocumentLinksValueObject.create(raw.documents),
            organizationName: OrganizationNameValueObject.create(raw.organizationName),
            countryCode: countryCodeVO,
            taxNumber: TaxNumberValueObject.create(raw.taxNumber, countryCodeVO),
            registrationNumber: RegistrationNumberValueObject.create(raw.registrationNumber, countryCodeVO),
            presidentName: NameValueObject.create(raw.presidentName),
            presidentSurname: SurnameValueObject.create(raw.presidentSurname),
            presidentEmail: EmailValueObject.create(raw.presidentEmail),
            presidentPhone: PhoneNumberValueObject.create(raw.presidentPhone, countryCodeVO),
            presidentPasswordHash: PasswordHashValueObject.create(raw.presidentPasswordHash),
            applicationType: raw.applicationType,
            internationalId: raw.internationalId || null,
        };
        return new OrganizationApplication(props);
    }
    static restore(raw) {
        const countryCodeVO = CountryCodeValueObject.create(raw.countryCode);
        const props = {
            id: OrganizationApplicationIdValueObject.create(raw.id),
            status: ApplicationStatusValueObject.create(raw.status),
            documents: DocumentLinksValueObject.create(raw.documents),
            organizationName: OrganizationNameValueObject.create(raw.organizationName),
            countryCode: countryCodeVO,
            taxNumber: TaxNumberValueObject.create(raw.taxNumber, countryCodeVO),
            registrationNumber: RegistrationNumberValueObject.create(raw.registrationNumber, countryCodeVO),
            presidentName: NameValueObject.create(raw.presidentName),
            presidentSurname: SurnameValueObject.create(raw.presidentSurname),
            presidentEmail: EmailValueObject.create(raw.presidentEmail),
            presidentPhone: PhoneNumberValueObject.create(raw.presidentPhone, countryCodeVO),
            presidentPasswordHash: PasswordHashValueObject.create(raw.presidentPasswordHash),
            applicationType: raw.applicationType,
            internationalId: raw.internationalId || null,
        };
        return new OrganizationApplication(props);
    }
    approve() {
        if (!this.status.isPending()) {
            throw new Error('Can only approve pending applications');
        }
        this.status = ApplicationStatusValueObject.create('approved');
    }
    reject() {
        if (!this.status.isPending()) {
            throw new Error('Can only reject pending applications');
        }
        this.status = ApplicationStatusValueObject.create('rejected');
    }
    isPending() {
        return this.status.isPending();
    }
    getId() {
        return this.id.toString();
    }
    getOrganizationName() {
        return this.organizationName.toString();
    }
    getCountryCode() {
        return this.countryCode.toString();
    }
    getTaxNumber() {
        return this.taxNumber.toString();
    }
    getRegistrationNumber() {
        return this.registrationNumber.toString();
    }
    getPresidentEmail() {
        return this.presidentEmail.toString();
    }
    getPresidentName() {
        return this.presidentName.toString();
    }
    getPresidentSurname() {
        return this.presidentSurname.toString();
    }
    getPresidentPhone() {
        return this.presidentPhone.toString();
    }
    getPresidentPasswordHash() {
        return this.presidentPasswordHash.toString();
    }
    getDocuments() {
        return this.documents.getLinks();
    }
    getStatus() {
        return this.status.toString();
    }
    getApplicationType() {
        return this.applicationType;
    }
    getInternationalId() {
        return this.internationalId;
    }
}
