export type OrganizationTypeEnum = 'headquarter' | 'club' | 'kennel' | 'training_ground';

export class OrganizationTypeValueObject {
  private constructor(private readonly value: OrganizationTypeEnum) {}

  public static create(type: string): OrganizationTypeValueObject {
    const validTypes: OrganizationTypeEnum[] = ['headquarter', 'club', 'kennel', 'training_ground'];
    if (!validTypes.includes(type as OrganizationTypeEnum)) {
      throw new Error(`Invalid organization type: ${type}`);
    }
    return new OrganizationTypeValueObject(type as OrganizationTypeEnum);
  }

  public toString(): OrganizationTypeEnum {
    return this.value;
  }

  public equals(other: OrganizationTypeValueObject): boolean {
    return this.value === other.value;
  }

  public isHeadquarter(): boolean {
    return this.value === 'headquarter';
  }
}
