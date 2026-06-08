import { Dog } from '../../../domain/dog/dog';
import { IDogRepository } from '../ports/dog.repository.interface';
import { IBreedRepository } from '../../breed/ports/breed.repository.interface';
import { IUserRepository } from '../../auth/ports/user.repository.interface';

export interface RegisterDogDto {
  ownerId: string;
  breederId: string;
  breedId: string;
  name: string;
  sex: string;
  dateBirth: string;
  requesterId: string;
}

export class RegisterDogUseCase {
  constructor(
    private readonly dogRepository: IDogRepository,
    private readonly breedRepository: IBreedRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(dto: RegisterDogDto): Promise<Dog> {
    const requester = await this.userRepository.findById(dto.requesterId);
    if (!requester) {
      throw new Error('Requester not found');
    }

    if (!requester.isEmployee() && !requester.isRoleManager() && !requester.isSuperAdmin()) {
      throw new Error('Only employees or managers can register dogs in the system');
    }

    const breed = await this.breedRepository.findById(dto.breedId);
    if (!breed) {
      throw new Error('Breed not found');
    }

    const orgId = requester.getOrganizationId();
    if (!orgId && !requester.isSuperAdmin()) {
      throw new Error('Requester must belong to an organization');
    }

    // A dog gets registered into the organization of the employee making the request
    // or if superAdmin, maybe we should pass orgId in DTO. For now, we assume superAdmin cannot 
    // register dogs directly unless they belong to an org, or we just throw.
    if (!orgId) {
      throw new Error('SuperAdmin must specify an organization to register a dog (not implemented)');
    }

    const dog = Dog.create({
      ownerId: dto.ownerId,
      breederId: dto.breederId,
      organizationId: orgId,
      name: dto.name,
      sex: dto.sex,
      dateBirth: dto.dateBirth,
      breed: breed
    });

    await this.dogRepository.save(dog);
    return dog;
  }
}
