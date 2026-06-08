import { User } from '../../../domain/user/user';
import { IPasswordHasher } from '../ports/password-hasher.interface';
import { IUserRepository } from '../ports/user.repository.interface';
import { IOrganizationRepository } from '../../organization/ports/organization.repository.interface';

export interface RegisterUserDto {
  organizationId: string | null;
  name: string;
  surname: string;
  email: string;
  username: string;
  role: string;
  countryCode: string;
  phoneNumber: string | null;
  password: string; // Plain password
}

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  public async execute(dto: RegisterUserDto): Promise<User> {
    if (dto.organizationId) {
      const org = await this.organizationRepository.findById(dto.organizationId);
      if (!org) {
        throw new Error('Organization not found (how did you bypass the frontend?)');
      }
    }

    const existingUserByEmail = await this.userRepository.findByEmail(dto.email);
    if (existingUserByEmail) {
      throw new Error('User with this email already exists');
    }

    const existingUserByUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUserByUsername) {
      throw new Error('User with this username already exists');
    }

    const hashedPassword = await this.passwordHasher.hash(dto.password);
    
    const userStatus = (dto.role === 'employee' || dto.role === 'member') ? 'pending_approval' : 'active';

    const user = User.register({
      organizationId: dto.organizationId,
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      username: dto.username,
      role: dto.role,
      countryCode: dto.countryCode,
      phoneNumber: dto.phoneNumber,
      hashedPassword: hashedPassword,
      status: userStatus
    });

    await this.userRepository.save(user);

    return user;
  }
}
