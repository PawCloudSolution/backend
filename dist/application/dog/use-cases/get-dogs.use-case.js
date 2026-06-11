export class GetDogsUseCase {
    constructor(dogRepository) {
        this.dogRepository = dogRepository;
    }
    async executeByOwnerId(ownerId) {
        return this.dogRepository.findByOwnerId(ownerId);
    }
    async executeByOrganizationId(organizationId) {
        return this.dogRepository.findByOrganizationId(organizationId);
    }
}
