export type OrganizationCreationRawData = {
  parentOrganizationId?: string | null;
  name: string;
  type: string;
  countryCode: string;
  taxNumber?: string | null;
  registrationNumber?: string | null;
};
