import { Organization } from '../../../domain/organization/organization';
import { IOrganizationRepository } from '../ports/organization.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';

export interface CreateBranchDto {
  name: string;
  countryCode: string;
  taxNumber?: string;
  registrationNumber?: string;
  parentOrganizationId: string;
  requesterId: string;
}

export class CreateBranchUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(dto: CreateBranchDto): Promise<Organization> {
    const requester = await this.userRepository.findById(dto.requesterId);
    if (!requester) {
      throw new Error('Requester not found');
    }

    if (!requester.isRoleManager() && !requester.isSuperAdmin()) {
      throw new Error('Only role managers and super admins can create branches');
    }

    const parentOrg = await this.organizationRepository.findById(dto.parentOrganizationId);
    if (!parentOrg) {
      throw new Error('Parent organization not found');
    }

    if (requester.getOrganizationId() !== parentOrg.getId() && !requester.isSuperAdmin()) {
      throw new Error('Requester does not belong to the parent organization');
    }

    const branch = Organization.create({
      name: dto.name,
      countryCode: dto.countryCode,
      taxNumber: dto.taxNumber,
      registrationNumber: dto.registrationNumber,
      type: 'club',
      parentOrganizationId: dto.parentOrganizationId
    });

    await this.organizationRepository.save(branch);
    return branch;
  }
}
