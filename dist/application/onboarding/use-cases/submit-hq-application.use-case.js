import { OrganizationApplication } from '../../../domain/organization-application/organization-application';
export class SubmitOrganizationApplicationUseCase {
    constructor(applicationRepository, passwordHasher) {
        this.applicationRepository = applicationRepository;
        this.passwordHasher = passwordHasher;
    }
    async execute(dto) {
        const hashedPassword = await this.passwordHasher.hash(dto.presidentPasswordPlain);
        const application = OrganizationApplication.submit({
            documents: dto.documents,
            organizationName: dto.organizationName,
            countryCode: dto.countryCode,
            taxNumber: dto.taxNumber,
            registrationNumber: dto.registrationNumber,
            presidentName: dto.presidentName,
            presidentSurname: dto.presidentSurname,
            presidentEmail: dto.presidentEmail,
            presidentPhone: dto.presidentPhone,
            presidentPasswordHash: hashedPassword,
            applicationType: dto.applicationType,
            internationalId: dto.internationalId || null,
        });
        await this.applicationRepository.save(application);
        return application;
    }
}
