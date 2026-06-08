import { User } from '../../../domain/user/user';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByOrganizationIdAndStatus(organizationId: string, status: string): Promise<User[]>;
  save(user: User): Promise<void>;
}
