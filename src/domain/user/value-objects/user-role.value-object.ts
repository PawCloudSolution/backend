export type UserRoleEnum = 'member' | 'employee' | 'roleManager' | 'superAdmin';

export class UserRoleValueObject {
  private constructor(
    private readonly value: UserRoleEnum,
  ) {}

  public static create(value: string) {
    if (!['member', 'employee', 'roleManager', 'superAdmin'].includes(value)) {
      throw new Error('Invalid user role');
    }

    return new UserRoleValueObject(
      value as UserRoleEnum,
    );
  }

  public toString() {
    return this.value;
  }

  public equals(other: UserRoleValueObject) {
    return this.value === other.value;
  }

  public isMember() {
    return this.value === 'member';
  }

  public isEmployee() {
    return this.value === 'employee';
  }

  public isRoleManager() {
    return this.value === 'roleManager';
  }

  public isSuperAdmin() {
    return this.value === 'superAdmin';
  }
}