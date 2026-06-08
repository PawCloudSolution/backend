import { IOrganizationApplicationRepository } from '../ports/organization-application.repository.interface';
import { IOrganizationRepository } from '../../organization/ports/organization.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';
import { Organization } from '../../../domain/organization/organization';
import { User } from '../../../domain/user/user';

export class ApproveOrganizationApplicationUseCase {
  constructor(
    private readonly applicationRepository: IOrganizationApplicationRepository,
    private readonly organizationRepository: IOrganizationRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(applicationId: string, approver: User): Promise<void> {
    if (!approver.isSuperAdmin()) {
      throw new Error('Only superAdmin can approve organization applications');
    }

    const application = await this.applicationRepository.findById(applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    application.approve();

    const organization = Organization.create({
      name: application.getOrganizationName(),
      taxNumber: application.getTaxNumber(),
      registrationNumber: application.getRegistrationNumber(),
      countryCode: application.getCountryCode(),
      type: application.getApplicationType(),
      parentOrganizationId: application.getInternationalId()
    });

    const president = User.register({
      organizationId: organization.getId(),
      name: application.getPresidentName(),
      surname: application.getPresidentSurname(),
      email: application.getPresidentEmail(),
      username: application.getPresidentEmail(),
      role: 'roleManager',
      countryCode: application.getCountryCode(),
      phoneNumber: application.getPresidentPhone(),
      hashedPassword: application.getPresidentPasswordHash(),
      status: 'active'
    });

    await this.organizationRepository.save(organization);
    await this.userRepository.save(president);
    await this.applicationRepository.save(application);
  }
}
