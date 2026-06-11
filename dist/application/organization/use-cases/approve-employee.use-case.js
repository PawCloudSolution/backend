export class ApproveEmployeeUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(employeeId, approverId) {
        const approver = await this.userRepository.findById(approverId);
        if (!approver) {
            throw new Error('Approver not found');
        }
        const employee = await this.userRepository.findById(employeeId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        if (approver.getOrganizationId() !== employee.getOrganizationId() && !approver.isSuperAdmin()) {
            throw new Error('Cannot approve employee from another organization');
        }
        employee.approve(approver);
        await this.userRepository.save(employee);
    }
}
