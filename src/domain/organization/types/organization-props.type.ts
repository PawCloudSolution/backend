import { OrganizationIdValueObject } from '../value-objects/organization-id.value-object';
import { OrganizationNameValueObject } from '../value-objects/organization-name.value-object';
import { OrganizationTypeValueObject } from '../value-objects/organization-type.value-object';
import { TaxNumberValueObject } from '../value-objects/tax-number.value-object';
import { RegistrationNumberValueObject } from '../value-objects/registration-number.value-object';
import { CountryCodeValueObject } from '../../shared/value-objects/country-code.value-object';

export type OrganizationProps = {
  id: OrganizationIdValueObject;
  parentOrganizationId: OrganizationIdValueObject | null;
  name: OrganizationNameValueObject;
  type: OrganizationTypeValueObject;
  country: CountryCodeValueObject;
  taxNumber: TaxNumberValueObject | null;
  registrationNumber: RegistrationNumberValueObject | null;
};
