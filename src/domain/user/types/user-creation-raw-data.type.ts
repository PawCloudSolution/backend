export type UserCreationRawData = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string | null;
  countryCode: string;
  username: string;
  hashedPassword: string;
  role: string;
  organizationId: string;
};