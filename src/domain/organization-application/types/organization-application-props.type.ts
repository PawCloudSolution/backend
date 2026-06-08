import { OrganizationApplicationIdValueObject } from '../value-objects/organization-application-id.value-object';
import { ApplicationStatusValueObject } from '../value-objects/application-status.value-object';
import { DocumentLinksValueObject } from '../value-objects/document-links.value-object';
import { OrganizationNameValueObject } from '../../organization/value-objects/organization-name.value-object';
import { CountryCodeValueObject } from '../../shared/value-objects/country-code.value-object';
import { TaxNumberValueObject } from '../../organization/value-objects/tax-number.value-object';
import { RegistrationNumberValueObject } from '../../organization/value-objects/registration-number.value-object';
import { NameValueObject } from '../../user/value-objects/name.value-object';
import { SurnameValueObject } from '../../user/value-objects/surname.value-object';
import { EmailValueObject } from '../../user/value-objects/email.value-object';
import { PhoneNumberValueObject } from '../../user/value-objects/phone-number.value-object';
import { PasswordHashValueObject } from '../../user/value-objects/password-hash.value-object';

export type OrganizationApplicationProps = {
  id: OrganizationApplicationIdValueObject;
  status: ApplicationStatusValueObject;
  documents: DocumentLinksValueObject;
  organizationName: OrganizationNameValueObject;
  countryCode: CountryCodeValueObject;
  taxNumber: TaxNumberValueObject;
  registrationNumber: RegistrationNumberValueObject;
  presidentName: NameValueObject;
  presidentSurname: SurnameValueObject;
  presidentEmail: EmailValueObject;
  presidentPhone: PhoneNumberValueObject;
  presidentPasswordHash: PasswordHashValueObject;
  applicationType: 'international' | 'headquarter';
  internationalId: string | null;
};
