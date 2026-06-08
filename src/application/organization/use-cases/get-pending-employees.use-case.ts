import { User } from '../../../domain/user/user';
import { IUserRepository } from '../../auth/ports/user.repository.interface';

export class GetPendingEmployeesUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(organizationId: string, requesterId: string): Promise<User[]> {
    const requester = await this.userRepository.findById(requesterId);
    if (!requester) {
      throw new Error('Requester not found');
    }

    if (!requester.isRoleManager() && !requester.isSuperAdmin()) {
      throw new Error('Not authorized to view pending employees');
    }

    if (requester.getOrganizationId() !== organizationId && !requester.isSuperAdmin()) {
      throw new Error('Requester does not belong to this organization');
    }

    return this.userRepository.findByOrganizationIdAndStatus(organizationId, 'pending_approval');
  }
}
