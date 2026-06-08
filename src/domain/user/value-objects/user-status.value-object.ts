export type UserStatusEnum = 'pending_approval' | 'active' | 'suspended';

export class UserStatusValueObject {
  private constructor(private readonly value: UserStatusEnum) {}

  public static create(value: string) {
    if (!['pending_approval', 'active', 'suspended'].includes(value)) {
      throw new Error('Invalid user status');
    }
    return new UserStatusValueObject(value as UserStatusEnum);
  }

  public toString() {
    return this.value;
  }

  public equals(other: UserStatusValueObject) {
    return this.value === other.value;
  }

  public isPending() { return this.value === 'pending_approval'; }
  public isActive() { return this.value === 'active'; }
  public isSuspended() { return this.value === 'suspended'; }
}
