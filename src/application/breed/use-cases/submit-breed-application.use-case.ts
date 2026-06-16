import { BreedApplication } from '../../../domain/breed/breed-application';
import { IBreedApplicationRepository } from '../ports/breed-application.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';
import { IOrganizationRepository } from '../../organization/ports/organization.repository.interface';
import { OrganizationContextService } from '../../organization/services/organization-context.service';

export interface SubmitBreedApplicationDto {
  names: { [languageCode: string]: string };
  requesterId: string;
}

export class SubmitBreedApplicationUseCase {
  constructor(
    private readonly breedApplicationRepository: IBreedApplicationRepository,
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository,
    private readonly organizationContextService: OrganizationContextService
  ) {}

  public async execute(dto: SubmitBreedApplicationDto): Promise<BreedApplication> {
    const requester = await this.userRepository.findById(dto.requesterId);
    if (!requester) {
      throw new Error('Requester not found');
    }

    if (!requester.isAnyPresident() && !requester.isEmployee()) {
      throw new Error('Only presidents or employees can submit breed applications');
    }

    if (!requester.getOrganizationId()) {
      throw new Error('User does not belong to any organization');
    }

    const internationalId = await this.organizationContextService.getInternationalIdForUser(dto.requesterId);
    if (!internationalId) {
      throw new Error('Cannot determine international organization context for breed application');
    }

    const application = BreedApplication.create({
      names: dto.names,
      requesterId: dto.requesterId,
      internationalId
    });

    await this.breedApplicationRepository.save(application);

    return application;
  }
}
