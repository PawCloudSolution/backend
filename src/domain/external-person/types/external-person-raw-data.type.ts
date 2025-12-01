export type ExternalPersonRawData = {
  name: string;
  surname: string;
  phoneNumber: string | null;
  type: 'breeder' | 'previousOwner' | 'seller';
};
