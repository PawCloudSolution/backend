import { Organization } from '../../../domain/organization/organization';
import { User } from '../../../domain/user/user';
import { IOrganizationRepository } from '../ports/organization.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';
import { IPasswordHasher } from '../../auth/ports/password-hasher.interface';

export interface CreateBranchDto {
  name: string;
  countryCode: string;
  taxNumber?: string;
  registrationNumber?: string;
  parentOrganizationId: string;
  requesterId: string;
  presidentName: string;
  presidentSurname: string;
  presidentEmail: string;
  presidentPhone?: string;
  presidentPasswordPlain: string;
}

export class CreateBranchUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  public async execute(dto: CreateBranchDto): Promise<Organization> {
    const requester = await this.userRepository.findById(dto.requesterId);
    if (!requester) {
      throw new Error('Requester not found');
    }

    if (!requester.isNationalPresident() && !requester.isSuperAdmin()) {
      throw new Error('Only national presidents and super admins can create branches');
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

    const hashedPassword = await this.passwordHasher.hash(dto.presidentPasswordPlain);

    const president = User.register({
      organizationId: branch.getId(),
      name: dto.presidentName,
      surname: dto.presidentSurname,
      email: dto.presidentEmail,
      username: dto.presidentEmail,
      role: 'branchPresident',
      countryCode: dto.countryCode,
      phoneNumber: dto.presidentPhone || null,
      hashedPassword: hashedPassword,
      status: 'active'
    });

    await this.organizationRepository.save(branch);
    await this.userRepository.save(president);
    
    return branch;
  }
}
