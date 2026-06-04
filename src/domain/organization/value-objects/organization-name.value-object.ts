export class OrganizationNameValueObject {
  private constructor(private readonly value: string) {}

  public static create(name: string): OrganizationNameValueObject {
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      throw new Error('Organization name must be at least 3 characters long');
    }
    if (trimmed.length > 100) {
      throw new Error('Organization name cannot exceed 100 characters');
    }
    return new OrganizationNameValueObject(trimmed);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: OrganizationNameValueObject): boolean {
    return this.value === other.value;
  }
}
