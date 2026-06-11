export class GetPendingEmployeesUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(organizationId, requesterId) {
        const requester = await this.userRepository.findById(requesterId);
        if (!requester) {
            throw new Error('Requester not found');
        }
        if (!requester.isAnyPresident() && !requester.isSuperAdmin()) {
            throw new Error('Only presidents or super admins can view pending employees');
        }
        if (requester.getOrganizationId() !== organizationId && !requester.isSuperAdmin()) {
            throw new Error('Requester does not belong to this organization');
        }
        return this.userRepository.findByOrganizationIdAndStatus(organizationId, 'pending_approval');
    }
}
