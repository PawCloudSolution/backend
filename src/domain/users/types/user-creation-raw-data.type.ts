export type UserCreationRawData = {
  name: string;
  surname: string;
  email: string;
  username: string;
  hashedPassword: string;
  phoneNumber: string | null;
  role: 'member' | 'employee' | 'roleManager';
};
