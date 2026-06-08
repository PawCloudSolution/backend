import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '../../application/auth/ports/password-hasher.interface';

export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds = 10;

  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
