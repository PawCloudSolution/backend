export class GetOrganizationsUseCase {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    async execute() {
        return this.organizationRepository.findAll();
    }
}
