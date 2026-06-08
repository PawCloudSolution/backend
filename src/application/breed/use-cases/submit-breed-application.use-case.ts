import { BreedApplication } from '../../../domain/breed/breed-application';
import { IBreedApplicationRepository } from '../ports/breed-application.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';

export interface SubmitBreedApplicationDto {
  names: { [languageCode: string]: string };
  requesterId: string;
}

export class SubmitBreedApplicationUseCase {
  constructor(
    private readonly breedApplicationRepository: IBreedApplicationRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(dto: SubmitBreedApplicationDto): Promise<BreedApplication> {
    const requester = await this.userRepository.findById(dto.requesterId);
    if (!requester) {
      throw new Error('Requester not found');
    }

    if (!requester.isRoleManager() && !requester.isEmployee()) {
      throw new Error('Only club employees or managers can submit breed applications');
    }

    const app = BreedApplication.create({
      names: dto.names,
      requesterId: dto.requesterId
    });

    await this.breedApplicationRepository.save(app);
    return app;
  }
}
