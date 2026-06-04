export type UserRestoreRawData = {
  id: string;
  organizationId: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string | null;
  countryCode: string;
  username: string;
  hashedPassword: string;
  role: string;
};