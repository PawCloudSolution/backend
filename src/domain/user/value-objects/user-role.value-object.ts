export type UserRoleEnum = 'member' | 'employee' | 'branchPresident' | 'nationalPresident' | 'internationalPresident' | 'superAdmin';

export class UserRoleValueObject {
  private constructor(
    private readonly value: UserRoleEnum,
  ) {}

  public static create(value: string) {
    if (!['member', 'employee', 'branchPresident', 'nationalPresident', 'internationalPresident', 'superAdmin'].includes(value)) {
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

  public isBranchPresident() {
    return this.value === 'branchPresident';
  }

  public isNationalPresident() {
    return this.value === 'nationalPresident';
  }

  public isInternationalPresident() {
    return this.value === 'internationalPresident';
  }

  public isAnyPresident() {
    return this.isBranchPresident() || this.isNationalPresident() || this.isInternationalPresident();
  }

  public isSuperAdmin() {
    return this.value === 'superAdmin';
  }
}