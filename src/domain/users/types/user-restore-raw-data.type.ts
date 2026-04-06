export type UserRestoreRawData = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string | null;
  username: string;
  hashedPassword: string;
  role: string;
};