import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterUserUseCase, RegisterUserDto } from './use-cases/register.use-case';
import { LoginUserUseCase, LoginUserDto } from './use-cases/login.use-case';
import { User } from '../../domain/user/user';

describe('Auth Use Cases', () => {
  let mockUserRepository: any;
  let mockPasswordHasher: any;
  let mockTokenService: any;
  let mockOrganizationRepository: any;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: vi.fn(),
      findByUsername: vi.fn(),
      save: vi.fn(),
    };

    mockPasswordHasher = {
      hash: vi.fn(),
      compare: vi.fn(),
    };

    mockTokenService = {
      generateTokens: vi.fn(),
      verifyAccessToken: vi.fn(),
      verifyRefreshToken: vi.fn(),
    };

    mockOrganizationRepository = {
      findById: vi.fn(),
    };
  });

  describe('RegisterUserUseCase', () => {
    it('should register a user successfully', async () => {
      const useCase = new RegisterUserUseCase(mockUserRepository, mockPasswordHasher, mockOrganizationRepository);
      
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.findByUsername.mockResolvedValue(null);
      mockPasswordHasher.hash.mockResolvedValue('hashed_secret_password_lengthy_enough');
      mockUserRepository.save.mockResolvedValue(undefined);
      mockOrganizationRepository.findById.mockResolvedValue({}); // Org exists

      const dto: RegisterUserDto = {
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Jane',
        surname: 'Doe',
        email: 'jane@example.com',
        username: 'janedoe',
        role: 'member',
        countryCode: 'US',
        phoneNumber: '+12133734253',
        password: 'plain_password',
      };

      const user = await useCase.execute(dto);

      expect(user).toBeInstanceOf(User);
      expect(user.getHashedPassword()).toBe('hashed_secret_password_lengthy_enough');
      expect(mockPasswordHasher.hash).toHaveBeenCalledWith('plain_password');
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw if email exists', async () => {
      const useCase = new RegisterUserUseCase(mockUserRepository, mockPasswordHasher, mockOrganizationRepository);
      
      mockUserRepository.findByEmail.mockResolvedValue(true); // Exists
      mockOrganizationRepository.findById.mockResolvedValue({}); // Org exists

      const dto: RegisterUserDto = {
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Jane',
        surname: 'Doe',
        email: 'jane@example.com',
        username: 'janedoe',
        role: 'member',
        countryCode: 'US',
        phoneNumber: '+12133734253',
        password: 'plain_password',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('User with this email already exists');
    });

    it('should throw if organization does not exist', async () => {
      const useCase = new RegisterUserUseCase(mockUserRepository, mockPasswordHasher, mockOrganizationRepository);
      
      mockOrganizationRepository.findById.mockResolvedValue(null); // Org not found

      const dto: RegisterUserDto = {
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Jane',
        surname: 'Doe',
        email: 'jane@example.com',
        username: 'janedoe',
        role: 'member',
        countryCode: 'US',
        phoneNumber: '+12133734253',
        password: 'plain_password',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('Organization not found (how did you bypass the frontend?)');
    });
  });

  describe('LoginUserUseCase', () => {
    it('should login successfully and return tokens', async () => {
      const useCase = new LoginUserUseCase(mockUserRepository, mockPasswordHasher, mockTokenService);
      
      const mockUser = User.register({
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Jane',
        surname: 'Doe',
        email: 'jane@example.com',
        username: 'janedoe',
        role: 'member',
        countryCode: 'US',
        phoneNumber: '+12133734253',
        hashedPassword: 'hashed_secret_password_lengthy_enough',
      });

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockPasswordHasher.compare.mockResolvedValue(true);
      mockTokenService.generateTokens.mockReturnValue({ accessToken: 'access', refreshToken: 'refresh' });

      const dto: LoginUserDto = {
        email: 'jane@example.com',
        password: 'plain_password',
      };

      const result = await useCase.execute(dto);

      expect(result.tokens).toEqual({ accessToken: 'access', refreshToken: 'refresh' });
      expect(result.user.id).toBe(mockUser.getId());
      expect(mockPasswordHasher.compare).toHaveBeenCalledWith('plain_password', 'hashed_secret_password_lengthy_enough');
      expect(mockTokenService.generateTokens).toHaveBeenCalledWith({
        userId: mockUser.getId(),
        organizationId: mockUser.getOrganizationId()
      });
    });

    it('should throw error for invalid credentials', async () => {
      const useCase = new LoginUserUseCase(mockUserRepository, mockPasswordHasher, mockTokenService);
      
      mockUserRepository.findByEmail.mockResolvedValue(null);

      const dto: LoginUserDto = {
        email: 'jane@example.com',
        password: 'plain_password',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('Invalid email or password');
    });
  });
});
