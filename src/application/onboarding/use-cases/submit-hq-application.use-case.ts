import { OrganizationApplication } from '../../../domain/organization-application/organization-application';
import { IOrganizationApplicationRepository } from '../ports/organization-application.repository.interface';
import { IPasswordHasher } from '../../auth/ports/password-hasher.interface';

export interface SubmitOrganizationApplicationDto {
  documents: string[];
  organizationName: string;
  countryCode: string;
  taxNumber: string;
  registrationNumber: string;
  presidentName: string;
  presidentSurname: string;
  presidentEmail: string;
  presidentPhone: string;
  presidentPasswordPlain: string;
  applicationType: 'international' | 'headquarter';
  internationalId?: string | null;
}

export class SubmitOrganizationApplicationUseCase {
  constructor(
    private readonly applicationRepository: IOrganizationApplicationRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  public async execute(dto: SubmitOrganizationApplicationDto): Promise<OrganizationApplication> {
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
