import { OrganizationProps } from './types/organization-props.type';
import { OrganizationCreationRawData } from './types/organization-creation.type';
import { OrganizationIdValueObject } from './value-objects/organization-id.value-object';
import { OrganizationNameValueObject } from './value-objects/organization-name.value-object';
import { OrganizationTypeValueObject } from './value-objects/organization-type.value-object';
import { TaxNumberValueObject } from './value-objects/tax-number.value-object';
import { RegistrationNumberValueObject } from './value-objects/registration-number.value-object';
import { CountryCodeValueObject } from '../shared/value-objects/country-code.value-object';

export class Organization {
  private props: OrganizationProps;

  private constructor(props: OrganizationProps) {
    this.props = props;
  }

  public static create(raw: OrganizationCreationRawData): Organization {
    const country = CountryCodeValueObject.create(raw.countryCode);
    const type = OrganizationTypeValueObject.create(raw.type);
    
    let parentOrganizationId: OrganizationIdValueObject | null = null;
    if (raw.parentOrganizationId) {
      if (type.isHeadquarter()) {
        throw new Error('A headquarter cannot have a parent organization');
      }
      parentOrganizationId = OrganizationIdValueObject.create(raw.parentOrganizationId);
    } else if (!type.isHeadquarter()) {
      throw new Error(`An organization of type ${raw.type} must have a parent organization`);
    }

    const taxNumber = raw.taxNumber ? TaxNumberValueObject.create(raw.taxNumber, country) : null;
    const registrationNumber = raw.registrationNumber ? RegistrationNumberValueObject.create(raw.registrationNumber, country) : null;

    return new Organization({
      id: OrganizationIdValueObject.generate(),
      parentOrganizationId,
      name: OrganizationNameValueObject.create(raw.name),
      type,
      country,
      taxNumber,
      registrationNumber
    });
  }

  public getId(): string {
    return this.props.id.toString();
  }

  public getParentOrganizationId(): string | null {
    return this.props.parentOrganizationId ? this.props.parentOrganizationId.toString() : null;
  }

  public getName(): string {
    return this.props.name.toString();
  }

  public getType(): string {
    return this.props.type.toString();
  }

  public getCountry(): string {
    return this.props.country.toString();
  }

  public getTaxNumber(): string | null {
    return this.props.taxNumber ? this.props.taxNumber.toString() : null;
  }

  public getRegistrationNumber(): string | null {
    return this.props.registrationNumber ? this.props.registrationNumber.toString() : null;
  }
}
