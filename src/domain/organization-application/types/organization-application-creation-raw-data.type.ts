export type OrganizationApplicationCreationRawData = {
  documents: string[];
  organizationName: string;
  countryCode: string;
  taxNumber: string;
  registrationNumber: string;
  presidentName: string;
  presidentSurname: string;
  presidentEmail: string;
  presidentPhone: string;
  presidentPasswordHash: string;
  applicationType: 'international' | 'headquarter';
  internationalId?: string | null;
};
