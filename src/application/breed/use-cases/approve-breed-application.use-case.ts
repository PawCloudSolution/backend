import { Breed } from '../../../domain/breed/breed';
import { IBreedRepository } from '../ports/breed.repository.interface';
import { IBreedApplicationRepository } from '../ports/breed-application.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';
import { IOrganizationRepository } from '../../organization/ports/organization.repository.interface';

export class ApproveBreedApplicationUseCase {
  constructor(
    private readonly breedApplicationRepository: IBreedApplicationRepository,
    private readonly breedRepository: IBreedRepository,
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  public async execute(applicationId: string, approverId: string): Promise<Breed> {
    const approver = await this.userRepository.findById(approverId);
    if (!approver) {
      throw new Error('Approver not found');
    }

    // Check permissions
    if (!approver.isSuperAdmin()) {
      if (!approver.isRoleManager()) {
        throw new Error('Only superAdmin or HQ President can approve breed applications');
      }
      const orgId = approver.getOrganizationId();
      if (!orgId) {
        throw new Error('Approver has no organization');
      }
      const org = await this.organizationRepository.findById(orgId);
      if (!org || org.getType() !== 'headquarter') {
        throw new Error('Only superAdmin or HQ President can approve breed applications');
      }
    }

    const application = await this.breedApplicationRepository.findById(applicationId);
    if (!application) {
      throw new Error('Breed application not found');
    }

    application.approve();
    await this.breedApplicationRepository.save(application);

    // Create the actual breed
    const breed = Breed.create(application.getNames());
    await this.breedRepository.save(breed);

    return breed;
  }
}
