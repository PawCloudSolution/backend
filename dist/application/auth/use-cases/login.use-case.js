export class LoginUserUseCase {
    constructor(userRepository, passwordHasher, tokenService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;
    }
    async execute(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await this.passwordHasher.compare(dto.password, user.getHashedPassword());
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const tokens = this.tokenService.generateTokens({
            userId: user.getId(),
            role: user.getRole().toString(),
            organizationId: user.getOrganizationId()
        });
        return {
            tokens,
            user: {
                id: user.getId(),
                email: user.getEmail(),
                role: user.getRole().toString(),
                organizationId: user.getOrganizationId()
            }
        };
    }
}
