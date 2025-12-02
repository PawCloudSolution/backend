export type BreedProps = {
  id: string; // UUIDv4
  names: { [languageCode: string]: string };
  createdAt: Date;
  updatedAt: Date;
};
