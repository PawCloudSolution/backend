import { BreedApplication } from '../../../domain/breed/breed-application';

export interface IBreedApplicationRepository {
  save(application: BreedApplication): Promise<void>;
  findById(id: string): Promise<BreedApplication | null>;
  findPending(): Promise<BreedApplication[]>;
}
