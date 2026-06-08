import { OrganizationApplicationProps } from './types/organization-application-props.type';
import { OrganizationApplicationCreationRawData } from './types/organization-application-creation-raw-data.type';
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
  private id: OrganizationApplicationIdValueObject;
  private status: ApplicationStatusValueObject;
  private documents: DocumentLinksValueObject;
  private organizationName: OrganizationNameValueObject;
  private countryCode: CountryCodeValueObject;
  private taxNumber: TaxNumberValueObject;
  private registrationNumber: RegistrationNumberValueObject;
  private presidentName: NameValueObject;
  private presidentSurname: SurnameValueObject;
  private presidentEmail: EmailValueObject;
  private presidentPhone: PhoneNumberValueObject;
  private presidentPasswordHash: PasswordHashValueObject;

  private constructor(props: OrganizationApplicationProps) {
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
  }

  public static submit(raw: OrganizationApplicationCreationRawData): OrganizationApplication {
    const countryCodeVO = CountryCodeValueObject.create(raw.countryCode);
    
    const props: OrganizationApplicationProps = {
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
    };

    return new OrganizationApplication(props);
  }

  public approve(): void {
    if (!this.status.isPending()) {
      throw new Error('Can only approve pending applications');
    }
    this.status = ApplicationStatusValueObject.create('approved');
  }

  public reject(): void {
    if (!this.status.isPending()) {
      throw new Error('Can only reject pending applications');
    }
    this.status = ApplicationStatusValueObject.create('rejected');
  }

  public isPending(): boolean {
    return this.status.isPending();
  }

  public getId(): string {
    return this.id.toString();
  }

  public getOrganizationName(): string {
    return this.organizationName.toString();
  }

  public getCountryCode(): string {
    return this.countryCode.toString();
  }

  public getTaxNumber(): string {
    return this.taxNumber.toString();
  }

  public getRegistrationNumber(): string {
    return this.registrationNumber.toString();
  }

  public getPresidentEmail(): string {
    return this.presidentEmail.toString();
  }

  public getPresidentName(): string {
    return this.presidentName.toString();
  }

  public getPresidentSurname(): string {
    return this.presidentSurname.toString();
  }

  public getPresidentPhone(): string | null {
    return this.presidentPhone.toString();
  }

  public getPresidentPasswordHash(): string {
    return this.presidentPasswordHash.toString();
  }
}
