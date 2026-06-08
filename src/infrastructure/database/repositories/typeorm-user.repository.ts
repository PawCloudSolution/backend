import { IUserRepository } from '../../../application/auth/ports/user.repository.interface';
import { User } from '../../../domain/user/user';
import { AppDataSource } from '../data-source';
import { UserEntity } from '../entities/user.entity';

export class TypeOrmUserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(UserEntity);

  async save(user: User): Promise<void> {
    const entity = this.repository.create({
      id: user.getId(),
      organizationId: user.getOrganizationId(),
      status: user.getStatus(),
      name: user.getName(),
      surname: user.getSurname(),
      email: user.getEmail(),
      username: user.getUsername(),
      role: user.getRole().toString(),
      countryCode: user.getCountryCode(),
      phoneNumber: user.getPhoneNumber(),
      hashedPassword: user.getHashedPassword(),
    });
    await this.repository.save(entity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.repository.findOneBy({ email });
    if (!raw) return null;
    return User.restore(raw);
  }

  async findByUsername(username: string): Promise<User | null> {
    const raw = await this.repository.findOneBy({ username });
    if (!raw) return null;
    return User.restore(raw);
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.repository.findOneBy({ id });
    if (!raw) return null;
    return User.restore(raw);
  }

  async findByOrganizationIdAndStatus(organizationId: string, status: string): Promise<User[]> {
    const rawList = await this.repository.findBy({ organizationId, status });
    return rawList.map(raw => User.restore(raw));
  }
}
