import { BreedApplication } from '../../../domain/breed/breed-application';
export class SubmitBreedApplicationUseCase {
    constructor(breedApplicationRepository, userRepository, organizationRepository) {
        this.breedApplicationRepository = breedApplicationRepository;
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
    }
    async execute(dto) {
        const requester = await this.userRepository.findById(dto.requesterId);
        if (!requester) {
            throw new Error('Requester not found');
        }
        if (!requester.isAnyPresident() && !requester.isEmployee()) {
            throw new Error('Only presidents or employees can submit breed applications');
        }
        const requesterOrgId = requester.getOrganizationId();
        if (!requesterOrgId) {
            throw new Error('Requester has no organization');
        }
        let internationalId = null;
        let currentOrg = await this.organizationRepository.findById(requesterOrgId);
        while (currentOrg) {
            if (currentOrg.getType() === 'international') {
                internationalId = currentOrg.getId();
                break;
            }
            const parentId = currentOrg.getParentOrganizationId();
            if (!parentId)
                break;
            currentOrg = await this.organizationRepository.findById(parentId);
        }
        if (!internationalId) {
            throw new Error('Could not determine international organization for requester');
        }
        const app = BreedApplication.create({
            names: dto.names,
            requesterId: dto.requesterId,
            internationalId
        });
        await this.breedApplicationRepository.save(app);
        return app;
    }
}
