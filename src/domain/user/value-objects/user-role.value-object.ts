export class UserRoleValueObject {
  private constructor(
    private readonly value: 'member' | 'employee' | 'roleManager',
  ) {}

  public static create(value: string) {
    if (!['member', 'employee', 'roleManager'].includes(value)) {
      throw new Error('Invalid user role');
    }

    return new UserRoleValueObject(
      value as 'member' | 'employee' | 'roleManager',
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
}