import { User } from '../../../domain/user/user';
export class RegisterUserUseCase {
    constructor(userRepository, passwordHasher, organizationRepository) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.organizationRepository = organizationRepository;
    }
    async execute(dto) {
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
